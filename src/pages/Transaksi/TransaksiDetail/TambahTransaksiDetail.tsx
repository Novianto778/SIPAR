import { zodResolver } from '@hookform/resolvers/zod';
import TextField from 'components/form/TextField';
import { FC, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import {
  TransaksiDetail,
  TransaksiDetailInput,
  transaksiDetailInputSchema,
} from 'types/transaksi';
import { FaTimes } from 'react-icons/fa';
import useMotor from 'pages/Motor/hooks/useMotor';
import moment from 'moment';

interface Props {
  onCloseModal: () => void;
  onAdd: (data: TransaksiDetail) => void;
}

type OptionType = {
  label: string;
  value: number;
};

const TambahTransaksiDetail: FC<Props> = ({ onCloseModal, onAdd }) => {
  const { data, isLoading } = useMotor();
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
  } = useForm<TransaksiDetailInput>({
    resolver: zodResolver(transaksiDetailInputSchema),
  });

  const onSubmit = (data: TransaksiDetailInput) => {
    // const id_motor =
    //   typeof data.id_motor === 'number' ? data.id_motor : data.id_motor.value;
    const newData = {
      ...data,
      tanggal_mulai: new Date(),
      tanggal_selesai: moment().add(data.lama_sewa, 'days').toDate(),
      denda: 0,
    };
    onAdd(newData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        onClick={onCloseModal}
        id="my-modal"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute left-1/2 -translate-x-1/2 top-20 mx-auto p-5 border max-w-[90vw] md:max-w-[60vw] w-full shadow-lg rounded-md bg-white"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Transaksi Detail</h2>
          <FaTimes
            size={24}
            onClick={onCloseModal}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-6">
          <div className="mb-4">
            <TextField
              label="Plat Motor"
              placeholder="plat_motor"
              {...register('plat_motor')}
              error={errors.plat_motor?.message}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Lama Sewa"
              placeholder="2 hari"
              {...register('lama_sewa')}
              error={errors.lama_sewa?.message}
            />
          </div>
          <label className="mb-2 block font-medium" htmlFor="Tipe Motor">
            Tipe Motor
          </label>
          <Controller
            name="id_motor"
            control={control}
            render={({ field }) => <ReactSelect {...field} options={options} />}
          />
          {errors.id_motor?.message && (
            <p className="text-red-500 text-sm">{errors.id_motor?.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-blue mt-4">
          Tambah
        </button>
      </form>
    </>
  );
};

export default TambahTransaksiDetail;
