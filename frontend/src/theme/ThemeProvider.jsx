import { useEffect, useState } from 'react';
import { ThemeContext } from './useTheme';

const key = 'classnotion-theme';
function savedTheme() {
  try { return localStorage.getItem(key); } catch { return null; }
}
function preferredTheme() {
  const saved = savedTheme();
  return saved === 'light' || saved === 'dark' ? saved : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(preferredTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#191c2b' : '#dee4f2');
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => { if (!['light', 'dark'].includes(savedTheme())) setTheme(preferredTheme()); };
    const onStorage = event => { if (event.key === key || event.key === null) setTheme(preferredTheme()); };
    media.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
    return () => { media.removeEventListener('change', onSystemChange); window.removeEventListener('storage', onStorage); };
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(key, next); } catch { /* Theme still works when storage is unavailable. */ }
    setTheme(next);
  };
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
