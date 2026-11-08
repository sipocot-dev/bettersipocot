import { useMemo, useState } from 'react';
import { BookOpen, Church, ExternalLink, Map as MapIcon, MapPin, Search, Users, List, Cross, Landmark } from 'lucide-react';
import Section from '../components/ui/Section';
import SEO from '../components/SEO';
import { sipocotWorshipPlaces, churchQuickLinks, type WorshipPlace } from '../data/churches';

type ViewMode = 'table' | 'map';
const mapUrl = (place: WorshipPlace) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;

export default function Churches() {
  const [view, setView] = useState<ViewMode>('table');
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('All');
  const [denomination, setDenomination] = useState('All');
  const [selected, setSelected] = useState<WorshipPlace | null>(null);

  const denominations = useMemo(() => ['All', ...Array.from(new Set(sipocotWorshipPlaces.map(p => p.denomination))).sort()], []);
  const filtered = useMemo(() => sipocotWorshipPlaces.filter(place => {
    const haystack = [place.name, place.kind, place.denomination, place.barangay, place.address, place.clergyName ?? '', place.assistantClergy ?? ''].join(' ').toLowerCase();
    return haystack.includes(query.toLowerCase()) && (kind === 'All' || place.kind === kind) && (denomination === 'All' || place.denomination === denomination);
  }), [query, kind, denomination]);

  const parishes = sipocotWorshipPlaces.filter(p => p.kind === 'Parish');
  const clergyListed = sipocotWorshipPlaces.filter(p => p.clergyName).length;
  const kinds = ['All', 'Parish', 'Mission house', 'Chapel', 'Christian church', 'Congregation'];

  return <>
    <SEO title="Churches and Chapels in Sipocot" description="Directory of Catholic parishes, chapels, mission stations and Christian churches in Sipocot, Camarines Sur, including published clergy assignments and locations." keywords="Sipocot churches, Sipocot chapels, parish priests, Diocese of Libmanan, Camarines Sur churches" />
    <section className="w-full bg-[#0b3b8c] text-white">
      <div className="container mx-auto px-4 py-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">BetterSipocot · Faith & Community</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Churches and Chapels in Sipocot</h1>
        <p className="mt-3 max-w-3xl text-blue-100">Explore Catholic parishes, chapels, mission stations and Christian congregations across Sipocot. Find locations, denominations and publicly listed parish priests or church leaders.</p>
      </div>
    </section>

    <Section className="px-4 pt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {churchQuickLinks.map((item, index) => {
          const Icon = [Church, Landmark, Users, BookOpen][index];
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
          { label: 'Listed worship places', value: sipocotWorshipPlaces.length.toString(), icon: Church },
          { label: 'Catholic parishes', value: parishes.length.toString(), icon: Cross },
          { label: 'Published clergy records', value: clergyListed.toString(), icon: Users },
          { label: 'Barangays represented', value: new Set(sipocotWorshipPlaces.map(p => p.barangay)).size.toString(), icon: MapPin },
        ].map(item => <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500"><item.icon className="h-4 w-4 text-primary-700"/>{item.label}</div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{item.value}</p>
        </div>)}
      </div>

      <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <strong>Clergy and listing accuracy:</strong> Priest and administrator names are transcribed from the Diocese of Libmanan's published parish directory. Assignments can change; confirm with the parish or Diocese before relying on them. For non-Catholic congregations, a pastor or leader is shown only when a public directory identifies that person. A blank clergy field means no current assignment could be verified, not that the church has no leader. This community directory is not an official ecclesiastical registry.
      </div>

      <div id="worship-directory" className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search church, priest, denomination or barangay..." className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"/>
          </label>
          <select value={kind} onChange={e => setKind(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">{kinds.map(option => <option key={option}>{option}</option>)}</select>
          <select value={denomination} onChange={e => setDenomination(e.target.value)} className="max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">{denominations.map(option => <option key={option}>{option}</option>)}</select>
        </div>
        <div className="inline-flex self-start rounded-lg border border-gray-300 bg-white p-1">
          <button onClick={() => setView('table')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'table' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><List className="h-4 w-4"/>Table</button>
          <button onClick={() => setView('map')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${view === 'map' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><MapIcon className="h-4 w-4"/>Map</button>
        </div>
      </div>
      <div className="mb-3 text-sm text-gray-500">Showing {filtered.length} of {sipocotWorshipPlaces.length} listed worship places</div>

      {view === 'table' ? <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600"><tr><th className="px-4 py-3">Church / Chapel</th><th className="px-4 py-3">Type & denomination</th><th className="px-4 py-3">Barangay / address</th><th className="px-4 py-3">Assigned priest / leader</th><th className="px-4 py-3">Contact / details</th><th className="px-4 py-3">Location</th></tr></thead>
            <tbody className="divide-y divide-gray-100">{filtered.map(place => <tr key={place.name} className="align-top hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold text-gray-900">{place.name}</td>
              <td className="px-4 py-3"><span className="font-medium">{place.kind}</span><span className="mt-1 block text-xs text-gray-500">{place.denomination}</span></td>
              <td className="px-4 py-3">{place.barangay}<span className="mt-1 block text-xs text-gray-500">{place.address}</span></td>
              <td className="px-4 py-3">{place.clergyName ? <><span className="font-medium text-gray-900">{place.clergyName}</span><span className="mt-1 block text-xs text-gray-500">{place.clergyRole}{place.assistantClergy ? ` · ${place.assistantClergy}` : ''}</span></> : <span className="text-gray-400">Not publicly verified</span>}</td>
              <td className="px-4 py-3"><span>{place.phone ?? 'Not published'}</span>{place.patronOrFeast && <span className="mt-1 block text-xs text-gray-500">{place.patronOrFeast}</span>}{place.notes && <span className="mt-1 block max-w-xs text-xs text-gray-500">{place.notes}</span>}</td>
              <td className="px-4 py-3"><a className="whitespace-nowrap font-medium text-primary-700 hover:underline" href={mapUrl(place)} target="_blank" rel="noreferrer">Open map <ExternalLink className="inline h-3 w-3"/></a></td>
            </tr>)}</tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="p-10 text-center text-sm text-gray-500">No churches or chapels match the selected filters.</p>}
      </div> : <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-semibold text-gray-900">Churches and chapels map</h2><span className="text-xs text-gray-500">Choose a listing to open its map location</span></div>
        <div className="overflow-hidden rounded-xl border border-gray-200"><iframe title="Churches and chapels in Sipocot map" src="https://www.google.com/maps?q=churches+chapels+in+Sipocot+Camarines+Sur&output=embed" className="h-[460px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(place => <button key={place.name} onClick={() => setSelected(place)} className={`rounded-lg border p-3 text-left transition-colors hover:border-blue-300 hover:bg-blue-50 ${selected?.name === place.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
          <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-600"/><span><span className="block text-sm font-semibold text-gray-900">{place.name}</span><span className="mt-1 block text-xs text-gray-500">{place.barangay} · {place.kind}</span>{place.clergyName && <span className="mt-1 block text-xs text-gray-600">{place.clergyName}</span>}</span></span>
        </button>)}</div>
        {selected && <div className="mt-4 flex flex-col gap-2 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold text-gray-900">{selected.name}</h3><p className="text-sm text-gray-500">{selected.address}{selected.clergyName ? ` · ${selected.clergyName}` : ''}</p></div><a className="inline-flex items-center gap-2 self-start rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800" href={mapUrl(selected)} target="_blank" rel="noreferrer">Open directions <ExternalLink className="h-4 w-4"/></a></div>}
      </div>}

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-gray-900">Sources and verification</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">Parish clergy and administrator assignments come from the Diocese of Libmanan. Church and chapel locations are compiled from official denomination directories and local map/community listings. Listings from third-party maps are leads for navigation, not proof of current operating status or official recognition.</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://libmanandiocese.org/?p=353" target="_blank" rel="noreferrer">Diocese of Libmanan – Parishes & Mission Stations <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://directory.iglesianicristo.net/locales/sipocot" target="_blank" rel="noreferrer">Iglesia Ni Cristo – Official Sipocot Locale Directory <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://local.churchofjesuschrist.org/en/ph/camarines-sur/sipocot" target="_blank" rel="noreferrer">The Church of Jesus Christ of Latter-day Saints – Sipocot locations <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://directory.irmministries.org/church/irm-ministries-calagbangan" target="_blank" rel="noreferrer">IRM Ministries – Calagbangan church and pastor listing <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.theoldchurches.com/category/philippines/camarines-sur/sipocot/" target="_blank" rel="noreferrer">The Old Churches – Sipocot parish locations <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.cybo.com/PH/sipocot-camarines-sur/churches/" target="_blank" rel="noreferrer">Local directory – Churches in Sipocot <ExternalLink className="inline h-3 w-3"/></a></li>
        </ul>
      </div>
    </Section>
  </>;
}
