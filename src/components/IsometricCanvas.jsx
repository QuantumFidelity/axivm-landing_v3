import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

function FloatingCard() {
  const meshRef = useRef();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useFrame((state) => {
    if (!prefersReducedMotion && meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Box args={[2, 0.1, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#5BA8FF" 
          transparent 
          opacity={0.8}
          metalness={0.5}
          roughness={0.2}
        />
      </Box>
      <Box args={[0.1, 1, 1.5]} position={[1, 0.5, 0]}>
        <meshStandardMaterial 
          color="#FF7A45" 
          transparent 
          opacity={0.6}
          metalness={0.3}
          roughness={0.4}
        />
      </Box>
      <Box args={[0.1, 1, 1.5]} position={[-1, 0.5, 0]}>
        <meshStandardMaterial 
          color="#5BA8FF" 
          transparent 
          opacity={0.6}
          metalness={0.3}
          roughness={0.4}
        />
      </Box>
    </group>
  );
}

export default function IsometricCanvas({ className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.isometric-container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Return null on SSR or if reduced motion is preferred
  if (typeof window === 'undefined' || prefersReducedMotion) {
    return (
      <div className={`isometric-placeholder ${className}`} style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(91, 168, 255, 0.1), rgba(255, 122, 69, 0.1))',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '40px',
          background: 'linear-gradient(45deg, var(--brand), var(--accent))',
          borderRadius: '4px',
          transform: 'rotate(45deg)'
        }}></div>
      </div>
    );
  }

  if (!isVisible) {
    return (
      <div className={`isometric-placeholder ${className}`} style={{
        width: '100%',
        height: '200px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: 'var(--text-muted)' }}>Loading 3D...</span>
      </div>
    );
  }

  return (
    <div className={`isometric-container ${className}`} style={{ width: '100%', height: '200px' }}>
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <FloatingCard />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
