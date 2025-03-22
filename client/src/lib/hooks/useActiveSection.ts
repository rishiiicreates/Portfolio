import { useState, useEffect, RefObject } from 'react';
import { SectionName, SectionRef } from '@/types';

export const useActiveSection = (
  sectionRefs: RefObject<SectionRef>,
  defaultActive: SectionName = 'hero'
) => {
  const [activeSection, setActiveSection] = useState<SectionName>(defaultActive);

  useEffect(() => {
    if (!sectionRefs.current) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      Object.entries(sectionRefs.current || {}).forEach(([section, ref]) => {
        if (!ref) return;
        
        const offsetTop = ref.offsetTop;
        const offsetHeight = ref.offsetHeight;

        if (
          scrollPosition >= offsetTop && 
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section as SectionName);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  return { activeSection, setActiveSection };
};

export default useActiveSection;
