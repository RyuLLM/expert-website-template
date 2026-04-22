'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/app/components/ui/Button';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

/**
 * Sticky header with glassmorphism effect, responsive navigation,
 * and animated mobile hamburger menu.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        isScrolled
          ? 'glass-dark dark:glass-dark'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-[var(--header-height)] max-w-[var(--max-width)] items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-heading-lg font-bold text-light-900 dark:text-dark-50"
          aria-label="ExpertWeb - Home"
        >
          <span className="gradient-text">Expert</span>
          <span>Web</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm font-medium text-light-600 transition-colors hover:text-light-900 dark:text-dark-300 dark:hover:text-dark-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="primary" size="sm" className="hidden md:inline-flex">
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-light-600 hover:bg-light-100 dark:text-dark-300 dark:hover:bg-dark-800 md:hidden"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-light-200 bg-white dark:border-dark-800 dark:bg-dark-950 md:hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-body-lg font-medium text-light-700 transition-colors hover:bg-light-100 dark:text-dark-200 dark:hover:bg-dark-800"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <Button variant="primary" fullWidth onClick={() => setIsMobileOpen(false)}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
