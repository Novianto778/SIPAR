import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import TextField from 'components/form/TextField';
import { ROUTES } from 'constants/routes';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/userStore';
import {
  EnumStatus,
  TransaksiDetail,
  TransaksiInput,
  transaksiInputSchema,
} from 'types/transaksi';
import useAddTransaksi from './hooks/useAddTransaksi';
import TambahTransaksiDetail from './TransaksiDetail/TambahTransaksiDetail';

const TambahTransaksi = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess, isLoading } = useAddTransaksi();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [transaksiDetail, setTransaksiDetail] = useState<
    TransaksiDetail[] | []
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransaksiInput>({ resolver: zodResolver(transaksiInputSchema) });

  if (isSuccess) {
    queryClient.refetchQueries(['transaksi']);
  }

  const onSubmit = async (data: TransaksiInput) => {
    if (transaksiDetail.length === 0) {
      toast.error('Transaksi detail tidak boleh kosong', {
        position: 'top-right',
      });
      return;
    }

    if (data.alamat === '') {
      toast.error('Alamat tidak boleh kosong', { position: 'top-right' });
      return;
    }

    if (data.nama === '') {
      toast.error('Nama tidak boleh kosong', { position: 'top-right' });
      return;
    }

    if (data.no_telp === '') {
      toast.error('No Telp tidak boleh kosong', { position: 'top-right' });
      return;
    }
    const newData = {
      ...data,
      status: EnumStatus.Pending,
      tanggal: new Date(),
      id_user: user?.id as string,
      created_at: new Date(),
      updated_at: new Date(),
      diskon: data.diskon || 0,
    };
    const result = await mutateAsync(
      { transaksi: newData, transaksiDetail },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['transaksi']);
        },
      }
    );
    if (result.data && result.dataDetail) {
      toast.success('Transaksi berhasil ditambahkan', {
        position: 'top-right',
      });
      navigate(ROUTES.TRANSACTION);
    }
  };

  const onAddTransaksiDetail = (data: TransaksiDetail) => {
    setTransaksiDetail([...transaksiDetail, data]);
    toast.success('Berhasil menambahkan transaksi detail', {
      position: 'top-right',
    });
    setOpenModal(false);
  };

  const onDeleteTransaksiDetail = (index: number) => {
    const newTransaksiDetail = transaksiDetail.filter(
      (_, itemIndex) => itemIndex !== index
    );
    setTransaksiDetail(newTransaksiDetail);
    toast.success('Berhasil menghapus transaksi detail', {
      position: 'top-right',
    });
  };

  const openAddTransaksiDetail = () => {
    setOpenModal(true);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Tambah Transaksi</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-6">
          <div>
            <div className="mb-6">
              <TextField
                label="Nama"
                placeholder="nama"
                {...register('nama')}
                error={errors.nama?.message}
              />
            </div>
            <TextField
              textarea
              label="Alamat"
              placeholder="alamat"
              {...register('alamat')}
              error={errors.alamat?.message}
            />
          </div>
          <div>
            <div className="mb-6">
              <TextField
                label="No Hp"
                placeholder="+62"
                {...register('no_telp')}
                error={errors.no_telp?.message}
              />
            </div>
            <TextField
              label="Diskon"
              placeholder="Rp"
              {...register('diskon')}
              error={errors.diskon?.message}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-blue mt-4"
          disabled={isLoading}
        >
          Submit
        </button>
        <div className="flex items-center justify-between mt-6">
          <h3 className="text-base font-semibold">Transaksi Detail</h3>
          <button
            type="button"
            className="btn btn-blue"
            onClick={openAddTransaksiDetail}
          >
            Tambah
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto min-w-full">
            <div className="p-1.5 inline-block align-middle w-full max-w-dashboard">
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="table-simple text-left">
                        NO
                      </th>
                      <th scope="col" className="table-simple text-left">
                        Tipe Motor
                      </th>
                      <th scope="col" className="table-simple text-left">
                        Plat Motor
                      </th>
                      <th scope="col" className="table-simple text-left">
                        Lama Sewa
                      </th>
                      <th scope="col" className="table-simple text-left">
                        Tanggal Mulai
                      </th>
                      <th scope="col" className="table-simple text-left">
                        Tanggal Selesai
                      </th>
                      <th scope="col" className="table-simple">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transaksiDetail?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-simple">{index + 1}</td>
                          <td className="table-simple">
                            {item.id_motor.label}
                          </td>
                          <td className="table-simple">{item.plat_motor}</td>
                          <td className="table-simple text-center">
                            {item.lama_sewa}
                          </td>
                          <td className="table-simple">
                            {moment(item.tanggal_mulai)
                              .locale('id')
                              .format('DD-MM-YYYY, HH:mm:ss')}
                          </td>
                          <td className="table-simple">
                            {moment(item.tanggal_selesai)
                              .locale('id')
                              .format('DD-MM-YYYY, HH:mm:ss')}
                          </td>
                          <td className="table-simple">
                            <button
                              // onClick={() => onDeleteTransaksiDetail(index)}
                              type="button"
                              className="btn text-blue-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onDeleteTransaksiDetail(index)}
                              type="button"
                              className="btn text-red-500"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
      {openModal && (
        <TambahTransaksiDetail
          onCloseModal={() => setOpenModal(false)}
          onAdd={onAddTransaksiDetail}
        />
      )}
    </>
  );
};

export default TambahTransaksi;
