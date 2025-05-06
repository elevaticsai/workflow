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
  // Get the cost breakdown data from the nested structure
  const costData = data?.cost_breakdown;
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
  if (isError || !data || !costData) {
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
                {costData.parts?.items?.map((part: { name: string; cost?: number }, index: number) => (
                  <tr key={index}>
                    <td className="p-2 text-gray-300">{formatName(part.name)}</td>
                    <td className="p-2 text-right text-gray-300">{formatCurrency(part.cost || 0)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-700/50 font-medium">
                  <td className="p-2 text-gray-300">Total Parts</td>
                  <td className="p-2 text-right text-gray-300">{formatCurrency(costData.parts?.total || 0)}</td>
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
                {costData.tools?.items?.map((tool: { name: string; usage_fee?: number }, index: number) => (
                  <tr key={index}>
                    <td className="p-2 text-gray-300">{formatName(tool.name)}</td>
                    <td className="p-2 text-right text-gray-300">{formatCurrency(tool.usage_fee || 0)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-700/50 font-medium">
                  <td className="p-2 text-gray-300">Total Tools</td>
                  <td className="p-2 text-right text-gray-300">{formatCurrency(costData.tools?.total || 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Best Matching Worker */}
      <div className="mt-4 bg-gray-800/30 p-3 rounded-md">
        <p className="text-sm text-gray-400">
          Best matching worker: <span className="text-white font-medium">{costData.labor?.best_worker?.name || 'Not assigned'}</span> {costData.labor?.best_worker?.match_score && <span className="text-gray-500">({formatPercentage(costData.labor.best_worker.match_score)} skill match)</span>}
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
            Estimated Labor ({costData.labor?.estimated_hours || 0} hrs @ {formatCurrency(costData.labor?.hourly_rate || 0)}/hr)
          </span>
          <span className="text-sm text-white">{formatCurrency(costData.labor?.total || 0)}</span>
        </div>
        
        <div className="flex justify-between items-center bg-blue-900/50 p-3 rounded-md font-medium">
          <span className="text-sm text-gray-300">Total Estimated Cost</span>
          <span className="text-sm text-white">{formatCurrency(costData.total_cost || 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;
