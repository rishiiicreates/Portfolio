import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/data';
import SkillCard from '@/components/ui/SkillCard';
import FloatingElement from '@/components/animation/FloatingElement';

interface SkillsSectionProps {
  sectionRef: (element: HTMLElement | null) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ sectionRef }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section relative min-h-screen flex items-center bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-6 py-20">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-6">
            <div className="w-10 h-1 bg-secondary mr-4"></div>
            <h2 className="text-xl text-secondary font-medium">My Abilities</h2>
            <div className="w-10 h-1 bg-secondary ml-4"></div>
          </motion.div>
          
          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-cinzel mb-6 text-glow"
          >
            Developer <span className="text-secondary">Haki</span> Powers
          </motion.h3>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-light/70"
          >
            Like the specialized skills in the world of One Piece, these are my technical abilities that I've mastered over years of practice and continuous learning.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      {/* Decorative 3D elements */}
      <FloatingElement className="absolute bottom-1/4 left-10 opacity-30" delay={0.3}>
        <div className="w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
      </FloatingElement>
    </section>
  );
};

export default SkillsSection;
