import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Twitter, MapPin, Copy, Check, Send, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactSection = () => {
  const { personalInfo } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [pakistanTime, setPakistanTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Creative Development',
    budget: '$2,000 - $5,000',
    message: '',
  });

  // Live Pakistan Local Time (UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setPakistanTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#dfceb4', '#ffffff', '#d4af37'],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 1000);
  };

  const services = [
    'Creative Development',
    'Interactive Web',
    'Motion & Animation',
    'UI / UX Design',
    'Full Product Build',
  ];

  const budgets = ['$1k - $3k', '$3k - $7k', '$7k+', 'Undisclosed'];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0d0d0d] text-[#ece8e1] py-28 px-6 sm:px-12 md:px-16 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#dfceb4]">
            <span className="px-2 py-0.5 rounded border border-[#dfceb4]/30 bg-[#dfceb4]/5">04</span>
            <span>GET IN TOUCH</span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-400">INITIATE COLLABORATION</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">CURRENTLY ACCEPTING NEW WORK</span>
          </div>
        </div>

        {/* Big Statement (mirroring video 1:52) */}
        <div className="mb-16">
          <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider uppercase text-white mb-4">
            LET'S CREATE <span className="text-[#dfceb4]">SOMETHING</span> MEANINGFUL.
          </h2>
          <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl font-sans">
            Have a project in mind, a question, or simply want to talk about an idea? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Grid: Left Cards & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Instant Contact Cards (mirroring video 1:54) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Rehan Profile Quick Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#dfceb4]/40 transition-colors flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#dfceb4]/40 bg-neutral-900 shrink-0 shadow-md">
                <img
                  src={personalInfo.avatarPortrait}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] font-mono tracking-widest uppercase text-[#dfceb4]">
                    DIRECT CONNECT • AVAILABLE
                  </p>
                </div>
                <h4 className="text-base font-bold text-white uppercase tracking-wide truncate">
                  {personalInfo.name}
                </h4>
                <p className="text-xs font-mono text-neutral-400 truncate">
                  {personalInfo.title} • Pakistan
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#dfceb4]/40 transition-colors group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#dfceb4]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                      EMAIL ME
                    </p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-[#dfceb4] transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  data-cursor={copied ? 'COPIED' : 'COPY'}
                  className="p-2.5 rounded-full border border-white/10 hover:border-[#dfceb4] hover:bg-white/5 transition-all text-neutral-400 hover:text-white cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <p className="text-[11px] font-mono text-emerald-400 mt-2">
                  ✓ Copied to clipboard! Ready to paste.
                </p>
              )}
            </div>

            {/* Connect / Socials Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#dfceb4]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#dfceb4]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                      CONNECT & CODE
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white">
                      Direct Channels
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GITHUB"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-mono text-neutral-300 hover:border-[#dfceb4] hover:text-[#dfceb4] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub ({personalInfo.githubUsername})</span>
                </a>
                <a
                  href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="WHATSAPP"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-mono text-neutral-300 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>WhatsApp ({personalInfo.phone})</span>
                </a>
              </div>
            </div>

            {/* Location & Real-Time Clock Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#dfceb4]/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#dfceb4]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                      BASED IN
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white">
                      Pakistan (Available Worldwide)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#dfceb4]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{pakistanTime || '12:00:00 PM'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (mirroring video 1:55) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] shadow-xl backdrop-blur-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#dfceb4]/10 border border-[#dfceb4] flex items-center justify-center text-[#dfceb4]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-anton text-3xl sm:text-4xl uppercase text-white tracking-wide">
                    Message Dispatched!
                  </h3>
                  <p className="text-neutral-300 max-w-md text-sm font-sans">
                    Thank you, <span className="text-[#dfceb4] font-semibold">{formData.name}</span>. Your message has been received. I usually respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        service: 'Creative Development',
                        budget: '$2,000 - $5,000',
                        message: '',
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-white hover:border-[#dfceb4] hover:text-[#dfceb4] transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service selection pills */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                      I'm Interested In:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((srv) => (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => setFormData({ ...formData, service: srv })}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                            formData.service === srv
                              ? 'bg-[#dfceb4] text-[#0c0c0c] font-bold shadow-sm'
                              : 'bg-white/5 border border-white/10 text-neutral-300 hover:border-white/30'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#dfceb4] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#dfceb4] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget Options */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Expected Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                            formData.budget === b
                              ? 'bg-white/20 border border-[#dfceb4] text-[#dfceb4] font-bold'
                              : 'bg-white/5 border border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Message / Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or design goals..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#dfceb4] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="SEND"
                    className="w-full py-4 rounded-xl bg-[#dfceb4] hover:bg-white text-[#0c0c0c] font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>SENDING INQUIRY...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
