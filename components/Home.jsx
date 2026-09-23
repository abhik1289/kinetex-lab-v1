"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const KietexHome = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const molecularSystemRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);


  // Check if device is mobile/tablet
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Text animation state
  const [currentText, setCurrentText] = useState(0);

  const textOptions = [
    { first: "Quantum", second: "GT" },
    { first: "Quantum", second: "AI ML" },
    { first: "AI ML", second: "IoT" },
  ];

  // Optimized quantum atomic data with reduced complexity
  const quantumAtomicData = [
    // Central Quantum Core - Optimized
    {
      type: "quantum-core",
      name: "Quantum Core",
      radius: 1.8,
      position: { x: 0, y: 0, z: 0 },
      color: 0x00ffff,
      emissive: 0x0088aa,
      electrons: 8, // Reduced from 12
      electronDistance: 4.5,
      electronSpeed: 0.015,
      glowIntensity: 0.8,
      quantumField: true,
    },
    // Reduced atoms for better performance
    {
      type: "atom",
      name: "Hydrogen",
      radius: 0.8,
      color: 0xffffff,
      emissive: 0x444444,
      position: { x: 12, y: 3, z: 4 },
      electrons: 1,
      electronDistance: 3.2,
      electronSpeed: 0.028,
      orbitalSpeed: 0.018,
      orbitalDistance: 14,
      quantumStates: 2,
    },
    {
      type: "atom",
      name: "Carbon",
      radius: 0.9,
      color: 0x333333,
      emissive: 0x222222,
      position: { x: -10, y: 2, z: -6 },
      electrons: 4, // Reduced from 6
      electronDistance: 2.8,
      electronSpeed: 0.025,
      orbitalSpeed: 0.015,
      orbitalDistance: 12,
      quantumStates: 4,
    },
    {
      type: "atom",
      name: "Silicon",
      radius: 1.1,
      color: 0x8a8a8a,
      emissive: 0x444444,
      position: { x: 6, y: -4, z: 8 },
      electrons: 6, // Reduced from 14
      electronDistance: 3.5,
      electronSpeed: 0.02,
      orbitalSpeed: 0.012,
      orbitalDistance: 10,
      quantumStates: 4,
    },
  ];

  // Text cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textOptions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Optimized Three.js setup - Only for larger screens
  useEffect(() => {
    if (isMobile || !mountRef.current) return;

    // Scene setup with performance optimizations
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Disabled for performance
      powerPreference: "high-performance",
    });

    renderer.setSize(800, 800);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false; // Disabled shadows for performance
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Optimized lighting setup
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4);
    scene.add(ambientLight);

    // Reduced lights for performance
    const quantumLight = new THREE.PointLight(0x00ffff, 4, 50);
    quantumLight.position.set(0, 0, 0);
    scene.add(quantumLight);

    // Only 2 directional lights instead of 4
    const lights = [
      { color: 0xffffff, intensity: 2, position: [20, 20, 15] },
      { color: 0x4488ff, intensity: 1.5, position: [-15, -15, 20] },
    ];

    lights.forEach((light) => {
      const dirLight = new THREE.DirectionalLight(light.color, light.intensity);
      dirLight.position.set(...light.position);
      scene.add(dirLight);
    });

    // Create optimized quantum system
    const quantumSystemGroup = new THREE.Group();
    const atoms = [];

    // Create atoms with reduced geometry complexity
    quantumAtomicData.forEach((data, index) => {
      // Reduced geometry segments for performance
      const nucleusGeometry = new THREE.SphereGeometry(data.radius, 32, 32); // Reduced from 128
      const nucleusMaterial = new THREE.MeshPhysicalMaterial({
        color: data.color,
        emissive: data.emissive,
        emissiveIntensity: 0.6,
        metalness: 0.4,
        roughness: 0.1,
        transmission: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        ior: 1.5,
      });
      const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);

      // Optimized quantum field visualization
      if (data.quantumField) {
        // Reduced field shells from 4 to 2
        for (let i = 1; i <= 2; i++) {
          const fieldGeometry = new THREE.SphereGeometry(
            data.radius * (1.2 + i * 0.3),
            16,
            16
          ); // Reduced segments
          const fieldMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.5 + i * 0.1, 0.8, 0.6),
            transparent: true,
            opacity: 0.15 - i * 0.02,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
          });
          const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
          nucleus.add(field);
        }
      } else {
        // Reduced glow layers from 3 to 2
        const glowLayers = [
          { size: 1.4, opacity: 0.5, color: data.color },
          { size: 1.8, opacity: 0.3, color: data.color },
        ];

        glowLayers.forEach((layer) => {
          const glowGeometry = new THREE.SphereGeometry(
            data.radius * layer.size,
            16,
            16
          ); // Reduced segments
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: layer.color,
            transparent: true,
            opacity: layer.opacity,
            blending: THREE.AdditiveBlending,
          });
          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          nucleus.add(glow);
        });
      }

      // Optimized electron system
      const electrons = [];
      const electronCount = Math.min(data.electrons, 8); // Further reduced

      // Simplified quantum shells
      const quantumShells = [
        { capacity: 2, distance: data.electronDistance * 0.8, name: "1s" },
        { capacity: 6, distance: data.electronDistance * 1.2, name: "2p" }, // Reduced capacity
      ];

      let electronsPlaced = 0;

      quantumShells.forEach((shell, shellIndex) => {
        if (electronsPlaced >= electronCount) return;

        const electronsInShell = Math.min(
          shell.capacity,
          electronCount - electronsPlaced
        );

        for (let i = 0; i < electronsInShell; i++) {
          const orbitRadius = shell.distance;

          // Simplified orbital visualization
          const orbitGeometry = new THREE.RingGeometry(
            orbitRadius - 0.05,
            orbitRadius + 0.05,
            32 // Reduced from 128
          );
          const hue = (shellIndex * 0.2 + i * 0.05) % 1;
          const orbitMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(hue, 0.8, 0.7),
            transparent: true,
            opacity: 0.25,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
          });
          const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);

          // Simplified orbital orientations
          orbit.rotation.x = (i * Math.PI) / electronsInShell;
          orbit.rotation.y = (i * Math.PI * 2) / electronsInShell;

          nucleus.add(orbit);

          // Optimized electron with fewer trails
          const electronGroup = new THREE.Group();

          // Reduced electron geometry
          const electronGeometry = new THREE.SphereGeometry(0.08, 12, 12); // Reduced from 24
          const electronMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color().setHSL(hue, 1.0, 0.8),
            emissive: new THREE.Color().setHSL(hue, 0.8, 0.3),
            emissiveIntensity: 0.5,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 1.0,
          });
          const electron = new THREE.Mesh(electronGeometry, electronMaterial);

          // Simplified quantum cloud
          const cloudGeometry = new THREE.SphereGeometry(0.15, 8, 8); // Reduced from 16
          const cloudMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(hue, 0.8, 0.6),
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
          });
          const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
          electron.add(cloud);

          // Reduced trail count from 12 to 4
          const trails = [];
          for (let t = 0; t < 4; t++) {
            const trailGeometry = new THREE.SphereGeometry(
              0.04 - t * 0.008,
              4,
              4
            ); // Reduced segments
            const trailMaterial = new THREE.MeshBasicMaterial({
              color: new THREE.Color().setHSL(hue, 1.0, 0.9),
              transparent: true,
              opacity: 0.4 - t * 0.08,
              blending: THREE.AdditiveBlending,
            });
            const trail = new THREE.Mesh(trailGeometry, trailMaterial);
            trails.push(trail);
            electronGroup.add(trail);
          }

          electronGroup.add(electron);

          electron.userData = {
            orbitRadius: orbitRadius,
            speed: data.electronSpeed + shellIndex * 0.003 + i * 0.001,
            angle: (i * Math.PI * 2) / electronsInShell,
            shellIndex: shellIndex,
            electronIndex: i,
            trails: trails,
            trailPositions: [],
            quantumPhase: Math.random() * Math.PI * 2,
            hue: hue,
          };

          electrons.push(electronGroup);
          nucleus.add(electronGroup);
          electronsPlaced++;
        }
      });

      nucleus.position.set(data.position.x, data.position.y, data.position.z);

      nucleus.userData = {
        electrons,
        rotationSpeed: 0.001 + Math.random() * 0.002,
        orbitalSpeed: data.orbitalSpeed || 0,
        orbitalDistance: data.orbitalDistance || 0,
        angle: Math.random() * Math.PI * 2,
        name: data.name,
        baseY: data.position.y,
        floatAmplitude: 0.2 + Math.random() * 0.3,
        floatSpeed: 0.008 + Math.random() * 0.008,
        quantumPhase: Math.random() * Math.PI * 2,
      };

      quantumSystemGroup.add(nucleus);
      atoms.push(nucleus);
    });

    // Reduced particle count from 120 to 40
    const quantumParticles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      const size = 0.03 + Math.random() * 0.12;
      const particleGeometry = new THREE.SphereGeometry(size, 8, 8); // Reduced segments

      const particleColors = [
        0x00ffff, 0x0088ff, 0x8800ff, 0xff0088, 0xff8800, 0x88ff00, 0x00ff88,
        0xff4444,
      ];
      const color =
        particleColors[Math.floor(Math.random() * particleColors.length)];

      const particleMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.6 + Math.random() * 0.4,
        metalness: 0.5,
        roughness: 0.3,
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);

      const distance = 25 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 20;

      particle.position.x = distance * Math.cos(angle);
      particle.position.z = distance * Math.sin(angle);
      particle.position.y = height;

      // Reduced glow layers from 3 to 1
      const glowSize = size * 2;
      const glowGeometry = new THREE.SphereGeometry(glowSize, 6, 6);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      particle.add(glow);

      particle.userData = {
        distance: distance,
        speed: 0.001 + Math.random() * 0.008,
        angle: angle,
        rotationSpeed: Math.random() * 0.04,
        bobSpeed: 0.005 + Math.random() * 0.02,
        bobAmplitude: 0.8 + Math.random() * 1.5,
        pulseSpeed: 0.03 + Math.random() * 0.15,
        baseOpacity: particleMaterial.opacity,
        quantumPhase: Math.random() * Math.PI * 2,
      };

      quantumSystemGroup.add(particle);
      quantumParticles.push(particle);
    }

    molecularSystemRef.current = {
      quantumSystemGroup,
      atoms,
      quantumParticles,
    };

    scene.add(quantumSystemGroup);
    camera.position.set(0, 10, 45);
    camera.lookAt(0, 0, 0);

    // Optimized animation loop with fixed 30 FPS for better performance
    let lastTime = 0;
    const targetFPS = 30; // Reduced from 60
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime = 0) => {
      animationRef.current = requestAnimationFrame(animate);

      if (currentTime - lastTime < frameTime) return;
      lastTime = currentTime;

      const time = currentTime * 0.001;

      // Simplified atom animation
      atoms.forEach((atom) => {
        const userData = atom.userData;

        // Quantum orbital motion
        if (userData.orbitalSpeed > 0) {
          userData.angle += userData.orbitalSpeed;
          atom.position.x = userData.orbitalDistance * Math.cos(userData.angle);
          atom.position.z = userData.orbitalDistance * Math.sin(userData.angle);
        }

        // Simplified floating motion
        userData.quantumPhase += userData.floatSpeed;
        atom.position.y =
          userData.baseY +
          Math.sin(userData.quantumPhase) * userData.floatAmplitude;

        // Nucleus rotation
        atom.rotation.y += userData.rotationSpeed;

        // Simplified electron animation
        userData.electrons.forEach((electronGroup) => {
          const electron = electronGroup.children.find(
            (child) =>
              child.geometry instanceof THREE.SphereGeometry &&
              child.geometry.parameters.radius === 0.08
          );
          const electronData = electron.userData;

          electronData.angle += electronData.speed;

          // Simplified orbital paths
          const orbitX =
            electronData.orbitRadius * Math.cos(electronData.angle);
          const orbitZ =
            electronData.orbitRadius * Math.sin(electronData.angle);
          const orbitY =
            electronData.orbitRadius * 0.2 * Math.sin(electronData.angle * 2);

          electronGroup.position.set(orbitX, orbitY, orbitZ);

          // Simplified trail update (update every 3rd frame)
          if (Math.floor(time * 10) % 3 === 0) {
            electronData.trailPositions.unshift({
              x: orbitX,
              y: orbitY,
              z: orbitZ,
            });

            if (
              electronData.trailPositions.length > electronData.trails.length
            ) {
              electronData.trailPositions.pop();
            }

            electronData.trails.forEach((trail, trailIndex) => {
              if (electronData.trailPositions[trailIndex]) {
                const pos = electronData.trailPositions[trailIndex];
                trail.position.set(pos.x, pos.y, pos.z);
              }
            });
          }
        });
      });

      // Simplified particle animation
      quantumParticles.forEach((particle, index) => {
        // Update only every 3rd particle per frame for better performance
        if (index % 3 === Math.floor(time * 3) % 3) {
          const userData = particle.userData;
          userData.angle += userData.speed;

          particle.position.x = userData.distance * Math.cos(userData.angle);
          particle.position.z = userData.distance * Math.sin(userData.angle);

          particle.rotation.y += userData.rotationSpeed;
        }
      });

      // Smooth rotation interpolation
      quantumSystemGroup.rotation.x +=
        (rotation.x - quantumSystemGroup.rotation.x) * 0.08;
      quantumSystemGroup.rotation.y +=
        (rotation.y - quantumSystemGroup.rotation.y) * 0.08;

      quantumSystemGroup.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, [isMobile]);

  useEffect(() => {
    // Rotation is applied in the animation loop
  }, [rotation]);

  // Mouse interaction handlers - Only for larger screens
  const handleMouseDown = (e) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMobile) return;

    const deltaX = (e.clientX - dragStart.x) * 0.006;
    const deltaY = (e.clientY - dragStart.y) * 0.006;

    setRotation((prev) => ({
      x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x + deltaY)),
      y: prev.y + deltaX,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers - Only for larger screens
  const handleTouchStart = (e) => {
    if (isMobile) return;
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (isMobile) return;
    e.preventDefault();
    if (!isDragging || !e.touches[0]) return;

    const touch = e.touches[0];
    const deltaX = (touch.clientX - dragStart.x) * 0.006;
    const deltaY = (touch.clientY - dragStart.y) * 0.006;

    setRotation((prev) => ({
      x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x + deltaY)),
      y: prev.y + deltaX,
    }));

    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    if (isMobile) return;
    e.preventDefault();
    setIsDragging(false);
  };

  // Global event listeners
  useEffect(() => {
    if (isDragging && !isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragStart, isMobile]);

  // Optimized floating particles
  const FloatingParticles = () => {
    const particleCount = isMobile ? 4 : 8;
    const particles = Array.from({ length: particleCount }, (_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${isMobile ? "opacity-20" : "opacity-40"
          }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isMobile ? [0.1, 0.4, 0.1] : [0.2, 0.8, 0.2],
          scale: isMobile ? [0.2, 1, 0.2] : [0.2, 1.2, 0.2],
          y: isMobile ? [0, -30, 0] : [0, -40, 0],
          rotate: isMobile ? [0, 180, 360] : [0, 360, 720],
        }}
        transition={{
          duration: isMobile ? 6 + Math.random() * 4 : 8 + Math.random() * 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * (isMobile ? 4 : 6),
        }}
        style={{
          width: `${isMobile ? 1 + Math.random() * 2 : 2 + Math.random() * 4
            }px`,
          height: `${isMobile ? 1 + Math.random() * 2 : 2 + Math.random() * 4
            }px`,
          backgroundColor: ["#00ffff", "#0088ff", "#8800ff", "#ff0088"][
            Math.floor(Math.random() * 4)
          ],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          boxShadow: `0 0 ${isMobile ? 10 : 20}px currentColor`,
        }}
      />
    ));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles}
      </div>
    );
  };

  // Simple animated background for mobile
  const MobileBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated circles */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full border border-cyan-500/20"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            right: `${10 + i * 5}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            right: `${Math.random() * 60}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
        </motion.div>
      ))}
    </div>
  );

  const contentVariants = {
    initial: { x: isMobile ? -50 : -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: isMobile ? 1 : 1.2, delay: 0.3, ease: "easeOut" },
    },
  };

  const quantumSystemVariants = {
    initial: { opacity: 0, scale: isMobile ? 0.8 : 0.7 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 1.2 : 1.5,
        delay: isMobile ? 1.2 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const textAnimation = {
    initial: { opacity: 0, y: isMobile ? 20 : 30, rotateX: -90 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: isMobile ? 0.6 : 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: isMobile ? -20 : -30,
      rotateX: 90,
      transition: { duration: isMobile ? 0.4 : 0.5, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: isMobile ? 30 : 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: isMobile ? 1 : 1.2 },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Mobile Background Elements */}
      {isMobile && <MobileBackground />}

      {/* Container for Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full mx-auto">
          <div
            className={`grid grid-cols-1 ${!isMobile ? "lg:grid-cols-2" : ""
              } gap-8 items-center`}
          >
            {/* Left Content */}
            <motion.div
              className={`z-10 ${!isMobile ? "order-2 lg:order-1" : "text-center"
                }`}
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className={`flex ${isMobile ? "justify-center" : ""
                  } items-center text-white mb-3 sm:mb-4 md:mb-6`}
                whileHover={{ color: "#0088ff" }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/logo1.png"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 cursor-pointer "
                  whilehover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                />
                <div
                  className={`flex flex-row items-baseline gap-1 sm:gap-3 ${isMobile
                      ? "text-2xl"
                      : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                    }`}
                >
                  <span className="font-bold">inetex</span>
                  <motion.span
                    className={`${isMobile
                        ? "text-sm"
                        : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
                      } text-green-300 font-medium italic`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    × KIIT Chapter
                  </motion.span>
                </div>
              </motion.div>

              <motion.h1
                className={`${isMobile
                    ? "text-2xl mb-10"
                    : "text-2xl sm:text-3xl md:text-4xl lg:text-6xl"
                  } font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight ${isMobile ? "px-2" : ""
                  }`}
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Innovating Across
                <div
                  className={`relative ${isMobile ? "h-8" : "h-20 md:h-24"
                    } overflow-hidden mt-1 sm:mt-2`}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentText}
                      className={`absolute ${isMobile
                          ? "inset-0 flex items-center justify-center"
                          : "block"
                        } bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent`}
                      variants={textAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ perspective: "1000px" }}
                    >
                      {textOptions[currentText].first} &{" "}
                      {textOptions[currentText].second}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.h1>

              <motion.p
                className={`${isMobile
                    ? "text-sm"
                    : "text-sm sm:text-base md:text-lg lg:text-xl"
                  } text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed ${isMobile ? "max-w-sm mx-auto px-3" : "max-w-lg"
                  }`}
                initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Pioneering the future through quantum computing, artificial
                intelligence, and next-generation IoT solutions. Where science
                meets innovation.
              </motion.p>

              {/* Statistics Section */}
              <motion.div
                className={`grid ${isMobile ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
                  } gap-2 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12 ${isMobile ? "px-3 sm:px-4" : ""
                  }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                {[
                  {
                    number: "100+",
                    label: "Research Papers",
                    color: "from-cyan-400 to-blue-500",
                  },
                  {
                    number: "25+",
                    label: "Patents Filed",
                    color: "from-blue-500 to-purple-500",
                  },
                  {
                    number: "∞+",
                    label: "Possibilities",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`${isMobile
                          ? "text-lg"
                          : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                        } font-bold bg-gradient-to-r ${stat.color
                        } bg-clip-text text-transparent mb-1 sm:mb-2`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 1.8 + index * 0.15,
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div
                      className={`${isMobile ? "text-sm" : "text-xs sm:text-sm"
                        } text-gray-400 group-hover:text-gray-300 transition-colors duration-300`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Quantum System (Desktop Only) */}
            {!isMobile && (
              <motion.div
                className="flex justify-center items-center order-1 lg:order-2"
                variants={quantumSystemVariants}
                initial="initial"
                animate="animate"
              >
                <div className="text-center relative">
                  <motion.div
                    ref={mountRef}
                    className={`w-[800px] h-[800px] max-w-full relative select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
                      } transition-all duration-300`}
                    style={{
                      filter:
                        "drop-shadow(0 0 60px rgba(0, 255, 255, 0.4)) drop-shadow(0 0 120px rgba(0, 136, 255, 0.2))",
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 z-20 ${isMobile ? "hidden sm:block" : ""
          }`}
        initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 2 : 2.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center group cursor-pointer"
          animate={{ y: [0, isMobile ? -8 : -12, 0] }}
          transition={{
            duration: isMobile ? 2 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="text-xs sm:text-sm mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300 text-center"
            whileHover={{ scale: 1.1 }}
          >
            Discover Quantum Innovation
          </motion.span>
          <motion.div
            className={`w-4 h-8 sm:w-6 sm:h-12 border-2 border-gray-400 group-hover:border-cyan-400 rounded-full flex justify-center transition-colors duration-300`}
            whileHover={{
              scale: 1.1,
              borderColor: "#06b6d4",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
            }}
          >
            <motion.div
              className={`w-1 h-2 sm:w-1.5 sm:h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-1 sm:mt-2`}
              animate={{
                y: [0, isMobile ? 8 : 16, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: isMobile ? 1.5 : 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quantum Grid Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at ${isMobile ? "1px 1px" : "2px 2px"
              }, rgba(0, 255, 255, 0.3) 1px, transparent 0)`,
            backgroundSize: isMobile ? "30px 30px" : "50px 50px",
          }}
        />
      </div>
    </div>
  );
};

export default KietexHome;
