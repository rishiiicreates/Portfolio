import React from 'react';
import { motion } from 'framer-motion';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Pirate Badge variants for different styles
const pirateBadgeVariants = cva(
  'inline-flex items-center justify-center text-xs font-medium rounded-full px-2.5 py-0.5 transition-all',
  {
    variants: {
      variant: {
        default: 'bg-secondary/10 text-secondary border border-secondary/20',
        outline: 'bg-background/80 border border-light/20 text-light',
        jollyroger: 'bg-dark border border-secondary/20 text-secondary',
        bounty: 'bg-secondary/90 text-dark font-bold border border-secondary/20',
        navy: 'bg-primary/20 text-primary border border-primary/20',
        crew: 'bg-accent/20 text-accent border border-accent/20',
      },
      size: {
        default: 'text-xs px-2.5 py-0.5',
        sm: 'text-[10px] px-2 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
        wave: 'animate-wave',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
);

// Extended keyframes for the CSS animations in index.css
// @keyframes wave {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-3px); }
// }

export interface PirateBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pirateBadgeVariants> {
  icon?: React.ReactNode;
  showWaves?: boolean;
  bountyAmount?: string;
}

function PirateBadge({
  className,
  variant,
  size,
  animation,
  icon,
  showWaves = false,
  bountyAmount,
  children,
  ...props
}: PirateBadgeProps) {
  const isBounty = variant === 'bounty';
  
  return (
    <div className="relative inline-flex">
      {/* Decorative effects for bounty badges */}
      {isBounty && (
        <motion.div 
          className="absolute inset-0 rounded-full border border-secondary/50 -z-10"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        />
      )}
      
      <div
        className={cn(pirateBadgeVariants({ variant, size, animation, className }))}
        {...props}
      >
        {/* Wave pattern at bottom of badge */}
        {showWaves && (
          <div 
            className="absolute inset-x-0 bottom-0 h-[2px] bg-light/10"
            style={{
              clipPath: 'polygon(0% 100%, 4% 0%, 8% 100%, 12% 0%, 16% 100%, 20% 0%, 24% 100%, 28% 0%, 32% 100%, 36% 0%, 40% 100%, 44% 0%, 48% 100%, 52% 0%, 56% 100%, 60% 0%, 64% 100%, 68% 0%, 72% 100%, 76% 0%, 80% 100%, 84% 0%, 88% 100%, 92% 0%, 96% 100%, 100% 0%, 100% 100%)'
            }}
          />
        )}
        
        {/* Icon if provided */}
        {icon && <span className="mr-1">{icon}</span>}
        
        {/* Bounty amount with special styling */}
        {isBounty && bountyAmount ? (
          <span className="flex items-center">
            <span className="mr-1 text-[10px] opacity-70">₿</span>
            <span className="font-bold">{bountyAmount}</span>
          </span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export { PirateBadge, pirateBadgeVariants };