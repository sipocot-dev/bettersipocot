import { useMemo, useState } from 'react';
import {
  BarChart3, Users, MapPin, Building2, Map, FileText,
  ExternalLink, Trophy, Lightbulb, Shield, Zap, Globe, Search,
} from 'lucide-react';
import SEO from '../components/SEO';

type Pillar = {
  name: string;
  icon: typeof Zap;
  description: string;
  indicators: string[];
};

const pillars: Pillar[] = [
  {
    name: 'Economic Dynamism',
    icon: Zap,
    description: 'Local economy, business activity, employment, productivity and market conditions.',
    indicators: ['Size and growth of the local economy', 'Employment and productivity', 'Business registrations and compliance', 'Cost of doing business and financial access'],
  },
  {
    name: 'Government Efficiency',
    icon: Building2,
    description: 'The capacity of local government to deliver effective, transparent and responsive services.',
    indicators: ['Compliance with national directives', 'Business permit and licensing efficiency', 'Local revenue generation', 'Health, education and social protection services'],
  },
  {
    name: 'Infrastructure',
    icon: Globe,
    description: 'The physical and digital infrastructure that enables mobility, services and investment.',
    indicators: ['Road network and transport access', 'Water, power and basic utilities', 'Education and health facilities', 'Information and communications technology'],
  },
  {
    name: 'Resiliency',
    icon: Shield,
    description: 'Preparedness, risk management and the ability to withstand and recover from disruptions.',
    indicators: ['Land-use and disaster risk reduction plans', 'Early warning and emergency response systems', 'Disaster risk reduction financing', 'Resilient utilities and sanitation'],
  },
  {
    name: 'Innovation',
    icon: Lightbulb,
    description: 'The ability to build skills, use technology and support new ideas and creative activity.',
    indicators: ['ICT plans and digital government services', 'STEM and technical-vocational graduates', 'Technology access and connectivity', 'Innovation and creative-economy programs'],
  },
];

const profileStats = [
  { icon: Users, value: '65,286', label: 'Population', note: '2024 Census of Population · PSA' },
  { icon: MapPin, value: '46', label: 'Barangays', note: 'PSGC administrative divisions' },
  { icon: Map, value: '242.06 km²', label: 'Land area', note: 'Camarines Sur Provincial Government' },
  { icon: Building2, value: '1st Class', label: 'Income class', note: 'PSGC classification' },
];

const sources = [
  { label: 'DTI Cities and Municipalities Competitiveness Index', detail: 'Sipocot LGU profile and competitiveness indicators', href: 'https://cmci.dti.gov.ph/lgu-profile.php?lgu=Sipocot' },
  { label: 'Philippine Statistics Authority', detail: '2024 Census of Population – Camarines Sur', href: 'https://rsso05.psa.gov.ph/system/files/attachment-dir/Special%20Release%202024%20POPCEN%20Highlights%20-%20Camarines%20Sur.pdf' },
  { label: 'PSA Philippine Standard Geographic Code', detail: 'Municipality population and administrative classification', href: 'https://psa.gov.ph/classification/psgc/citimuni/0501700000' },
  { label: 'Camarines Sur Provincial Government', detail: 'Municipal socio-economic profile and land area', href: 'https://camarinessur.gov.ph/about/quick-facts' },
];

