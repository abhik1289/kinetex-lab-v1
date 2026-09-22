import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Cpu,
  Brain,
  Wifi,
  Globe,
  Search,
  Users,
  Megaphone,
  ArrowRight,
  CheckCircle,
  Palette,
  Calendar,
} from "lucide-react";
import { useRouter  } from 'next/navigation';

type DomainItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  members: number;
  status: string;
  tags: string[];
  iconBg: string;
};

const KineTechDomains = () => {
  const [activeTab, setActiveTab] = useState("tech");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const techDomains = [
    {
      id: "quantum",
      title: "Quantum Computing",
      subtitle: "Exploring quantum algorithms and computational theory",
      icon: <Cpu className="w-5 h-5" />,
      description: "Quantum Algorithms & Game Theory",
      // projects: 12,
      members: 3,
      status: "Active",
      tags: ["Quantum ML", "Algorithms", "Game Theory"],
      iconBg: "bg-purple-500",
    },
    {
      id: "aiml",
      title: "AI/ML Systems", 
      subtitle: "Building intelligent systems and neural networks",
      icon: <Brain className="w-5 h-5" />,
      description: "Next-Gen Intelligence",
      // projects: 15,
      members: 4,
      status: "Active",
      tags: ["Deep Learning", "Neural Networks", "AI Research"],
      iconBg: "bg-blue-500",
    },
    {
      id: "iot",
      title: "IoT Development",
      subtitle: "Creating smart connected devices and systems",
      icon: <Wifi className="w-5 h-5" />,
      description: "Connected Smart Systems",
      // projects: 20,
      members: 3,
      status: "Active", 
      tags: ["Edge Computing", "Sensors", "Smart Cities"],
      iconBg: "bg-green-500",
    },
    {
      id: "web",
      title: "Web Development",
      subtitle: "Crafting modern web applications and experiences", 
      icon: <Globe className="w-5 h-5" />,
      description: "Modern Digital Experiences",
      // projects: 25,
      members: 5,
      status: "Active",
      tags: ["React", "Next.js", "Full Stack"],
      iconBg: "bg-orange-500",
    },
    {
      id: "research",
      title: "Research & Development",
      subtitle: "Investigating emerging technologies and innovation",
      icon: <Search className="w-5 h-5" />,
      description: "Future Technology Exploration",
      // projects: 8,
      members:2,
      status: "Active",
      tags: ["Innovation", "Prototyping", "Emerging Tech"],
      iconBg: "bg-pink-500",
    },
  ];

  const nonTechDomains = [
  {
    id: "operations",
    title: "Operations & HR",
    subtitle: "Managing society operations and member relations",
    icon: <Users className="w-5 h-5" />,
    description: "Organizational Excellence",
    members: 3,
    status: "Active",
    tags: ["Recruitment", "Training", "Policy"],
    iconBg: "bg-indigo-500",
  },
  {
    id: "creative",
    title: "Creative Media",
    subtitle: "Designing visual content and brand materials",
    icon: <Palette className="w-5 h-5" />,
    description: "Visual Storytelling",
    members: 4,
    status: "Active",
    tags: ["Design", "Photography", "Video Editing"],
    iconBg: "bg-yellow-500",
  },
  {
    id: "marketing",
    title: "Marketing & Growth",
    subtitle: "Promoting society initiatives and building community",
    icon: <Megaphone className="w-5 h-5" />,
    description: "Brand Amplification",
    members: 3,
    status: "Active",
    tags: ["Strategy", "Campaigns", "Analytics"],
    iconBg: "bg-red-500",
  },
  {
    id: "events",
    title: "Event Management",
    subtitle: "Planning and executing society events",
    icon: <Calendar className="w-5 h-5" />,
    description: "Seamless Coordination",
    members: 3,
    status: "Active",
    tags: ["Planning", "Logistics", "Coordination"],
    iconBg: "bg-green-500",
  },
];


  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const cardsContainerVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const tabVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  const DomainCard = ({ domain, index }: { domain: DomainItem; index: number }) => {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:bg-gray-800/60 hover:border-gray-600 hover:z-30 relative cursor-pointer"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <motion.div 
              className={`p-2 ${domain.iconBg} rounded-lg text-white`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {domain.icon}
            </motion.div>
            <div>
              <h3 className="text-white font-semibold text-lg">{domain.title}</h3>
              <p className="text-gray-400 text-sm">{domain.subtitle}</p>
            </div>
          </div>

          <motion.div 
            className="flex items-center space-x-1 text-green-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs">{domain.status}</span>
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-3">{domain.description}</p>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <motion.div 
            className="flex items-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {/* <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div> */}
            {/* <span>{domain.projects} Projects</span> */}
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
          </motion.div>
        </div>

        {/* Tags */}
        <motion.div 
          className="flex flex-wrap gap-2 mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          {domain.tags.slice(0, 2).map((tag, i) => (
            <motion.span
              key={i}
              className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 hover:bg-gray-600/50 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

         {/* Team button */}
         <motion.div 
          className="mt-4 pt-3 border-t border-gray-700/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
           onClick={() => router.push(`/domains/${domain.id}`)} 
        >
          <motion.button
            className="group flex items-center space-x-2 text-xs text-gray-400 hover:text-cyan-400 transition-all duration-300"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">View Team</span>
            <motion.div
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  const currentDomains = activeTab === "tech" ? techDomains : nonTechDomains;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-900 to-black py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Header Section */}
      <div className="px-8 md:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          {/* Left Side - Header and Description */}
          <motion.div 
            className="my-30 flex-1 max-w-2xl relative z-10"
            variants={headerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Our <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Domains</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-400 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Kinetech provides collaborative learning environments, cutting-edge project opportunities, and hands-on experience across multiple technology domains for students.
            </motion.p>
            
            {/* Tab Toggle */}
            <motion.div 
              className="mt-8"
              variants={tabVariants}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
            >
              <div className="relative bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-full p-1 w-fit">
                <motion.div
                  className="absolute top-1 bottom-1 bg-gray-600 rounded-full"
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    left: activeTab === "tech" ? "4px" : "50%",
                    width: "calc(50% - 8px)"
                  }}
                />

                <div className="relative z-10 flex">
                  <motion.button
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeTab === "tech"
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("tech")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tech Domains
                  </motion.button>

                  <motion.button
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeTab === "nontech"
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("nontech")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Support Domains
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Domain Cards */}
          <motion.div 
            className="flex-1 max-w-4xl relative z-20"
            variants={cardsContainerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {currentDomains.map((domain, index) => (
                    <DomainCard
                      key={`${activeTab}-${domain.id}`}
                      domain={domain}
                      index={index}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      
      {/* Custom scrollbar hiding styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .grid::-webkit-scrollbar {
            display: none;
          }
          .overflow-y-auto::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </div>
  );
};

export default KineTechDomains;