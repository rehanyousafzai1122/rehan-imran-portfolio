export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Interactive Web' | 'Creative Development' | 'UI / UX' | 'AI & Automation';
  status?: 'COMPLETE' | 'IN PROGRESS' | 'CONCEPT' | 'ONGOING' | 'IN DEVELOPMENT';
  year: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  previewType: string;
  accentColor: string;
  highlights: string[];
}

export interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  previewTitle: string;
  previewSubtitle: string;
  previewAccent: string;
  previewIconName: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export type WorkFilter = 'ALL' | 'INTERACTIVE WEB' | 'AI & AUTOMATION' | 'UI/UX' | 'CREATIVE DEVELOPMENT';

export interface ContactFormData {
  name: string;
  email: string;
  services: string[];
  budget: string;
  message: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  origin: string;
  location: string;
  phone: string;
  phoneFormatted: string;
  timezone: string;
  email: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  linkedinHandle: string;
  portfolio: string;
  availability: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutHeadline: string;
  aboutIntro: string;
  aboutPhilosophy: string;
  avatarPortrait: string;
  studioScene: string;
  videoIntroUrl?: string;
  videoIntroSpeechText?: string;
  education?: {
    degree: string;
    institute: string;
    program: string;
    details: string;
  };
  languages?: Array<{ name: string; level: string }>;
}

export interface AdminDataBackup {
  version: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  projects: Project[];
}

