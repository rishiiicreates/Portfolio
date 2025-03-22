import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StarProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinking?: boolean;
  color?: string;
  isSpecial?: boolean;
}

interface CloudProps {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  speed: number;
  variant?: 'normal' | 'anime';
}

interface EnergyParticleProps {
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

interface PirateBackgroundProps {
  starCount?: number;
  cloudCount?: number;
  showClouds?: boolean;
  showStars?: boolean;
  showWaves?: boolean;
  showEnergyParticles?: boolean;
  theme?: 'default' | 'luffy' | 'zoro' | 'sanji';
}

// Enhanced Star component with anime sparkle effects
const Star: React.FC<StarProps> = ({ x, y, size, opacity, blinking = false, color = 'white', isSpecial = false }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: isSpecial ? `0 0 ${size * 2}px ${color}` : 'none',
      }}
      initial={{ opacity }}
      animate={
        isSpecial 
          ? {
              opacity: [opacity, opacity * 0.7, opacity],
              scale: [1, 1.5, 1],
            } 
          : blinking 
            ? {
                opacity: [opacity, opacity * 0.3, opacity],
              } 
            : { opacity }
      }
      transition={
        isSpecial 
          ? {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'loop',
            }
          : blinking 
            ? {
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: 'loop',
              } 
            : {}
      }
    >
      {/* Star rays for special stars */}
      {isSpecial && (
        <>
          <motion.div 
            className="absolute"
            style={{
              width: size * 5,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              left: -size * 2,
              top: size / 2,
            }}
            animate={{ 
              opacity: [0.7, 0.3, 0.7],
              rotate: [0, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
          <motion.div 
            className="absolute"
            style={{
              width: 1,
              height: size * 5,
              background: `linear-gradient(0deg, transparent, ${color}, transparent)`,
              left: size / 2,
              top: -size * 2,
            }}
            animate={{ 
              opacity: [0.7, 0.3, 0.7],
              rotate: [0, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </>
      )}
    </motion.div>
  );
};

// Enhanced Cloud component with anime-style options
const Cloud: React.FC<CloudProps> = ({ x, y, scale, opacity, speed, variant = 'normal' }) => {
  const isAnimeStyle = variant === 'anime';
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: opacity,
      }}
      initial={{ x: `${x}%` }}
      animate={{ x: '120%' }}
      transition={{
        duration: speed,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
    >
      <div
        className={`absolute ${isAnimeStyle ? 'opacity-20' : 'opacity-10'}`}
        style={{ 
          transform: `scale(${scale})`,
        }}
      >
        {isAnimeStyle ? (
          // Anime-style fluffy cloud
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M25 65 C10 65 5 55 10 45 C15 35 10 25 20 20 C30 15 40 25 50 15 C60 5 75 10 80 20 C85 30 100 25 110 35 C120 45 115 60 105 65 C95 70 85 65 75 70 C65 75 55 70 45 75 C35 80 25 75 25 65 Z" 
              fill="white"
              strokeWidth="2"
              stroke="rgba(255,255,255,0.3)"
            />
            <path 
              d="M20 55 C15 50 15 45 20 40 M40 20 C45 15 55 15 60 20 M90 30 C95 25 105 30 110 35"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          // Original cloud
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M10 40 Q15 20 30 30 Q35 5 50 15 Q65 0 70 15 Q85 5 90 20 Q100 10 95 30 Q100 50 80 45 Q75 55 60 45 Q50 60 40 45 Q25 55 15 45 Q5 50 10 40 Z" 
              fill="white"
            />
          </svg>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced Ocean Waves with anime-style effects
const OceanWaves: React.FC<{theme?: string}> = ({ theme = 'default' }) => {
  // Theme-based colors
  const getWaveColor = () => {
    switch(theme) {
      case 'luffy': return 'rgba(239, 68, 68, 0.2)'; // Red wave
      case 'zoro': return 'rgba(34, 197, 94, 0.2)'; // Green wave
      case 'sanji': return 'rgba(234, 179, 8, 0.2)'; // Yellow wave
      default: return 'rgba(30, 64, 175, 0.2)'; // Blue wave
    }
  };
  
  return (
    <div className="absolute inset-x-0 bottom-0 h-48 overflow-hidden pointer-events-none">
      {/* Regular waves */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-[200%] h-16"
          style={{
            bottom: `${(i - 1) * 15}px`,
            left: '-50%',
            opacity: 0.08 - (i * 0.01),
            background: getWaveColor(),
            maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1000 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z\' fill=\'%23000\'/%3E%3C/svg%3E")',
            maskSize: '100% 100%',
          }}
          animate={{ x: [`${i * 10}%`, `${-50 + (i * 10)}%`] }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Anime-style wave highlights - more stylized */}
      <motion.div 
        className="absolute w-full h-1"
        style={{
          bottom: '30px',
          background: theme === 'default' ? 'rgba(59, 130, 246, 0.6)' : 
                     theme === 'luffy' ? 'rgba(239, 68, 68, 0.6)' :
                     theme === 'zoro' ? 'rgba(34, 197, 94, 0.6)' :
                     'rgba(234, 179, 8, 0.6)',
          opacity: 0.3,
          clipPath: 'polygon(0% 0%, 3% 50%, 6% 0%, 9% 50%, 12% 0%, 15% 50%, 18% 0%, 21% 50%, 24% 0%, 27% 50%, 30% 0%, 33% 50%, 36% 0%, 39% 50%, 42% 0%, 45% 50%, 48% 0%, 51% 50%, 54% 0%, 57% 50%, 60% 0%, 63% 50%, 66% 0%, 69% 50%, 72% 0%, 75% 50%, 78% 0%, 81% 50%, 84% 0%, 87% 50%, 90% 0%, 93% 50%, 96% 0%, 99% 50%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      />
    </div>
  );
};

// Energy Particles for anime-style power effects
const EnergyParticle: React.FC<EnergyParticleProps> = ({ x, y, color, size, duration, delay }) => {
  return (
    <motion.div
      className="absolute rounded-full z-0"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        opacity: 0,
      }}
      animate={{
        y: [0, -100 - Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 100],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1.5, 0.2],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeOut',
        delay: delay,
      }}
    />
  );
};

// Main Background Component
const PirateBackground: React.FC<PirateBackgroundProps> = ({
  starCount = 50,
  cloudCount = 5,
  showClouds = true,
  showStars = true,
  showWaves = true,
  showEnergyParticles = false,
  theme = 'default',
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const [clouds, setClouds] = useState<CloudProps[]>([]);
  const [energyParticles, setEnergyParticles] = useState<EnergyParticleProps[]>([]);

  // Generate energy particle color based on theme
  const getThemeColor = (): string => {
    switch (theme) {
      case 'luffy': return 'rgba(239, 68, 68, 0.8)'; // Red for Luffy
      case 'zoro': return 'rgba(34, 197, 94, 0.8)'; // Green for Zoro
      case 'sanji': return 'rgba(234, 179, 8, 0.8)'; // Yellow for Sanji
      default: return 'rgba(59, 130, 246, 0.8)'; // Blue for default
    }
  };

  useEffect(() => {
    // Generate stars with special ones and theme-based colors
    const generatedStars = Array.from({ length: starCount }, (_, i) => {
      const blinking = Math.random() > 0.6;
      const isSpecial = Math.random() > 0.95; // 5% chance of a special star
      
      // Theme-based star color for some stars
      let starColor = 'white';
      if (Math.random() > 0.85 && theme !== 'default') {
        starColor = theme === 'luffy' ? 'rgba(239, 68, 68, 0.9)' :
                   theme === 'zoro' ? 'rgba(34, 197, 94, 0.9)' :
                   'rgba(234, 179, 8, 0.9)';
      }
      
      return {
        x: Math.random() * 100,
        y: Math.random() * 60, // Only in the top 60% of the screen
        size: isSpecial ? 2 + Math.random() * 3 : 1 + Math.random() * 2,
        opacity: isSpecial ? 0.7 + Math.random() * 0.3 : 0.1 + Math.random() * 0.7,
        blinking,
        color: starColor,
        isSpecial,
      };
    });
    setStars(generatedStars);

    // Generate clouds with anime variants
    const generatedClouds = Array.from({ length: cloudCount }, (_, i) => {
      const isAnimeCloud = Math.random() > 0.5; // 50% chance of anime-style cloud
      
      return {
        x: Math.random() * -20 - 20, // Start off-screen to the left
        y: Math.random() * 30, // Only in the top 30% of the screen
        scale: 0.5 + Math.random() * 1.5,
        opacity: 0.4 + Math.random() * 0.3,
        speed: 80 + Math.random() * 120, // Duration in seconds to cross the screen
        variant: isAnimeCloud ? 'anime' as const : 'normal' as const,
      };
    });
    setClouds(generatedClouds);
    
    // Generate energy particles if enabled
    if (showEnergyParticles) {
      const particles = Array.from({ length: 15 }, (_, i) => {
        return {
          x: Math.random() * 100,
          y: 100 + Math.random() * 20, // Start from bottom of screen
          color: getThemeColor(),
          size: 1 + Math.random() * 3,
          duration: 3 + Math.random() * 4,
          delay: Math.random() * 5,
        };
      });
      setEnergyParticles(particles);
    }
  }, [starCount, cloudCount, showEnergyParticles, theme]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      {/* Background map texture - very subtle */}
      <div className="map-bg" />
      
      {/* Star field with enhanced anime-style stars */}
      {showStars && (
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <Star key={i} {...star} />
          ))}
        </div>
      )}
      
      {/* Clouds with anime variants */}
      {showClouds && (
        <div className="absolute inset-0 overflow-hidden">
          {clouds.map((cloud, i) => (
            <Cloud key={i} {...cloud} />
          ))}
        </div>
      )}
      
      {/* Ocean waves with theme colors */}
      {showWaves && <OceanWaves theme={theme} />}
      
      {/* Energy particles rising from bottom - anime power effect */}
      {showEnergyParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {energyParticles.map((particle, i) => (
            <EnergyParticle key={i} {...particle} />
          ))}
        </div>
      )}
      
      {/* Theme-based radial gradient overlay for anime aesthetics */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: theme === 'default' ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' :
                     theme === 'luffy' ? 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 70%)' :
                     theme === 'zoro' ? 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)' :
                     'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
        }}
      />
      
      {/* Vignette effect around the edges - enhanced for anime */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background opacity-80" />
    </div>
  );
};

export default PirateBackground;