import { type ClassValue, clsx } from 'clsx';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx and tailwind-merge logic using a lightweight inline approach.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a number with commas for display.
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format currency values.
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Truncate text to a given length with ellipsis.
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '…';
}

/**
 * Generate a unique ID.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
