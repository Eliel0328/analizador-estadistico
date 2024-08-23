import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { getTop10Emojis } from '../util/Util';

export const PieChart = ({ dataset, title, desc }) => {
    const result = getTop10Emojis(dataset)

    const getChartOptions = {
        series: result.counts,
        options: {
            chart: {
                width: '100%',
                height: '100%',
                type: 'pie',
            },
            labels: result.labels,
            theme: {
                monochrome: {
                    enabled: true,
                },
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -5,
                    },
                },
            },
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
            },
            dataLabels: {
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex];
                    return [name, val.toFixed(1) + '%'];
                },
            },
            legend: {
                show: false,
            },
        },
    };

    return (
        <div className='max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-900 p-4 md:p-6'>
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
            <ReactApexChart options={getChartOptions.options} series={getChartOptions.series} type="pie" />
              
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
    );
};
