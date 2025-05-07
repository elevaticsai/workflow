import React from "react";

interface ReportHeaderProps {
  title?: string;
  ticketId: string;
  criticality: string;
  timestamp: string;
  location: string;
  issue: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  title,
  ticketId,
  criticality,
  timestamp,
  location,
  issue,
}) => {
  return (
    <div className="space-y-7">
      {title && (
        <div className="flex justify-between items-center p-4  bg-gray-800/80 border-b border-gray-700 -mx-4 -mt-4 mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <div className="text-white border border-red-500 px-4 py-1 rounded-md font-semibold hover:bg-red-500 hover:text-white transition">
            {criticality}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between gap-15">
        <div className="flex items-center gap-30">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <div className=" p-2 rounded-md w-32">
              <span className="text-xs text-gray-400">Ticket #</span>
              <div className="text-white">{ticketId}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <span className="text-xs text-gray-400">Timestamp</span>
              <div className="text-white text-sm">{timestamp}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <span className="text-xs text-gray-400">Location</span>
              <div className="text-white text-sm">{location}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-700/50 p-3 rounded-md text-white text-sm">
        {issue}
      </div>
    </div>
  );
};

export default ReportHeader;
