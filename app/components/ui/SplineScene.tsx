'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertCircle, RefreshCw, Cube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface SplineSceneProps {
  /** Spline scene URL (from spline.design) */
  scene: string;
  /** Width of the scene */
  width?: string | number;
  /** Height of the scene */
  height?: string | number;
  /** Additional className */
  className?: string;
  /** Whether to show loading skeleton */
  showLoading?: boolean;
  /** Whether scene is interactive (captures pointer events) */
  interactive?: boolean;
  /** Whether to hide Spline watermark (requires paid plan) */
  hideWatermark?: boolean;
  /** Fallback component if Spline fails to load */
  fallback?: React.ReactNode;
  /** Callback when scene loads */
  onLoad?: (app: any) => void;
  /** Callback on mouse down events */
  onMouseDown?: (e: any) => void;
  /** Callback on mouse hover events */
  onMouseOver?: (e: any) => void;
}

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/10 to-purple-500/10">
      <div className="text-center">
        <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-accent-500 border-t-transparent" />
        <p className="text-body-sm text-light-600 dark:text-dark-400">
          Loading 3D scene...
        </p>
      </div>
    </div>
  );
}

function ErrorFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-error-500/10 to-error-700/10 p-8">
      <AlertCircle className="mb-4 h-12 w-12 text-error-500" />
      <h3 className="mb-2 text-heading-md font-semibold text-light-900 dark:text-dark-50">
        3D Scene Unavailable
      </h3>
      <p className="mb-6 text-center text-body-md text-light-600 dark:text-dark-400">
        Spline 3D requires additional dependencies. Install @splinetool/react-spline to enable.
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          icon={<RefreshCw size={16} />}
          onClick={onRetry}
        >
          Retry
        </Button>
      )}
    </div>
  );
}

/**
 * Placeholder for Spline 3D scene.
 * Install @splinetool/react-spline to enable actual 3D rendering.
 *
 * @example
 * ```tsx
 * // Install first: npm install @splinetool/react-spline @splinetool/runtime
 * <SplineScene
 *   scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
 *   width="100%"
 *   height="500px"
 * />
 * ```
 */
export function SplineScene({
  scene,
  width = '100%',
  height = '500px',
  className,
  showLoading = true,
  interactive = false,
  hideWatermark = false,
  fallback,
  onLoad,
  onMouseDown,
  onMouseOver,
}: SplineSceneProps) {
  const [hasError, setHasError] = useState(true); // Default to error since Spline not installed
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasError(true); // Still error without dependency
    }, 1000);
  }, []);

  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // Show placeholder with installation instructions
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-500/5 to-purple-500/5',
        'contain-strict border border-dashed border-accent-500/30',
        className
      )}
      style={containerStyle}
    >
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
        <Cube className="mb-4 h-16 w-16 text-accent-500/50" />
        <h3 className="mb-2 text-heading-md font-semibold text-light-900 dark:text-dark-50">
          Spline 3D Scene
        </h3>
        <p className="mb-4 text-body-md text-light-600 dark:text-dark-400">
          Install <code className="rounded bg-light-100 px-2 py-1 font-mono text-body-sm dark:bg-dark-800">@splinetool/react-spline</code> to enable interactive 3D.
        </p>
        <div className="rounded-lg bg-light-100 p-4 font-mono text-body-sm dark:bg-dark-800">
          <div className="text-left">
            <div className="text-accent-500">npm install @splinetool/react-spline @splinetool/runtime</div>
            <div className="mt-2 text-light-500 dark:text-dark-400">
              Then replace this placeholder with actual Spline component.
            </div>
          </div>
        </div>
        <div className="mt-6 text-body-sm text-light-500 dark:text-dark-400">
          Scene URL: <span className="font-mono">{scene.substring(0, 40)}...</span>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && showLoading && (
        <div className="absolute inset-0 z-10">
          <LoadingFallback />
        </div>
      )}
    </div>
  );
}

/**
 * Interactive Spline scene placeholder.
 */
export function InteractiveSplineScene({
  scene,
  objectName = 'Cube',
  ...props
}: SplineSceneProps & {
  objectName?: string;
}) {
  return (
    <div className="relative">
      <SplineScene scene={scene} {...props} />
      
      {/* Controls overlay (disabled) */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 opacity-50">
        <Button size="sm" disabled>
          Move Right
        </Button>
        <Button size="sm" disabled>
          Rotate 90°
        </Button>
      </div>

      <div className="absolute top-6 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-dark-950/80 px-4 py-2 text-body-sm text-white backdrop-blur-sm">
        Install Spline to enable interactions
      </div>
    </div>
  );
}

export type { SplineSceneProps };
