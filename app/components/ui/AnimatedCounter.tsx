'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  /** Target number to count to */
  end: number;
  /** Duration of animation in seconds */
  duration?: number;
  /** Delay before starting (seconds) */
  delay?: number;
  /** Format function (e.g., add commas, currency) */
  format?: (value: number) => string;
  /** Whether to show plus sign for numbers >= end */
  showPlus?: boolean;
  /** Prefix text */
  prefix?: string;
  /** Suffix text */
  suffix?: string;
  /** Additional className */
  className?: string;
  /** Easing function */
  ease?: (t: number) => number;
}

const defaultEase = (t: number) => 1 - Math.pow(1 - t, 3); // cubic out

/**
 * Animated counter that counts from 0 to target number.
 * Triggers when element comes into view.
 *
 * @example
 * ```tsx
 * <AnimatedCounter end={1000} duration={2} suffix="+" />
 * // Renders: 0 → 1000+ (animated)
 * ```
 */
export function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  format = (n) => n.toLocaleString(),
  showPlus = false,
  prefix = '',
  suffix = '',
  className,
  ease = defaultEase,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' as any });
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const startAnimation = () => {
      startTimeRef.current = Date.now();

      const animate = () => {
        if (!startTimeRef.current) return;

        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const eased = ease(progress);
        const current = Math.floor(eased * end);

        setCount(current);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else if (showPlus && current >= end) {
          setCount(end);
        }
      };

      // Initial delay
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, delay * 1000);
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, end, duration, delay, ease, showPlus]);

  const displayCount = showPlus && count >= end ? `${end}+` : format(count);
  const displayText = `${prefix}${displayCount}${suffix}`;

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block font-semibold', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayText}
    </motion.span>
  );
}

/**
 * Counter group for displaying multiple stats in a grid.
 */
export function CounterGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-2 gap-8 md:grid-cols-4', className)}>
      {children}
    </div>
  );
}

/**
 * Individual counter item with label.
 */
export function CounterItem({
  end,
  label,
  description,
  ...props
}: AnimatedCounterProps & {
  label: string;
  description?: string;
}) {
  return (
    <div className="text-center">
      <div className="mb-2 text-heading-2xl font-bold text-accent-500 dark:text-accent-400">
        <AnimatedCounter {...props} end={end} />
      </div>
      <h3 className="text-heading-md font-semibold text-light-900 dark:text-dark-50">
        {label}
      </h3>
      {description && (
        <p className="mt-1 text-body-sm text-light-600 dark:text-dark-400">
          {description}
        </p>
      )}
    </div>
  );
}

export type { AnimatedCounterProps };
