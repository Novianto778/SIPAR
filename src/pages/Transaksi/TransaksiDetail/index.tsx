import moment from 'moment';
import { useParams } from 'react-router-dom';
import useTransaksiDetail from '../hooks/useTransaksiDetail';
import 'moment/locale/id';
import { formatUang } from 'utils/formatUang';

const TransaksiDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useTransaksiDetail(id!);
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
                      Denda
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
                  {data?.map((item: any, index: number) => (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="table-simple-row">{item.motor.tipe}</td>
                      <td className="table-simple-row">{item.plat_motor}</td>
                      <td className="table-simple-row">{item.lama_sewa}</td>
                      <td className="table-simple-row">
                        {formatUang(item.denda)}
                      </td>
                      <td className="table-simple-row">
                        {item.tanggal_mulai
                          ? moment(item.tanggal_mulai)
                              .locale('id')
                              .format('DD-MM-YYYY, HH:mm:ss')
                          : '-'}
                      </td>
                      <td className="table-simple-row">
                        {item.tanggal_selesai
                          ? moment(item.tanggal_selesai)
                              .locale('id')
                              .format('DD-MM-YYYY, HH:mm:ss')
                          : '-'}
                      </td>

                      <td className="flex items-center gap-x-6 px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button className="text-green-500 hover:text-green-700">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransaksiDetail;
