'use client';

import React, { useRef, JSX } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration of animation in seconds */
  duration?: number;
  /** Distance to travel in pixels */
  distance?: number;
  /** Animation once (don't reverse on scroll out) */
  once?: boolean;
  /** Root margin for Intersection Observer */
  margin?: string;
  /** Stagger children animation */
  stagger?: boolean;
  /** Stagger delay between children */
  staggerDelay?: number;
  /** Additional className */
  className?: string;
  /** Tag to render */
  as?: keyof JSX.IntrinsicElements;
}

const directionVariants = {
  up: (distance: number) => ({
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  }),
  down: (distance: number) => ({
    hidden: { opacity: 0, y: -distance },
    visible: { opacity: 1, y: 0 },
  }),
  left: (distance: number) => ({
    hidden: { opacity: 0, x: -distance },
    visible: { opacity: 1, x: 0 },
  }),
  right: (distance: number) => ({
    hidden: { opacity: 0, x: distance },
    visible: { opacity: 1, x: 0 },
  }),
  none: () => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }),
};

const staggerVariants = (staggerDelay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

const childVariants = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none',
  distance: number
) => {
  const dir = directionVariants[direction](distance);
  return {
    hidden: dir.hidden,
    visible: dir.visible,
  };
};

/**
 * ScrollReveal wrapper component for animating elements into view.
 * Supports direction-based entry, stagger children, and configurable timing.
 *
 * @example
 * ```tsx
 * <ScrollReveal direction="up" delay={0.2}>
 *   <h2>This fades up on scroll</h2>
 * </ScrollReveal>
 *
 * <ScrollReveal direction="up" stagger staggerDelay={0.1}>
 *   {items.map(item => <div key={item.id}>{item.name}</div>)}
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 40,
  once = true,
  margin = '-50px',
  stagger = false,
  staggerDelay = 0.1,
  className,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  if (stagger) {
    const MotionTag = motion[Tag as keyof typeof motion] as React.ElementType;

    return (
      <MotionTag
        ref={ref}
        className={className}
        variants={staggerVariants(staggerDelay)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {React.Children.map(children, (child) => (
          <motion.div
            variants={childVariants(direction, distance)}
            transition={{ duration, delay }}
          >
            {child}
          </motion.div>
        ))}
      </MotionTag>
    );
  }

  const MotionTag = motion[Tag as keyof typeof motion] as React.ElementType;
  const dir = directionVariants[direction](distance);

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      variants={dir}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * TextReveal - animates text character by character.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' as any });

  return (
    <span ref={ref} className={cn('inline', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.3,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
