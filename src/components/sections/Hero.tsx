import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { siteConfig } from '../../config/site';

// Suggested searches; each should match pages in content/services
const SUGGESTIONS = [
  'Business permit',
  'Barangay clearance',
  'Health services',
  'Scholarship',
  'Social welfare',
];

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { name, location } = siteConfig;

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/search?q=${encodeURIComponent(term)}` : '/search');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white">
      {/* Decorative grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 animate-fade-in">
          {/* Left: headline */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-100 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {location}
            </span>

            <h1 className="mt-2 mb-6 text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight">
              Better
              <br />
              {name}.org
            </h1>

            <p className="mb-8 max-w-xl text-lg md:text-xl text-primary-100">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 shadow-sm transition hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t('hero.viewServices')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/government"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t('hero.government')}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
                <strong>65,286</strong> {t('hero.population')}
              </span>
              <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
                <strong>46</strong> {t('hero.barangays')}
              </span>
              <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
                <strong>Region V</strong> {t('hero.region')}
              </span>
            </div>
          </div>

          {/* Right: help card */}
          <div className="flex items-stretch lg:justify-end">
            <div className="flex w-full flex-col justify-center rounded-2xl bg-white p-8 text-gray-900 shadow-xl lg:p-10">
              <p className="mb-1 text-xl font-bold">{t('hero.helpTitle')}</p>
              <p className="mb-6 text-sm text-gray-500">
                {t('hero.helpSubtitle')}
              </p>

              <form onSubmit={onSearch} className="mb-5">
                <div className="relative flex items-center">
                  <Search
                    className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={t('hero.searchPlaceholder')}
                    aria-label={t('hero.search')}
                    className="w-full rounded-xl border border-gray-200 py-4 pl-11 pr-28 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
                  >
                    {t('hero.search')}
                  </button>
                </div>
              </form>

              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                {t('hero.suggestions')}
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(term => (
                  <Link
                    key={term}
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
