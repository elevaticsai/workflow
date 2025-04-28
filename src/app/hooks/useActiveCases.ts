import { useQuery } from '@tanstack/react-query';
import { getActiveCases, ActiveCase } from '../services/api';

/**
 * Custom hook for fetching active cases with React Query
 */
export function useActiveCases() {
  return useQuery({
    queryKey: ['activeCases'],
    queryFn: getActiveCases,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Format date string to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

/**
 * Map API case data to UI ticket format
 */
export function mapCaseToTicket(activeCase: ActiveCase) {
  return {
    id: activeCase.ticket_id,
    title: `Ticket #${activeCase.ticket_id}`,
    building: activeCase.location,
    status: activeCase.priority.toUpperCase(),
    time: formatRelativeTime(activeCase.datetime_received),
    category: activeCase.category,
    description: activeCase.description,
  };
}
