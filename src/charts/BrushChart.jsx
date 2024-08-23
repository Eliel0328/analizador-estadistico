import React from 'react';
import Chart from 'react-apexcharts';
import { convertToTime, getDateTimeForBrushChar } from '../util/Util';

export const BrushChart = ({ dataset, title, desc }) => {
    const data = getDateTimeForBrushChar(dataset);
    const initialDate = data.length > 0 ? data[0][0] : 0;
    const lastDate = initialDate + 1296000000;

    const options1 = {
        series: [
            {
                data: data,
            },
        ],
        options: {
            chart: {
                id: 'chart2',
                type: 'area',
                height: 230,
                foreColor: '#ccc',
                toolbar: {
                    autoSelected: 'pan',
                    show: false,
                },
            },
            colors: ['#00BAEC'],
            stroke: {
                width: 3,
            },
            grid: {
                borderColor: '#555',
                clipMarkers: false,
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                gradient: {
                    enabled: true,
                    opacityFrom: 0.55,
                    opacityTo: 0,
                },
            },
            markers: {
                size: 5,
                colors: ['#000524'],
                strokeColor: '#00BAEC',
                strokeWidth: 3,
            },
            tooltip: {
                shared: false,
                intersect: false,
                theme: 'dark',
                style: {
                    fontFamily: 'Inter, sans-serif',
                },
                theme: 'dark', // Mantiene el tema oscuro
                y: {
                    title: {
                        formatter: (seriesName) => 'Cantidad: ', // Personaliza el título del tooltip
                    },
                    formatter: (value) => `${value} Mensajes`, // Personaliza la descripción del tooltip
                },
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                min: 0,
                tickAmount: 4,
            },
        },
    };

    var options2 = {
        series: [
            {
                data: data,
            },
        ],
        options: {
            chart: {
                id: 'chart1',
                height: 130,
                type: 'bar',
                foreColor: '#ccc',
                brush: {
                    target: 'chart2',
                    enabled: true,
                },
                selection: {
                    enabled: true,
                    fill: {
                        color: '#fff',
                        opacity: 0.4,
                    },
                    xaxis: {
                        min: initialDate,
                        max: lastDate,
                    },
                },
            },
            colors: ['#FF0080'],
            stroke: {
                width: 2,
            },
            grid: {
                borderColor: '#444',
            },
            markers: {
                size: 0,
            },
            xaxis: {
                type: 'datetime',
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                tickAmount: 2,
            },
        },
    };

    return (
        <>


            <div className='w-full bg-white rounded-lg shadow dark:bg-gray-900 p-8 md:p-6'>
                <div className='flex justify-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700'>
                    <svg
                        className='w-6 h-6 text-gray-500 dark:text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 20 19'
                    >
                        <path d='M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z' />
                        <path d='M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z' />
                    </svg>
                    <h5 className='leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1 pl-3'>
                        {title}
                    </h5>
                </div>
                <div>
                    <Chart
                        options={options1.options}
                        series={options1.series}
                        type='area'
                        height={200}
                    />
                    <Chart
                        options={options2.options}
                        series={options2.series}
                        type='bar'
                        height={150}
                        id='chart-bar'
                    />
                </div>
                <div className='grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between'>
                    <div className='flex justify-between items-center pt-5'>
                        <div>
                            <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                                {desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
