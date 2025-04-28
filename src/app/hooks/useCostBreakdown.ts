import { useQuery } from '@tanstack/react-query';
import { getCostBreakdown, CostBreakdownData } from '../services/api';
import { formatName } from './useTriageAssessment';

/**
 * Custom hook for fetching cost breakdown data for a specific ticket
 * @param ticketId - The ID of the ticket to get cost breakdown for
 */
export function useCostBreakdown(ticketId: string | undefined) {
  return useQuery({
    queryKey: ['costBreakdown', ticketId],
    queryFn: () => {
      if (!ticketId) {
        throw new Error('Ticket ID is required');
      }
      return getCostBreakdown(ticketId);
    },
    // Only fetch if we have a ticket ID
    enabled: !!ticketId,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Format currency value to display as dollar amount
 * @param value - The numeric value to format
 * @returns Formatted string with dollar sign and two decimal places
 */
export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

/**
 * Format percentage value from decimal
 * @param value - The decimal value to format (e.g., 0.42857)
 * @returns Formatted string with percentage
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}
