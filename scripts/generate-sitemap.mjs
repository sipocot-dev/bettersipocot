// Generates public/sitemap.xml from the YAML content tree.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const root = path.resolve(import.meta.dirname, '..');
const siteUrl = (
  process.env.VITE_WEBSITE_URL || 'https://bettersipocot.org'
).replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const read = file => load(fs.readFileSync(path.join(root, file), 'utf8'));

const urls = [{ loc: '/', priority: '1.0' }];

for (const [type, file] of [
  ['services', 'src/data/services.yaml'],
  ['government', 'src/data/government.yaml'],
]) {
  urls.push({ loc: `/${type}`, priority: '0.8' });
  for (const cat of read(file).categories ?? []) {
    urls.push({ loc: `/${type}/${cat.slug}`, priority: '0.7' });
    const indexFile = `content/${type}/${cat.slug}/index.yaml`;
    if (!fs.existsSync(path.join(root, indexFile))) continue;
    for (const page of read(indexFile).pages ?? []) {
      if (!page.slug) continue;
      urls.push({ loc: `/${type}/${cat.slug}/${page.slug}`, priority: '0.6' });
    }
  }
}


// Include the statically generated barangay directory and its detail routes.
const barangaySource = fs.readFileSync(path.join(root, 'src/data/barangays.ts'), 'utf8');
const barangaySlugs = [...barangaySource.matchAll(/slug: '([^']+)'/g)].map(match => match[1]);
urls.push({ loc: '/government/barangays', priority: '0.8' });
for (const slug of barangaySlugs) {
  urls.push({ loc: `/government/barangays/${slug}`, priority: '0.6' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${siteUrl}${u.loc === '/' ? '' : u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
