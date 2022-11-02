import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import TextField from 'components/form/TextField';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { z } from 'zod';
import { useEditUser } from './hooks/useEditUser';
import { useGetUserById } from './hooks/UseUserById';

interface Props {
  onCloseModal: () => void;
  selectedUser: any;
}

interface Input {
  id: string;
  email: string;
  username: string;
}

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  id: z.string(),
});

const EditUserModal: FC<Props> = ({ onCloseModal, selectedUser }) => {
  const queryClient = useQueryClient();
  const { mutate } = useEditUser();
  const { data } = useGetUserById(selectedUser as any);
  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    if (data) {
      setValue('username', data?.username);
      setValue('email', data?.email);
    }
  }, [data, setValue]);

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
          <h2 className="text-xl font-medium">Edit User</h2>
          <FaTimes
            size={24}
            onClick={onCloseModal}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-6">
          <input
            type="hidden"
            {...register('id')}
            defaultValue={selectedUser}
          />
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
              disabled
              {...register('email')}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-blue mt-4">
          Update
        </button>
      </form>
    </>
  );
};

export default EditUserModal;
