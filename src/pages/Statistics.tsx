import { useMemo, useState } from 'react';
import { BarChart3, Building2, ExternalLink, Globe, MapPin, Search, Users } from 'lucide-react';
import SEO from '../components/SEO';

type Indicator = { name: string; rank: number };
type Pillar = {
  name: string;
  rank: number;
  score: number;
  indicators: Indicator[];
};

const totalMunicipalities = 509;
const pillars: Pillar[] = [
  {
    name: 'Economic Dynamism',
    rank: 401,
    score: 2.8421,
    indicators: [
      { name: 'Local Economy Size', rank: 204 },
      { name: 'Local Economy Growth', rank: 62 },
      { name: 'Active Establishments in the Locality', rank: 273 },
      { name: 'Safety Compliant Business', rank: 295 },
      { name: 'Employment Generation', rank: 251 },
      { name: 'Cost of Living', rank: 33 },
      { name: 'Cost of Doing Business', rank: 417 },
      { name: 'Financial Deepening', rank: 291 },
      { name: 'Productivity', rank: 221 },
      { name: 'Presence of Business and Professional Organizations', rank: 90 },
    ],
  },
  {
    name: 'Government Efficiency',
    rank: 318,
    score: 8.1657,
    indicators: [
      { name: 'Compliance to National Directives', rank: 3 },
      { name: 'Presence of Investment Promotion Unit', rank: 4 },
      { name: 'Compliance to ARTA Citizens Charter', rank: 1 },
      { name: 'Capacity to Generate Local Resource', rank: 221 },
      { name: 'Capacity of Health Services', rank: 312 },
      { name: 'Capacity of School Services', rank: 202 },
      { name: 'Recognition of Performance', rank: 278 },
      { name: 'Getting Business Permits', rank: 1 },
      { name: 'Peace and Order', rank: 49 },
      { name: 'Social Protection', rank: 436 },
    ],
  },
  {
    name: 'Infrastructure',
    rank: 307,
    score: 2.3484,
    indicators: [
      { name: 'Road Network', rank: 13 },
      { name: 'Distance to Ports', rank: 220 },
      { name: 'Availability of Basic Utilities', rank: 307 },
      { name: 'Transportation Vehicles', rank: 324 },
      { name: 'Education', rank: 189 },
      { name: 'Health', rank: 363 },
      { name: 'LGU Investment', rank: 80 },
      { name: 'Accommodation Capacity', rank: 240 },
      { name: 'Information Technology Capacity', rank: 53 },
      { name: 'Financial Technology Capacity', rank: 64 },
    ],
  },
  {
    name: 'Resiliency',
    rank: 459,
    score: 10.6352,
    indicators: [
      { name: 'Land Use Plan', rank: 15 },
      { name: 'Disaster Risk Reduction Plan', rank: 2 },
      { name: 'Annual Disaster Drill', rank: 109 },
      { name: 'Early Warning System', rank: 127 },
      { name: 'Budget for DRRMP', rank: 45 },
      { name: 'Local Risk Assessments', rank: 1 },
      { name: 'Emergency Infrastructure', rank: 380 },
      { name: 'Utilities', rank: 180 },
      { name: 'Employed Population', rank: 309 },
      { name: 'Sanitary System', rank: 26 },
    ],
  },
  {
    name: 'Innovation',
    rank: 120,
    score: 7.0548,
    indicators: [
      { name: 'ICT Plan', rank: 1 },
      { name: 'Innovation Financing: R&D Expenditures Allotment', rank: 43 },
      { name: 'ICT Use: E-BPLS Software', rank: 1 },
      { name: 'Online Payment Facilities', rank: 1 },
      { name: 'STEM Graduates', rank: 186 },
      { name: 'Intellectual Property Registration', rank: 168 },
      { name: 'Internet Capability', rank: 69 },
      { name: 'Availability of Basic Internet Service', rank: 342 },
      { name: 'Start Up and Innovation Facilities', rank: 118 },
      { name: 'New Technology', rank: 32 },
    ],
  },
];

