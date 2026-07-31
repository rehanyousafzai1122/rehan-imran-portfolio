/**
 * Single source of truth for all portfolio content.
 * Edit this file to personalise the site — components read from here.
 */

import voiceosImg from "@/assets/project-voiceos.jpg";
import techEducatorsImg from "@/assets/project-tech-educators.png";
import waBotImg from "@/assets/project-wa-bot.jpg";
import diaryImg from "@/assets/project-diary.png";
import chineseImg from "@/assets/project-chinese.png";
import yeoboImg from "@/assets/project-yeobo-ai.jpg";

export const profile = {
  name: "Rehan Imran",
  role: "AI & Full Stack Developer • Web Engineering • Automation",
  tagline: "I build AI-powered products and full stack websites that clients trust.",
  intro:
    "I design, build and ship production web applications end to end — fast, accessible front ends, solid Node.js back ends, and AI automations that remove hours of manual work. From landing pages that convert to voice assistants and WhatsApp bots, I deliver work that is reliable, measurable and easy to hand over.",
  email: "rehanyousafzai1122@gmail.com",
  github: "https://github.com/rehanyousafzai1122",
  linkedin: "https://www.linkedin.com/in/rehan-imran-1705a141a/",
  instagram: "https://www.instagram.com/rehaninsights/",
  whatsapp: "https://wa.me/923195590756",
  location: "Pakistan • Available worldwide (remote)",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "The craft layer — structure, style and interaction.",
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Learning",
    blurb: "What I'm actively levelling up right now.",
    items: ["React", "Node.js"],
  },
  {
    title: "SEO",
    blurb: "Making sure the work actually gets found.",
    items: ["Local SEO", "Technical SEO"],
  },
  {
    title: "AI",
    blurb: "Tools I use to design, build and automate faster.",
    items: ["ChatGPT", "Claude", "Lovable", "n8n"],
  },
  {
    title: "Tools",
    blurb: "Daily drivers for shipping and collaborating.",
    items: ["GitHub", "VS Code", "Firebase"],
  },
];

export type Project = {
  title: string;
  date: string;
  description: string;
  stack: string[];
  image: string;
  /** Only set when a real, public URL exists — otherwise the button stays hidden. */
  demo?: string;
  repo?: string;
  status?: "live" | "in-development";
};

export const projects: Project[] = [
  {
    title: "VoiceOS Pakistan – AI Voice Assistant",
    date: "Jul 2026 – Present",
    description:
      "A voice-first AI assistant for Pakistan that completes everyday tasks through natural conversation in Urdu, English and Roman Urdu — reminders, study plans, document summarisation, WhatsApp message drafting and productivity tools.",
    stack: ["AI", "Voice AI", "JavaScript", "Node.js", "LLMs"],
    image: voiceosImg,
    status: "in-development",
  },
  {
    title: "Tech Educators — Online Coding Academy",
    date: "May 2026 – Present",
    description:
      "Founded and built a complete online coding academy: modern landing page, WhatsApp enrolment system, Google Sheets & Apps Script backend, SEO optimisation, Netlify deployment and live online classes.",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "Google Apps Script", "SEO", "Netlify"],
    image: techEducatorsImg,
    demo: "https://tech-educators-leads.netlify.app/",
    status: "live",
  },
  {
    title: "WhatsApp AI Bot (Node.js + Gemini AI)",
    date: "Apr 2026 – Present",
    description:
      "An automated WhatsApp bot built with Node.js, Baileys and Google Gemini AI — AI chat, sticker generation, media downloading, group management and beginner-friendly deployment.",
    stack: ["Node.js", "Gemini AI", "Baileys", "JavaScript"],
    image: waBotImg,
    status: "live",
  },
  {
    title: "Ek Chhupi Hui Diary – Interactive Storytelling",
    date: "Apr 2026",
    description:
      "An immersive storytelling experience with cinematic UI, elegant typography, smooth animations, responsive layouts, music integration and emotional reading interactions.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: diaryImg,
    demo: "https://the-mospainfull.netlify.app/",
    status: "live",
  },
  {
    title: "Learning Chinese Platform",
    date: "Feb 2026",
    description:
      "A responsive learning platform for beginners with structured lessons, vocabulary practice, quizzes, pronunciation guides and a clean modern UI.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: chineseImg,
    demo: "https://hanzi-chinese.netlify.app/",
    status: "live",
  },
  {
    title: "Fantastic Yeobo – Cinematic Web Experience",
    date: "Jul 2026",
    description:
      "An anime-inspired cinematic web experience with a dark futuristic UI, rich animations, background music, custom imagery and video, and interactive frontend effects.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    image: yeoboImg,
    demo: "https://fantastic-yeobo.netlify.app/",
    status: "live",
  },
];

export type JourneyStep = {
  period: string;
  title: string;
  description: string;
};

export const journey: JourneyStep[] = [
  {
    period: "The start",
    title: "First lines of HTML & CSS",
    description:
      "Rebuilt pages I liked, pixel by pixel, until layout and the box model finally clicked. That habit of copying-then-understanding still shapes how I learn.",
  },
  {
    period: "Next",
    title: "JavaScript and real interactivity",
    description:
      "Moved from static pages to DOM logic, forms and API calls — the moment a page started responding to people, everything got interesting.",
  },
  {
    period: "Then",
    title: "Client work & SEO",
    description:
      "Shipped my first paid business website and learned that a beautiful site nobody can find is a hobby project. Local and technical SEO became part of the build.",
  },
  {
    period: "Now",
    title: "AI automation & React",
    description:
      "Building n8n workflows and LLM-assisted tools, while going deeper into React, Node.js and Firebase to build full products end to end.",
  },
  {
    period: "Next up",
    title: "Full-stack products",
    description:
      "Turning the School Management System into a real deployed product, and continuing to blend clean engineering with practical AI.",
  },
];
