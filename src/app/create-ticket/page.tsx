'use client';

import React from 'react';
import TicketForm from './components/TicketForm';

export default function CreateTicket() {
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-teal-400">
            Create New Ticket
          </h1>
          <p className="mt-2 text-gray-300">
            Submit a new service ticket with all the necessary details to get assistance.
          </p>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl p-6">
          <TicketForm />
        </div>
      </div>
    </div>
  );
}
