// @ts-nocheck
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

type Props = {
    laporanList: any;
};

const LineChart = ({ laporanList }: Props) => {
    const series = [
        {
            name: 'Pendapatan',
            data: [...laporanList.map((item) => item.pendapatan)]
        },
        {
            name: 'Pengeluaran',
            data: [...laporanList.map((item) => item.pengeluaran)]
        }
    ];

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            type: 'undefined',
            categories: [...laporanList.map((item) => item.bulan)]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yyyy'
            }
        }
    };
    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={250}
            />
        </div>
    );
};

export default LineChart;
