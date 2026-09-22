'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import * as THREE from 'three';
import Globe from './globe';
import { useRouter } from 'next/navigation';

const Resources = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const brainRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Course data with smaller cards
  type CoursePosition = 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom';

  type Course = {
    id: number;
    title: string;
    description: string;
    position: CoursePosition;
    gradient: string;
    lineColor: string;
  };

  const courses: Course[] = [
    {
      id: 1,
      title: "Quantum Computing Fundamentals",
      description: "Explore the fundamentals of quantum mechanics, gates, and algorithms. This section covers quantum error correction and applications in cryptography, simulation, and optimization.",
      position: "left-top",
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      lineColor: "#3b82f6"
    },
    {
      id: 2,
      title: "Quantum Integrated AI/ML",
      description: "Discover how quantum technology is poised to transform artificial intelligence. This section covers quantum machine learning, data encoding, and case studies of quantum-assisted AI.",
      position: "left-middle",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      lineColor: "#10b981"
    },
    {
      id: 3,
      title: "IoT Development",
      description: "From hardware and sensors to network protocols and data processing, this section provides resources for building and managing connected devices and scalable IoT applications.",
      position: "left-bottom",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      lineColor: "#f97316"
    },
    {
      id: 4,
      title: "Web development",
      description: "A complete guide to building the modern web. Find resources on front-end and back-end development, modern frameworks, and best practices for creating powerful websites.",
      position: "right-top",
      gradient: "from-purple-500 via-violet-500 to-fuchsia-600",
      lineColor: "#a855f7"
    },
    {
      id: 5,
      title: "Research & Development",
      description: "Elevate your research career with our curated resources. This section offers guidance on general research methods, from conducting literature reviews to publishing your work.",
      position: "right-middle",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      lineColor: "#06b6d4"
    },
    {
      id: 6,
      title: "Non-Tech Skills",
      description: "Beyond the code, these are the skills that make a difference. This section provides valuable resources on design, photography, and marketing strategies to help you communicate your ideas and projects effectively.",
      position: "right-bottom",
      gradient: "from-yellow-500 via-amber-500 to-orange-600",
      lineColor: "#eab308"
    }
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { y: -60, opacity: 0, rotateX: -45 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: 'easeOut' as const
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.6,
      transition: {
        duration: 2,
        ease: 'easeInOut' as const
      }
    }
  };

  const globeVariants: Variants = {
    hidden: { scale: 0, rotateY: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeOut' as const,
        delay: 1
      }
    }
  };

  const getCardPosition = (position: CoursePosition) => {
    const positions: Record<CoursePosition, string> = {
      'left-top': 'top-8 left-8',
      'left-middle': 'top-1/2 -translate-y-1/2 left-8',
      'left-bottom': 'bottom-8 left-8',
      'right-top': 'top-8 right-8',
      'right-middle': 'top-1/2 -translate-y-1/2 right-8',
      'right-bottom': 'bottom-8 right-8'
    };
    return positions[position];
  };

  const getConnectionPath = (position: CoursePosition) => {
    const centerX = 400;
    const centerY = 400;

    const cardPositions: Record<CoursePosition, { x: number; y: number }> = {
      'left-top': { x: 40, y: 120 },
      'left-middle': { x: 50, y: 400 },
      'left-bottom': { x: 50, y: 680 },
      'right-top': { x: 750, y: 120 },
      'right-middle': { x: 750, y: 400 },
      'right-bottom': { x: 750, y: 680 }
    };

    const cardPos = cardPositions[position];
    const controlX = (cardPos.x + centerX) / 2;
    const controlY = (cardPos.y + centerY) / 2 - 50;

    return `M ${cardPos.x} ${cardPos.y} Q ${controlX} ${controlY} ${centerX} ${centerY}`;
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-linear-to-br from-gray-900 via-black to-black relative overflow-hidden py-24">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(1000px circle at 30% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
            "radial-gradient(1000px circle at 70% 70%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
            "radial-gradient(1000px circle at 50% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
            "radial-gradient(1000px circle at 80% 20%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Title */}
        <motion.div 
          className="text-center mb-20"
          variants={titleVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{
              background: "linear-gradient(45deg, #ffffff, #3b82f6, #10b981)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            Resources
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300  max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Unlock valuable resources designed by our society for innovators like you.
          </motion.p>
        </motion.div>

        {/* Mobile Layout */}
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4 px-4 max-w-sm mx-auto">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="w-full"
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.2 + index * 0.1 }}
                onHoverStart={() => setHoveredCard(course.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div
                  className="bg-gray-900/80 backdrop-blur-xl rounded-lg p-3 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -4,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${course.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-sm font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                      {course.description.length > 80 
                        ? `${course.description.substring(0, 80)}...` 
                        : course.description
                      }
                    </p>

                    {/* Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <motion.button
                        className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs font-semibold text-white transition-all duration-300 border border-white/10 hover:border-white/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/resources/${course.id}`)} 
                      >
                        Explore
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover effect particles - reduced for mobile */}
                  {hoveredCard === course.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 2 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
                          initial={{ 
                            opacity: 0,
                            x: Math.random() * 200,
                            y: Math.random() * 100
                          }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: Math.random() * 200,
                            y: Math.random() * 100
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop Layout - Original Design */
          <div className="relative max-w-7xl mx-auto">
            {/* Course Cards Container */}
            <div className="relative w-full" style={{ height: '800px' }}>
              {/* Connection Lines SVG */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10" 
                style={{ width: '800px', height: '800px', left: '50%', transform: 'translateX(-50%)' }}
              >
                {courses.map((course, index) => (
                  <motion.path
                    key={`line-${course.id}`}
                    d={getConnectionPath(course.position)}
                    fill="none"
                    stroke={course.lineColor}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    variants={lineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 2 + index * 0.3 }}
                    className="drop-shadow-glow"
                    style={{
                      filter: `drop-shadow(0 0 4px ${course.lineColor}40)`
                    }}
                  />
                ))}
              </svg>

              {/* Animated Globe in Center - Desktop Only */}
              <section className="w-full h-screen flex justify-center items-center">
                <Globe />
              </section>
              
              {/* Course Cards - Desktop Original Size */}
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className={`absolute w-64 ${getCardPosition(course.position)} z-30`}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 1.5 + index * 0.2 }}
                  onHoverStart={() => setHoveredCard(course.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <motion.div
                    className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-linear-to-br ${course.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <motion.button
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-white transition-all duration-300 border border-white/10 hover:border-white/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push(`/resources/${course.id}`)} 
                        >
                          Explore
                        </motion.button>
                      </div>
                    </div>

                    {/* Hover effect particles */}
                    {hoveredCard === course.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 4 }, (_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full"
                            initial={{ 
                              opacity: 0,
                              x: Math.random() * 240,
                              y: Math.random() * 160
                            }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                              x: Math.random() * 240,
                              y: Math.random() * 160
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Resources;