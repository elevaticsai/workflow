'use client';

import React, { useEffect, useState } from 'react';

interface IssueImageProps {
  ticketId: string;
}

const IssueImage: React.FC<IssueImageProps> = ({ ticketId }) => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssueImage = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use our Next.js API route instead of calling the external API directly
        const response = await fetch(`/api/issue-image/${ticketId}`);
        
        const data = await response.json();
        
        if (data.status === 'success' && data.image_base64) {
          setImageData(data.image_base64);
        } else if (data.status === 'no_image') {
          // Handle case where ticket exists but has no image
          setImageData(null);
        } else {
          // Handle other error cases
          throw new Error(data.message || 'No image data available');
        }
      } catch (err) {
        console.error('Error fetching issue image:', err);
        setError(err instanceof Error ? err.message : 'Failed to load image');
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchIssueImage();
    }
  }, [ticketId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-400">
        <p>Unable to load issue image: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-200">Incident Image</h3>
      {imageData ? (
        <div className="flex justify-center">
          <img 
            src={`data:image/png;base64,${imageData}`} 
            alt="Issue Image" 
            className="max-w-full rounded-md border border-gray-600"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400 border border-dashed border-gray-700 rounded-md">
          <svg className="w-12 h-12 mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No image available for this ticket</p>
        </div>
      )}
    </div>
  );
};

export default IssueImage;
