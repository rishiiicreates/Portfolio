import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PirateBadge } from './pirate-badge';

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: React.ReactNode;
  tags?: string[];
  location?: string;
}

interface VoyageTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const VoyageTimeline: React.FC<VoyageTimelineProps> = ({ 
  items,
  className
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Timeline center line with wave pattern */}
      <div className="absolute left-0 md:left-1/2 top-0 h-full w-[2px] md:-translate-x-1/2 z-0">
        <div className="absolute inset-0 bg-light/10"></div>
        <motion.div 
          className="absolute inset-0 bg-secondary/30"
          style={{
            maskImage: "url('data:image/svg+xml,%3Csvg width='2' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0 C 1 20 1 20 0 40 C -1 60 1 60 1 80' stroke='black' fill='none' /%3E%3C/svg%3E')",
            maskSize: "2px 80px",
            maskRepeat: "repeat-y"
          }}
          animate={{ y: [0, 80, 0] }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      </div>

      {/* Timeline items */}
      <div className="relative z-10">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={cn(
              "relative flex flex-col md:flex-row mb-12 last:mb-0 items-start",
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Timeline marker with icon */}
            <div className="absolute left-[-10px] md:left-1/2 md:-translate-x-1/2 mt-1 z-20">
              <motion.div 
                className="w-5 h-5 rounded-full bg-dark border-2 border-secondary flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon || (
                  <span className="text-[10px] text-secondary">⚓</span>
                )}
              </motion.div>
            </div>

            {/* Content container - alternating left/right on desktop */}
            <div 
              className={cn(
                "ml-8 md:ml-0 w-full md:w-[calc(50%-20px)]", 
                index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'
              )}
            >
              {/* Date badge */}
              <div className="mb-2">
                <PirateBadge 
                  variant="jollyroger"
                  size="sm"
                  className="inline-block"
                  showWaves={true}
                >
                  {item.date}
                </PirateBadge>
                
                {item.location && (
                  <span className="text-xs text-light/50 ml-2">
                    {item.location}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-light mb-2 text-glow">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-light/70 mb-3 text-sm">
                {item.description}
              </p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag, tagIndex) => (
                    <PirateBadge
                      key={tagIndex}
                      variant="navy"
                      size="sm"
                    >
                      {tag}
                    </PirateBadge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export { VoyageTimeline };