import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_ORBIT_TAGS } from '../data/portfolioData';
import { WorkFilter } from '../types';

interface SkillsOrbitProps {
  currentFilter: WorkFilter;
  onFilterChange: (filter: WorkFilter) => void;
}

export const SkillsOrbit = ({ currentFilter, onFilterChange }: SkillsOrbitProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filters: WorkFilter[] = [
    'ALL',
    'INTERACTIVE WEB',
    'AI & AUTOMATION',
    'UI/UX',
    'CREATIVE DEVELOPMENT',
  ];

  return (
    <section className="relative w-full bg-[#0a0a0a] text-[#ece8e1] py-24 sm:py-32 overflow-hidden border-t border-white/5 select-none">
      {/* Huge Background Typography "WORK" (mirroring 1:16 - 1:24 in the video) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
        <h2 className="font-anton text-[32vw] sm:text-[28vw] leading-none uppercase text-[#dfceb4]/20 tracking-tighter filter blur-[0.5px]">
          WORK
        </h2>
      </div>

      {/* Floating decorative dripping particles / fluid nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#dfceb4] animate-ping opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-[#dfceb4] opacity-20" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#dfceb4] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center text-center">
        {/* Scroll cue prompt */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-[#dfceb4] mb-2">
            SCROLL TO EXPLORE MY
          </p>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#dfceb4] to-transparent" />
        </div>

        {/* Orbiting / Scrolling Skills Marquee (mirroring the pill loop in the video) */}
        <div className="w-full overflow-hidden py-8 my-4 relative">
          {/* Gradient edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <motion.div
            className="flex items-center space-x-4 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 25,
            }}
          >
            {[...SKILL_ORBIT_TAGS, ...SKILL_ORBIT_TAGS].map((skill, idx) => (
              <div
                key={`${skill}-${idx}`}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                data-cursor="STACK"
                className={`px-6 py-2.5 rounded-full border transition-all duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer ${
                  hoveredSkill === skill
                    ? 'border-[#dfceb4] bg-[#dfceb4] text-[#0a0a0a] scale-110 shadow-[0_0_20px_rgba(223,206,180,0.4)]'
                    : 'border-white/15 bg-white/[0.03] text-neutral-300 hover:border-white/40'
                }`}
              >
                {skill}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filter Tabs (UI/UX, INTERACTIVE WEB, CREATIVE DEVELOPMENT, MOTION DESIGN) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {filters.map((filter) => {
            const isActive = currentFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                data-cursor="FILTER"
                className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#dfceb4] text-[#0c0c0c] font-bold shadow-[0_0_15px_rgba(223,206,180,0.3)]'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
