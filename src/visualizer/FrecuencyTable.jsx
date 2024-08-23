import React, { useState } from 'react';
import { countOccurrencesByWord, countOccurrencesByWordByTopDate } from '../util/Util';

export const FrecuencyTable = ({ title, desc, data = [] }) => {
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
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    
    const totalPages = Math.ceil(data.length / recordsPerPage);   

    return (
        <div className='max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-900 p-4 md:p-6'>
            <div className='flex justify-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700'>
                <div>
                    <h2 className='text-2xl font-semibold'>{title}</h2>
                    <p className='text-gray-400'>{desc}</p>
                </div>
                <div className='flex items-center'>
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
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full leading-normal'>
                    <thead>
                        <tr>
                            <th className='px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                ID
                            </th>
                            <th className='px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Palabra
                            </th>
                            <th className='px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Frecuencia
                            </th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((dt, index) => (
                            <tr className='table-row' key={index}>
                                <td className='px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm'>
                                    <p className='text-white whitespace-no-wrap'>
                                        {index + 1}
                                    </p>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm'>
                                    <p className='text-gray-400 whitespace-no-wrap'>
                                        {dt.word}
                                    </p>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm'>
                                    <p className='text-gray-400 whitespace-no-wrap'>
                                        {dt.count}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
