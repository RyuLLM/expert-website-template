'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

/**
 * Full-screen Hero section with parallax background, animated gradient text,
 * floating elements, dual CTA buttons, and scroll indicator.
 */
export function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-950"
      aria-label="Hero"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-accent-500/20 via-dark-950/80 to-dark-950" />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center"
        style={{ opacity, scale }}
      >
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-body-sm font-medium text-accent-400">
              Now available in Early Access
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <h1 className="mb-6 text-display-md font-bold leading-tight sm:text-display-lg md:text-display-xl lg:text-display-2xl">
            <span className="text-white">Design that </span>
            <span className="gradient-text-hero">elevates</span>
            <br />
            <span className="text-white">your brand</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <p className="mx-auto mb-10 max-w-2xl text-body-lg text-dark-200 md:text-heading-xl">
            We craft premium web experiences that captivate audiences and drive results.
            From concept to launch, every pixel tells your story.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="xl" icon={<ArrowRight size={20} />} iconPosition="right">
              Start Your Project
            </Button>
            <Button variant="outline" size="xl" icon={<Play size={20} />}>
              Watch Showreel
            </Button>
          </div>
        </ScrollReveal>

        {/* Trust indicator */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-12 flex items-center justify-center gap-8 text-dark-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-dark-950 bg-accent-500/30"
                  style={{ backgroundImage: `url(https://i.pravatar.cc/32?u=${i})`, backgroundSize: 'cover' }}
                />
              ))}
            </div>
            <p className="text-body-sm">
              <span className="font-semibold text-dark-200">200+</span> projects delivered
            </p>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-caption text-dark-500">Scroll to explore</span>
        <div className="scroll-indicator-line" />
        <div className="scroll-indicator-dot" />
      </motion.div>
    </section>
  );
}

/** Floating decorative elements for the hero */
function FloatingElements() {
  const floatAnim = (delay: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 6 + Math.random() * 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {[
        { top: '20%', left: '10%', size: 60, color: 'border-accent-500/20', delay: 0 },
        { top: '60%', right: '15%', size: 80, color: 'border-purple-500/20', delay: 1 },
        { top: '30%', right: '25%', size: 40, color: 'border-pink-500/20', delay: 2 },
        { bottom: '20%', left: '20%', size: 50, color: 'border-accent-500/15', delay: 0.5 },
      ].map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            top: el.top,
            left: el.left as string | undefined,
            right: el.right as string | undefined,
            bottom: el.bottom as string | undefined,
            width: el.size,
            height: el.size,
            borderColor: el.color,
          }}
          animate={floatAnim(el.delay)}
        />
      ))}
    </div>
  );
}
