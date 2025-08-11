import { useEffect, useState, useRef } from 'react';

interface BackgroundManagerProps {
  className?: string;
}

export default function BackgroundManager({ className = "" }: BackgroundManagerProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const backgrounds = [
    '/assets/images/backgrounds/hero-1.jpg',
    '/assets/images/backgrounds/hero-2.jpg',
    '/assets/images/backgrounds/section-1.jpg',
    '/assets/images/backgrounds/section-2.jpg',
  ];

  useEffect(() => {
    console.log('BackgroundManager: Starting initialization');
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Preload images
    const preloadImages = async () => {
      console.log('BackgroundManager: Starting image preload');
      const promises = backgrounds.map((src, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log(`BackgroundManager: Image ${index} loaded successfully:`, src);
            resolve(src);
          };
          img.onerror = (error) => {
            console.error(`BackgroundManager: Failed to load image ${index}:`, src, error);
            reject(error);
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(promises);
        console.log('BackgroundManager: All images preloaded successfully');
        setIsLoaded(true);
      } catch (error) {
        console.warn('BackgroundManager: Failed to preload some background images:', error);
        // Even if some fail, mark as loaded so we can show what we have
        setIsLoaded(true);
      }
    };

    preloadImages();

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isLoaded) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollProgress = scrollY / (documentHeight - windowHeight);
      
      // Calculate which image to show based on scroll position
      const imageIndex = Math.floor(scrollProgress * (backgrounds.length - 1));
      setCurrentImage(Math.min(imageIndex, backgrounds.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion, isLoaded]);

  // If reduced motion is preferred, show only the first background
  const displayImage = prefersReducedMotion ? backgrounds[0] : backgrounds[currentImage];

  console.log('BackgroundManager render state:', {
    isLoaded,
    prefersReducedMotion,
    currentImage,
    displayImage
  });

  if (!isLoaded) {
    console.log('BackgroundManager: Showing loading state');
    return (
      <div 
        ref={containerRef}
        className={`background-manager ${className}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: 'var(--bg)',
        }}
      />
    );
  }

  console.log('BackgroundManager: Showing background image:', displayImage);
  return (
    <div 
      ref={containerRef}
      className={`background-manager ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: `linear-gradient(rgba(11, 15, 20, 0.3), rgba(11, 15, 20, 0.5)), url(${displayImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: prefersReducedMotion ? 'scroll' : 'fixed',
        transition: prefersReducedMotion ? 'none' : 'background-image 0.5s ease-in-out',
      }}
    />
  );
}