const ordinal = (value: number) => {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  return `${value}${value % 10 === 1 ? 'st' : value % 10 === 2 ? 'nd' : value % 10 === 3 ? 'rd' : 'th'}`;
};

function RadarChart({ indicators }: { indicators: Indicator[] }) {
  const center = 150;
  const radius = 112;
  const count = indicators.length;
  const angle = (index: number) => -Math.PI / 2 + (2 * Math.PI * index) / count;
  const point = (index: number, scale: number) => ({
    x: center + Math.cos(angle(index)) * radius * scale,
    y: center + Math.sin(angle(index)) * radius * scale,
  });
  const values = indicators.map(item => (totalMunicipalities + 1 - item.rank) / totalMunicipalities);
  const polygon = values.map((value, index) => {
    const p = point(index, value);
    return `${p.x},${p.y}`;
  }).join(' ');
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 300" role="img" aria-label="Radar chart of Sipocot indicator relative standings">
        {[0.25, 0.5, 0.75, 1].map(scale => (
          <polygon key={scale} points={indicators.map((_, i) => {
            const p = point(i, scale);
            return `${p.x},${p.y}`;
          }).join(' ')} fill="none" stroke="#e5e7eb" strokeWidth="1" />
        ))}
        {indicators.map((item, index) => {
          const p = point(index, 1);
          const label = item.name.length > 22 ? `${item.name.slice(0, 20)}…` : item.name;
          const anchor = p.x < center - 10 ? 'end' : p.x > center + 10 ? 'start' : 'middle';
          return (
            <g key={item.name}>
              <line x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e5e7eb" />
              <text x={center + (p.x - center) * 1.12} y={center + (p.y - center) * 1.12}
                textAnchor={anchor} dominantBaseline="middle" fontSize="7.5" fill="#475569">
                {label}
              </text>
            </g>
          );
        })}
        <polygon points={polygon} fill="#60a5fa" fillOpacity="0.14" stroke="#60a5fa" strokeWidth="2" />
        {values.map((value, index) => {
          const p = point(index, value);
          return <circle key={indicators[index].name} cx={p.x} cy={p.y} r="3.2" fill="#60a5fa" />;
        })}
      </svg>
      <p className="mt-1 text-center text-[10px] text-gray-500">Relative standing derived from national indicator rank</p>
    </div>
  );
}

