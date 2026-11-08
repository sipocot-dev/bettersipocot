import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Droplets, Eye, RefreshCw, Thermometer, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../../config/site';
import {
  describeWeather,
  fetchCurrentWeather,
  type CurrentWeather,
} from '../../lib/weather';

const WeatherMap = lazy(() => import('./WeatherMap'));

export default function WeatherSection() {
  const { t } = useTranslation();
  const { lat, lng } = siteConfig.coordinates;
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );
  const [reloadKey, setReloadKey] = useState(0);

  const refresh = useCallback(() => {
    setStatus('loading');
    setReloadKey(key => key + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchCurrentWeather(lat, lng, controller.signal)
      .then(data => {
        setWeather(data);
        setStatus('ready');
      })
      .catch(error => {
        if (error.name !== 'AbortError') setStatus('error');
      });
    return () => controller.abort();
  }, [lat, lng, reloadKey]);

  const condition = weather ? describeWeather(weather.code) : null;
  const updated = weather?.fetchedAt.toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  });

  const rows = weather
    ? [
        {
          icon: Droplets,
          color: 'text-sky-500',
          label: t('weather.humidity'),
          value: `${weather.humidity}%`,
        },
        {
          icon: Wind,
          color: 'text-teal-500',
          label: t('weather.windSpeed'),
          value: `${weather.windSpeed} km/h`,
        },
        {
          icon: Thermometer,
          color: 'text-orange-400',
          label: t('weather.feelsLike'),
          value: `${weather.feelsLike}°C`,
        },
        {
          icon: Eye,
          color: 'text-violet-400',
          label: t('weather.visibility'),
          value:
            weather.visibilityKm !== null ? `${weather.visibilityKm} km` : '—',
        },
      ]
    : [];

  return (
    <section
      id="weather"
      className="py-12 bg-gradient-to-br from-sky-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-relaxed">
              {t('weather.title')}
            </h2>
            <p className="text-gray-500">
              {t('weather.subtitle', { location: siteConfig.location })}
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={status === 'loading'}
            aria-label={t('weather.refresh')}
            className="rounded-full p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition disabled:opacity-40"
          >
            <RefreshCw
              className={`h-5 w-5 ${status === 'loading' ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Temperature card */}
          <div className="md:col-start-1 md:row-start-1 rounded-2xl bg-primary-600 text-white p-6 flex flex-col justify-between shadow-md min-h-[180px]">
            {status === 'error' ? (
              <p className="text-primary-50">{t('weather.error')}</p>
            ) : weather && condition ? (
              <div>
                <p className="text-4xl mb-2" aria-hidden="true">
                  {condition.icon}
                </p>
                <p className="text-5xl font-bold leading-none">
                  {weather.temperature}°C
                </p>
                <p className="text-primary-100 mt-2">{condition.label}</p>
              </div>
            ) : (
              <p className="text-primary-100">{t('weather.loading')}</p>
            )}
            <div className="mt-4 pt-3 border-t border-primary-500">
              <p className="text-primary-200 text-xs">
                {siteConfig.location}
                {updated && ` · ${t('weather.updated', { time: updated })}`}
              </p>
              <p className="text-primary-300 text-xs mt-0.5">
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-white"
                >
                  {t('weather.credit')}
                </a>
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 rounded-2xl overflow-hidden border border-gray-200 shadow-sm isolate min-h-[360px] bg-gray-100">
            <Suspense fallback={null}>
              <WeatherMap lat={lat} lng={lng} label={siteConfig.location} />
            </Suspense>
          </div>

          {/* Current conditions */}
          <div className="md:col-start-1 md:row-start-2 rounded-xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-gray-400">
              {t('weather.currentConditions')}
            </p>
            {rows.length === 0 ? (
              <p className="text-sm text-gray-400">
                {status === 'error' ? '—' : t('weather.loading')}
              </p>
            ) : (
              rows.map(({ icon: Icon, color, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="font-bold text-gray-800">{value}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
