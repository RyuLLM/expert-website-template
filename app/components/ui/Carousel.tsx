'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface CarouselItem {
  /** Unique identifier */
  id: string | number;
  /** Content to render */
  content: React.ReactNode;
  /** Optional background color */
  bgColor?: string;
}

interface CarouselProps {
  /** Array of carousel items */
  items: CarouselItem[];
  /** Auto-play interval in milliseconds (0 = disabled) */
  autoPlay?: number;
  /** Show navigation dots */
  showDots?: boolean;
  /** Show next/prev buttons */
  showArrows?: boolean;
  /** Show play/pause button */
  showPlayPause?: boolean;
  /** Transition duration in seconds */
  duration?: number;
  /** Additional className */
  className?: string;
  /** Callback when active index changes */
  onIndexChange?: (index: number) => void;
}

/**
 * Interactive carousel with auto-play, smooth transitions, and keyboard navigation.
 * Supports touch swipe on mobile.
 *
 * @example
 * ```tsx
 * <Carousel
 *   items={[
 *     { id: 1, content: <HeroSlide1 /> },
 *     { id: 2, content: <HeroSlide2 /> },
 *   ]}
 *   autoPlay={5000}
 *   showDots
 *   showArrows
 * />
 * ```
 */
export function Carousel({
  items,
  autoPlay = 0,
  showDots = true,
  showArrows = true,
  showPlayPause = true,
  duration = 0.5,
  className,
  onIndexChange,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay > 0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || autoPlay === 0) return;

    const interval = setInterval(nextSlide, autoPlay);
    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, nextSlide]);

  // Callback when index changes
  useEffect(() => {
    onIndexChange?.(activeIndex);
  }, [activeIndex, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  if (items.length === 0) return null;

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl', className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides container */}
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ backgroundColor: items[activeIndex].bgColor }}
          >
            {items[activeIndex].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                idx === activeIndex
                  ? 'w-6 bg-accent-500'
                  : 'bg-white/50 hover:bg-white/80'
              )}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === activeIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Play/pause button */}
      {showPlayPause && autoPlay > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </Button>
      )}

      {/* Slide counter */}
      <div className="absolute bottom-4 right-4 rounded-full bg-dark-950/60 px-3 py-1 text-body-sm text-white backdrop-blur-sm">
        {activeIndex + 1} / {items.length}
      </div>
    </div>
  );
}

export type { CarouselProps, CarouselItem };
