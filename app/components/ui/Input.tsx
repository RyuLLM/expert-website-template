'use client';

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type InputVariant = 'default' | 'filled' | 'flushed';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visual variant */
  variant?: InputVariant;
  /** Label text */
  label?: string;
  /** Helper text displayed below input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Show password toggle button (only for type="password") */
  showPasswordToggle?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Icon to render on the left side */
  icon?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default:
    'border border-light-300 bg-white dark:border-dark-700 dark:bg-dark-900 focus:border-accent-500 dark:focus:border-accent-400',
  filled:
    'border-transparent bg-light-100 dark:bg-dark-800 focus:bg-white dark:focus:bg-dark-900 focus:border-accent-500 dark:focus:border-accent-400',
  flushed:
    'border-0 border-b-2 border-light-300 bg-transparent dark:border-dark-700 rounded-none px-0 focus:border-accent-500 dark:focus:border-accent-400',
};

/**
 * Input component with label, helper text, error state, and password toggle.
 * Fully accessible with aria attributes.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   error="Invalid email"
 *   helperText="We'll never share your email"
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      label,
      helperText,
      error,
      showPasswordToggle = false,
      required = false,
      type = 'text',
      icon,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-light-700 dark:text-dark-200"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-error-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-light-400 dark:text-dark-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              'w-full rounded-lg py-2.5 text-body-md text-light-900 placeholder:text-light-400',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-accent-500/20',
              'dark:text-dark-50 dark:placeholder:text-dark-500',
              error &&
                'border-error-500 focus:border-error-500 focus:ring-error-500/20',
              isPassword && showPasswordToggle && 'pr-12',
              icon ? 'pl-10' : 'px-4',
              variantStyles[variant],
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              [error ? errorId : '', helperText ? helperId : '']
                .filter(Boolean)
                .join(' ') || undefined
            }
            required={required}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-400 hover:text-light-600 dark:text-dark-500 dark:hover:text-dark-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} className="flex items-center gap-1 text-body-sm text-error-500" role="alert">
            <AlertCircle size={14} aria-hidden="true" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-body-sm text-light-500 dark:text-dark-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps, InputVariant };
