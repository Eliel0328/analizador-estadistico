import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export const PieChart = ({ pieSeries, pieLabels}) => {
    // console.log(pieSeries, pieLabels);

    const getChartOptions = {
        // series: [52.8, 26.8, 20.4, 26.8, 26.8],
        options: {
            labels: pieLabels,
            // labels: ['Direct', 'Organic search', 'Referrals', 'Referrals'],
            colors: [
                '#1C64F2', // Azul
                '#16BDCA', // Cian
                '#9061F9', // Violeta
                '#1F77B4', // Azul Claro
                '#2CA02C', // Verde
                '#D62728', // Rojo
                '#FF7F0E', // Naranja
                '#9467BD', // Púrpura
                '#8C564B', // Marrón
                '#E377C2', // Rosa
            ],
            chart: {
                height: 420,
                width: '100%',
                type: 'pie',
            },
            stroke: {
                colors: ['white'],
                lineCap: '',
            },
            plotOptions: {
                pie: {
                    labels: {
                        show: true,
                    },
                    size: '100%',
                    dataLabels: {
                        offset: -25,
                    },
                },
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontFamily: 'Inter, sans-serif',
                },
            },
            legend: {
                position: 'bottom',
                fontFamily: 'Inter, sans-serif',
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + '%';
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + '%';
                    },
                },
                axisTicks: {
                    show: false,
                },
            },
            axisBorder: {
                show: false,
            },
        },
    };

    return (
        <div>
            <div className='max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6'>
                <div className='flex justify-between items-start w-full'>
                    <div className='flex-col items-center'>
                        <div className='flex items-center mb-1'>
                            <svg
                                data-popover-target='chart-info'
                                data-popover-placement='bottom'
                                className='w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z' />
                            </svg>
                            <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white me-1 pl-3'>
                                Website traffic
                            </h5>
                        </div>
                    </div>
                </div>

                <div className='py-6' id='pie-chart'>
                    <Chart
                        options={getChartOptions.options}
                        series={pieSeries}
                        type='pie'
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};
