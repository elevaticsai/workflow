import { useQuery } from '@tanstack/react-query';
import { getTriageAssessment, TriageAssessmentData } from '../services/api';

/**
 * Custom hook for fetching triage assessment data for a specific ticket
 * @param ticketId - The ID of the ticket to get triage assessment for
 */
export function useTriageAssessment(ticketId: string | undefined) {
  return useQuery({
    queryKey: ['triageAssessment', ticketId],
    queryFn: () => {
      if (!ticketId) {
        throw new Error('Ticket ID is required');
      }
      return getTriageAssessment(ticketId);
    },
    // Only fetch if we have a ticket ID
    enabled: !!ticketId,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Format a tool or part name for display
 * Converts snake_case to Title Case with spaces
 */
export function formatName(name: string): string {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get the appropriate color for a criticality level
 */
export function getCriticalityColor(criticality: string): string {
  switch (criticality.toLowerCase()) {
    case 'high':
      return 'bg-red-600';
    case 'medium':
      return 'bg-orange-500';
    case 'low':
      return 'bg-blue-600';
    default:
      return 'bg-gray-600';
  }
}
