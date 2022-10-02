import moment from 'moment';
import Table, { SelectColumnFilter, StatusPill } from 'pages/Transaksi/Table';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTransaksi from './hooks/useTransaksi';

const Transaksi = () => {
  const { data, isLoading } = useTransaksi();
  const [startDate, setStartDate] = React.useState(
    moment().subtract(30, 'days').toDate()
  );

  const [endDate, setEndDate] = React.useState(new Date());

  const newData = React.useMemo(() => {
    return data
      ?.filter((item) => {
        const date = new Date(item.tanggal);
        return date >= startDate && date <= endDate;
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

  const column = React.useMemo(
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
        accessor: 'NIK',
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
        <h2 className="text-2xl font-bold">Transaksi</h2>
        <Link to="add" className="btn btn-blue">
          Tambah
        </Link>
      </div>
      <div className="mt-8 h-full">
        <div className="min-w-full overflow-x-auto h-full">
          <div className="overflow-hidden max-w-dashboard md:w-full h-full">
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
