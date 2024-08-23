import { dayOrder, monthsOrder, stopWords } from './Constants';

export const countOccurrencesByName = (array) => {
    const counts = array.reduce((acc, item) => {
        // Convert the value to a number
        const value = parseFloat(item.Words);

        // Initialize the accumulator for the name if it doesn't exist
        if (!acc[item.Author]) {
            acc[item.Author] = { count: 0, thatCount: 0, wordsCount: 0 };
        }

        // Increment the count for the name
        acc[item.Author].count += 1;

        // Increment the thatCount if 'that' appears in the 'other' field
        if (item.Message === '<Multimedia omitido>') {
            acc[item.Author].thatCount += 1;
        }

        // Add the value to the total value for the name
        acc[item.Author].wordsCount += value;

        return acc;
    }, {});
    // Convert the accumulator object to an array of objects
    return Object.keys(counts).map((Author) => ({
        Author,
        total: counts[Author].count,
        totalMultimedia: counts[Author].thatCount,
        promedioPalabras: counts[Author].wordsCount / counts[Author].count,
    }));
};

const compareDays = (a, b) => {
    return dayOrder[a.x] - dayOrder[b.x];
};

export const countOccurrencesByDay = (array) => {
    const counts = array.reduce((acc, item) => {
        if (!acc[item.Day]) {
            acc[item.Day] = { count: 0 };
        }

        acc[item.Day].count += 1;

        return acc;
    }, {});

    const result = Object.keys(counts).map((Day) => ({
        x: Day,
        y: counts[Day].count,
    }));

    return [
        {
            name: 'Cantidad',
            color: '#1A56DB',
            data: result.sort(compareDays),
        },
    ];
};

export const countOccurrencesByDate = (array) => {
    const counts = array.reduce((acc, item) => {
        if (!acc[item.Date]) {
            acc[item.Date] = { count: 0 };
        }

        acc[item.Date].count += 1;

        return acc;
    }, {});

    const result = Object.keys(counts).map((Date) => ({
        x: Date,
        y: counts[Date].count,
    }));

    return [
        {
            name: 'Cantidad',
            color: '#1A56DB',
            data: result.sort((a, b) => b.y - a.y).slice(0, 10),
        },
    ];
};

export const countOccurrencesByYear = (array) => {
    const counts = array.reduce((acc, item) => {
        if (!acc[item.Year]) {
            acc[item.Year] = { count: 0 };
        }

        acc[item.Year].count += 1;

        return acc;
    }, {});

    const result = Object.keys(counts).map((Year) => ({
        x: Year,
        y: counts[Year].count,
    }));

    return [
        {
            name: 'Cantidad',
            color: '#1A56DB',
            data: result
                .sort((a, b) => b.x - a.x)
                .slice(0, 10)
                .reverse(),
        },
    ];
};

export const countOccurrencesByMonth = (data) => {
    const occurrences = {};
    // Contar las ocurrencias de cada combinación de mes y año
    data.forEach((item) => {
        const key = `${item.Month}-${item.Year}`;
        if (!occurrences[key]) {
            occurrences[key] = 0;
        }
        occurrences[key]++;
    });

    // Convertir el objeto de ocurrencias en un array de objetos para una mejor visualización
    const result = Object.keys(occurrences).map((key) => {
        const [month, year] = key.split('-');
        return { x: key, w: month, z: parseInt(year), y: occurrences[key] };
    });

    return [
        {
            name: 'Cantidad',
            color: '#1A56DB',
            data: result
                .sort((a, b) => {
                    if (b.z !== a.z) {
                        return b.z - a.z;
                    }
                    return monthsOrder.indexOf(b.w) - monthsOrder.indexOf(a.w);
                })
                .slice(0, 12)
                .reverse(),
        },
    ];
};

export const countOccurrencesByHour = (array) => {
    const counts = array.reduce((acc, item) => {
        const Hour = item.Time.split(':')[0];

        if (!acc[Hour]) {
            acc[Hour] = { count: 0 };
        }

        acc[Hour].count += 1;

        return acc;
    }, {});

    const result = Object.keys(counts).map((Hour) => ({
        x: Hour,
        y: counts[Hour].count,
    }));

    return [
        {
            name: 'Cantidad',
            color: '#1A56DB',
            data: result.sort((a, b) => b.y - a.y).slice(0, 10),
        },
    ];
};

