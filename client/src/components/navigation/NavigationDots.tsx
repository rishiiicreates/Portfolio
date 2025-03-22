import React from 'react';
import { motion } from 'framer-motion';
import { SectionName } from '@/types';

interface NavigationDotsProps {
  activeSection: SectionName;
  setActiveSection: (section: SectionName) => void;
}

const sectionIcons: Record<SectionName, string> = {
  hero: 'ri-home-4-line',
  about: 'ri-user-3-line',
  skills: 'ri-tools-line',
  projects: 'ri-code-box-line',
  contact: 'ri-mail-send-line'
};

const sectionNames: Record<SectionName, string> = {
  hero: 'Home',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  contact: 'Contact'
};

const NavigationDots: React.FC<NavigationDotsProps> = ({ activeSection, setActiveSection }) => {
  const sections: SectionName[] = ['hero', 'about', 'skills', 'projects', 'contact'];

  const handleClick = (section: SectionName) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex flex-col items-center">
      <div className="py-4 px-2 bg-background/80 backdrop-blur-md border border-secondary/10 rounded-full flex flex-col items-center gap-6">
        {sections.map((section) => (
          <motion.button
            key={section}
            onClick={() => handleClick(section)}
            className={`relative group flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-secondary/20 text-secondary' 
                : 'bg-transparent text-light/50 hover:text-secondary/80'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Navigate to ${section} section`}
          >
            <i className={`${sectionIcons[section]} text-lg`}></i>
            
            {/* Tooltip */}
            <div className="absolute right-14 origin-right scale-0 group-hover:scale-100 transition-transform duration-200 bg-background border border-secondary/20 py-1 px-3 rounded-md text-xs whitespace-nowrap">
              {sectionNames[section]}
            </div>
            
            {/* Active indicator */}
            {activeSection === section && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-secondary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute -right-1 w-1.5 h-6 bg-secondary rounded-l-md"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Social links at bottom of navigation */}
      <div className="mt-8 flex flex-col gap-4 items-center">
        <motion.a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-8 w-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-secondary/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="ri-github-fill"></i>
        </motion.a>
        
        <motion.a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-8 w-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-secondary/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="ri-linkedin-fill"></i>
        </motion.a>
        
        <motion.a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-8 w-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-secondary/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="ri-twitter-x-fill"></i>
        </motion.a>
      </div>
    </div>
  );
};

export default NavigationDots;
