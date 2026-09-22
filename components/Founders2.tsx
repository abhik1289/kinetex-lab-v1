import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Member = {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
};

type Position = 'left2' | 'left1' | 'center' | 'right1' | 'right2' | 'hidden';

const Founders = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const members: Member[] = [
    {
      id: 4,
      name: "Sayan Ghosh",
      title: "Coordinator",
      quote:
        "Driving collaboration to turn ideas into action and goals into achievements.",
      image: "/f4.jpg",
    },
    {
      id: 8,
      name: "Shreyanshu Ranjan",
      title: "Coordinator",
      quote: "Coordinating efforts to transform vision into tangible impact.",
      image: "/members/6.jpg",
    },
    {
      id: 5,
      name: "Pratyusha Bhattacharya",
      title: "Associate Coordinator",
      quote:
        "Building connections that transform teamwork into meaningful results.",
      image: "/f5.jpg",
    },
    {
      id: 6,
      name: "Abhik Patra",
      title: "Associate Coordinator",
      quote: "Transforming ideas into impact through seamless collaboration.",
      image: "/f6.jpg",
    },
    {
      id: 7,
      name: "Shivranjanee Bhattacharjee",
      title: "Associate Coordinator",
      quote: "Connecting efforts to create meaningful outcomes.",
      image: "/f7.jpg",
    },
  ]

  // Auto-slide functionality - 3 seconds focus time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [members.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  // Alternative: Show 5 cards at once (center + 2 on each side)
  const getCardPosition = (index: number): Position => {
    const totalCards = members.length;
    let diff = (index - currentIndex + totalCards) % totalCards;

    if (diff > Math.floor(totalCards / 2)) {
      diff = diff - totalCards;
    }

    if (diff === 0) return 'center';
    if (diff === 1) return 'right1';
    if (diff === -1) return 'left1';
    if (diff === 2) return 'right2';
    if (diff === -2) return 'left2';
    return 'hidden';
  };

  const getTransformValue = (position: Position): number => {
    switch (position) {
      case 'left2': return -480;
      case 'left1': return -240;
      case 'center': return 0;
      case 'right1': return 240;
      case 'right2': return 480;
      default: return 0;
    }
  };

  const getMobileTransformValue = (position: Position): number => {
    switch (position) {
      case 'left2': return -280;
      case 'left1': return -140;
      case 'center': return 0;
      case 'right1': return 140;
      case 'right2': return 280;
      default: return 0;
    }
  };

  const getScaleValue = (position: Position): number => position === 'center' ? 1.1 : 0.85;
  const getMobileScaleValue = (position: Position): number => position === 'center' ? 1.05 : 0.8;
  const getOpacity = (position: Position): number => position === 'center' ? 1 : position === 'hidden' ? 0 : 0.6;
  const getZIndex = (position: Position): number => position === 'center' ? 20 : position === 'hidden' ? 0 : 10;

  return (
    <div className="bg-black min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10 py-8 lg:py-0">
        {/* Left side - Header */}
        <motion.div 
          className="flex-1 max-w-md mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="text-center lg:text-left">
            <div className="inline-block">
              <motion.div 
                className="text-center text-white px-3 md:px-6 py-2 md:py-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-1 md:mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our 
              </motion.div>
              <motion.div 
                className="text-center text-cyan-400 px-3 md:px-6 py-2 md:py-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-1 md:mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Core
              </motion.div>
              <motion.div 
                className="text-center text-white px-3 md:px-6 py-2 md:py-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Members
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Improved carousel */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
            {members.map((member, index) => {
              const position = getCardPosition(index);
              
              return (
                <motion.div
                  key={member.id}
                  className="absolute"
                  animate={{
                    x: (typeof window !== 'undefined' && window.innerWidth >= 1024) ? getTransformValue(position) : getMobileTransformValue(position),
                    scale: (typeof window !== 'undefined' && window.innerWidth >= 1024) ? getScaleValue(position) : getMobileScaleValue(position),
                    opacity: getOpacity(position),
                    zIndex: getZIndex(position)
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <motion.div 
                    className={`bg-linear-to-br from-gray-800 to-gray-900 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 w-56 sm:w-64 lg:w-80 text-center border ${
                      position === 'center' 
                        ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20' 
                        : 'border-gray-700'
                    } transition-all duration-800`}
                  >
                    {/* Square Image */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 rounded-md lg:rounded-lg mx-auto object-cover border-2 lg:border-4 ${
                          position === 'center' ? 'border-cyan-400' : 'border-gray-600'
                        } transition-all duration-800`}
                        animate={position === 'center' ? {
                          borderColor: ["#00ffff", "#0099cc", "#00ffff"]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Name */}
                    <motion.h3 
                      className={`text-white text-sm sm:text-base lg:text-2xl font-bold mb-1 sm:mb-1.5 lg:mb-2 transition-all duration-800 leading-tight`}
                      animate={position === 'center' ? {
                        color: ["#ffffff", "#00ffff", "#ffffff"]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {member.name}
                    </motion.h3>
                    
                    {/* Title */}
                    <motion.p 
                      className={`${
                        position === 'center' ? 'text-cyan-400 text-xs sm:text-sm lg:text-base' : 'text-gray-400 text-xs lg:text-sm'
                      } mb-2 sm:mb-3 lg:mb-4 font-medium transition-all duration-800 leading-tight`}
                    >
                      {member.title}
                    </motion.p>
                    
                    {/* Quote */}
                    <motion.div 
                      className="border-t border-gray-600 pt-2 sm:pt-3 lg:pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: position === 'center' ? 1 : 0.8 }}
                      transition={{ duration: 0.8 }}
                    >
                      <p className={`${
                        position === 'center' ? 'text-gray-300 text-xs lg:text-sm' : 'text-gray-500 text-xs'
                      } italic leading-tight sm:leading-relaxed transition-all duration-800`}>
                        "{member.quote}"
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="absolute -bottom-2 sm:bottom-4 flex space-x-1.5 sm:space-x-2">
            {members.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-cyan-400 w-4 sm:w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Founders;