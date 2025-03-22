import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  variant?: 'line' | 'logpose' | 'dots';
  color?: 'primary' | 'secondary' | 'accent';
  thickness?: number;
  showPercentage?: boolean;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  variant = 'line',
  color = 'secondary',
  thickness = 4,
  showPercentage = false,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const [percentage, setPercentage] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);
  
  // Color classes
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
  };
  
  // Render based on variant
  const renderProgress = () => {
    switch (variant) {
      case 'logpose':
        return (
          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative flex items-center justify-center w-20 h-20">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-light/10" />
              
              {/* Compass rose background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-light">
                  <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" strokeWidth="1" />
                </svg>
              </div>
              
              {/* Progress circle */}
              <svg className="w-full h-full -rotate-90 drop-shadow-glow" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  className="stroke-light/5 fill-none" 
                  strokeWidth={thickness} 
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  className={`fill-none ${colorClasses[color]}/80`}
                  strokeWidth={thickness}
                  strokeDasharray="251.2"
                  style={{ 
                    pathLength: scaleX,
                    strokeLinecap: 'round' 
                  }}
                />
              </svg>
              
              {/* Pointer in the middle */}
              <motion.div 
                className={`absolute w-1 h-4 ${colorClasses[color]} rounded-full`}
                style={{ 
                  rotate: percentage * 3.6, // 0-100% maps to 0-360 degrees
                  transformOrigin: 'bottom center',
                }}
              />
              
              {/* Percentage text */}
              {showPercentage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xs font-medium text-${color}`}>
                    {percentage}%
                  </span>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'dots':
        // Create an array of 10 dots representing 10% increments
        const dots = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
        
        return (
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
            {dots.map((dot) => (
              <div 
                key={dot} 
                className="relative w-3 h-3"
              >
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full border border-light/20",
                    percentage >= dot ? `${colorClasses[color]}/80` : "bg-dark/50"
                  )}
                />
                {/* Active dot has a glow effect */}
                {percentage >= dot - 5 && percentage <= dot + 5 && (
                  <motion.div 
                    className={cn(
                      "absolute inset-0 rounded-full",
                      `${colorClasses[color]}/50`
                    )}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        );
        
      case 'line':
      default:
        return (
          <motion.div
            className={cn(
              "fixed top-0 left-0 right-0 h-[3px] origin-left z-50",
              colorClasses[color]
            )}
            style={{ scaleX }}
          >
            {/* Animated particle effect along the line */}
            <motion.div
              className={`absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-${color} to-transparent`}
              animate={{
                x: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            
            {/* Percentage indicator */}
            {showPercentage && (
              <div className="absolute top-2 right-4">
                <div className={`text-xs font-medium px-2 py-1 rounded-md bg-${color}/10 text-${color}`}>
                  {percentage}%
                </div>
              </div>
            )}
          </motion.div>
        );
    }
  };

  return renderProgress();
};

export { ScrollProgress };