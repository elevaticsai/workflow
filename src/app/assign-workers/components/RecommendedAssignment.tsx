'use client';

import React, { useState } from 'react';
import { WorkerData } from '@/app/services/api';

interface RecommendedAssignmentProps {
  worker: WorkerData;
  ticketId: string;
  parseSkills?: (skillsString: string) => string[];
  formatDistance?: (distanceMeters: number) => string;
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

const RecommendedAssignment: React.FC<RecommendedAssignmentProps> = ({ 
  worker,
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
      const res = await fetch(`/api/assign/${ticketId}/${worker.worker_id}`, {
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
  return (
    <div className="space-y-4 mb-9">
      <h2 className="text-xl font-medium text-white">Recommended Assignment</h2>
      
      <div className="flex items-center justify-between bg-blue-900/30 rounded-lg border border-blue-800 p-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            {worker.name.split(' ').map(part => part[0]).join('')}
          </div>
          
          {/* Worker Details */}
          <div>
            <h3 className="text-white font-medium">{worker.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
              <div className="flex items-center">
                <span className="text-gray-400">Match Score: {worker.match_score.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>ETA: {Math.ceil(worker.eta_minutes / 60)} min</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Rate: ${worker.hourly_rate.toFixed(2)}/hr</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Confirm Button */}
        <button 
          className={`px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} text-white text-sm rounded transition-colors duration-200 flex items-center`}
          onClick={handleAssignWorker}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Assigning...
            </>
          ) : 'Confirm Assignment'}
        </button>
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
    </div>
  );
};

export default RecommendedAssignment;
