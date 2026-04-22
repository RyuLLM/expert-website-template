'use client';

import React from 'react';
import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

const LOGOS = [
  'Acme Corp', 'TechFlow', 'DesignLab', 'CloudBase',
  'DataPulse', 'NovaTech', 'Vertex', 'Streamline',
];

/**
 * TrustBar with infinite scrolling logo cloud and a counter badge.
 * Builds credibility through social proof.
 */
export function TrustBarSection() {
  return (
    <section className="section-padding border-y border-light-200 bg-light-50/50 dark:border-dark-800 dark:bg-dark-900/50">
      <div className="container-page">
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-body-sm font-medium uppercase tracking-widest text-light-400 dark:text-dark-500"
          >
            Trusted by innovative teams worldwide
          </motion.p>
        </div>

        {/* Infinite Scrolling Logo Cloud */}
        <div className="relative overflow-hidden mask-fade-right">
          <motion.div
            className="flex gap-16"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* First set */}
            {LOGOS.map((name, i) => (
              <div
                key={`a-${i}`}
                className="flex h-12 items-center whitespace-nowrap"
              >
                <span className="text-heading-lg font-bold text-light-300 dark:text-dark-700 select-none">
                  {name}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {LOGOS.map((name, i) => (
              <div
                key={`b-${i}`}
                className="flex h-12 items-center whitespace-nowrap"
              >
                <span className="text-heading-lg font-bold text-light-300 dark:text-dark-700 select-none">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Counter Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-body-sm font-medium text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            500+ companies
          </span>
        </motion.div>
      </div>
    </section>
  );
}
