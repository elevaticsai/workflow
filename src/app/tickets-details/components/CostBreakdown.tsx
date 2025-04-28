'use client';

import React from 'react';
import { useCostBreakdown, formatCurrency, formatPercentage } from '@/app/hooks/useCostBreakdown';
import { formatName } from '@/app/hooks/useTriageAssessment';

interface CostBreakdownProps {
  ticketId?: string;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ ticketId }) => {
  // Fetch cost breakdown data for the selected ticket
  const { data, isLoading, isError } = useCostBreakdown(ticketId);
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">Cost Breakdown</h3>
        <div className="text-center py-4 text-gray-400">
          <p>Loading cost breakdown...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">Cost Breakdown</h3>
        <div className="text-center py-4 text-red-400">
          <p>Error loading cost breakdown</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">Cost Breakdown</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Parts Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Parts</h4>
          <div className="bg-gray-800/50 rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-700/50">
                  <th className="text-left p-2 text-gray-300">Item</th>
                  <th className="text-right p-2 text-gray-300">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {data.parts.items.map((part, index) => (
                  <tr key={index}>
                    <td className="p-2 text-gray-300">{formatName(part.name)}</td>
                    <td className="p-2 text-right text-gray-300">{formatCurrency(part.cost || 0)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-700/50 font-medium">
                  <td className="p-2 text-gray-300">Total Parts</td>
                  <td className="p-2 text-right text-gray-300">{formatCurrency(data.parts.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tools Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Tools</h4>
          <div className="bg-gray-800/50 rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-700/50">
                  <th className="text-left p-2 text-gray-300">Item</th>
                  <th className="text-right p-2 text-gray-300">Usage Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {data.tools.items.map((tool, index) => (
                  <tr key={index}>
                    <td className="p-2 text-gray-300">{formatName(tool.name)}</td>
                    <td className="p-2 text-right text-gray-300">{formatCurrency(tool.usage_fee || 0)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-700/50 font-medium">
                  <td className="p-2 text-gray-300">Total Tools</td>
                  <td className="p-2 text-right text-gray-300">{formatCurrency(data.tools.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Best Matching Worker */}
      <div className="mt-4 bg-gray-800/30 p-3 rounded-md">
        <p className="text-sm text-gray-400">
          Best matching worker: <span className="text-white font-medium">{data.labor.best_worker.name}</span> <span className="text-gray-500">({formatPercentage(data.labor.best_worker.match_score)} skill match)</span>
        </p>
      </div>
      
      {/* Labor and Total Cost */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
          <span className="text-sm text-gray-300">Category</span>
          <span className="text-sm text-gray-300">Cost</span>
        </div>
        
        <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
          <span className="text-sm text-gray-300">
            Estimated Labor ({data.labor.estimated_hours} hrs @ {formatCurrency(data.labor.hourly_rate)}/hr)
          </span>
          <span className="text-sm text-white">{formatCurrency(data.labor.total)}</span>
        </div>
        
        <div className="flex justify-between items-center bg-blue-900/50 p-3 rounded-md font-medium">
          <span className="text-sm text-gray-300">Total Estimated Cost</span>
          <span className="text-sm text-white">{formatCurrency(data.total_cost)}</span>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;
