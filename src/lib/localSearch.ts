import type { SearchHit } from './meilisearch';

/**
 * Minimal client-side search used when Meilisearch is not configured.
 * Every word in the query must appear (as a substring) somewhere in the
 * entry's title, description or category. Title matches rank highest.
 */
export function rankEntries(
  entries: SearchHit[],
  query: string,
  limit = 20
): SearchHit[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return entries
    .map(entry => {
      const title = entry.title.toLowerCase();
      const description = (entry.description ?? '').toLowerCase();
      const category = entry.category.toLowerCase();
      let score = 0;
      for (const term of terms) {
        const inTitle = title.includes(term);
        const inRest = description.includes(term) || category.includes(term);
        if (!inTitle && !inRest) return { entry, score: 0 };
        score += (inTitle ? 3 : 0) + (inRest ? 1 : 0);
      }
      if (title.includes(terms.join(' '))) score += 2;
      return { entry, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(result => result.entry);
}
