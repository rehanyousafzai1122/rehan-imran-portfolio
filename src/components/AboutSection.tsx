import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, MapPin, Compass, Briefcase, GraduationCap, Play, Rocket, Shield, Database, Cpu, Server } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { BIO_STATS, LEARNING_GOALS } from '../data/portfolioData';

interface AboutSectionProps {
  onContactClick: () => void;
  onOpenAiIntro?: () => void;
}

export const AboutSection = ({ onContactClick, onOpenAiIntro }: AboutSectionProps) => {
  const { personalInfo } = usePortfolio();
  const [sliderPos, setSliderPos] = useState(35);

  return (
    <section
      id="about"
      className="relative w-full bg-[#0c0c0c] text-[#ece8e1] py-28 px-6 sm:px-12 md:px-16 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index & Eyebrow */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#dfceb4]">
            <span className="px-2 py-0.5 rounded border border-[#dfceb4]/30 bg-[#dfceb4]/5">01</span>
            <span>WHO I AM</span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-400">THE PERSON BEHIND THE CODE</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500">
            <span>SCROLL DOWN</span>
            <ArrowUpRight className="w-3.5 h-3.5 rotate-90 text-[#dfceb4]" />
          </div>
        </div>

        {/* Big Section Title "ABOUT ME" with interactive golden slider line (as seen in video at 0:42) */}
        <div className="mb-16">
          <h2 className="font-anton text-5xl sm:text-7xl md:text-8xl tracking-wider uppercase text-[#ece8e1] mb-6">
            ABOUT ME
          </h2>

          {/* Interactive Golden Slider Line */}
          <div
            className="relative w-full h-8 flex items-center cursor-ew-resize group"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 5), 95);
              setSliderPos(percent);
            }}
          >
            <div className="w-full h-[1px] bg-white/15 relative">
              <div
                className="absolute top-0 left-0 h-full bg-[#dfceb4]"
                style={{ width: `${sliderPos}%` }}
              />
              {/* Glowing Draggable Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#dfceb4] shadow-[0_0_12px_#dfceb4] border-2 border-[#0c0c0c] transition-transform group-hover:scale-125"
                style={{ left: `${sliderPos}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Layout: Left portrait & Right deep narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Live AI Video Trigger Card */}
          <div className="lg:col-span-5 relative">
            <div
              onClick={onOpenAiIntro}
              data-cursor="PLAY INTRO"
              className="relative group overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 aspect-[4/5] sm:aspect-[3/4] cursor-pointer shadow-2xl transition-all duration-500 hover:border-[#dfceb4]/60"
            >
              {/* Image with subtle hover zoom */}
              <img
                src={personalInfo.avatarPortrait}
                alt={`${personalInfo.name} — Developer Portrait`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top contrast-105 transition-all duration-700 group-hover:scale-105"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Top AI Video Indicator Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-red-500/40 text-[11px] font-mono text-white">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 font-bold">VIDEO INTRO</span>
                  <span className="text-white/40">•</span>
                  <span className="text-[#dfceb4]">0:45s</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:border-[#dfceb4] transition-colors">
                  <Play className="w-3.5 h-3.5 fill-white group-hover:fill-[#dfceb4] text-white group-hover:text-[#dfceb4] translate-x-0.5" />
                </div>
              </div>

              {/* Center Holographic Play Hover Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dfceb4] text-black flex items-center justify-center shadow-[0_0_25px_#dfceb4] border-2 border-white/20 transition-transform"
                >
                  <Play className="w-7 h-7 fill-black translate-x-0.5" />
                </motion.div>
                <span className="mt-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#dfceb4]/40 text-[11px] font-mono tracking-widest text-[#dfceb4] uppercase">
                  CLICK TO PLAY INTRO
                </span>
              </div>

              {/* Bottom Card Identity Info */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 pointer-events-none">
                <div>
                  <h3 className="font-anton text-2xl sm:text-3xl tracking-wider text-white uppercase">
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs font-mono text-[#dfceb4] tracking-widest mt-0.5">
                    {personalInfo.title.toUpperCase()}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 text-[#dfceb4]" />
                </div>
              </div>
            </div>

            {/* Availability status tag */}
            <div className="mt-4 flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Open for new contracts & collaborations
                </span>
              </div>
              <button
                onClick={onContactClick}
                data-cursor="CHAT"
                className="text-xs font-mono uppercase text-[#dfceb4] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Reach Out ↗
              </button>
            </div>

            {/* Learning Roadmap / Tech Frontiers */}
            <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/[0.01]">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2.5">
                <span className="uppercase text-[#dfceb4] tracking-wider">EXPANDING HORIZONS</span>
                <span className="text-[10px] text-neutral-500">2026 ROADMAP</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LEARNING_GOALS.map((goal) => (
                  <span
                    key={goal.name}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {goal.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Typographic Narrative & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#dfceb4] block mb-3">
                — WHO AM I ?
              </span>

              {/* High-impact headline */}
              <h3 className="font-anton text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[1.05] text-[#ece8e1] mb-8">
                {personalInfo.aboutHeadline}
              </h3>

              {/* Core bio statement */}
              <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-6 font-sans">
                {personalInfo.aboutIntro}
              </p>

              {/* Philosophy paragraph */}
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-10 font-sans border-l-2 border-[#dfceb4]/40 pl-4 italic">
                "{personalInfo.aboutPhilosophy}"
              </p>
            </div>

            {/* Clean 2-column Metadata Matrix (mirroring 0:48 in the video) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {BIO_STATS.map((stat) => (
                <div key={stat.label} className="group">
                  <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    {stat.label}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-neutral-200 uppercase mt-1 tracking-wider group-hover:text-[#dfceb4] transition-colors">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Dual Diploma Spotlight from Resume */}
            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#dfceb4]/10 border border-[#dfceb4]/30 text-[#dfceb4] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase">{personalInfo.education.degree}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#dfceb4]/10 text-[#dfceb4] border border-[#dfceb4]/20">SINO-PAK 2+1</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-sans mt-0.5">{personalInfo.education.institute}</p>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5">{personalInfo.education.details}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4 shrink-0">
                {personalInfo.languages.map((lang) => (
                  <span key={lang.name} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300">
                    <span className="text-[#dfceb4]">{lang.name}</span>: {lang.level}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Action Tags (Freelance, Full-time / Remote, Let's Talk) */}
            <div className="flex flex-wrap items-center gap-3 mt-10">
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-wider text-neutral-300">
                FREELANCE
              </span>
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-wider text-neutral-300">
                FULL-TIME / REMOTE
              </span>
              <button
                onClick={onContactClick}
                data-cursor="CONNECT"
                className="px-5 py-2 rounded-full bg-[#dfceb4] text-[#0c0c0c] text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                LET'S TALK
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
