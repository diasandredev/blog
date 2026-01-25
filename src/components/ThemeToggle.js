import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    color: var(--color-accent);
    background-color: var(--color-bg-secondary);
    transform: rotate(15deg);
  }
`;

const ThemeToggle = () => {
  const [theme, setTheme] = useState(null); // Wait for mount to avoid mismatch

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (!theme) return;

    document.body.classList.remove('light-mode', 'dark-mode');
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  if (!theme) return null;

  return (
    <ToggleButton
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle;
