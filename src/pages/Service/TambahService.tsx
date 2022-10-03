import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import TextField from 'components/form/TextField';
import useMotor from 'pages/Motor/hooks/useMotor';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactSelect from 'react-select';
import { Service, ServiceInput, serviceInputSchema } from 'types/service';
import useAddService from './hooks/useAddService';

type OptionType = {
  label: string;
  value: number;
};

const TambahService = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useMotor();
  const { mutate, isSuccess } = useAddService();
  const options: OptionType[] | [] = useMemo(
    () =>
      data?.map((item) => ({
        value: item.id_motor,
        label: item.tipe,
      })) ?? [],
    [data]
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceInput>({ resolver: zodResolver(serviceInputSchema) });

  if (isSuccess) {
    queryClient.refetchQueries(['service']);
  }

  const onSubmit = async (data: ServiceInput) => {
    const newData: Service = {
      ...data,
      id_motor: data.id_motor.value,
      tanggal_service: new Date(),
    };

    mutate(newData, {
      onSuccess: () => {
        toast.success('Berhasil menambahkan data service');
        queryClient.refetchQueries(['service']);
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">Tambah Service</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="mb-6">
              <TextField
                label="Plat Motor"
                placeholder="plat motor"
                {...register('plat_motor')}
                error={errors.plat_motor?.message}
              />
            </div>
            <TextField
              label="Total KM"
              placeholder="10000"
              {...register('total_km', { valueAsNumber: true })}
              error={errors.total_km?.message}
            />
          </div>
          <div>
            <div className="mb-6">
              <TextField
                label="Deskripsi Service"
                placeholder="ganti oli, gk bisa start"
                {...register('deskripsi')}
                error={errors.deskripsi?.message}
              />
            </div>
            <label className="mb-2 block font-medium" htmlFor="Tipe Motor">
              Tipe Motor
            </label>
            <Controller
              name="id_motor"
              control={control}
              render={({ field }) => (
                <ReactSelect {...field} options={options} />
              )}
            />
            {errors.id_motor?.message && (
              <p className="text-red-500 text-sm">{errors.id_motor?.message}</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-blue mt-4">
          Submit
        </button>
      </form>
    </>
  );
};

export default TambahService;
