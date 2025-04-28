import React from 'react';
import { Ticket } from './ActiveCases';

interface TicketCardProps {
  ticket: Ticket;
  isSelected?: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, isSelected = false }) => {
  // Determine status badge color based on priority
  const getBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'high':
        return 'bg-red-600';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-blue-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className={`p-4 hover:bg-gray-700/30 transition-colors duration-150 ${isSelected ? 'border-l-4 border-blue-500' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-medium">{ticket.title}</h3>
          <p className="text-gray-400 text-sm mt-2">Location: {ticket.building}</p>
          {ticket.category && (
            <p className="text-gray-400 text-xs mt-2">Category: {ticket.category}</p>
          )}
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${getBadgeColor(ticket.status)} text-white`}>
          {ticket.status}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
