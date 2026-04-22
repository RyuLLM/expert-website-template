'use client';

import React, { useState } from 'react';
import { ExternalLink, Globe, User, Mail, ArrowUpRight } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Documentation', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
  Resources: [
    { label: 'Community', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

const socialLinks = [
  { icon: ExternalLink, href: '#', label: 'GitHub' },
  { icon: Globe, href: '#', label: 'Twitter' },
  { icon: User, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

/**
 * Multi-column footer with newsletter signup, social links, and legal section.
 */
export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic
    setEmail('');
  };

  return (
    <footer className="border-t border-light-200 bg-light-50 dark:border-dark-800 dark:bg-dark-950" role="contentinfo">
      <div className="mx-auto max-w-[var(--max-width)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand + Newsletter */}
          <div className="space-y-6 lg:col-span-2">
            <a href="/" className="flex items-center gap-2 text-heading-lg font-bold text-light-900 dark:text-dark-50">
              <span className="gradient-text">Expert</span>
              <span>Web</span>
            </a>
            <p className="text-body-md text-light-500 dark:text-dark-400 max-w-sm">
              Premium web design solutions crafted for modern businesses. Elevate your digital presence.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  required
                  aria-label="Email for newsletter"
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-light-400 transition-colors hover:bg-light-100 hover:text-accent-500 dark:text-dark-500 dark:hover:bg-dark-800 dark:hover:text-accent-400"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-body-sm font-semibold uppercase tracking-wider text-light-900 dark:text-dark-50">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-body-md text-light-500 transition-colors hover:text-light-900 dark:text-dark-400 dark:hover:text-dark-50"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 transition-all group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-light-200 pt-8 dark:border-dark-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-body-sm text-light-400 dark:text-dark-500">
              &copy; {new Date().getFullYear()} ExpertWeb. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-body-sm text-light-400 transition-colors hover:text-light-600 dark:text-dark-500 dark:hover:text-dark-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-body-sm text-light-400 transition-colors hover:text-light-600 dark:text-dark-500 dark:hover:text-dark-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
