import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to dark theme
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log('Theme changed to:', newTheme);
    console.log('data-theme attribute:', document.documentElement.getAttribute('data-theme'));
  };

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-track">
        <div className={`theme-toggle-thumb ${isDark ? 'dark' : 'light'}`}>
          {isDark ? (
            // Moon icon for dark mode
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            // Sun icon for light mode
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5"/>
              <path d="m12 1-1 4h2l-1-4zM12 19l-1 4h2l-1-4zM4.22 4.22l2.83 2.83-1.41 1.41L2.81 5.63l1.41-1.41zM18.36 18.36l2.83 2.83-1.41 1.41-2.83-2.83 1.41-1.41zM1 11h4v2H1v-2zM19 11h4v2h-4v-2zM4.22 19.78l2.83-2.83 1.41 1.41-2.83 2.83-1.41-1.41zM18.36 5.64l2.83-2.83 1.41 1.41-2.83 2.83-1.41-1.41z"/>
            </svg>
          )}
        </div>
      </div>
      <span className="theme-toggle-label">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;