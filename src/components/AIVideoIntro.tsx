import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Subtitles,
  Smartphone,
  Monitor,
  Sparkles,
  Radio,
  MapPin,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AIVideoIntroProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SubtitleSegment {
  start: number; // in seconds
  end: number;
  text: string;
  urduHint: string;
}

const SUBTITLE_TIMELINE: SubtitleSegment[] = [
  {
    start: 0,
    end: 5.2,
    text: "Hey! I'm Rehan Imran — Web & AI Developer from Rawalpindi, Pakistan.",
    urduHint: "Assalam-o-Alaikum! Main Rehan Imran hoon — Rawalpindi, Pakistan se Web & AI Developer.",
  },
  {
    start: 5.2,
    end: 11.0,
    text: "I build end-to-end systems from computer-vision air drawing and AI automation bots to school management portals and business platforms.",
    urduHint: "Main computer-vision air drawing, AI automation bots, school management systems aur commercial websites banata hoon.",
  },
  {
    start: 11.0,
    end: 16.5,
    text: "Skilled in Python, JavaScript, Node.js, Firebase, Google Sheets API, and Gemini AI integration.",
    urduHint: "Python, JavaScript, Node.js, Firebase aur Gemini AI integration ke sath practical solutions.",
  },
  {
    start: 16.5,
    end: 22.0,
    text: "Welcome to my portfolio. Explore my live projects, and let's build something extraordinary together.",
    urduHint: "Mere portfolio mein khush-aamdeed. Mere live projects check karein aur chalein mil kar kaam karein.",
  },
];

const FULL_TRANSCRIPT = SUBTITLE_TIMELINE.map((s) => s.text).join(' ');
const VIDEO_DURATION = 22; // seconds

