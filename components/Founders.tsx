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
  const [currentIndex1, setCurrentIndex1] = useState(0);
  
  const members: Member[] = [
    {
      id: 0,
      name: "Dr. Anjan Bandyopadhyay",
      title: "Chairperson & Chief Faculty Advisor",
      quote:
        "Guiding vision with wisdom to ensure every initiative moves with purpose and impact.",
      image: "/images/f1.jpg",
    },
    {
      id: 1,
      name: "Dr. Mahendra Kumar Gourisaria",
      title: "Co-Chairperson Faculty Coordinator",
      quote:
        "Empowering young minds to innovate fearlessly and lead with integrity.",
      image: "/images/f2.jpg",
    },
    {
      id: 2,
      name: "Dr. Anil Kumar Swain",
      title: "Faculty Coordinator",
      quote:
        "Empowering young minds to innovate fearlessly and lead with integrity.",
      image: "/images/f8.jpg",
    },
    {
      id: 3,
      name: "Dr. Sujata Swain",
      title: "Faculty Coordinator",
      quote:
        "Bridging knowledge and curiosity to create opportunities that inspire growth.",
      image: "/images/f3.jpg",
    },
     {
      id: 4,
      name: "Prof. Sourabh Debnath",
      title: "Faculty In-Charge",
      quote:
        "True mentorship isn’t about giving answers — it’s about igniting the confidence to discover them.",
      image: "/images/f4.jpeg",
    },
  ];

  const members1: Member[] = [
    {
      id: 4,
      name: "Sayan Ghosh",
      title: "Coordinator",
      quote:
        "Driving collaboration to turn ideas into action and goals into achievements.",
      image: "/images/f4.jpg",
    },
    {
      id: 5,
      name: "Pratyusha Bhattacharya",
      title: "Associate Coordinator",
      quote:
        "Building connections that transform teamwork into meaningful results.",
      image: "/images/f5.jpg",
    },
    {
      id: 6,
      name: "Abhik Patra",
      title: "Associate Coordinator",
      quote: "Transforming ideas into impact through seamless collaboration.",
      image: "/images/f6.jpg",
    },
    {
      id: 7,
      name: "Shivranjanee Bhattacharjee",
      title: "Associate Coordinator",
      quote: "Connecting efforts to create meaningful outcomes.",
      image: "/images/f7.jpg",
    },
  ]

  // Auto-slide functionality for managing body
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [members.length]);

  // Auto-slide functionality for core members
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex1((prev) => (prev + 1) % members1.length);
    }, 3200); // Slightly different timing to avoid sync

    return () => clearInterval(interval);
  }, [members1.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  // Alternative: Show 5 cards at once (center + 2 on each side)
  const getCardPosition = (index: number, currentIdx: number, totalLength: number): Position => {
    let diff = (index - currentIdx + totalLength) % totalLength;

    if (diff > Math.floor(totalLength / 2)) {
      diff = diff - totalLength;
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

  const renderCarousel = (
    membersList: Member[],
    currentIdx: number,
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>,
    sectionTitle: string,
    titleColor: string
  ) => (
    <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10 py-8 lg:py-16">
      {/* Left side - Header */}
      <motion.div 
        className="flex-1 max-w-md mb-8 lg:mb-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
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
              className={`text-center ${titleColor} px-3 md:px-6 py-2 md:py-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-1 md:mb-2`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {sectionTitle.split(' ')[0]}
            </motion.div>
            <motion.div 
              className="text-center text-white px-3 md:px-6 py-2 md:py-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {sectionTitle.split(' ')[1]}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right side - Improved carousel */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
          {(() => {
            const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
            return membersList.map((member, index) => {
              const position = getCardPosition(index, currentIdx, membersList.length);

              return (
              <motion.div
                key={member.id}
                className="absolute"
                animate={{
                  x: window.innerWidth >= 1024 ? getTransformValue(position) : getMobileTransformValue(position),
                  scale: window.innerWidth >= 1024 ? getScaleValue(position) : getMobileScaleValue(position),
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
                  whileHover={position === 'center' ? { 
                    scale: window.innerWidth >= 1024 ? 1.05 : 1.02,
                    boxShadow: "0 25px 50px rgba(0, 255, 255, 0.3)"
                  } : {}}
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
                  {/* <motion.p 
                    className={`${
                      position === 'center' ? 'text-cyan-400 text-xs sm:text-sm lg:text-base' : 'text-gray-400 text-xs lg:text-sm'
                    } mb-2 sm:mb-3 lg:mb-4 font-medium transition-all duration-800 leading-tight`}
                  >
                    {member.title}
                  </motion.p> */}
                  
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
            });
          })()}
        </div>

        {/* Indicators */}
        <div className="absolute -bottom-2 sm:bottom-4 flex space-x-1.5 sm:space-x-2">
          {membersList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIdx(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentIdx ? 'bg-cyan-400 w-4 sm:w-6' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen flex-column items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, cyan 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, cyan 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Managing Body Section */}
      {renderCarousel(members, currentIndex, setCurrentIndex, "Managing Body", "text-cyan-400")}

      {/* Spacer between sections */}
      <div className="py-12 md:py-16 lg:py-20">
        <motion.div 
          className="w-full max-w-4xl mx-auto h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      {/* Core Members Section */}
      {renderCarousel(members1, currentIndex1, setCurrentIndex1, "Core Members", "text-cyan-400")}
      
      {/* Bottom spacing */}
      <div className="pb-16 md:pb-20 lg:pb-24"></div>
    </div>
  );
};

export default Founders;