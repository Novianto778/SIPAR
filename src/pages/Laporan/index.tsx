import { PostgrestResponse } from '@supabase/supabase-js';
import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import { supabase } from 'lib/supabaseClient';
import moment from 'moment';
import useService from 'pages/Service/hooks/useService';
import useTransaksi from 'pages/Transaksi/hooks/useTransaksi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMonthName } from 'utils/getMonthName';
import Table, { ExportExcel } from './Table';

const Laporan = () => {
  const { data: service, isLoading } = useService();
  const { data: transaksi, isLoading: isLoadingTransaksi } = useTransaksi();
  const [laporanList, setLaporanList] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date('2022-09-01'));
  const [endDate, setEndDate] = useState(
    new Date(getYear(new Date()), getMonth(new Date()), 30)
  );

  const getLaporanList = useCallback(async () => {
    setLaporanList([]);
    const laporanArray = [];
    for (
      let i = startDate;
      i <= endDate;
      i = moment(i).add(getDaysInMonth(i), 'days').toDate()
    ) {
      const date = i.setHours(0, 0, 0, 0);
      const endMonth = moment(i).add(1, 'month').toDate().setHours(0, 0, 0, 0);

      // const pengeluaran = service
      //   ?.filter((item) => {
      //     return (
      //       new Date(item.tanggal_service).setHours(0, 0, 0, 0) <= endMonth &&
      //       new Date(item.tanggal_service).setHours(0, 0, 0, 0) >= date
      //     );
      //   })
      //   .reduce((acc, item) => {
      //     return acc + item.total_harga;
      //   }, 0);

      // const pendapatan = transaksi
      //   ?.filter((item) => {
      //     return (
      //       new Date(item.tanggal).setHours(0, 0, 0, 0) <= endMonth &&
      //       new Date(item.tanggal).setHours(0, 0, 0, 0) >= date
      //     );
      //   })
      //   .map((item) => item.transaksi_detail[0])
      //   .reduce((total: number, num) => {
      //     return total + num.denda + num.lama_sewa * num.motor.harga;
      //   }, 0);
      const { data: pendapatan }: any = await supabase.rpc('total_pendapatan', {
        start_date: new Date(date),
        end_date: new Date(endMonth),
      });

      const { data: pengeluaran }: any = await supabase.rpc(
        'total_pengeluaran',
        {
          start_date: new Date(date),
          end_date: new Date(endMonth),
        }
      );

      laporanArray.push({
        bulan: getMonthName(getMonth(i)) + ' ' + getYear(i),
        pendapatan,
        pengeluaran,
        laba: pendapatan - pengeluaran,
      });
    }
    setLaporanList(laporanArray);
  }, [startDate, endDate]);

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
      {
        Header: 'Aksi',
        accessor: 'aksi',
        Cell: ExportExcel,
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
    if (service && transaksi && laporanList.length === 0) {
      getLaporanList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, service, transaksi, getLaporanList]);

  if (isLoading || isLoadingTransaksi) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Data Laporan</h2>
      </div>
      <div className="mt-8 h-full">
        <div className="min-w-full overflow-x-auto h-full">
          <div className="overflow-hidden max-w-dashboard-small md:w-full h-full">
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
