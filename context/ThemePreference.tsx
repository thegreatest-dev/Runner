import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  isDark: boolean;
  hydrated?: boolean;
};

const ThemePreferenceContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemePreferenceProvider({ children }: { children: React.ReactNode }) {
  const STORAGE_KEY = 'theme_preference_v1';
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = raw as ThemePreference;
          setPreference(parsed);
        }
      } catch (e) {
        // ignore
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, preference);
      } catch (e) {
        // ignore
      }
    })();
  }, [preference, hydrated]);

  const value = useMemo(() => {
    return {
      preference,
      setPreference,
      isDark: preference === 'dark',
      hydrated,
    } as ThemeContextValue & { hydrated: boolean };
  }, [preference, hydrated]);

  return <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>;
}

export function useThemePreference() {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) throw new Error('useThemePreference must be used within ThemePreferenceProvider');
  return ctx;
}
