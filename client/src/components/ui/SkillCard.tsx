import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="skill-card group relative bg-background/30 backdrop-blur-md border border-secondary/10 rounded-2xl p-8 transition-all overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: 'easeOut' 
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-background/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      ></motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-xl flex items-center justify-center mr-4 shadow-inner shadow-secondary/5">
            <i className={`${skill.icon} text-2xl text-secondary`}></i>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-secondary/20 to-transparent"></div>
        </div>
        
        <motion.h4 
          className="text-xl font-bold mb-3 text-white group-hover:text-secondary transition-colors duration-300 flex items-center"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {skill.title}
          <motion.i 
            className="ri-arrow-right-line ml-2 opacity-0 group-hover:opacity-100 transition-opacity" 
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          ></motion.i>
        </motion.h4>
        
        <p className="text-light/70 mb-6 leading-relaxed">
          {skill.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag, tagIndex) => (
            <motion.span 
              key={tagIndex} 
              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-light/80 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(226, 192, 68, 0.15)",
                borderColor: "rgba(226, 192, 68, 0.3)",
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1 + tagIndex * 0.05 + 0.2,
                duration: 0.3
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary/50 to-primary/30"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      
      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute transform rotate-45 bg-secondary/20 text-background/80 font-medium text-xs py-1 text-center w-[120%] top-[20%] right-[-40%]">
          Haki
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
