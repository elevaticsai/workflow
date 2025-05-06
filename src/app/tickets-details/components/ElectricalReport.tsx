'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ReportHeader from './ReportHeader';
import TriageAssessment from './TriageAssessment';
import CostBreakdown from './CostBreakdown';
import { useTicketContext } from '@/app/context/TicketContext';
import { formatRelativeTime } from '@/app/hooks/useActiveCases';

const ElectricalReport: React.FC = () => {
  const router = useRouter();
  // Get the selected ticket from context
  const { selectedTicket } = useTicketContext();
  
  // Format the timestamp if a ticket is selected
  const formattedTime = selectedTicket ? formatRelativeTime(selectedTicket.datetime_received) : '';

  // console.log('Selected ticket',selectedTicket)
  
  return (
    <div className="space-y-6">
      {/* Report Header Card */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="p-4">
          {selectedTicket ? (
            <ReportHeader 
              title={`${selectedTicket.category} Report`}
              criticality={selectedTicket.priority}
              ticketId={selectedTicket.ticket_id}
              timestamp={formattedTime}
              location={selectedTicket.location}
              issue={selectedTicket.description}
            />
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>Select a ticket from the list to view details</p>
            </div>
          )}
        </div>
      </div>
      
      {selectedTicket && (
        <>
          {/* Triage Assessment Card */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
            <div className="p-4">
              <TriageAssessment ticketId={selectedTicket.ticket_id} />
            </div>
          </div>
          
          {/* Cost Breakdown Card */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
            <div className="p-4">
              <CostBreakdown ticketId={selectedTicket.ticket_id} />
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex">
            <button 
              onClick={() => router.push(`/assign-workers?ticketId=${selectedTicket.ticket_id}&category=${selectedTicket.category}`)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Assign Worker</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ElectricalReport;
