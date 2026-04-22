'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon element to display (Lucide icon component) */
  icon?: React.ReactNode;
  /** Icon position relative to text */
  iconPosition?: 'left' | 'right';
  /** Full width button */
  fullWidth?: boolean;
  /** Ref forwarding for accessibility */
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-950',
  secondary:
    'bg-dark-900 text-white hover:bg-dark-800 active:bg-dark-700 dark:bg-white dark:text-dark-900 dark:hover:bg-dark-100 shadow-sm',
  outline:
    'border-2 border-accent-500/30 text-accent-500 hover:bg-accent-500/10 active:bg-accent-500/20 dark:border-accent-400/30 dark:text-accent-400',
  ghost:
    'text-light-600 hover:text-light-900 hover:bg-light-100 dark:text-dark-200 dark:hover:text-dark-50 dark:hover:bg-dark-800',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-body-sm gap-1.5',
  md: 'px-4 py-2.5 text-body-md gap-2',
  lg: 'px-6 py-3 text-body-lg gap-2.5',
  xl: 'px-8 py-4 text-heading-lg gap-3',
};

const LoadingSpinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button component with multiple variants, sizes, and icon support.
 * Accessible with full keyboard navigation and focus management.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" icon={<ArrowRight />} iconPosition="right">
 *   Get Started
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref as any}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        {...(props as any)}
      >
        {loading && <LoadingSpinner />}
        {!loading && icon && iconPosition === 'left' && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
