import { ReactComponent as Motor } from 'assets/icon/motor.svg';
import { ReactComponent as Beat } from 'assets/icon/honda-beat.svg';
import { ReactComponent as Transaction } from 'assets/icon/transaction.svg';
import { ReactComponent as Calculator } from 'assets/icon/calculator.svg';
import StatisticCard from './components/StatisticCard';
import { formatUang } from 'utils/formatUang';
import { useJumlahTransaksi } from './hooks/useJumlahTransaksi';
import useGetMotorOnGoing from 'hooks/useGetMotorOnGoing';
import usePendapatan from 'hooks/usePendapatan';
import LineChart from 'pages/Laporan/LineChart';
import { useLaporanStore } from 'store/laporanStore';

const orders = [
    {
        name: 'Eren Jaegar',
        motor: 'Honda Beat - AB 1234 CD',
        total: 'Rp 125.000',
        status: 'completed'
    },
    {
        name: 'Reiner Braunn',
        motor: 'Honda Beat - AB 1234 CD',
        total: 'Rp 145.000',
        status: 'pending'
    },
    {
        name: 'Levi Ackerman',
        motor: 'Honda Beat - AB 1234 CD',
        total: 'Rp 105.000',
        status: 'pending'
    },
    {
        name: 'Historia Reiss',
        motor: 'Honda Beat - AB 1234 CD',
        total: 'Rp 45.000',
        status: 'completed'
    },
    {
        name: 'Armin Arlert',
        motor: 'Honda Beat - AB 1234 CD',
        total: 'Rp 125.000',
        status: 'completed'
    },
    {
        name: 'Hanji Zoe',
        motor: 'Honda Beat - AB 1234 CD',
        total: 'Rp 245.000',
        status: 'completed'
    }
];

const Dashboard = () => {
    const { laporanList } = useLaporanStore();
    const { data } = useJumlahTransaksi();
    const { data: jumlahOnGoing } = useGetMotorOnGoing();
    const { data: pendapatan } = usePendapatan(
        new Date('2022-01-01'),
        new Date()
    );

    return (
        <div className="flex flex-col h-full gap-x-4">
            <div className="col-span-2">
                <section className="lg:px-2 py-4">
                    <h2 className="text-lg font-semibold">Statistik</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-4 justify-between">
                        <StatisticCard
                            title="Motor On-Going"
                            value={jumlahOnGoing as number}
                            Icon={Motor}
                        />
                        <StatisticCard
                            title="Jumlah Transaksi"
                            value={data as number}
                            Icon={Transaction}
                        />
                        <StatisticCard
                            title="Total Pendapatan"
                            value={formatUang(parseFloat(pendapatan))}
                            Icon={Calculator}
                        />
                    </div>
                </section>
                <section className="mt-8">
                    <LineChart laporanList={laporanList} />
                </section>
            </div>
            {/* <div className="col-span-2 lg:col-span-1 rounded max-h-72 shadow-sm mt-4 lg:mt-0">
                <div className="w-full h-full bg-white p-4 ">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                        <h2 className="font-semibold">Motor Kembali</h2>
                        <ReactSelect
                            defaultValue={{ label: 'Today', value: '0' }}
                            options={[
                                { label: 'Today', value: '0' },
                                { label: 'Tommorow', value: '1' }
                            ]}
                            className="text-xs font-medium"
                        />
                    </div>
                    <MotorKembaliCard
                        Icon={Motor}
                        nama="Yonathan H.S."
                        jenis_motor="Scoopy"
                        plat="AB 1234 CD"
                    />
                    <MotorKembaliCard
                        Icon={Beat}
                        nama="Nurul Hidayah"
                        jenis_motor="Beat"
                        plat="AB 1234 CD"
                    />
                    <MotorKembaliCard
                        Icon={Motor}
                        nama="Bapak Budi"
                        jenis_motor="Scoopy"
                        plat="AB 1234 CD"
                    />
                    <Link
                        to="/"
                        className="text-center text-sm block mt-4 text-blue-500"
                    >
                        Lihat Semua
                    </Link>
                </div>
                <div className="bg-white p-4 w-full rounded mt-4">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                            <h2 className="font-semibold">Motor On-Going</h2>
                            <ReactSelect
                                defaultValue={{ label: 'Today', value: '0' }}
                                options={[
                                    { label: 'Today', value: '0' },
                                    { label: 'Tommorow', value: '1' }
                                ]}
                                className="text-xs font-medium"
                            />
                        </div>
                        <CircularChart />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Dashboard;
