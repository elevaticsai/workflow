'use client';

import React from 'react';
import TicketCard from './TicketCard';
import { useActiveCases, mapCaseToTicket } from '@/app/hooks/useActiveCases';
import { useTicketContext } from '@/app/context/TicketContext';

// Extended Ticket interface with additional properties from API
export interface Ticket {
  id: string;
  title: string;
  building: string;
  status: string;
  time: string;
  category?: string;
  description?: string;
}

const ActiveCases: React.FC = () => {
  // Fetch active cases using the custom hook
  const { data, isLoading, isError, error } = useActiveCases();
  
  // Get the ticket context to set the selected ticket
  const { selectedTicket, setSelectedTicket, selectFirstTicket } = useTicketContext();
  
  // Map API data to ticket format for UI
  const tickets: Ticket[] = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(mapCaseToTicket);
  }, [data]);
  
  // Select the first ticket by default when data is loaded
  React.useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      selectFirstTicket(data);
    }
  }, [data, selectFirstTicket]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      <div className="p-4 bg-gray-800/80 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Active Cases</h2>
        {isLoading && (
          <div className="text-sm text-blue-400">Loading...</div>
        )}
      </div>
      
      {isError ? (
        <div className="p-4 text-red-400 text-center">
          <p>Error loading cases: {error?.message || 'Unknown error'}</p>
          <button 
            className="mt-2 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-700">
          {tickets.length === 0 && !isLoading ? (
            <div className="p-4 text-gray-400 text-center">No active cases found</div>
          ) : (
            tickets.map((ticket, index) => {
              // Find the original API data for this ticket
              const originalData = data && Array.isArray(data) ? data[index] : null;
              
              // Check if this ticket is selected
              const isSelected = selectedTicket?.ticket_id === originalData?.ticket_id;
              
              return (
                <div
                  key={ticket.id}
                  onClick={() => originalData && setSelectedTicket(originalData)}
                  className={`cursor-pointer ${isSelected ? 'bg-gray-700/50' : ''}`}
                >
                  <TicketCard ticket={ticket} isSelected={isSelected} />
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveCases;
