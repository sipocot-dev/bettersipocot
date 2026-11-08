import {
  governmentCategories,
  loadCategoryIndex,
  serviceCategories,
  type Category,
} from '../data/yamlLoader';
import { rankEntries } from './localSearch';
import { SEARCH_INDEX, searchClient, type SearchHit } from './meilisearch';

let indexPromise: Promise<SearchHit[]> | null = null;

async function buildEntries(
  type: 'service' | 'government',
  categories: Category[]
): Promise<SearchHit[]> {
  const base = type === 'service' ? 'services' : 'government';
  const groups = await Promise.all(
    categories.map(async category => {
      const index = await loadCategoryIndex(category.slug);
      const entries: SearchHit[] = [
        {
          id: `${type}-${category.slug}`,
          title: category.category,
          description: category.description,
          type,
          category: category.category,
          categorySlug: category.slug,
          slug: category.slug,
          url: `/${base}/${category.slug}`,
        },
      ];
      for (const page of index.pages) {
        if (!page.slug) continue;
        entries.push({
          id: `${type}-${category.slug}-${page.slug}`,
          title: page.name,
          description: page.description ?? '',
          type,
          category: category.category,
          categorySlug: category.slug,
          slug: page.slug,
          url: `/${base}/${category.slug}/${page.slug}`,
        });
      }
      return entries;
    })
  );
  return groups.flat();
}

function getLocalIndex(): Promise<SearchHit[]> {
  indexPromise ??= Promise.all([
    buildEntries('service', serviceCategories.categories),
    buildEntries('government', governmentCategories.categories),
  ]).then(([services, government]) => [...services, ...government]);
  return indexPromise;
}

/** Searches Meilisearch when configured, otherwise the built-in local index. */
export async function searchContent(query: string): Promise<SearchHit[]> {
  if (searchClient) {
    const res = await searchClient
      .index(SEARCH_INDEX)
      .search<SearchHit>(query, { limit: 20 });
    return res.hits;
  }
  return rankEntries(await getLocalIndex(), query);
}
