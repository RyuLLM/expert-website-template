'use client';

import React, { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Projects', description: 'Delivered across 20+ industries' },
  { value: 98, suffix: '%', label: 'Satisfaction', description: 'Client retention rate' },
  { value: 3.5, suffix: 'x', label: 'Faster Launch', description: 'Average time to market' },
  { value: 150, suffix: '%', label: 'ROI', description: 'Average return on investment' },
];

/**
 * Animated counter using spring physics for smooth number transitions.
 */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (v) => {
    if (Number.isInteger(value)) {
      return Math.round(v).toString();
    }
    return v.toFixed(1);
  });

  React.useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

/**
 * Stats section with animated counters and progress bars.
 */
export function StatsSection() {
  return (
    <section className="section-padding" aria-label="Statistics">
      <div className="container-page">
        <ScrollReveal direction="up">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-display-sm font-bold text-light-900 dark:text-dark-50 sm:text-display-md">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="mb-1 text-heading-md font-semibold text-light-700 dark:text-dark-200">
                  {stat.label}
                </h3>
                <p className="text-body-sm text-light-500 dark:text-dark-400">
                  {stat.description}
                </p>

                {/* Progress bar */}
                <div className="mx-auto mt-4 h-1.5 w-24 overflow-hidden rounded-full bg-light-200 dark:bg-dark-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-500 to-purple-500"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
