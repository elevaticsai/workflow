import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to assign a worker to a ticket
 * This route acts as a proxy to avoid CORS issues
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { ticketId: string; workerId: string } }
) {
  const { ticketId, workerId } = params;

  try {
    // Forward the request to the actual API
    const response = await fetch(
      `https://workforcev2.elevatics.site/api/assign/${ticketId}/${workerId}`,
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
    console.error('Error assigning worker:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to assign worker' },
      { status: 500 }
    );
  }
}
