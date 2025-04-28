import { NextResponse } from 'next/server';

/**
 * API route handler for active cases
 * This acts as a proxy to avoid CORS issues with the external API
 */
export async function GET() {
  try {
    // Make the request to the external API from the server
    const response = await fetch('https://workforcev2.elevatics.site/api/active_cases', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Important: Adding cache control to ensure fresh data
      cache: 'no-store',
    });

    // If the external API request fails, return the error
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API error: ${response.status} ${errorText}` },
        { status: response.status }
      );
    }

    // Get the data from the response
    const data = await response.json();
    
    // Return the data with appropriate headers
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching active cases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active cases' },
      { status: 500 }
    );
  }
}
