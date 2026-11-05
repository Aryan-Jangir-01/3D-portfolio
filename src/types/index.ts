export type ThemeMode = 'neon' | 'cyberpunk' | 'matrix' | 'synthwave' | 'obsidian';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Full-Stack' | 'AI / ML' | 'Systems / Web3' | 'Frontend' | 'Mobile';
  tags: string[];
  features: string[];
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    icon?: string;
    description?: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Open Source' | 'Freelance' | 'Education';
  description: string[];
  technologies: string[];
  link?: string;
}

export interface PortfolioData {
  name: string;
  handle: string;
  title: string;
  roles: string[];
  location: string;
  timezone: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  bio: string;
  aboutHighlights: {
    label: string;
    value: string;
    subtext: string;
    icon: string;
  }[];
  philosophies: string[];
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  testimonials?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }[];
}
