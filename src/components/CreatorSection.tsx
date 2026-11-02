/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, GraduationCap, Clock, BookOpen, ExternalLink, MessageCircle } from 'lucide-react';

export interface TeachingExperienceInfo {
  years: number;
  months: number;
  shortLabel: string;
  fullLabel: string;
}

/**
 * Calculates real-time teaching experience starting from late 2023 (2023-2024 academic year).
 * Automatically increments as real time passes.
 */
export function calculateTeachingExperience(now: Date = new Date()): TeachingExperienceInfo {
  const startDate = new Date(2023, 8, 1); // September 2023 (2023-2024 academic year)
  const diffMs = Math.max(0, now.getTime() - startDate.getTime());
  const totalMonths = Math.max(12, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.4375)));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const shortLabel = `${years}+ ${years === 1 ? 'Year' : 'Years'} Experience`;
  const fullLabel =
    months > 0
      ? `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'} of active teaching (since 2023–2024)`
      : `${years}+ years of active teaching (since 2023–2024)`;

  return {
    years,
    months,
    shortLabel,
    fullLabel,
  };
}

interface CreatorSectionProps {
  photoUrl?: string;
}

export const CreatorSection: React.FC<CreatorSectionProps> = ({ photoUrl }) => {
  const [imageError, setImageError] = useState(false);
  const experience = calculateTeachingExperience();

  const showPhoto = Boolean(photoUrl) && !imageError;

  return (
    <section
      id="about-creator"
      className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-6 scroll-mt-20"
    >
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
        {/* Subtle decorative editorial accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-50/70 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Avatar + Bio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-3xl">
            {/* Creator Photo or Monogram Avatar */}
            <div className="relative shrink-0">
              {showPhoto ? (
                <img
                  src={photoUrl}
                  alt="Ollohberdi Shokirov — English Teacher & Creator of Articles ED"
                  onError={() => setImageError(true)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-stone-900/10 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-stone-900 text-white flex flex-col items-center justify-center border-2 border-stone-800 shadow-sm select-none">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-amber-400">
                    OS
                  </span>
                  <span className="text-2xs uppercase tracking-widest text-stone-400 mt-1 font-mono">
                    Teacher
                  </span>
                </div>
              )}
              <div
                title="Active English Educator"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-xs border-2 border-white"
              >
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>

            {/* Creator Details */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200/80">
                  Creator &amp; English Teacher
                </span>
                <span className="inline-flex items-center gap-1.5 text-2xs font-mono font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/70">
                  <Clock className="w-3 h-3 text-amber-700" />
                  {experience.shortLabel}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                  Ollohberdi Shokirov
                </h2>
                <p className="text-xs font-mono text-stone-500 mt-0.5">
                  {experience.fullLabel}
                </p>
              </div>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                I started teaching English in 2023–2024 and built <strong className="font-semibold text-stone-900">Articles ED (Every day)</strong> to give B1, B2, and C1 learners authentic, thought-provoking reading materials on science, history, psychology, and technology—complete with interactive vocabulary practice and printable PDF study worksheets.
              </p>
            </div>
          </div>

          {/* Right: Direct Telegram Contact Card */}
          <div className="w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-stone-200/80 pt-5 md:pt-0 md:pl-8 flex flex-col items-start md:items-end justify-center gap-3">
            <div className="text-left md:text-right space-y-1">
              <span className="text-2xs font-mono uppercase tracking-wider text-stone-400 block">
                Questions, Feedback, or English Lessons?
              </span>
              <span className="text-sm font-semibold text-stone-900 block">
                Connect with me on Telegram
              </span>
            </div>

            <a
              href="https://t.me/ShokirovOllohberdi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all w-full sm:w-auto group"
            >
              <Send className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>@ShokirovOllohberdi</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
