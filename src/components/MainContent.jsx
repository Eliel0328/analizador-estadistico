import React, { useEffect, useState } from 'react';
import {
    countOccurrencesByDate,
    countOccurrencesByDay,
    countOccurrencesByHour,
    countOccurrencesByMonth,
    countOccurrencesByName,

    countOccurrencesByWord,

    countOccurrencesByWordByTopDate,

    countOccurrencesByYear,

    getDateTimeForBrushChar,
    getGeneralDataFromCSV,
    getTop10Emojis,
} from '../util/Util';
import { CargarArchivo } from '../sections/CargarArchivo';
import { NoAnalisis } from '../sections/NoAnalisis';
import { Analisis } from '../sections/Analisis';
import { processContent } from '../util/UtilCreateDataset';

export const MainContent = () => {
    const [data, setData] = useState([]);
    const [filename, setFileame] = useState('');

    // Datos del analisis realizado
    const [top, setTop] = useState([]);
    const [topMultimedia, setTopMultimedia] = useState([]);
    const [topDate, setTopDate] = useState([]);
    const [amountPerYear, setAmountPerYear] = useState([]);
    const [amountPer12Month, setAmountPer12Month] = useState([]);
    const [amountPerHour, setAmountPerHour] = useState([]);
    const [dateTimeForBrushChar, setDateTimeForBrushChar] = useState([]);
    const [days, setDays] = useState([]);
    const [topEmojis, setTopEmojis] = useState([]);
    const [generalStats, setGeneralStats] = useState(null);
    const [generalStatsForAuthors, setGeneralStatsForAuthors] = useState([]);

    // PieChart
    const [pieSeries, setPieSeries] = useState([]);
    const [pieLabels, setPieLabels] = useState([]);

    // Leer el archivo CSV
    const changeHandler = (file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileContent = event.target.result;
            setData(processContent(fileContent));
        };
        reader.readAsText(file, 'UTF-8');
    };

    const setGeneralData = () => {
        const dataForAuthors = countOccurrencesByName(data);
        const dataForDays = countOccurrencesByDay(data);
        const dataPieSeries = getTop10Emojis(data);
        const topAuthors = [
            {
                name: 'Cantidad',
                color: '#1A56DB',
                data: Object.entries(dataForAuthors)
                    .sort((a, b) => b[1].total - a[1].total)
                    .slice(0, 10)
                    .map((entry) => ({ x: entry[0], y: entry[1].total })),
            },
        ];

        const topAuthorsMultimedia = [
            {
                name: 'Cantidad',
                color: '#1A56DB',
                data: Object.entries(dataForAuthors)
                    .sort((a, b) => b[1].totalMultimedia - a[1].totalMultimedia)
                    .slice(0, 10)
                    .map((entry) => ({ x: entry[0], y: entry[1].totalMultimedia })),
            },
        ];

        const aux = countOccurrencesByDate(data);

        setGeneralStats(getGeneralDataFromCSV(data));
        setGeneralStatsForAuthors(dataForAuthors);
        setTop(topAuthors);
        setTopMultimedia(topAuthorsMultimedia);
        setTopDate(aux);
        setDays(dataForDays);
        setAmountPerYear(countOccurrencesByYear(data));
        setAmountPer12Month(countOccurrencesByMonth(data));
        setAmountPerHour(countOccurrencesByHour(data));
        setDateTimeForBrushChar(getDateTimeForBrushChar(data));

        setPieSeries(dataPieSeries.series);
        setPieLabels(dataPieSeries.labels);
    };

    useEffect(() => {
        setTop([]);
        setTopMultimedia([]);
        setTopDate([]);
        setTopEmojis([]);
        setDays([]);
        setGeneralStats({});
        setGeneralStatsForAuthors([]);
        setAmountPerYear([]);
        setAmountPer12Month([]);
        setAmountPerHour([]);
        setDateTimeForBrushChar([]);

        setPieLabels([]);
        setPieSeries([]);

        setGeneralData();
    }, [data]);

    return (
        <>
            <div className='text-white p-8 rounded-lg'>
                <div className='flex flex-col items-center justify-center p-4'>
                    <CargarArchivo changeHandler={changeHandler} />
                    <div className='min-h-screen'>
                        {data.length < 1 ? (
                            <NoAnalisis />
                        ) : (
                            <Analisis
                                data={data}
                                filename={filename}
                                stats={generalStats}
                                statsForAuthors={generalStatsForAuthors}
                                seriesTop={top}
                                seriesDays={days}
                                topMultimedia={topMultimedia}
                                topDate={topDate}
                                amountPerYear={amountPerYear}
                                amountPer12Month={amountPer12Month}
                                amountPerHour={amountPerHour}
                                dateTimeForBrushChar={dateTimeForBrushChar}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
