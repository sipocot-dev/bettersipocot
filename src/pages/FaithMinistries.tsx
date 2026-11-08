import { HeartHandshake, Baby, Cross, GraduationCap, HandHeart, ExternalLink, MapPin, Church, Users, BookOpen, ShieldCheck } from 'lucide-react';
import Section from '../components/ui/Section';
import SEO from '../components/SEO';

const programs = [
  {
    title: 'Children’s care and residential support',
    tag: 'Children & child welfare',
    place: 'Casa Miani',
    location: 'Bolo Norte, Sipocot, Camarines Sur',
    description: 'A church-linked children’s home listed by the Diocese of Libmanan among its institutions. Contact the organization first to ask about its current child-care services, safeguarding procedures and approved ways to help.',
    action: 'Find Casa Miani',
    href: 'https://www.google.com/maps/search/?api=1&query=Casa+Miani+Bolo+Norte+Sipocot+Camarines+Sur',
    source: 'Diocese of Libmanan – Seminaries, Schools & Institutions',
    sourceUrl: 'https://libmanandiocese.org/?p=303',
    kind: 'children',
  },
  {
    title: 'Children’s home in nearby Cabusao',
    tag: 'Nearby institution · outside Sipocot',
    place: 'Casa dei Bambini San Giuseppe de Cabusao',
    location: 'New Poblacion, Cabusao, Camarines Sur',
    description: 'A children’s institution identified in the Diocese of Libmanan directory. It is included as a nearby regional resource, not as a facility located inside Sipocot.',
    action: 'View location',
    href: 'https://www.google.com/maps/search/?api=1&query=Casa+dei+Bambini+San+Giuseppe+Cabusao',
    source: 'Diocese of Libmanan – Seminaries, Schools & Institutions',
    sourceUrl: 'https://libmanandiocese.org/?p=303',
    kind: 'children',
  },
];

const seminaries = [
  {
    name: 'St. James the Greater Minor Seminary',
    location: 'Station-Church Site, Libmanan, Camarines Sur',
    description: 'A minor seminary in the Diocese of Libmanan. Contact the diocese to ask about admission, age requirements, school arrangements and discernment.',
    map: 'St James the Greater Minor Seminary Libmanan Camarines Sur',
  },
  {
    name: 'St. Benedict Diocesan Seminary',
    location: 'Maharlika Highway, Del Pilar, San Fernando, Camarines Sur',
    description: 'Diocesan seminary formation listed by the Diocese of Libmanan.',
    map: 'St Benedict Diocesan Seminary San Fernando Camarines Sur',
  },
  {
    name: 'St. Joseph Propaedeutic Seminary',
    location: 'Sto. Domingo, Milaor, Camarines Sur',
    description: 'A propaedeutic formation house listed by the Diocese of Libmanan.',
    map: 'St Joseph Propaedeutic Seminary Milaor Camarines Sur',
  },
];

const pathways = [
  { icon: Cross, title: 'Priestly vocation', description: 'For men who wish to discern diocesan priesthood and learn about seminary formation.' },
  { icon: HandHeart, title: 'Religious life', description: 'Explore consecrated life and the different religious communities serving the Diocese.' },
  { icon: BookOpen, title: 'Catechists and faith formation', description: 'Ask your parish about catechetical formation, children’s faith education and parish learning activities.' },
  { icon: Users, title: 'Youth and altar service', description: 'Ask local parishes about youth groups, altar serving, music ministry and other age-appropriate service.' },
];

