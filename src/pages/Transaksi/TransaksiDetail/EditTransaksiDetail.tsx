import { zodResolver } from '@hookform/resolvers/zod';
import TextField from 'components/form/TextField';
import { FC, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import {
  TransaksiDetail,
  TransaksiDetailInput,
  transaksiDetailInputSchema,
} from 'types/transaksi';
import { FaTimes } from 'react-icons/fa';
import useMotor from 'pages/Motor/hooks/useMotor';
import useGetTransaksiById from '../hooks/useGetTransaksiById';
import { useParams } from 'react-router-dom';
import useGetTransaksiDetailById from '../hooks/useGetTransaksiDetailById';
import useEditTransaksiDetail from '../hooks/useEditTransaksiDetail';
import moment from 'moment';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Props {
  onCloseModal: () => void;
  selectedTransaksiDetail: number | null;
  // onAdd: (data: TransaksiDetail) => void;
}

type OptionType = {
  label: string;
  value: number;
};

const EditTransaksiDetail: FC<Props> = ({
  onCloseModal,
  selectedTransaksiDetail,
}) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useMotor();
  // const { id } = useParams();

  // const { data: transaksi, isLoading: isLoadingTransaksi } =
  //   useGetTransaksiById(parseInt(id!));

  const { data: transaksiDetail, isLoading: isLoadingTransaksiDetail } =
    useGetTransaksiDetailById(selectedTransaksiDetail!);

  const { mutateAsync, isSuccess } = useEditTransaksiDetail();
  const options: OptionType[] | [] = useMemo(
    () =>
      data?.map((item) => ({
        value: item.id_motor,
        label: item.tipe,
      })) ?? [],
    [data]
  );

  if (isSuccess) {
    queryClient.refetchQueries(['transaksi']);
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TransaksiDetailInput>({
    resolver: zodResolver(transaksiDetailInputSchema),
  });

  const onSubmit = async (data: TransaksiDetailInput) => {
    const newData = {
      ...data,
      id_motor: data.id_motor.value,
      tanggal_mulai: transaksiDetail?.tanggal_mulai,
      tanggal_selesai: moment(transaksiDetail?.tanggal_mulai)
        .add(data.lama_sewa, 'days')
        .toDate(),
    };
    const result = await mutateAsync(
      { transaksiDetail: newData, selectedId: selectedTransaksiDetail! },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['transaksi']);
          onCloseModal();
        },
      }
    );

    if (result.data) {
      toast.success('Berhasil mengubah data transaksi detail');
    }
  };

  useEffect(() => {
    if (transaksiDetail) {
      setValue('plat_motor', transaksiDetail.plat_motor);
      setValue('lama_sewa', transaksiDetail.lama_sewa);
      setValue('id_motor', {
        value: transaksiDetail.motor.id_motor,
        label: transaksiDetail.motor.tipe,
      });
    }
  }, [transaksiDetail, setValue]);

  if (isLoading || isLoadingTransaksiDetail) {
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
          Edit
        </button>
      </form>
    </>
  );
};

export default EditTransaksiDetail;
