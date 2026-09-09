import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword as fbUpdatePassword,
  type User,
} from 'firebase/auth';
import { Project, PersonalInfo, AdminDataBackup } from '../types';
import { PERSONAL_INFO as INITIAL_PERSONAL_INFO, PROJECTS as INITIAL_PROJECTS } from '../data/portfolioData';
import { db, auth, isFirebaseConfigured } from '../lib/firebase';

const STORAGE_KEYS = {
  PERSONAL_INFO: 'rehan_portfolio_personal_info_v1',
  PROJECTS: 'rehan_portfolio_projects_v1',
  ADMIN_PASSWORD: 'rehan_portfolio_admin_pass_v1',
};

// Only used as a fallback when Firebase isn't configured (e.g. running the
// project locally before you've set up a Firebase project). Once Firebase is
// wired up, real auth (see .env.example -> VITE_ADMIN_EMAIL + Firebase Console)
// replaces this entirely.
const DEFAULT_PASSWORD = 'rehan1122';

// One shared document every visitor reads and the admin panel writes to.
const PORTFOLIO_DOC = () => (db ? doc(db, 'portfolioSite', 'main') : null);

// Fixed admin email paired with the password field in the UI, so the login
// form can stay a single password box while actually using real Firebase Auth
// under the hood. Set this to whichever email you create in Firebase Console
// under Authentication -> Users.
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@rehanimran.dev';

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  isCloudConnected: boolean;
  isSyncing: boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  verifyPassword: (inputPass: string) => Promise<boolean>;
  changeAdminPassword: (newPass: string) => Promise<{ success: boolean; error?: string }>;
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
  // Local state — always the source of truth for what's on screen right now.
  // Seeded from localStorage first (instant paint, works offline), then kept
  // in sync with Firestore once the cloud snapshot arrives.
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
      if (saved) return { ...INITIAL_PERSONAL_INFO, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return INITIAL_PERSONAL_INFO;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_PROJECTS;
  });

  const [isSyncing, setIsSyncing] = useState(isFirebaseConfigured);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Guards against the very first Firestore snapshot re-triggering a write
  // straight back to Firestore.
  const hasHydratedFromCloud = useRef(false);

  // ------------------------------------------------------------------
  // Cloud sync: subscribe to the shared document. Any change made from
  // ANY device's admin panel pushes here in real time.
  // ------------------------------------------------------------------
  useEffect(() => {
    const docRef = PORTFOLIO_DOC();
    if (!docRef) {
      // No Firebase configured — stay on localStorage-only mode.
      setIsSyncing(false);
      return;
    }

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        hasHydratedFromCloud.current = true;
        setIsSyncing(false);
        if (snap.exists()) {
          const data = snap.data() as { personalInfo?: Partial<PersonalInfo>; projects?: Project[] };
          if (data.personalInfo) {
            setPersonalInfo((prev) => ({ ...prev, ...data.personalInfo }));
          }
          if (Array.isArray(data.projects) && data.projects.length > 0) {
            setProjects(data.projects);
          }
        } else {
          // First run ever — seed the cloud doc with current local/default data.
          setDoc(docRef, {
            personalInfo: INITIAL_PERSONAL_INFO,
            projects: INITIAL_PROJECTS,
            updatedAt: serverTimestamp(),
          }).catch(() => {
            // ignore — will retry on next write
          });
        }
      },
      () => {
        // Offline, blocked by rules, etc — fall back silently to local data.
        setIsSyncing(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Push a partial update to the shared cloud document (merged, not replaced).
  const pushToCloud = useCallback((patch: { personalInfo?: PersonalInfo; projects?: Project[] }) => {
    const docRef = PORTFOLIO_DOC();
    if (!docRef) return;
    setDoc(docRef, { ...patch, updatedAt: serverTimestamp() }, { merge: true }).catch(() => {
      // Network hiccup — the localStorage cache still has the latest value,
      // and the next successful write will reconcile the cloud doc.
    });
  }, []);

  // ------------------------------------------------------------------
  // Firebase Auth session (real admin security, not just a client-side
  // password check). Falls back to the local passcode when Firebase isn't
  // configured, so the panel still works in offline/dev mode.
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      setIsAuthenticated(Boolean(user));
    });
    return () => unsub();
  }, []);

  // Local-only fallback passcode (dev mode without Firebase configured).
  const [localPassword, setLocalPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return DEFAULT_PASSWORD;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, localPassword);
    } catch {
      // ignore
    }
  }, [localPassword]);

  // Keyboard shortcut listener (Ctrl+Shift+A or Alt+A) & URL Hash (#admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const verifyPassword = useCallback(async (inputPass: string): Promise<boolean> => {
    const pass = inputPass.trim();

    if (auth) {
      try {
        await signInWithEmailAndPassword(auth, ADMIN_EMAIL, pass);
        return true; // onAuthStateChanged flips isAuthenticated
      } catch {
        return false;
      }
    }

    // Firebase not configured — local dev fallback
    if (pass === localPassword || pass === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, [localPassword]);

  const changeAdminPassword = useCallback(async (newPass: string): Promise<{ success: boolean; error?: string }> => {
    const pass = newPass.trim();
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    if (auth) {
      if (!auth.currentUser) {
        return { success: false, error: 'You must be signed in to change the password.' };
      }
      try {
        await fbUpdatePassword(auth.currentUser, pass);
        return { success: true };
      } catch (err: unknown) {
        return {
          success: false,
          error: err instanceof Error ? err.message : 'Could not update password — try signing in again.',
        };
      }
    }

    // Local dev fallback
    setLocalPassword(pass);
    return { success: true };
  }, []);

  // Sync personalInfo/projects to localStorage as an offline cache on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(personalInfo));
    } catch {
      // ignore
    }
  }, [personalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => {
      const next = { ...prev, ...info };
      pushToCloud({ personalInfo: next });
      return next;
    });
  }, [pushToCloud]);

  const addProject = useCallback((project: Project) => {
    setProjects(prev => {
      const next = [project, ...prev];
      pushToCloud({ projects: next });
      return next;
    });
  }, [pushToCloud]);

  const updateProject = useCallback((id: string, updated: Partial<Project>) => {
    setProjects(prev => {
      const next = prev.map(item => (item.id === id ? { ...item, ...updated } : item));
      pushToCloud({ projects: next });
      return next;
    });
  }, [pushToCloud]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => {
      const next = prev.filter(item => item.id !== id);
      pushToCloud({ projects: next });
      return next;
    });
  }, [pushToCloud]);

  const reorderProjects = useCallback((fromIndex: number, toIndex: number) => {
    setProjects(prev => {
      if (fromIndex < 0 || fromIndex >= prev.length || toIndex < 0 || toIndex >= prev.length) {
        return prev;
      }
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      pushToCloud({ projects: next });
      return next;
    });
  }, [pushToCloud]);

  const resetToDefaults = useCallback(() => {
    setPersonalInfo(INITIAL_PERSONAL_INFO);
    setProjects(INITIAL_PROJECTS);
    pushToCloud({ personalInfo: INITIAL_PERSONAL_INFO, projects: INITIAL_PROJECTS });
    try {
      localStorage.removeItem(STORAGE_KEYS.PERSONAL_INFO);
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    } catch {
      // ignore
    }
  }, [pushToCloud]);

  const exportData = useCallback((): string => {
    const backup: AdminDataBackup = {
      version: '2.0.0',
      updatedAt: new Date().toISOString(),
      personalInfo,
      projects,
    };
    return JSON.stringify(backup, null, 2);
  }, [personalInfo, projects]);

  const importData = useCallback((jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      let nextPersonalInfo = personalInfo;
      let nextProjects = projects;

      if (parsed.personalInfo) {
        nextPersonalInfo = { ...personalInfo, ...parsed.personalInfo };
        setPersonalInfo(nextPersonalInfo);
      }
      if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
        nextProjects = parsed.projects;
        setProjects(nextProjects);
      }
      pushToCloud({ personalInfo: nextPersonalInfo, projects: nextProjects });
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON format' };
    }
  }, [personalInfo, projects, pushToCloud]);

  const handleSetIsAuthenticated = useCallback((value: boolean) => {
    if (!value && auth) {
      signOut(auth).catch(() => {});
    }
    setIsAuthenticated(value);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        projects,
        isCloudConnected: isFirebaseConfigured,
        isSyncing,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        setIsAuthenticated: handleSetIsAuthenticated,
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
