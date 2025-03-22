import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  yOffset?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 6,
  delay = 0,
  yOffset = 20,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [-yOffset/2, yOffset/2, -yOffset/2] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
