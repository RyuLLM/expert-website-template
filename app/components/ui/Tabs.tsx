'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  /** Tab ID */
  id: string;
  /** Tab label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Tab content */
  content: React.ReactNode;
  /** Disable this tab */
  disabled?: boolean;
}

interface TabsProps {
  /** Array of tab objects */
  tabs: Tab[];
  /** Default active tab ID */
  defaultTab?: string;
  /** Active tab ID (controlled) */
  activeTab?: string;
  /** Tab change handler */
  onTabChange?: (tabId: string) => void;
  /** Tabs alignment */
  alignment?: 'start' | 'center' | 'stretch';
  /** Additional className */
  className?: string;
  /** Tab list className */
  tabListClassName?: string;
  /** Tab panel className */
  tabPanelClassName?: string;
}

const alignmentStyles = {
  start: 'justify-start',
  center: 'justify-center',
  stretch: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
};

/**
 * Accessible Tabs component with keyboard navigation and animated indicator.
 * Follows WAI-ARIA tabs pattern.
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'First', content: <p>Content 1</p> },
 *     { id: 'tab2', label: 'Second', content: <p>Content 2</p> },
 *   ]}
 * />
 * ```
 */
export function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  alignment = 'start',
  className,
  tabListClassName,
  tabPanelClassName,
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onTabChange?.(tabId);
    },
    [isControlled, onTabChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;
      const enabledTabs = tabs.filter((t) => !t.disabled);

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (currentIndex + 1) % tabs.length;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      // Skip disabled tabs
      const targetTab = tabs[newIndex];
      if (targetTab?.disabled) {
        const nextEnabled = enabledTabs.find((t) => !t.disabled);
        if (nextEnabled) {
          newIndex = tabs.findIndex((t) => t.id === nextEnabled.id);
        }
      }

      if (tabs[newIndex]) {
        handleTabClick(tabs[newIndex].id);
        const tabButton = tabListRef.current?.querySelector<HTMLButtonElement>(
          `[data-tab-id="${tabs[newIndex].id}"]`
        );
        tabButton?.focus();
      }
    },
    [tabs, handleTabClick]
  );

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const activeTabData = tabs[activeIndex];

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        ref={tabListRef}
        className={cn(
          'relative flex gap-1 rounded-xl bg-light-100 p-1 dark:bg-dark-800',
          alignmentStyles[alignment],
          tabListClassName
        )}
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={tab.id === activeTab ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'relative z-10 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-body-sm font-medium',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
              'disabled:cursor-not-allowed disabled:opacity-40',
              tab.id === activeTab
                ? 'text-accent-600 dark:text-accent-400'
                : 'text-light-500 hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-200',
              alignment === 'stretch' && 'w-full'
            )}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
        {/* Animated indicator */}
        {activeIndex >= 0 && (
          <motion.div
            className="absolute inset-y-1 z-0 rounded-lg bg-white shadow-sm dark:bg-dark-700"
            layoutId="activeTab"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              left: `${(activeIndex / tabs.length) * 100}%`,
              width: `${(1 / tabs.length) * 100}%`,
            }}
          />
        )}
      </div>

      {/* Tab Panels */}
      {activeTabData && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTabData.id}`}
          aria-labelledby={`tab-${activeTabData.id}`}
          className={cn('mt-6', tabPanelClassName)}
        >
          {activeTabData.content}
        </div>
      )}
    </div>
  );
}
