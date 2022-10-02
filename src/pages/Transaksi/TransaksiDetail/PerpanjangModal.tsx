import TextField from 'components/form/TextField';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import usePerpanjangSewa from '../hooks/usePerpanjangan';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  onCloseModal: () => void;
  id: number;
}

interface Input {
  perpanjangan: number;
}

const PerpanjangModal: FC<Props> = ({ onCloseModal, id }) => {
  const queryClient = useQueryClient();
  const { mutate } = usePerpanjangSewa();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit = (data: Input) => {
    mutate(
      { id: id, lama: +data.perpanjangan },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['transaksi']);
          reset();
          onCloseModal();
        },
      }
    );
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        onClick={onCloseModal}
        id="my-modal"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute left-1/2 -translate-x-1/2 top-20 mx-auto p-5 border max-w-[90vw] md:max-w-[40vw] w-full shadow-lg rounded-md bg-white"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Perpanjangan Rental</h2>
          <FaTimes
            size={24}
            onClick={onCloseModal}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-6">
          <div className="mb-4">
            <TextField
              label="Lama Perpanjangan"
              placeholder="2 hari"
              {...register('perpanjangan')}
              error={errors.perpanjangan?.message}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-blue mt-4">
          Perpanjang
        </button>
      </form>
    </>
  );
};

export default PerpanjangModal;
