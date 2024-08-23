// Función para reformatear las fechas
const reformatDates = (content) => {
    const dateTimePattern =
        /(\d{1,2})\/(\d{1,2})\/(\d{4}),\s(\d{1,2}):(\d{2})\s([ap])\.\sm\./g;
    return content.replace(
        dateTimePattern,
        (match, day, month, year, hour, minute, period) => {
            year = year.slice(-2);
            return `${day}/${month}/${year} ${hour}:${minute} ${period}.m.`;
        }
    );
};


// Función para proteger información sensible
const protectInfo = (string) => {
    // Codificar números de teléfonos
    let pattern = /\b\d{3}[-\s]?\d{7}\b|\(\d{3}\)[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
    string = string.replace(pattern, ' NNNN ');

    // Codificar enlaces
    pattern = /\bhttps?:\/\/\S+\b/g;
    string = string.replace(pattern, 'LLLL');

    // Codificar nombres de usuarios
    pattern = /@\w+\s?/g;
    string = string.replace(pattern, 'UUUU ');

    // Codificar enlaces a WhatsApp
    pattern = /\bwa\.me\/\d+\b/g;
    string = string.replace(pattern, 'NNNN');

    return string;
};

// Función para verificar si una línea contiene fecha y hora
const isDateChat = (line) => {
    const pattern =
        /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}\s[0-9]{1,2}:[0-9]{2}\s[p|a]\.[m]\.\s-/;
    return pattern.test(line);
};

// Función para verificar si una línea contiene un autor
const isAuthor = (line) => {
    const phonePattern = /\+?\d{1,3}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}/;

    // Si el patrón del teléfono coincide, no es un nombre de autor
    return !phonePattern.test(line);
};

// Función para extraer los datos de una línea
const extractDataPoint = (line) => {
    const splitLine = line.split(' - ');
    const [date, time, format] = splitLine[0].split(' ');
    let message = splitLine.slice(1).join(' - ');
    console.log(message);

    let author = null;
    if (isAuthor(message)) {
        const splitMessage = message.split(': ');
        author = splitMessage[0];
        message = splitMessage.slice(1).join(': ');
    }

    return { date, time, format, author, message };
};

// Función para procesar el contenido del archivo
export const processContent = (content) => {
    // Paso 1: Reformatear fechas
    const reformattedContent = reformatDates(content);

    // Paso 2: Procesar línea por línea
    const lines = reformattedContent.split('\n');
    const parsedData = [];
    let messageBuffer = [];
    let currentData = { date: null, time: null, format: null, author: null };

    lines.forEach((line) => {
        line = line.trim();
        if (isDateChat(line)) {
            if (currentData.date) {
                // Añadir el mensaje acumulado al parsedData
                parsedData.push({ ...currentData, message: messageBuffer.join(' ') });
                // Limpiar el buffer de mensajes
                messageBuffer = [];
            }

            // Extraer nuevos datos
            const { date, time, format, author, message } = extractDataPoint(line);
            currentData = { date, time, format, author };
            messageBuffer.push(message);
        } else {
            messageBuffer.push(line);
        }
    });

    // Añadir el último mensaje
    if (currentData.date) {
        parsedData.push({ ...currentData, message: messageBuffer.join(' ') });
    }

    // Paso 3: Crear DataFrame simulado y realizar transformaciones
    // Simularemos el DataFrame utilizando arrays y objetos
    let dataFrame = parsedData
        .filter((entry) => entry.message) // Eliminar mensajes vacíos
        .map((entry) => ({
            Date: entry.date,
            Time: `${entry.time} ${entry.format}`,
            Author: entry.author || 'Unknown',
            Message: protectInfo(entry.message),
        }));

    // Eliminar el primer registro si no es útil (similar a tu código Python)
    dataFrame.shift();

    // Filtrar registros sin autor
    dataFrame = dataFrame.filter((entry) => entry.Author !== 'Unknown');

    // Reemplazar autores únicos con "user X"
    const uniqueAuthors = [...new Set(dataFrame.map((entry) => entry.Author))];
    uniqueAuthors.forEach((author, index) => {
        dataFrame = dataFrame.map((entry) => ({
            ...entry,
            Author: entry.Author === author ? `user ${index}` : entry.Author,
        }));
    });

    // Agregar campos adicionales: Letters, Words, URL_count
    const enrichedData = dataFrame.map((entry) => {
        const letters = entry.Message.length;
        const words = entry.Message.split(/\s+/).length;
        const urlCount = (entry.Message.match(/LLLL/g) || []).length;
        return {
            ...entry,
            Letters: letters,
            Words: words,
            URL_count: urlCount,
        };
    });

    // Paso 4: Agregar información adicional como Day, Num_Day, Month, etc.
    // Para esto, usaremos las APIs de Date de JavaScript
    const week = {
        0: 'Domingo',
        1: 'Lunes',
        2: 'Martes',
        3: 'Miércoles',
        4: 'Jueves',
        5: 'Viernes',
        6: 'Sábado',
    };

    const monthNames = {
        0: 'Ene',
        1: 'Feb',
        2: 'Mar',
        3: 'Abr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Ago',
        8: 'Sept',
        9: 'Oct',
        10: 'Nov',
        11: 'Dic',
    };

    const finalData = enrichedData.map((entry) => {
        // Parsear la fecha y hora
        const dateParts = entry.Date.split('/');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Mes en JavaScript es 0-indexado
        const year = parseInt('20' + dateParts[2], 10); // Asumimos que el año es 20xx
        const [hour, minute] = entry.Time.split(/[:\s]/).map(Number);
        const period = entry.Time.includes('p.m.') ? 'PM' : 'AM';

        let adjustedHour = hour;
        if (period === 'PM' && hour < 12) adjustedHour += 12;
        if (period === 'AM' && hour === 12) adjustedHour = 0;

        const dateObj = new Date(year, month, day, adjustedHour, minute);

        return {
            ...entry,
            Day: week[dateObj.getDay()],
            Num_Day: dateObj.getDate(),
            Month: monthNames[dateObj.getMonth()],
            Num_Month: dateObj.getMonth() + 1,
            Year: dateObj.getFullYear(),
            Date: dateObj.toLocaleDateString('es-ES'),
            Time: dateObj.toTimeString().split(' ')[0],
        };
    });

    // Reorganizar las columnas según tu estructura deseada
    const organizedData = finalData.map((entry) => ({
        Date: entry.Date,
        Day: entry.Day,
        Num_Day: entry.Num_Day,
        Num_Month: entry.Num_Month,
        Month: entry.Month,
        Year: entry.Year,
        Time: entry.Time,
        Author: entry.Author,
        Message: entry.Message,
        Letters: entry.Letters,
        Words: entry.Words,
        URL_count: entry.URL_count,
    }));

    return organizedData;
};