export const countOccurrencesByWord = (data) => {
    const wordCounts = {};

    data.forEach((item) => {
        if (
            item.Message !== '<Multimedia omitido>' &&
            item.Message !== 'LLLL' &&
            item.Message !== 'LLLL=' &&
            item.Message !== 'LLLL==' &&
            item.Message !== 'NNNN'
        ) {
            const words = item.Message.split(' ');
            words.forEach((word) => {
                word = word.toLowerCase(); // Convertir a minúsculas y eliminar puntuación
                if (!stopWords.includes(word) && word.length > 1) {
                    // Filtrar monosílabos y palabras de parada
                    if (wordCounts[word]) {
                        wordCounts[word]++;
                    } else {
                        wordCounts[word] = 1;
                    }
                }
            });
        }
    });
    // Convertir el objeto de conteo de palabras en un array de objetos
    const wordArray = Object.keys(wordCounts).map((word) => {
        return { word: word, count: wordCounts[word] };
    });

    // Ordenar las palabras por su frecuencia en orden descendente
    wordArray.sort((a, b) => b.count - a.count);

    // Seleccionar las palabras más frecuentes (por ejemplo, las top 10)
    return wordArray.slice(0, 50);
};

export const countOccurrencesByWordByTopDate = (data) => {
    const countDateFrequency = (data) => {
        const dateCounts = {};

        data.forEach((item) => {
            const date = item.Date;
            if (dateCounts[date]) {
                dateCounts[date]++;
            } else {
                dateCounts[date] = 1;
            }
        });

        return dateCounts;
    };

    // Contar las fechas en los datos
    const dateCounts = countDateFrequency(data);

    // Convertir el objeto de conteo de fechas en un array de objetos
    const dateArray = Object.keys(dateCounts).map((date) => {
        return { date: date, count: dateCounts[date] };
    });

    // Ordenar las fechas por su frecuencia en orden descendente
    dateArray.sort((a, b) => b.count - a.count);

    // Seleccionar las fechas más frecuentes (por ejemplo, las top 5)
    const topDates = dateArray.slice(0, 5);

    const countWordFrequency = (data) => {
        const wordCounts = {};

        data.forEach((item) => {
            const words = item.Message.split(' ');
            words.forEach((word) => {
                word = word.toLowerCase().replace(/[^\w\s]/gi, ''); // Convertir a minúsculas y eliminar puntuación
                if (!stopWords.includes(word) && word.length > 1) {
                    // Filtrar monosílabos y palabras de parada
                    if (wordCounts[word]) {
                        wordCounts[word]++;
                    } else {
                        wordCounts[word] = 1;
                    }
                }
            });
        });

        return wordCounts;
    };

    const wordCloudsByDate = topDates.map((dateObj) => {
        const filteredData = data.filter((item) => item.Date === dateObj.date);
        const wordCounts = countWordFrequency(filteredData);

        // Convertir el objeto de conteo de palabras en un array de objetos
        const wordArray = Object.keys(wordCounts).map((word) => {
            return { word: word, count: wordCounts[word] };
        });

        // Ordenar las palabras por su frecuencia en orden descendente
        wordArray.sort((a, b) => b.count - a.count);

        // Seleccionar las palabras más frecuentes (por ejemplo, las top 10)
        const topWords = wordArray.slice(0, 50);

        return { date: dateObj.date, words: topWords };
    });

    return null;
};

export const getTop10Emojis = (data = []) => {
    // Función para contar los emojis en el texto
    const countEmojis = (str) => {
        const emojiRegex = /([\u{1F600}-\u{1F64F}])/gu;
        const matches = str.match(emojiRegex);
        return matches ? matches : [];
    };

    // Paso 1: Cuenta la frecuencia de cada emoji
    const emojiCounts = data.reduce((acc, item) => {
        const emojis = countEmojis(item.Message);
        emojis.forEach((label) => {
            acc[label] = (acc[label] || 0) + 1;
        });
        return acc;
    }, {});

    // Paso 2: Calcula el total de emojis
    const totalEmojis = Object.values(emojiCounts).reduce((acc, count) => acc + count, 0);

    // Paso 3: Calcula el porcentaje de cada emoji
    const emojiPercentages = Object.entries(emojiCounts).map(([label, count]) => {
        return { label, count, series: ((count / totalEmojis) * 100).toFixed(2) };
    });

    // Paso 4: Ordena los emojis por frecuencia y selecciona los diez más frecuentes
    const topEmojis = emojiPercentages.sort((a, b) => b.count - a.count).slice(0, 10);

    const result = {
        labels: topEmojis.map((item) => item.label),
        counts: topEmojis.map((item) => item.count),
        series: topEmojis.map((item) => item.series),
    };

    return result;
};

