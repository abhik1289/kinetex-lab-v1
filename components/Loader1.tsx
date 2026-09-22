import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [showLoader, setShowLoader] = useState(true);

  // Optional: Auto-hide loader after some time for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      {showLoader && (
        <div
          className="relative flex items-center justify-center mt-12 animate-scale-in"
        >
          <div className="modern-loader relative">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
          </div>
        </div>
      )}
      
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          .modern-loader {
            width: 60px;
            height: 60px;
            position: relative;
          }
          
          .loader-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 2px solid transparent;
            border-radius: 50%;
            animation: spin 2s linear infinite;
          }
          
          .loader-ring:nth-child(1) {
            border-top-color: #06b6d4;
            animation-duration: 2s;
          }
          
          .loader-ring:nth-child(2) {
            border-top-color: #3b82f6;
            animation-duration: 2.5s;
            animation-direction: reverse;
            width: 80%;
            height: 80%;
            top: 10%;
            left: 10%;
          }
          
          .loader-ring:nth-child(3) {
            border-top-color: #8b5cf6;
            animation-duration: 1.5s;
            width: 60%;
            height: 60%;
            top: 20%;
            left: 20%;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
    </div>
  );
}