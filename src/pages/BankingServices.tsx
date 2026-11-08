import { useMemo, useState } from 'react';
import { Building2, CreditCard, ExternalLink, Landmark, Map as MapIcon, MapPin, Search, List, Users } from 'lucide-react';
import Section from '../components/ui/Section';
import SEO from '../components/SEO';
import { sipocotFinancialProviders, bankingQuickLinks, type FinancialProvider } from '../data/financialProviders';

type ViewMode = 'table' | 'map';
const mapUrl = (provider: FinancialProvider) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(provider.mapQuery)}`;

export default function BankingServices() {
  const [view, setView] = useState<ViewMode>('table');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [ownership, setOwnership] = useState('All');
  const [selected, setSelected] = useState<FinancialProvider | null>(null);
  const filtered = useMemo(() => sipocotFinancialProviders.filter(provider => {
    const haystack = [provider.name, provider.type, provider.ownership, provider.address, provider.services].join(' ').toLowerCase();
    return haystack.includes(query.toLowerCase()) && (type === 'All' || provider.type === type) && (ownership === 'All' || provider.ownership === ownership);
  }), [query, type, ownership]);
  const types = ['All', 'Universal bank', 'Rural bank', 'Thrift / microfinance bank', 'ATM', 'Cooperative / financial institution'];

  return <>
    <SEO title="Banks, ATMs and Cooperatives in Sipocot" description="Find bank branches, rural banks, ATMs, microfinance banks and financial cooperatives in Sipocot, Camarines Sur." keywords="Sipocot banks, Sipocot ATM, rural bank Sipocot, Landbank Sipocot, CARD Bank Sipocot, CamSur MPC" />
    <section className="w-full bg-[#0b3b8c] text-white">
      <div className="container mx-auto px-4 py-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">BetterSipocot · Banking & Finance</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Banks, ATMs and Financial Services in Sipocot</h1>
        <p className="mt-3 max-w-3xl text-blue-100">Find bank branches, rural and microfinance banks, ATMs and financial cooperatives serving Sipocot. Search by institution, service type or location.</p>
      </div>
    </section>

    <Section className="px-4 pt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bankingQuickLinks.map((item, index) => {
          const Icon = [Landmark, Building2, CreditCard, Users][index];
          return <a key={item.title} href={item.href} className="flex min-h-[104px] flex-col justify-center rounded-lg bg-[#0b3b8c] px-4 py-3 text-white shadow-sm transition-colors hover:bg-[#082d6b] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            <Icon className="mb-2 h-5 w-5 text-blue-100"/><span className="text-sm font-semibold">{item.title}</span><span className="mt-1 text-xs leading-relaxed text-blue-100">{item.description}</span>
          </a>;
        })}
      </div>
    </Section>

    <Section className="px-4 py-8">
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Listed financial locations', value: sipocotFinancialProviders.length.toString(), icon: Building2 },
          { label: 'Bank branches', value: sipocotFinancialProviders.filter(p => p.type.includes('bank') && p.type !== 'ATM').length.toString(), icon: Landmark },
          { label: 'ATM locations', value: sipocotFinancialProviders.filter(p => p.type === 'ATM').length.toString(), icon: CreditCard },
          { label: 'Cooperatives', value: sipocotFinancialProviders.filter(p => p.ownership === 'Cooperative').length.toString(), icon: Users },
        ].map(item => <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-sm text-gray-500"><item.icon className="h-4 w-4 text-primary-700"/>{item.label}</div><p className="mt-2 text-2xl font-bold text-gray-900">{item.value}</p></div>)}
      </div>

      <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <strong>Directory accuracy:</strong> Listings combine official bank/cooperative directories, PDIC and Rural Bankers Association references, and public map listings. A cooperative is not necessarily a bank, and an ATM is not a full-service branch. Branch services, fees, hours, ATM cash availability and contact details can change. Confirm directly with the institution before travelling. Never share your PIN, password or one-time passcode with anyone.
      </div>

      <div id="bank-directory" className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <label className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search bank, cooperative or address..." className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"/></label>
          <select value={type} onChange={e => setType(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">{types.map(option => <option key={option}>{option}</option>)}</select>
          <select value={ownership} onChange={e => setOwnership(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"><option>All</option><option>Government</option><option>Private</option><option>Cooperative</option></select>
        </div>
        <div className="inline-flex self-start rounded-lg border border-gray-300 bg-white p-1">
          <button onClick={() => setView('table')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'table' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><List className="h-4 w-4"/>Table</button>
          <button onClick={() => setView('map')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'map' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><MapIcon className="h-4 w-4"/>Map</button>
        </div>
      </div>
      <div className="mb-3 text-sm text-gray-500">Showing {filtered.length} of {sipocotFinancialProviders.length} listed financial locations</div>

      {view === 'table' ? <div className="overflow-hidden rounded-xl border border-gray-200 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-sm">
        <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600"><tr><th className="px-4 py-3">Institution</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Ownership</th><th className="px-4 py-3">Address</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Services</th><th className="px-4 py-3">Location</th></tr></thead>
        <tbody className="divide-y divide-gray-100">{filtered.map(provider => <tr key={provider.name} className="align-top hover:bg-gray-50"><td className="px-4 py-3 font-semibold text-gray-900">{provider.name}</td><td className="px-4 py-3">{provider.type}</td><td className="px-4 py-3">{provider.ownership}</td><td className="px-4 py-3">{provider.address}</td><td className="px-4 py-3">{provider.phone ?? 'Not published'}{provider.email && <span className="mt-1 block text-xs text-gray-500">{provider.email}</span>}</td><td className="max-w-sm px-4 py-3">{provider.services}{provider.note && <span className="mt-1 block text-xs text-amber-700">{provider.note}</span>}</td><td className="px-4 py-3"><a className="whitespace-nowrap font-medium text-primary-700 hover:underline" href={mapUrl(provider)} target="_blank" rel="noreferrer">Open map <ExternalLink className="inline h-3 w-3"/></a></td></tr>)}</tbody>
      </table></div>{filtered.length === 0 && <p className="p-10 text-center text-sm text-gray-500">No financial institutions match these filters.</p>}</div> : <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-semibold text-gray-900">Banks and ATMs map</h2><span className="text-xs text-gray-500">Select a listing to open its map location</span></div>
        <div className="overflow-hidden rounded-xl border border-gray-200"><iframe title="Banks and financial services in Sipocot map" src="https://www.google.com/maps?q=banks+ATMs+in+Sipocot+Camarines+Sur&output=embed" className="h-[460px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(provider => <button key={provider.name} onClick={() => setSelected(provider)} className={`rounded-lg border p-3 text-left transition-colors hover:border-blue-300 hover:bg-blue-50 ${selected?.name === provider.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}><span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-600"/><span><span className="block text-sm font-semibold text-gray-900">{provider.name}</span><span className="mt-1 block text-xs text-gray-500">{provider.type} · {provider.address}</span></span></span></button>)}</div>
        {selected && <div className="mt-4 flex flex-col gap-2 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold text-gray-900">{selected.name}</h3><p className="text-sm text-gray-500">{selected.address} · {selected.services}</p></div><a className="inline-flex items-center gap-2 self-start rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800" href={mapUrl(selected)} target="_blank" rel="noreferrer">Open directions <ExternalLink className="h-4 w-4"/></a></div>}
      </div>}

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5"><h2 className="font-bold text-gray-900">Sources and verification</h2><p className="mt-2 text-sm leading-relaxed text-gray-600">Official institutional sources are preferred for branch addresses and contacts. Public map listings are included as navigation leads where a current official branch directory was not readily available. Verify institution type and current branch operations before travelling.</p><ul className="mt-4 space-y-2 text-sm">
        <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.landbank.com" target="_blank" rel="noreferrer">LANDBANK official website and branch directory <ExternalLink className="inline h-3 w-3"/></a></li>
        <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.pdic.gov.ph/files/BSDStats/Bank%20Directory_RB%20_website.pdf" target="_blank" rel="noreferrer">PDIC – Insured Rural and Cooperative Banks directory <ExternalLink className="inline h-3 w-3"/></a></li>
        <li><a className="font-semibold text-primary-700 hover:underline" href="https://rbap.org/members/region-5/camarines-sur/" target="_blank" rel="noreferrer">Rural Bankers Association – Camarines Sur members <ExternalLink className="inline h-3 w-3"/></a></li>
        <li><a className="font-semibold text-primary-700 hover:underline" href="https://camsurmpc.ph/new/?content=branches" target="_blank" rel="noreferrer">CamSur MPC – Official branch directory <ExternalLink className="inline h-3 w-3"/></a></li>
        <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.bsp.gov.ph" target="_blank" rel="noreferrer">Bangko Sentral ng Pilipinas – Financial institutions and consumer advisories <ExternalLink className="inline h-3 w-3"/></a></li>
      </ul></div>
    </Section>
  </>;
}
