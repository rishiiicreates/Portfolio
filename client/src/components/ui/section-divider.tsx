import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'wave' | 'compass' | 'rope' | 'simple';
  color?: 'primary' | 'secondary' | 'accent' | 'light';
  animate?: boolean;
}

const SectionDivider = ({
  variant = 'wave',
  color = 'secondary',
  animate = true,
  className,
  ...props
}: SectionDividerProps) => {
  // Color classes based on the color prop
  const colorClasses = {
    primary: 'from-primary/20 via-primary/10 to-transparent',
    secondary: 'from-secondary/20 via-secondary/10 to-transparent',
    accent: 'from-accent/20 via-accent/10 to-transparent',
    light: 'from-light/20 via-light/10 to-transparent',
  };

  // Render based on variant
  const renderDivider = () => {
    switch (variant) {
      case 'wave':
        return (
          <div className={cn('relative h-16 w-full', className)} {...props}>
            <div className="absolute inset-0 bg-gradient-to-b opacity-20 z-0" />
            
            {/* Wave pattern */}
            <motion.div 
              className="wave-divider absolute inset-x-0 bottom-0"
              animate={animate ? { x: [-20, 20, -20] } : undefined}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
            
            {/* Second wave with offset */}
            <motion.div 
              className="wave-divider absolute inset-x-0 bottom-4 opacity-70"
              animate={animate ? { x: [20, -20, 20] } : undefined}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
          </div>
        );
        
      case 'compass':
        return (
          <div className={cn('relative py-6 flex justify-center items-center', className)} {...props}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-light/10 to-transparent" />
            
            {/* Compass rose in the middle */}
            <motion.div 
              className="absolute bg-dark rounded-full p-3 border border-light/20 z-10"
              animate={animate ? { rotate: [0, 360] } : undefined}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary">
                <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        );
        
      case 'rope':
        return (
          <div className={cn('relative py-6', className)} {...props}>
            <div className="h-1 w-full bg-light/5 relative overflow-hidden">
              {/* Rope pattern */}
              <motion.div
                className="absolute inset-y-0 w-[200%] left-0"
                style={{
                  backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(245, 158, 11, 0.2) 45%, transparent 50%, transparent 90%, rgba(245, 158, 11, 0.2) 95%, transparent 100%)',
                  backgroundSize: '20px 100%',
                }}
                animate={animate ? { x: ['-50%', '0%', '-50%'] } : undefined}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear'
                }}
              />
            </div>
          </div>
        );
        
      case 'simple':
      default:
        return (
          <div 
            className={cn('h-px w-full bg-gradient-to-r from-transparent via-light/10 to-transparent my-8', className)}
            {...props}
          />
        );
    }
  };

  return renderDivider();
};

export { SectionDivider };