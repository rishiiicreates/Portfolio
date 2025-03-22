import { Project, Skill } from "@/types";

export const skills: Skill[] = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with modern frameworks and libraries.",
    icon: "ri-code-s-slash-line",
    tags: ["React", "Three.js", "Framer Motion"]
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing interfaces that enhance user experience.",
    icon: "ri-layout-4-line",
    tags: ["Figma", "Adobe XD", "Prototyping"]
  },
  {
    id: 3,
    title: "3D Web Development",
    description: "Implementing immersive 3D experiences for the web using WebGL technologies.",
    icon: "ri-3d-cube-sphere-line",
    tags: ["Three.js", "React Three Fiber", "WebGL"]
  },
  {
    id: 4,
    title: "Backend Development",
    description: "Building robust server-side applications and APIs to power web applications.",
    icon: "ri-server-line",
    tags: ["Node.js", "Express", "MongoDB"]
  },
  {
    id: 5,
    title: "Animation & Motion",
    description: "Creating fluid animations and transitions to bring interfaces to life.",
    icon: "ri-animation-line",
    tags: ["GSAP", "Framer Motion", "CSS Animations"]
  },
  {
    id: 6,
    title: "DevOps & Deployment",
    description: "Streamlining development processes and deploying applications efficiently.",
    icon: "ri-tools-line",
    tags: ["Git", "Docker", "CI/CD"]
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "3D Interactive Museum",
    description: "A virtual museum experience with interactive 3D models and immersive navigation.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    tags: ["Three.js", "React", "GSAP"],
    projectLink: "#",
    githubLink: "#"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with 3D product previews and animations.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    tags: ["React", "Node.js", "Three.js"],
    projectLink: "#",
    githubLink: "#"
  },
  {
    id: 3,
    title: "3D Island Explorer",
    description: "An interactive 3D island exploration experience inspired by One Piece.",
    image: "https://images.unsplash.com/photo-1616499370260-485b3e5ed3bc",
    tags: ["React Three Fiber", "Drei", "Framer Motion"],
    projectLink: "#",
    githubLink: "#"
  },
  {
    id: 4,
    title: "Portfolio Dashboard",
    description: "A dynamic dashboard for tracking and visualizing investment portfolios.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    tags: ["React", "D3.js", "Firebase"],
    projectLink: "#",
    githubLink: "#"
  },
  {
    id: 5,
    title: "Weather Navigator",
    description: "A 3D weather application with immersive visualizations and animations.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    tags: ["React", "Three.js", "Weather API"],
    projectLink: "#",
    githubLink: "#"
  },
  {
    id: 6,
    title: "Adventure Logger",
    description: "A mobile app for tracking and sharing adventures with interactive maps.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    tags: ["React Native", "Firebase", "Maps API"],
    projectLink: "#", 
    githubLink: "#"
  }
];

export const navigationLinks = [
  { title: "Home", section: "hero" },
  { title: "About", section: "about" },
  { title: "Skills", section: "skills" },
  { title: "Projects", section: "projects" },
  { title: "Contact", section: "contact" }
];
