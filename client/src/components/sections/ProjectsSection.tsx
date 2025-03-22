import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data';
import ProjectCard from '@/components/ui/ProjectCard';
import FloatingElement from '@/components/animation/FloatingElement';
import RotatingElement from '@/components/animation/RotatingElement';

interface ProjectsSectionProps {
  sectionRef: (element: HTMLElement | null) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef }) => {
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
      id="projects" 
      ref={sectionRef}
      className="section relative min-h-screen flex items-center"
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
            <h2 className="text-xl text-secondary font-medium">Featured Work</h2>
            <div className="w-10 h-1 bg-secondary ml-4"></div>
          </motion.div>
          
          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-cinzel mb-6 text-glow"
          >
            My <span className="text-secondary">Treasure</span> Collection
          </motion.h3>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-light/70"
          >
            Explore my most valuable projects, each representing a different adventure and challenge conquered along my journey.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      {/* Decorative 3D elements */}
      <RotatingElement className="absolute top-1/3 left-10 opacity-20">
        <div className="w-40 h-40 bg-secondary/20 rounded-full blur-xl"></div>
      </RotatingElement>
      
      <FloatingElement className="absolute bottom-1/4 right-10 opacity-30" delay={0.4}>
        <div className="w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
      </FloatingElement>
    </section>
  );
};

export default ProjectsSection;
