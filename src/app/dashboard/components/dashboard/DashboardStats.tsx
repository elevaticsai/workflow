import React from 'react';
import StatCard from '../ui/StatCard';
import { PhoneIcon, UsersIcon, ClockIcon, CheckCircleIcon } from '../../../utils/icons';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-5">
      <StatCard 
        title="Active Calls" 
        value={5} 
        icon={<PhoneIcon />} 
        bgColor="bg-blue-600"
      />
      <StatCard 
        title="Active Workers" 
        value={12} 
        icon={<UsersIcon />} 
        bgColor="bg-emerald-600"
      />
      <StatCard 
        title="Pending Tasks" 
        value={8} 
        icon={<ClockIcon />} 
        bgColor="bg-amber-600"
      />
      <StatCard 
        title="Completed Today" 
        value={3} 
        icon={<CheckCircleIcon />} 
        bgColor="bg-purple-600"
      />
    </div>
  );
};

export default DashboardStats;
