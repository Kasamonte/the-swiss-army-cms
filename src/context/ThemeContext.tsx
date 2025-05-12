
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeConfig {
  siteName: string;
  accentColor: string;
  logoUrl?: string;
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (config: Partial<ThemeConfig>) => void;
}

const defaultTheme: ThemeConfig = {
  siteName: 'Admin CMS',
  accentColor: 'hsl(var(--primary))',
  logoUrl: undefined,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: Partial<ThemeConfig>;
}> = ({ children, initialTheme = {} }) => {
  const [theme, setTheme] = useState<ThemeConfig>({
    ...defaultTheme,
    ...initialTheme,
  });

  const updateTheme = (config: Partial<ThemeConfig>) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      ...config,
    }));
  };

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    if (theme.accentColor) {
      root.style.setProperty('--theme-accent-color', theme.accentColor);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
