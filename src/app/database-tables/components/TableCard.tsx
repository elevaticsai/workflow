'use client';

import React from 'react';

interface TableCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: (e: React.MouseEvent) => void;
}

const TableCard: React.FC<TableCardProps> = ({ title, icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl bg-gray-800 p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/30 hover:translate-y-[-4px] cursor-pointer h-24 flex items-center"
    >
      <div className="flex items-center gap-4 w-full">
        <div className={`rounded-md p-3 flex items-center justify-center ${color} transition-all duration-300 hover:scale-110 h-12 w-12 min-w-12`}>
          {icon}
        </div>
        <div className="flex flex-col justify-center h-full">
          <h3 className="text-sm font-medium text-gray-400 transition-all duration-300 group-hover:text-gray-300">Table</h3>
          <p className="text-xl font-semibold text-white">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
