import { createContext, useContext, useState, useEffect } from 'react';
import storage from '../services/storage';
import { STORAGE_KEYS } from '../constants';

/**
 * SettingsContext provides global state for app themes and accents.
 */
const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState('system'); // 'light' | 'dark' | 'system'
  const [accentColor, setAccentColor] = useState('#007bff');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const saved = await storage.getItem(STORAGE_KEYS.SETTINGS);
        if (saved) {
          setTheme(saved.theme || 'system');
          setAccentColor(saved.accentColor || '#007bff');
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      storage.setItem(STORAGE_KEYS.SETTINGS, { theme, accentColor });
    }
  }, [theme, accentColor, isLoading]);

  // Apply theme to HTML attribute
  useEffect(() => {
    const applyTheme = () => {
      let resolvedTheme = theme;
      if (theme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  // Apply accent color as a CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', accentColor);
  }, [accentColor]);

  const value = {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    isLoading,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettingsContext must be used within a SettingsProvider');
  return context;
}
