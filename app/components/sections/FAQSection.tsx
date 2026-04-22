'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/app/components/ui/Badge';
import { Input } from '@/app/components/ui/Input';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How long does a typical project take?',
    answer: 'Timeline depends on scope, but most projects range from 4-12 weeks. A simple landing page might take 2-3 weeks, while a full platform could take 2-3 months. We provide a detailed timeline during our discovery phase.',
  },
  {
    question: 'What is your design process?',
    answer: 'We follow a proven 5-step process: Discovery (understanding your needs), Design (creating mockups and prototypes), Development (building the solution), Review (iterative feedback), and Launch (deployment and support).',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes! We offer maintenance and support packages to keep your site running smoothly. This includes security updates, performance monitoring, content updates, and priority support.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We work with modern, industry-standard technologies: Next.js, React, TypeScript, Tailwind CSS, and Node.js. We choose the best tech stack based on your specific project requirements.',
  },
  {
    question: 'Can you work with my existing brand guidelines?',
    answer: 'Absolutely. We integrate seamlessly with your existing brand identity. Whether you have a full brand guide or just a logo, we\'ll ensure consistency across all design elements.',
  },
  {
    question: 'What about SEO and performance?',
    answer: 'SEO and performance are core to our process. Every site we build follows best practices for search engine optimization and achieves 95+ Lighthouse scores. We also provide ongoing optimization recommendations.',
  },
  {
    question: 'Do you provide hosting?',
    answer: 'We recommend and can set up hosting on leading platforms like Vercel, Netlify, or AWS. We handle the configuration and deployment, ensuring optimal performance and reliability.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'We offer transparent, project-based pricing. After understanding your requirements, we provide a detailed quote with clear deliverables and milestones. See our pricing section for starting ranges.',
  },
];

/**
 * FAQ accordion section with AnimatePresence and optional search filter.
 */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding" aria-labelledby="faq-title">
      <div className="container-page">
        <ScrollReveal direction="up">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="default" size="md" className="mb-4">
              FAQ
            </Badge>
            <h2
              id="faq-title"
              className="mb-4 text-display-sm font-bold text-light-900 dark:text-dark-50 sm:text-display-md"
            >
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
            <p className="text-body-lg text-light-500 dark:text-dark-400">
              Everything you need to know about working with us.
            </p>
          </div>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mx-auto mb-8 max-w-md">
            <Input
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              variant="filled"
              aria-label="Search frequently asked questions"
            />
          </div>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="mx-auto max-w-3xl">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-body-md text-light-400 dark:text-dark-500">
              No results found for &ldquo;{searchQuery}&rdquo;
            </p>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <ScrollReveal key={faq.question} direction="up" delay={index * 0.05}>
                  <div
                    className={cn(
                      'overflow-hidden rounded-xl border transition-colors duration-200',
                      openIndex === index
                        ? 'border-accent-500/30 bg-accent-50/50 dark:border-accent-500/20 dark:bg-accent-500/5'
                        : 'border-light-200 bg-white hover:border-light-300 dark:border-dark-800 dark:bg-dark-900 dark:hover:border-dark-700'
                    )}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="pr-4 text-heading-md font-medium text-light-900 dark:text-dark-50">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 text-light-400 dark:text-dark-500"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-5">
                            <p className="text-body-md leading-relaxed text-light-600 dark:text-dark-300">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
