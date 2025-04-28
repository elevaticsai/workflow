import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{marginTop:"-110px"}} className="flex flex-col items-center w-full overflow-x-hidden">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
                  Workflow Management Solution
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-teal-400 drop-shadow-sm">
                  Elevate Your <span className="block md:inline">Workforce Management</span>
                </h1>
                <p className="text-gray-300 text-base md:text-lg xl:text-xl leading-relaxed">
                  Efficiently manage your team, track performance, and optimize productivity with our comprehensive workforce management solution.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105 hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  Get Started
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-teal-400/20 animate-pulse"></div>
                  <div className="absolute w-[90%] h-[90%] rounded-full bg-gradient-to-r from-blue-600/30 to-teal-400/30 blur-md"></div>
                  <div className="relative w-[80%] h-[80%] rounded-full bg-gray-800/90 backdrop-blur-sm flex items-center justify-center border border-gray-700/50 shadow-2xl">
                    <div className="text-center p-4 sm:p-6 md:p-8">
                      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-2 md:mb-3">WFM</div>
                      <div className="text-base sm:text-lg md:text-xl text-gray-300 font-medium">Workforce Management</div>
                      <div className="mt-4 md:mt-6 flex justify-center space-x-2 sm:space-x-4">
                        {['chart-line', 'users', 'calendar', 'clock'].map((icon, i) => (
                          <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-700/50 flex items-center justify-center text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              {icon === 'chart-line' && <><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></>}
                              {icon === 'users' && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>}
                              {icon === 'calendar' && <><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></>}
                              {icon === 'clock' && <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>}
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



