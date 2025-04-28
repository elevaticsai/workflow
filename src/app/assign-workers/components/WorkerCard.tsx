'use client';

import React, { useState } from 'react';

interface WorkerCardProps {
  name: string;
  skills: string[];
  location?: string;
  distance: string;
  eta_minutes?: number;
  hourly_rate?: number;
  matchScore: number;
  isRecommended?: boolean;
  worker_id: string;
  ticketId: string;
  onAssignmentComplete?: () => void;
}

interface AssignmentResponse {
  success: boolean;
  message: string;
  assignment: {
    ticket_id: string;
    worker_id: string;
    worker_name: string;
    assignment_time: string;
    status: string;
  };
}

const WorkerCard: React.FC<WorkerCardProps> = ({
  name,
  skills,
  location = 'Building D',
  distance,
  eta_minutes = 3,
  hourly_rate = 26.50,
  matchScore,
  isRecommended = false,
  worker_id,
  ticketId,
  onAssignmentComplete
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<AssignmentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleAssignWorker = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/assign/${ticketId}/${worker_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResponse(data);
        // Trigger workflow progress simulation if assignment was successful
        if (onAssignmentComplete) {
          onAssignmentComplete();
          // Show modal after simulation completes (about 6 seconds)
          setTimeout(() => {
            setShowModal(true);
          }, 6000);
        } else {
          // If no simulation, show modal immediately
          setShowModal(true);
        }
      } else {
        setError(data.detail || 'Failed to assign worker');
        setShowModal(true);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  // Format match score to one decimal place
  const formattedScore = matchScore.toFixed(1);
  
  return (
    <>
      <div className="rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700 mb-3">
        <div className="flex justify-between items-center p-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-medium">{name}</h3>
              <div className="text-blue-400 font-semibold">{formattedScore}</div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-1">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 text-xs rounded-full bg-blue-600/30 text-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <button 
            className={`px-3 py-1 ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm rounded transition-colors duration-200 flex items-center`}
            onClick={handleAssignWorker}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs">Assigning...</span>
              </>
            ) : 'Assign'}
          </button>
        </div>
        
        {/* Stats */}
        <div className="flex text-xs text-gray-400 bg-gray-800/80 p-2">
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
          
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{distance}</span>
          </div>
          
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{eta_minutes} min</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${hourly_rate.toFixed(2)}/hr</span>
          </div>
        </div>
      </div>
      
      {/* Response Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className={`p-4 ${response?.success ? 'bg-green-900/30' : 'bg-red-900/30'} rounded-t-lg flex justify-between items-center`}>
              <h3 className="text-lg font-medium text-white">
                {response?.success ? 'Assignment Successful' : 'Assignment Failed'}
              </h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {response ? (
                <>
                  <p className="text-gray-300 mb-4">{response.message}</p>
                  
                  {response.success && response.assignment && (
                    <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ticket ID:</span>
                        <span className="text-white">{response.assignment.ticket_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Worker:</span>
                        <span className="text-white">{response.assignment.worker_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assignment Time:</span>
                        <span className="text-white">{new Date(response.assignment.assignment_time).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400">{response.assignment.status}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-red-400">{error || 'An unknown error occurred'}</p>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors duration-200"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkerCard;
