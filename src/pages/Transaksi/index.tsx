import moment from 'moment';
import Table, { SelectColumnFilter, StatusPill } from 'pages/Transaksi/Table';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useTransaksi from './hooks/useTransaksi';

const Transaksi = () => {
  const { data, isLoading } = useTransaksi();
  const [startDate, setStartDate] = useState(
    moment().subtract(30, 'days').toDate()
  );

  const [endDate, setEndDate] = useState(new Date());

  const newData = useMemo(() => {
    return data
      ?.filter((item) => {
        const date = new Date(item.tanggal).setHours(0, 0, 0, 0);
        return (
          date >= startDate.setHours(0, 0, 0, 0) &&
          date <= endDate.setHours(0, 0, 0, 0)
        );
      })
      .map((item: any) => {
        return {
          ...item,
          total: item.transaksi_detail.reduce((total: number, num: any) => {
            return total + num.denda + num.lama_sewa * num.motor.harga;
          }, 0),
        };
      });
  }, [data, startDate, endDate]);

  const column = useMemo(
    () => [
      {
        Header: 'NO',
        accessor: 'no',
      },
      {
        Header: 'Nama',
        accessor: 'nama',
      },
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        tanggal: true,
      },
      {
        Header: 'NIK',
        accessor: 'nik',
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
      },
      {
        Header: 'No Hp',
        accessor: 'no_telp',
      },
      { Header: 'Total', accessor: 'total', uang: true },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusPill,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
    ],
    []
  );

  useEffect(() => {
    if (endDate < startDate) {
      setStartDate(endDate);
    }
  }, [endDate, startDate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Data Transaksi</h2>
        <Link to="add" className="btn btn-blue">
          Tambah
        </Link>
      </div>
      <div className="mt-8 h-full">
        <div className="min-w-full overflow-x-auto max-w-dashboard xl:max-w-full h-full">
          <div className="overflow-hidden md:w-full h-full ml-auto">
            <Table
              columns={column}
              data={newData as any | []}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaksi;
