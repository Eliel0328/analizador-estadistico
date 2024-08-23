import React from 'react';
import WordCloud from 'react-d3-cloud';

const WordCloudComponent = () => {
    const data = [
        { text: 'the', value: 50 },
        { text: 'Africa', value: 40 },
        { text: 'bless', value: 35 },
        { text: 'rains', value: 30 },
        { text: 'take', value: 28 },
        { text: 'you', value: 25 },
        { text: 'down', value: 20 },
        // ... (add more words with their respective values)
    ];

    const fontSizeMapper = (word) => Math.log2(word.value) * 5;

    return <WordCloud data={data} fontSizeMapper={fontSizeMapper} rotate={() => 0} />;
};

export default WordCloudComponent;
