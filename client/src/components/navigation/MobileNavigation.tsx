import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationLinks } from '@/data';
import { SectionName } from '@/types';

interface MobileNavigationProps {
  activeSection: SectionName;
  setActiveSection: (section: SectionName) => void;
}

const sectionIcons: Record<string, string> = {
  hero: 'ri-home-4-line',
  about: 'ri-user-3-line',
  skills: 'ri-tools-line',
  projects: 'ri-code-box-line',
  contact: 'ri-mail-send-line'
};

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (section: SectionName) => {
    setActiveSection(section);
    setIsOpen(false);
    
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Menu variants for animations
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Individual item variants
  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  // Overlay variants
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  // Button variants
  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0px 0px 0px rgba(226, 192, 68, 0)" 
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0px 0px 8px rgba(226, 192, 68, 0.3)" 
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.div 
        className="fixed top-6 right-6 z-50 md:hidden"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <motion.button 
          className={`p-3 rounded-full backdrop-blur-md border ${
            isOpen 
              ? "bg-background/90 border-secondary/40 text-secondary" 
              : "bg-background/80 border-light/10 text-light"
          } transition-colors duration-300`}
          onClick={toggleMenu}
        >
          <i className={`${isOpen ? 'ri-close-line' : 'ri-menu-4-line'} text-xl`}></i>
        </motion.button>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div 
              className="fixed inset-0 bg-background/60 backdrop-blur-md z-40 md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMenu}
            />
            
            {/* Main mobile menu */}
            <motion.div 
              className="fixed top-0 right-0 w-72 h-full bg-background/90 border-l border-secondary/10 backdrop-blur-md z-40 md:hidden flex flex-col"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {/* One Piece themed header */}
              <motion.div 
                className="p-6 border-b border-secondary/10 relative overflow-hidden"
                variants={itemVariants}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                <h3 className="text-xl font-bold mb-1 text-white relative z-10">Grand Line <span className="text-secondary">Navigation</span></h3>
                <p className="text-sm text-light/60 relative z-10">Sail through the portfolio sections</p>
              </motion.div>
              
              <nav className="p-6 flex-1">
                <motion.ul className="flex flex-col gap-4" variants={itemVariants}>
                  {navigationLinks.map((link) => {
                    const isActive = activeSection === link.section;
                    return (
                      <motion.li 
                        key={link.section} 
                        variants={itemVariants}
                        className="overflow-hidden"
                      >
                        <motion.a 
                          href={`#${link.section}`}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                            isActive 
                              ? "bg-secondary/10 text-secondary border-l-2 border-secondary" 
                              : "text-light/70 hover:bg-secondary/5 hover:text-secondary/80"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(link.section as SectionName);
                          }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <i className={`${sectionIcons[link.section]} text-lg ${isActive ? 'text-secondary' : 'text-light/50'}`}></i>
                          <span>{link.name}</span>
                          
                          {isActive && (
                            <motion.div 
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary"
                              layoutId="mobileNavIndicator"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </motion.a>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>
              
              {/* Social links */}
              <motion.div 
                className="p-6 border-t border-secondary/10 flex justify-around"
                variants={itemVariants}
              >
                <motion.a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 border border-secondary/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="ri-github-fill text-lg"></i>
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 border border-secondary/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="ri-linkedin-fill text-lg"></i>
                </motion.a>
                
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 border border-secondary/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="ri-twitter-x-fill text-lg"></i>
                </motion.a>
                
                <motion.a 
                  href="mailto:example@email.com"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 border border-secondary/10 text-light/60 hover:text-secondary hover:border-secondary/30 transition-colors"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="ri-mail-line text-lg"></i>
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;
