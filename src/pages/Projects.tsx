import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Building2, CircleDollarSign, Download, ExternalLink, FileText, List, LoaderCircle, Map as MapIcon, MapPin, Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import SEO from '../components/SEO';

const API_URL = 'https://api.dpwh.bettergov.ph/projects';
const API_PAGE_SIZE = 1000;
const DPWH_URL = 'https://transparency.dpwh.gov.ph/';
const BISTO_URL = 'https://bisto.ph/';

type RawProject = Record<string, unknown>;
type Project = {
  id: string;
  name: string;
  contractor: string;
  amount: number | null;
  status: string;
  category: string;
  year: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  sourceUrl: string | null;
  raw: RawProject;
};

function textValue(...values: unknown[]): string {
  for (const value of values) {
    if (value !== null && value !== undefined && String(value).trim()) return String(value).trim();
  }
  return '—';
}
function numeric(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[₱,\s]/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}
function coordinate(raw: RawProject, keys: string[]): number | null {
  for (const key of keys) {
    const value = numeric(raw[key]);
    if (value !== null) return value;
  }
  return null;
}
function normalizeProject(raw: RawProject, index: number): Project {
  const location = (raw.location && typeof raw.location === 'object' ? raw.location : {}) as RawProject;
  const geometry = (raw.geometry && typeof raw.geometry === 'object' ? raw.geometry : {}) as RawProject;
  const coordinates = Array.isArray(geometry.coordinates) ? geometry.coordinates : Array.isArray(raw.coordinates) ? raw.coordinates : [];
  const latitude = coordinate(raw, ['latitude', 'lat', 'project_latitude', 'projectLatitude'])
    ?? numeric(location.latitude) ?? numeric(location.lat)
    ?? (coordinates.length >= 2 ? numeric(coordinates[1]) : null);
  const longitude = coordinate(raw, ['longitude', 'lng', 'lon', 'project_longitude', 'projectLongitude'])
    ?? numeric(location.longitude) ?? numeric(location.lng) ?? numeric(location.lon)
    ?? (coordinates.length >= 2 ? numeric(coordinates[0]) : null);
  return {
    id: textValue(raw.contract_id, raw.contractId, raw.project_id, raw.projectId, raw.id, raw.contract_number, index + 1),
    name: textValue(raw.project_name, raw.projectName, raw.title, raw.description, raw.name),
    contractor: textValue(raw.contractor_name, raw.contractorName, raw.contractor, raw.winning_bidder),
    amount: numeric(raw.contract_amount ?? raw.contractAmount ?? raw.amount ?? raw.project_cost ?? raw.projectCost ?? raw.cost ?? raw.budget),
    status: textValue(raw.status, raw.project_status, raw.projectStatus, raw.contract_status),
    category: textValue(raw.category, raw.project_category, raw.projectCategory, raw.type_of_work, raw.typeOfWork),
    year: textValue(raw.infrastructure_year, raw.infraYear, raw.year, raw.fiscal_year, raw.fiscalYear),
    location: textValue(raw.location_name, raw.project_location, raw.address, location.name, location.municipality, location.city, location.barangay, raw.barangay, typeof raw.location === 'string' ? raw.location : null, 'Sipocot, Camarines Sur'),
    latitude: latitude !== null && latitude >= -90 && latitude <= 90 ? latitude : null,
    longitude: longitude !== null && longitude >= -180 && longitude <= 180 ? longitude : null,
    sourceUrl: textValue(raw.url, raw.source_url, raw.sourceUrl, raw.project_url) === '—' ? null : textValue(raw.url, raw.source_url, raw.sourceUrl, raw.project_url),
    raw,
  };
}
function extractRows(payload: unknown): RawProject[] {
  if (Array.isArray(payload)) return payload as RawProject[];
  if (!payload || typeof payload !== 'object') return [];
  const root = payload as Record<string, unknown>;
  const candidates = [root.data, root.projects, root.results, root.items];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate as RawProject[];
    if (candidate && typeof candidate === 'object') {
      const nested = candidate as Record<string, unknown>;
      for (const key of ['data', 'projects', 'results', 'items', 'records']) {
        if (Array.isArray(nested[key])) return nested[key] as RawProject[];
      }
    }
  }
  return [];
}
const money = (amount: number | null) => amount === null ? '—' : new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);

