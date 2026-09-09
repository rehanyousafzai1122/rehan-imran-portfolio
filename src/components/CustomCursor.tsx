import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], button, a, input, textarea');

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (interactiveEl.tagName === 'A' || interactiveEl.tagName === 'BUTTON') {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#dfceb4] pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing Outer Ring / Capsule */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-colors duration-200 ${
          cursorText
            ? 'bg-[#dfceb4] text-[#0a0a0a] shadow-[0_0_20px_rgba(223,206,180,0.4)]'
            : isHovered
            ? 'bg-[#dfceb4]/20 border border-[#dfceb4] backdrop-blur-[1px]'
            : 'border border-[#dfceb4]/40 bg-transparent'
        }`}
        animate={{
          x: mousePosition.x - (cursorText ? 36 : isHovered ? 28 : 16),
          y: mousePosition.y - (cursorText ? 36 : isHovered ? 28 : 16),
          width: cursorText ? 72 : isHovered ? 56 : 32,
          height: cursorText ? 72 : isHovered ? 56 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 220, mass: 0.25 }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-wider uppercase select-none font-sans">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};
