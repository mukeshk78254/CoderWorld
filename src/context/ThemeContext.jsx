import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        setIsDarkMode(savedTheme === 'dark');
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (newTheme) => {
        const root = document.documentElement;
        
        if (newTheme === 'light') {
            root.classList.remove('dark');
            // Light theme CSS variables
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f8fafc');
            root.style.setProperty('--bg-tertiary', '#f1f5f9');
            root.style.setProperty('--text-primary', '#1e293b');
            root.style.setProperty('--text-secondary', '#64748b');
            root.style.setProperty('--text-muted', '#94a3b8');
            root.style.setProperty('--border-color', '#e2e8f0');
            root.style.setProperty('--accent-primary', '#0ea5e9');
            root.style.setProperty('--accent-secondary', '#06b6d4');
        } else {
            root.classList.add('dark');
            // Dark theme CSS variables
            root.style.setProperty('--bg-primary', '#0f172a');
            root.style.setProperty('--bg-secondary', '#1e293b');
            root.style.setProperty('--bg-tertiary', '#334155');
            root.style.setProperty('--text-primary', '#f1f5f9');
            root.style.setProperty('--text-secondary', '#94a3b8');
            root.style.setProperty('--text-muted', '#64748b');
            root.style.setProperty('--border-color', '#475569');
            root.style.setProperty('--accent-primary', '#06b6d4');
            root.style.setProperty('--accent-secondary', '#0ea5e9');
        }
    };

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setTheme(newTheme);
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const setThemeMode = (newTheme) => {
        setTheme(newTheme);
        setIsDarkMode(newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const value = {
        isDarkMode,
        theme,
        toggleTheme,
        setThemeMode
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

