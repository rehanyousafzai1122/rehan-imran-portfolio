import { useState } from 'react';
import { ArrowUp, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer = ({ onScrollToTop }: FooterProps) => {
  const { personalInfo, setIsAdminOpen } = usePortfolio();
  const [clickCount, setClickCount] = useState(0);

  const handleCopyrightClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setIsAdminOpen(true);
        return 0;
      }
      return next;
    });
  };

  return (
    <footer className="w-full bg-[#080808] text-[#ece8e1] py-16 px-6 sm:px-12 md:px-16 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Signature & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-script text-4xl text-[#dfceb4]">rehan.</span>
          <span className="hidden sm:inline text-neutral-600">/</span>
          <p className="text-xs font-mono text-neutral-400">
            ENGINEERED WITH REACT, MOTION & TAILWIND
          </p>
        </div>

        {/* Center: Copyright & Secret Trigger */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 text-center">
          <p
            onClick={handleCopyrightClick}
            title="Secret Panel: Click 3 times or press Ctrl+Shift+A"
            className="cursor-pointer hover:text-neutral-400 transition-colors"
          >
            © {new Date().getFullYear()} {personalInfo.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={() => setIsAdminOpen(true)}
            title="Admin Vault (Ctrl+Shift+A)"
            className="p-1 rounded-md text-neutral-700 hover:text-[#dfceb4] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Admin Access"
          >
            <Lock className="w-3 h-3" />
          </button>
        </div>

        {/* Right: Back to Top Button */}
        <div>
          <button
            onClick={onScrollToTop}
            data-cursor="TOP"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#dfceb4] text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-[#dfceb4] transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#dfceb4] group-hover:text-black transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

