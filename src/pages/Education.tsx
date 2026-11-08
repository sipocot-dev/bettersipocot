import { useEffect, useMemo, useRef, useState } from 'react';
import { Building2, GraduationCap, Map as MapIcon, Search, Users, School, ExternalLink, List } from 'lucide-react';
import Section from '../components/ui/Section';
import SEO from '../components/SEO';
import { sipocotSchools, educationStats, type SchoolRecord } from '../data/education';

type ViewMode = 'table' | 'map';

const number = (value?: number) => value == null ? '—' : value.toLocaleString('en-PH');
const mapsUrl = (school: SchoolRecord) => school.latitude != null && school.longitude != null
  ? `https://www.google.com/maps?q=${school.latitude},${school.longitude}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${school.name}, ${school.barangay ?? ''}, Sipocot, Camarines Sur`)}`;
const safe = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);

function SchoolMap({ schools, onSelect }: { schools: SchoolRecord[]; onSelect: (school: SchoolRecord) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState('');
  useEffect(() => {
    let cancelled = false;
    let map: import('leaflet').Map | undefined;
    void import('leaflet').then(L => {
      if (cancelled || !container.current) return;
      const points = schools.filter(s => s.latitude != null && s.longitude != null);
      const instance = L.map(container.current, { scrollWheelZoom: false }).setView([13.79, 122.99], 11);
      map = instance;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(instance);
      const pin = L.divIcon({
        className: 'education-map-pin',
        html: '<span style="display:block;width:18px;height:18px;background:#dc2626;border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 1px 5px #0008"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 20],
      });
      const markers = points.map(school => {
        const marker = L.marker([school.latitude as number, school.longitude as number], { icon: pin }).addTo(instance);
        marker.bindPopup(`<div style="min-width:180px"><strong>${safe(school.name)}</strong><p style="margin:5px 0;color:#555">${safe(school.sector)} · ${safe(school.level)}</p><p style="margin:0;color:#555">${safe(school.barangay ?? 'Sipocot')}</p></div>`);
        marker.on('click', () => onSelect(school));
        return marker;
      });
      if (markers.length > 1) instance.fitBounds(L.featureGroup(markers).getBounds().pad(0.15));
      else if (markers.length === 1) instance.setView([points[0].latitude as number, points[0].longitude as number], 13);
      window.setTimeout(() => instance.invalidateSize(), 120);
    }).catch(() => setMapError('The map could not be loaded. Use the table and individual map links instead.'));
    return () => { cancelled = true; map?.remove(); };
  }, [schools, onSelect]);
  return <div className="relative">
    <div ref={container} className="h-[560px] w-full rounded-xl border border-gray-200" />
    {mapError && <div className="absolute inset-x-3 top-3 rounded-lg bg-white p-3 text-sm text-red-700 shadow">{mapError}</div>}
  </div>;
}

export default function Education() {
  const [view, setView] = useState<ViewMode>('table');
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [level, setLevel] = useState('All');
  const [selected, setSelected] = useState<SchoolRecord | null>(null);
  const filtered = useMemo(() => sipocotSchools.filter(school => {
    const matchesQuery = `${school.name} ${school.barangay ?? ''} ${school.sector} ${school.level}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (sector === 'All' || school.sector === sector) && (level === 'All' || school.level === level);
  }), [query, sector, level]);
  const mapped = filtered.filter(school => school.latitude != null && school.longitude != null);
  const onSelect = (school: SchoolRecord) => setSelected(school);

  return <>
    <SEO title="Education in Sipocot" description="Explore public schools, private schools and higher education institutions in Sipocot, Camarines Sur. Browse the directory in table or map view." keywords="Sipocot schools, DepEd Sipocot, CBSUA Sipocot, education Camarines Sur" />
    <div className="bg-primary-900 text-white">
      <Section className="px-4 py-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-200">BetterSipocot · Education</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Schools and Universities in Sipocot</h1>
        <p className="mt-3 max-w-3xl text-blue-100">Find public and private schools, colleges, and higher education institutions across the municipality. Browse the directory, search by name or barangay, and view mapped campuses.</p>
      </Section>
    </div>
    <Section className="px-4 py-8">
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Schools reported', value: number(educationStats.totalSchools), icon: School },
          { label: 'Public schools', value: number(educationStats.publicSchools), icon: Building2 },
          { label: 'Private schools', value: number(educationStats.privateSchools), icon: GraduationCap },
          { label: 'Learners in schools', value: number(educationStats.learnersInSchools), icon: Users },
        ].map(item => <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500"><item.icon className="h-4 w-4 text-primary-700"/>{item.label}</div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{item.value}</p>
        </div>)}
      </div>
      <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">
        <strong>{educationStats.schoolYear} snapshot:</strong> 55 public schools, 8 private schools and 1 SUC/LUC were reported, with 20,403 learners in schools. These municipality-level figures are from DepEd public data as of 25 October 2025. The directory below includes 65 named school records; reporting totals and directory row counts may differ due to source classification and coverage.
      </div>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search school or barangay..." className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"/>
          </label>
          <select value={sector} onChange={e => setSector(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">
            <option>All</option><option>Public</option><option>Private</option><option>SUC/LUC</option>
          </select>
          <select value={level} onChange={e => setLevel(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">
            <option>All</option><option>Elementary</option><option>Secondary</option><option>Integrated</option><option>Basic education</option><option>Higher education</option>
          </select>
        </div>
        <div className="inline-flex self-start rounded-lg border border-gray-300 bg-white p-1">
          <button onClick={() => setView('table')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'table' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><List className="h-4 w-4"/>Table</button>
          <button onClick={() => setView('map')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'map' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><MapIcon className="h-4 w-4"/>Map</button>
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
        <span>Showing {filtered.length} of {sipocotSchools.length} directory records</span>
        {view === 'map' && <span>{mapped.length} mapped · {filtered.length - mapped.length} without verified coordinates</span>}
      </div>
      {view === 'table' ? <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600"><tr><th className="px-4 py-3">School / Institution</th><th className="px-4 py-3">Sector</th><th className="px-4 py-3">Level</th><th className="px-4 py-3">Barangay</th><th className="px-4 py-3 text-right">Learners</th><th className="px-4 py-3 text-right">Teachers</th><th className="px-4 py-3 text-right">Classrooms</th><th className="px-4 py-3">Location</th></tr></thead>
            <tbody className="divide-y divide-gray-100">{filtered.map(school => <tr key={school.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold text-gray-900">{school.name}{school.sourceUrl && <a className="ml-2 inline-flex text-primary-700" href={school.sourceUrl} target="_blank" rel="noreferrer" aria-label="School source"><ExternalLink className="h-3.5 w-3.5"/></a>}</td>
              <td className="px-4 py-3">{school.sector}</td><td className="px-4 py-3">{school.level}</td><td className="px-4 py-3">{school.barangay ?? '—'}</td>
              <td className="px-4 py-3 text-right tabular-nums">{number(school.learners)}</td><td className="px-4 py-3 text-right tabular-nums">{number(school.teachers)}</td><td className="px-4 py-3 text-right tabular-nums">{number(school.classrooms)}</td>
              <td className="px-4 py-3"><a className="whitespace-nowrap font-medium text-primary-700 hover:underline" href={mapsUrl(school)} target="_blank" rel="noreferrer">Open map <ExternalLink className="inline h-3 w-3"/></a></td>
            </tr>)}</tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="p-10 text-center text-sm text-gray-500">No schools match the selected filters.</p>}
      </div> : <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-gray-900">School locations</h2><span className="text-xs text-gray-500">{mapped.length} mapped · pins use published coordinates only</span></div>
        <SchoolMap schools={mapped} onSelect={onSelect}/>
        {selected && <div className="mt-4 flex flex-col gap-2 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="font-semibold text-gray-900">{selected.name}</h3><p className="text-sm text-gray-500">{selected.sector} · {selected.level} · {selected.barangay ?? 'Sipocot'}</p></div>
          <a className="inline-flex items-center gap-2 self-start rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800" href={mapsUrl(selected)} target="_blank" rel="noreferrer">Open location <ExternalLink className="h-4 w-4"/></a>
        </div>}
        {mapped.length === 0 && <p className="p-8 text-center text-sm text-gray-500">No mapped schools match these filters.</p>}
      </div>}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-gray-900">Sources and data notes</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">School counts, learner totals, teachers and classroom figures are based on DepEd public data for SY 2024–2025. Coordinates are shown only for schools with a published map location; unmapped schools remain searchable in the table. Confirm current enrollment, grade offerings and contact details directly with each institution.</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://ebeis.deped.gov.ph/beis/reports_info/masterlist" target="_blank" rel="noreferrer">DepEd EBEIS – Masterlist of Schools <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.teacherph.com/schools/camarines-sur/sipocot/" target="_blank" rel="noreferrer">TeacherPH – Sipocot school data and enrollment <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://chedro5.com/hei-directory/table" target="_blank" rel="noreferrer">CHED Regional Office V – Higher Education Institution Directory <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://cbsua.edu.ph/sipocot-campus/" target="_blank" rel="noreferrer">CBSUA – Sipocot Campus <ExternalLink className="inline h-3 w-3"/></a></li>
        </ul>
      </div>
    </Section>
  </>;
}
