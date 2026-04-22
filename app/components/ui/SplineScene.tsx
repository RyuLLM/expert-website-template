'use client';

import React, { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

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
  onMouseHover?: (e: any) => void;
}

// Hardware detection for low-end devices
const shouldLoadSpline = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 2;
  
  // Test WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const noWebGL = !gl;
  
  // Don't load on mobile/low-end/no-WebGL
  return !isMobile && !isLowEnd && !noWebGL;
};

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
        3D Scene Failed to Load
      </h3>
      <p className="mb-6 text-center text-body-md text-light-600 dark:text-dark-400">
        This device may not support WebGL, or the scene is temporarily unavailable.
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
 * Interactive 3D scene using Spline (spline.design).
 * Includes hardware detection, error fallback, and performance optimizations.
 *
 * @example
 * ```tsx
 * <SplineScene
 *   scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
 *   width="100%"
 *   height="500px"
 *   interactive
 *   onMouseDown={(e) => console.log('Clicked:', e.target.name)}
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
  onMouseHover,
}: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const retryCountRef = useRef(0);
  const maxRetries = 2;

  // Check hardware compatibility on mount
  useEffect(() => {
    if (!shouldLoadSpline()) {
      setShouldRender(false);
      setHasError(true);
    }
  }, []);

  const handleLoad = useCallback((app: any) => {
    setIsLoading(false);
    clearTimeout(timeoutRef.current);
    onLoad?.(app);
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    clearTimeout(timeoutRef.current);
  }, []);

  const handleRetry = useCallback(() => {
    if (retryCountRef.current >= maxRetries) return;
    
    retryCountRef.current += 1;
    setHasError(false);
    setIsLoading(true);
    
    // Force re-render of Spline component
    setShouldRender(false);
    setTimeout(() => setShouldRender(true), 100);
  }, []);

  // Set timeout for loading (8 seconds)
  useEffect(() => {
    if (!shouldRender) return;
    
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        console.warn('Spline scene timeout - showing fallback');
        setHasError(true);
        setIsLoading(false);
      }
    }, 8000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shouldRender, isLoading]);

  // Don't render on incompatible devices
  if (!shouldRender) {
    return fallback || <ErrorFallback />;
  }

  // Error state
  if (hasError) {
    return fallback || <ErrorFallback onRetry={handleRetry} />;
  }

  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        // Prevent layout shift
        'contain-strict',
        // Prevent scroll hijacking
        '[&_canvas]:!overflow-visible',
        // Watermark hiding (CSS workaround for free plan)
        hideWatermark && '[&_spline-viewer]::part(logo) { display: none !important }',
        className
      )}
      style={containerStyle}
    >
      {/* CSS fix for Spline's overflow injection */}
      <style jsx global>{`
        /* Prevent Spline from hijacking page scroll */
        body {
          overflow: auto !important;
        }
        /* Allow clicks through if not interactive */
        .spline-non-interactive canvas {
          pointer-events: none !important;
        }
      `}</style>

      {shouldRender && (
        <Suspense fallback={showLoading ? <LoadingFallback /> : null}>
          <div className={cn(!interactive && 'spline-non-interactive')}>
            <Spline
              scene={scene}
              onLoad={handleLoad}
              onError={handleError}
              onMouseDown={onMouseDown}
              onMouseHover={onMouseHover}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
          </div>
        </Suspense>
      )}

      {/* Loading overlay */}
      {isLoading && showLoading && (
        <div className="absolute inset-0 z-10">
          <LoadingFallback />
        </div>
      )}

      {/* Performance warning for low-end devices */}
      {!shouldLoadSpline() && (
        <div className="absolute bottom-4 left-4 z-20 rounded-lg bg-warning-500/20 px-3 py-1.5 text-body-sm text-warning-800 dark:text-warning-200">
          ⚠️ 3D disabled for performance
        </div>
      )}
    </div>
  );
}

/**
 * Interactive Spline scene with controls for object manipulation.
 * Requires objects to be named in Spline editor.
 */
export function InteractiveSplineScene({
  scene,
  objectName = 'Cube',
  ...props
}: SplineSceneProps & {
  objectName?: string;
}) {
  const splineApp = useRef<any>();
  const [lastEvent, setLastEvent] = useState<string>('');

  const handleLoad = useCallback((app: any) => {
    splineApp.current = app;
    props.onLoad?.(app);
  }, [props.onLoad]);

  const handleMouseDown = useCallback((e: any) => {
    setLastEvent(`Clicked: ${e.target?.name || 'unknown'}`);
    props.onMouseDown?.(e);
  }, [props.onMouseDown]);

  const moveObject = useCallback(() => {
    if (!splineApp.current) return;
    const obj = splineApp.current.findObjectByName(objectName);
    if (obj) obj.position.x += 50;
  }, [objectName]);

  const rotateObject = useCallback(() => {
    if (!splineApp.current) return;
    const obj = splineApp.current.findObjectByName(objectName);
    if (obj) obj.rotation.y += Math.PI / 2; // 90 degrees
  }, [objectName]);

  return (
    <div className="relative">
      <SplineScene
        scene={scene}
        interactive
        onLoad={handleLoad}
        onMouseDown={handleMouseDown}
        {...props}
      />
      
      {/* Controls overlay */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        <Button size="sm" onClick={moveObject}>
          Move Right
        </Button>
        <Button size="sm" onClick={rotateObject}>
          Rotate 90°
        </Button>
      </div>

      {/* Event log */}
      {lastEvent && (
        <div className="absolute top-6 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-dark-950/80 px-4 py-2 text-body-sm text-white backdrop-blur-sm">
          {lastEvent}
        </div>
      )}
    </div>
  );
}
