import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-medium text-white pb-2">{title}</h1>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;
