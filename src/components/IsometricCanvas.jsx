import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sphere } from '@react-three/drei';

function GlossyOrb() {
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
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial 
          color="#5BA8FF"
          transparent 
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </Sphere>
      
      {/* Subtle inner glow */}
      <Sphere args={[0.8, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#5BA8FF"
          transparent 
          opacity={0.1}
        />
      </Sphere>
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

  // Return fallback image if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <div className={`isometric-placeholder ${className}`} style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(91, 168, 255, 0.1), rgba(255, 122, 69, 0.1))',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src="/assets/posters/r3f-fallback.jpg" 
          alt="3D scene preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '16px'
          }}
          loading="lazy"
          decoding="async"
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, var(--brand), transparent)',
          borderRadius: '50%',
          opacity: 0.6
        }}></div>
      </div>
    );
  }

  if (!isVisible) {
    return (
      <div className={`isometric-placeholder ${className}`} style={{
        width: '100%',
        height: '200px',
        background: 'var(--card)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: 'var(--muted)' }}>Loading 3D...</span>
      </div>
    );
  }

  return (
    <div className={`isometric-container ${className}`} style={{ width: '100%', height: '200px' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#5BA8FF" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#FF7A45" />
        
        <GlossyOrb />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
