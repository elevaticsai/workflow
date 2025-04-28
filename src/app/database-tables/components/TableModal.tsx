'use client';

import React from 'react';

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[] | null;
  isLoading: boolean;
  error: string | null;
}

const TableModal: React.FC<TableModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  data, 
  isLoading, 
  error 
}) => {
  if (!isOpen) return null;

  // Early return for loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
        <div className="relative bg-gray-900 rounded-lg p-8 w-11/12 max-w-7xl max-h-[90vh] overflow-auto">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
        <div className="relative bg-gray-900 rounded-lg p-8 w-11/12 max-w-7xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="bg-red-900/30 text-red-200 p-4 rounded-lg">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // If no data
  if (!data || data.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
        <div className="relative bg-gray-900 rounded-lg p-8 w-11/12 max-w-7xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="text-gray-400 text-center py-10">
            <p>No data available for this table.</p>
          </div>
        </div>
      </div>
    );
  }

  // Extract column headers from the first data item
  const columns = Object.keys(data[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative bg-gray-900 rounded-lg p-8 w-11/12 max-w-7xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="flex">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {column.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-700 transition-colors">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableModal;
