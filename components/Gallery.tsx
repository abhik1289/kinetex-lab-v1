import React, { useState, useRef, useEffect, useCallback } from 'react';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  size: 'medium' | 'large' | 'xlarge';
  initialX: number;
  initialY: number;
  title: string;
};

const GallerySection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardMousePosition, setCardMousePosition] = useState({ x: 50, y: 50 });
  const [isMouseInGallery, setIsMouseInGallery] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const cursorRafRef = useRef<number | null>(null);

  // Fewer images with proper spacing - similar to the reference
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "/Gallery/g1.jpg",
      alt: "Gallery Image 1",
      size: "large",
      initialX: 15,
      initialY: 25,
      title: "Achievement 1"
    },
    {
      id: 2,
      src: "/Gallery/g2.jpg",
      alt: "Gallery Image 2",
      size: "large",
      initialX: 30,
      initialY: 65,
      title: "Achievement 2"
    },
    {
      id: 3,
      src: "/Gallery/g3.jpg",
      alt: "Gallery Image 3",
      size: "large",
      initialX: 45,
      initialY: 30,
      title: "Achievement 3"
    },
    {
      id: 4,
      src: "/Gallery/4.jpg",
      alt: "Gallery Image 4",
      size: "large",
      initialX: 60,
      initialY: 70,
      title: "Achievement 4"
    },
    {
      id: 5,
      src: "/gallery/5.jpg",
      alt: "Gallery Image 5",
      size: "large",
      initialX: 75,
      initialY: 20,
      title: "Achievement 5"
    },
    {
      id: 6,
      src: "/gallery/6.jpg",
      alt: "Gallery Image 6",
      size: "large",
      initialX: 85,
      initialY: 60,
      title: "Achievement 6"
    },
  ];

  // Handle image loading errors
  const handleImageError = useCallback((imageId: number) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  }, []);

  // Optimized mouse movement handler using requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Cancel previous frame requests
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    if (cursorRafRef.current) {
      cancelAnimationFrame(cursorRafRef.current);
    }
    
    // Update gallery position (less frequent updates)
    rafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    });

    // Update cursor position immediately for smooth movement
    cursorRafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setCursorPosition({ x, y });
      }
    });
  }, []);

  // Handle mouse enter/leave for gallery section
  const handleMouseEnter = useCallback(() => {
    setIsMouseInGallery(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInGallery(false);
  }, []);

  // Handle card-specific mouse movement for torch effect
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const cardElement = e.currentTarget;
    const rect = cardElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCardMousePosition({ x, y });
    setHoveredCard(cardId);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        if (cursorRafRef.current) {
          cancelAnimationFrame(cursorRafRef.current);
        }
      };
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Calculate the entire gallery container movement based on cursor
  const getGalleryTransform = () => {
    // When cursor is at center (50%), no movement
    // When cursor moves right (towards 100%), gallery moves left to reveal right images
    // When cursor moves left (towards 0%), gallery moves right to reveal left images
    
    // Much stronger movement to fully reveal hidden images
    const horizontalOffset = (mousePosition.x - 50) * -13; // Increased from -0.8 to -4
    const verticalOffset = (mousePosition.y - 50) * -0.3; // Subtle vertical movement
    
    return `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0)`;
  };

  // Individual image positioning (static relative to their container)
  const getImageStyle = (image: GalleryImage) => {
    // Image sizes similar to reference
    const sizeClasses: Record<GalleryImage['size'], string> = {
      medium: 'w-72 h-48 sm:w-80 sm:h-52 lg:w-96 lg:h-64',
      large: 'w-80 h-52 sm:w-96 sm:h-64 lg:w-112 lg:h-72',
      xlarge: 'w-96 h-64 sm:w-112 sm:h-72 lg:w-128 lg:h-84'
    };

    return {
      left: `${image.initialX}%`,
      top: `${image.initialY}%`,
      className: sizeClasses[image.size]
    };
  };

  // Get torch light style for illumination effect
  const getTorchLightStyle = (cardId: number) => {
    if (hoveredCard !== cardId) return {};
    
    return {
      background: `radial-gradient(circle 250px at ${cardMousePosition.x}% ${cardMousePosition.y}%, 
        transparent 0%, 
        rgba(0, 0, 0, 0.1) 20%, 
        rgba(0, 0, 0, 0.4) 50%, 
        rgba(0, 0, 0, 0.8) 80%, 
        rgba(0, 0, 0, 0.9) 100%)`,
    };
  };

  // Fallback gradient for failed images
  const getFallbackGradient = (index: number): string => {
    const gradients = [
      'linear-gradient(135deg, rgba(139, 69, 19, 0.9) 0%, rgba(160, 82, 45, 1) 100%)',
      'linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(59, 130, 246, 1) 100%)',
      'linear-gradient(135deg, rgba(120, 53, 15, 0.9) 0%, rgba(180, 83, 9, 1) 100%)',
      'linear-gradient(135deg, rgba(91, 33, 182, 0.9) 0%, rgba(139, 92, 246, 1) 100%)',
      'linear-gradient(135deg, rgba(20, 184, 166, 0.9) 0%, rgba(34, 211, 238, 1) 100%)',
      'linear-gradient(135deg, rgba(157, 23, 77, 0.9) 0%, rgba(236, 72, 153, 1) 100%)'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
      </div>

      <div className="relative z-10 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12 px-4">
          <h2 className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4 tracking-wider uppercase">
             Core Team
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 px-2">
            Achievements
          </h1>
        </div>

        {/* Full Width Interactive Gallery Container */}
        <div 
          ref={containerRef}
          className={`relative w-full ${isMouseInGallery ? 'cursor-none' : 'cursor-default'}`}
          style={{ 
            height: '80vh', 
            minHeight: '600px',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)'
          }}
        >
          {/* Custom cursor - only visible when mouse is in gallery */}
          {isMouseInGallery && (
            <div 
              className="absolute w-3 h-3 bg-white/60 rounded-full pointer-events-none z-50 transition-none"
              style={{
                left: `${cursorPosition.x}%`,
                top: `${cursorPosition.y}%`,
                transform: 'translate3d(-50%, -50%, 0)',
                willChange: 'transform'
              }}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
            </div>
          )}

          {/* Gallery Images Container - This moves with cursor */}
          <div 
            className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: getGalleryTransform(),
              width: '200%', // Much wider container to hold extended images
              left: '-50%'   // Offset to center it properly
            }}
          >
            {galleryImages.map((image, index) => {
              const imageStyle = getImageStyle(image);
              const hasImageError = imageErrors[image.id];
              const isHovered = hoveredCard === image.id;
              
              return (
                <div
                  key={image.id}
                  className={`absolute ${imageStyle.className} transition-all duration-300 ease-out hover:scale-105 hover:z-40 group will-change-transform`}
                  style={{
                    left: imageStyle.left,
                    top: imageStyle.top,
                    transform: 'translate3d(-50%, -50%, 0)',
                    zIndex: index + 1
                  }}
                  onMouseMove={(e) => handleCardMouseMove(e, image.id)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/30">
                    {/* Actual Image */}
                    {!hasImageError && (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                        onError={() => handleImageError(image.id)}
                        loading="lazy"
                      />
                    )}
                    
                    {/* Fallback gradient background when image fails to load */}
                    {hasImageError && (
                      <div 
                        className="w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                        style={{ background: getFallbackGradient(index) }}
                      >
                        <div className="text-white/90 text-lg font-semibold text-center">
                          {image.title}
                        </div>
                      </div>
                    )}

                    {/* Default Dark Overlay - More prominent when not hovered */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      isHovered 
                        ? 'bg-linear-to-b from-black/30 via-transparent to-black/40' 
                        : 'bg-linear-to-b from-black/60 via-black/30 to-black/70'
                    }`} />

                    {/* Additional default darkness overlay */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      isHovered ? 'bg-black/0' : 'bg-black/40'
                    }`} />

                    {/* Torch light overlay - only on hover - this creates the illumination */}
                    <div 
                      className="absolute inset-0 pointer-events-none transition-all duration-200"
                      style={getTorchLightStyle(image.id)}
                    />

                    {/* Additional torch glow effect on hovered card */}
                    {hoveredCard === image.id && (
                      <div 
                        className="absolute pointer-events-none transition-opacity duration-200"
                        style={{
                          left: `${cardMousePosition.x}%`,
                          top: `${cardMousePosition.y}%`,
                          transform: 'translate3d(-50%, -50%, 0)',
                          width: '400px',
                          height: '400px',
                          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)',
                          borderRadius: '50%',
                        }}
                      />
                    )}

                    {/* Optional: Title overlay that appears on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 px-4">
          <p className="text-sm text-gray-400 tracking-wide">
            Move your cursor to explore • Hover over cards to illuminate with your torch
          </p>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;