import React from 'react';
import { motion } from 'framer-motion';

interface RotatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  clockwise?: boolean;
  className?: string;
}

const RotatingElement: React.FC<RotatingElementProps> = ({
  children,
  duration = 15,
  delay = 0,
  clockwise = true,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      initial={{ rotate: 0 }}
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default RotatingElement;
