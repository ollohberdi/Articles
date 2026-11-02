/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CEFRLevel = 'B1' | 'B2' | 'C1';

export interface ScoreResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  performanceBand: 'Mastery' | 'Proficient' | 'Developing' | 'Needs Review';
}

/**
 * Calculates user quiz score and categorizes mastery based on CEFR standards
 */
export function calculateQuizScore(correct: number, total: number): ScoreResult {
  if (total <= 0) {
    return {
      score: 0,
      total: 0,
      percentage: 0,
      passed: false,
      performanceBand: 'Needs Review',
    };
  }

  const clampedCorrect = Math.max(0, Math.min(correct, total));
  const percentage = Math.round((clampedCorrect / total) * 100);

  let performanceBand: ScoreResult['performanceBand'];
  if (percentage >= 85) {
    performanceBand = 'Mastery';
  } else if (percentage >= 70) {
    performanceBand = 'Proficient';
  } else if (percentage >= 50) {
    performanceBand = 'Developing';
  } else {
    performanceBand = 'Needs Review';
  }

  return {
    score: clampedCorrect,
    total,
    percentage,
    passed: percentage >= 70,
    performanceBand,
  };
}

/**
 * Calculates next Spaced Repetition (SRS) interval in days
 * grade: 0 (Again), 1 (Hard), 2 (Good), 3 (Easy)
 */
export function calculateNextSRSInterval(
  previousInterval: number,
  repetitions: number,
  grade: 0 | 1 | 2 | 3
): { intervalDays: number; newRepetitions: number } {
  if (grade === 0) {
    return { intervalDays: 1, newRepetitions: 0 };
  }

  if (repetitions === 0) {
    return { intervalDays: 1, newRepetitions: 1 };
  } else if (repetitions === 1) {
    return { intervalDays: grade === 3 ? 4 : 3, newRepetitions: 2 };
  } else {
    const multiplier = grade === 3 ? 2.5 : grade === 2 ? 1.8 : 1.2;
    const nextInterval = Math.round(previousInterval * multiplier);
    return {
      intervalDays: Math.max(1, nextInterval),
      newRepetitions: repetitions + 1,
    };
  }
}

/**
 * Normalizes and checks if a cloze/fill-in-the-blank answer matches expected
 */
export function verifyClozeAnswer(userInput: string, expectedWord: string): boolean {
  const cleanUser = userInput.trim().toLowerCase();
  const cleanExpected = expectedWord.trim().toLowerCase();
  return cleanUser === cleanExpected;
}

/**
 * Verifies matching definitions or collocations
 */
export function verifyMatchingPairs(
  userPairs: Record<string, string>,
  solutionMap: Record<string, string>
): { correctCount: number; totalPairs: number; matches: Record<string, boolean> } {
  const keys = Object.keys(solutionMap);
  let correctCount = 0;
  const matches: Record<string, boolean> = {};

  for (const key of keys) {
    const isCorrect = userPairs[key] === solutionMap[key];
    matches[key] = isCorrect;
    if (isCorrect) correctCount++;
  }

  return {
    correctCount,
    totalPairs: keys.length,
    matches,
  };
}

/**
 * Filters articles based on CEFR level, topic category, and search query
 */
export function filterArticles<
  T extends {
    id: string;
    level: CEFRLevel;
    category: string;
    title: string;
    subtitle?: string;
    targetVocabulary?: { word: string }[];
    paragraphs?: string[];
  }
>(
  articles: T[],
  filters: { level?: CEFRLevel | 'ALL'; category?: string; searchQuery?: string }
): T[] {
  return articles.filter((article) => {
    if (filters.level && filters.level !== 'ALL' && article.level !== filters.level) {
      return false;
    }
    if (filters.category && filters.category !== 'ALL' && article.category !== filters.category) {
      return false;
    }
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      const inTitle = article.title.toLowerCase().includes(q);
      const inSubtitle = article.subtitle?.toLowerCase().includes(q) ?? false;
      const inVocabulary =
        article.targetVocabulary?.some((v) => v.word.toLowerCase().includes(q)) ?? false;
      const inParagraphs =
        article.paragraphs?.some((p) => p.toLowerCase().includes(q)) ?? false;
      const inCategory = article.category.toLowerCase().includes(q);

      if (!inTitle && !inSubtitle && !inVocabulary && !inParagraphs && !inCategory) {
        return false;
      }
    }
    return true;
  });
}
