export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  projectLink: string;
  githubLink: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SectionRef {
  hero: HTMLElement | null;
  about: HTMLElement | null;
  skills: HTMLElement | null;
  projects: HTMLElement | null;
  contact: HTMLElement | null;
}

export type SectionName = keyof SectionRef;
