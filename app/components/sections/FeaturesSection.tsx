'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Palette, Code, Zap, Shield, Smartphone, BarChart3,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/app/components/ui/Badge';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  size: 'small' | 'medium' | 'large';
}

const features: Feature[] = [
  {
    title: 'Custom Design',
    description: 'Tailored visual identities that capture your brand essence and stand out from competitors.',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    size: 'large',
  },
  {
    title: 'Clean Code',
    description: 'Industry-standard development practices for maintainable, scalable solutions.',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    size: 'small',
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized performance with sub-second load times and smooth interactions.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    size: 'medium',
  },
  {
    title: 'Secure by Default',
    description: 'Enterprise-grade security built into every layer of your application.',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    size: 'medium',
  },
  {
    title: 'Responsive Design',
    description: 'Flawless experiences across every device, from mobile to desktop.',
    icon: Smartphone,
    color: 'from-accent-500 to-purple-500',
    size: 'small',
  },
  {
    title: 'Analytics Ready',
    description: 'Built-in tracking and insights to measure what matters for your business.',
    icon: BarChart3,
    color: 'from-red-500 to-pink-500',
    size: 'large',
  },
];

const sizeClasses: Record<string, string> = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 sm:col-span-1 row-span-1',
  large: 'col-span-1 sm:col-span-2 row-span-1',
};

/**
 * Features section with asymmetric bento grid layout, hover lift, and stagger entrance.
 */
export function FeaturesSection() {
  return (
    <section id="features" className="section-padding" aria-labelledby="features-title">
      <div className="container-page">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="default" size="md" className="mb-4">
              Features
            </Badge>
            <h2
              id="features-title"
              className="mb-4 text-display-sm font-bold text-light-900 dark:text-dark-50 sm:text-display-md"
            >
              Everything you need to
              <br />
              <span className="gradient-text">succeed online</span>
            </h2>
            <p className="text-body-lg text-light-500 dark:text-dark-400">
              Our comprehensive toolkit covers every aspect of modern web design,
              from stunning visuals to robust performance.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-light-200 bg-white p-6 transition-all duration-300',
                'dark:border-dark-800 dark:bg-dark-900',
                'hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-dark-900/50',
                sizeClasses[feature.size]
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
            >
              {/* Gradient hover overlay */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10',
                  feature.color
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br',
                  feature.color
                )}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-heading-md font-semibold text-light-900 dark:text-dark-50">
                {feature.title}
              </h3>
              <p className="text-body-md text-light-500 dark:text-dark-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
