import React from 'react';
import TablesGrid from './components/TablesGrid';

export const metadata = {
  title: 'Database Tables | Workforce Management',
  description: 'View and manage database tables in the workforce management system',
};

export default function DatabaseTablesPage() {
  return (
    <div className="text-white p-8 pt-23">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-medium mb-2">Database Tables</h1>
          <p className="text-gray-400">Select a table to view and manage data</p>
        </div>
        
        <TablesGrid />
      </div>
    </div>
  );
}