export default function FaithMinistries() {
  return <>
    <SEO title="Children, Charity & Vocations | BetterSipocot" description="Find child-care institutions, ways to support children, and vocation and seminary information in the Diocese of Libmanan." keywords="Casa Miani Sipocot, children home Sipocot, priesthood vocation, seminary Camarines Sur, Diocese of Libmanan" />
    <section className="w-full bg-[#0b3b8c] text-white">
      <div className="container mx-auto px-4 py-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">BetterSipocot · Churches & Worship</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Children, Charity & Vocations</h1>
        <p className="mt-3 max-w-3xl text-blue-100">Discover children’s care institutions, ways to support vulnerable families, and opportunities to discern priesthood, religious life and service in the Church.</p>
      </div>
    </section>

    <Section className="px-4 pt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Children’s Homes', description: 'Find child-care institutions and approved ways to help.', href: '#child-care', icon: Baby },
          { title: 'Priestly Vocations', description: 'Learn about discernment and seminary formation.', href: '#vocations', icon: Cross },
          { title: 'Religious Life', description: 'Explore religious communities and consecrated life.', href: '#pathways', icon: Church },
          { title: 'Volunteer & Support', description: 'Ask about safe, parish-coordinated ways to serve.', href: '#support', icon: HeartHandshake },
        ].map(item => <a key={item.title} href={item.href} className="flex min-h-[104px] flex-col justify-center rounded-lg bg-[#0b3b8c] px-4 py-3 text-white shadow-sm transition-colors hover:bg-[#082d6b] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          <item.icon className="mb-2 h-5 w-5 text-blue-100"/><span className="text-sm font-semibold">{item.title}</span><span className="mt-1 text-xs leading-relaxed text-blue-100">{item.description}</span>
        </a>)}
      </div>
    </Section>

    <Section className="px-4 py-8">
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><Baby className="h-5 w-5 text-primary-700"/><p className="mt-2 text-2xl font-bold text-gray-900">2</p><p className="text-sm text-gray-500">Church-listed children’s institutions in Sipocot and nearby Cabusao</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><GraduationCap className="h-5 w-5 text-primary-700"/><p className="mt-2 text-2xl font-bold text-gray-900">3</p><p className="text-sm text-gray-500">Diocesan seminary and formation locations listed</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><HeartHandshake className="h-5 w-5 text-primary-700"/><p className="mt-2 text-2xl font-bold text-gray-900">4</p><p className="text-sm text-gray-500">Ways to explore church service and formation</p></div>
      </div>

      <div id="child-care" className="scroll-mt-24">
        <div className="mb-4"><p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Children & child welfare</p><h2 className="mt-1 text-2xl font-bold text-gray-900">Children’s homes and care institutions</h2><p className="mt-2 max-w-3xl text-sm text-gray-600">These are institutions identified in church or public directories. Their current programs, admission policies and donation needs must be confirmed directly.</p></div>
        <div className="grid gap-4 md:grid-cols-2">
          {programs.map(item => <article key={item.place} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">{item.tag}</div>
            <h3 className="text-lg font-bold text-gray-900">{item.place}</h3><p className="mt-1 flex items-start gap-2 text-sm text-gray-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0"/>{item.location}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">{item.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3"><a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">{item.action}<ExternalLink className="h-4 w-4"/></a><a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-xs font-medium text-primary-700 hover:underline">Source: {item.source}</a></div>
          </article>)}
        </div>
      </div>

      <div id="vocations" className="mt-10 scroll-mt-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Vocation discernment</p><h2 className="mt-1 text-2xl font-bold text-gray-900">Considering the priesthood?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">If you are considering becoming a diocesan priest, start by speaking with your parish priest or contacting the Diocese of Libmanan. They can explain discernment, application requirements, formation stages and the current vocation contact person. Do not rely on unofficial recruiters or send money to individuals claiming to guarantee seminary admission.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {seminaries.map(item => <article key={item.name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><GraduationCap className="h-6 w-6 text-primary-700"/><h3 className="mt-3 font-bold text-gray-900">{item.name}</h3><p className="mt-1 flex items-start gap-2 text-xs text-gray-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0"/>{item.location}</p><p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline">Find location <ExternalLink className="h-3.5 w-3.5"/></a></article>)}
        </div>
      </div>

      <div id="pathways" className="mt-10 scroll-mt-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Other forms of service</p><h2 className="mt-1 text-2xl font-bold text-gray-900">Religious life and parish ministries</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pathways.map(item => <article key={item.title} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4"><item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"/><div><h3 className="font-semibold text-gray-900">{item.title}</h3><p className="mt-1 text-sm text-gray-600">{item.description}</p></div></article>)}
        </div>
      </div>

      <div id="support" className="mt-10 rounded-xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary-700"/><div><h2 className="text-lg font-bold text-gray-900">How to help children and church ministries safely</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>Contact the institution or parish first and ask for its current, approved donation and volunteer process.</li>
          <li>Ask whether it accepts school supplies, food, clothing, financial assistance or volunteer time before bringing anything.</li>
          <li>Do not publish children’s names, photographs, case histories or personal information without proper authorization.</li>
          <li>Do not arrange private, unsupervised contact with children. Follow the institution’s child-protection and safeguarding rules.</li>
          <li>For vocation inquiries, contact the Diocese or speak with a parish priest; discernment should be voluntary and free from pressure.</li>
        </ul></div></div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-gray-900">Official sources and further information</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://libmanandiocese.org/?p=303" target="_blank" rel="noreferrer">Diocese of Libmanan – Seminaries, Schools & Institutions <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://libmanandiocese.org/?p=4071" target="_blank" rel="noreferrer">Diocese of Libmanan – Vocation promotion and Sodalitas Sancti Benedicti <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://libmanandiocese.org/" target="_blank" rel="noreferrer">Diocese of Libmanan – Official website and contact channels <ExternalLink className="inline h-3 w-3"/></a></li>
          <li><a className="font-semibold text-primary-700 hover:underline" href="https://www.ucanews.com/directory/congregration/philippines-x/454" target="_blank" rel="noreferrer">UCA Directory – Religious congregations in the Diocese of Libmanan <ExternalLink className="inline h-3 w-3"/></a></li>
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">This is an independent community information page, not an official Diocese of Libmanan or child-care institution website. Information about children’s homes and formation programs is subject to change. Confirm directly with the institution or Diocese.</p>
      </div>
    </Section>
  </>;
}
