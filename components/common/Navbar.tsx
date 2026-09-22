"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navVariants: Variants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const sidebarVariants: Variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const overlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const menuItemVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const hamburgerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.5 } },
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((isOpen) => !isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent backdrop-blur-md"
        variants={navVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex justify-between items-center px-4">
          {/* Desktop Logo */}
          <Link href="/" className="hidden md:block">
            <img
              src="/images/images.png"
              alt="KineTex"
              className="h-10 w-25 cursor-pointer"
            />
          </Link>
          
          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={toggleSidebar}
            variants={hamburgerVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isSidebarOpen ? "open" : "closed"}
              className="flex flex-col justify-center items-center w-6 h-6"
            >
              <motion.span
                className="block h-0.5 w-6 bg-white mb-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white mb-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>

          {/* Desktop Logo/Brand */}
          <motion.div
            className="text-2xl font-bold text-white hidden md:block"
            whileHover={{ scale: 1.05, color: "#f97316" }}
            transition={{ duration: 0.2 }}
          >
            KineTex
          </motion.div>

          <div className="flex space-x-10">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 text-gray-300 mr-15 mt-2">
              {["Home", "About", "Events"].map((item, index) => (
                <Link
                  key={item}
                  href={item === "Contact" ? "/contact" : item === "Recruitment" ? "/recruitment" : item === "About" ? "/about" : item === "Events" ? "/events" : "/"}
                >
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                  >
                    <span className="hover:text-cyan-400 transition-colors duration-300 relative cursor-pointer py-2 block">
                      {item}
                      {/* Animated underline */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-cyan-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Get Started Button */}
            <div className="flex space-x-4">
              <Link href="/signin">
                <motion.button
                  className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:shadow-blue-500/25 text-white px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-lg transition-all duration-200 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl z-50 md:hidden"
            variants={sidebarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col h-full pt-20 px-6">
              {/* Brand Name in Sidebar */}
              <motion.div
                className="text-xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, color: "#f97316" }}
              >
                KineTex
              </motion.div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-6">
                {["Home", "About", "Events", "Contact", "Recruitment"].map((item, index) => (
                  <Link
                    key={item}
                    href={item === "Contact" ? "/contact" : item === "Recruitment" ? "/recruitment" : item === "About" ? "/about" :  item === "Events" ? "/events" : "/"}
                    onClick={closeSidebar}
                  >
                    <motion.button
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-left w-full py-2 text-lg font-medium"
                      variants={menuItemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ delay: 0.1 * index + 0.1 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  </Link>
                ))}
              </div>

              {/* Close Button */}
              <motion.button
                className="mt-auto mb-8 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                onClick={closeSidebar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close Menu
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
