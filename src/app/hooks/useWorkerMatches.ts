import { useQuery } from '@tanstack/react-query';
import { getWorkerMatches, WorkerMatchesResponse } from '../services/api';

/**
 * Custom hook to fetch worker matches for a specific ticket
 * @param ticketId - The ID of the ticket to get worker matches for
 */
export function useWorkerMatches(ticketId: string | undefined) {
  return useQuery<WorkerMatchesResponse>({
    queryKey: ['workerMatches', ticketId],
    queryFn: () => {
      if (!ticketId) {
        throw new Error('Ticket ID is required');
      }
      return getWorkerMatches(ticketId);
    },
    enabled: !!ticketId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
