import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const CircularChart = () => {
    const series = [76, 67, 61, 90];
    const options: ApexOptions = {
        chart: {
            height: 390,
            type: 'radialBar',
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: false
                    }
                }
            }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Beat', 'Scoopy', 'NMAX', 'CRF'],
        legend: {
            show: true,
            floating: true,
            fontSize: '14px',
            position: 'left',
            offsetX: 0,
            offsetY: 0,
            labels: {
                useSeriesColors: true
            },
            formatter: function (seriesName, opts) {
                return (
                    seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
                );
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }
        ]
    };

    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={350}
            />
        </div>
    );
};

export default CircularChart;
