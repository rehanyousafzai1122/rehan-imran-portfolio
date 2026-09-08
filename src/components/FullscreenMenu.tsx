import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Github, Linkedin, Twitter, Mail, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAiIntro?: () => void;
}

export const FullscreenMenu = ({ isOpen, onClose, onNavigate, onOpenAiIntro }: FullscreenMenuProps) => {
  const { personalInfo, setIsAdminOpen } = usePortfolio();
  const menuItems = [
    { label: 'WORK', id: 'work', subtitle: 'Selected Projects & Real Systems' },
    { label: 'ABOUT', id: 'about', subtitle: 'Mindset & Developer Journey' },
    { label: 'EXPERTISE', id: 'expertise', subtitle: 'React, Tailwind & Frontend Stack' },
    { label: 'CONTACT', id: 'contact', subtitle: "Let's Start A Conversation" },
  ];

  const handleLinkClick = (id: string) => {
    onClose();
    setTimeout(() => {
      onNavigate(id);
    }, 300);
  };

  const handleOpenAiReel = () => {
    onClose();
    if (onOpenAiIntro) {
      setTimeout(() => {
        onOpenAiIntro();
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="fullscreen-nav-overlay"
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 bg-[#0c0c0c] text-[#ece8e1] flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
        >
          {/* Top Bar with signature & close */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#dfceb4]/40 bg-neutral-900">
                <img
                  src={personalInfo.avatarPortrait}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-script text-3xl sm:text-4xl text-[#dfceb4] select-none">
                rehan.
              </span>
            </div>

            <div className="flex items-center gap-3">
              {onOpenAiIntro && (
                <button
                  onClick={handleOpenAiReel}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-xs font-mono text-red-300 hover:text-white cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>PLAY AI INTRO</span>
                </button>
              )}

              <button
                id="close-menu-button"
                onClick={onClose}
                className="p-3 rounded-full border border-white/10 hover:border-[#dfceb4] hover:bg-white/5 transition-all text-[#ece8e1] hover:text-[#dfceb4] flex items-center justify-center cursor-pointer"
                aria-label="Close Menu"
                data-cursor="CLOSE"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Large Menu Links (mirroring the video at 0:24) */}
          <div className="my-auto py-12 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
                className="group relative"
              >
                <button
                  onClick={() => handleLinkClick(item.id)}
                  data-cursor="GO"
                  className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider uppercase transition-all duration-300 text-[#ece8e1]/80 hover:text-[#dfceb4] group-hover:scale-105 inline-flex items-center gap-3 cursor-pointer"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#dfceb4] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#dfceb4]" />
                </button>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Footer Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs text-neutral-400 font-mono">
            <div>
              <p className="uppercase tracking-wider text-neutral-500">LOCATION</p>
              <p className="text-neutral-200 mt-1">{personalInfo.location}</p>
              <p className="text-[#dfceb4]/80 mt-0.5">UTC+5 (Available Globally)</p>
            </div>

            <div>
              <p className="uppercase tracking-wider text-neutral-500">DIRECT INQUIRIES</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-neutral-200 hover:text-[#dfceb4] transition-colors block mt-1"
              >
                {personalInfo.email}
              </a>
              <a
                href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors block mt-0.5"
              >
                WhatsApp: {personalInfo.phone}
              </a>
            </div>

            <div className="flex items-center md:justify-end gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] hover:text-[#dfceb4] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] hover:text-[#dfceb4] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => setIsAdminOpen(true), 200);
                }}
                className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] hover:text-[#dfceb4] text-neutral-500 transition-colors cursor-pointer"
                title="Admin Control Vault"
                aria-label="Admin Control Vault"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
