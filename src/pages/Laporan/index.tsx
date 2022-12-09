import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import { supabase } from 'lib/supabaseClient';
import moment from 'moment';
import useService from 'pages/Service/hooks/useService';
import useTransaksi from 'pages/Transaksi/hooks/useTransaksi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLaporanStore } from 'store/laporanStore';
import { getMonthName } from 'utils/getMonthName';
import { utils, writeFile } from 'xlsx';
import LineChart from './LineChart';
import Table, { ExportExcel } from './Table';

const Laporan = () => {
    const { laporanList, setLaporanList } = useLaporanStore();
    const { data: service, isLoading } = useService();
    const { data: transaksi, isLoading: isLoadingTransaksi } = useTransaksi();
    // const [laporanList, setLaporanList] = useState<any[]>([]);
    const [startDate, setStartDate] = useState(new Date('2022-09-01'));
    const [endDate, setEndDate] = useState(
        new Date(getYear(new Date()), getMonth(new Date()), 30)
    );

    // console.log(startDate, endDate);

    const handleExport = async (start_date: Date, end_date: Date) => {
        const { data: reportDetail } = await supabase.rpc('get_report_detail', {
            start_date,
            end_date
        });

        // console.log(start_date, end_date);

        const newReport = reportDetail?.map((item: any) => {
            return [
                item.id_transaksi,
                item.tanggal,
                item.nama,
                item.no_telp,
                item.alamat,
                item.tipe,
                item.lama_sewa,
                item.tanggal_mulai,
                item.tanggal_selesai,
                item.total,
                item.diskon,
                item.status
            ];
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
                'STATUS'
            ]
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
        utils.sheet_add_json(ws, newReport!, {
            origin: 'A2',
            skipHeader: true
        });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(
            wb,
            `Report ${moment(start_date).format('MMMM YYYY')} - ${moment(
                end_date
            ).format('MMMM YYYY')}.xlsx`
        );
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
            const endMonth = moment(i)
                .add(1, 'month')
                .toDate()
                .setHours(24, 0, 0, 0);

            const { data: pendapatan }: any = await supabase.rpc(
                'total_pendapatan',
                {
                    start_date: new Date(date),
                    end_date:
                        endDate > new Date(endMonth)
                            ? new Date(endMonth)
                            : moment(endDate).add(1, 'days')
                }
            );

            const { data: pengeluaran }: any = await supabase.rpc(
                'total_pengeluaran',
                {
                    start_date: new Date(date),
                    end_date:
                        endDate > new Date(endMonth)
                            ? new Date(endMonth)
                            : moment(endDate).add(1, 'days')
                }
            );

            laporanArray.push({
                start_date: new Date(date).toISOString(),
                end_date:
                    endDate > new Date(endMonth)
                        ? new Date(endMonth).toISOString()
                        : moment(endDate).add(2, 'days').toISOString(),
                bulan: getMonthName(getMonth(i)) + ' ' + getYear(i),
                pendapatan,
                pengeluaran,
                laba: pendapatan - pengeluaran
            });
        }
        setLaporanList(laporanArray as any);
    }, [startDate, endDate, setLaporanList]);

    const column = useMemo(
        () => [
            {
                Header: 'Start Date',
                accessor: 'start_date',
                hidden: true
            },
            {
                Header: 'End Date',
                accessor: 'end_date',
                hidden: true
            },
            {
                Header: 'NO',
                accessor: 'no'
            },
            {
                Header: 'Bulan',
                accessor: 'bulan'
            },
            {
                Header: 'Pendapatan',
                accessor: 'pendapatan',
                uang: true
            },
            {
                Header: 'Pengeluaran',
                accessor: 'pengeluaran',
                uang: true
            },
            {
                Header: 'Laba',
                accessor: 'laba',
                uang: true
            },
            {
                Header: 'Aksi',
                accessor: 'aksi',
                Cell: ({ row }: any) => {
                    return (
                        <ExportExcel
                            handleExport={() =>
                                handleExport(
                                    row.values.start_date,
                                    row.values.end_date
                                )
                            }
                        />
                    );
                }
            }
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

    if (isLoading || isLoadingTransaksi) return <div>Loading...</div>;

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Data Laporan</h2>
                <button
                    className="px-6 py-2 bg-blue-500 rounded text-white font-semibold"
                    onClick={() => handleExport(startDate, endDate)}
                >
                    Export All
                </button>
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
            <LineChart laporanList={laporanList} />
        </>
    );
};

export default Laporan;
