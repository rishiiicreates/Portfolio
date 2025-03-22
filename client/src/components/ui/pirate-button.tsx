import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Enhanced Pirate Button styles with anime-inspired variants
const pirateButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'btn-glow bg-primary text-white font-medium hover:bg-primary/90 border-2 border-primary/30',
        secondary: 'btn-glow bg-secondary text-dark font-medium hover:bg-secondary/90 border-2 border-secondary/30',
        outline: 'border-2 border-light/20 text-light hover:border-primary hover:text-primary',
        // One Piece character themed variants
        luffy: 'btn-glow-luffy bg-gradient-to-r from-[#ef4444] to-[#b91c1c] text-white font-bold',
        zoro: 'btn-glow-zoro bg-gradient-to-r from-[#22c55e] to-[#15803d] text-white font-bold',
        sanji: 'btn-glow bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-dark font-bold border-2 border-[#ca8a04]/30',
        strawhats: 'btn-glow bg-gradient-to-r from-secondary to-secondary/80 text-dark font-bold border-2 border-secondary/30',
        jollyroger: 'bg-dark/80 backdrop-blur-sm border-2 border-light/20 text-light hover:border-primary',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface PirateButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pirateButtonVariants> {
  asChild?: boolean;
  href?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  whileHoverScale?: number;
  showWaves?: boolean;
  animateEffect?: 'none' | 'pulse' | 'glow' | 'bounce' | 'shake';
}

// Using polymorphic type approach to handle both button and anchor elements
type PolymorphicRef = ((instance: HTMLButtonElement | null) => void) | 
                       ((instance: HTMLAnchorElement | null) => void) | 
                       React.RefObject<HTMLButtonElement> | 
                       React.RefObject<HTMLAnchorElement> | 
                       null;

const PirateButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, PirateButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    href, 
    rightIcon, 
    leftIcon,
    whileHoverScale = 1.05,
    showWaves = true,
    animateEffect = 'none',
    children,
    ...props 
  }, ref) => {
    const Comp = href ? 'a' : 'button';
    const hrefProps = href ? { href } : {};
    
    // Determine if this is a character-styled button for special effects
    const isCharacterStyled = variant === 'luffy' || variant === 'zoro' || variant === 'sanji' || variant === 'strawhats';
    
    // Animation effects based on the provided prop
    const animationClass = animateEffect !== 'none' 
      ? `animate-${animateEffect === 'pulse' ? 'power-pulse' : 
          animateEffect === 'glow' ? 'glow' : 
          animateEffect === 'bounce' ? 'bouncy' : 
          animateEffect === 'shake' ? 'shake' : ''}`
      : '';

    // Wave animation variants
    const waveVariants = {
      animate: {
        x: [0, 30, 0],
        transition: { 
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse' as const
        }
      }
    };
    
    // Button hover animation
    const buttonHoverAnimation = {
      scale: whileHoverScale,
      y: -3,
      boxShadow: isCharacterStyled 
        ? '0 0 20px rgba(255, 255, 255, 0.4)' 
        : '0 0 15px rgba(59, 130, 246, 0.6)'
    };

    return (
      <motion.div
        whileHover={buttonHoverAnimation}
        whileTap={{ scale: 0.95, rotate: [-1, 1, 0] }}
        className={cn("relative", animationClass)}
      >
        {/* Anime-style energy aura around character-styled buttons */}
        {isCharacterStyled && (
          <>
            <motion.div 
              className="absolute inset-0 rounded-full -z-10 opacity-60"
              style={{ 
                background: variant === 'luffy' 
                  ? 'radial-gradient(circle, rgba(239,68,68,0.5) 0%, rgba(153,27,27,0) 70%)' 
                  : variant === 'zoro'
                  ? 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(22,101,52,0) 70%)'
                  : variant === 'sanji'
                  ? 'radial-gradient(circle, rgba(234,179,8,0.5) 0%, rgba(161,98,7,0) 70%)'
                  : 'radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(180,83,9,0) 70%)'
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
            
            {/* Character-specific embellishments */}
            {variant === 'luffy' && (
              <motion.div 
                className="absolute -right-1 -top-1 w-4 h-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full border-2 border-[#ef4444] bg-[#ef4444]/20"></div>
              </motion.div>
            )}
            
            {variant === 'zoro' && (
              <motion.div 
                className="absolute -left-2 top-1/2 w-4 h-1 bg-[#22c55e]/50"
                style={{ transform: 'translateY(-50%)' }}
                animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </>
        )}
        
        {/* @ts-ignore - TypeScript has some limitations with polymorphic components */}
        <Comp
          className={cn(pirateButtonVariants({ variant, size, className }))}
          ref={ref as any}
          {...hrefProps}
          {...props}
        >
          {/* Wave animation at bottom of button - anime style with more contrast */}
          {showWaves && (
            <>
              <motion.div 
                className="absolute inset-x-0 bottom-0 h-[4px]"
                style={{
                  background: variant === 'luffy' ? 'rgba(239, 68, 68, 0.6)' :
                             variant === 'zoro' ? 'rgba(34, 197, 94, 0.6)' :
                             variant === 'sanji' ? 'rgba(234, 179, 8, 0.6)' :
                             variant === 'strawhats' ? 'rgba(245, 158, 11, 0.6)' :
                             'rgba(59, 130, 246, 0.4)',
                  clipPath: 'polygon(0% 100%, 4% 60%, 8% 100%, 12% 60%, 16% 100%, 20% 60%, 24% 100%, 28% 60%, 32% 100%, 36% 60%, 40% 100%, 44% 60%, 48% 100%, 52% 60%, 56% 100%, 60% 60%, 64% 100%, 68% 60%, 72% 100%, 76% 60%, 80% 100%, 84% 60%, 88% 100%, 92% 60%, 96% 100%, 100% 60%, 100% 100%)'
                }}
                variants={waveVariants}
                animate="animate"
              />
              
              {isCharacterStyled && (
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-[10px]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    clipPath: 'polygon(0% 100%, 5% 50%, 10% 100%, 15% 50%, 20% 100%, 25% 50%, 30% 100%, 35% 50%, 40% 100%, 45% 50%, 50% 100%, 55% 50%, 60% 100%, 65% 50%, 70% 100%, 75% 50%, 80% 100%, 85% 50%, 90% 100%, 95% 50%, 100% 100%, 100% 100%)'
                  }}
                  animate={{ x: [0, -20, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
              )}
            </>
          )}
          
          {/* Left icon with animation if provided */}
          {leftIcon && (
            <motion.span 
              className="mr-2 relative z-10"
              whileHover={{ rotate: [-10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {leftIcon}
            </motion.span>
          )}
          
          {/* Main content with optional text glow for character buttons */}
          <span className={cn("relative z-10", 
            isCharacterStyled && (
              variant === 'luffy' ? 'text-glow-luffy' : 
              variant === 'zoro' ? 'text-glow-zoro' : 
              variant === 'sanji' ? 'text-glow-sanji' : 
              'text-glow'
            )
          )}>
            {children}
          </span>
          
          {/* Right icon with animation if provided */}
          {rightIcon && (
            <motion.span 
              className="ml-2 relative z-10"
              whileHover={{ rotate: [10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {rightIcon}
            </motion.span>
          )}
        </Comp>
      </motion.div>
    );
  }
);

PirateButton.displayName = 'PirateButton';

export { PirateButton, pirateButtonVariants };
