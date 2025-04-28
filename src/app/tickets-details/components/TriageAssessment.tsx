'use client';

import React from 'react';
import { useTriageAssessment, formatName, getCriticalityColor } from '@/app/hooks/useTriageAssessment';

interface TriageAssessmentProps {
  ticketId?: string;
}

const TriageAssessment: React.FC<TriageAssessmentProps> = ({ ticketId }) => {
  // Fetch triage assessment data for the selected ticket
  const { data, isLoading, isError } = useTriageAssessment(ticketId);
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">Triage Assessment</h3>
        <div className="text-center py-4 text-gray-400">
          <p>Loading triage assessment...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">Triage Assessment</h3>
        <div className="text-center py-4 text-red-400">
          <p>Error loading triage assessment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
        Triage Assessment
        <span className="text-sm text-gray-400 ml-2">
          (Est. {data.estimated_hours} hours)
        </span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-19">
        {/* Required Skills */}
        <div>
          <h4 className="text-base text-gray-300 mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {data.required_skills.map((skill, index) => (
              <span 
                key={`skill-${index}`} 
                className={`px-2 py-1 text-xs font-medium rounded-md ${getCriticalityColor(skill.criticality)} text-white`}
              >
                {skill.skill_name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Criticality */}
        <div>
          <h4 className="text-base text-gray-300 mb-2">Criticality</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${getCriticalityColor(data.criticality)} text-white`}>
              {data.criticality}
            </span>
          </div>
        </div>
      </div>
      
      {/* Required Tools */}
      <div className='pt-4'>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 flex-shrink-0">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-sm text-gray-300">Required Tools</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.required_tools.map((tool, index) => (
            <span 
              key={`tool-${index}`} 
              className="px-2 py-1 text-xs font-medium rounded-md bg-gray-700 text-white flex items-center gap-1"
            >
              <span className="text-gray-400">🔧</span> {formatName(tool.tool_name)}
            </span>
          ))}
        </div>
      </div>
      
      {/* Required Parts */}
      <div className='pt-4'>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 flex-shrink-0">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-sm text-gray-300">Required Parts</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.required_parts.map((part, index) => (
            <span 
              key={`part-${index}`} 
              className="px-2 py-1 text-xs font-medium rounded-md bg-purple-600 text-white flex items-center gap-1"
            >
              <span>⚡</span> {formatName(part.part_name)}
            </span>
          ))}
        </div>
      </div>
      
      {/* Assessment Notes */}
      <div className='pt-4'>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 flex-shrink-0">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-sm text-gray-300">Assessment Notes</span>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-md text-sm text-gray-300 border-l-4 border-yellow-500">
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default TriageAssessment;
