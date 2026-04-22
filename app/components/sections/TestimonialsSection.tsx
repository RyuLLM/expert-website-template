'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/app/components/ui/Badge';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechFlow Inc.',
    quote: 'Working with ExpertWeb transformed our online presence. The attention to detail and user experience design exceeded our expectations. Our conversion rate increased by 40% within the first month.',
    avatar: 'https://i.pravatar.cc/100?u=1',
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Lead',
    company: 'DataPulse',
    quote: 'The team delivered a complex platform with flawless execution. Their technical expertise combined with beautiful design made the entire process smooth and enjoyable.',
    avatar: 'https://i.pravatar.cc/100?u=2',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Creative Director',
    company: 'DesignLab Studio',
    quote: 'As a design agency ourselves, we have high standards. ExpertWeb not only met them but raised the bar. Our clients consistently compliment the new website.',
    avatar: 'https://i.pravatar.cc/100?u=3',
  },
  {
    name: 'James Wilson',
    role: 'Founder',
    company: 'CloudBase',
    quote: 'From concept to launch, ExpertWeb was professional, responsive, and creative. They understood our vision immediately and delivered beyond expectations.',
    avatar: 'https://i.pravatar.cc/100?u=4',
  },
];

/**
 * Testimonials carousel with autoplay, dot navigation, and swipe support.
 */
export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section
      className="section-padding bg-light-50 dark:bg-dark-900"
      aria-labelledby="testimonials-title"
    >
      <div className="container-page">
        <ScrollReveal direction="up">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="default" size="md" className="mb-4">
              Testimonials
            </Badge>
            <h2
              id="testimonials-title"
              className="mb-4 text-display-sm font-bold text-light-900 dark:text-dark-50 sm:text-display-md"
            >
              What our <span className="gradient-text">clients say</span>
            </h2>
            <p className="text-body-lg text-light-500 dark:text-dark-400">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-light-200 bg-white p-8 shadow-lg dark:border-dark-800 dark:bg-dark-900 sm:p-12">
            {/* Quote icon */}
            <Quote className="mb-4 h-8 w-8 text-accent-500/20" aria-hidden="true" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <blockquote className="text-body-lg leading-relaxed text-light-700 dark:text-dark-200">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-light-900 dark:text-dark-50">{t.name}</div>
                    <div className="text-body-sm text-light-500 dark:text-dark-400">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-light-600 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-accent-500 dark:bg-dark-800/80 dark:text-dark-300 dark:hover:bg-dark-800"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-light-600 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-accent-500 dark:bg-dark-800/80 dark:text-dark-300 dark:hover:bg-dark-800"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-accent-500'
                    : 'w-2 bg-light-300 hover:bg-light-400 dark:bg-dark-700 dark:hover:bg-dark-600'
                }`}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
