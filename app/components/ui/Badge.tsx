import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Show dot indicator */
  dot?: boolean;
  /** Size preset */
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
  success:
    'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
  warning:
    'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
  error:
    'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-caption',
  md: 'px-2.5 py-1 text-body-sm',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-accent-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
};

/**
 * Badge component for labels, status indicators, and tags.
 * Supports dot indicator for visual status signaling.
 *
 * @example
 * ```tsx
 * <Badge variant="success" dot>Active</Badge>
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', dot = false, size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        role="status"
        {...props}
      >
        {dot && (
          <span
            className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps, BadgeVariant };
