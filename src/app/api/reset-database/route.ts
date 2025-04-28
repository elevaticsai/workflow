import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to reset the database
 * This route acts as a proxy to avoid CORS issues
 */
export async function POST(request: NextRequest) {
  try {
    // Forward the request to the actual API
    const response = await fetch(
      'https://workforcev2.elevatics.site/reset-database',
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
      }
    );

    // Get the response data
    const data = await response.json();

    // Return the response from our API route
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error resetting database:', error);
    return NextResponse.json(
      { message: 'Failed to reset database' },
      { status: 500 }
    );
  }
}
