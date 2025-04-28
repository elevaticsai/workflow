import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;

  try {
    // Fetch data from the external API
    const response = await fetch(
      `https://workforcev2.elevatics.site/api/worker/${ticketId}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching worker matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch worker matches" },
      { status: 500 }
    );
  }
}
