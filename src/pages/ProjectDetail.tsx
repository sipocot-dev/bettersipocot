import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink, FileText, LoaderCircle, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const API_URL = 'https://api.dpwh.bettergov.ph/projects';
const BISTO_URL = 'https://bisto.ph/project/';
type RecordValue = Record<string, unknown>;
const detailCache = new Map<string, RecordValue>();

function rowsFrom(payload: unknown): RecordValue[] {
  if (Array.isArray(payload)) return payload.filter((v): v is RecordValue => !!v && typeof v === 'object');
  if (!payload || typeof payload !== 'object') return [];
  const root = payload as RecordValue;
  if (Array.isArray(root.data)) return root.data as RecordValue[];
  if (root.data && typeof root.data === 'object') {
    const data = root.data as RecordValue;
    for (const key of ['data', 'projects', 'results', 'items', 'records']) {
      if (Array.isArray(data[key])) return data[key] as RecordValue[];
    }
  }
  for (const key of ['projects', 'results', 'items', 'records']) {
    if (Array.isArray(root[key])) return root[key] as RecordValue[];
  }
  return [];
}
function getId(record: RecordValue): string {
  return String(record.contractId ?? record.contract_id ?? record.projectId ?? record.project_id ?? record.id ?? '');
}
function getCompleteRecord(record: RecordValue): RecordValue {
  const raw = record.raw && typeof record.raw === 'object' && !Array.isArray(record.raw) ? record.raw as RecordValue : {};
  return { ...raw, ...record };
}
function label(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\\b\\w/g, c => c.toUpperCase());
}
function display(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value.toLocaleString('en-PH');
  if (Array.isArray(value)) return value.map(display).join(', ');
  if (typeof value === 'object') return Object.entries(value as RecordValue).map(([k,v]) => `${label(k)}: ${display(v)}`).join(' · ');
  return String(value);
}
function collectFields(record: RecordValue): [string, unknown][] {
  const ignored = new Set(['id', 'contractid', 'contract_id', 'projectid', 'project_id', 'latitude', 'longitude', 'lat', 'lng', 'lon', 'geometry', 'coordinates', 'raw', 'description']);
  return Object.entries(record).filter(([key, value]) => !ignored.has(key.toLowerCase()) && value !== null && value !== undefined && value !== '');
}
function formatMoney(value: unknown): string {
  const amount = typeof value === 'number' ? value : typeof value === 'string' ? Number(value.replace(/[₱,\\s]/g, '')) : NaN;
  return Number.isFinite(amount) ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(amount) : '—';
}
function formatDate(value: unknown): string {
  if (!value) return '—';
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ProjectDetail() {
  const { projectId = '' } = useParams();
  const [record, setRecord] = useState<RecordValue | null>(() => detailCache.get(projectId) ?? null);
  const [loading, setLoading] = useState(!detailCache.has(projectId));
  const [error, setError] = useState('');

  useEffect(() => {
    const cached = detailCache.get(projectId);
    if (cached) {
      setRecord(cached);
      setLoading(false);
      setError('');
      return;
    }
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError('');
        const url = new URL(API_URL);
        url.searchParams.set('search', projectId);
        url.searchParams.set('page', '1');
        url.searchParams.set('limit', '50');
        const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Project API returned HTTP ${response.status}.`);
        const payload: unknown = await response.json();
        const match = rowsFrom(payload).find(item => getId(item).toLowerCase() === projectId.toLowerCase());
        if (!match) throw new Error(`No exact project record was returned for contract ID ${projectId}.`);
        const complete = getCompleteRecord(match);
        detailCache.set(projectId, complete);
        setRecord(complete);
      } catch (cause) {
        if (cause instanceof Error && cause.name === 'AbortError') return;
        setError(cause instanceof Error ? cause.message : 'Unable to load project details.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    if (projectId) void load();
    return () => controller.abort();
  }, [projectId]);

  const fields = useMemo(() => record ? collectFields(record) : [], [record]);
  const projectName = record ? String(record.description ?? record.project_name ?? record.projectName ?? record.title ?? record.name ?? projectId) : projectId;
  const status = record ? String(record.status ?? record.project_status ?? record.projectStatus ?? '—') : '—';
  const location = record ? display(record.location ?? record.location_name ?? record.project_location ?? record.address ?? 'Sipocot, Camarines Sur') : '';
  const budget = record?.budget ?? record?.contract_amount ?? record?.contractAmount ?? record?.amount ?? record?.project_cost;
  const paid = record?.amountPaid ?? record?.amount_paid;
  const progress = record?.progress;
  const startDate = record?.startDate ?? record?.start_date;
  const completionDate = record?.completionDate ?? record?.completion_date;
  const coordinates = record ? [record.latitude ?? (record.location as RecordValue | undefined)?.latitude, record.longitude ?? (record.location as RecordValue | undefined)?.longitude] : [];
  const components = record?.components ?? record?.projectComponents ?? record?.componentCategories;
  const documents = fields.filter(([key, value]) => /document|file|attachment|advertisement|contract.?agreement|notice.?of|url/i.test(key) && typeof value === 'string' && /^https?:\\/\\//i.test(value));
  const ordinaryFields = fields.filter(([key]) => !documents.some(([docKey]) => docKey === key));

  return <>
    <SEO title={`${projectName} | Sipocot Projects`} description={`Full available DPWH project information for contract ${projectId} in Sipocot, Camarines Sur.`} />
    <main className="grow bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link to="/projects" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline"><ArrowLeft className="h-4 w-4"/>Back to Projects</Link>
        {loading && <div className="flex items-center gap-3 rounded-xl border bg-white p-8 text-gray-600"><LoaderCircle className="h-5 w-5 animate-spin"/>Loading project information…</div>}
        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"><strong>Unable to load this project.</strong><p className="mt-1">{error}</p><a className="mt-3 inline-flex items-center gap-1 font-semibold underline" href={`${BISTO_URL}${encodeURIComponent(projectId)}`} target="_blank" rel="noreferrer">Open Bisto project <ExternalLink className="h-3 w-3"/></a></div>}
        {!loading && record && <>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <article className="space-y-5">
              <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">DPWH Infrastructure Project · {display(record.infraYear ?? record.infrastructure_year)}</p>
                <h1 className="mt-2 text-2xl font-bold leading-tight text-primary-800 sm:text-3xl">{projectName}</h1>
                <p className="mt-4 flex items-center gap-2 text-sm text-gray-600"><MapPin className="h-4 w-4"/>{location}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Contract ID</p><p className="mt-1 font-semibold text-gray-900">{projectId}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Status</p><p className="mt-1 font-semibold text-gray-900">{status}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Total Budget / Contract Amount</p><p className="mt-1 text-xl font-bold text-emerald-700">{formatMoney(budget)}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Amount Paid</p><p className="mt-1 text-xl font-bold text-gray-900">{formatMoney(paid)}</p></div>
                </div>
              </section>
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="font-bold text-gray-900">Project Statistics</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div><p className="text-xs text-gray-500">Progress</p><p className="mt-1 text-xl font-bold text-blue-700">{progress === undefined ? '—' : `${display(progress)}${typeof progress === 'number' && progress <= 1 ? '%' : ''}`}</p>{typeof progress === 'number' && <div className="mt-2 h-2 rounded-full bg-gray-100"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${Math.max(0,Math.min(100,progress <= 1 ? progress*100 : progress))}%` }}/></div>}</div>
                  <div><p className="text-xs text-gray-500">Infrastructure Year</p><p className="mt-1 font-semibold">{display(record.infraYear ?? record.infrastructure_year)}</p></div>
                  <div><p className="text-xs text-gray-500">Reports</p><p className="mt-1 font-semibold">{display(record.reportCount ?? record.report_count)}</p></div>
                </div>
              </section>
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="font-bold text-gray-900">Project Information</h2>
                <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {ordinaryFields.map(([key,value]) => <div key={key} className="min-w-0"><dt className="text-xs text-gray-500">{label(key)}</dt><dd className="mt-1 break-words text-sm font-medium text-gray-900">{display(value)}</dd></div>)}
                </dl>
                {record.description && <p className="mt-4 text-sm leading-relaxed text-gray-700">{String(record.description)}</p>}
              </section>
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="font-bold text-gray-900">Timeline</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div><p className="text-xs text-gray-500">Start Date</p><p className="mt-1 text-sm font-medium">{formatDate(startDate)}</p></div>
                  <div><p className="text-xs text-gray-500">Completion Date</p><p className="mt-1 text-sm font-medium">{formatDate(completionDate)}</p></div>
                </div>
              </section>
              {components !== undefined && <section className="rounded-2xl border border-gray-200 bg-white p-6"><h2 className="font-bold text-gray-900">Project Components</h2><pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-sm text-gray-700">{display(components)}</pre></section>}
              {documents.length > 0 && <section className="rounded-2xl border border-gray-200 bg-white p-6"><h2 className="font-bold text-gray-900">Documents</h2><ul className="mt-3 space-y-2">{documents.map(([key,value])=><li key={key}><a href={String(value)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline"><FileText className="h-4 w-4"/>{label(key)}<ExternalLink className="h-3 w-3"/></a></li>)}</ul></section>}
              {coordinates[0] !== undefined && coordinates[1] !== undefined && <section className="rounded-2xl border border-gray-200 bg-white p-6"><h2 className="font-bold text-gray-900">Project Location</h2><p className="mt-2 text-sm text-gray-600">{display(coordinates[0])}, {display(coordinates[1])}</p><a className="mt-3 inline-flex text-sm font-semibold text-primary-700 hover:underline" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${encodeURIComponent(`${coordinates[0]},${coordinates[1]}`)}`}>Open map <ExternalLink className="ml-1 h-3 w-3"/></a></section>}
            </article>
            <aside className="space-y-4">
              <a href={`${BISTO_URL}${encodeURIComponent(projectId)}`} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-4 font-semibold text-white hover:bg-primary-800">Open Full Bisto Record <ExternalLink className="h-4 w-4"/></a>
              <div className="rounded-xl border border-gray-200 bg-white p-5"><h2 className="font-bold text-gray-900">Source and verification</h2><p className="mt-2 text-sm leading-relaxed text-gray-600">This page presents all project fields supplied by the BetterGov DPWH API. Source-only materials such as verification history, project photos, and signed procurement documents may not be exposed by the API.</p><a href="https://transparency.dpwh.gov.ph/" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">DPWH Transparency Portal <ExternalLink className="h-3 w-3"/></a></div>
            </aside>
          </div>
        </>}
      </section>
    </main>
  </>;
}
