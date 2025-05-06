import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Since we're handling multipart/form-data, we need to get the FormData
    const formData = await request.formData();
    
    // Get the service_call_input JSON string and parse it
    const serviceCallInputStr = formData.get('service_call_input');
    if (!serviceCallInputStr || typeof serviceCallInputStr !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid service_call_input' },
        { status: 400 }
      );
    }
    
    // Parse the JSON string to an object
    const serviceCallInput = JSON.parse(serviceCallInputStr);
    
    // Get the issue_image file if it exists
    const issueImage = formData.get('issue_image') as File | null;
    
    // Create a new FormData object to send to the external API
    const apiFormData = new FormData();
    apiFormData.append('service_call_input', serviceCallInputStr);
    
    if (issueImage) {
      apiFormData.append('issue_image', issueImage);
    }
    
    // Forward the request to the external API
    const response = await fetch('https://workforcev2.elevatics.site/api/servicecall', {
      method: 'POST',
      // No need to set Content-Type for FormData, the browser will set it with the boundary
      body: apiFormData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('External API error:', errorText);
      return NextResponse.json(
        { error: `External API returned ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    // Get the response data
    const data = await response.json();

    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating service call:', error);
    return NextResponse.json(
      { error: `Failed to create service call: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
