import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink, FileText, LoaderCircle, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const API_URL = 'https://api.dpwh.bettergov.ph/projects';
const BISTO_URL = 'https://bisto.ph/project/';

type RecordValue = Record<string, unknown>;

function extractRecord(payload: unknown): RecordValue | null {
  if (!payload || typeof payload !== 'object') return null;
  const root = payload as RecordValue;
  const data = root.data;
  if (Array.isArray(data)) return (data[0] as RecordValue) ?? null;
  if (data && typeof data === 'object') {
    const nested = data as RecordValue;
    if (Array.isArray(nested.data)) return (nested.data[0] as RecordValue) ?? null;
    if (nested.project && typeof nested.project === 'object') return nested.project as RecordValue;
    if (nested.contract && typeof nested.contract === 'object') return nested.contract as RecordValue;
  }
  if (Array.isArray(root.projects)) return (root.projects[0] as RecordValue) ?? null;
  if (root.project && typeof root.project === 'object') return root.project as RecordValue;
  return root;
}

function display(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return Array.isArray(value) ? value.map(display).join(', ') : Object.entries(value as RecordValue).map(([k,v]) => `${label(k)}: ${display(v)}`).join(' · ');
  return String(value);
}

function label(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function collectFields(record: RecordValue): [string, unknown][] {
  const ignored = new Set(['id', 'contractid', 'contract_id', 'projectid', 'project_id', 'latitude', 'longitude', 'lat', 'lng', 'lon', 'geometry', 'coordinates']);
  return Object.entries(record).filter(([key, value]) =>
    !ignored.has(key.toLowerCase()) && value !== null && value !== undefined && value !== ''
  );
}

export default function ProjectDetail() {
  const { projectId = '' } = useParams();
  const [record, setRecord] = useState<RecordValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const url = new URL(API_URL);
        url.searchParams.set('search', projectId);
        url.searchParams.set('page', '1');
        url.searchParams.set('limit', '10');
        const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Project API returned HTTP ${response.status}.`);
        const payload: unknown = await response.json();
        const found = extractRecord(payload);
        if (!found) throw new Error('No project details were returned for this contract ID.');
        setRecord(found);
        setError('');
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
  const projectName = record ? String(record.project_name ?? record.projectName ?? record.title ?? record.description ?? record.name ?? projectId) : projectId;
  const status = record ? String(record.status ?? record.project_status ?? record.projectStatus ?? '—') : '—';
  const location = record ? String(record.location_name ?? record.project_location ?? record.address ?? 'Sipocot, Camarines Sur') : '';
  const amount = record ? record.contract_amount ?? record.contractAmount ?? record.amount ?? record.project_cost ?? record.projectCost ?? record.cost ?? record.budget : null;
  const documents = fields.filter(([key, value]) => /document|file|attachment|advertisement|contract.?agreement|notice.?of|url/i.test(key) && typeof value === 'string' && /^https?:\/\//i.test(value));
  const ordinaryFields = fields.filter(([key]) => !documents.some(([docKey]) => docKey === key));

  return <>
    <SEO title={`${projectName} | Sipocot Projects`} description={`Project details for DPWH contract ${projectId} in Sipocot, Camarines Sur.`} />
    <main className="grow bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link to="/projects" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline"><ArrowLeft className="h-4 w-4"/>Back to Projects</Link>
        {loading && <div className="flex items-center gap-3 rounded-xl border bg-white p-8 text-gray-600"><LoaderCircle className="h-5 w-5 animate-spin"/>Loading project information…</div>}
        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"><strong>Unable to load this project.</strong><p className="mt-1">{error}</p><a className="mt-3 inline-flex items-center gap-1 font-semibold underline" href={`${BISTO_URL}${encodeURIComponent(projectId)}`} target="_blank" rel="noreferrer">Open Bisto project <ExternalLink className="h-3 w-3"/></a></div>}
        {!loading && record && <>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">DPWH Infrastructure Project</p>
              <h1 className="mt-2 text-2xl font-bold leading-tight text-primary-800 sm:text-3xl">{projectName}</h1>
              <p className="mt-4 flex items-center gap-2 text-sm text-gray-600"><MapPin className="h-4 w-4"/>{location}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Contract ID</p><p className="mt-1 font-semibold text-gray-900">{projectId}</p></div>
                <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Status</p><p className="mt-1 font-semibold text-gray-900">{status}</p></div>
                <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2"><p className="text-xs text-gray-500">Contract amount / budget</p><p className="mt-1 text-xl font-bold text-emerald-700">{amount === null ? '—' : `₱${Number(amount).toLocaleString('en-PH')}`}</p></div>
              </div>
              <h2 className="mt-8 text-lg font-bold text-gray-900">Project Information</h2>
              <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {ordinaryFields.map(([key,value]) => <div key={key} className="min-w-0"><dt className="text-xs text-gray-500">{label(key)}</dt><dd className="mt-1 break-words text-sm font-medium text-gray-900">{display(value)}</dd></div>)}
              </dl>
              {documents.length > 0 && <><h2 className="mt-8 text-lg font-bold text-gray-900">Documents and External Records</h2><ul className="mt-3 space-y-2">{documents.map(([key,value])=><li key={key}><a href={String(value)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline"><FileText className="h-4 w-4"/>{label(key)}<ExternalLink className="h-3 w-3"/></a></li>)}</ul></>}
            </article>
            <aside className="space-y-4">
              <a href={`${BISTO_URL}${encodeURIComponent(projectId)}`} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-4 font-semibold text-white hover:bg-primary-800">Open Full Bisto Record <ExternalLink className="h-4 w-4"/></a>
              <div className="rounded-xl border border-gray-200 bg-white p-5"><h2 className="font-bold text-gray-900">Source and verification</h2><p className="mt-2 text-sm leading-relaxed text-gray-600">This page displays fields returned by the BetterGov DPWH projects API. Some detailed documents, verification history, photos, and project components may only be available on the source portal.</p><a href={`https://transparency.dpwh.gov.ph/projects/${encodeURIComponent(projectId)}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">DPWH Transparency Portal <ExternalLink className="h-3 w-3"/></a></div>
            </aside>
          </div>
        </>}
      </section>
    </main>
  </>;
}
