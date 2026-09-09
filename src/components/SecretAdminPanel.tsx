import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Unlock,
  X,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  ExternalLink,
  Download,
  FileJson,
  KeyRound,
  Eye,
  EyeOff,
  Video,
  User,
  FolderGit2,
  Settings,
  Sparkles,
  Search,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';

export const SecretAdminPanel: React.FC = () => {
  const {
    personalInfo,
    projects,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    setIsAuthenticated,
    verifyPassword,
    changeAdminPassword,
    updatePersonalInfo,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    resetToDefaults,
    exportData,
    importData,
  } = usePortfolio();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Active Tab: 'projects' | 'media' | 'profile' | 'settings'
  const [activeTab, setActiveTab] = useState<'projects' | 'media' | 'profile' | 'settings'>('projects');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // ----------------------------------------------------
  // Projects Management State
  // ----------------------------------------------------
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');

  // Form State for Project Editing/Adding
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '',
    number: '01',
    title: '',
    subtitle: '',
    category: 'Interactive Web',
    status: 'COMPLETE',
    year: '2026',
    description: '',
    tags: [],
    image: '',
    liveUrl: '',
    previewType: 'default',
    accentColor: '#DFCEB4',
    highlights: [],
  });

  const [tagsInput, setTagsInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  // Open Edit Project
  const handleStartEditProject = (proj: Project) => {
    setEditingProject(proj);
    setIsAddingProject(false);
    setProjectForm(proj);
    setTagsInput(proj.tags ? proj.tags.join(', ') : '');
    setHighlightsInput(proj.highlights ? proj.highlights.join('\n') : '');
  };

  // Open Add Project
  const handleStartAddProject = () => {
    const nextNum = (projects.length + 1).toString().padStart(2, '0');
    const newProj: Partial<Project> = {
      id: `custom-project-${Date.now()}`,
      number: nextNum,
      title: 'New Innovation Project',
      subtitle: 'WEB & AI DIGITAL SYSTEM',
      category: 'Interactive Web',
      status: 'COMPLETE',
      year: '2026',
      description: 'A cutting-edge modern digital project engineered with modern architecture and clean UI.',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '/assets/rehan_maroon_workspace.jpg',
      liveUrl: 'https://',
      previewType: 'default',
      accentColor: '#DFCEB4',
      highlights: ['Responsive modern UI architecture', 'High performance rendering engine'],
    };
    setEditingProject(null);
    setIsAddingProject(true);
    setProjectForm(newProj);
    setTagsInput('React, TypeScript, Tailwind CSS');
    setHighlightsInput('Responsive modern UI architecture\nHigh performance rendering engine');
  };

  // Save Project (Add or Edit)
  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.title.trim()) {
      showToast('Project title is required!');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const highlightsArray = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const completeProject: Project = {
      id: projectForm.id || `proj-${Date.now()}`,
      number: projectForm.number || '01',
      title: projectForm.title,
      subtitle: projectForm.subtitle || 'DIGITAL WEB & AI SOLUTION',
      category: (projectForm.category as Project['category']) || 'Interactive Web',
      status: projectForm.status || 'COMPLETE',
      year: projectForm.year || '2026',
      description: projectForm.description || '',
      tags: tagsArray.length > 0 ? tagsArray : ['Web Development'],
      image: projectForm.image || '/assets/rehan_maroon_workspace.jpg',
      liveUrl: projectForm.liveUrl || '',
      previewType: projectForm.previewType || 'default',
      accentColor: projectForm.accentColor || '#DFCEB4',
      highlights: highlightsArray.length > 0 ? highlightsArray : ['Designed for maximum usability'],
    };

    if (isAddingProject) {
      addProject(completeProject);
      showToast('New Project Added Successfully!');
    } else if (editingProject) {
      updateProject(editingProject.id, completeProject);
      showToast('Project Updated Successfully!');
    }

    setIsAddingProject(false);
    setEditingProject(null);
  };

  // File Upload Helper: converts file into base64 Data URL
  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setProjectForm((prev) => ({ ...prev, image: dataUrl }));
        showToast('Image uploaded and set as preview!');
      }
    };
    reader.readAsDataURL(file);
  };

  // ----------------------------------------------------
  // Profile Form State
  // ----------------------------------------------------
  const [profileForm, setProfileForm] = useState(personalInfo);

  // Sync profileForm when personalInfo updates
  React.useEffect(() => {
    setProfileForm(personalInfo);
  }, [personalInfo]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    showToast('Personal Profile Details Updated!');
  };

  // Avatar Image Upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updatePersonalInfo({ avatarPortrait: dataUrl });
        setProfileForm((prev) => ({ ...prev, avatarPortrait: dataUrl }));
        showToast('New Profile Avatar Image Uploaded & Applied!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Studio / Workspace Image Upload
  const handleStudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updatePersonalInfo({ studioScene: dataUrl });
        setProfileForm((prev) => ({ ...prev, studioScene: dataUrl }));
        showToast('Studio / Workspace Image Uploaded & Applied!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Intro Video Upload (About section "video intro" player)
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_BYTES = 5 * 1024 * 1024; // ~5MB — safe ceiling for localStorage
    if (file.size > MAX_BYTES) {
      showToast('Video too large for browser storage — paste a hosted URL instead.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updatePersonalInfo({ videoIntroUrl: dataUrl });
        showToast('New Intro Video Uploaded & Applied!');
      }
    };
    reader.readAsDataURL(file);
  };

  // ----------------------------------------------------
  // Security & Settings State
  // ----------------------------------------------------
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [jsonImportText, setJsonImportText] = useState('');

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      showToast('Password must be at least 4 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }
    changeAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    showToast('Admin Passcode Changed Successfully!');
  };

  const handleExportJson = () => {
    const json = exportData();
    navigator.clipboard.writeText(json);
    showToast('JSON Configuration copied to clipboard!');

    // Also download as a file
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rehan-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonImportText.trim()) return;
    const res = importData(jsonImportText);
    if (res.success) {
      showToast('Configuration Imported Successfully!');
      setJsonImportText('');
    } else {
      showToast(`Import Failed: ${res.error}`);
    }
  };

  const handleResetFactory = () => {
    if (window.confirm('Are you sure you want to reset all projects and details to original defaults?')) {
      resetToDefaults();
      showToast('Portfolio Reset to Original Defaults!');
    }
  };

  // Authentication Submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = verifyPassword(passwordInput);
    if (ok) {
      setAuthError(false);
      setPasswordInput('');
      showToast('Access Granted! Welcome Rehan.');
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const studioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const projectImgInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Darkened Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-full bg-[#dfceb4] text-black font-mono text-xs font-bold tracking-wider shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <Check className="w-4 h-4 text-black" />
            <span>{toastMessage}</span>
          </motion.div>
        )}

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[90vh] max-h-[850px] bg-[#111111] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161616]/90">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#dfceb4]/10 border border-[#dfceb4]/30 flex items-center justify-center text-[#dfceb4]">
                {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#dfceb4] font-bold">
                    REHAN IMRAN • SECRET CONTROL VAULT
                  </h3>
                </div>
                <p className="text-[10px] font-mono text-neutral-400">
                  {isAuthenticated
                    ? 'SYSTEM OVERRIDE ACTIVE • LIVE EDIT & PERSISTENCE ENGINE'
                    : 'ENCRYPTED PORTFOLIO MANAGEMENT CONSOLE'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    showToast('Session locked.');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
                  title="Lock Session"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              )}

              <button
                onClick={() => setIsAdminOpen(false)}
                className="w-8 h-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {!isAuthenticated ? (
              /* ==================================================== */
              /* Passcode Unlock Screen                               */
              /* ==================================================== */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md w-full p-8 rounded-3xl border border-white/10 bg-[#141414] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dfceb4] to-transparent opacity-60" />

                  <div className="w-16 h-16 rounded-2xl bg-[#dfceb4]/10 border border-[#dfceb4]/30 flex items-center justify-center mx-auto mb-6 text-[#dfceb4]">
                    <KeyRound className="w-8 h-8" />
                  </div>

                  <h4 className="font-anton text-2xl uppercase tracking-wider text-white mb-2">
                    AUTHENTICATION REQUIRED
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 mb-6 leading-relaxed">
                    Enter the master access passcode to edit projects, upload media, or change personal credentials.
                  </p>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter master passcode..."
                        autoFocus
                        className={`w-full px-4 py-3.5 rounded-xl bg-black/60 border font-mono text-sm tracking-wider text-white placeholder-neutral-500 focus:outline-none transition-all ${
                          authError
                            ? 'border-rose-500 focus:border-rose-500 ring-2 ring-rose-500/20 animate-shake'
                            : 'border-white/15 focus:border-[#dfceb4] ring-2 ring-transparent focus:ring-[#dfceb4]/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {authError && (
                      <p className="text-xs font-mono text-rose-400 flex items-center justify-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Invalid passcode. Please try again.</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>UNLOCK ADMIN PANEL</span>
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>DEFAULT: rehan1122</span>
                    <span>HOTKEY: Ctrl+Shift+A</span>
                  </div>
                </div>
              </div>
            ) : (
              /* ==================================================== */
              /* Authenticated Control Console                        */
              /* ==================================================== */
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Sidebar Navigation */}
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#141414] p-4 flex md:flex-col gap-2 shrink-0 overflow-x-auto">
                  <button
                    onClick={() => {
                      setActiveTab('projects');
                      setIsAddingProject(false);
                      setEditingProject(null);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap text-left ${
                      activeTab === 'projects'
                        ? 'bg-[#dfceb4] text-black font-bold shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FolderGit2 className="w-4 h-4 shrink-0" />
                    <span>Projects ({projects.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('media')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap text-left ${
                      activeTab === 'media'
                        ? 'bg-[#dfceb4] text-black font-bold shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4 shrink-0" />
                    <span>Photos & Media</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap text-left ${
                      activeTab === 'profile'
                        ? 'bg-[#dfceb4] text-black font-bold shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <User className="w-4 h-4 shrink-0" />
                    <span>Profile & Bio</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap text-left ${
                      activeTab === 'settings'
                        ? 'bg-[#dfceb4] text-black font-bold shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Settings className="w-4 h-4 shrink-0" />
                    <span>Security & Backup</span>
                  </button>

                  <div className="hidden md:block mt-auto pt-4 border-t border-white/10 text-[10px] font-mono text-neutral-500">
                    <p className="text-[#dfceb4] font-bold">LOCAL PERSISTENCE</p>
                    <p>Changes save automatically to browser storage.</p>
                  </div>
                </div>

                {/* Right Scrollable Main Canvas */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0e0e0e]">
                  {/* ==================================================== */}
                  {/* TAB 1: PROJECTS MANAGER                              */}
                  {/* ==================================================== */}
                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      {!isAddingProject && !editingProject ? (
                        <>
                          {/* Top Controls: Search + Add */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                            <div className="relative flex-1">
                              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                              <input
                                type="text"
                                value={projectSearchQuery}
                                onChange={(e) => setProjectSearchQuery(e.target.value)}
                                placeholder="Search projects by title, tag, or category..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#dfceb4]"
                              />
                            </div>

                            <button
                              onClick={handleStartAddProject}
                              className="px-5 py-2.5 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shrink-0 cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add New Project</span>
                            </button>
                          </div>

                          {/* Projects List */}
                          <div className="space-y-3">
                            {projects
                              .filter((p) => {
                                if (!projectSearchQuery.trim()) return true;
                                const q = projectSearchQuery.toLowerCase();
                                return (
                                  p.title.toLowerCase().includes(q) ||
                                  p.category.toLowerCase().includes(q) ||
                                  (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
                                );
                              })
                              .map((proj, idx) => (
                                <div
                                  key={proj.id}
                                  className="p-4 rounded-2xl bg-[#161616] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                >
                                  {/* Left Thumbnail & Info */}
                                  <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                                      <img
                                        src={proj.image}
                                        alt={proj.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-[10px] font-mono text-[#dfceb4] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                                          #{proj.number}
                                        </span>
                                        <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-white/5">
                                          {proj.category}
                                        </span>
                                        {proj.status && (
                                          <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                            {proj.status}
                                          </span>
                                        )}
                                      </div>
                                      <h4 className="text-sm font-bold text-white uppercase tracking-wide truncate">
                                        {proj.title}
                                      </h4>
                                      <p className="text-xs font-mono text-neutral-400 truncate">
                                        {proj.liveUrl || 'No live URL configured'}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Right Action Buttons */}
                                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                    {/* Reorder Buttons */}
                                    <button
                                      onClick={() => reorderProjects(idx, idx - 1)}
                                      disabled={idx === 0}
                                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors cursor-pointer"
                                      title="Move Up"
                                    >
                                      <ArrowUp className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => reorderProjects(idx, idx + 1)}
                                      disabled={idx === projects.length - 1}
                                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors cursor-pointer"
                                      title="Move Down"
                                    >
                                      <ArrowDown className="w-4 h-4" />
                                    </button>

                                    {/* Edit Button */}
                                    <button
                                      onClick={() => handleStartEditProject(proj)}
                                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-[#dfceb4] hover:text-black font-mono text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                      <span>Edit</span>
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      onClick={() => {
                                        if (window.confirm(`Delete project "${proj.title}"?`)) {
                                          deleteProject(proj.id);
                                          showToast('Project deleted.');
                                        }
                                      }}
                                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                                      title="Delete Project"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </>
                      ) : (
                        /* Project Edit / Add Form */
                        <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-6">
                          <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                              <h4 className="font-anton text-xl uppercase tracking-wide text-white">
                                {isAddingProject ? 'Add New Project' : `Edit: ${projectForm.title}`}
                              </h4>
                              <p className="text-xs font-mono text-neutral-400">
                                Configure project details, live URL, and preview visuals.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setIsAddingProject(false);
                                setEditingProject(null);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-400 hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>

                          <form onSubmit={handleSaveProjectForm} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                  Project Title *
                                </label>
                                <input
                                  type="text"
                                  value={projectForm.title || ''}
                                  onChange={(e) =>
                                    setProjectForm((prev) => ({ ...prev, title: e.target.value }))
                                  }
                                  placeholder="e.g. Smart AI Assistant"
                                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                  Subtitle / Tagline
                                </label>
                                <input
                                  type="text"
                                  value={projectForm.subtitle || ''}
                                  onChange={(e) =>
                                    setProjectForm((prev) => ({ ...prev, subtitle: e.target.value }))
                                  }
                                  placeholder="e.g. COMPUTER VISION & NLP ENGINE"
                                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                  Category
                                </label>
                                <select
                                  value={projectForm.category || 'Interactive Web'}
                                  onChange={(e) =>
                                    setProjectForm((prev) => ({
                                      ...prev,
                                      category: e.target.value as Project['category'],
                                    }))
                                  }
                                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                                >
                                  <option value="Interactive Web">Interactive Web</option>
                                  <option value="AI & Automation">AI & Automation</option>
                                  <option value="Creative Development">Creative Development</option>
                                  <option value="UI / UX">UI / UX</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                  Status Badge
                                </label>
                                <select
                                  value={projectForm.status || 'COMPLETE'}
                                  onChange={(e) =>
                                    setProjectForm((prev) => ({
                                      ...prev,
                                      status: e.target.value as Project['status'],
                                    }))
                                  }
                                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                                >
                                  <option value="COMPLETE">COMPLETE</option>
                                  <option value="IN PROGRESS">IN PROGRESS</option>
                                  <option value="IN DEVELOPMENT">IN DEVELOPMENT</option>
                                  <option value="ONGOING">ONGOING</option>
                                  <option value="CONCEPT">CONCEPT</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                  Live Deployment URL
                                </label>
                                <input
                                  type="url"
                                  value={projectForm.liveUrl || ''}
                                  onChange={(e) =>
                                    setProjectForm((prev) => ({ ...prev, liveUrl: e.target.value }))
                                  }
                                  placeholder="https://yourproject.netlify.app"
                                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                  Preview Display Template
                                </label>
                                <select
                                  value={projectForm.previewType || 'default'}
                                  onChange={(e) =>
                                    setProjectForm((prev) => ({
                                      ...prev,
                                      previewType: e.target.value,
                                    }))
                                  }
                                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                                >
                                  <option value="default">Default Live Showcase</option>
                                  <option value="classtrack">ClassTrack Attendance Console</option>
                                  <option value="techeducators">Tech Educators Admissions Leads</option>
                                  <option value="smartway">Smart Way Home Automation</option>
                                  <option value="appliancerepair">Appliance Repair Florida SEO</option>
                                  <option value="airdrawing">AI Virtual Air Drawing</option>
                                  <option value="voiceos">VoiceOS Pakistan Assistant</option>
                                  <option value="whatsappbot">WhatsApp Automation Bot</option>
                                  <option value="secondbrain">AI Second Brain Knowledge</option>
                                  <option value="quiz">Interactive Anime/Tech Quiz</option>
                                  <option value="portfolio">Portfolio Showcase Reel</option>
                                </select>
                              </div>
                            </div>

                            {/* Project Image & Upload */}
                            <div>
                              <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                Project Image (URL or Upload from Device)
                              </label>
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <input
                                  type="text"
                                  value={projectForm.image || ''}
                                  onChange={(e) =>
                                    setProjectForm((prev) => ({ ...prev, image: e.target.value }))
                                  }
                                  placeholder="/assets/rehan_maroon_workspace.jpg or https://..."
                                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                                />
                                <input
                                  ref={projectImgInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleProjectImageUpload}
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => projectImgInputRef.current?.click()}
                                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                                >
                                  <Upload className="w-4 h-4" />
                                  <span>Upload Device Image</span>
                                </button>
                              </div>
                              {projectForm.image && (
                                <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-white/15 bg-neutral-900">
                                  <img
                                    src={projectForm.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Tags Input */}
                            <div>
                              <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                Technologies / Tags (Comma separated)
                              </label>
                              <input
                                type="text"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                placeholder="React, Node.js, Firebase, OpenCV, Tailwind"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              />
                            </div>

                            {/* Description */}
                            <div>
                              <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                Project Description / Overview
                              </label>
                              <textarea
                                value={projectForm.description || ''}
                                onChange={(e) =>
                                  setProjectForm((prev) => ({ ...prev, description: e.target.value }))
                                }
                                rows={3}
                                placeholder="Describe the technical architecture, problem solved, and key tools..."
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              />
                            </div>

                            {/* Highlights Input */}
                            <div>
                              <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                                Key Highlights / Feature Bullets (One per line)
                              </label>
                              <textarea
                                value={highlightsInput}
                                onChange={(e) => setHighlightsInput(e.target.value)}
                                rows={3}
                                placeholder="100/100 Rank Math SEO Audit&#10;Integrated WhatsApp bot workflow&#10;Sub-second responsive UI"
                                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              />
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAddingProject(false);
                                  setEditingProject(null);
                                }}
                                className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                              >
                                <Save className="w-4 h-4" />
                                <span>Save Project</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ==================================================== */}
                  {/* TAB 2: PHOTOS & MEDIA                                */}
                  {/* ==================================================== */}
                  {activeTab === 'media' && (
                    <div className="space-y-8">
                      {/* Section Header */}
                      <div>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mb-1">
                          Photos, Avatars & Media Assets
                        </h4>
                        <p className="text-xs font-mono text-neutral-400">
                          Upload new pictures directly from your mobile or PC, or input external image URLs.
                        </p>
                      </div>

                      {/* Card 1: Primary Developer Portrait */}
                      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-[#dfceb4] uppercase tracking-widest">
                              ACTIVE PROFILE AVATAR
                            </span>
                            <h5 className="text-base font-bold text-white uppercase">
                              Hero, About, Menu & Contact Portrait
                            </h5>
                          </div>
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            LIVE ON SITE
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                          <div className="w-32 h-44 rounded-2xl overflow-hidden border border-[#dfceb4]/30 bg-neutral-900 shrink-0 shadow-lg relative group">
                            <img
                              src={personalInfo.avatarPortrait}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover object-top"
                            />
                          </div>

                          <div className="flex-1 space-y-3 w-full">
                            <div>
                              <label className="block text-xs font-mono text-neutral-400 mb-1">
                                Image URL / Path:
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={personalInfo.avatarPortrait}
                                  onChange={(e) => updatePersonalInfo({ avatarPortrait: e.target.value })}
                                  placeholder="/assets/rehan_maroon_portrait.jpg"
                                  className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#dfceb4]"
                                />
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              <input
                                ref={avatarInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => avatarInputRef.current?.click()}
                                className="px-4 py-2 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                              >
                                <Upload className="w-4 h-4" />
                                <span>Upload New Photo</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  updatePersonalInfo({
                                    avatarPortrait: '/assets/rehan_maroon_portrait.jpg',
                                  });
                                  showToast('Restored Maroon Shirt Portrait');
                                }}
                                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-mono text-xs transition-colors"
                              >
                                Revert to Default
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Workspace & Studio Scene */}
                      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-[#dfceb4] uppercase tracking-widest">
                              DEVELOPER WORKSPACE PHOTO
                            </span>
                            <h5 className="text-base font-bold text-white uppercase">
                              Studio & Video Intro Backdrop
                            </h5>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                          <div className="w-44 h-28 rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shrink-0 shadow-lg">
                            <img
                              src={personalInfo.studioScene}
                              alt="Studio Scene Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 space-y-3 w-full">
                            <div>
                              <label className="block text-xs font-mono text-neutral-400 mb-1">
                                Image URL / Path:
                              </label>
                              <input
                                type="text"
                                value={personalInfo.studioScene}
                                onChange={(e) => updatePersonalInfo({ studioScene: e.target.value })}
                                placeholder="/assets/rehan_maroon_workspace.jpg"
                                className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#dfceb4]"
                              />
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              <input
                                ref={studioInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleStudioUpload}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => studioInputRef.current?.click()}
                                className="px-4 py-2 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                              >
                                <Upload className="w-4 h-4" />
                                <span>Upload Workspace Photo</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Real Intro Video (plays inside the video player) */}
                      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-[#dfceb4] uppercase tracking-widest">
                              INTRO VIDEO FILE
                            </span>
                            <h5 className="text-base font-bold text-white uppercase flex items-center gap-2">
                              <Video className="w-4 h-4 text-[#dfceb4]" />
                              <span>About Section Intro Video</span>
                            </h5>
                          </div>
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            LIVE ON SITE
                          </span>
                        </div>

                        <p className="text-xs font-mono text-neutral-400">
                          This is the actual video that plays when a visitor clicks the intro card in the About section.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start gap-6">
                          <div className="w-32 rounded-2xl overflow-hidden border border-[#dfceb4]/30 bg-neutral-900 shrink-0 shadow-lg">
                            <video
                              src={personalInfo.videoIntroUrl}
                              poster={personalInfo.videoIntroPoster}
                              className="w-full h-auto"
                              controls
                              muted
                            />
                          </div>

                          <div className="flex-1 space-y-3 w-full">
                            <div>
                              <label className="block text-xs font-mono text-neutral-400 mb-1">
                                Video URL / Path (MP4, hosted or /assets/...):
                              </label>
                              <input
                                type="text"
                                value={personalInfo.videoIntroUrl || ''}
                                onChange={(e) => updatePersonalInfo({ videoIntroUrl: e.target.value })}
                                placeholder="/assets/rehan_intro.mp4 or https://cdn.example.com/intro.mp4"
                                className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#dfceb4]"
                              />
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                              <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/mp4,video/*"
                                onChange={handleVideoUpload}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => videoInputRef.current?.click()}
                                className="px-4 py-2 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                              >
                                <Upload className="w-4 h-4" />
                                <span>Upload New Video</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  updatePersonalInfo({
                                    videoIntroUrl: '/assets/rehan_intro.mp4',
                                    videoIntroPoster: '/assets/rehan_intro_poster.jpg',
                                  });
                                  showToast('Restored Default Intro Video');
                                }}
                                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-mono text-xs transition-colors"
                              >
                                Revert to Default
                              </button>
                            </div>

                            <p className="text-[11px] font-mono text-amber-400/80 leading-relaxed pt-1">
                              Note: files under ~5MB upload directly and are saved in your browser. For a bigger video, paste
                              a hosted URL instead (e.g. Cloudinary, YouTube direct link, or a file placed in{' '}
                              <code className="text-[#dfceb4]">/public/assets</code> at build time) — large files won't fit
                              in local browser storage.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ==================================================== */}
                  {/* TAB 3: PROFILE & BIO                                 */}
                  {/* ==================================================== */}
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mb-1">
                          Personal Profile & Contact Credentials
                        </h4>
                        <p className="text-xs font-mono text-neutral-400">
                          Edit your headline, contact links, and about narrative text.
                        </p>
                      </div>

                      <form onSubmit={handleSaveProfile} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={profileForm.name}
                              onChange={(e) =>
                                setProfileForm((prev) => ({ ...prev, name: e.target.value }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              Professional Title / Subhead
                            </label>
                            <input
                              type="text"
                              value={profileForm.title}
                              onChange={(e) =>
                                setProfileForm((prev) => ({ ...prev, title: e.target.value }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={profileForm.email}
                              onChange={(e) =>
                                setProfileForm((prev) => ({ ...prev, email: e.target.value }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              WhatsApp / Phone Number
                            </label>
                            <input
                              type="text"
                              value={profileForm.phone}
                              onChange={(e) =>
                                setProfileForm((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                  phoneFormatted: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              GitHub Profile URL
                            </label>
                            <input
                              type="url"
                              value={profileForm.github}
                              onChange={(e) =>
                                setProfileForm((prev) => ({ ...prev, github: e.target.value }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              LinkedIn Profile URL
                            </label>
                            <input
                              type="url"
                              value={profileForm.linkedin}
                              onChange={(e) =>
                                setProfileForm((prev) => ({ ...prev, linkedin: e.target.value }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              Location / City
                            </label>
                            <input
                              type="text"
                              value={profileForm.location}
                              onChange={(e) =>
                                setProfileForm((prev) => ({ ...prev, location: e.target.value }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                              Availability Notice
                            </label>
                            <input
                              type="text"
                              value={profileForm.availability}
                              onChange={(e) =>
                                setProfileForm((prev) => ({ ...prev, availability: e.target.value }))
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                            />
                          </div>
                        </div>

                        {/* About Headlines & Intro */}
                        <div>
                          <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                            About Section Headline
                          </label>
                          <input
                            type="text"
                            value={profileForm.aboutHeadline}
                            onChange={(e) =>
                              setProfileForm((prev) => ({ ...prev, aboutHeadline: e.target.value }))
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#dfceb4] mb-1">
                            About Intro Paragraph
                          </label>
                          <textarea
                            value={profileForm.aboutIntro}
                            onChange={(e) =>
                              setProfileForm((prev) => ({ ...prev, aboutIntro: e.target.value }))
                            }
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                          />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-white/10">
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Profile Changes</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* ==================================================== */}
                  {/* TAB 4: SECURITY & BACKUP                             */}
                  {/* ==================================================== */}
                  {activeTab === 'settings' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-anton text-2xl uppercase tracking-wider text-white mb-1">
                          Security, Backups & Reset
                        </h4>
                        <p className="text-xs font-mono text-neutral-400">
                          Manage passcode protection, export data to JSON, or restore defaults.
                        </p>
                      </div>

                      {/* Card 1: Change Passcode */}
                      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                        <h5 className="text-base font-bold text-white uppercase flex items-center gap-2">
                          <KeyRound className="w-4 h-4 text-[#dfceb4]" />
                          <span>Change Master Passcode</span>
                        </h5>

                        <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-md">
                          <div>
                            <label className="block text-xs font-mono text-neutral-400 mb-1">
                              New Passcode (Min. 4 characters)
                            </label>
                            <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new passcode"
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-neutral-400 mb-1">
                              Confirm New Passcode
                            </label>
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Repeat new passcode"
                              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#dfceb4]"
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-[#dfceb4] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                          >
                            Update Passcode
                          </button>
                        </form>
                      </div>

                      {/* Card 2: JSON Export & Backup */}
                      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                        <h5 className="text-base font-bold text-white uppercase flex items-center gap-2">
                          <Download className="w-4 h-4 text-[#dfceb4]" />
                          <span>Export Backup (JSON)</span>
                        </h5>
                        <p className="text-xs font-mono text-neutral-400">
                          Download all your current projects, links, images, and customized bio into a single backup file.
                        </p>
                        <button
                          onClick={handleExportJson}
                          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <FileJson className="w-4 h-4" />
                          <span>Copy & Download JSON Backup</span>
                        </button>
                      </div>

                      {/* Card 3: JSON Import */}
                      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
                        <h5 className="text-base font-bold text-white uppercase flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#dfceb4]" />
                          <span>Import Configuration (JSON)</span>
                        </h5>
                        <p className="text-xs font-mono text-neutral-400">
                          Paste raw backup JSON to restore saved projects and credentials:
                        </p>

                        <form onSubmit={handleImportJson} className="space-y-3">
                          <textarea
                            value={jsonImportText}
                            onChange={(e) => setJsonImportText(e.target.value)}
                            rows={3}
                            placeholder="Paste exported backup JSON here..."
                            className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 font-mono text-xs text-white focus:outline-none focus:border-[#dfceb4]"
                          />
                          <button
                            type="submit"
                            disabled={!jsonImportText.trim()}
                            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Import & Apply
                          </button>
                        </form>
                      </div>

                      {/* Card 4: Factory Reset */}
                      <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/20 space-y-4">
                        <h5 className="text-base font-bold text-rose-400 uppercase flex items-center gap-2">
                          <RotateCcw className="w-4 h-4" />
                          <span>Reset to Original Factory Defaults</span>
                        </h5>
                        <p className="text-xs font-mono text-neutral-400">
                          Clears all custom edits from localStorage and reverts to the original resume projects and information.
                        </p>
                        <button
                          onClick={handleResetFactory}
                          className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Reset Everything to Default
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
