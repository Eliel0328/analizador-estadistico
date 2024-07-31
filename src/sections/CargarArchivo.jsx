import React, { useState } from 'react';

export const CargarArchivo = ({ changeHandler }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files);
    };

    const handleAnalysis = () => {
        if (file) {
            console.log('Iniciar análisis del archivo:', file.name);
            changeHandler(file);
        } else {
            alert('Por favor, cargue un archivo CSV primero.');
        }
    };

    return (
        <>
            <div className='text-left'>
                <p className='text-lg font-semibold'>
                    Explicación de la página y temas parecidos
                </p>
            </div>
            <div className='flex items-center space-x-4 pb-5'>
                <label
                    htmlFor='file-upload'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
                >
                    Cargar Archivo CSV
                </label>
                <input
                    id='file-upload'
                    type='file'
                    accept='.csv'
                    className='hidden'
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleAnalysis}
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                    Iniciar análisis
                </button>
            </div>
        </>
    );
};
