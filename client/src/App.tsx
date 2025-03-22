import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { AnimatePresence, motion } from "framer-motion";
import ChatWidget from "@/components/chat/ChatWidget";
import PirateBackground from "@/components/background/PirateBackground";
import { ScrollProgress } from "@/components/ui/scroll-progress";

function Router() {
  // Save scroll position when navigating
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setLocation(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  // Custom cursor state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  
  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    
    const handleMouseLeave = () => {
      setCursorVisible(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* One Piece themed animated background with anime aesthetics */}
      <PirateBackground 
        starCount={70} 
        cloudCount={6} 
        showWaves={true} 
        showEnergyParticles={true} 
        theme="luffy" 
      />
      
      {/* Main content */}
      <Router />
      
      {/* Chat feature with pirate theme */}
      <ChatWidget />
      
      {/* Pirate compass log pose scroll indicator */}
      <ScrollProgress variant="logpose" color="secondary" showPercentage={false} />
      
      {/* Anime-styled cursor effect - follows mouse with energy trail */}
      <AnimatePresence>
        {cursorVisible && (
          <>
            {/* Main cursor */}
            <motion.div
              className="fixed pointer-events-none z-50 w-7 h-7 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                rotate: [0, 45, 0, -45, 0],
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <div className="absolute inset-0">
                <svg viewBox="0 0 24 24" fill="rgba(239, 68, 68, 0.7)" stroke="white" strokeWidth="1">
                  <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
                </svg>
                
                {/* Anime-style pulsing glow */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.7)",
                    opacity: 0.7,
                  }}
                  animate={{ 
                    opacity: [0.7, 0.3, 0.7],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Trailing effect */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed pointer-events-none z-40 w-3 h-3 rounded-full"
                style={{
                  left: cursorPosition.x,
                  top: cursorPosition.y,
                  backgroundColor: 'rgba(239, 68, 68, 0.3)',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1 - (i * 0.15),
                  opacity: 0.8 - (i * 0.15),
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Toast notifications */}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
