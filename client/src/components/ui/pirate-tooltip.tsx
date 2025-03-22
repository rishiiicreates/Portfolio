import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PirateTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'treasure' | 'map';
  delay?: number;
  showArrow?: boolean;
  maxWidth?: number;
  className?: string;
}

const PirateTooltip = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  delay = 0.5,
  showArrow = true,
  maxWidth = 200,
  className,
}: PirateTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  let timeout: ReturnType<typeof setTimeout> | null = null;

  // Define position styles
  const positionStyles = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '10px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '10px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '10px' },
  };

  // Define variant styles
  const variantStyles = {
    default: 'bg-dark/90 border border-light/20 text-light shadow-md',
    treasure: 'bg-dark/90 border border-secondary/30 text-light shadow-md',
    map: 'bg-dark/80 backdrop-blur-sm border border-light/20 text-light shadow-md',
  };

  // Define arrow positions
  const arrowPositions = {
    top: { bottom: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    bottom: { top: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    left: { right: -5, top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
    right: { left: -5, top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  };

  // Arrow variants
  const arrowVariantStyles = {
    default: 'border border-light/20 bg-dark',
    treasure: 'border border-secondary/30 bg-dark',
    map: 'border border-light/20 bg-dark',
  };

  // Handle hover states with delay
  const handleMouseEnter = () => {
    setShouldRender(true);
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
  };

  const handleMouseLeave = () => {
    if (timeout) clearTimeout(timeout);
    setIsVisible(false);
    
    // Delay unmounting for exit animation
    timeout = setTimeout(() => {
      setShouldRender(false);
    }, 200);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {shouldRender && (
          <motion.div
            className={cn(
              'absolute z-50 p-2 rounded-md text-sm',
              variantStyles[variant],
              className
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              ...positionStyles[position],
              maxWidth,
            }}
          >
            {/* Wave animation at bottom of tooltip */}
            <div 
              className="absolute inset-x-0 bottom-0 h-[2px] bg-light/5 overflow-hidden"
              style={{
                clipPath: 'polygon(0% 100%, 4% 60%, 8% 100%, 12% 60%, 16% 100%, 20% 60%, 24% 100%, 28% 60%, 32% 100%, 36% 60%, 40% 100%, 44% 60%, 48% 100%, 52% 60%, 56% 100%, 60% 60%, 64% 100%, 68% 60%, 72% 100%, 76% 60%, 80% 100%, 84% 60%, 88% 100%, 92% 60%, 96% 100%, 100% 60%, 100% 100%)'
              }}
            >
              <motion.div
                className="w-full h-full bg-secondary/20"
                animate={{ x: [-20, 20, -20] }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
              />
            </div>
            
            {/* Map dashes for the map variant */}
            {variant === 'map' && (
              <div className="absolute inset-x-4 top-1 h-[1px] border-b border-dashed border-light/10" />
            )}
            
            {/* Treasure sparkle for treasure variant */}
            {variant === 'treasure' && (
              <motion.div 
                className="absolute top-1 right-1 w-3 h-3 text-secondary opacity-50"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
                </svg>
              </motion.div>
            )}
            
            {/* Main content */}
            <div className="relative z-10">
              {content}
            </div>
            
            {/* Arrow */}
            {showArrow && (
              <div
                className={cn(
                  'absolute w-2 h-2 rounded-sm transform rotate-45',
                  arrowVariantStyles[variant]
                )}
                style={arrowPositions[position]}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { PirateTooltip };