'use client';

import React, { useState, useRef } from 'react';

interface WorkflowProgressProps {
  currentStep: number;
}

const WorkflowProgress: React.FC<WorkflowProgressProps> = ({ currentStep }) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  const steps = [
    { id: 1, name: 'Ticket Created', icon: 
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg> 
    },
    { id: 2, name: 'Resource Allocation', icon: 
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg> 
    },
    { id: 3, name: 'Dispatch & Acceptance', icon: 
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg> 
    },
    { id: 4, name: 'On-Site & Tracking', icon: 
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg> 
    },
    { id: 5, name: 'Repair Execution', icon: 
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg> 
    },
    { id: 6, name: 'Completion', icon: 
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg> 
    }
  ];

  return (
    <div className="mb-9">
      <h2 className="text-xl font-medium text-white mb-4">Workflow Progress</h2>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-700" />
        
        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step) => {
            // Determine step status
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isPending = step.id > currentStep;
            
            // Set classes based on status
            let circleClasses = "h-8 w-8 rounded-full flex items-center justify-center z-10";
            let textClasses = "text-xs mt-2 text-center max-w-[80px] mx-auto";
            
            if (isCompleted) {
              circleClasses += " bg-green-500 text-white";
              textClasses += " text-gray-300";
            } else if (isCurrent) {
              circleClasses += " bg-blue-500 text-white";
              textClasses += " text-white";
            } else {
              circleClasses += " bg-gray-700 text-gray-400";
              textClasses += " text-gray-500";
            }
            
            return (
              <div 
                key={step.id} 
                className="flex flex-col items-center relative"
                ref={(el) => { stepRefs.current[step.id] = el }}
                onMouseEnter={() => {
                  if (step.id >= 1 && step.id <= 6) {
                    setHoveredStep(step.id);
                  }
                }}
                onMouseLeave={() => {
                  if (step.id >= 1 && step.id <= 6) {
                    setHoveredStep(null);
                  }
                }}
              >
                <div className={circleClasses}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <div className={textClasses}>{step.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Information Card - Positioned below the steps */}
      {hoveredStep === 1 && (
        <div className="absolute z-50" style={{
          top: (stepRefs.current[1]?.getBoundingClientRect()?.bottom || 0) + (typeof window !== 'undefined' ? window.scrollY : 0) + 10,
          left: (stepRefs.current[1]?.getBoundingClientRect()?.left || 0) + (typeof window !== 'undefined' ? window.scrollX : 0) + 10,
        }}>
          <div 
            className="w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"

          >
            <div className="p-3 bg-blue-900/30 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600/30 text-blue-300 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Ticket Initiation</h3>
                  <p className="text-xs text-gray-400">Actor: Resident</p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">CRM/Ticketing System</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">Call Center / Support Staff</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Time logged</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">Location</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Issue description</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className="text-gray-300">Ticket ID</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Resource Allocation Card */}
      {hoveredStep === 2 && (
        <div className="absolute z-50" style={{
          top: (stepRefs.current[2]?.getBoundingClientRect()?.bottom || 0) + (typeof window !== 'undefined' ? window.scrollY : 0) + 10,
          left: (stepRefs.current[2]?.getBoundingClientRect()?.left || 0) + (typeof window !== 'undefined' ? window.scrollX : 0) + 10,
        }}>
          <div 
            className="w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
          >
            <div className="p-3 bg-blue-900/30 border-b border-gray-700 flex items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600/30 text-blue-300 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Initial Ticket Review</h3>
                  <p className="text-xs text-gray-400">Actor: Customer Service Representative</p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">Customer Information System</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Outage Management System</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Validate customer info</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Priority level</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Dispatch for field investigation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Dispatch & Acceptance Card */}
      {hoveredStep === 3 && (
        <div className="absolute z-50" style={{
          top: (stepRefs.current[3]?.getBoundingClientRect()?.bottom || 0) + (typeof window !== 'undefined' ? window.scrollY : 0) + 10,
          left: (stepRefs.current[3]?.getBoundingClientRect()?.left || 0) + (typeof window !== 'undefined' ? window.scrollX : 0) + 10,
        }}>
          <div 
            className="w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
          >
            <div className="p-3 bg-green-900/30 border-b border-gray-700 flex items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-600/30 text-green-300 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Field Assessment Dispatch</h3>
                  <p className="text-xs text-gray-400">Actor: Dispatch Coordinator</p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-green-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">Field Crew Scheduling</span>
                </div>
                
                <div className="flex items-center p-2 bg-green-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">GPS and Crew Tracker</span>
                </div>
                
                <div className="flex items-center p-2 bg-green-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="text-gray-300">Emergency Crew Vehicle</span>
                </div>
                
                <div className="flex items-center p-2 bg-green-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">Assigned crew</span>
                </div>
                
                <div className="flex items-center p-2 bg-green-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Estimated response time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* On-Site & Tracking Card */}
      {hoveredStep === 4 && (
        <div className="absolute z-50" style={{
          top: (stepRefs.current[4]?.getBoundingClientRect()?.bottom || 0) + (typeof window !== 'undefined' ? window.scrollY : 0) + 10,
          left: (stepRefs.current[4]?.getBoundingClientRect()?.left || 0) + (typeof window !== 'undefined' ? window.scrollX : 0) + 10,
        }}>
          <div 
            className="w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
          >
            <div className="p-3 bg-purple-900/30 border-b border-gray-700 flex items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-600/30 text-purple-300 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">On-site Inspection</h3>
                  <p className="text-xs text-gray-400">Actor: Field Technician</p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-purple-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Personal Protective Equipment</span>
                </div>
                
                <div className="flex items-center p-2 bg-purple-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Drone (optional)</span>
                </div>
                
                <div className="flex items-center p-2 bg-purple-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Mobile Field Device</span>
                </div>
                
                <div className="flex items-center p-2 bg-purple-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Damage assessment</span>
                </div>
                
                <div className="flex items-center p-2 bg-purple-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Site photos</span>
                </div>
                
                <div className="flex items-center p-2 bg-purple-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Hazard status</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Repair Execution Card */}
      {hoveredStep === 5 && (
        <div className="absolute z-50" style={{
          top: (stepRefs.current[5]?.getBoundingClientRect()?.bottom || 0) + (typeof window !== 'undefined' ? window.scrollY : 0) + 10,
          left: (stepRefs.current[5]?.getBoundingClientRect()?.left || 0) + (typeof window !== 'undefined' ? window.scrollX : 0) + 10,
        }}>
          <div 
            className="w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
          >
            <div className="p-3 bg-blue-900/30 border-b border-gray-700 flex items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600/30 text-blue-300 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Repair Dispatch</h3>
                  <p className="text-xs text-gray-400">Actor: Dispatch Coordinator</p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">Crew Management System</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Equipment inventory check</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Bucket Truck or Crane</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">Electric Line Crew</span>
                </div>
                
                <div className="flex items-center p-2 bg-blue-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Safety checks scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Completion Card */}
      {hoveredStep === 6 && (
        <div className="absolute z-50" style={{
          top: (stepRefs.current[6]?.getBoundingClientRect()?.bottom || 0) + (typeof window !== 'undefined' ? window.scrollY : 0) + 10,
          left: (stepRefs.current[6]?.getBoundingClientRect()?.left || 0) + (typeof window !== 'undefined' ? window.scrollX : 0) - 250,
        }}>
          <div 
            className="w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
          >
            <div className="p-3 bg-pink-900/30 border-b border-gray-700 flex items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-600/30 text-pink-300 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Post-Incident Review</h3>
                  <p className="text-xs text-gray-400">Actor: Operations Team</p>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-pink-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Analytics Dashboard</span>
                </div>
                
                <div className="flex items-center p-2 bg-pink-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Incident Reporting Tool</span>
                </div>
                
                <div className="flex items-center p-2 bg-pink-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Response time</span>
                </div>
                
                <div className="flex items-center p-2 bg-pink-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Restoration time</span>
                </div>
                
                <div className="flex items-center p-2 bg-pink-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Reliability indices</span>
                </div>
                
                <div className="flex items-center p-2 bg-pink-900/10 rounded-md">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-300">Lessons learned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowProgress;