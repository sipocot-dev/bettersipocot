import { Phone } from 'lucide-react';
import { emergencyHotlines } from '../../data/hotlines';

export default function HotlineBar() {
  return (
    <div
      className="bg-red-950 text-white"
      role="region"
      aria-label="Emergency hotlines"
    >
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-x-5 overflow-x-auto whitespace-nowrap py-2 text-xs">
          <li className="flex items-center gap-1.5 font-bold uppercase tracking-wide text-red-300">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Emergency Hotlines:
          </li>
          {emergencyHotlines.map(hotline => (
            <li key={hotline.label}>
              <a
                href={`tel:${hotline.tel}`}
                className="hover:text-red-200 transition-colors"
              >
                <span className="font-semibold">{hotline.label}</span>{' '}
                <span className="text-red-100">{hotline.number}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
