import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'counting' | 'greeting' | 'revealing' | 'done'>('counting');

  useEffect(() => {
    // Smooth, dynamic counter progression mirroring the video timing (0% -> 13% -> 55% -> 91% -> 99% -> 100%)
    let current = 0;
    const interval = setInterval(() => {
      // Dynamic increment to mimic organic loading
      const step = current < 30 ? 2 : current < 75 ? 4 : current < 95 ? 3 : 1;
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Transition to cursive "hello" stage
        setTimeout(() => {
          setStage('greeting');
          // Then transition to shutter reveal
          setTimeout(() => {
            setStage('revealing');
            setTimeout(() => {
              setStage('done');
              onComplete();
            }, 800);
          }, 1100);
        }, 400);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (stage === 'done') return null;

  // Circular calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <div
        id="site-preloader"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden select-none"
      >
        {/* Shutter Reveal Panels (expanding outward like the video at 0:13) */}
        {stage === 'revealing' && (
          <div className="absolute inset-0 z-50 flex pointer-events-none">
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformOrigin: 'left' }}
              className="w-1/2 h-full bg-[#dfceb4]"
            />
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformOrigin: 'right' }}
              className="w-1/2 h-full bg-[#dfceb4]"
            />
          </div>
        )}

        {/* Ambient subtle light gradient */}
        <div className="absolute w-96 h-96 rounded-full bg-[#dfceb4]/5 blur-[120px] pointer-events-none" />

        {/* Center Loading Content */}
        {stage === 'counting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Elegant Serif Percentage */}
            <div className="relative z-10 font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#dfceb4] drop-shadow-md mb-2">
              <span>{progress}</span>
              <span className="text-3xl sm:text-4xl text-[#dfceb4]/80 ml-1 font-serif">%</span>
            </div>

            {/* Circular Progress Ring with gold arc */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                {/* Background Ring Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="text-[#202020]"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Active Glowing Arc */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#dfceb4"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                />
              </svg>

              {/* Glowing Particle Head */}
              <motion.div
                animate={{
                  rotate: (progress / 100) * 360 - 90,
                }}
                transition={{ ease: 'linear', duration: 0.05 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="absolute w-3.5 h-3.5 rounded-full bg-[#fff5e6] shadow-[0_0_12px_#dfceb4]"
                  style={{ transform: `translate(${radius}px, 0)` }}
                />
              </motion.div>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#dfceb4]/50 font-mono">
              INITIALIZING CREATIVE SYSTEM
            </p>
          </motion.div>
        )}

        {/* Cursive "hello" greeting (as seen in video at 0:10) */}
        {stage === 'greeting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="font-script text-6xl sm:text-7xl md:text-8xl text-[#dfceb4] tracking-wide filter drop-shadow-[0_0_20px_rgba(223,206,180,0.3)]">
              hello
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-[2px] bg-[#dfceb4]/40 mt-1 rounded-full"
            />
          </motion.div>
        )}

        {/* Discreet skip button */}
        <button
          id="skip-preloader-button"
          onClick={() => {
            setStage('done');
            onComplete();
          }}
          className="absolute bottom-8 right-8 text-[11px] font-mono tracking-widest text-[#ece8e1]/40 hover:text-[#dfceb4] transition-colors uppercase cursor-pointer px-3 py-1.5 rounded-full border border-white/10 hover:border-[#dfceb4]/40 backdrop-blur-sm"
        >
          Skip Intro ↗
        </button>
      </div>
    </AnimatePresence>
  );
};
