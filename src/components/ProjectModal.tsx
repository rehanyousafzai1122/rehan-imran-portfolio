import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Watch,
  Headphones,
  BookOpen,
  Check,
  ArrowRight,
  Flame,
  Zap,
  Gauge,
  Search,
  CheckCircle2,
  GraduationCap,
  Play,
  Users,
  CheckSquare,
  Send,
  Smartphone,
  Home,
  Wrench,
  Palette,
  Mic,
  Bot,
  Brain,
  HelpCircle,
  Award,
  ArrowUpRight,
  Globe,
  Sliders,
  Layers,
  Lock,
  Unlock,
  Radio,
  RotateCcw,
} from 'lucide-react';
import { Project } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenAiIntro?: () => void;
}

export const ProjectModal = ({ project, onClose, onOpenAiIntro }: ProjectModalProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'details'>('preview');
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'MEN' | 'WOMEN' | 'KIDS' | 'BEAUTY'>('MEN');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeDialColor, setActiveDialColor] = useState<'obsidian' | 'champagne' | 'silver'>('obsidian');

  // Burger Project Interactive State
  const [selectedBurger, setSelectedBurger] = useState<'smash' | 'truffle' | 'spicy'>('smash');
  const [extraCheese, setExtraCheese] = useState(true);
  const [extraBacon, setExtraBacon] = useState(false);
  const [extraSauce, setExtraSauce] = useState(true);
  const [burgerAdded, setBurgerAdded] = useState(false);

  // Generator Project Interactive State
  const [generatorKva, setGeneratorKva] = useState(250);
  const [serviceType, setServiceType] = useState<'Rental' | 'Maintenance' | 'AMC Contract'>('Rental');

  // Academy Project Interactive State
  const [selectedCourse, setSelectedCourse] = useState('Frontend React Masterclass');

  // ClassTrack Pro Interactive State
  const [students, setStudents] = useState([
    { name: 'Hamza Tariq', roll: 'CS-01', status: 'Present', score: 92 },
    { name: 'Ayesha Khan', roll: 'CS-02', status: 'Present', score: 88 },
    { name: 'Bilal Ahmed', roll: 'CS-03', status: 'Late', score: 74 },
    { name: 'Zainab Noor', roll: 'CS-04', status: 'Absent', score: 65 },
    { name: 'Danish Ali', roll: 'CS-05', status: 'Present', score: 81 },
  ]);

  // Tech Educators Lead Interactive State
  const [leadForm, setLeadForm] = useState({ name: '', email: '', course: 'Full Stack Web Development' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Smart Way Home IoT Interactive State
  const [smartLocks, setSmartLocks] = useState(true);
  const [smartLightMode, setSmartLightMode] = useState<'Warm Glow' | 'Daylight' | 'Off'>('Warm Glow');
  const [smartThermostat, setSmartThermostat] = useState(72);
  const [smartSecurityArmed, setSmartSecurityArmed] = useState(true);

  // Appliance Repair Pompano Beach Interactive State
  const [selectedAppliance, setSelectedAppliance] = useState('Refrigerator');
  const [emergencyZip, setEmergencyZip] = useState('33060');
  const [dispatchConfirmed, setDispatchConfirmed] = useState(false);

  // AI Air Drawing Canvas Interactive State
  const [drawColor, setDrawColor] = useState('#00f0ff');
  const [fingerCoordinates, setFingerCoordinates] = useState({ x: 260, y: 180 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnStrokes, setDrawnStrokes] = useState<Array<{ x: number; y: number; color: string }>>([
    { x: 180, y: 140, color: '#00f0ff' },
    { x: 210, y: 170, color: '#00f0ff' },
    { x: 240, y: 150, color: '#00f0ff' },
    { x: 270, y: 190, color: '#00f0ff' },
  ]);

  // VoiceOS Pakistan Interactive State
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceActivePrompt, setVoiceActivePrompt] = useState('Check weather & Islamabad traffic');
  const [voiceSimulatedResponse, setVoiceSimulatedResponse] = useState(
    'Islamabad Expressway traffic is smooth with 18-minute transit to Blue Area. Local temperature is 24°C with clear skies.'
  );

  // WhatsApp Automation Bot Interactive State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Salam! Welcome to automated customer support. How can we help you today?', time: '10:00 AM' },
    { sender: 'user', text: 'I need pricing for web development services.', time: '10:01 AM' },
    { sender: 'bot', text: 'Our custom web packages start from $500 with responsive design and SEO. Press 1 for portfolio, 2 to schedule consultation.', time: '10:01 AM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Second Brain AI Search State
  const [secondBrainQuery, setSecondBrainQuery] = useState('react state');

  // Anime & Tech Quiz State
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(1);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#111111] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-[#ece8e1]"
        >
          {/* Top Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161616]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#dfceb4] px-2 py-0.5 rounded border border-[#dfceb4]/30 bg-[#dfceb4]/5">
                PROJECT {project.number}
              </span>
              <h3 className="font-anton text-xl sm:text-2xl tracking-wide uppercase text-white">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab(activeTab === 'preview' ? 'details' : 'preview')}
                className="hidden sm:inline-flex text-xs font-mono uppercase px-3 py-1.5 rounded-full border border-white/10 hover:border-[#dfceb4] transition-colors text-neutral-300"
              >
                {activeTab === 'preview' ? 'View Technical Specs' : 'View Live Demo'}
              </button>

              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] hover:bg-white/5 transition-all text-neutral-400 hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {activeTab === 'preview' ? (
              <div>
                {/* Live Deployment Top Banner */}
                {project.liveUrl && (
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-black border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">LIVE SITE DEPLOYMENT ACTIVE</span>
                          {project.status && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              {project.status}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-neutral-400 truncate max-w-md block mt-0.5">
                          {project.liveUrl}
                        </span>
                      </div>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#dfceb4] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shrink-0 shadow-lg group"
                    >
                      <span>VISIT LIVE SITE</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}

                {/* Specific Live Interactive Experience based on Project Type */}

                {/* 01. BURGER & RESTAURANT WEB APP */}
                {project.previewType === 'burger' && (
                  <div className="bg-[#14100c] text-[#f7f2ea] rounded-2xl p-6 sm:p-8 border border-orange-500/20 select-none shadow-2xl">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between border-b border-orange-500/20 pb-4 mb-6 gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-white">
                            THE SMOKEHOUSE BURGER &amp; DINER
                          </h4>
                          <p className="text-[10px] font-mono text-orange-400/90 tracking-widest uppercase">
                            FLAME-GRILLED GOURMET SELECTION • REACT &amp; MOTION
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 font-mono text-xs flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ORDER ({cartCount})</span>
                        </span>
                      </div>
                    </div>

                    {/* Interactive Burger Showcase */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      {/* Left: Burger Photo & Visual */}
                      <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-square bg-black/40 border border-white/10 shadow-lg">
                        <img
                          src={
                            selectedBurger === 'smash'
                              ? 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop'
                              : selectedBurger === 'truffle'
                              ? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'
                              : 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
                          }
                          alt="Gourmet Burger Preview"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-orange-500/40 text-[10px] font-mono text-orange-400">
                          {selectedBurger === 'smash' ? 'DOUBLE PATTY • PRIME ANGUS' : selectedBurger === 'truffle' ? 'WAGYU TRUFFLE GLAZE' : 'SMOKED HABANERO HEAT'}
                        </div>
                      </div>

                      {/* Right: Customizer & Order */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                        {/* Burger Selector */}
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                            SELECT GOURMET CREATION
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                            {[
                              { id: 'smash', name: 'Double Smash', price: 11.99 },
                              { id: 'truffle', name: 'Truffle Wagyu', price: 14.50 },
                              { id: 'spicy', name: 'Firehouse Hot', price: 12.50 },
                            ].map((b) => (
                              <button
                                key={b.id}
                                onClick={() => setSelectedBurger(b.id as 'smash' | 'truffle' | 'spicy')}
                                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                                  selectedBurger === b.id
                                    ? 'border-orange-500 bg-orange-500/15 text-white font-bold'
                                    : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/25'
                                }`}
                              >
                                <p className="truncate text-xs">{b.name}</p>
                                <p className="text-[10px] text-orange-400 mt-0.5">${b.price.toFixed(2)}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Ingredients Checklist */}
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                            CHEF'S TOPPINGS &amp; ADD-ONS
                          </p>
                          <div className="space-y-2 text-xs font-mono">
                            <label className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 cursor-pointer hover:border-orange-500/40 transition-colors">
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={extraCheese}
                                  onChange={(e) => setExtraCheese(e.target.checked)}
                                  className="accent-orange-500 w-4 h-4 rounded"
                                />
                                <span>Extra Smoked Cheddar Melt</span>
                              </span>
                              <span className="text-neutral-400">+$1.50</span>
                            </label>

                            <label className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 cursor-pointer hover:border-orange-500/40 transition-colors">
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={extraBacon}
                                  onChange={(e) => setExtraBacon(e.target.checked)}
                                  className="accent-orange-500 w-4 h-4 rounded"
                                />
                                <span>Crispy Beef Bacon Strips</span>
                              </span>
                              <span className="text-neutral-400">+$2.00</span>
                            </label>

                            <label className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 cursor-pointer hover:border-orange-500/40 transition-colors">
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={extraSauce}
                                  onChange={(e) => setExtraSauce(e.target.checked)}
                                  className="accent-orange-500 w-4 h-4 rounded"
                                />
                                <span>Signature Smoked Truffle Sauce</span>
                              </span>
                              <span className="text-neutral-400">+$1.00</span>
                            </label>
                          </div>
                        </div>

                        {/* Order Calculation & Add */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div>
                            <p className="text-[10px] font-mono text-neutral-400 uppercase">CALCULATED TOTAL</p>
                            <p className="text-2xl font-anton text-orange-400 tracking-wide">
                              $
                              {(
                                (selectedBurger === 'smash' ? 11.99 : selectedBurger === 'truffle' ? 14.5 : 12.5) +
                                (extraCheese ? 1.5 : 0) +
                                (extraBacon ? 2.0 : 0) +
                                (extraSauce ? 1.0 : 0)
                              ).toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setCartCount(cartCount + 1);
                              setBurgerAdded(true);
                              setTimeout(() => setBurgerAdded(false), 2000);
                            }}
                            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                          >
                            {burgerAdded ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                                <span>ADDED TO TRAY!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-4 h-4" />
                                <span>ADD TO ORDER</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 02. INDUSTRIAL GENERATOR & ENGINEERING SERVICES */}
                {project.previewType === 'generator' && (
                  <div className="bg-[#12161b] text-[#eceff4] rounded-2xl p-6 sm:p-8 border border-sky-500/20 select-none shadow-2xl">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between border-b border-sky-500/20 pb-4 mb-6 gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-white">
                            POWER ENGINEERING &amp; GENERATOR SERVICES
                          </h4>
                          <p className="text-[10px] font-mono text-sky-400 tracking-widest uppercase">
                            COMMERCIAL RENTAL • 24/7 AMC • SEO &amp; GSC OPTIMIZED
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>SEO SCORE: 96/100</span>
                      </div>
                    </div>

                    {/* Interactive Capacity Selector */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-widest">
                              SELECT GENERATOR CAPACITY (kVA)
                            </span>
                            <span className="font-anton text-xl text-sky-400">{generatorKva} kVA</span>
                          </div>

                          <div className="grid grid-cols-5 gap-2 font-mono text-xs">
                            {[30, 100, 250, 500, 1000].map((kva) => (
                              <button
                                key={kva}
                                onClick={() => setGeneratorKva(kva)}
                                className={`py-2 rounded-lg border text-center transition-all cursor-pointer ${
                                  generatorKva === kva
                                    ? 'border-sky-400 bg-sky-500/20 text-white font-bold'
                                    : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {kva}k
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Calculated Load Specs */}
                        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10 text-center font-mono">
                          <div>
                            <p className="text-[10px] text-neutral-400 uppercase">POWER OUTPUT</p>
                            <p className="text-base font-bold text-white mt-0.5">{Math.round(generatorKva * 0.8)} kW</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-neutral-400 uppercase">EST. FUEL BURN</p>
                            <p className="text-base font-bold text-sky-300 mt-0.5">
                              {Math.round(generatorKva * 0.22)} L/hr
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-neutral-400 uppercase">AMPERAGE (415V)</p>
                            <p className="text-base font-bold text-emerald-300 mt-0.5">
                              {Math.round(generatorKva * 1.39)} A
                            </p>
                          </div>
                        </div>

                        {/* Service Type Selector */}
                        <div>
                          <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
                            REQUIRED SERVICE PACKAGE
                          </p>
                          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                            {(['Rental', 'Maintenance', 'AMC Contract'] as const).map((s) => (
                              <button
                                key={s}
                                onClick={() => setServiceType(s)}
                                className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                                  serviceType === s
                                    ? 'border-sky-400 bg-sky-500/20 text-white font-semibold'
                                    : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Technical SEO & Lead Card */}
                      <div className="lg:col-span-5 p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono text-[#dfceb4] mb-3">
                            <Search className="w-3.5 h-3.5" />
                            <span className="uppercase tracking-wider font-semibold">SEO &amp; GSC METRICS</span>
                          </div>

                          <div className="space-y-2 text-xs font-mono text-neutral-300">
                            <div className="flex items-center justify-between p-2 rounded bg-white/5">
                              <span className="text-neutral-400">Rank Math SEO</span>
                              <span className="text-emerald-400 font-bold">100 / 100</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-white/5">
                              <span className="text-neutral-400">Search Console</span>
                              <span className="text-sky-300">Sitemap Indexed</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-white/5">
                              <span className="text-neutral-400">Mobile Speed</span>
                              <span className="text-emerald-400 font-bold">98/100 (Vite)</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            alert(`Quote request for ${generatorKva} kVA ${serviceType} recorded! Rehan will review.`);
                          }}
                          className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          REQUEST FORMAL PROPOSAL
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 03. ACADEMY & EDUCATION PLATFORM */}
                {project.previewType === 'academy' && (
                  <div className="bg-[#111915] text-[#ece8e1] rounded-2xl p-6 sm:p-8 border border-emerald-500/20 select-none shadow-2xl">
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-white">
                            ACADEMY &amp; STUDENT LEARNING PORTAL
                          </h4>
                          <p className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
                            CURRICULUM ARCHITECTURE • ADMISSIONS FUNNEL
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                        ADMISSIONS OPEN
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: 'Frontend React Masterclass', duration: '8 Weeks', students: '240+ Students', level: 'Beginner to Pro' },
                        { title: 'Tailwind & Motion UX', duration: '4 Weeks', students: '180+ Students', level: 'Intermediate' },
                        { title: 'Full-Stack Foundations', duration: '12 Weeks', students: '120+ Students', level: 'Advanced' },
                      ].map((course) => (
                        <div
                          key={course.title}
                          onClick={() => setSelectedCourse(course.title)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            selectedCourse === course.title
                              ? 'border-emerald-400 bg-emerald-500/15'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-emerald-400 uppercase">{course.level}</span>
                          <h5 className="font-bold text-white text-sm mt-1">{course.title}</h5>
                          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-4 pt-2 border-t border-white/10">
                            <span>{course.duration}</span>
                            <span className="text-emerald-300">{course.students}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 04. PERSONAL PORTFOLIO & AI REEL PREVIEW */}
                {project.previewType === 'portfolio' && (
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 p-6 sm:p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black">
                        <img
                          src={PERSONAL_INFO.avatarPortrait}
                          alt="Rehan Imran Developer Portrait"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs mb-3">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span>AI VIDEO INTRO REEL (0:22s)</span>
                          </div>

                          <h3 className="font-anton text-3xl sm:text-4xl uppercase text-white tracking-wide">
                            {PERSONAL_INFO.name}
                          </h3>
                          <p className="text-xs font-mono text-[#dfceb4] uppercase tracking-widest mt-1">
                            {PERSONAL_INFO.title}
                          </p>
                          <p className="text-sm text-neutral-300 leading-relaxed mt-4 font-sans">
                            {PERSONAL_INFO.aboutIntro}
                          </p>
                        </div>

                        {onOpenAiIntro && (
                          <button
                            onClick={() => {
                              onClose();
                              setTimeout(() => onOpenAiIntro(), 300);
                            }}
                            className="px-6 py-3 rounded-full bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-black translate-x-0.5" />
                            <span>LAUNCH AI VIDEO INTRO THEATER</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {project.previewType === 'gazu' && (
                  /* GAZU Live Experience mirroring the video at 1:37 - 1:45 */
                  <div className="bg-[#f7f7f7] text-[#111] rounded-xl p-6 sm:p-10 shadow-inner overflow-hidden select-none">
                    {/* GAZU Header */}
                    <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                      <div className="flex items-center space-x-6 text-xs font-mono tracking-widest font-semibold">
                        {(['MEN', 'WOMEN', 'KIDS', 'BEAUTY'] as const).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`cursor-pointer transition-colors ${
                              selectedCategory === cat
                                ? 'text-black border-b-2 border-black pb-0.5'
                                : 'text-neutral-400 hover:text-neutral-700'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Brand Logo GAZU */}
                      <h2 className="font-anton text-2xl sm:text-3xl tracking-widest uppercase">
                        G A Z U
                      </h2>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <button
                          onClick={() => setCartCount(cartCount + 1)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>BAG ({cartCount})</span>
                        </button>
                      </div>
                    </div>

                    {/* GAZU Hero Showcase (as shown in video at 1:43) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6">
                      <div className="md:col-span-4">
                        <p className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
                          FALL / WINTER COLLECTION 2026
                        </p>
                        <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none mb-4">
                          FASHION THAT MOVES WITH YOU.
                        </h3>
                        <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-sans">
                          Raw tailoring, heavy cotton jerseys, and fluid silhouette cuts crafted for the modern metropolis.
                        </p>
                        <button
                          onClick={() => setCartCount(cartCount + 1)}
                          className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-sm cursor-pointer shadow-md flex items-center gap-2"
                        >
                          <span>SHOP NOW</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="md:col-span-8 relative">
                        <div className="relative rounded-lg overflow-hidden aspect-[16/9] bg-neutral-200">
                          <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
                            alt="GAZU Clothing showcase"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="font-anton text-[14vw] md:text-[10vw] text-white/35 uppercase select-none tracking-widest">
                              GAZU
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lookbook items */}
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/10">
                      {[
                        { title: 'MEN OVERSIZED TEE', price: '$85', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop' },
                        { title: 'WOMEN HEAVY COAT', price: '$240', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop' },
                        { title: 'MINIMAL TOTE', price: '$60', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop' },
                      ].map((item, i) => (
                        <div key={i} className="group cursor-pointer" onClick={() => setCartCount(cartCount + 1)}>
                          <div className="aspect-square rounded overflow-hidden bg-neutral-200 mb-2 relative">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <span className="absolute bottom-2 right-2 bg-black text-white text-[10px] font-mono px-2 py-0.5 rounded">
                              + ADD
                            </span>
                          </div>
                          <p className="text-[11px] font-mono font-bold uppercase text-black">{item.title}</p>
                          <p className="text-[10px] font-mono text-neutral-500">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.previewType === 'watches' && (
                  /* DC Watches interactive live dial showcase (1:47 in video) */
                  <div className="bg-[#0b0c10] text-[#ece8e1] rounded-xl p-6 sm:p-10 border border-white/10 select-none">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                          DC WATCHES CHRONOGRAPH NO. 08
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          TIME REDEFINED
                        </h4>
                      </div>

                      <div className="flex gap-2">
                        {(['obsidian', 'champagne', 'silver'] as const).map((color) => (
                          <button
                            key={color}
                            onClick={() => setActiveDialColor(color)}
                            className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                              activeDialColor === color ? 'scale-125 border-white' : 'border-transparent'
                            }`}
                            style={{
                              backgroundColor:
                                color === 'obsidian' ? '#1a1a1a' : color === 'champagne' ? '#d4af37' : '#c0c0c0',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-7 flex justify-center">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-[#d4af37]/40 p-4 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center">
                          {/* Animated Watch Dial Hands */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-1 h-28 bg-[#d4af37] origin-bottom -top-2 rounded-full"
                          />
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3600, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-1.5 h-20 bg-white/80 origin-bottom top-6 rounded-full"
                          />
                          <div className="w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37] z-10" />

                          {/* Dial Numbers */}
                          <span className="absolute top-3 text-xs font-mono text-[#d4af37]">12</span>
                          <span className="absolute right-4 text-xs font-mono text-[#d4af37]">3</span>
                          <span className="absolute bottom-3 text-xs font-mono text-[#d4af37]">6</span>
                          <span className="absolute left-4 text-xs font-mono text-[#d4af37]">9</span>
                        </div>
                      </div>

                      <div className="md:col-span-5 space-y-4">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-[10px] font-mono text-neutral-400">CALIBRE</p>
                          <p className="text-sm font-bold text-white font-mono">CAL. 4802 CHRONOMETER</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-[10px] font-mono text-neutral-400">POWER RESERVE</p>
                          <p className="text-sm font-bold text-white font-mono">72 HOURS</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-[10px] font-mono text-neutral-400">WATER RESISTANCE</p>
                          <p className="text-sm font-bold text-white font-mono">100 METERS / 330 FEET</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {project.previewType === 'headphones' && (
                  /* Aurel Audio interactive equalizer showcase (1:49 in video) */
                  <div className="bg-[#0f172a] text-white rounded-xl p-6 sm:p-10 border border-blue-500/20 select-none">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div>
                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                          AUREL SOUND ACOUSTICS
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-0.5">
                          CRAFTED FOR SOUND. DESIGNED FOR LIFE.
                        </h4>
                      </div>

                      <button
                        onClick={() => setAudioPlaying(!audioPlaying)}
                        className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Headphones className="w-4 h-4" />
                        <span>{audioPlaying ? 'PAUSE EQUALIZER' : 'SIMULATE AUDIO'}</span>
                      </button>
                    </div>

                    {/* Equalizer Frequency Visualization */}
                    <div className="h-32 bg-black/40 rounded-xl p-4 flex items-end justify-between gap-1 border border-white/10 mb-6">
                      {[...Array(32)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: audioPlaying
                              ? `${Math.max(15, Math.sin(i * 0.5 + Date.now() * 0.005) * 80 + 20)}%`
                              : '15%',
                          }}
                          transition={{ duration: 0.15, repeat: audioPlaying ? Infinity : 0, ease: 'linear' }}
                          className="flex-1 bg-gradient-to-t from-blue-600 via-sky-400 to-indigo-300 rounded-t-sm"
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-xl font-bold font-mono text-sky-400">40mm</p>
                        <p className="text-[10px] font-mono text-neutral-400 uppercase mt-1">Beryllium Drivers</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-xl font-bold font-mono text-sky-400">-42dB</p>
                        <p className="text-[10px] font-mono text-neutral-400 uppercase mt-1">Active Noise Control</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-xl font-bold font-mono text-sky-400">45h</p>
                        <p className="text-[10px] font-mono text-neutral-400 uppercase mt-1">Playback Battery</p>
                      </div>
                    </div>
                  </div>
                )}

                {project.previewType === 'library' && (
                  /* Mini Library interactive dashboard (1:51 in video) */
                  <div className="bg-[#131f18] text-white rounded-xl p-6 sm:p-10 border border-emerald-500/20 select-none">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                          CLOUD RESOURCE MANAGEMENT
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-0.5">
                          LIBRARY MANAGEMENT SYSTEM
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-mono text-emerald-300">CLOUD SYNCED</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-[10px] font-mono text-neutral-400">TOTAL BOOKS</p>
                        <p className="text-3xl font-anton text-white mt-1">1,420</p>
                      </div>
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-[10px] font-mono text-neutral-400">ACTIVE BORROWS</p>
                        <p className="text-3xl font-anton text-emerald-400 mt-1">11</p>
                      </div>
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-[10px] font-mono text-neutral-400">OVERDUE ITEMS</p>
                        <p className="text-3xl font-anton text-amber-400 mt-1">0</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: 'The Pragmatic Programmer', author: 'Andy Hunt', status: 'Available' },
                        { title: 'Refactoring UI', author: 'Adam Wathan', status: 'Borrowed' },
                        { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', status: 'Available' },
                      ].map((book, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 text-xs font-mono"
                        >
                          <div>
                            <span className="font-bold text-white">{book.title}</span>
                            <span className="text-neutral-400 ml-2">by {book.author}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              book.status === 'Available'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {book.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 05. CLASSTRACK PRO ATTENDANCE SYSTEM */}
                {project.previewType === 'classtrack' && (
                  <div className="bg-[#10141a] text-white rounded-2xl p-6 sm:p-8 border border-sky-500/20 select-none shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                            LIVE ATTENDANCE ENGINE & GRADEBOOK
                          </span>
                        </div>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          CLASSTRACK PRO CONSOLE
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                          <span className="text-neutral-400">RATE: </span>
                          <span className="text-sky-300 font-bold">
                            {Math.round(
                              (students.filter((s) => s.status === 'Present').length / students.length) * 100
                            )}
                            %
                          </span>
                        </div>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-black text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                          >
                            <span>OPEN NETLIFY</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Interactive Roster */}
                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-mono text-neutral-400 flex justify-between px-3 py-1">
                        <span>STUDENT NAME / ID</span>
                        <span>ATTENDANCE STATUS (CLICK TO TOGGLE)</span>
                      </div>
                      {students.map((st, idx) => (
                        <div
                          key={st.roll}
                          onClick={() => {
                            const next = [...students];
                            const curr = next[idx].status;
                            next[idx].status = curr === 'Present' ? 'Late' : curr === 'Late' ? 'Absent' : 'Present';
                            setStudents(next);
                          }}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-mono text-xs text-sky-300">
                              {st.roll}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                                {st.name}
                              </p>
                              <p className="text-[11px] font-mono text-neutral-400">
                                Exam Average: {st.score}% • Grade: {st.score >= 90 ? 'A+' : st.score >= 80 ? 'A' : st.score >= 70 ? 'B' : 'C'}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                              st.status === 'Present'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : st.status === 'Late'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            ● {st.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs font-mono text-neutral-400 text-center">
                      Tip: Click on any student row above to toggle attendance and recalculate live percentages.
                    </p>
                  </div>
                )}

                {/* 06. TECH EDUCATORS LEAD PIPELINE */}
                {project.previewType === 'techeducators' && (
                  <div className="bg-[#121017] text-white rounded-2xl p-6 sm:p-8 border border-purple-500/20 select-none shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">
                          ACADEMIC PORTAL & LEAD GENERATOR
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          TECH EDUCATORS ACADEMY
                        </h4>
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-full bg-purple-500 hover:bg-purple-400 text-white text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                        >
                          <span>LIVE NETLIFY SITE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-6 space-y-3">
                        <p className="text-xs font-mono text-purple-300 uppercase tracking-wider">
                          SELECT BOOTCAMP CURRICULUM
                        </p>
                        {['Full Stack Web Development', 'Python & AI Engineering', 'UI/UX Interactive Design'].map(
                          (c) => (
                            <div
                              key={c}
                              onClick={() => setLeadForm({ ...leadForm, course: c })}
                              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                leadForm.course === c
                                  ? 'border-purple-400 bg-purple-500/15'
                                  : 'border-white/10 bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <span className="text-xs font-bold font-mono">{c}</span>
                              <Check
                                className={`w-4 h-4 ${leadForm.course === c ? 'text-purple-400' : 'opacity-0'}`}
                              />
                            </div>
                          )
                        )}
                      </div>

                      <div className="md:col-span-6 p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                        <p className="text-xs font-mono text-[#dfceb4] uppercase">TEST LEAD DISPATCH PIPELINE</p>
                        <input
                          type="text"
                          placeholder="Your Name (e.g. Asad)"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-500 font-mono"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-500 font-mono"
                        />
                        <button
                          onClick={() => {
                            setLeadSubmitted(true);
                            setTimeout(() => setLeadSubmitted(false), 4000);
                          }}
                          className="w-full py-2.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>SUBMIT TEST LEAD TO SHEETS API</span>
                        </button>
                        {leadSubmitted && (
                          <div className="p-2.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Payload received! Lead mapped to Google Sheets row.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 07. SMART WAY HOME IOT CONTROLLER */}
                {project.previewType === 'smartway' && (
                  <div className="bg-[#0b1219] text-white rounded-2xl p-6 sm:p-8 border border-cyan-500/20 select-none shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                          COMMERCIAL RESIDENTIAL AUTOMATION
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          SMART WAY AUTOMATION HUB
                        </h4>
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                        >
                          <span>VISIT SMARTWAE.COM</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {/* Smart Lock */}
                      <div
                        onClick={() => setSmartLocks(!smartLocks)}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          {smartLocks ? <Lock className="w-5 h-5 text-cyan-400" /> : <Unlock className="w-5 h-5 text-amber-400" />}
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${smartLocks ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'}`}>
                            {smartLocks ? 'LOCKED' : 'UNLOCKED'}
                          </span>
                        </div>
                        <p className="text-xs font-bold uppercase">Main Entry Door</p>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Biometric Smart Lock</p>
                      </div>

                      {/* Lighting Mode */}
                      <div
                        onClick={() => {
                          setSmartLightMode(
                            smartLightMode === 'Warm Glow' ? 'Daylight' : smartLightMode === 'Daylight' ? 'Off' : 'Warm Glow'
                          );
                        }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Sparkles className="w-5 h-5 text-amber-300" />
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                            {smartLightMode}
                          </span>
                        </div>
                        <p className="text-xs font-bold uppercase">Living Room Lights</p>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Automated Lumens</p>
                      </div>

                      {/* Thermostat */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <Gauge className="w-5 h-5 text-rose-400" />
                          <span className="text-xs font-mono font-bold text-rose-300">{smartThermostat}°F</span>
                        </div>
                        <p className="text-xs font-bold uppercase">Climate Zone 1</p>
                        <input
                          type="range"
                          min="65"
                          max="80"
                          value={smartThermostat}
                          onChange={(e) => setSmartThermostat(Number(e.target.value))}
                          className="w-full mt-2 accent-cyan-400"
                        />
                      </div>

                      {/* Security Alarm */}
                      <div
                        onClick={() => setSmartSecurityArmed(!smartSecurityArmed)}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Radio className={`w-5 h-5 ${smartSecurityArmed ? 'text-emerald-400 animate-pulse' : 'text-neutral-500'}`} />
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${smartSecurityArmed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-500/20 text-neutral-400'}`}>
                            {smartSecurityArmed ? 'ARMED' : 'DISARMED'}
                          </span>
                        </div>
                        <p className="text-xs font-bold uppercase">CCTV &amp; Sensors</p>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Perimeter Monitored</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 08. APPLIANCE REPAIR POMPANO BEACH (SEO & DISPATCH) */}
                {project.previewType === 'appliancerepair' && (
                  <div className="bg-[#121316] text-white rounded-2xl p-6 sm:p-8 border border-amber-500/20 select-none shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                            RANK MATH 100/100 AUDITED
                          </span>
                          <span className="text-[10px] font-mono uppercase text-amber-400">FLORIDA US CLIENT</span>
                        </div>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          APPLIANCE REPAIR POMPANO BEACH
                        </h4>
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                        >
                          <span>VISIT CLIENT WEBSITE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-6 space-y-3">
                        <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                          LOCAL SEO METRICS &amp; SCHEMA SCORE
                        </p>
                        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5">
                          {[
                            { label: 'Rank Math Overall SEO Score', val: '100 / 100' },
                            { label: 'LocalBusiness Schema Markup', val: 'Validated Structured Data' },
                            { label: 'City Landing Pages', val: 'Pompano Beach, FL • Broward' },
                            { label: 'Emergency Call CTR', val: '+48% Conversions' },
                          ].map((metric) => (
                            <div key={metric.label} className="flex items-center justify-between text-xs font-mono">
                              <span className="text-neutral-400">{metric.label}</span>
                              <span className="text-emerald-400 font-bold">{metric.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-6 p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                        <p className="text-xs font-mono text-amber-400 uppercase">TEST EMERGENCY DISPATCH ROUTER</p>
                        <div className="grid grid-cols-2 gap-2">
                          {['Refrigerator', 'Washing Machine', 'Oven / Stove', 'Dryer Repair'].map((app) => (
                            <button
                              key={app}
                              onClick={() => setSelectedAppliance(app)}
                              className={`p-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                                selectedAppliance === app
                                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                                  : 'border-white/10 bg-white/5 text-neutral-400'
                              }`}
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            setDispatchConfirmed(true);
                            setTimeout(() => setDispatchConfirmed(false), 4000);
                          }}
                          className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                        >
                          DISPATCH SAME-DAY TECH (ZIP: {emergencyZip})
                        </button>
                        {dispatchConfirmed && (
                          <div className="p-2.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            <span>Lead routed directly to Florida dispatch CRM via webhook!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 09. AIR DRAWING COMPUTER VISION SIMULATOR */}
                {project.previewType === 'airdrawing' && (
                  <div className="bg-[#0c1015] text-white rounded-2xl p-6 sm:p-8 border border-teal-500/20 select-none shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                            OPENCV + MEDIAPIPE GESTURE DETECTOR
                          </span>
                        </div>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          VIRTUAL AIR DRAWING CANVAS
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {['#00f0ff', '#00ff88', '#ffcc00', '#ff3366'].map((c) => (
                          <button
                            key={c}
                            onClick={() => setDrawColor(c)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                              drawColor === c ? 'scale-125 border-white' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                        <button
                          onClick={() => setDrawnStrokes([])}
                          className="ml-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300"
                        >
                          CLEAR
                        </button>
                      </div>
                    </div>

                    {/* Interactive Virtual Air Canvas */}
                    <div
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = Math.round(e.clientX - rect.left);
                        const y = Math.round(e.clientY - rect.top);
                        setFingerCoordinates({ x, y });
                        if (isDrawing) {
                          setDrawnStrokes((prev) => [...prev.slice(-150), { x, y, color: drawColor }]);
                        }
                      }}
                      onMouseDown={() => setIsDrawing(true)}
                      onMouseUp={() => setIsDrawing(false)}
                      onMouseLeave={() => setIsDrawing(false)}
                      className="relative h-64 sm:h-80 bg-black/70 rounded-xl border border-teal-500/30 overflow-hidden cursor-crosshair flex flex-col justify-between p-4"
                    >
                      {/* Telemetry HUD Top */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-teal-300/80 pointer-events-none z-10">
                        <span>GESTURE: {isDrawing ? 'INDEX PINCH (DRAWING)' : 'TRACKING LANDMARK #8'}</span>
                        <span>COORDS: X={fingerCoordinates.x} Y={fingerCoordinates.y}</span>
                      </div>

                      {/* Rendered Strokes */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {drawnStrokes.map((pt, idx) => (
                          <circle key={idx} cx={pt.x} cy={pt.y} r={4} fill={pt.color} opacity={0.9} />
                        ))}
                      </svg>

                      {/* Finger Pointer Simulation */}
                      <div
                        className="absolute w-5 h-5 rounded-full border-2 border-white pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#00f0ff]"
                        style={{
                          left: fingerCoordinates.x,
                          top: fingerCoordinates.y,
                          borderColor: drawColor,
                        }}
                      />

                      {/* Help Prompt Bottom */}
                      <div className="text-center text-xs font-mono text-neutral-500 pointer-events-none z-10">
                        [Click and drag cursor across canvas to simulate fingertip drawing in mid-air]
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. VOICEOS PAKISTAN AI ASSISTANT */}
                {project.previewType === 'voiceos' && (
                  <div className="bg-[#10141f] text-white rounded-2xl p-6 sm:p-8 border border-indigo-500/20 select-none shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">
                          BILINGUAL URDU/ENGLISH SPEECH AI
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          VOICEOS PAKISTAN REASONING CORE
                        </h4>
                      </div>

                      <button
                        onClick={() => setVoiceListening(!voiceListening)}
                        className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                          voiceListening
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-indigo-500 hover:bg-indigo-400 text-white'
                        }`}
                      >
                        <Mic className="w-4 h-4" />
                        <span>{voiceListening ? 'LISTENING (URDU/ENG)...' : 'SIMULATE VOICE INPUT'}</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Audio Waveform visualization */}
                      <div className="h-20 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center gap-1 px-6">
                        {[...Array(24)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: voiceListening ? `${Math.max(12, Math.sin(i * 0.7 + Date.now()) * 50 + 20)}px` : '6px',
                            }}
                            transition={{ duration: 0.1, repeat: voiceListening ? Infinity : 0 }}
                            className="w-1.5 bg-indigo-400 rounded-full"
                          />
                        ))}
                      </div>

                      {/* Prompt Selection Chips */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Check weather & Islamabad traffic',
                          'Summarize daily meetings in Urdu',
                          'Automate customer support ticket',
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => {
                              setVoiceActivePrompt(prompt);
                              if (prompt.includes('traffic')) {
                                setVoiceSimulatedResponse(
                                  'Islamabad Expressway traffic is smooth with 18-minute transit to Blue Area. Local temperature is 24°C with clear skies.'
                                );
                              } else if (prompt.includes('Urdu')) {
                                setVoiceSimulatedResponse(
                                  'Aapki aaj 3 meetings schedule hain: 11:00 AM Client Review, 2:30 PM UI Wireframes, aur 5:00 PM Tech Sync.'
                                );
                              } else {
                                setVoiceSimulatedResponse(
                                  'Customer inquiry logged. Webhook triggered to WhatsApp business engine with ticket ID #PK-9821.'
                                );
                              }
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                              voiceActivePrompt === prompt
                                ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300'
                                : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>

                      {/* Output Console */}
                      <div className="p-4 rounded-xl bg-black/40 border border-indigo-500/30 text-xs font-mono text-indigo-200">
                        <span className="text-neutral-500 uppercase block text-[10px] mb-1">SYNTHESIZED AI AUDIO RESPONSE:</span>
                        "{voiceSimulatedResponse}"
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. WHATSAPP BOT CHAT SIMULATOR */}
                {project.previewType === 'whatsappbot' && (
                  <div className="bg-[#0b141a] text-white rounded-2xl p-6 sm:p-8 border border-emerald-500/20 select-none shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-4 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">Automated Business Assistant</h4>
                          <span className="text-[10px] font-mono text-emerald-400">● Online / Auto-responder Active</span>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-neutral-400">CLOUD API WEBHOOKS</span>
                    </div>

                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto p-2">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs font-sans ${
                              msg.sender === 'user'
                                ? 'bg-emerald-700 text-white rounded-tr-none'
                                : 'bg-[#202c33] text-neutral-200 rounded-tl-none border border-white/10'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[9px] font-mono text-neutral-500 mt-0.5 px-1">{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Send Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type message to test bot triggers..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && chatInput.trim()) {
                            const userMsg = chatInput.trim();
                            setChatMessages((prev) => [
                              ...prev,
                              { sender: 'user', text: userMsg, time: 'Just now' },
                            ]);
                            setChatInput('');
                            setTimeout(() => {
                              setChatMessages((prev) => [
                                ...prev,
                                {
                                  sender: 'bot',
                                  text: `Auto-Ack: Thank you! We received "${userMsg}". Our support team will confirm shortly.`,
                                  time: 'Just now',
                                },
                              ]);
                            }, 600);
                          }
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-500 font-mono"
                      />
                      <button
                        onClick={() => {
                          if (chatInput.trim()) {
                            const userMsg = chatInput.trim();
                            setChatMessages((prev) => [
                              ...prev,
                              { sender: 'user', text: userMsg, time: 'Just now' },
                            ]);
                            setChatInput('');
                            setTimeout(() => {
                              setChatMessages((prev) => [
                                ...prev,
                                {
                                  sender: 'bot',
                                  text: `Auto-Ack: Thank you! We received "${userMsg}". Our support team will confirm shortly.`,
                                  time: 'Just now',
                                },
                              ]);
                            }, 600);
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono cursor-pointer"
                      >
                        SEND
                      </button>
                    </div>
                  </div>
                )}

                {/* 12. ANIME & TECH QUIZ SIMULATOR */}
                {project.previewType === 'quiz' && (
                  <div className="bg-[#15121e] text-white rounded-2xl p-6 sm:p-8 border border-pink-500/20 select-none shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400">
                          INTERACTIVE TRIVIA ENGINE
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          ANIME &amp; TECH SHOWDOWN
                        </h4>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-xs font-mono text-pink-300">
                        SCORE: {quizScore} / 1
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-4">
                      <p className="text-xs font-mono text-pink-300 mb-2">QUESTION 01 OF 05</p>
                      <h5 className="font-bold text-sm sm:text-base text-white">
                        Which CSS framework is built on a utility-first pattern and configured via PostCSS or Vite plugins?
                      </h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Bootstrap 5', 'Tailwind CSS', 'Bulma UI', 'Foundation'].map((opt, i) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setQuizSelectedOption(i);
                            if (i === 1) setQuizScore(1);
                          }}
                          className={`p-3 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer flex items-center justify-between ${
                            quizSelectedOption === i
                              ? i === 1
                                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                                : 'border-rose-500 bg-rose-500/20 text-rose-300'
                              : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/25'
                          }`}
                        >
                          <span>{opt}</span>
                          {quizSelectedOption === i && (
                            <span className="font-bold">{i === 1 ? '✓ CORRECT' : '✗ TRY AGAIN'}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 13. SECOND BRAIN AI ENGINE */}
                {project.previewType === 'secondbrain' && (
                  <div className="bg-[#121216] text-white rounded-2xl p-6 sm:p-8 border border-cyan-500/20 select-none shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                          VECTOR EMBEDDINGS &amp; MARKDOWN RETRIEVAL
                        </span>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
                          MR HACKER AI SECOND BRAIN
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-cyan-300">GEMINI POWERED</span>
                    </div>

                    <div className="relative mb-4">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Search semantic knowledge base..."
                        value={secondBrainQuery}
                        onChange={(e) => setSecondBrainQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                        <span className="text-[10px] text-cyan-400 uppercase">SYNTHESIZED ANSWER:</span>
                        <p className="mt-1 text-neutral-200 leading-relaxed font-sans">
                          React state handles internal component memory. In React 19, useState and useActionState ensure reactive renders without prop-drilling.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                        <span className="text-[10px] text-neutral-400 uppercase">CONNECTED CITATIONS:</span>
                        <ul className="mt-1 space-y-1 text-neutral-300">
                          <li>• notes/react-lifecycle.md (Match 98%)</li>
                          <li>• code/custom-hooks.ts (Match 94%)</li>
                          <li>• architecture/state-machines.md (Match 89%)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {project.previewType === 'portfolio' && (
                  /* Portfolio showcase */
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-neutral-900 border border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                      <p className="text-xs font-mono text-[#dfceb4] uppercase tracking-widest mb-1">
                        {project.subtitle}
                      </p>
                      <h4 className="font-anton text-3xl sm:text-5xl uppercase text-white">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                )}

                {/* Fallback for other projects */}
                {![
                  'burger',
                  'generators',
                  'academy',
                  'library',
                  'gazu',
                  'watches',
                  'headphones',
                  'classtrack',
                  'techeducators',
                  'smartway',
                  'appliancerepair',
                  'airdrawing',
                  'voiceos',
                  'whatsappbot',
                  'secondbrain',
                  'quiz',
                  'portfolio',
                ].includes(project.previewType || '') && (
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#181818] to-[#101010] border border-white/10 p-6 sm:p-8">
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <span className="text-[10px] font-mono text-[#dfceb4] uppercase tracking-widest mb-1">
                          {project.subtitle}
                        </span>
                        <h4 className="font-anton text-2xl sm:text-4xl uppercase text-white">
                          {project.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full bg-[#dfceb4] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-lg"
                        >
                          <span>VISIT LIVE DEPLOYMENT</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Technical Details View */
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfceb4] mb-2">
                    PROJECT OVERVIEW
                  </h4>
                  <p className="text-base text-neutral-300 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                      KEY HIGHLIGHTS
                    </h5>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-mono text-neutral-200">
                          <Check className="w-3.5 h-3.5 text-[#dfceb4]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                      TECHNOLOGY STACK
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#141414] flex items-center justify-between">
            <div className="text-xs font-mono text-neutral-500">
              CATEGORY: <span className="text-white">{project.category}</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#dfceb4] text-[#0c0c0c] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
