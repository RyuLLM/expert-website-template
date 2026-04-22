'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

/**
 * Final CTA section with dark gradient background, urgency, and lead capture form.
 */
export function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-label="Call to action">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-accent-950" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-accent-500/20 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <ScrollReveal direction="up">
          <h2 className="mb-6 text-display-sm font-bold text-white sm:text-display-md">
            Ready to transform your
            <br />
            <span className="gradient-text">digital presence</span>?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-body-lg text-dark-200">
            Let&apos;s create something extraordinary together.
            Your vision, our expertise — unmatched results.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-success-500/30 bg-success-500/10 px-8 py-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-500/20">
                <Check className="h-6 w-6 text-success-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-success-400">Thank you!</p>
                <p className="text-body-sm text-success-400/80">We&apos;ll be in touch shortly.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    variant="filled"
                    required
                    aria-label="Email address"
                    className="border-dark-700 bg-white/10 text-white placeholder:text-dark-400 focus:bg-white/15"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                  Get Started
                </Button>
              </div>
              <p className="text-body-sm text-dark-500">
                Free consultation. No commitment. We&apos;ll respond within 24 hours.
              </p>
            </form>
          )}
        </ScrollReveal>

        {/* Urgency indicators */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-dark-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success-500 animate-pulse" />
              <span className="text-body-sm">Available for new projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-heading-md font-bold text-accent-500">2</span>
              <span className="text-body-sm">spots remaining this month</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
