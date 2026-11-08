import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet's default icon paths break under bundlers, so set them explicitly
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface WeatherMapProps {
  lat: number;
  lng: number;
  label: string;
}

export default function WeatherMap({ lat, lng, label }: WeatherMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = L.map(containerRef.current).setView([lat, lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker([lat, lng]).addTo(map).bindPopup(label);
    return () => {
      map.remove();
    };
  }, [lat, lng, label]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Map of ${label}`}
      style={{ height: '100%', width: '100%', minHeight: 360 }}
    />
  );
}
