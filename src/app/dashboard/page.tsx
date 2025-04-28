import React from 'react';
import DashboardHeader from './components/dashboard/DashboardHeader';
import DashboardStats from './components/dashboard/DashboardStats';

export default function Dashboard() {
  return (
    <div className="mt-15 p-6">
      <DashboardHeader 
        title="Dashboard Overview" 
        subtitle="Welcome to your workforce management dashboard" 
      />
      <DashboardStats />
    </div>
  );
}
