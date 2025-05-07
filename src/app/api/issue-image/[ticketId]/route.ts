import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;

  try {
    // Make the request to the external API from the server
    const response = await fetch(`https://workforcev2.elevatics.site/api/issue_image/${ticketId}`, {
      headers: {
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: `Failed to fetch image: ${response.status}` },
        { status: 200 } // Return 200 status even for errors to handle them gracefully in the UI
      );
    }

    const data = await response.json();
    
    // If the API returns success but no image data, handle it gracefully
    if (data.status === 'success' && !data.image_base64) {
      return NextResponse.json(
        { status: 'no_image', message: 'No image available for this ticket' },
        { status: 200 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching issue image:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch issue image' },
      { status: 200 } // Return 200 to handle errors gracefully in the UI
    );
  }
}
