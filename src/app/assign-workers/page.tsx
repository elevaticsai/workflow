'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWorkerMatches } from '../hooks/useWorkerMatches';
import { useActiveCases } from '../hooks/useActiveCases';
import { WorkerData } from '../services/api';
import WorkflowProgress from './components/WorkflowProgress';
import RecommendedAssignment from './components/RecommendedAssignment';
import WorkerCard from './components/WorkerCard';
import IncidentMap from './components/IncidentMap';

export default function AssignWorkersPage() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('ticketId') || 'SC001'; // Default to SC001 if no ticketId is provided
  const ticketType = searchParams.get('category') || 'Electrical'; // Get category from URL or default to Electrical
  
  // State for workflow progress simulation
  const [currentStep, setCurrentStep] = useState(2); // Start at Resource Allocation (step 2)
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Fetch worker matches data
  const { data: workerMatches, isLoading: isLoadingWorkers, error: workersError } = useWorkerMatches(ticketId);
  
  // Fetch active cases to get location data
  const { data: activeCases, isLoading: isLoadingCases, error: casesError } = useActiveCases();
  
  // Find the current ticket to get location data
  const currentTicket = activeCases?.find(ticket => ticket.ticket_id === ticketId);
  
  // Combined loading and error states
  const isLoading = isLoadingWorkers || isLoadingCases;
  const error = workersError || casesError;
  
  // Function to simulate workflow progress
  const simulateWorkflowProgress = useCallback(() => {
    if (isSimulating || currentStep >= 6) return;
    
    setIsSimulating(true);
    
    // Simulate progression through steps 3 to 6
    const simulateNextStep = (step: number) => {
      if (step > 6) {
        setIsSimulating(false);
        return;
      }
      
      setTimeout(() => {
        setCurrentStep(step);
        simulateNextStep(step + 1);
      }, 1500); // 1.5 seconds between steps
    };
    
    // Start simulation from next step
    simulateNextStep(currentStep + 1);
  }, [currentStep, isSimulating]);
  
  // Convert skills string to array
  const parseSkills = (skillsString: string): string[] => {
    return skillsString.split(';').filter(skill => skill.trim() !== '');
  };
  
  // Format distance to miles
  const formatDistance = (distanceMeters: number): string => {
    const miles = (distanceMeters / 1609.34).toFixed(1);
    return `${miles} miles`;
  };
  
  return (
    <div className="p-4 mt-13 space-y-6">
      <header className="mb-9">
        <h1 className="text-3xl font-medium text-white">{ticketType} Ticket  #{ticketId}</h1>
      </header>
      
      {/* Workflow Progress */}
      <WorkflowProgress currentStep={currentStep} />
      
      {/* Incident Location Map */}
      {currentTicket && (
        <IncidentMap 
          latitude={currentTicket.latitude} 
          longitude={currentTicket.longitude} 
        />
      )}
      
      {!currentTicket && !isLoading && (
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 mb-9">
          <p className="text-gray-400">Location data not available for this ticket.</p>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-red-900/30 text-red-200 p-4 rounded-lg border border-red-800">
          <p>Error loading worker data. Please try again.</p>
        </div>
      )}
      
      {/* Content when data is loaded */}
      {workerMatches && !isLoading && !error && (
        <>
          {/* Recommended Assignment */}
          <RecommendedAssignment 
            worker={workerMatches?.recommended} 
            ticketId={ticketId} 
            onAssignmentComplete={simulateWorkflowProgress}
          />
          
          {/* Top Matches */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-white">Top Matches</h2>
            
            <div className="space-y-3">
              {workerMatches?.matches.map((worker: WorkerData) => (
                <WorkerCard 
                  key={worker.worker_id}
                  name={worker.name}
                  skills={parseSkills(worker.skills)}
                  location={worker.location}
                  distance={formatDistance(worker.distance)}
                  eta_minutes={Math.ceil(worker.eta_minutes / 60)}
                  hourly_rate={worker.hourly_rate}
                  matchScore={worker.match_score}
                  isRecommended={worker.worker_id === workerMatches?.recommended.worker_id}
                  worker_id={worker.worker_id}
                  ticketId={ticketId}
                  onAssignmentComplete={simulateWorkflowProgress}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
