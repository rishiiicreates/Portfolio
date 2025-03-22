import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PirateCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'treasure' | 'map' | 'logpose';
  hoverEffect?: boolean;
  showWaves?: boolean;
  glowOnHover?: boolean;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  className?: string;
}

export const PirateCard: React.FC<PirateCardProps> = ({
  children,
  variant = 'default',
  hoverEffect = true,
  showWaves = true,
  glowOnHover = true,
  borderStyle = 'solid',
  className,
}) => {
  // Determine classes based on variant
  const baseClasses = "relative rounded-lg overflow-hidden transition-all duration-300 p-4";
  
  const variantClasses = {
    default: "bg-dark/80 border border-light/10",
    treasure: "bg-dark/90 border-2 border-secondary/30",
    map: "bg-dark/70 backdrop-blur-sm border-2 border-light/20",
    logpose: "bg-background/80 border border-primary/20",
  };
  
  // Determine if we need special map styling
  const isMap = variant === 'map';
  const isTreasure = variant === 'treasure';
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        borderStyle !== 'solid' && `border-${borderStyle}`,
        className
      )}
    >
      {/* Treasure chest decorative elements */}
      {isTreasure && (
        <>
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-secondary/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-secondary/40 rounded-br-lg" />
        </>
      )}
      
      {/* Map background texture */}
      {isMap && (
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '150px',
          }}
        />
      )}
      
      {/* Wave animation at bottom */}
      {showWaves && (
        <div 
          className="absolute inset-x-0 bottom-0 h-[4px] animate-wave"
          style={{
            background: isTreasure ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.1)',
            clipPath: 'polygon(0% 100%, 4% 60%, 8% 100%, 12% 60%, 16% 100%, 20% 60%, 24% 100%, 28% 60%, 32% 100%, 36% 60%, 40% 100%, 44% 60%, 48% 100%, 52% 60%, 56% 100%, 60% 60%, 64% 100%, 68% 60%, 72% 100%, 76% 60%, 80% 100%, 84% 60%, 88% 100%, 92% 60%, 96% 100%, 100% 60%, 100% 100%)'
          }}
        />
      )}
      
      {/* Main content with proper padding */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};