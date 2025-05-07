import { useQuery } from "@tanstack/react-query";
import { getTriageAssessment, TriageAssessmentData } from "../services/api";

/**
 * Custom hook for fetching triage assessment data for a specific ticket
 * @param ticketId - The ID of the ticket to get triage assessment for
 */
export function useTriageAssessment(ticketId: string | undefined) {
  return useQuery({
    queryKey: ["triageAssessment", ticketId],
    queryFn: () => {
      if (!ticketId) {
        throw new Error("Ticket ID is required");
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
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get the appropriate color for a criticality level
 */
export function getCriticalityColor(criticality: string): string {
  switch (criticality.toLowerCase()) {
    case "high":
      return "text-red-500 border border-red-500 px-4 py-2 rounded-md font-semibold hover:bg-red-500 hover:text-white transition";
    case "medium":
      return "text-orange-500 border border-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-500 hover:text-white transition";
    case "low":
      return "text-blue-500 border border-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-blue-500 hover:text-white transition";
    default:
      return "bg-gray-600";
  }
}
