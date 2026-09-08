import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, WorkFilter } from '../types';

interface ProjectsSectionProps {
  currentFilter: WorkFilter;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection = ({ currentFilter, onSelectProject }: ProjectsSectionProps) => {
  const { projects } = usePortfolio();

  const filteredProjects = projects.filter((proj) => {
    if (currentFilter === 'ALL') return true;
    if (currentFilter === 'INTERACTIVE WEB') return proj.category === 'Interactive Web';
    if (currentFilter === 'AI & AUTOMATION') return proj.category === 'AI & Automation';
    if (currentFilter === 'CREATIVE DEVELOPMENT') return proj.category === 'Creative Development';
    if (currentFilter === 'UI/UX') return proj.category === 'UI / UX';
    return true;
  });

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    let colorClass = 'border-white/20 bg-white/5 text-neutral-300';
    let dotClass = 'bg-neutral-400';

    if (status === 'COMPLETE') {
      colorClass = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
      dotClass = 'bg-emerald-400';
    } else if (status === 'IN PROGRESS') {
      colorClass = 'border-amber-500/30 bg-amber-500/10 text-amber-300';
      dotClass = 'bg-amber-400 animate-pulse';
    } else if (status === 'IN DEVELOPMENT') {
      colorClass = 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300';
      dotClass = 'bg-cyan-400 animate-pulse';
    } else if (status === 'ONGOING') {
      colorClass = 'border-rose-500/30 bg-rose-500/10 text-rose-300';
      dotClass = 'bg-rose-400';
    } else if (status === 'CONCEPT') {
      colorClass = 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300';
      dotClass = 'bg-indigo-400';
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${colorClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span>{status}</span>
      </span>
    );
  };

  return (
    <section
      id="work"
      className="relative w-full bg-[#0a0a0a] text-[#ece8e1] pb-32 px-6 sm:px-12 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#dfceb4]">
            <span className="px-2 py-0.5 rounded border border-[#dfceb4]/30 bg-[#dfceb4]/5">03</span>
            <span>PORTFOLIO SELECTION</span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-400">INDEXED WORKS</span>
          </div>

          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            {filteredProjects.length} PROJECTS DISPLAYED
          </span>
        </div>

        {/* Project Cards (mirroring the stacked / editorial flow in video 1:26 - 1:52) */}
        <div className="space-y-20">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-10 md:p-12 overflow-hidden hover:border-[#dfceb4]/50 transition-all duration-500 shadow-2xl backdrop-blur-sm"
            >
              {/* Subtle ambient light glow */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: project.accentColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Left Side: Metadata, Title, Description, Tags */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Index, Category, Status & Year */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-neutral-400 mb-4">
                      <span className="text-[#dfceb4] font-bold">PROJECT — {project.number}</span>
                      <span>/</span>
                      <span className="uppercase">{project.category}</span>
                      <span>/</span>
                      <span>{project.year}</span>
                      {getStatusBadge(project.status)}
                    </div>

                    {/* Subtitle Eyebrow */}
                    <p className="text-[11px] font-mono tracking-[0.2em] text-[#dfceb4] uppercase mb-2">
                      {project.subtitle}
                    </p>

                    {/* Bold Title */}
                    <h3 className="font-anton text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white group-hover:text-[#dfceb4] transition-colors leading-[1.1] mb-6">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8 font-sans">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-8 border-l border-white/15 pl-4">
                      {project.highlights.map((h, i) => (
                        <p key={i} className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#dfceb4]" />
                          <span>{h}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Tags & Action Buttons */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* If live project link exists, render external direct visit button */}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="VISIT"
                          className="px-6 py-3 rounded-full bg-[#dfceb4] text-[#0c0c0c] text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-lg group-hover:scale-105"
                        >
                          <span>VISIT LIVE SITE</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : null}

                      {/* Modal Details / Interactive Demo Trigger */}
                      <button
                        onClick={() => onSelectProject(project)}
                        data-cursor="SPECS"
                        className={`px-5 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                          project.liveUrl
                            ? 'border border-white/20 text-neutral-200 hover:border-[#dfceb4] hover:text-[#dfceb4] bg-white/5'
                            : 'bg-[#dfceb4] text-[#0c0c0c] font-bold hover:bg-white shadow-lg group-hover:scale-105'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>{project.liveUrl ? 'ARCHITECTURE & SPECS' : 'INTERACTIVE DEMO'}</span>
                        {!project.liveUrl && <ArrowUpRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Visual Showcase with Interactive Zoom */}
                <div
                  className="lg:col-span-7 relative cursor-pointer"
                  onClick={() => onSelectProject(project)}
                  data-cursor="EXPLORE"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-950 border border-white/10 group-hover:border-white/25 transition-all duration-500 shadow-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />

                    {/* Gradient sheen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Corner Stamp */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-[#dfceb4] uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>INTERACTIVE</span>
                    </div>

                    {/* Center Overlay Cue */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-5 py-2.5 rounded-full bg-[#dfceb4] text-[#0c0c0c] text-xs font-mono uppercase tracking-widest font-bold shadow-2xl flex items-center gap-2">
                        Launch Interactive Experience ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
