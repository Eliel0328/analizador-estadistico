import React from 'react';
import { numberWithCommas } from '../util/Util';

export const GeneralStats = ({ stats }) => {
    const hasStats = stats && Object.keys(stats).length > 0;

    return (
        <>
            {hasStats && (
                <div className='bg-gray-900 rounded-lg'>
                    <div className='flex justify-between items-center mb-5 pl-20 pt-5'>
                        <h2 className='text-2xl font-semibold'>
                            Informacion General del Chat
                        </h2>
                    </div>
                    <div className='bg-gray-900 text-white flex overflow-hidden rounded-b-lg'>
                        <div className='flex-1 p-6 text-center border-r border-gray-800 hover:bg-gray-700'>
                            <p className='text-gray-400'>Total de Mensajes</p>
                            <p className='text-4xl font-bold'>
                                {numberWithCommas(stats.totalMensajes)}
                            </p>
                        </div>
                        <div className='flex-1 p-6 text-center border-r border-gray-800 hover:bg-gray-700'>
                            <p className='text-gray-400'>Total Multimedia</p>
                            <p className='text-4xl font-bold'>
                                {numberWithCommas(stats.mensajesMultimedia)}
                            </p>
                        </div>
                        <div className='flex-1 p-6 text-center border-r border-gray-800 hover:bg-gray-700'>
                            <p className='text-gray-400'>Total Eliminados</p>
                            <p className='text-4xl font-bold'>
                                {numberWithCommas(stats.mensajesEliminados)}
                            </p>
                        </div>
                        <div className='flex-1 p-6 text-center border-r border-gray-800 hover:bg-gray-700'>
                            <p className='text-gray-400'>
                                Porcentaje Mensajes Eliminados
                            </p>
                            <p className='text-4xl font-bold'>
                                {stats.porcentajeEliminados}
                                <span className='text-xl font-normal'>%</span>
                            </p>
                        </div>
                        <div className='flex-1 p-6 text-center border-r border-gray-800 hover:bg-gray-700'>
                            <p className='text-gray-400'>
                                Porcentaje Mensajes Multimedia
                            </p>
                            <p className='text-4xl font-bold'>
                                {stats.porcentajeMultimedia}
                                <span className='text-xl font-normal'>%</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
