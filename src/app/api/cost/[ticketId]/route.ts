import { NextRequest, NextResponse } from "next/server";

/**
 * API route handler for cost breakdown data
 * This acts as a proxy to avoid CORS issues with the external API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;

  try {
    // Make the request to the external API from the server
    const response = await fetch(
      `https://workforcev2.elevatics.site/api/cost/${ticketId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // Important: Adding cache control to ensure fresh data
        cache: "no-store",
      }
    );

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
    console.error(
      `Error fetching cost breakdown for ticket ${ticketId}:`,
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch cost breakdown" },
      { status: 500 }
    );
  }
}
