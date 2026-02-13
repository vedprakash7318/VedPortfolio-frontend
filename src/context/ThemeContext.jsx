import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Themes: 'default' (Blue/Purple), 'emerald', 'sunset', 'ocean', 'cyber'
    const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'default');

    // Fonts: 'sans' (Inter), 'serif' (Playfair), 'mono' (Fira Code), 'system'
    const [font, setFont] = useState(localStorage.getItem('portfolio-font') || 'sans');

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old theme classes
        root.classList.remove('theme-default', 'theme-emerald', 'theme-sunset', 'theme-ocean', 'theme-cyber');
        // Add new theme class
        root.classList.add(`theme-${theme}`);
        localStorage.setItem('portfolio-theme', theme);

        // Remove old font classes
        root.classList.remove('font-sans', 'font-serif', 'font-mono', 'font-system');
        // Add new font class
        root.classList.add(`font-${font}`);
        localStorage.setItem('portfolio-font', font);

    }, [theme, font]);

    const value = {
        theme,
        setTheme,
        font,
        setFont,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
