import React, { createContext, useContext, useMemo, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  isDark: boolean;
};

const ThemePreferenceContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemePreferenceProvider({ children }: { children: React.ReactNode }) {
  // session-only preference. If you want persistence, we can add AsyncStorage later.
  const [preference, setPreference] = useState<ThemePreference>('system');

  const value = useMemo(() => {
    return {
      preference,
      setPreference,
      isDark: preference === 'dark',
    } as ThemeContextValue;
  }, [preference]);

  return <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>;
}

export function useThemePreference() {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) throw new Error('useThemePreference must be used within ThemePreferenceProvider');
  return ctx;
}
