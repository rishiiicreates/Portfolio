import React from "react";
import { motion } from "framer-motion";
import FloatingElement from "@/components/animation/FloatingElement";
import { PirateButton } from "@/components/ui/pirate-button";

interface AboutSectionProps {
  sectionRef: (element: HTMLElement | null) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ sectionRef }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section relative min-h-screen flex items-center bg-dark/50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="relative w-full h-80 md:h-96">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/40 to-dark border border-light/10 overflow-hidden">
                {/* Map-like texture inside the card */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] opacity-10"></div>

                {/* Character silhouette */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-40 h-72 bg-light/5 rounded-full blur-md"></div>
                </div>

                {/* Straw hat icon */}
                <FloatingElement className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-6 bg-secondary/80 rounded-full"></div>
                </FloatingElement>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center mb-6"
            >
              <div className="w-10 h-1 bg-secondary mr-4"></div>
              <h2 className="text-xl text-secondary font-medium">About Me</h2>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold font-cinzel mb-6 text-glow"
            >
              Seeking My Own <span className="text-secondary">One Piece</span>
            </motion.h3>

            <motion.p variants={itemVariants} className="mb-6 text-light/70">
              Just as Luffy is on a journey to find the ultimate treasure, I'm
              on a quest to create exceptional digital experiences. With over 5
              years of experience in web development and UI/UX design, I combine
              technical expertise with creative innovation.
            </motion.p>

            <motion.p variants={itemVariants} className="mb-8 text-light/70">
              I specialize in building immersive 3D websites, interactive
              applications, and responsive interfaces that engage users and
              deliver results. My approach blends cutting-edge technology with
              thoughtful design to create memorable digital experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 mb-8"
            >
              <div>
                <h4 className="text-secondary font-medium mb-2">Name</h4>
                <p className="text-light/70">Hrishikesh</p>
              </div>
              <div>
                <h4 className="text-secondary font-medium mb-2">Email</h4>
                <p className="text-light/70">rishiicreates@gmail.com</p>
              </div>
              <div>
                <h4 className="text-secondary font-medium mb-2">Location</h4>
                <p className="text-light/70">Grand Line, East Blue</p>
              </div>
              <div>
                <h4 className="text-secondary font-medium mb-2">
                  Availability
                </h4>
                <p className="text-light/70">Freelance & Full-time</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <PirateButton
                href="#contact"
                variant="primary"
                rightIcon={<i className="ri-arrow-right-line"></i>}
              >
                Let's Talk
              </PirateButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative 3D elements */}
      <FloatingElement
        className="absolute top-1/3 right-0 opacity-20"
        delay={0.5}
      >
        <div className="w-60 h-60 bg-primary/30 rounded-full blur-xl"></div>
      </FloatingElement>
    </section>
  );
};

export default AboutSection;
