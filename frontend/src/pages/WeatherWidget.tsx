import { useEffect, useState } from 'react';

interface WeatherData {
  success: boolean;
  query?: string;
  location?: string;
  temperatureC: number;
  humidity: number;
  windSpeedKmh: number;
  condition?: string;
  time: string;
  error?: string;
}

interface WeatherWidgetProps {
  // Backwards compatible: the old 5 options still work
  city?: 'lahore' | 'hunza' | 'skardu' | 'swat' | 'neelum';

  // New: any destination/place (recommended)
  placeQuery?: string;
}

export function WeatherWidget({ city = 'lahore', placeQuery }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = String(BACKEND_BASE_URL || '').replace(/\/$/, '');
        const queryString = placeQuery
          ? `q=${encodeURIComponent(placeQuery)}`
          : `city=${encodeURIComponent(city)}`;

        const response = await fetch(`${base}/api/weather?${queryString}`);
        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(data?.error || 'Failed to fetch weather');
        }

        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, placeQuery, BACKEND_BASE_URL]);

  const title = weather?.location || placeQuery || city;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-md px-4 py-3 inline-flex items-center space-x-4 text-sm">
      {loading && <span>Loading current weather…</span>}

      {!loading && error && <span>{error}</span>}

      {!loading && !error && weather && (
        <>
          <div>
            <p className="font-semibold capitalize">{title} weather</p>
            <p className="text-xs text-gray-500">
              Updated: {new Date(weather.time).toLocaleTimeString()}
            </p>
            {weather.condition && (
              <p className="text-xs text-gray-500 capitalize">Condition: {weather.condition}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">{Math.round(weather.temperatureC)}°C</div>
            <div className="text-xs text-gray-600">
              <p>Humidity: {Math.round(weather.humidity)}%</p>
              <p>Wind: {Math.round(weather.windSpeedKmh)} km/h</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
