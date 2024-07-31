import React from 'react'

export const NoAnalisis = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full text-center">
      <h1 className="text-4xl font-bold text-indigo-600">Sin Datos para el Analisis</h1>
      <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Page not found</h2>
      <p className="mt-2 text-base text-gray-500">Suba un archivo CSV para realizar el analisis</p>
    </div>
  </div>
  )
}
