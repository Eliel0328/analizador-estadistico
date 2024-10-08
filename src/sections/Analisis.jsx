import React from 'react';
import { Table } from '../visualizer/Table';
import { GeneralStats } from '../visualizer/GeneralStats';
import { DashboardStats } from '../visualizer/DashboardStats';
import { BasicChart } from '../charts/BasicChart';
import { PieChart } from '../charts/PieChart';
import { BrushChart } from '../charts/BrushChart';
import WordCloudComponent from '../charts/WordCoud';
import { FrecuencyTable } from '../visualizer/FrecuencyTable';
import { countOccurrencesByWord, countOccurrencesByWordByTopDate } from '../util/Util';

export const Analisis = ({
    data = [],
    filename = '',
    stats,
    statsForAuthors,
    seriesTop,
    seriesDays,
    topMultimedia,
    topDate,
    amountPerYear,
    amountPer12Month,
    amountPerHour,
}) => {
    const wordFrecuncyOnDays = countOccurrencesByWordByTopDate(data);
    
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
                <PieChart
                    dataset={data}
                    title={'Top 10 emojis'}
                    desc={'Los Emojis mas usados en la conversacion'}
                />
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
                <BrushChart
                    title={'Actividad por días'}
                    desc={'Cantidad de mensajes por día'}
                    dataset={data}
                />
            </div>
            <div className='pb-10 flex justify-between'>
                <WordCloudComponent />
            </div>

            <div className='pb-10 flex justify-between'>
                <FrecuencyTable
                    title={'Frecuencia de palabras'}
                    desc={'Las palabras mas frecuentes en todo el chat'}
                    data={countOccurrencesByWord(data)}
                />

                <FrecuencyTable
                    title={'Frecuencia de palabras por dias'}
                    desc={
                        'Las palabras mas frecuentes del dia ' +
                        wordFrecuncyOnDays[0].date
                    }
                    data={wordFrecuncyOnDays[0].words}
                />
            </div>
            <div className='pb-10 flex justify-between'>
            <FrecuencyTable
                    title={'Frecuencia de palabras por dias'}
                    desc={
                        'Las palabras mas frecuentes del dia ' +
                        wordFrecuncyOnDays[1].date
                    }
                    data={wordFrecuncyOnDays[1].words}
                />

                <FrecuencyTable
                    title={'Frecuencia de palabras por dias'}
                    desc={
                        'Las palabras mas frecuentes del dia ' +
                        wordFrecuncyOnDays[2].date
                    }
                    data={wordFrecuncyOnDays[2].words}
                />
            </div>
            <div className='pb-10 flex justify-between'>
            <FrecuencyTable
                    title={'Frecuencia de palabras por dias'}
                    desc={
                        'Las palabras mas frecuentes del dia ' +
                        wordFrecuncyOnDays[3].date
                    }
                    data={wordFrecuncyOnDays[3].words}
                />
                <FrecuencyTable
                    title={'Frecuencia de palabras por dias'}
                    desc={
                        'Las palabras mas frecuentes del dia ' +
                        wordFrecuncyOnDays[4].date
                    }
                    data={wordFrecuncyOnDays[4].words}
                />
            </div>
        </>
    );
};
