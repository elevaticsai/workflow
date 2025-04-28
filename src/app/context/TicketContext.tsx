'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ActiveCase } from '../services/api';

// Define the shape of our context
interface TicketContextType {
  selectedTicket: ActiveCase | null;
  setSelectedTicket: (ticket: ActiveCase) => void;
  selectFirstTicket: (tickets: ActiveCase[]) => void;
}

// Create the context with default values
const TicketContext = createContext<TicketContextType>({
  selectedTicket: null,
  setSelectedTicket: () => {},
  selectFirstTicket: () => {},
});

// Provider component that wraps parts of our app that need the context
export function TicketProvider({ children }: { children: ReactNode }) {
  const [selectedTicket, setSelectedTicket] = useState<ActiveCase | null>(null);
  
  // Function to select the first ticket by default
  const selectFirstTicket = (tickets: ActiveCase[]) => {
    if (tickets && tickets.length > 0 && !selectedTicket) {
      setSelectedTicket(tickets[0]);
    }
  };

  return (
    <TicketContext.Provider value={{ selectedTicket, setSelectedTicket, selectFirstTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

// Custom hook to use the context
export function useTicketContext() {
  return useContext(TicketContext);
}
