import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Code, Sparkles, Layout, Layers, Terminal, Cpu } from 'lucide-react';
import { EXPERTISE_ITEMS } from '../data/portfolioData';
import { ExpertiseItem } from '../types';

export const ExpertiseSection = () => {
  const [activeItem, setActiveItem] = useState<ExpertiseItem | null>(EXPERTISE_ITEMS[0]);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      default:
        return <Terminal className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="expertise"
      className="relative w-full bg-[#0d0d0d] text-[#ece8e1] py-28 px-6 sm:px-12 md:px-16 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#dfceb4]">
            <span className="px-2 py-0.5 rounded border border-[#dfceb4]/30 bg-[#dfceb4]/5">02</span>
            <span>CAPABILITIES</span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-400">WHAT I BRING TO THE TABLE</span>
          </div>

          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline">
            CORE DISCIPLINES
          </span>
        </div>

        {/* Section Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-6">
            <h2 className="font-anton text-5xl sm:text-7xl md:text-8xl tracking-wider uppercase text-[#ece8e1]">
              MY EXPERTISE
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl">
              I design and build digital experiences where design, code and motion work as one. From expressive interfaces to high-speed web platforms.
            </p>
          </div>
        </div>

        {/* Floating tech stack decorative badges (mirroring 1:00 in the video) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-16 py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mr-2">
            TECH STACK:
          </span>
          {['JavaScript (ES6+)', 'React 19', 'Next.js', 'GSAP / Motion', 'Tailwind CSS', 'TypeScript', 'Vite', 'WebGL / Shaders'].map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-neutral-300 hover:border-[#dfceb4] hover:text-[#dfceb4] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Interactive Expertise Rows (mirroring 1:06 - 1:12 in video) */}
        <div className="space-y-4">
          {EXPERTISE_ITEMS.map((item) => {
            const isSelected = activeItem?.id === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={(e) => {
                  setActiveItem(item);
                  setHoverPosition({ x: e.clientX, y: e.clientY });
                }}
                className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#dfceb4]/40 bg-white/[0.04] shadow-[0_0_30px_rgba(223,206,180,0.05)]'
                    : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]'
                }`}
                data-cursor="EXP"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Number & Title */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <span className="font-mono text-sm sm:text-base text-neutral-500 group-hover:text-[#dfceb4] transition-colors">
                      {item.number}
                    </span>
                    <h3 className="font-anton text-2xl sm:text-4xl md:text-5xl tracking-wide uppercase text-white group-hover:text-[#dfceb4] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Right: Summary text & tags */}
                  <div className="flex flex-col md:items-end gap-3 max-w-md">
                    <p className="text-sm text-neutral-400 font-light leading-relaxed md:text-right">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-item preview reveal if selected */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between overflow-hidden"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${item.previewAccent}20`, color: item.previewAccent }}
                        >
                          {getIcon(item.previewIconName)}
                        </div>
                        <div>
                          <p className="text-xs font-mono font-bold uppercase text-white">
                            {item.previewTitle}
                          </p>
                          <p className="text-[11px] font-mono text-neutral-400">
                            {item.previewSubtitle}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-[#dfceb4] flex items-center gap-1">
                        ACTIVE CAPABILITY
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
