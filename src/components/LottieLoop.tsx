import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function LottieLoop({ 
  src, 
  loop = true, 
  autoplay = true, 
  className = "",
  poster = null 
}: {
  src: string | object;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  poster?: string | null;
}) {
  const [animationData, setAnimationData] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Load animation data
    if (typeof src === 'string' && src.startsWith('http')) {
      fetch(src)
        .then(response => response.json())
        .then(data => {
          setAnimationData(data);
          setIsLoaded(true);
        })
        .catch(error => {
          console.error('Failed to load Lottie animation:', error);
          setIsLoaded(true);
        });
    } else {
      setAnimationData(src);
      setIsLoaded(true);
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [src]);

  if (!isLoaded) {
    return (
      <div className={`lottie-placeholder ${className}`} style={{ 
        width: '100%', 
        height: '200px', 
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: 'var(--text-muted)' }}>Loading...</span>
      </div>
    );
  }

  // Show static poster if reduced motion is preferred
  if (prefersReducedMotion && poster) {
    return (
      <img 
        src={poster} 
        alt="Animation preview" 
        className={className}
        style={{ width: '100%', height: 'auto' }}
      />
    );
  }

  // Show nothing if reduced motion and no poster
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
