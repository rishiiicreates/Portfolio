import React, { useRef } from 'react';
import { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import useActiveSection from '@/lib/hooks/useActiveSection';
import { SectionRef } from '@/types';

// Lazy load heavy components - commented out since we're using PirateBackground now
// const Background3D = lazy(() => import('@/components/canvas/Background3D'));

// Import sections
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

// Import navigation components
import NavigationDots from '@/components/navigation/NavigationDots';
import MobileNavigation from '@/components/navigation/MobileNavigation';
import PirateNavigation from '@/components/navigation/PirateNavigation';

// Import pirate themed UI components
import { SectionDivider } from '@/components/ui/section-divider';

const Home: React.FC = () => {
  // Create refs for all sections
  const sectionRefs = useRef<SectionRef>({
    hero: null,
    about: null,
    skills: null,
    projects: null,
    contact: null
  });
  
  // Use the custom hook to track active section
  const { activeSection, setActiveSection } = useActiveSection(sectionRefs, 'hero');

  // Load animation when component mounts
  useEffect(() => {
    document.body.classList.add('bg-background');
    
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-x-hidden"
    >
      {/* Using the PirateBackground set in App.tsx instead of Background3D */}
      {/* <Suspense fallback={<div className="canvas-container bg-background"></div>}>
        <Background3D />
      </Suspense> */}
      
      {/* Navigation Components */}
      <PirateNavigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <NavigationDots 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <MobileNavigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection sectionRef={(el) => (sectionRefs.current.hero = el)} />
        
        {/* Wave pattern divider */}
        <SectionDivider variant="wave" color="secondary" />
        
        {/* About Section */}
        <AboutSection sectionRef={(el) => (sectionRefs.current.about = el)} />
        
        {/* Compass divider */}
        <SectionDivider variant="compass" color="primary" />
        
        {/* Skills Section */}
        <SkillsSection sectionRef={(el) => (sectionRefs.current.skills = el)} />
        
        {/* Rope divider */}
        <SectionDivider variant="rope" />
        
        {/* Projects Section */}
        <ProjectsSection sectionRef={(el) => (sectionRefs.current.projects = el)} />
        
        {/* Wave pattern divider */}
        <SectionDivider variant="wave" color="accent" />
        
        {/* Contact Section */}
        <ContactSection sectionRef={(el) => (sectionRefs.current.contact = el)} />
        
        {/* Footer */}
        <Footer />
      </main>
    </motion.div>
  );
};

export default Home;
