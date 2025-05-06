"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
  category: string;
  description: string;
  location: string;
  latitude: string;
  longitude: string;
  priority: string; 
  issue_image?: File | null;
}

const TicketForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGeocodingLocation, setIsGeocodingLocation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    priority: "Medium",
    issue_image: null,
  });

  const categories = [
    "Electrical",
    "Mechanical",
    "Plumbing",
    "HVAC",
    "IT",
    "Security",
    "Other",
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If location field is changed and has at least 3 characters, try to geocode it
    if (name === "location" && value.length > 3) {
      // Debounce the geocoding request to avoid too many API calls
      const debounceTimer = setTimeout(() => {
        geocodeLocation(value);
      }, 1000); // Wait 1 second after typing stops

      return () => clearTimeout(debounceTimer);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, issue_image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const geocodeLocation = async (locationName: string) => {
    if (isGeocodingLocation) return;

    try {
      setIsGeocodingLocation(true);

      // Use OpenStreetMap's Nominatim API to geocode the location name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          locationName
        )}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];

        // Update form data with the coordinates
        setFormData((prev) => ({
          ...prev,
          latitude: parseFloat(lat).toFixed(6),
          longitude: parseFloat(lon).toFixed(6),
        }));
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
    } finally {
      setIsGeocodingLocation(false);
    }
  };

  const getCurrentLocation = () => {
    // Reset any previous error
    setLocationError(null);
    setIsGettingLocation(true);

    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
      return;
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Success handler
        const { latitude, longitude } = position.coords;

        try {
          // Try to get location name using reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          // Extract location name from response
          let locationName = "";

          if (data && data.address) {
            // Try to construct a meaningful location name from address components
            const address = data.address;
            if (address.building) {
              locationName = address.building;
            } else if (address.amenity) {
              locationName = address.amenity;
            } else if (address.road) {
              locationName = address.road;
              if (address.house_number) {
                locationName = `${address.house_number} ${locationName}`;
              }
            }

            // If we couldn't get a specific building or road, use the neighborhood or suburb
            if (!locationName && (address.neighbourhood || address.suburb)) {
              locationName = address.neighbourhood || address.suburb;
            }

            // If all else fails, use the display name
            if (!locationName && data.display_name) {
              locationName = data.display_name.split(",")[0];
            }
          }

          // Update form data with the coordinates and location
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
            location: locationName || prev.location, // Use the detected location or keep the existing one if detection failed
          }));
        } catch (error) {
          console.error("Error getting location name:", error);
          // Still update coordinates even if reverse geocoding fails
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          }));
        }

        setIsGettingLocation(false);
      },
      (error) => {
        // Error handler
        let errorMessage = "Unknown error occurred while getting location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Prepare the service call input as a JSON string according to the API requirements
      const serviceCallInput = {
        category: formData.category,
        description: formData.description,
        latitude: parseFloat(formData.latitude) || 47.6062, // Default value if not provided
        longitude: parseFloat(formData.longitude) || -122.3321, // Default value if not provided
        location: formData.location,
        priority: formData.priority
      };
      
      // Create FormData object for multipart/form-data submission
      const formDataToSubmit = new FormData();
      
      // Add the JSON string as service_call_input
      formDataToSubmit.append('service_call_input', JSON.stringify(serviceCallInput));
      
      // Add the image file if it exists
      if (formData.issue_image) {
        formDataToSubmit.append('issue_image', formData.issue_image);
      }

      // Call our API route which proxies to the external API
      const response = await fetch('/api/servicecall', {
        method: 'POST',
        // No Content-Type header needed as browser will set it with boundary for multipart/form-data
        body: formDataToSubmit
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      // Get the response data
      const data = await response.json();
      console.log('Service call created:', data);

      // Image is already included in the FormData submission

      // Show success message with ticket ID
      setMessage({ 
        type: "success", 
        text: `Ticket ${data.service_call.ticket_id} created successfully!` 
      });

      // Reset form after successful submission
      setFormData({
        category: "",
        description: "",
        location: "",
        latitude: "47.6062",
        longitude: "-122.3321",
        priority: "Medium",
        issue_image: null,
      });
      setImagePreview(null);

      // Redirect to tickets page after a delay
      setTimeout(() => {
        router.push("/tickets-details");
      }, 2000);
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setMessage({
        type: "error",
        text: "Failed to create ticket. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-900/50 text-green-200"
              : "bg-red-900/50 text-red-200"
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === "success" ? (
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ticket ID */}
        {/* <div>
          <label
            htmlFor="ticket_id"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Ticket ID
          </label>
          <input
            type="text"
            id="ticket_id"
            name="ticket_id"
            value={formData.ticket_id}
            onChange={handleChange}
            placeholder="e.g. SC001"
            required
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          />
        </div> */}
        
         {/* Category */}
         <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>



       

        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Building or location name"
            required
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          />
        </div>
        {/* Latitude */}
        <div>
          <label
            htmlFor="latitude"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Latitude
          </label>
          <div className="relative">
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g. 14.1891"
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Longitude */}
        <div>
          <label
            htmlFor="longitude"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Longitude
          </label>
          <div className="relative">
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g. 121.9762"
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Get Current Location Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
              isGettingLocation ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isGettingLocation ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Getting location...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Use Current Location
              </>
            )}
          </button>
          {locationError && (
            <p className="mt-1 text-sm text-red-400">{locationError}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the issue in detail"
          required
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
        />
      </div>

      {/* Incident Image Upload */}
      <div>
        <label
          htmlFor="issue_image"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Issue Image
        </label>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG or JPEG (MAX. 5MB)
                </p>
              </div>
              <input
                id="issue_image"
                name="issue_image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {imagePreview && (
            <div className="relative w-full h-48 overflow-hidden rounded-lg border border-gray-600">
              <Image
                src={imagePreview}
                alt="Incident preview"
                fill
                style={{ objectFit: "contain" }}
                className="p-2"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setFormData((prev) => ({ ...prev, issue_image: null }));
                }}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105 hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Create Ticket"
          )}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
