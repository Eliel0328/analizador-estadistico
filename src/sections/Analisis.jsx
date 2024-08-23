import React from 'react';
import { Table } from '../visualizer/Table';
import { GeneralStats } from '../visualizer/GeneralStats';
import { DashboardStats } from '../visualizer/DashboardStats';
import { BasicChart } from '../charts/BasicChart';
import { PieChart } from '../charts/PieChart';
import { BrushChart } from '../charts/BrushChart';
import WordCloudComponent from '../charts/WordCoud';

export const Analisis = ({
    data = [],
    filename = '',
    stats,
    statsForAuthors,
    seriesTop,
    seriesDays,
    pieSeries,
    pieLabels,
    topMultimedia,
    topDate,
    amountPerYear,
    amountPer12Month,
    amountPerHour,
}) => {
    return (
        <>
            <div className='pb-10'>
                <Table
                    title={'Chat de WhatsApp'}
                    desc={
                        'La información en el archivo [' +
                        filename +
                        '] fue compartida correctamente'
                    }
                    data={data}
                />
            </div>
            <div className='pb-10'>
                <GeneralStats stats={stats} />
            </div>
            <div className='pb-10'>
                <DashboardStats stats={statsForAuthors} />
            </div>
            <div className='pb-10 flex justify-between'>
                <BasicChart
                    title={'Top 10'}
                    desc={'Top de los 10 miembros con mayor cantidad de mensajes'}
                    series={seriesTop}
                    isUsuario={true}
                />
                <BasicChart
                    title={'Actividad por días'}
                    desc={'Actividad del chat según el dia'}
                    series={seriesDays}
                    isUsuario={false}
                />
            </div>
            <div className='pb-10 flex justify-between'>
                <PieChart pieSeries={pieSeries} pieLabels={pieLabels} />
                <BasicChart
                    title={'Top 10 Multimedia'}
                    desc={
                        'Top de los 10 miembros con mayor cantidad de mensajes Multimedia'
                    }
                    series={topMultimedia}
                    isUsuario={false}
                />
            </div>
            <div className='pb-10 flex justify-between'>
               
                <BasicChart
                    title={'Top 10 Fechas activas'}
                    desc={'Top de las 10 fechas más activas'}
                    series={topDate}
                    isUsuario={false}
                />
                <BasicChart
                    title={'Actividad por año'}
                    desc={'Cantidad de mensajes por año'}
                    series={amountPerYear}
                    isUsuario={false}
                />
            </div>
            <div className='pb-10 flex justify-between'>
                
                <BasicChart
                    title={'Actividad por Meses'}
                    desc={'Actividad de los ultimos 12 meses'}
                    series={amountPer12Month}
                    isUsuario={false}
                />
                <BasicChart
                    title={'Actividad por horas'}
                    desc={'Horas mas frecuentes en las que se envian mensajes'}
                    series={amountPerHour}
                    isUsuario={false}
                />
            </div>
            <div className='pb-10 flex justify-center'>
                <BrushChart title={"Actividad por días"} desc={"Cantidad de mensajes por día"} dataset={data}/>
            </div>
            <div className='pb-10 flex justify-between'>
                <WordCloudComponent />
            </div>
        </>
    );
};
