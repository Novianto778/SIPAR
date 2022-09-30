import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TextField from 'components/form/TextField';
import { ROUTES } from 'constants/routes';
import { deleteImage, updateDataToTable, uploadImage } from 'lib/supabase';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Motor, motorSchema } from 'types/motor';
import { v4 as uuidv4 } from 'uuid';
import useImage from './hooks/useImage';
import useMotorById from './hooks/useMotorById';

const EditMotor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: motor, isLoading } = useMotorById(id!);
  const { image, setImage } = useImage(motor?.img as string);
  const [isNewImage, setIsNewImage] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Motor>({
    resolver: zodResolver(motorSchema),
  });
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess } = useMutation(editMotorHandler, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['motor']);
      reset();
      navigate(ROUTES.LIST_MOTOR);
    },
  });

  if (isSuccess) {
    queryClient.refetchQueries(['motor']);
  }

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

  async function editMotorHandler(data: Motor) {
    let fileName;
    if (data.img instanceof File) {
      const file = data.img;
      const fileExt = file.name.split('.').pop();
      fileName = `${uuidv4()}.${fileExt}`;
      if (isNewImage) {
        await uploadImage('motor', fileName, file);
        await deleteImage('motor', motor?.img as string);
      }
    } else {
      fileName = data.img;
    }
    const newData = { ...data, img: fileName };
    await updateDataToTable('motor', newData, 'id_motor', id!);
  }

  const onSubmit: SubmitHandler<Motor> = async (data: Motor) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (motor) {
      setValue('tipe', motor?.tipe);
      setValue('harga', motor?.harga?.toString());
      setValue('img', motor?.img);
      setValue('stok', motor?.stok?.toString());
      setValue('cc', motor?.cc?.toString());
    }
  }, [motor, setValue]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h2 className="text-xl font-semibold">Tambah Motor</h2>
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
                    setIsNewImage(true);
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
              error={errors.tipe?.message}
            />
            <TextField
              label="CC Motor"
              placeholder="Masukkan CC motor"
              width="2/3"
              text="sm"
              type="number"
              {...register('cc')}
              error={errors.cc?.message}
            />
            <TextField
              label="Harga Sewa Motor"
              placeholder="Masukkan harga sewa motor"
              width="2/3"
              text="sm"
              type="number"
              {...register('harga')}
              error={errors.harga?.message}
            />
            <TextField
              label="Stok Motor"
              placeholder="Masukkan stok motor"
              width="2/3"
              text="sm"
              type="number"
              {...register('stok')}
              error={errors.stok?.message}
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

export default EditMotor;
