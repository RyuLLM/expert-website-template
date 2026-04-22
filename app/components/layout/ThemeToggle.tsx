'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle button for switching between light and dark mode.
 * Persists preference to localStorage and respects system preference.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (stored === 'dark' || (!stored && prefersDark)) {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className={cn('h-10 w-10', className)} aria-hidden="true" />
    );
  }

  return (
    <motion.button
      onClick={toggle}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-lg',
        'text-light-500 hover:bg-light-100 hover:text-light-700',
        'dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-dark-200',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
        className
      )}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        key={dark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {dark ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </motion.button>
  );
}
