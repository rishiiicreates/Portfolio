import React, { useState } from "react";
import { motion } from "framer-motion";
import { PirateButton } from "@/components/ui/pirate-button";
import { ContactForm } from "@/types";
import { useToast } from "@/hooks/use-toast";
import FloatingElement from "@/components/animation/FloatingElement";
import { apiRequest } from "@/lib/queryClient";

interface ContactSectionProps {
  sectionRef: (element: HTMLElement | null) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Error",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app this would submit to an API
      // await apiRequest('POST', '/api/contact', formData);

      // For now, just simulate a success response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section relative min-h-screen flex items-center bg-background/50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
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
              <h2 className="text-xl text-secondary font-medium">
                Get In Touch
              </h2>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold font-cinzel mb-6 text-glow"
            >
              Send a <span className="text-secondary">Message</span> in a Bottle
            </motion.h3>

            <motion.p variants={itemVariants} className="mb-8 text-light/70">
              Have a project in mind or want to collaborate? Send me a message
              and I'll get back to you as soon as possible.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                  <i className="ri-map-pin-line text-xl text-secondary"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Location</h4>
                  <p className="text-light/70">Grand Line, East Blue</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                  <i className="ri-mail-line text-xl text-secondary"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className="text-light/70">rishiicreates@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                  <i className="ri-phone-line text-xl text-secondary"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <p className="text-light/70">+91 8960548709</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                  <i className="ri-time-line text-xl text-secondary"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Working Hours</h4>
                  <p className="text-light/70">Mon-Fri: 9AM - 6PM</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <a
                href="https://github.com/rishiiicreates"
                className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-colors hover:bg-primary/40"
              >
                <i className="ri-github-fill text-xl text-light"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/rishii-creates-627a58301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-colors hover:bg-primary/40"
              >
                <i className="ri-linkedin-fill text-xl text-light"></i>
              </a>
              <a
                href="https://x.com/rishiicreates?s=21"
                className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-colors hover:bg-primary/40"
              >
                <i className="ri-twitter-fill text-xl text-light"></i>
              </a>
              <a
                href="https://www.instagram.com/rishiicreate/profilecard/?igsh=MWc0eW1senduNnVocQ=="
                className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-colors hover:bg-primary/40"
              >
                <i className="ri-instagram-fill text-xl text-light"></i>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="scene"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <form
              className="bg-background/50 backdrop-blur-md border border-light/10 rounded-2xl p-8"
              onSubmit={handleFormSubmit}
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-light mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-background/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-light mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-background/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-light mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-background/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Enter subject"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-light mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-background/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors resize-none"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <PirateButton
                type="submit"
                variant="primary"
                className="w-full px-6 py-3 rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </PirateButton>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Decorative 3D elements */}
      <FloatingElement
        className="absolute bottom-1/3 right-10 opacity-20"
        delay={0.2}
      >
        <div className="w-60 h-60 bg-secondary/20 rounded-full blur-xl"></div>
      </FloatingElement>
    </section>
  );
};

export default ContactSection;
