'use client';

import React from 'react';
import ActiveCases from './components/ActiveCases';
import ElectricalReport from './components/ElectricalReport';
import { TicketProvider } from '../context/TicketContext';

export default function TicketsDetails() {
  return (
    <TicketProvider>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 mt-10">
        {/* Active Cases Section - Takes up 1/3 of the screen on larger displays */}
        <div className="lg:col-span-1">
          <ActiveCases />
        </div>
        
        {/* Electrical Report Section - Takes up 2/3 of the screen on larger displays */}
        <div className="lg:col-span-2">
          <ElectricalReport />
        </div>
      </div>
    </TicketProvider>
  );
}
