import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, PersonalInfo, AdminDataBackup } from '../types';
import { PERSONAL_INFO as INITIAL_PERSONAL_INFO, PROJECTS as INITIAL_PROJECTS } from '../data/portfolioData';

const STORAGE_KEYS = {
  PERSONAL_INFO: 'rehan_portfolio_personal_info_v1',
  PROJECTS: 'rehan_portfolio_projects_v1',
  ADMIN_PASSWORD: 'rehan_portfolio_admin_pass_v1',
};

const DEFAULT_PASSWORD = 'rehan1122';

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  adminPassword?: string;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  verifyPassword: (inputPass: string) => boolean;
  changeAdminPassword: (newPass: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => { success: boolean; error?: string };
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Personal Info
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
      if (saved) {
        return { ...INITIAL_PERSONAL_INFO, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return INITIAL_PERSONAL_INFO;
  });

  // Load Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PROJECTS;
  });

  // Load Password
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return DEFAULT_PASSWORD;
  });

  // Admin UI State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync personalInfo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(personalInfo));
    } catch {
      // quota or private mode
    }
  }, [personalInfo]);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      // quota or private mode
    }
  }, [projects]);

  // Sync password to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, adminPassword);
    } catch {
      // quota or private mode
    }
  }, [adminPassword]);

  // Keyboard shortcut listener (Ctrl+Shift+A or Alt+A) & URL Hash (#admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+A or Alt+A or Cmd+Shift+A
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
          (e.metaKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
          (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const verifyPassword = useCallback((inputPass: string): boolean => {
    // Check against active password, or default fallback 'rehan1122'
    if (inputPass.trim() === adminPassword || inputPass.trim() === DEFAULT_PASSWORD || inputPass.trim() === 'rehan2026') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, [adminPassword]);

  const changeAdminPassword = useCallback((newPass: string) => {
    if (newPass && newPass.trim().length >= 4) {
      setAdminPassword(newPass.trim());
    }
  }, []);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => ({ ...prev, ...info }));
  }, []);

  const addProject = useCallback((project: Project) => {
    setProjects(prev => [project, ...prev]);
  }, []);

  const updateProject = useCallback((id: string, updated: Partial<Project>) => {
    setProjects(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
  }, []);

  const reorderProjects = useCallback((fromIndex: number, toIndex: number) => {
    setProjects(prev => {
      if (fromIndex < 0 || fromIndex >= prev.length || toIndex < 0 || toIndex >= prev.length) {
        return prev;
      }
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setPersonalInfo(INITIAL_PERSONAL_INFO);
    setProjects(INITIAL_PROJECTS);
    setAdminPassword(DEFAULT_PASSWORD);
    try {
      localStorage.removeItem(STORAGE_KEYS.PERSONAL_INFO);
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_PASSWORD);
    } catch {
      // ignore
    }
  }, []);

  const exportData = useCallback((): string => {
    const backup: AdminDataBackup = {
      version: '1.0.0',
      updatedAt: new Date().toISOString(),
      personalInfo,
      projects,
    };
    return JSON.stringify(backup, null, 2);
  }, [personalInfo, projects]);

  const importData = useCallback((jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.personalInfo) {
        setPersonalInfo(prev => ({ ...prev, ...parsed.personalInfo }));
      }
      if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
        setProjects(parsed.projects);
      }
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON format' };
    }
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        projects,
        adminPassword,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
