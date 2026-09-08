import { useState, useEffect, useCallback } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { FullscreenMenu } from './components/FullscreenMenu';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { SkillsOrbit } from './components/SkillsOrbit';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIVideoIntro } from './components/AIVideoIntro';
import { SecretAdminPanel } from './components/SecretAdminPanel';
import { Project, WorkFilter } from './types';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAiIntro, setShowAiIntro] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [workFilter, setWorkFilter] = useState<WorkFilter>('ALL');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Subtle synthesized audio feedback using Web Audio API (no external asset dependencies)
  const playInteractionSound = useCallback((frequency = 580, duration = 0.04) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio error
    }
  }, [soundEnabled]);

  // Global click audio listener
  useEffect(() => {
    if (!soundEnabled) return;
    const handleClick = () => playInteractionSound(640, 0.03);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [soundEnabled, playInteractionSound]);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowPreloader(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-[#ece8e1] selection:bg-[#dfceb4] selection:text-[#0c0c0c] font-sans">
      {/* Custom Follower Cursor */}
      <CustomCursor />

      {/* Preloader Experience (0% -> 100% -> hello -> shutter reveal) */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(id) => scrollToSection(id)}
        onOpenAiIntro={() => setShowAiIntro(true)}
      />

      {/* Main Top Header Navbar */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigate={(id) => scrollToSection(id)}
        onReplayIntro={handleReplayIntro}
        onOpenAiIntro={() => setShowAiIntro(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Hero Section (Cream canvas with high-impact liquid wave CREATIVE title) */}
      <HeroSection
        onExploreClick={() => scrollToSection('about')}
        onContactClick={() => scrollToSection('contact')}
        onOpenAiIntro={() => setShowAiIntro(true)}
      />

      {/* Section 01: About Me (Interactive slider, portrait, narrative, stats) */}
      <AboutSection
        onContactClick={() => scrollToSection('contact')}
        onOpenAiIntro={() => setShowAiIntro(true)}
      />

      {/* Section 02: My Expertise (Capabilities, tech badges, interactive hover preview cards) */}
      <ExpertiseSection />

      {/* Section 03: Skills Orbit & Filter (Rotating skills marquee with massive WORK backdrop) */}
      <SkillsOrbit
        currentFilter={workFilter}
        onFilterChange={(filter) => setWorkFilter(filter)}
      />

      {/* Section 03 Cont.: Selected Projects Showcase */}
      <ProjectsSection
        currentFilter={workFilter}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Section 04: Contact & Collaboration (Live Pakistan clock, quick copy cards, project inquiry form) */}
      <ContactSection />

      {/* Footer (Signature, copyright, back to top button) */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Interactive Project Preview Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenAiIntro={() => setShowAiIntro(true)}
      />

      {/* Rehan Imran AI Video Intro Theater Modal */}
      <AIVideoIntro
        isOpen={showAiIntro}
        onClose={() => setShowAiIntro(false)}
      />

      {/* Secret Admin Panel Vault (Triggerable via Ctrl+Shift+A or lock icons) */}
      <SecretAdminPanel />
    </div>
  );
}
