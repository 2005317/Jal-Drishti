'use client';

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import type { Role, Language } from '@/lib/constants';
import { translations } from '@/lib/translations';

type AppContextType = {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('public');
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const contextValue = useMemo(() => ({
    role,
    setRole,
    language,
    setLanguage,
    t,
  }), [role, language]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
