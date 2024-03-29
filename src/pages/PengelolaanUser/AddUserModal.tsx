import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import TextField from 'components/form/TextField';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { z } from 'zod';
import { useAddUser } from './hooks/useAddUser';

interface Props {
  onCloseModal: () => void;
}

interface Input {
  email: string;
  password: string;
  username: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

const AddUserModal: FC<Props> = ({ onCloseModal }) => {
  const queryClient = useQueryClient();
  const { mutate } = useAddUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Input) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        onCloseModal();
      },
    });
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
          <h2 className="text-xl font-medium">Tambah User</h2>
          <FaTimes
            size={24}
            onClick={onCloseModal}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-6">
          <div className="mb-4">
            <TextField
              label="Username"
              placeholder="username"
              {...register('username', { required: true })}
              error={errors.username?.message}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Email"
              placeholder="email user"
              {...register('email', { required: true })}
              error={errors.email?.message}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Password"
              placeholder="password user"
              {...register('password', { required: true, minLength: 6 })}
              error={errors.password?.message}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-blue mt-4">
          Tambah
        </button>
      </form>
    </>
  );
};

export default AddUserModal;
