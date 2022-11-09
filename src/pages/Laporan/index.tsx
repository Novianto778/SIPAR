import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import { supabase } from 'lib/supabaseClient';
import moment from 'moment';
import useService from 'pages/Service/hooks/useService';
import useTransaksi from 'pages/Transaksi/hooks/useTransaksi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMonthName } from 'utils/getMonthName';
import { utils, writeFile } from 'xlsx';
import Table, { ExportExcel } from './Table';

const Laporan = () => {
  const { data: service, isLoading } = useService();
  const { data: transaksi, isLoading: isLoadingTransaksi } = useTransaksi();
  const [laporanList, setLaporanList] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date('2022-09-01'));
  const [endDate, setEndDate] = useState(
    new Date(getYear(new Date()), getMonth(new Date()), 30)
  );

  const handleExport = async (start_date: Date, end_date: Date) => {
    const { data: reportDetail } = await supabase.rpc('get_report_detail', {
      start_date,
      end_date,
    });

    const headings = [
      [
        'ID TRANSAKSI',
        'TANGGAL',
        'NAMA',
        'NO HP',
        'ALAMAT',
        'TIPE MOTOR',
        'LAMA SEWA',
        'TANGGAL MULAI',
        'TANGGAL SELESAI',
        'TOTAL',
        'DISKON',
        'STATUS',
      ],
    ];
    // const newData: any[] = [];
    // const newData = allKegiatan.map((item, index) => {
    //   return [
    //     index + 1,
    //     item.kode_kegiatan,
    //     item.nama_kegiatan,
    //     item.sks,
    //     item.dasar_penilaian,
    //     item.parent_id,
    //     item.keterangan,
    //   ];
    // });
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, reportDetail!, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, `Report ${moment(start_date).format('MMMM YYYY')}.xlsx`);
  };

  const getLaporanList = useCallback(async () => {
    setLaporanList([]);
    const laporanArray = [];
    for (
      let i = startDate;
      i <= endDate;
      i = moment(i).add(getDaysInMonth(i), 'days').toDate()
    ) {
      const date = moment(i).add(1, 'days').toDate().setHours(0, 0, 0, 0);
      const endMonth = moment(i).add(1, 'month').toDate().setHours(0, 0, 0, 0);

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
        start_date: new Date(date).toISOString(),
        end_date: new Date(endMonth).toISOString(),
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
        Header: 'Start Date',
        accessor: 'start_date',
        hidden: true,
      },
      {
        Header: 'End Date',
        accessor: 'end_date',
        hidden: true,
      },
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
        Cell: ({ row }: any) => (
          <ExportExcel
            handleExport={() =>
              handleExport(row.original.start_date, row.original.end_date)
            }
          />
        ),
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
