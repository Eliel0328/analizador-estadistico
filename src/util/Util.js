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
            data: result.sort((a, b) => b.x - a.x).slice(0, 10).reverse(),
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
                .slice(0, 12).reverse(),
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
        if (item.Message !== '<Multimedia omitido>' && item.Message !== 'LLLL' && item.Message !== 'LLLL=' && item.Message !== 'LLLL=='  && item.Message !== 'NNNN') {
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
      
        data.forEach(item => {
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
      const dateArray = Object.keys(dateCounts).map(date => {
        return { date: date, count: dateCounts[date] };
      });
      
      // Ordenar las fechas por su frecuencia en orden descendente
      dateArray.sort((a, b) => b.count - a.count);
      
      // Seleccionar las fechas más frecuentes (por ejemplo, las top 5)
      const topDates = dateArray.slice(0, 5);

      console.log(topDates);
    
      const countWordFrequency = (data) => {
        const wordCounts = {};
      
        data.forEach(item => {
          const words = item.Message.split(' ');
          words.forEach(word => {
            word = word.toLowerCase().replace(/[^\w\s]/gi, ''); // Convertir a minúsculas y eliminar puntuación
            if (!stopWords.includes(word) && word.length > 1) { // Filtrar monosílabos y palabras de parada
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
      
      const wordCloudsByDate = topDates.map(dateObj => {
        const filteredData = data.filter(item => item.Date === dateObj.date);
        const wordCounts = countWordFrequency(filteredData);
      
        // Convertir el objeto de conteo de palabras en un array de objetos
        const wordArray = Object.keys(wordCounts).map(word => {
          return { word: word, count: wordCounts[word] };
        });
      
        // Ordenar las palabras por su frecuencia en orden descendente
        wordArray.sort((a, b) => b.count - a.count);
      
        // Seleccionar las palabras más frecuentes (por ejemplo, las top 10)
        const topWords = wordArray.slice(0, 50);
      
        return { date: dateObj.date, words: topWords };
      });
      
      console.log(wordCloudsByDate);

      
      return null
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

export const isRealValue = (obj) => {
    return obj && obj !== 'null' && obj !== 'undefined';
};

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const isObjectValue = (obj) => {
    return obj && Object.keys(obj).length > 0;
};
