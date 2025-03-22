import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingIslandProps {
  children: React.ReactNode;
  variant?: 'default' | 'treasure' | 'log' | 'marine';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

const FloatingIsland: React.FC<FloatingIslandProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  style,
}) => {
  // Define classes based on variant and size
  const variantClasses = {
    default: 'bg-dark/50 border-b-2 border-light/10 shadow-lg',
    treasure: 'bg-dark/60 border-b-2 border-secondary/30 shadow-lg',
    log: 'bg-dark/40 border-b-2 border-primary/20 shadow-lg',
    marine: 'bg-primary/10 border-b-2 border-light/20 shadow-lg',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  // Define animation properties based on variant
  const floatAnimation = {
    default: {
      y: [0, -10, 0],
      rotate: [0, 1, 0],
    },
    treasure: {
      y: [0, -15, 0],
      rotate: [0, 2, 0],
    },
    log: {
      y: [0, -8, 0],
      rotate: [-1, 1, -1],
    },
    marine: {
      y: [0, -5, 0],
      rotate: [0, 0.5, 0],
    },
  };

  const transitionProps = {
    default: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
    treasure: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
    log: {
      duration: 3.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
    marine: {
      duration: 4.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  return (
    <motion.div
      className={cn(
        'relative rounded-md overflow-hidden backdrop-blur-sm',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      animate={floatAnimation[variant]}
      transition={transitionProps[variant]}
      style={style}
    >
      {/* Island "ground" effect at the bottom */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"
      />
      
      {/* Variant-specific decorative elements */}
      {variant === 'treasure' && (
        <div className="absolute -right-2 -top-2 w-8 h-8 opacity-30">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-secondary">
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" strokeWidth="2" />
          </svg>
        </div>
      )}
      
      {variant === 'log' && (
        <div className="absolute right-2 top-2 w-6 h-6 opacity-30">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary">
            <path d="M9 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15M21 9V3M21 3H15M21 3L12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      
      {/* Water ripple effect around the island */}
      <div className="absolute -inset-1 -z-10">
        <motion.div 
          className="absolute inset-0 rounded-full border border-light/5"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        <motion.div 
          className="absolute inset-0 rounded-full border border-light/3"
          animate={{
            scale: [1.05, 1.1, 1.05],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export { FloatingIsland };