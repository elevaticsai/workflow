/**
 * API service for fetching data from the backend
 */

// Define types for API responses
export interface ActiveCase {
  ticket_id: string;
  datetime_received: string;
  category: string;
  priority: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  status: string;
}

export interface RequiredSkill {
  skill_name: string;
  criticality: string;
}

export interface RequiredTool {
  tool_name: string;
}

export interface RequiredPart {
  part_name: string;
}

export interface TriageAssessmentData {
  ticket_id: string;
  required_skills: RequiredSkill[];
  required_tools: RequiredTool[];
  required_parts: RequiredPart[];
  criticality: string;
  description: string;
  estimated_hours: number;
  assessment_date: string;
}

export interface CostItem {
  name: string;
  cost?: number;
  usage_fee?: number;
}

export interface CostCategory {
  items: CostItem[];
  total: number;
}

export interface BestWorker {
  name: string;
  match_score: number;
}

export interface LaborCost {
  estimated_hours: number;
  hourly_rate: number;
  total: number;
  best_worker: BestWorker;
}

export interface CostBreakdownData {
  parts: CostCategory;
  tools: CostCategory;
  labor: LaborCost;
  total_cost: number;
}

// Worker match skill interface
export interface MatchedSkill {
  required: string;
  matched: string;
  score: number;
}

// Worker data interface
export interface WorkerData {
  worker_id: string;
  name: string;
  skills: string;
  matched_skills: MatchedSkill[];
  location: string;
  distance: number;
  eta_minutes: number;
  hourly_rate: number;
  match_score: number;
  availability: string;
}

// Worker matches response interface
export interface WorkerMatchesResponse {
  recommended: WorkerData;
  matches: WorkerData[];
}

// Base API URL - using our Next.js API routes to avoid CORS issues
const API_BASE_URL = '/api';

/**
 * Fetch wrapper with error handling and default options
 * @param endpoint - API endpoint to fetch from
 * @param options - Fetch options
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    // Create fetch options with proper headers
    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    };
    
    // Make the API request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    // Parse and return the JSON response
    return await response.json() as T;
  } catch (error) {
    // Enhanced error logging with more context
    console.error(`API fetch error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Get all active service cases
 */
export async function getActiveCases(): Promise<ActiveCase[]> {
  return fetchAPI<ActiveCase[]>('/active-cases');
}

/**
 * Get triage assessment for a specific ticket
 * @param ticketId - The ID of the ticket to get triage assessment for
 */
export async function getTriageAssessment(ticketId: string): Promise<TriageAssessmentData> {
  return fetchAPI<TriageAssessmentData>(`/triage/${ticketId}`);
}

/**
 * Get cost breakdown for a specific ticket
 * @param ticketId - The ID of the ticket to get cost breakdown for
 */
export async function getCostBreakdown(ticketId: string): Promise<CostBreakdownData> {
  return fetchAPI<CostBreakdownData>(`/cost/${ticketId}`);
}

/**
 * Get worker matches for a specific ticket
 * @param ticketId - The ID of the ticket to get worker matches for
 */
export async function getWorkerMatches(ticketId: string): Promise<WorkerMatchesResponse> {
  return fetchAPI<WorkerMatchesResponse>(`/worker/${ticketId}`);
}