export const AIVideoIntro = ({ isOpen, onClose }: AIVideoIntroProps) => {
  const { personalInfo } = usePortfolio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25>(1);
  const [showUrduSubtitles, setShowUrduSubtitles] = useState(false);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  // Synthesize background ambient sound bed
  const startAmbientAudio = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!droneOscRef.current) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // Low warm A2 drone
        gain.gain.setValueAtTime(0.015, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        droneOscRef.current = osc;
        droneGainRef.current = gain;
      }
    } catch {
      // AudioContext fallback
    }
  }, [isMuted]);

  const stopAmbientAudio = useCallback(() => {
    try {
      if (droneOscRef.current) {
        droneOscRef.current.stop();
        droneOscRef.current.disconnect();
        droneOscRef.current = null;
      }
      if (droneGainRef.current) {
        droneGainRef.current.disconnect();
        droneGainRef.current = null;
      }
    } catch {
      // Ignore
    }
  }, []);

  // Web Speech API initialization
  const startSpeech = useCallback((startTimeOffset = 0) => {
    if (isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    // Determine text to speak from current offset
    const activeSegments = SUBTITLE_TIMELINE.filter((s) => s.end > startTimeOffset);
    const textToSpeak = activeSegments.map((s) => s.text).join(' ');

    if (!textToSpeak.trim()) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.98 * playbackSpeed;
    utterance.pitch = 1.02;
    utterance.lang = 'en-US';

    // Pick best English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      // Finished speaking
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isMuted, playbackSpeed]);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      const intervalTime = 50;
      const step = (intervalTime / 1000) * playbackSpeed;

      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev + step >= VIDEO_DURATION) {
            setIsPlaying(false);
            stopSpeech();
            stopAmbientAudio();
            return VIDEO_DURATION;
          }
          return prev + step;
        });
      }, intervalTime);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, playbackSpeed, stopSpeech, stopAmbientAudio]);

  // Handle open / close lifecycle
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      setIsPlaying(true);
      startSpeech(0);
      startAmbientAudio();
    } else {
      setIsPlaying(false);
      stopSpeech();
      stopAmbientAudio();
    }
    return () => {
      stopSpeech();
      stopAmbientAudio();
    };
  }, [isOpen, startSpeech, stopSpeech, startAmbientAudio, stopAmbientAudio]);

  // Pause / Resume handler
  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeech();
      stopAmbientAudio();
    } else {
      if (currentTime >= VIDEO_DURATION) {
        setCurrentTime(0);
        setIsPlaying(true);
        startSpeech(0);
        startAmbientAudio();
      } else {
        setIsPlaying(true);
        startSpeech(currentTime);
        startAmbientAudio();
      }
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    startSpeech(0);
    startAmbientAudio();
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      stopSpeech();
      stopAmbientAudio();
    } else if (isPlaying) {
      startSpeech(currentTime);
      startAmbientAudio();
    }
  };

  // Find active subtitle
  const currentSegment = SUBTITLE_TIMELINE.find(
    (s) => currentTime >= s.start && currentTime < s.end
  ) || SUBTITLE_TIMELINE[SUBTITLE_TIMELINE.length - 1];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl select-none">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[95vh] bg-[#0c0c0c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold uppercase tracking-wider">AI INTRO REEL</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>REHAN IMRAN</span>
                <span>•</span>
                <span className="text-[#dfceb4]">PAKISTAN</span>
              </div>
            </div>

            {/* View Controls & Close */}
            <div className="flex items-center gap-2">
              {/* Aspect Ratio Switcher */}
              <div className="flex items-center bg-white/5 p-0.5 rounded-full border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    aspectRatio === '9:16'
                      ? 'bg-[#dfceb4] text-black font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Vertical Reel (9:16)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reel</span>
                </button>
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    aspectRatio === '16:9'
                      ? 'bg-[#dfceb4] text-black font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Studio Cinematic (16:9)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Studio</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] hover:bg-white/5 text-neutral-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close AI Video Intro"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage Viewport */}
          <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center p-3 sm:p-6 min-h-[380px] sm:min-h-[460px]">
            {/* Aspect container */}
            <div
              className={`relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl transition-all duration-500 ${
                aspectRatio === '9:16'
                  ? 'w-[280px] sm:w-[320px] md:w-[340px] aspect-[9/16]'
                  : 'w-full max-w-3xl aspect-[16/9]'
              }`}
            >
              {/* Dynamic Video Visual Frame (Generated image of Rehan with Ken Burns motion) */}
              <motion.div
                animate={{
                  scale: isPlaying ? [1, 1.06, 1.03] : 1,
                  x: isPlaying ? [0, -4, 2] : 0,
                  y: isPlaying ? [0, -3, 0] : 0,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="w-full h-full"
              >
                <img
                  src={
                    aspectRatio === '9:16'
                      ? personalInfo.avatarPortrait
                      : (personalInfo.studioScene || personalInfo.avatarPortrait)
                  }
                  alt={`${personalInfo.name} AI Video Intro`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
              </motion.div>

              {/* Cinematic Vignette & Cyber Lighting Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

              {/* Subtle Scanlines & Code Watermark */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />

              {/* HUD Header Overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-10">
                {/* Status & Live Telemetry */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
                    <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                    <span>REC ● {formatTime(currentTime)} / {formatTime(VIDEO_DURATION)}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-neutral-400">
                    <span className="text-[#dfceb4]">PROFILE:</span> REHAN IMRAN
                  </div>
                </div>

                {/* Quality Badge */}
                <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                  <span>4K 60FPS</span>
                </div>
              </div>

              {/* Center Play Overlay when Paused */}
              {!isPlaying && (
                <div
                  onClick={togglePlayPause}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer group"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dfceb4] text-black flex items-center justify-center shadow-[0_0_30px_#dfceb4] transition-transform"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black translate-x-0.5" />
                  </motion.div>
                  <p className="mt-3 text-xs font-mono uppercase tracking-[0.2em] text-[#dfceb4] drop-shadow-md">
                    {currentTime >= VIDEO_DURATION ? 'REPLAY INTRO' : 'PLAY AI INTRO'}
                  </p>
                </div>
              )}

              {/* Center Spectrum Equalizer Bars during playback */}
              {isPlaying && (
                <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-1 pointer-events-none opacity-60">
                  {[18, 28, 44, 22, 36, 16].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{ width: isMuted ? 8 : [8, height, 12, height * 0.8, 8] }}
                      transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-1 rounded-full bg-[#dfceb4]"
                    />
                  ))}
                </div>
              )}

              {/* Dynamic Subtitles Overlay */}
              {showSubtitles && (
                <div className="absolute bottom-6 left-3 right-3 sm:left-4 sm:right-4 z-20 flex flex-col items-center text-center pointer-events-none">
                  <div className="bg-black/85 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 max-w-[95%] shadow-lg">
                    <p className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow leading-snug">
                      "{currentSegment?.text}"
                    </p>
                    {showUrduSubtitles && (
                      <p className="mt-1 text-[11px] font-sans text-[#dfceb4] tracking-normal opacity-90 border-t border-white/10 pt-1">
                        {currentSegment?.urduHint}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Video Controls & Scrub Bar */}
          <div className="px-5 sm:px-7 py-4 border-t border-white/10 bg-[#121212]/95 backdrop-blur-md">
            {/* Timeline Progress Bar */}
            <div className="w-full mb-3">
              <div
                className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  const newTime = ratio * VIDEO_DURATION;
                  setCurrentTime(newTime);
                  if (isPlaying) {
                    startSpeech(newTime);
                  }
                }}
              >
                {/* Active progress */}
                <div
                  className="h-full bg-[#dfceb4] transition-all duration-100"
                  style={{ width: `${(currentTime / VIDEO_DURATION) * 100}%` }}
                />
              </div>

              {/* Time Indicators */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[#dfceb4] font-medium">Rehan Imran — Personal Intro</span>
                <span>{formatTime(VIDEO_DURATION)}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Left Controls: Play, Restart, Sound */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePlayPause}
                  className="p-2.5 sm:p-3 rounded-full bg-[#dfceb4] text-black hover:bg-white transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-black" />
                  ) : (
                    <Play className="w-4 h-4 fill-black translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] text-neutral-300 hover:text-white transition-all cursor-pointer"
                  title="Restart Intro"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleToggleMute}
                  className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] text-neutral-300 hover:text-white transition-all cursor-pointer"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#dfceb4]" />}
                </button>
              </div>

              {/* Center / Right Toggles: Captions, Urdu Hint, Speed */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
                {/* Subtitles CC Toggle */}
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    showSubtitles
                      ? 'border-[#dfceb4] bg-[#dfceb4]/10 text-[#dfceb4]'
                      : 'border-white/10 text-neutral-400 hover:text-white'
                  }`}
                  title="Toggle English Subtitles"
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>CC</span>
                </button>

                {/* Roman Urdu translation subtitle toggle */}
                <button
                  onClick={() => setShowUrduSubtitles(!showUrduSubtitles)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    showUrduSubtitles
                      ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
                      : 'border-white/10 text-neutral-400 hover:text-white'
                  }`}
                  title="Roman Urdu Subtitle Translation"
                >
                  <span>URDU</span>
                </button>

                {/* Speed toggle */}
                <button
                  onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.25 : 1)}
                  className="px-2.5 py-1.5 rounded-full border border-white/10 text-neutral-300 hover:border-[#dfceb4] transition-all cursor-pointer"
                  title="Toggle Speed"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>

            {/* Quick Overview Summary Pills for Rehan */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#dfceb4]" />
                <span>React • Tailwind • Framer Motion • SEO</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Open for Client Projects</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
