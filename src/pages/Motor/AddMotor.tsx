import { useQueryClient } from '@tanstack/react-query';
import TextField from 'components/form/TextField';
import { ROUTES } from 'constants/routes';
import { insertDataToTable, uploadImage } from 'lib/supabase';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Motor } from 'types/motor';
import { v4 as uuidv4 } from 'uuid';

const AddMotor = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | ArrayBuffer | null>('');
  const { register, handleSubmit, setValue, reset } = useForm<Motor>();
  const queryClient = useQueryClient();

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files![0];
    const fileType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validExtensions.includes(fileType)) {
      fileReader.onload = (e) => {
        const fileUrl = fileReader.result;
        setImage(fileUrl);
      };
      fileReader.readAsDataURL(file);
    } else {
      alert('file should be image');
    }
  };

  const onSubmit: SubmitHandler<Motor> = (data: Motor) => {
    let fileName;
    if (data.img instanceof File) {
      const file = data.img;
      const fileExt = file.name.split('.').pop();
      fileName = `${uuidv4()}.${fileExt}`;
      uploadImage('motor', fileName, file);
    } else {
      fileName = data.img;
    }
    const newData = { ...data, img: fileName };
    insertDataToTable('motor', newData);
    reset();
    queryClient.invalidateQueries(['motor']);
    navigate(ROUTES.LIST_MOTOR);
  };
  return (
    <>
      <h1 className="text-xl font-semibold">Tambah Motor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-12 gap-y-10 py-4 md:flex-row flex-col">
          <div className="flex-[2]">
            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
              >
                {image ? (
                  <img
                    src={image as string}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="mb-3 w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Image File
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  {...register('img')}
                  onChange={(e) => {
                    imageHandler(e);
                    setValue('img', e.target.files![0], {
                      shouldValidate: true,
                    });
                  }}
                />
              </label>
            </div>
            <h6 className="font-semibold mt-2">Gambar Motor</h6>
          </div>
          <div className="flex-[4] space-y-4">
            <TextField
              label="Tipe Motor"
              placeholder="Masukkan tipe motor"
              width="2/3"
              text="sm"
              {...register('tipe')}
            />
            <TextField
              label="CC Motor"
              placeholder="Masukkan CC motor"
              width="2/3"
              text="sm"
              type="number"
              {...register('cc')}
            />
            <TextField
              label="Harga Sewa Motor"
              placeholder="Masukkan harga sewa motor"
              width="2/3"
              text="sm"
              type="number"
              {...register('harga')}
            />
            <TextField
              label="Stok Motor"
              placeholder="Masukkan stok motor"
              width="2/3"
              text="sm"
              type="number"
              {...register('stok')}
            />
            <button type="submit" className="btn btn-blue">
              Tambah
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddMotor;
