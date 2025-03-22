import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { navigationLinks } from '@/data';
import { SectionName } from '@/types';
import { PirateButton } from '@/components/ui/pirate-button';
import { PirateBadge } from '@/components/ui/pirate-badge';

interface PirateNavigationProps {
  activeSection: SectionName;
  setActiveSection: (section: SectionName) => void;
}

const PirateNavigation = ({ activeSection, setActiveSection }: PirateNavigationProps) => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const handleLinkClick = (section: SectionName) => {
    setActiveSection(section);
    const targetElement = document.getElementById(section);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Transform navigation position based on scroll
  const navBarVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 }
  };

  return (
    <AnimatePresence>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4"
        variants={navBarVariants}
        animate={showNav ? 'visible' : 'hidden'}
        initial="visible"
        transition={{ duration: 0.3 }}
      >
        {/* Main navigation container with One Piece styling */}
        <div className="relative max-w-7xl mx-auto flex justify-between items-center">
          {/* Wave pattern at the bottom of the nav */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-light/5">
            <motion.div 
              className="h-full bg-secondary/30"
              style={{
                clipPath: 'polygon(0% 100%, 4% 0%, 8% 100%, 12% 0%, 16% 100%, 20% 0%, 24% 100%, 28% 0%, 32% 100%, 36% 0%, 40% 100%, 44% 0%, 48% 100%, 52% 0%, 56% 100%, 60% 0%, 64% 100%, 68% 0%, 72% 100%, 76% 0%, 80% 100%, 84% 0%, 88% 100%, 92% 0%, 96% 100%, 100% 0%, 100% 100%)'
              }}
              animate={{ x: [0, 20, 0] }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </div>
          
          {/* Logo/Brand */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/">
              <a className="text-secondary font-bold text-xl font-cinzel flex items-center gap-2">
                <span className="text-2xl">⚓</span>
                <span className="text-glow">VOYAGE</span>
                <PirateBadge variant="bounty" size="sm" className="ml-2" showWaves={true}>
                  Portfolio
                </PirateBadge>
              </a>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationLinks.map((link) => (
              <motion.div 
                key={link.section}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === link.section
                      ? 'text-secondary'
                      : 'text-light/70 hover:text-light'
                  }`}
                  onClick={() => handleLinkClick(link.section as SectionName)}
                >
                  {link.title}
                  
                  {/* Active indicator that looks like a pirate map marker */}
                  {activeSection === link.section && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-2 h-2 bg-secondary rounded-full"
                      layoutId="navIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ x: '-50%', y: '8px' }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
            
            {/* Contact button with pirate styling */}
            <PirateButton 
              variant="strawhats" 
              size="sm" 
              onClick={() => handleLinkClick('contact')}
              leftIcon={<span className="text-xs">✉️</span>}
            >
              Contact
            </PirateButton>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <PirateButton
              variant="jollyroger"
              size="sm"
              aria-label="Open Menu"
              onClick={() => {}}
            >
              <span className="sr-only">Menu</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </PirateButton>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default PirateNavigation;