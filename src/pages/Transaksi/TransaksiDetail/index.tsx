import moment from 'moment';
import { useParams } from 'react-router-dom';
import useTransaksiDetail from '../hooks/useTransaksiDetail';
import 'moment/locale/id';
import { formatUang } from 'utils/formatUang';
import { TransaksiDetail as TransaksiDetailType } from 'types/transaksi';
import { Motor } from 'types/motor';
import { useState } from 'react';
import PerpanjangModal from './PerpanjangModal';
import useGetTransaksiById from '../hooks/useGetTransaksiById';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import DendaModal from './DendaModal';

type Item = TransaksiDetailType & {
    motor: Motor;
};

const TransaksiDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useTransaksiDetail(id!);
    const { data: transaksi } = useGetTransaksiById(parseInt(id!));
    const [openPerpanjanganModal, setOpenPerpanjanganModal] = useState(false);
    const [openDendaModal, setOpenDendaModal] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleOpenPerpanjanganModal = (id: number) => {
        setOpenPerpanjanganModal(true);
        setSelectedId(id);
    };

    const handleOpenDendaModal = (id: number) => {
        setOpenDendaModal(true);
        setSelectedId(id);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <h2>Detail Transaksi #{id}</h2>
            <div className="flex flex-col">
                <div className="overflow-x-auto min-w-full">
                    <div className="p-1.5 inline-block align-middle w-full max-w-dashboard">
                        <div className="border rounded-lg overflow-x-auto">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="table-simple text-left"
                                        >
                                            NO
                                        </th>
                                        <th
                                            scope="col"
                                            className="table-simple text-left"
                                        >
                                            Tipe Motor
                                        </th>
                                        <th
                                            scope="col"
                                            className="table-simple text-left"
                                        >
                                            Plat Motor
                                        </th>
                                        <th
                                            scope="col"
                                            className="table-simple text-left"
                                        >
                                            Lama Sewa
                                        </th>
                                        <th
                                            scope="col"
                                            className="table-simple text-left"
                                        >
                                            Denda
                                        </th>
                                        <th
                                            scope="col"
                                            className="table-simple text-left"
                                        >
                                            Tanggal Mulai
                                        </th>
                                        <th
                                            scope="col"
                                            className="table-simple text-left"
                                        >
                                            Tanggal Selesai
                                        </th>
                                        <th
                                            scope="col"
                                            className="table-simple"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data?.map((item: Item, index: number) => (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="table-simple-row">
                                                {item.motor.tipe}
                                            </td>
                                            <td className="table-simple-row">
                                                {item.plat_motor}
                                            </td>
                                            <td className="table-simple-row">
                                                {item.lama_sewa}
                                            </td>
                                            <td className="table-simple-row">
                                                {formatUang(item.denda!)}
                                            </td>
                                            <td className="table-simple-row">
                                                {item.tanggal_mulai
                                                    ? moment(item.tanggal_mulai)
                                                          .locale('id')
                                                          .format(
                                                              'DD-MM-YYYY, HH:mm:ss'
                                                          )
                                                    : '-'}
                                            </td>
                                            <td className="table-simple-row">
                                                {item.tanggal_selesai
                                                    ? moment(
                                                          item.tanggal_selesai
                                                      )
                                                          .locale('id')
                                                          .format(
                                                              'DD-MM-YYYY, HH:mm:ss'
                                                          )
                                                    : '-'}
                                            </td>

                                            <td className="flex items-center gap-x-6 px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                {transaksi?.status ===
                                                'Pending' ? (
                                                    <>
                                                        <button
                                                            className="text-green-500 hover:text-green-700"
                                                            onClick={() =>
                                                                handleOpenDendaModal(
                                                                    item.id!
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="text-blue-500 hover:text-blue-700"
                                                            onClick={() =>
                                                                handleOpenPerpanjanganModal(
                                                                    item.id!
                                                                )
                                                            }
                                                        >
                                                            Perpanjang
                                                        </button>
                                                    </>
                                                ) : (
                                                    <AiOutlineCheckCircle
                                                        size={24}
                                                        className="text-green-500"
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {openPerpanjanganModal && (
                <PerpanjangModal
                    onCloseModal={() => setOpenPerpanjanganModal(false)}
                    id={selectedId!}
                />
            )}
            {openDendaModal && (
                <DendaModal
                    onCloseModal={() => setOpenDendaModal(false)}
                    id={selectedId!}
                />
            )}
        </>
    );
};

export default TransaksiDetail;
