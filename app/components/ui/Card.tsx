'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'bordered';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;
  /** Enable hover lift effect */
  hover?: boolean;
  /** Hover shadow intensity */
  hoverIntensity?: 'sm' | 'md' | 'lg';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  default:
    'bg-white dark:bg-dark-900 shadow-md dark:shadow-dark-900/50 border border-light-200 dark:border-dark-800',
  elevated:
    'bg-white dark:bg-dark-900 shadow-xl dark:shadow-dark-900/50',
  bordered:
    'bg-transparent border-2 border-light-200 dark:border-dark-800',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// const hoverShadowStyles = {
//   sm: 'shadow-lg',
//   md: 'shadow-xl',
//   lg: 'shadow-2xl',
// };

/**
 * Card component with multiple variants and compound sub-components.
 * Accessible with proper aria roles.
 *
 * @example
 * ```tsx
 * <Card variant="elevated" hover>
 *   <Card.Image src="/image.jpg" alt="Description" />
 *   <Card.Content>
 *     <h3>Title</h3>
 *   </Card.Content>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hover = false,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const motionProps = hover
      ? {
          whileHover: {
            y: -6,
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
          },
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }
      : {};

    const MotionComponent = motion.div as React.ElementType;

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          'rounded-xl transition-all duration-300',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'cursor-default',
          className
        )}
        role="article"
        {...motionProps}
        {...(props as any)}
      >
        {children}
      </MotionComponent>
    );
  }
);

Card.displayName = 'Card';

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
}

/**
 * Card.Image - Image sub-component for Card with aspect ratio control.
 */
const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, aspectRatio = 'landscape', alt = '', ...props }, ref) => {
    const aspectStyles = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      landscape: 'aspect-[4/3]',
    };

    return (
      <div className={cn('overflow-hidden rounded-t-xl -m-[inherit] mb-0', aspectStyles[aspectRatio])}>
        <Image
          ref={ref as any}
          className={cn('h-full w-full object-cover transition-transform duration-500 hover:scale-105', className)}
          alt={alt}
          width={800}
          height={600}
          style={{ objectFit: 'cover' }}
          {...(props as any)}
        />
      </div>
    );
  }
);

CardImage.displayName = 'Card.Image';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Content wrapper — accepts all div props
}

/**
 * Card.Content - Content wrapper for Card body text.
 */
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
);

CardContent.displayName = 'Card.Content';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider line above footer */
  divider?: boolean;
}

/**
 * Card.Footer - Footer section for Card with optional divider.
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, divider = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 pt-4',
        divider && 'border-t border-light-200 dark:border-dark-800',
        className
      )}
      {...props}
    />
  )
);

CardFooter.displayName = 'Card.Footer';

export { Card, CardImage, CardContent, CardFooter };
export type { CardProps, CardVariant, CardImageProps };
