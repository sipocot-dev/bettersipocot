import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowRight, MapPin, Users } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();
  const name = import.meta.env.VITE_GOVERNMENT_NAME;
  const province = import.meta.env.VITE_PROVINCE;
  const email = import.meta.env.VITE_CONTACT_EMAIL;

  return (
    <div className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {name}, {province}
          </div>

          <h1 className="mt-6 mb-6 text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight">
            Better
            <br />
            {name}.org
          </h1>

          <p className="mb-8 max-w-xl text-lg md:text-xl text-primary-50">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary-800 hover:bg-primary-50"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
              {t('hero.browseServices')}
            </Link>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/50 px-6 py-3 font-semibold hover:bg-white/10"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              {t('hero.contactUs')}
            </a>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
              <strong>65,286</strong> {t('hero.population')}
            </span>
            <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
              <strong>46</strong> {t('hero.barangays')}
            </span>
            <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
              <strong>Region V</strong> {t('hero.region')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
