import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingTextAnimation() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Show the loader after initial animations
    const timer1 = setTimeout(() => {
      setShowLoader(true);
    }, 2500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const textEnterVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 overflow-hidden"
      >
        {/* Background subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        {/* Main content container */}
        <motion.div
          variants={textEnterVariants}
          initial="initial"
          animate="animate"
          className="relative text-center space-y-8 z-10"
        >
          {/* Logo/Image section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-xl blur-lg"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <img 
                src="/loading_bg.png" 
                alt="KIIT School of Computer Engineering"
                className="relative h-16 md:h-20 object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
          
          {/* "presents" text */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 font-light tracking-wide"
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
          >
            presents
          </motion.div>
          
          {/* Main title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <div className="flex items-center justify-center">
          <motion.img       
            src="/logo1.png"       
            className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 cursor-pointer mr-1"           
            transition={{ duration: 0.8 }}     
          />
          <span className="font-bold bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 bg-clip-text text-transparent">
            inetex Lab
          </span>
        </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Modern Loader */}
        <AnimatePresence>
          {showLoader && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center mt-12"
            >
              <div className="modern-loader relative">
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
      </motion.div>
    </AnimatePresence>
  );
}