import React, { useEffect, useState } from 'react';
import { numberWithCommas } from '../util/Util';

export const DashboardStats = ({ stats }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRecordsPerPageChange = (event) => {
        setRecordsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = stats.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(stats.length / recordsPerPage);

    return (
        <div className='bg-gray-900 text-white p-8 rounded-lg'>
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h2 className='text-2xl font-semibold'>Informacion por usuarios</h2>
                    <p className='text-gray-400'>Datos generales por usuarios</p>
                </div>
                <div className='flex items-center'>
                    <>
                        <label htmlFor='recordsPerPage' className='mr-2 text-gray-400'>
                            Registro por Página:
                        </label>
                        <select
                            id='recordsPerPage'
                            value={recordsPerPage}
                            onChange={handleRecordsPerPageChange}
                            className='bg-gray-800 text-white py-2 px-3 rounded'
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </>
                </div>
            </div>

            {currentRecords.map((data, index) => (
                <div key={index} className='overflow-x-auto'>
                    <div className='bg-gray-900 text-white flex rounded-lg overflow-hidden hover:bg-gray-600'>
                        <div className='flex-1 p-6 text-center border-r border-gray-800'>
                            <p className='text-6xl font-bold'>{data.Author}</p>
                        </div>
                        <div className='flex-1 p-6 text-center border-r border-gray-800'>
                            <p className='text-gray-400'>Total de mensajes</p>
                            <p className='text-4xl font-bold'>
                                {numberWithCommas(data.total)}
                            </p>
                        </div>
                        <div className='flex-1 p-6 text-center border-r border-gray-800'>
                            <p className='text-gray-400'>Total mensajes Multimedia</p>
                            <p className='text-4xl font-bold'>
                                {numberWithCommas(data.totalMultimedia)}
                            </p>
                        </div>
                        <div className='flex-1 p-6 text-center'>
                            <p className='text-gray-400'>Promedio de Palabras</p>
                            <p className='text-4xl font-bold'>
                                {data.promedioPalabras.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            <div className='flex justify-between items-center mt-4'>
                <span className='text-gray-400'>
                    Página {currentPage} de {totalPages}
                </span>
                <div className='flex'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`py-2 px-4 rounded-l ${
                            currentPage === 1
                                ? 'bg-gray-700'
                                : 'bg-gray-800 hover:bg-gray-600 text-white'
                        }`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`py-2 px-4 rounded-r ${
                            currentPage === totalPages
                                ? 'bg-gray-700'
                                : 'bg-gray-800 hover:bg-gray-600 text-white'
                        }`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};
