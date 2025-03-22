import React, { useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollControlsProps {
  children: React.ReactNode;
  damping?: number;
}

// This component animates children based on scroll position
const ScrollControls: React.FC<ScrollControlsProps> = ({ 
  children, 
  damping = 0.1 
}) => {
  const { camera } = useThree();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  
  // Get scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });
  
  // Update camera position based on scroll
  useFrame(() => {
    // Map scroll progress to camera position
    const targetY = (1 - scrollYProgress.get()) * -10;
    camera.position.y += (targetY - camera.position.y) * damping;
    
    // Keep camera looking at the center
    camera.lookAt(0, camera.position.y, 0);
  });
  
  // Update scroll height when window resizes
  useEffect(() => {
    const updateScrollHeight = () => {
      if (scrollRef.current) {
        setScrollHeight(scrollRef.current.scrollHeight);
      }
    };
    
    updateScrollHeight();
    window.addEventListener('resize', updateScrollHeight);
    return () => window.removeEventListener('resize', updateScrollHeight);
  }, []);
  
  return (
    <div ref={scrollRef} style={{ height: '100vh', overflow: 'auto' }}>
      {children}
    </div>
  );
};

export default ScrollControls;
