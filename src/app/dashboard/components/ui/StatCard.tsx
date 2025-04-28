import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => {
  return (
    <div className="rounded-xl bg-gray-800 p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/30 hover:translate-y-[-4px] cursor-pointer h-24 flex items-center">
      <div className="flex items-center gap-4 w-full">
        <div className={`rounded-md p-3 flex items-center justify-center ${bgColor} transition-all duration-300 hover:scale-110 h-12 w-12 min-w-12`}>
          {icon}
        </div>
        <div className="flex flex-col justify-center h-full">
          <h3 className="text-sm font-medium text-gray-400 transition-all duration-300 group-hover:text-gray-300">{title}</h3>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
