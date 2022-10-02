import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useService from './hooks/useService';
import Table, { SelectColumnFilter, StatusPill } from './Table';

const Service = () => {
  const { data, isLoading } = useService();
  const [startDate, setStartDate] = useState(
    moment().subtract(30, 'days').toDate()
  );

  const [endDate, setEndDate] = useState(new Date());
  const column = useMemo(
    () => [
      {
        Header: 'NO',
        accessor: 'no',
      },
      {
        Header: 'Plat Motor',
        accessor: 'plat_motor',
      },
      {
        Header: 'Tipe Motor',
        accessor: 'tipe_motor',
      },
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        tanggal: true,
      },
      {
        Header: 'Total KM',
        accessor: 'total_km',
      },
      {
        Header: 'Deskripsi',
        accessor: 'deskripsi',
      },
      { Header: 'Total', accessor: 'total_harga', uang: true },
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

  const newData = useMemo(() => {
    return data
      ?.filter((item) => {
        const date = new Date(item.tanggal_service).setHours(0, 0, 0, 0);
        return (
          date >= startDate.setHours(0, 0, 0, 0) &&
          date <= endDate.setHours(0, 0, 0, 0)
        );
      })
      .map((item: any) => {
        return {
          ...item,
          tipe_motor: item.motor.tipe,
        };
      });
  }, [data, startDate, endDate]);

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
        <h2 className="text-2xl font-bold">Data Service</h2>
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

export default Service;
