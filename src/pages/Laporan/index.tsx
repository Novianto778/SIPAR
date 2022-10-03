import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import moment from 'moment';
import useService from 'pages/Service/hooks/useService';
import useTransaksi from 'pages/Transaksi/hooks/useTransaksi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMonthName } from 'utils/getMonthName';
import Table from './Table';

const Laporan = () => {
  const { data: service, isLoading } = useService();
  const { data: transaksi, isLoading: isLoadingTransaksi } = useTransaksi();
  const [laporanList, setLaporanList] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date('2022-09-01'));
  const [endDate, setEndDate] = useState(
    new Date(getYear(new Date()), getMonth(new Date()), 30)
  );

  const getLaporanList = useCallback(() => {
    setLaporanList([]);
    for (
      let i = startDate;
      i <= endDate;
      i = moment(i).add(getDaysInMonth(i), 'days').toDate()
    ) {
      const date = i.setHours(0, 0, 0, 0);
      const endMonth = moment(i).add(1, 'month').toDate().setHours(0, 0, 0, 0);

      console.log(new Date(date), new Date(endMonth));

      const pengeluaran = service
        ?.filter((item) => {
          return (
            new Date(item.tanggal_service).setHours(0, 0, 0, 0) <= endMonth &&
            new Date(item.tanggal_service).setHours(0, 0, 0, 0) >= date
          );
        })
        .reduce((acc, item) => {
          return acc + item.total_harga;
        }, 0);

      const pendapatan = transaksi
        ?.filter((item) => {
          return (
            new Date(item.tanggal).setHours(0, 0, 0, 0) <= endMonth &&
            new Date(item.tanggal).setHours(0, 0, 0, 0) >= date
          );
        })
        .map((item) => item.transaksi_detail[0])
        .reduce((total: number, num) => {
          return total + num.denda + num.lama_sewa * num.motor.harga;
        }, 0);


      setLaporanList((prev) => [
        ...prev,
        {
          bulan: getMonthName(getMonth(i)) + ' ' + getYear(i),
          pendapatan,
          pengeluaran,
          laba: pendapatan - pengeluaran,
        },
      ]);
    }
  }, [startDate, endDate, service, transaksi]);

  const column = useMemo(
    () => [
      {
        Header: 'NO',
        accessor: 'no',
      },
      {
        Header: 'Bulan',
        accessor: 'bulan',
      },
      {
        Header: 'Pendapatan',
        accessor: 'pendapatan',
        uang: true,
      },
      {
        Header: 'Pengeluaran',
        accessor: 'pengeluaran',
        uang: true,
      },
      {
        Header: 'Laba',
        accessor: 'laba',
        uang: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (endDate < startDate) {
      setStartDate(endDate);
    }
  }, [endDate, startDate]);

  useEffect(() => {
    if (service && transaksi) {
      getLaporanList();
    }
  }, [startDate, endDate, service, transaksi, getLaporanList]);

  if (isLoading || isLoadingTransaksi) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">List Laporan</h2>
      </div>
      <div className="mt-8 h-full">
        <div className="min-w-full overflow-x-auto h-full">
          <div className="overflow-hidden max-w-dashboard md:w-full h-full">
            <Table
              columns={column}
              data={laporanList as any | []}
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

export default Laporan;
