'use client';

import React from 'react';
import { ExternalLink, Globe, User } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/app/components/ui/Badge';
import { ScrollReveal } from '@/app/components/layout/ScrollReveal';

const team = [
  {
    name: 'Alex Rivera',
    role: 'Creative Director',
    bio: '10+ years shaping digital experiences for Fortune 500 companies.',
    avatar: 'https://i.pravatar.cc/200?u=10',
    social: { github: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Maya Patel',
    role: 'Lead Developer',
    bio: 'Full-stack engineer passionate about accessible, performant web applications.',
    avatar: 'https://i.pravatar.cc/200?u=11',
    social: { github: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'David Kim',
    role: 'UX Designer',
    bio: 'Human-centered designer focused on creating intuitive, delightful interfaces.',
    avatar: 'https://i.pravatar.cc/200?u=12',
    social: { github: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Sophie Laurent',
    role: 'Project Manager',
    bio: 'Ensuring every project ships on time, on budget, and beyond expectations.',
    avatar: 'https://i.pravatar.cc/200?u=13',
    social: { github: '#', twitter: '#', linkedin: '#' },
  },
];

/**
 * Team / About section with photo cards, roles, bios, and hover social links.
 */
export function TeamSection() {
  return (
    <section id="about" className="section-padding" aria-labelledby="team-title">
      <div className="container-page">
        <ScrollReveal direction="up">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="default" size="md" className="mb-4">
              Our Team
            </Badge>
            <h2
              id="team-title"
              className="mb-4 text-display-sm font-bold text-light-900 dark:text-dark-50 sm:text-display-md"
            >
              Meet the <span className="gradient-text">people behind</span> the work
            </h2>
            <p className="text-body-lg text-light-500 dark:text-dark-400">
              A diverse team of creators, engineers, and strategists united by a passion for exceptional design.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} direction="up" delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-light-200 bg-white dark:border-dark-800 dark:bg-dark-900">
                {/* Avatar */}
                <div className="aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Social links overlay */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="mb-6 flex gap-3">
                    <a
                      href={member.social.github}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                      aria-label={`${member.name} GitHub`}
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Globe size={18} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <User size={18} />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-heading-md font-semibold text-light-900 dark:text-dark-50">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-body-sm font-medium text-accent-500">{member.role}</p>
                  <p className="text-body-sm text-light-500 dark:text-dark-400">{member.bio}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
