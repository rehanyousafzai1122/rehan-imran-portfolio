import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Smartphone,
  Monitor,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AIVideoIntroProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIVideoIntro = ({ isOpen, onClose }: AIVideoIntroProps) => {
  const { personalInfo } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25>(1);

  const videoSrc = personalInfo.videoIntroUrl || '/assets/rehan_intro.mp4';
  const posterSrc = personalInfo.videoIntroPoster || personalInfo.avatarPortrait;

  // Play / pause the real <video> element whenever the modal opens or closes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      video.currentTime = 0;
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = isMuted;
  }, [isMuted]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (video.ended) video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const handleToggleMute = () => setIsMuted((prev) => !prev);

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs)) return '00:00';
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
                <span className="font-bold uppercase tracking-wider">INTRO REEL</span>
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
                  title="Widescreen (16:9)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Wide</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="p-2 rounded-full border border-white/10 hover:border-[#dfceb4] hover:bg-white/5 text-neutral-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close Video Intro"
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
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                playsInline
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlayPause}
                className={`w-full h-full cursor-pointer ${
                  aspectRatio === '9:16' ? 'object-cover' : 'object-contain bg-black'
                }`}
              />

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
                    {currentTime > 0 && currentTime >= duration && duration > 0 ? 'REPLAY INTRO' : 'PLAY INTRO'}
                  </p>
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
                  const video = videoRef.current;
                  if (!video || !duration) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  video.currentTime = ratio * duration;
                }}
              >
                {/* Active progress */}
                <div
                  className="h-full bg-[#dfceb4] transition-all duration-100"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              {/* Time Indicators */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[#dfceb4] font-medium">Rehan Imran — Personal Intro</span>
                <span>{formatTime(duration)}</span>
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

              {/* Right Toggle: Speed */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
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
