import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroSectionProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onOpenAiIntro: () => void;
}

export const HeroSection = ({ onExploreClick, onContactClick, onOpenAiIntro }: HeroSectionProps) => {
  const { personalInfo } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const [distortionScale, setDistortionScale] = useState(0);
  const [distortionFreq, setDistortionFreq] = useState('0.01 0.02');
  const [isWavyActive, setIsWavyActive] = useState(false);

  // Dynamic interactive wave distortion based on cursor movement across the "CREATIVE" title (mirroring 0:24-0:29 in the video)
  const handleMouseMoveOverTitle = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Dynamic wave frequencies based on mouse position
    const freqX = (0.01 + x * 0.035).toFixed(3);
    const freqY = (0.02 + y * 0.045).toFixed(3);
    setDistortionFreq(`${freqX} ${freqY}`);
    setDistortionScale(26 + Math.sin(x * Math.PI) * 20);
    setIsWavyActive(true);
  };

  const handleMouseLeaveTitle = () => {
    setIsWavyActive(false);
    setDistortionScale(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#f3efe6] text-[#0d0d0d] flex flex-col justify-between pt-24 pb-10 px-6 sm:px-12 md:px-16 select-none overflow-hidden transition-colors duration-500"
    >
      {/* Hidden SVG Filter for Liquid Wave Displacement (used when hovering the CREATIVE title) */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={distortionFreq}
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="12s"
                values="0.01 0.02;0.02 0.04;0.01 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Subtle fine geometric grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top spacing / status notice */}
      <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest text-[#0d0d0d]/70 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-black/20 shadow-sm bg-neutral-200">
            <img
              src={personalInfo.avatarPortrait}
              alt="Rehan Imran"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="font-semibold text-[#0d0d0d]">{personalInfo.name.toUpperCase()} • '26</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">{personalInfo.availability}</span>
        </div>
      </div>

      {/* Centerpiece Typographic Block */}
      <div className="my-auto py-12 flex flex-col items-center justify-center text-center relative z-10 w-full max-w-6xl mx-auto">
        {/* Massive "CREATIVE" Typography with Liquid Wave Effect */}
        <div
          onMouseMove={handleMouseMoveOverTitle}
          onMouseLeave={handleMouseLeaveTitle}
          className="relative cursor-pointer transition-transform duration-300 w-full"
          data-cursor="WAVE"
        >
          <h1
            style={{
              filter: isWavyActive ? 'url(#liquid-filter)' : 'none',
              transform: isWavyActive ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="font-anton text-[18vw] sm:text-[17vw] md:text-[16vw] leading-[0.82] tracking-tighter text-[#0d0d0d] uppercase m-0 p-0 block select-none drop-shadow-sm"
          >
            {personalInfo.heroHeadline}
          </h1>

          {/* Interactive hint prompt on desktop */}
          <span className="hidden md:inline-block absolute -top-4 right-4 text-[10px] font-mono tracking-widest text-neutral-400 uppercase pointer-events-none">
            [hover to distort]
          </span>
        </div>

        {/* Subtitle Bar: "DEVELOPER" & Sub-disciplines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 sm:mt-6 flex flex-col items-center"
        >
          <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-[#0d0d0d] uppercase flex items-center gap-3 sm:gap-4">
            <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#0d0d0d] inline-block" />
            {personalInfo.heroSubheadline}
            <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#0d0d0d] inline-block" />
          </h2>

          <div className="mt-4 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#0d0d0d]/80 uppercase">
            <span>VISUALS</span>
            <span className="text-[#0d0d0d]/40">•</span>
            <span>CODE</span>
            <span className="text-[#0d0d0d]/40">•</span>
            <span>EXPERIENCE</span>
          </div>

          {/* AI Video Intro Trigger Button */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <button
              onClick={onOpenAiIntro}
              data-cursor="AI INTRO"
              className="group relative flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0d0d0d] text-[#f3efe6] hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#dfceb4] text-black">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfceb4] opacity-50" />
                <Play className="w-3.5 h-3.5 fill-black translate-x-0.5" />
              </span>

              <div className="flex flex-col text-left">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#dfceb4] uppercase">
                  AI INTRO REEL • 0:22s
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                  WATCH AI VIDEO INTRO
                </span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Copyright, Scroll indicator, Rotating Badge */}
      <div className="w-full grid grid-cols-3 items-end relative z-10 pt-6">
        {/* Left: Signature copyright */}
        <div className="flex items-center text-xs font-mono tracking-wider text-[#0d0d0d]/70">
          <p>©2026 rehan.</p>
        </div>

        {/* Center: Scroll to Explore */}
        <div className="flex flex-col items-center justify-center text-center">
          <button
            onClick={onExploreClick}
            data-cursor="EXPLORE"
            className="group flex flex-col items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#0d0d0d]/80 hover:text-[#0d0d0d] uppercase cursor-pointer"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="w-5 h-8 rounded-full border border-[#0d0d0d]/40 flex items-start justify-center p-1 group-hover:border-[#0d0d0d] transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]"
              />
            </div>
          </button>
        </div>

        {/* Right: Rotating Circular Badge (mirroring 0:15 - 0:35 in the video) */}
        <div className="flex justify-end">
          <div
            onClick={onContactClick}
            data-cursor="CONTACT"
            className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center cursor-pointer group"
          >
            {/* Spinning Circular Text Ring */}
            <svg
              className="w-full h-full animate-spin-slow transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 160 160"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                />
              </defs>
              <text className="text-[11.5px] font-mono uppercase tracking-[0.28em] fill-[#0d0d0d]">
                <textPath href="#circlePath" startOffset="0%">
                  LET'S WORK TOGETHER • BASED IN PAKISTAN •
                </textPath>
              </text>
            </svg>

            {/* Center Arrow / Stamp */}
            <div className="absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#0d0d0d]/30 group-hover:border-[#0d0d0d] group-hover:bg-[#0d0d0d] group-hover:text-[#f3efe6] flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
