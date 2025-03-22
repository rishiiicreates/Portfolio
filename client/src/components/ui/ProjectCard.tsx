import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for the 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Create spring animations
  const rotateX = useSpring(useTransform(y, [-100, 100], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-7, 7]), { stiffness: 300, damping: 30 });
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 500, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      ref={cardRef}
      className="project-card group relative bg-background/20 backdrop-blur-md border border-secondary/10 rounded-2xl overflow-hidden shadow-lg shadow-background/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: 'easeOut' 
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        rotateX,
        rotateY,
        scale,
        z: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Shiny overlay effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10 pointer-events-none"
        animate={{
          backgroundPosition: isHovered ? ['200% 100%', '-50% 100%'] : '200% 100%'
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror'
        }}
        style={{
          backgroundSize: '200% 100%'
        }}
      />
      
      <div className="relative h-56 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          style={{ 
            transformStyle: 'preserve-3d', 
            translateZ: 30
          }}
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        
        {/* Floating badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[90%]">
          <span className="bg-secondary/80 backdrop-blur-sm text-background px-2 py-1 rounded text-xs font-medium">
            Featured
          </span>
          
          <span className="bg-primary/20 backdrop-blur-sm text-light px-2 py-1 rounded text-xs font-medium border border-primary/30">
            {project.tags[0]}
          </span>
        </div>
      </div>
      
      <div className="p-6 relative">
        {/* Decorative lines */}
        <div className="absolute left-0 top-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
        
        <motion.h4 
          className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors duration-200"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h4>
        
        <p className="text-light/70 mb-5 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(1, 4).map((tag, tagIndex) => (
            <motion.span 
              key={tagIndex} 
              className="px-2 py-1 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-md text-xs font-medium text-light/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05 + tagIndex * 0.05 + 0.2,
                duration: 0.3
              }}
              whileHover={{
                backgroundColor: "rgba(226, 192, 68, 0.15)",
                borderColor: "rgba(226, 192, 68, 0.3)",
                color: "#E2C044",
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <motion.a 
            href={project.projectLink} 
            className="text-secondary flex items-center group/link"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span>View Demo</span>
            <motion.i 
              className="ri-arrow-right-up-line ml-1" 
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            ></motion.i>
          </motion.a>
          
          <div className="flex gap-3">
            <motion.a 
              href={project.githubLink} 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-background/50 border border-light/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <i className="ri-github-fill text-lg"></i>
            </motion.a>
            
            <motion.button 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-background/50 border border-light/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <i className="ri-share-line text-lg"></i>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Bottom shine effect on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary/80 to-primary/50"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </motion.div>
  );
};

export default ProjectCard;