export default function Statistics() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pillars;
    return pillars.filter(p =>
      [p.name, p.description, ...p.indicators].join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <SEO
        title="Statistics & Municipal Profile"
        description="Sipocot, Camarines Sur municipal profile, population and local competitiveness indicators from official sources."
        keywords="Sipocot statistics, Sipocot population, CMCI, Camarines Sur, municipal profile"
      />
      <main className="grow bg-gray-50">
        <header
          className="relative overflow-hidden py-16 text-white"
          style={{
            backgroundColor: '#003087',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full px-3 py-1.5" style={{ background: 'rgba(255,255,255,.12)' }}>
              <BarChart3 className="h-4 w-4 text-blue-100" />
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-100">Municipality of Sipocot · Camarines Sur</span>
            </div>
            <h1 className="mb-3 text-4xl font-black sm:text-5xl">Statistics</h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100">
              A data-led snapshot of Sipocot — its people, communities and local competitiveness.
            </p>
            <p className="mt-5 text-xs text-blue-200">Official data sources · Reference years shown with each indicator</p>
          </div>
        </header>

        <section className="border-b border-gray-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-gray-900">Municipal Profile</h2>
                <p className="mt-1 text-sm text-gray-500">Verified municipal facts from PSA and the provincial government.</p>
              </div>
              <a href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Sipocot" target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 sm:flex">
                DTI CMCI profile <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {profileStats.map(({ icon: Icon, value, label, note }) => (
                <article key={label} className="rounded-xl border border-gray-100 border-t-4 border-t-primary-700 bg-gray-50 p-5 transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-100 text-primary-700"><Icon className="h-4 w-4" /></div>
                  <div className="mb-1 text-2xl font-black leading-tight text-gray-900">{value}</div>
                  <div className="text-sm font-semibold text-gray-800">{label}</div>
                  <div className="mt-1 text-xs text-gray-500">{note}</div>
                </article>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500">Population refers to the 2024 Census count. Do not compare it with older municipal profile pages that display the 2020 census figure.</p>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900">DTI CMCI · Five pillars</h2>
                <p className="mt-1 max-w-3xl text-sm text-gray-500">The Cities and Municipalities Competitiveness Index evaluates local governments across five pillars. The categories below describe the framework; Sipocot’s individual scores and ranks are not published here until verified against the DTI profile.</p>
              </div>
              <a href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Sipocot" target="_blank" rel="noreferrer" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 sm:flex">
                View DTI data <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
              <div className="flex items-start gap-3">
                <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <p className="text-sm font-bold text-amber-900">CMCI score and rank verification pending</p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-800">The official DTI profile requires an interactive page request that could not be independently retrieved during implementation. No rank, score, or indicator value has been inferred from another municipality or year.</p>
                </div>
              </div>
            </div>

            <div className="mb-5 flex max-w-xl items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search CMCI pillars or indicators"
                className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                aria-label="Search CMCI pillars or indicators"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(({ name, icon: Icon, description, indicators }) => (
                <article key={name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700"><Icon className="h-5 w-5" /></div>
                    <div>
                      <h3 className="text-sm font-black text-gray-900">{name}</h3>
                      <span className="text-xs text-gray-500">DTI CMCI pillar</span>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Indicator areas</p>
                    <ul className="space-y-2">
                      {indicators.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-gray-600"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-500" />{item}</li>)}
                    </ul>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
                    <span className="text-gray-500">Sipocot score / rank</span>
                    <span className="font-semibold text-amber-700">Awaiting verification</span>
                  </div>
                </article>
              ))}
              {filtered.length === 0 && <p className="col-span-full rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">No indicators match “{query}”.</p>}
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-6">
              <h2 className="text-xl font-black text-gray-900">Municipal data &amp; resources</h2>
              <p className="mt-1 text-sm text-gray-500">Primary sources used for the figures and CMCI framework on this page.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sources.map(source => (
                <a key={source.label} href={source.href} target="_blank" rel="noreferrer" className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:border-primary-200 hover:shadow-md">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-gray-900 transition-colors group-hover:text-primary-700">{source.label}</div>
                    <div className="mt-1 text-xs text-gray-500">{source.detail}</div>
                  </div>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                </a>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Data notes</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">Population is from the PSA 2024 Census of Population. Land area and income class are from the Camarines Sur Provincial Government and PSA PSGC references. The CMCI pillars follow DTI’s framework. Indicator-level Sipocot results, scores and national ranks are intentionally omitted until the official DTI profile can be checked.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
