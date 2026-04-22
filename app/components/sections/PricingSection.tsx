'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses getting started.',
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      '1 page design',
      'Basic SEO setup',
      'Mobile responsive',
      '5 email accounts',
      '1 revision round',
      'Basic analytics',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    description: 'For growing teams that need more firepower.',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    popular: true,
    features: [
      'Up to 5 pages',
      'Advanced SEO',
      'Custom animations',
      'CMS integration',
      'Priority support',
      '3 revision rounds',
      'Performance optimization',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large-scale operations.',
    monthlyPrice: 399,
    yearlyPrice: 3990,
    features: [
      'Unlimited pages',
      'Full SEO strategy',
      'Custom integrations',
      'Dedicated project manager',
      '24/7 support',
      'Unlimited revisions',
      'SLA guarantee',
      'Custom analytics',
      'Team training',
    ],
    cta: 'Contact Sales',
  },
];

const featureHighlights = [
  'Custom design system',
  'Performance optimization',
  'Accessibility compliance',
  'Security audit',
  'Content strategy',
];

/**
 * Pricing section with 3 tiers, "Most Popular" highlight, monthly/annual toggle,
 * and feature comparison.
 */
export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="section-padding bg-light-50 dark:bg-dark-900" aria-labelledby="pricing-title">
      <div className="container-page">
        <ScrollReveal direction="up">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="default" size="md" className="mb-4">
              Pricing
            </Badge>
            <h2
              id="pricing-title"
              className="mb-4 text-display-sm font-bold text-light-900 dark:text-dark-50 sm:text-display-md"
            >
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-body-lg text-light-500 dark:text-dark-400">
              Choose the plan that fits your needs. No hidden fees. Upgrade anytime.
            </p>
          </div>
        </ScrollReveal>

        {/* Toggle Monthly/Annual */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12 flex items-center justify-center gap-4">
            <span
              className={cn(
                'text-body-sm font-medium transition-colors',
                !isAnnual ? 'text-light-900 dark:text-dark-50' : 'text-light-400 dark:text-dark-500'
              )}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                'relative h-7 w-12 rounded-full transition-colors',
                isAnnual ? 'bg-accent-500' : 'bg-light-300 dark:bg-dark-700'
              )}
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing"
            >
              <motion.div
                className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm"
                animate={{ x: isAnnual ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={cn(
                'text-body-sm font-medium transition-colors',
                isAnnual ? 'text-light-900 dark:text-dark-50' : 'text-light-400 dark:text-dark-500'
              )}
            >
              Annual{' '}
              <span className="text-accent-500">Save 20%</span>
            </span>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <ScrollReveal key={tier.name} direction="up" delay={0.1 * (index + 1)}>
              <motion.div
                className={cn(
                  'relative flex flex-col rounded-2xl border-2 p-8 transition-shadow duration-300',
                  tier.popular
                    ? 'border-accent-500 bg-white shadow-xl shadow-accent-500/10 dark:bg-dark-900'
                    : 'border-light-200 bg-white hover:shadow-lg dark:border-dark-800 dark:bg-dark-900'
                )}
                whileHover={{ y: -4 }}
              >
                {/* Most Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-500 px-4 py-1 text-caption font-semibold text-white shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="mb-2 text-heading-xl font-bold text-light-900 dark:text-dark-50">
                    {tier.name}
                  </h3>
                  <p className="text-body-sm text-light-500 dark:text-dark-400">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-light-900 dark:text-dark-50">
                      ${isAnnual ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-body-sm text-light-500 dark:text-dark-400">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant={tier.popular ? 'primary' : 'outline'}
                  size="lg"
                  fullWidth
                  className="mb-8"
                >
                  {tier.cta}
                </Button>

                {/* Features */}
                <ul className="space-y-3" role="list">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-accent-500"
                        aria-hidden="true"
                      />
                      <span className="text-body-md text-light-600 dark:text-dark-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Feature comparison note */}
                <p className="mt-6 text-caption text-light-400 dark:text-dark-500">
                  All plans include: {featureHighlights.join(', ')}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
