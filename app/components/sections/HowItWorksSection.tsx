'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, PenTool, Rocket, Search, MessageSquare } from 'lucide-react';
import { Badge } from '@/app/components/ui/Badge';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, goals, and audience to build a strategic foundation.',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Crafting pixel-perfect mockups and interactive prototypes that bring your vision to life.',
    icon: PenTool,
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Building with cutting-edge technology for performance, accessibility, and scalability.',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    number: '04',
    title: 'Review & Refine',
    description: 'Iterative feedback loops ensure every detail meets your expectations.',
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-500',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deploy with confidence. We handle the release, monitoring, and ongoing support.',
    icon: Rocket,
    color: 'from-red-500 to-pink-500',
  },
];

/**
 * How It Works section with vertical animated timeline triggered on scroll.
 */
export function HowItWorksSection() {
  const { scrollYProgress } = useScroll({
    target: undefined,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" className="section-padding bg-light-50 dark:bg-dark-900" aria-labelledby="how-title">
      <div className="container-page">
        <ScrollReveal direction="up">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="default" size="md" className="mb-4">
              Process
            </Badge>
            <h2
              id="how-title"
              className="mb-4 text-display-sm font-bold text-light-900 dark:text-dark-50 sm:text-display-md"
            >
              How we <span className="gradient-text">bring ideas to life</span>
            </h2>
            <p className="text-body-lg text-light-500 dark:text-dark-400">
              A proven methodology that delivers exceptional results, from first conversation to launch day.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 h-full w-px bg-light-200 dark:bg-dark-800">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-accent-500 to-purple-500"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative flex gap-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number circle */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-light-200 bg-white dark:border-dark-700 dark:bg-dark-900">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br', step.color)}>
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <span className="mb-1 block text-caption font-bold uppercase tracking-widest text-accent-500">
                    Step {step.number}
                  </span>
                  <h3 className="mb-2 text-heading-lg font-semibold text-light-900 dark:text-dark-50">
                    {step.title}
                  </h3>
                  <p className="text-body-md text-light-500 dark:text-dark-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