function IndicatorBarChart({ indicators }: { indicators: Indicator[] }) {
  const width = 620;
  const chartTop = 22;
  const chartBottom = 222;
  const chartHeight = chartBottom - chartTop;
  const slot = width / indicators.length;
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} 310`} className="min-w-[540px] w-full" role="img" aria-label="Bar chart of Sipocot indicator ranks">
        <text x={width / 2} y="15" textAnchor="middle" fontSize="17" fill="#334155">2024 Ranking by Indicators</text>
        <text x={width / 2} y="32" textAnchor="middle" fontSize="10" fill="#64748b">1st to 2nd Class Municipalities (509)</text>
        <line x1="0" y1={chartBottom} x2={width} y2={chartBottom} stroke="#cbd5e1" />
        {indicators.map((item, index) => {
          const barWidth = slot * 0.42;
          const x = index * slot + (slot - barWidth) / 2;
          const height = Math.max(3, ((totalMunicipalities + 1 - item.rank) / totalMunicipalities) * chartHeight);
          const y = chartBottom - height;
          const words = item.name.split(' ');
          const lines: string[] = [];
          let line = '';
          words.forEach(word => {
            if ((line + ' ' + word).trim().length > 13 && line) {
              lines.push(line);
              line = word;
            } else line = (line + ' ' + word).trim();
          });
          if (line) lines.push(line);
          return (
            <g key={item.name}>
              <rect x={x} y={y} width={barWidth} height={height} fill={['#4776a8', '#b34b4b', '#8ca64c', '#826b9d', '#3d99ad', '#e58a3c', '#91a7cb', '#aa8585', '#b4c995', '#78afe4'][index]} />
              <text x={x + barWidth / 2} y={Math.max(45, y - 6)} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111827">{item.rank}</text>
              <text x={index * slot + slot / 2} y="238" textAnchor="middle" fontSize="8.5" fill="#475569">
                {lines.slice(0, 4).map((part, lineIndex) => <tspan key={lineIndex} x={index * slot + slot / 2} dy={lineIndex === 0 ? 0 : 10}>{part}</tspan>)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PillarSection({ pillar }: { pillar: Pillar }) {
  return (
    <section className="border-b border-gray-200 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 pb-4">
          <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900 sm:text-2xl">
            {pillar.name} <span className="text-base font-semibold">- 20%</span>
          </h2>
          <div className="flex overflow-hidden border-2 border-sky-500 text-sm font-bold">
            <span className="min-w-20 px-3 py-2 text-center text-sky-600">{ordinal(pillar.rank)}</span>
            <span className="min-w-24 bg-sky-500 px-3 py-2 text-center text-white">{pillar.score.toFixed(4)}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <RadarChart indicators={pillar.indicators} />
          <IndicatorBarChart indicators={pillar.indicators} />
        </div>
        <details className="group mt-5 overflow-hidden rounded-md border border-gray-300 bg-white">
          <summary className="cursor-pointer list-none bg-gray-100 px-4 py-3 text-base font-bold text-sky-500 hover:bg-gray-200">
            <span className="flex items-center justify-between">Data <span className="text-xs text-gray-500 group-open:rotate-180">⌄</span></span>
          </summary>
          <div className="overflow-x-auto p-3 sm:p-5">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead><tr className="bg-gray-50 text-gray-900"><th className="border border-gray-200 px-3 py-3 text-left">Indicator</th><th className="border border-gray-200 px-3 py-3 text-center">Rank</th><th className="border border-gray-200 px-3 py-3 text-center">Comparison group</th></tr></thead>
              <tbody>{pillar.indicators.map(item => (
                <tr key={item.name} className="even:bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2.5">{item.name}</td>
                  <td className="border border-gray-200 px-3 py-2.5 text-center font-semibold text-emerald-700">{ordinal(item.rank)}</td>
                  <td className="border border-gray-200 px-3 py-2.5 text-center text-gray-600">1st–2nd Class Municipalities</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </details>
        <p className="mt-2 text-right text-[10px] text-gray-400">Source: DTI Cities and Municipalities Competitiveness Index · 2024</p>
      </div>
    </section>
  );
}

export default function Statistics() {
  const [query, setQuery] = useState('');
  const filteredPillars = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pillars;
    return pillars.filter(pillar => [pillar.name, ...pillar.indicators.map(item => item.name)].join(' ').toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <SEO
        title="Statistics & Municipal Profile"
        description="Sipocot, Camarines Sur municipal profile and 2024 Cities and Municipalities Competitiveness Index results."
        keywords="Sipocot statistics, Sipocot population, CMCI 2024, Camarines Sur, municipal profile"
      />
      <main className="grow bg-white">
        <header className="bg-slate-50 py-8 sm:py-10">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sky-600">
              <BarChart3 className="h-4 w-4" /> Cities and Municipalities Competitiveness Index · 2024
            </div>
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[180px_1fr_230px]">
              <div className="flex justify-center">
                <img src="/logo.png" alt="Municipality of Sipocot seal" className="h-36 w-36 rounded-full object-contain" />
              </div>
              <div className="overflow-x-auto border border-gray-200">
                <table className="w-full min-w-[540px] text-xs sm:text-sm">
                  <tbody>
                    {[
                      ['Category', 'First Class Municipality', 'Ranking', '2014–2024'],
                      ['Region', 'REGION V (Bicol Region)', 'Province', 'Camarines Sur'],
                      ['Mayor', 'TOMAS A. BOCAGO', 'Population', '67,968'],
                      ['Website Link', 'sipocot.gov.ph', 'LGU E-mail', 'sipocot.lgu@gmail.com'],
                      ['Address', 'South Centro, Sipocot, Cam. Sur', 'Contact Nos.', 'Tel: 0917 854 3089'],
                      ['Facebook Page', '—', '', ''],
                    ].map((row, index) => (
                      <tr key={row[0]} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                        <th className="w-[20%] px-3 py-2 text-left font-semibold text-gray-800">{row[0]}</th>
                        <td className="px-3 py-2 text-sky-600">{row[1]}</td>
                        <th className="w-[17%] px-3 py-2 text-left font-semibold text-gray-800">{row[2]}</th>
                        <td className="px-3 py-2 text-sky-600">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-around gap-4">
                <div className="text-center">
                  <div className="mb-2 text-sm font-bold text-sky-500">Rank</div>
                  <div className="flex h-24 w-20 flex-col justify-between border-2 border-sky-500 p-2 text-sky-600">
                    <strong className="text-lg">{ordinal(231)}</strong>
                    <span className="h-7 bg-sky-500 -mx-2 -mb-2" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-sm font-bold text-sky-500">Score</div>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#0ea5e9 0deg 111deg, #e5e7eb 111deg 360deg)' }}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-bold text-sky-500">31.05</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-right text-[11px] text-gray-500">Overall rank among 1st to 2nd Class Municipalities · 2024</p>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Sipocot Competitiveness Performance</h1>
              <p className="mt-1 text-sm text-gray-500">2024 CMCI results across the five equally weighted competitiveness pillars.</p>
            </div>
            <a href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Sipocot&year=2024" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-800">
              Open official CMCI profile <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="border border-gray-200 bg-gray-50 p-4"><Users className="mb-2 h-5 w-5 text-sky-500" /><div className="text-xl font-bold text-gray-900">67,968</div><div className="text-xs text-gray-500">Population shown in CMCI profile</div></div>
            <div className="border border-gray-200 bg-gray-50 p-4"><Building2 className="mb-2 h-5 w-5 text-sky-500" /><div className="text-xl font-bold text-gray-900">1st Class</div><div className="text-xs text-gray-500">Municipality classification</div></div>
            <div className="border border-gray-200 bg-gray-50 p-4"><Globe className="mb-2 h-5 w-5 text-sky-500" /><div className="text-xl font-bold text-gray-900">Region V</div><div className="text-xs text-gray-500">Bicol Region · Camarines Sur</div></div>
            <div className="border border-gray-200 bg-gray-50 p-4"><MapPin className="mb-2 h-5 w-5 text-sky-500" /><div className="text-xl font-bold text-gray-900">231st</div><div className="text-xs text-gray-500">Overall CMCI rank · score 31.05</div></div>
          </div>
          <div className="mb-8 flex max-w-xl items-center gap-2 border border-gray-300 bg-white px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter pillars or indicators" aria-label="Filter pillars or indicators" className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
          </div>
        </div>

        {filteredPillars.map(pillar => <PillarSection key={pillar.name} pillar={pillar} />)}

        <section className="bg-slate-50 py-8">
          <div className="mx-auto max-w-[1400px] px-4 text-xs leading-relaxed text-gray-500 sm:px-6">
            <h2 className="mb-2 text-sm font-bold text-gray-800">Data source and methodology</h2>
            <p>Source: Department of Trade and Industry, Cities and Municipalities Competitiveness Index (CMCI), Sipocot LGU profile, 2024. Pillar scores, pillar ranks and indicator ranks are transcribed from the supplied 2024 CMCI profile screenshots. Indicator radar values visualize relative rank position only; the bar labels and data tables show the published national rank (1 is the highest rank). The comparison group shown is 1st to 2nd Class Municipalities (509).</p>
            <p className="mt-2"><a className="font-semibold text-sky-600 hover:underline" href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Sipocot&year=2024" target="_blank" rel="noreferrer">View Sipocot's official 2024 CMCI profile</a></p>
          </div>
        </section>
      </main>
    </>
  );
}
