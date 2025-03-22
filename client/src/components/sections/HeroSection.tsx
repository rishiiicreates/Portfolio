import React from "react";
import { motion } from "framer-motion";
import JugglingText from "@/components/animation/JugglingText";
import FloatingElement from "@/components/animation/FloatingElement";
import RotatingElement from "@/components/animation/RotatingElement";
import { PirateButton } from "@/components/ui/pirate-button";

interface HeroSectionProps {
  sectionRef: (element: HTMLElement | null) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef }) => {
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 to-background opacity-80"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              className="bg-gradient-to-br from-secondary/20 to-primary/20 p-2 px-4 rounded-full mb-8 backdrop-blur-sm border border-secondary/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-secondary flex items-center">
                <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></span>
                Full Stack Developer
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-cinzel mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <span className="text-white block">Hi, </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary text-glow">
                Rishi here!
              </span>
            </motion.h1>

            <JugglingText
              text="Creative Developer UI/UX Designer Problem Solver"
              className="mb-6 text-xl md:text-2xl text-light/80 font-medium tracking-tight"
              highlightColor="#F59E0B"
              animationSpeed={0.5}
              animated={true}
            />

            <motion.p
              className="max-w-xl mb-10 text-light/70 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Embark on a creative journey through my portfolio. Discover
              projects crafted with passion and technical expertise, navigating
              the seas of modern web development with One Piece-inspired
              aesthetics.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <PirateButton
                href="#projects"
                variant="primary"
                rightIcon={<i className="ri-arrow-right-up-line"></i>}
                className="px-8 py-3 text-base"
              >
                View Projects
              </PirateButton>

              <PirateButton
                href="#contact"
                variant="outline"
                className="px-8 py-3 text-base"
                rightIcon={<i className="ri-send-plane-line"></i>}
              >
                Contact Me
              </PirateButton>
            </motion.div>

            <motion.div
              className="hidden lg:flex gap-8 mt-12 text-light/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="flex items-center gap-2">
                <i className="ri-code-s-slash-line"></i>
                <span>React-js/ts</span>
              </span>
              <span className="flex items-center gap-2">
                <i className="ri-braces-line"></i>
                <span>DSA</span>
              </span>
              <span className="flex items-center gap-2">
                <i className="ri-palette-line"></i>
                <span>App Dev</span>
              </span>
            </motion.div>
          </div>

          {/* Right content - decorative elements */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative h-[400px]">
            <FloatingElement className="absolute" duration={4} yOffset={15}>
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-secondary/30 to-accent/10 backdrop-blur-md border border-secondary/20 shadow-lg shadow-secondary/10"></div>
            </FloatingElement>

            <RotatingElement className="absolute top-20 left-20" duration={15}>
              <div className="w-32 h-32 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/10"></div>
            </RotatingElement>

            <RotatingElement
              className="absolute bottom-10 right-10"
              clockwise={false}
              duration={20}
            >
              <div className="w-24 h-24 rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/10"></div>
            </RotatingElement>

            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex items-center justify-center z-10"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/30 absolute"></div>
              <div className="w-3 h-3 bg-secondary rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.span
          className="text-light/50 text-sm mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll Down
        </motion.span>
        <motion.div
          className="w-5 h-10 border border-light/20 rounded-full flex justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-2 bg-secondary rounded-full"
            animate={{
              y: [0, 5, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
