import { useMemo, useState } from 'react';
import { Activity, Building2, ExternalLink, HeartPulse, Hospital, Map as MapIcon, MapPin, Search, Stethoscope, List, Baby, ShieldCheck } from 'lucide-react';
import Section from '../components/ui/Section';
import SEO from '../components/SEO';
import { sipocotHealthFacilities, healthServiceLinks, type HealthFacility } from '../data/healthFacilities';

type ViewMode = 'table' | 'map';

const mapUrl = (facility: HealthFacility) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.mapQuery ?? `${facility.name}, Sipocot, Camarines Sur`)}`;

export default function HealthServices() {
  const [view, setView] = useState<ViewMode>('table');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [ownership, setOwnership] = useState('All');
  const [selected, setSelected] = useState<HealthFacility | null>(null);

  const filtered = useMemo(() => sipocotHealthFacilities.filter(facility => {
    const haystack = `${facility.name} ${facility.type} ${facility.ownership} ${facility.address} ${facility.barangay ?? ''}`.toLowerCase();
    return haystack.includes(query.toLowerCase())
      && (type === 'All' || facility.type === type)
      && (ownership === 'All' || facility.ownership === ownership);
  }), [query, type, ownership]);

  const typeOptions = ['All', 'Hospital', 'Rural health unit', 'Birthing clinic', 'Medical clinic', 'Barangay health station'];

  return <>
    <SEO title="Health Facilities in Sipocot" description="Find hospitals, rural health units, birthing clinics, medical clinics and barangay health stations in Sipocot, Camarines Sur." keywords="Sipocot hospital, Sipocot clinics, Sipocot RHU, birthing clinic, health center, Camarines Sur" />
    <section className="w-full bg-[#0b3b8c] text-white">
      <div className="container mx-auto px-4 py-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">BetterSipocot · Health Services</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Hospitals, Clinics and Health Centers in Sipocot</h1>
        <p className="mt-3 max-w-3xl text-blue-100">Find public and private healthcare facilities across Sipocot, including the district hospital, rural health unit, birthing clinics, medical clinics and barangay health stations.</p>
      </div>
    </section>

    <Section className="px-4 pt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {healthServiceLinks.map((item, index) => {
          const Icon = [Hospital, Baby, Activity, ShieldCheck][index];
          return <a key={item.title} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}
            className="flex min-h-[104px] flex-col justify-center rounded-lg bg-[#0b3b8c] px-4 py-3 text-white shadow-sm transition-colors hover:bg-[#082d6b] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            <span className="mb-2 flex items-center justify-between"><Icon className="h-5 w-5 text-blue-100"/>{item.external && <ExternalLink className="h-3.5 w-3.5 text-blue-100"/>}</span>
            <span className="text-sm font-semibold">{item.title}</span>
            <span className="mt-1 text-xs leading-relaxed text-blue-100">{item.description}</span>
          </a>;
        })}
      </div>
    </Section>

    <Section className="px-4 py-8">
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Listed facilities', value: sipocotHealthFacilities.length.toString(), icon: Building2 },
          { label: 'Public facilities', value: sipocotHealthFacilities.filter(x => x.ownership === 'Public').length.toString(), icon: Hospital },
          { label: 'Private facilities', value: sipocotHealthFacilities.filter(x => x.ownership === 'Private').length.toString(), icon: Stethoscope },
          { label: 'Facility types', value: new Set(sipocotHealthFacilities.map(x => x.type)).size.toString(), icon: HeartPulse },
        ].map(item => <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500"><item.icon className="h-4 w-4 text-primary-700"/>{item.label}</div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{item.value}</p>
        </div>)}
      </div>

      <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <strong>Directory coverage:</strong> This is a community reference compiled from publicly accessible DOH, PhilHealth and local directory listings, not a certified complete registry. Facility status, accreditation, services, operating hours and contact numbers can change. Call the facility or verify with the relevant agency before travelling. For emergencies, contact local emergency services or proceed to the nearest emergency department.
      </div>

      <div id="health-directory" className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search facility, barangay or address..." className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"/>
          </label>
          <select value={type} onChange={e => setType(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">
            {typeOptions.map(option => <option key={option}>{option}</option>)}
          </select>
          <select value={ownership} onChange={e => setOwnership(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">
            <option>All</option><option>Public</option><option>Private</option>
          </select>
        </div>
        <div className="inline-flex self-start rounded-lg border border-gray-300 bg-white p-1">
          <button onClick={() => setView('table')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'table' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><List className="h-4 w-4"/>Table</button>
          <button onClick={() => setView('map')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'map' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><MapIcon className="h-4 w-4"/>Map</button>
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
        <span>Showing {filtered.length} of {sipocotHealthFacilities.length} listed facilities</span>
        {view === 'map' && <span>Google Maps location search</span>}
      </div>

      {view === 'table' ? <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600"><tr><th className="px-4 py-3">Facility</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Ownership</th><th className="px-4 py-3">Address / Barangay</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Location</th></tr></thead>
            <tbody className="divide-y divide-gray-100">{filtered.map(facility => <tr key={facility.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold text-gray-900">{facility.name}</td>
              <td className="px-4 py-3">{facility.type}</td><td className="px-4 py-3">{facility.ownership}</td>
              <td className="px-4 py-3">{facility.address}</td><td className="px-4 py-3 whitespace-nowrap">{facility.phone ?? 'Not published'}</td>
              <td className="px-4 py-3"><a className="whitespace-nowrap font-medium text-primary-700 hover:underline" href={mapUrl(facility)} target="_blank" rel="noreferrer">Open map <ExternalLink className="inline h-3 w-3"/></a></td>
            </tr>)}</tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="p-10 text-center text-sm text-gray-500">No facilities match the selected filters.</p>}
      </div> : <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-semibold text-gray-900">Health facilities map</h2><span className="text-xs text-gray-500">Open a facility to see its map location</span></div>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <iframe title="Health facilities in Sipocot map" src="https://www.google.com/maps?q=health+facilities+in+Sipocot+Camarines+Sur&output=embed" className="h-[460px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(facility => <button key={facility.name} onClick={() => setSelected(facility)} className={`rounded-lg border p-3 text-left transition-colors hover:border-blue-300 hover:bg-blue-50 ${selected?.name === facility.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-600"/><span><span className="block text-sm font-semibold text-gray-900">{facility.name}</span><span className="mt-1 block text-xs text-gray-500">{facility.address}</span></span></span>
          </button>)}
        </div>
        {selected && <div className="mt-4 flex flex-col gap-2 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="font-semibold text-gray-900">{selected.name}</h3><p className="text-sm text-gray-500">{selected.type} · {selected.ownership} · {selected.address}</p></div>
          <a className="inline-flex items-center gap-2 self-start rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800" href={mapUrl(selected)} target="_blank" rel="noreferrer">Open exact search in Google Maps <ExternalLink className="h-4 w-4"/></a>
        </div>}
      </div>}

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-gray-900">Sources and verification</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">Facility names and service classifications are taken from government registries and public local listings. The DOH National TB Control Program identifies Sipocot District Hospital and Sipocot RHU; PhilHealth's 2026 maternity provider list includes two Ronjay Birthing Clinic entries in Sipocot. Other clinic and barangay health station listings are third-party directory references and should be independently confirmed.</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://nhfr.doh.gov.ph/VActivefacilitiesList" target="_blank" rel="noreferrer">DOH – National Health Facility Registry <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://ntp.doh.gov.ph/resources/facilities/?yiiwp-page=315" target="_blank" rel="noreferrer">DOH – National TB Control Program facility directory <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.philhealth.gov.ph/partners/providers/facilities/accredited/" target="_blank" rel="noreferrer">PhilHealth – Accredited health facilities <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.philhealth.gov.ph/partners/providers/facilities/accredited/MCP_053126.pdf" target="_blank" rel="noreferrer">PhilHealth – 2026 Maternity Care Clinics list <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.cybo.com/PH/sipocot-camarines-sur/health-and-medical/" target="_blank" rel="noreferrer">Local directory – Health and medical facilities in Sipocot <ExternalLink className="inline h-3 w-3"/></a></li>
        </ul>
      </div>
    </Section>
  </>;
}