export const getGeneralDataFromCSV = (data) => {
    let totalMensajes = data.length;
    let mensajesMultimedia = data.filter(
        (d) => d.Message === '<Multimedia omitido>'
    ).length;
    let mensajesEliminados = data.filter(
        (d) =>
            d.Message === 'Eliminaste este mensaje.' ||
            d.Message === 'Se eliminó este mensaje.'
    ).length;
    let porcentajeMultimedia = ((mensajesMultimedia / totalMensajes) * 100).toFixed(2);
    let porcentajeEliminados = ((mensajesEliminados / totalMensajes) * 100).toFixed(2);
    let mensajesEnlaces = data.reduce((n, { URL_count }) => n + URL_count, 0);

    return {
        totalMensajes,
        mensajesMultimedia,
        mensajesEliminados,
        porcentajeMultimedia,
        porcentajeEliminados,
        mensajesEnlaces,
    };
};

export const getDateTimeForBrushChar = (data) => {
    const counts = data.reduce((acc, item) => {
        if (!acc[item.Date]) {
            acc[item.Date] = { count: 0 };
        }

        acc[item.Date].count += 1;

        return acc;
    }, {});

    const result = Object.keys(counts).map((da) => [convertToTime(da), counts[da].count]);

    return result;
};

export const convertToTime = (dateString) => {
    // Suponiendo que el formato es "dd/MM/yyyy"
    const [day, month, year] = dateString.split('/').map(Number);

    // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que restamos 1
    const date = new Date(year, month - 1, day);

    // Obtener el tiempo en milisegundos
    return date.getTime();
};

export const isRealValue = (obj) => {
    return obj && obj !== 'null' && obj !== 'undefined';
};

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const isObjectValue = (obj) => {
    return obj && Object.keys(obj).length > 0;
};

export const formatDate = (dateString) => {
    return dateString.replace(
        /(\d{1,2})\/(\d{1,2})\/(\d{4}),\s(\d{1,2}):(\d{2})\s([ap])\.\sm\./g,
        (_, day, month, year, hour, minute, period) => {
            year = year.slice(-2);
            return `${day}/${month}/${year} ${hour}:${minute} ${period}.m.`;
        }
    );
};

export const protecInfo = (string) => {
    // Codificar números de teléfono
    string = string.replace(
        /\b\d{3}[-\s]?\d{7}\b|\(\d{3}\)[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
        'NNNN'
    );

    // Codificar enlaces
    string = string.replace(/\bhttps?:\/\/\S+\b/g, 'LLLL');

    // Codificar nombres de usuario
    string = string.replace(/@\w+\s?/g, 'UUUU');

    // Codificar enlaces de WhatsApp
    string = string.replace(/\bwa.me\/\d+\b/g, 'NNNN');

    return string;
};
export const isDateChat = (line) => {
    const pattern =
        /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}\s[0-9]{1,2}:[0-9]{2}\s[p|a]\.[m]\.\s-/;
    return pattern.test(line);
};

export const isAuthor = (line) => {
    const phonePattern = /\+?\d{1,3}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}/;

    // Si el patrón del teléfono coincide, no es un nombre de autor
    return !phonePattern.test(line);
};

export const parseData = (fileContent) => {
    const lines = fileContent.split('\n');
    const parsedData = [];
    let messageBuffer = [];
    let Date = null,
        Time = null,
        Format = null,
        Author = null;

    lines.forEach((line) => {
        line = line.trim();

        if (isDateChat(line)) {
            if (messageBuffer.length > 0) {
                parsedData.push({
                    Date,
                    Time,
                    Format,
                    Author,
                    Message: messageBuffer.join(' '),
                });
            }
            messageBuffer = [];

            const [datePart, messagePart] = line.split(' - ');
            const dateTime = datePart.split(' ');
            Date = dateTime[0];
            Time = dateTime[1];
            Format = dateTime[2];

            if (isAuthor(messagePart)) {
                const authorMessage = messagePart.split(': ');
                Author = authorMessage[0];
                messageBuffer.push(authorMessage.slice(1).join(': '));
            } else {
                Author = null;
                messageBuffer.push(messagePart);
            }
        } else {
            messageBuffer.push(line);
        }
    });

    if (messageBuffer.length > 0) {
        parsedData.push({
            Date,
            Time,
            Format,
            Author,
            Message: messageBuffer.join(' '),
        });
    }

    return parsedData;
};
