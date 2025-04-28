'use client';

import React, { useState } from 'react';
import TableCard from './TableCard';
import TableModal from './TableModal';
import { useTableData } from '@/app/hooks/useTableData';
import {
  ServiceCallsIcon,
  WorkersIcon,
  InventoryIcon,
  RoutesIcon,
  WorkerAssignmentsIcon,
  DispatchesIcon
} from './TableIcons';

const TablesGrid: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useTableData(selectedTable);
  
  const handleTableClick = (tableId: string) => {
    setSelectedTable(tableId);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // Prevent default navigation for all table cards
  const handleCardClick = (e: React.MouseEvent, tableId: string) => {
    e.preventDefault();
    handleTableClick(tableId);
  };
  
  const tables = [
    {
      id: 'service-calls',
      title: 'Service Calls',
      icon: <ServiceCallsIcon />,
      color: 'bg-blue-600'
    },
    {
      id: 'workers',
      title: 'Workers',
      icon: <WorkersIcon />,
      color: 'bg-green-600'
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: <InventoryIcon />,
      color: 'bg-purple-600'
    },
    {
      id: 'routes',
      title: 'Routes',
      icon: <RoutesIcon />,
      color: 'bg-orange-500'
    },
    {
      id: 'worker-assignments',
      title: 'Worker Assignments',
      icon: <WorkerAssignmentsIcon />,
      color: 'bg-red-600'
    },
    {
      id: 'dispatches',
      title: 'Dispatches',
      icon: <DispatchesIcon />,
      color: 'bg-indigo-600'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-5">
        {tables.map((table) => (
          <div key={table.id}>
            <TableCard
              title={table.title}
              icon={table.icon}
              color={table.color}
              onClick={(e) => handleCardClick(e, table.id)}
            />
          </div>
        ))}
      </div>
      
      <TableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={tables.find(t => t.id === selectedTable)?.title || ''}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default TablesGrid;
