"use client"

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EventsPage() {
  const [loading, setLoading] = useState(false);
  
  const handleNotify = () => {
    console.log('Get notified clicked');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Scrolling Text */}
        <div className="mb-4 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-scroll text-gray-500 text-sm sm:text-lg">
            <span className="inline-block mx-4 sm:mx-8">Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex</span>
            <span className="inline-block mx-4 sm:mx-8">Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex</span>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Main Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            EVENT CHAPTER
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Follow us on social media to stay updated on our upcoming events and activities. 
            Events are coming soon, stay tuned for more information!
          </p>
          
          <button
            onClick={handleNotify}
            className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg border border-gray-600 hover:border-gray-500 transition-all duration-300"
          >
            Get Notified
          </button>
        </div>

        {/* Recruitment Notice Card */}
        <div className="bg-[#1a4d3a] text-amber-100 p-4 sm:p-6 rounded-lg mb-16 relative overflow-hidden">
          {/* Top Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-amber-100/20">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border border-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-mono">360°</span>
                </div>
                <span className="font-mono text-[10px] sm:text-xs uppercase">Schedule</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-orange-400 mb-1 uppercase">Open</div>
              <div className="font-bold text-xs sm:text-sm">12.10.25</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-orange-400 mb-1 uppercase">Deadline</div>
              <div className="font-bold text-xs sm:text-sm">25.10.25</div>
            </div>
            <div className="col-span-2 sm:col-span-1 sm:text-right">
              <div className="text-[10px] sm:text-xs text-orange-400 mb-1 uppercase">Next</div>
              <div className="inline-flex gap-1">
                <div className="w-1 h-3 sm:h-4 bg-orange-400 transform -skew-x-12"></div>
                <div className="w-1 h-3 sm:h-4 bg-orange-400 transform -skew-x-12"></div>
                <div className="w-1 h-3 sm:h-4 bg-orange-400 transform -skew-x-12"></div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6 lg:gap-8">
            {/* Left Side */}
            <div className="flex-1 w-full">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                <span>RECRUITMENT DRIVE</span>
                <span className="flex gap-1 sm:gap-2">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </span>
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-4">
                <p className="text-[10px] sm:text-xs italic text-amber-200">
                  Join the movement of innovators and creators<br/>
                  Shaping experiences in a connected world
                </p>
                <p className="text-[10px] sm:text-xs italic text-amber-200">
                  SHOW YOUR SKILLS | JOIN THE COMMUNITY<br/>
                  BE THE CHANGE | MAKE AN IMPACT
                </p>
              </div>

              {/* Date */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-400 mb-3">
                1st, 2nd November
              </div>
              
              {/* Lineup/Roles */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-sm sm:text-base lg:text-lg">OPEN ROLES</span>
                <div className="flex gap-1">
                  <div className="w-1 h-4 sm:h-5 bg-amber-100 transform -skew-x-12"></div>
                  <div className="w-1 h-4 sm:h-5 bg-amber-100 transform -skew-x-12"></div>
                  <div className="w-1 h-4 sm:h-5 bg-amber-100 transform -skew-x-12"></div>
                </div>
              </div>

              <p className="text-[10px] sm:text-xs mb-4 text-amber-200">
                Tech • Design • Content • Events<br/>
                Marketing • Operations • Innovation
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-bold">LOCATIONS</span>
                <ArrowRight className="w-3 h-3" />
              </div>

              {/* Bottom Locations - Always shown here */}
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-5 mb-4">
                <div className="text-[10px] sm:text-xs font-mono bg-amber-100 text-emerald-900 px-2 sm:px-3 py-1 rounded">
                  A301, Campus-25
                </div>
                <div className="text-[10px] sm:text-xs font-mono bg-amber-100 text-emerald-900 px-2 sm:px-3 py-1 rounded">
                  A302, Campus-25
                </div>
                <div className="text-[10px] sm:text-xs font-mono bg-amber-100 text-emerald-900 px-2 sm:px-3 py-1 rounded">
                  A303, Campus-25
                </div>
              </div>


            </div>

            {/* Right Side - Desktop Only */}
            <div className="hidden lg:flex flex-col items-end gap-4">
              {/* Apply Button */}
              <div className="relative mb-4 mr-3">
                <img src="/images/images.png" alt="Apply Now" className="w-32 h-12 object-cover shadow-lg bg-gray-900" />
              </div>

              {/* Logo Image */}
              <div className="w-40 h-40 bg-gray-900 rounded overflow-hidden relative">
                <img src="/images/logo1.png" alt="Recruitment" className="w-fit h-fit object-cover" />
              </div>

              {/* Bottom right text */}
              <div className="text-xs text-right text-amber-200">
                <p>We are shaping</p>
                <p>the future together</p>
              </div>
            </div>
          </div>

          {/* Rotated Side Text - Desktop Only */}
          <div className="hidden lg:block absolute right-2 top-1/2 transform rotate-90 origin-right text-xs font-mono whitespace-nowrap text-amber-200 opacity-60">
            YOUR JOURNEY STARTS HERE
          </div>
        </div> 
      </div>
    </div>
  );
}