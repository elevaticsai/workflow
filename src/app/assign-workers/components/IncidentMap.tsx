'use client';

import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface IncidentMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '300px'
};

const IncidentMap: React.FC<IncidentMapProps> = ({ latitude, longitude, zoom = 10 }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU'
  });

  const center = {
    lat: latitude,
    lng: longitude
  };

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{
          // Using standard light theme (no custom styles)
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true
          }}
        >
          <Marker position={center} />
        </GoogleMap>
    );
  };

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden mb-9">
      <div className="p-3 border-b border-gray-700">
        <h2 className="text-white font-medium">Incident Location</h2>
      </div>
      {!isLoaded ? (
        <div className="h-[300px] flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : renderMap()}
    </div>
  );
};

export default IncidentMap;
