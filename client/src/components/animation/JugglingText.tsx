import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface JugglingTextProps {
  text: string;
  className?: string;
  highlightColor?: string;
  animationSpeed?: number;
  hoverEffect?: boolean;
  animated?: boolean;
}

const JugglingText: React.FC<JugglingTextProps> = ({ 
  text, 
  className = '', 
  highlightColor = '#E2C044', 
  animationSpeed = 1,
  hoverEffect = true,
  animated = true
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Split the text into words to animate word by word instead of character by character
  const words = text.split(' ');
  
  // Generate smaller random delay for each word
  const getRandomDelay = (index: number) => {
    return (index % 3) * 0.2 * animationSpeed;
  };

  // Generate smaller random amplitude (y-axis movement)
  const getRandomAmplitude = () => {
    return -2 - Math.random() * 2; // Much smaller values for subtler animation
  };

  return (
    <div className={`text-animation ${className} inline-flex flex-wrap`}>
      {/* Map over words instead of characters */}
      {words.map((word, wordIndex) => {
        const isHighlightedByHover = hoveredIndex === wordIndex;
        
        // Add a special highlight effect for specific keywords
        const isKeyword = word.includes('Developer') || 
                          word.includes('Designer') || 
                          word.includes('Solver');
        
        return (
          <React.Fragment key={wordIndex}>
            <motion.span
              onMouseEnter={() => setHoveredIndex(wordIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ y: 0, opacity: 0.9 }}
              animate={{ 
                y: animated && isKeyword ? [0, getRandomAmplitude(), 0] : 0,
                color: isHighlightedByHover ? highlightColor : 'currentColor',
                textShadow: isHighlightedByHover ? `0 0 8px ${highlightColor}40` : 'none'
              }}
              transition={{ 
                y: {
                  duration: 1.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: getRandomDelay(wordIndex),
                  ease: 'easeInOut'
                },
                color: {
                  duration: 0.2,
                }
              }}
              whileHover={hoverEffect ? { 
                scale: 1.05, 
                color: highlightColor,
                transition: { duration: 0.2 }
              } : undefined}
              style={{ 
                display: 'inline-block', 
                transformOrigin: 'center',
                cursor: hoverEffect ? 'pointer' : 'default',
                marginRight: '0.25em',
                fontWeight: isKeyword ? 'bold' : 'inherit',
                position: 'relative',
                padding: '0 2px',
              }}
              className={isKeyword ? 'text-secondary' : ''}
            >
              {/* Add subtle visual effect to keywords */}
              {isKeyword && (
                <motion.span
                  className="absolute inset-0 rounded-md -z-10 opacity-20"
                  style={{ 
                    backgroundColor: highlightColor,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.05, 0.1, 0.05],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
              )}
              
              {/* Add dot before each keyword */}
              {isKeyword && (
                <motion.span 
                  className="inline-block mr-1 text-secondary"
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  •
                </motion.span>
              )}
              
              {word}
            </motion.span>
            {/* Only add space if it's not the last word */}
            {wordIndex < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default JugglingText;
