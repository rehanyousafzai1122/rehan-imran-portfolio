import { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Play } from 'lucide-react';

interface NavbarProps {
  onOpenMenu: () => void;
  onNavigate: (sectionId: string) => void;
  onReplayIntro: () => void;
  onOpenAiIntro?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar = ({
  onOpenMenu,
  onNavigate,
  onReplayIntro,
  onOpenAiIntro,
  soundEnabled,
  onToggleSound,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', id: 'work' },
    { label: 'ABOUT', id: 'about' },
    { label: 'JOURNAL', id: 'about' },
    { label: 'EXPERTISE', id: 'expertise' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0c0c]/80 backdrop-blur-md py-3.5 border-b border-white/5 shadow-lg'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Signature logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="group flex items-center gap-2 cursor-pointer text-left"
          data-cursor="HOME"
          aria-label="Scroll to Top"
        >
          <span className="font-script text-3xl sm:text-4xl text-[#0c0c0c] dark:text-[#ece8e1] transition-transform duration-300 group-hover:scale-105 select-none">
            rehan.
          </span>
        </button>

        {/* Center: Desktop Navigation Links (mirroring the video at 0:15) */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onNavigate(link.id)}
              data-cursor="VIEW"
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#0c0c0c]/80 dark:text-[#ece8e1]/80 hover:text-[#0c0c0c] dark:hover:text-[#dfceb4] transition-colors relative group cursor-pointer py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0c0c0c] dark:bg-[#dfceb4] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right: Controls & Hamburger Menu */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          {/* AI Intro Video Launch Button */}
          {onOpenAiIntro && (
            <button
              onClick={onOpenAiIntro}
              data-cursor="AI REEL"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 hover:border-red-500 text-xs font-mono text-red-300 hover:text-white transition-all cursor-pointer"
              title="Play AI Video Intro (0:22s)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>AI INTRO</span>
            </button>
          )}

          {/* Replay Intro Preloader Button */}
          <button
            onClick={onReplayIntro}
            data-cursor="REPLAY"
            className="p-2 sm:p-2.5 rounded-full border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-[#dfceb4] hover:text-[#dfceb4] transition-all cursor-pointer"
            title="Replay Loading Experience"
            aria-label="Replay Loading Intro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Subtle Sound Toggle */}
          <button
            onClick={onToggleSound}
            data-cursor={soundEnabled ? 'MUTE' : 'SOUND'}
            className="p-2 sm:p-2.5 rounded-full border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-[#dfceb4] hover:text-[#dfceb4] transition-all cursor-pointer"
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#dfceb4]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Minimalist Hamburger Button */}
          <button
            id="open-menu-button"
            onClick={onOpenMenu}
            data-cursor="MENU"
            className="flex flex-col justify-center items-end w-10 h-10 p-2 space-y-1.5 rounded-full border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-[#dfceb4] transition-all cursor-pointer group"
            aria-label="Open Navigation Menu"
          >
            <span className="w-6 h-[2px] bg-black dark:bg-[#ece8e1] group-hover:bg-[#dfceb4] transition-colors group-hover:w-5" />
            <span className="w-4 h-[2px] bg-black dark:bg-[#ece8e1] group-hover:bg-[#dfceb4] transition-colors group-hover:w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
