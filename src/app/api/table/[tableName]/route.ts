import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { tableName: string } }
) {
  const tableName = params.tableName;

  try {
    // Make the request to the external API
    const response = await fetch(
      `https://workforcev2.elevatics.site/table/${tableName}`,
      {
        headers: {
          Accept: "text/html",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    // Get the HTML content
    const html = await response.text();

    // Return the HTML response
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Error fetching table data:", error);
    return NextResponse.json(
      { error: "Failed to fetch table data" },
      { status: 500 }
    );
  }
}