function ProjectMap({ projects }: { projects: Project[] }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!element.current) return;
    const points = projects.filter(p => p.latitude !== null && p.longitude !== null);
    let map: import('leaflet').Map | undefined;
    let cancelled = false;
    void import('leaflet').then(({ default: L }) => {
      if (cancelled || !element.current) return;
      const mapInstance = L.map(element.current, { scrollWheelZoom: false }).setView([13.77, 122.98], 11);
      map = mapInstance;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      }).addTo(mapInstance);
    const markers = points.map(project => {
      const marker = L.marker([project.latitude as number, project.longitude as number]).addTo(mapInstance);
      marker.bindPopup(`<strong>${project.name.replace(/[&<>"]/g, '')}</strong><br/>${project.id.replace(/[&<>"]/g, '')}<br/>${money(project.amount)}`);
      return marker;
    });
    if (markers.length > 1) mapInstance.fitBounds(L.featureGroup(markers).getBounds().pad(0.12));
    else if (markers.length === 1) mapInstance.setView([points[0].latitude as number, points[0].longitude as number], 14);
      window.setTimeout(() => map?.invalidateSize(), 100);
    });
    return () => { cancelled = true; map?.remove(); };
  }, [projects]);
  return <div ref={element} className="h-[520px] w-full rounded-xl" aria-label="Map of Sipocot DPWH projects" />;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [view, setView] = useState<'table' | 'map'>('table');
  const [page, setPage] = useState(1);
  const pageSize = 30;

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const fetchPage = async (page: number): Promise<unknown> => {
          const url = new URL(API_URL);
          url.searchParams.set('page', String(page));
          url.searchParams.set('limit', String(API_PAGE_SIZE));
          url.searchParams.set('search', 'Sipocot');
          url.searchParams.set('region', 'Region V');
          url.searchParams.set('province', 'Camarines Sur');
          const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
          if (!response.ok) throw new Error(`The projects API returned HTTP ${response.status} on page ${page}.`);
          return response.json();
        };

        const firstPayload = await fetchPage(1);
        const firstRows = extractRows(firstPayload);
        const root = firstPayload && typeof firstPayload === 'object' ? firstPayload as Record<string, unknown> : {};
        const dataEnvelope = root.data && typeof root.data === 'object' ? root.data as Record<string, unknown> : {};
        const pagination = dataEnvelope.pagination && typeof dataEnvelope.pagination === 'object'
          ? dataEnvelope.pagination as Record<string, unknown>
          : {};
        const totalPages = Math.max(1, Math.min(100, numeric(pagination.totalPages) ?? 1));
        const remainingPages = totalPages > 1 ? await Promise.all(
          Array.from({ length: totalPages - 1 }, (_, index) => fetchPage(index + 2))
        ) : [];
        const allRows = [
          ...firstRows,
          ...remainingPages.flatMap(extractRows),
        ];
        const normalized = allRows.map(normalizeProject);
        const sipocotProjects = normalized.filter(project => JSON.stringify(project.raw).toLowerCase().includes('sipocot'));
        setProjects(sipocotProjects.length > 0 ? sipocotProjects : normalized);
        setError('');
      } catch (cause) {
        if (cause instanceof Error && cause.name === 'AbortError') return;
        setError(cause instanceof Error ? cause.message : 'Unable to load DPWH project data.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  const statuses = useMemo(() => ['All', ...new Set(projects.map(p => p.status).filter(s => s !== '—'))], [projects]);
  const filtered = useMemo(() => projects.filter(p => {
    const matches = [p.name, p.id, p.contractor, p.location, p.category].join(' ').toLowerCase().includes(query.trim().toLowerCase());
    return matches && (status === 'All' || p.status === status);
  }), [projects, query, status]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const mapped = filtered.filter(p => p.latitude !== null && p.longitude !== null).length;

  const statusStyle = (value: string) => {
    const normalized = value.toLowerCase().replace(/[ _]/g, '-');
    if (normalized.includes('completed')) return 'bg-emerald-100 text-emerald-800';
    if (normalized.includes('ongoing') || normalized.includes('on-going') || normalized.includes('in-progress')) return 'bg-blue-100 text-blue-800';
    if (normalized.includes('not-yet-started') || normalized.includes('planned') || normalized.includes('for-procurement')) return 'bg-amber-100 text-amber-800';
    if (normalized.includes('suspended') || normalized.includes('terminated') || normalized.includes('cancelled')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-700';
  };
  const exportRows = filtered;
  const csvCell = (value: unknown) => {
    const raw = String(value ?? '');
    const safe = /^[=+\\-@\\t\\r]/.test(raw) ? `'${raw}` : raw;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  const exportCsv = () => {
    const headers = ['Project', 'Contract ID', 'Contractor', 'Category', 'Year', 'Amount (PHP)', 'Status', 'Location', 'Latitude', 'Longitude'];
    const rows = exportRows.map(p => [p.name, p.id, p.contractor, p.category, p.year, p.amount ?? '', p.status, p.location, p.latitude ?? '', p.longitude ?? '']);
    const csv = [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\\r\\n');
    const url = URL.createObjectURL(new Blob(['\\uFEFF', csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = 'sipocot-dpwh-projects.csv'; link.click(); URL.revokeObjectURL(url);
  };
  const exportPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>\"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' })[char] ?? char);
    const body = exportRows.map(p => `<tr><td>${escapeHtml(p.name)}<br><small>${escapeHtml(p.id)}</small></td><td>${escapeHtml(p.contractor)}</td><td>${escapeHtml(p.category)}</td><td>${escapeHtml(p.year)}</td><td>${escapeHtml(money(p.amount))}</td><td>${escapeHtml(p.status)}</td><td>${escapeHtml(p.location)}</td></tr>`).join('');
    printWindow.document.write(`<!doctype html><html><head><title>Sipocot DPWH Projects</title><style>body{font:11px Arial,sans-serif;color:#111;padding:20px}h1{font-size:20px}p{color:#555}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px;text-align:left;vertical-align:top}th{background:#eee}small{color:#666}@media print{body{padding:0}tr{break-inside:avoid}}</style></head><body><h1>DPWH Infrastructure Projects in Sipocot</h1><p>${exportRows.length} projects · Exported ${new Date().toLocaleString('en-PH')}</p><table><thead><tr><th>Project / Contract</th><th>Contractor</th><th>Category</th><th>Year</th><th>Amount</th><th>Status</th><th>Location</th></tr></thead><tbody>${body}</tbody></table><script>window.onload=()=>window.print()<\\/script></body></html>`);
    printWindow.document.close();
  };

  return <>
    <SEO title="DPWH Infrastructure Projects in Sipocot" description="Explore DPWH infrastructure contracts in Sipocot, Camarines Sur with searchable project records, contract amounts, status and a map view." keywords="Sipocot projects, DPWH projects, infrastructure, Camarines Sur, public works" />
    <main className="grow bg-gray-50">
      <header className="bg-[#003087] py-10 text-white sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">Public infrastructure · Region V</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Projects in Sipocot</h1>
          <p className="mt-3 max-w-3xl text-blue-100">Explore Department of Public Works and Highways projects recorded for Sipocot, Camarines Sur. Search contracts, review project details and view available coordinates on the map.</p>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {error && <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"><strong>Unable to retrieve live project data.</strong><p className="mt-1">{error} Check the source API directly or retry later.</p><a href={API_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 font-semibold underline">Open API response <ExternalLink className="h-3 w-3"/></a></div>}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5"><Building2 className="mb-2 h-5 w-5 text-primary-600"/><div className="text-2xl font-bold text-gray-900">{loading ? '…' : projects.length.toLocaleString('en-PH')}</div><p className="text-sm text-gray-500">Projects returned by API</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><CircleDollarSign className="mb-2 h-5 w-5 text-primary-600"/><div className="text-2xl font-bold text-gray-900">{loading ? '…' : money(projects.reduce((sum,p)=>sum+(p.amount??0),0))}</div><p className="text-sm text-gray-500">Combined listed contract amount</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><MapPin className="mb-2 h-5 w-5 text-primary-600"/><div className="text-2xl font-bold text-gray-900">{loading ? '…' : mapped.toLocaleString('en-PH')}</div><p className="text-sm text-gray-500">Projects with usable coordinates</p></div>
        </div>
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5"><Search className="h-4 w-4 text-gray-400"/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1);}} placeholder="Search project, contractor, location…" className="w-full bg-transparent text-sm outline-none sm:w-72"/></label>
            <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1);}} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"><option value="All">All statuses</option>{statuses.slice(1).map(s=><option key={s}>{s}</option>)}</select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
          <button onClick={exportCsv} disabled={loading || filtered.length === 0} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 disabled:opacity-40"><Download className="h-4 w-4"/>CSV</button>
          <button onClick={exportPdf} disabled={loading || filtered.length === 0} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 disabled:opacity-40"><FileText className="h-4 w-4"/>PDF</button>
          <div className="inline-flex self-start rounded-lg border border-gray-300 bg-white p-1">
            <button onClick={()=>setView('table')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view==='table'?'bg-primary-600 text-white':'text-gray-600 hover:bg-gray-100'}`}><List className="h-4 w-4"/>Table</button>
            <button onClick={()=>setView('map')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view==='map'?'bg-primary-600 text-white':'text-gray-600 hover:bg-gray-100'}`}><MapIcon className="h-4 w-4"/>Map</button>
          </div>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500"><span>{loading ? 'Loading DPWH records…' : `Showing ${filtered.length.toLocaleString('en-PH')} matching projects`}</span>{loading&&<LoaderCircle className="h-4 w-4 animate-spin"/>}</div>
        {view==='map' ? <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4"><div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-gray-900">Project locations</h2><span className="text-xs text-gray-500">{mapped} mapped · {filtered.length-mapped} without coordinates</span></div>{!loading&&<ProjectMap projects={filtered}/>} {!loading&&mapped===0&&<p className="py-4 text-sm text-gray-500">No coordinate data was returned for the current results.</p>}</div> : <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto"><table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600"><tr><th className="px-4 py-3">Project / Contract</th><th className="px-4 py-3">Contractor</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Year</th><th className="px-4 py-3 text-right">Amount</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Location</th></tr></thead>
            <tbody className="divide-y divide-gray-100">{visible.map(p=><tr key={p.id} className="align-top hover:bg-gray-50"><td className="max-w-[380px] px-4 py-4"><div className="font-semibold text-gray-900">{p.name}</div><div className="mt-1 text-xs text-gray-500">{p.id}</div>{p.sourceUrl&&<a href={p.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-primary-700 hover:underline">Project source <ArrowUpRight className="h-3 w-3"/></a>}</td><td className="max-w-[200px] px-4 py-4 text-gray-700">{p.contractor}</td><td className="px-4 py-4 text-gray-700">{p.category}</td><td className="px-4 py-4 text-gray-700">{p.year}</td><td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-gray-900">{money(p.amount)}</td><td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(p.status)}`}>{p.status}</span></td><td className="max-w-[220px] px-4 py-4 text-gray-700">{p.location}</td></tr>)}</tbody>
          </table></div>
          {!loading&&filtered.length>0&&<div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm"><span className="text-gray-500">Page {page} of {pageCount}</span><div className="flex gap-2"><button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="rounded-md border px-3 py-1.5 disabled:opacity-40">Previous</button><button disabled={page===pageCount} onClick={()=>setPage(p=>Math.min(pageCount,p+1))} className="rounded-md border px-3 py-1.5 disabled:opacity-40">Next</button></div></div>}
          {!loading&&filtered.length===0&&<p className="p-10 text-center text-sm text-gray-500">No projects match these filters.</p>}
        </div>}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-600">
          <h2 className="font-bold text-gray-900">Data sources and methodology</h2>
          <p className="mt-2">Project records are retrieved from the BetterGov.ph DPWH API mirror using the filters for Sipocot, Region V and Camarines Sur. Contract amounts are listed contract values, not proof of actual disbursement or payment. Map pins are shown only when the API supplies usable coordinates; a missing pin does not mean a project is absent.</p>
          <ul className="mt-3 space-y-2">
            <li><a className="inline-flex items-center gap-1 font-semibold text-primary-700 hover:underline" href={API_URL} target="_blank" rel="noreferrer">BetterGov.ph DPWH Projects API <ExternalLink className="h-3 w-3"/></a></li>
            <li><a className="inline-flex items-center gap-1 font-semibold text-primary-700 hover:underline" href={DPWH_URL} target="_blank" rel="noreferrer">DPWH Transparency Portal <ExternalLink className="h-3 w-3"/></a></li>
            <li><a className="inline-flex items-center gap-1 font-semibold text-primary-700 hover:underline" href={BISTO_URL} target="_blank" rel="noreferrer">Bisto Proyekto — project monitoring reference <ExternalLink className="h-3 w-3"/></a></li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">This is an independent public-data viewer and is not an official DPWH website or an endorsement by DPWH or BetterGov.ph. Always consult the linked source records for the latest details.</p>
        </div>
      </section>
    </main>
  </>;
}
