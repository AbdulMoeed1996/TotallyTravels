import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Calendar, Cloud, Droplets, MapPin, Wind } from 'lucide-react';

import type { Destination } from '../data/destinationsData';

import '../styles/hero.css';
import '../styles/destination-detail.css';

interface DestinationDetailProps {
  destination: Destination;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

type LiveWeather = {
  temperatureC: number;
  humidity: number;
  windSpeedKmh: number;
  condition: string;
  time?: string;
  location?: string;
};

function DestinationDetail({ destination, onNavigate, onBack }: DestinationDetailProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });

  const heroStyle: CSSProperties = {
    ['--tt-hero-image' as any]: `url(${destination.coverImage})`,
  };

  const handleBookNow = () => {
    onNavigate('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHighlights = () => {
    document.getElementById('tt-highlights')?.scrollIntoView({ behavior: 'smooth' });
  };

  const highlightsCount = destination.famousLocations?.length ?? 0;

  // -------------------- LIVE WEATHER (dynamic) --------------------
  const BACKEND_BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001').replace(
    /\/$/,
    ''
  );

  /**
   * Some locations (especially Fairy Meadows) are not found by the geocoder reliably.
   * So we use lat/lon for those to guarantee weather works.
   */
  const WEATHER_COORD_OVERRIDES: Record<string, { lat: number; lon: number }> = {
    'fairy-meadows': { lat: 35.4214, lon: 74.5960 }, // avoids geocode failure
    'hunza-valley': { lat: 36.3167, lon: 74.65 },
    'skardu-valley': { lat: 35.2976, lon: 75.6333 },
    'lahore-heritage': { lat: 31.5204, lon: 74.3587 },
    'swat-valley': { lat: 35.2220, lon: 72.4258 },
    'neelum-valley': { lat: 34.5869, lon: 73.9070 },
    galiyat: { lat: 34.0727, lon: 73.3810 }, // Nathia Gali area
    'kaghan-naran': { lat: 34.9093, lon: 73.6506 }, // Naran area
    'khanpur-lake': { lat: 33.8369, lon: 72.8368 },
    taxila: { lat: 33.7460, lon: 72.8397 },
  };

  const WEATHER_QUERY_OVERRIDES: Record<string, string> = {
    'khewra-salt-mines': 'Khewra, Pakistan',
    'kalash-valley': 'Kalash, Pakistan',
    'banjusa-lake': 'Banjosa Lake, Pakistan',
    'katas-raj-temple': 'Katas Raj, Pakistan',
    'shogran-siri-paye': 'Shogran, Pakistan',
    'kumrat-valley': 'Kumrat Valley, Pakistan',
    'shandur-gupis': 'Shandur Pass, Pakistan',
    'astore-valley': 'Astore, Pakistan',
    'mughal-garden-wah': 'Wah, Pakistan',
    'kutwal-lake': 'Kutwal Lake, Pakistan',
    'haramosh-valley': 'Haramosh Valley, Pakistan',
  };

  const [liveWeather, setLiveWeather] = useState<LiveWeather | null>(null);

  const weatherRequestUrl = useMemo(() => {
    const coord = WEATHER_COORD_OVERRIDES[destination.id];
    if (coord) {
      return `${BACKEND_BASE_URL}/api/weather?lat=${coord.lat}&lon=${coord.lon}`;
    }

    const q = WEATHER_QUERY_OVERRIDES[destination.id] || `${destination.name}, Pakistan`;
    return `${BACKEND_BASE_URL}/api/weather?q=${encodeURIComponent(q)}`;
  }, [BACKEND_BASE_URL, destination.id, destination.name]);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async () => {
      try {
        const resp = await fetch(weatherRequestUrl);
        const data = await resp.json();

        if (!resp.ok || !data?.success) {
          throw new Error(data?.error || 'Failed to fetch weather');
        }

        if (cancelled) return;

        setLiveWeather({
          temperatureC: Number(data.temperatureC),
          humidity: Number(data.humidity),
          windSpeedKmh: Number(data.windSpeedKmh),
          condition: String(data.condition || ''),
          time: data.time ? String(data.time) : undefined,
          location: data.location ? String(data.location) : undefined,
        });
      } catch {
        if (!cancelled) setLiveWeather(null);
      }
    };

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [weatherRequestUrl]);

  const weatherToShow = useMemo(() => {
    if (!liveWeather) return destination.weather;

    return {
      temperature: Math.round(liveWeather.temperatureC),
      humidity: Math.round(liveWeather.humidity),
      windSpeed: Math.round(liveWeather.windSpeedKmh),
      condition: liveWeather.condition || destination.weather.condition,
    };
  }, [liveWeather, destination.weather]);

  return (
    <div>
      {/* Hero (parallax) */}
      <header className="tt-hero tt-hero--medium" style={heroStyle} aria-label={destination.name}>
        <div className="tt-hero-inner container mx-auto px-4">
          <motion.button
            type="button"
            onClick={() => {
              onBack();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="tt-dest-back"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft size={18} />
            <span>Back to Destinations</span>
          </motion.button>

          <div className="tt-dest-hero-grid">
            <div className="tt-hero-panel">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="tt-hero-kicker"
              >
                Explore highlights
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="tt-hero-title"
              >
                {destination.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="tt-hero-subtitle"
              >
                A quick overview to help you decide fast.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="tt-hero-actions"
              >
                <button type="button" className="tt-hero-btn" onClick={handleBookNow}>
                  Book your tour
                </button>
                <button
                  type="button"
                  className="tt-hero-btn tt-hero-btn--ghost"
                  onClick={scrollToHighlights}
                >
                  View locations
                </button>
              </motion.div>
            </div>

            <motion.aside
              className="tt-dest-weather"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              <p className="tt-dest-weather-title">Current conditions</p>

              <div className="tt-dest-weather-grid">
                <div className="tt-dest-metric">
                  <Cloud size={22} />
                  <div>
                    <p className="tt-dest-metric-label">Weather</p>
                    <p className="tt-dest-metric-value">{weatherToShow.condition}</p>
                  </div>
                </div>

                <div className="tt-dest-metric">
                  <span aria-hidden style={{ fontSize: 20, lineHeight: 1 }}>
                    🌡️
                  </span>
                  <div>
                    <p className="tt-dest-metric-label">Temperature</p>
                    <p className="tt-dest-metric-value">{weatherToShow.temperature}°C</p>
                  </div>
                </div>

                <div className="tt-dest-metric">
                  <Droplets size={22} />
                  <div>
                    <p className="tt-dest-metric-label">Humidity</p>
                    <p className="tt-dest-metric-value">{weatherToShow.humidity}%</p>
                  </div>
                </div>

                <div className="tt-dest-metric">
                  <Wind size={22} />
                  <div>
                    <p className="tt-dest-metric-label">Wind</p>
                    <p className="tt-dest-metric-value">{weatherToShow.windSpeed} km/h</p>
                  </div>
                </div>
              </div>

              <div className="tt-dest-divider" />

              <div className="tt-dest-weather-grid">
                <div className="tt-dest-metric">
                  <MapPin size={22} />
                  <div>
                    <p className="tt-dest-metric-label">Top Picks</p>
                    <p className="tt-dest-metric-value">Handpicked highlights</p>
                  </div>
                </div>

                <div className="tt-dest-metric">
                  <span aria-hidden style={{ fontSize: 20, lineHeight: 1 }}>
                    ✨
                  </span>
                  <div>
                    <p className="tt-dest-metric-label">Popular spots</p>
                    <p className="tt-dest-metric-value">{highlightsCount}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </header>

      {/* About + Plan */}
      <section className="tt-dest-section">
        <div className="container mx-auto px-4">
          <div className="tt-dest-wrap">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="tt-dest-about-grid"
            >
              <div className="tt-dest-card">
                <p className="tt-dest-kicker">
                  <MapPin size={20} color="#16a34a" />
                  About <small>{destination.name}</small>
                </p>

                <p className="tt-dest-text">{destination.fullDescription}</p>

                <div className="tt-dest-actions">
                  <button type="button" onClick={handleBookNow} className="tt-dest-btn primary">
                    <Calendar size={18} />
                    Book Your Tour
                  </button>

                  <button type="button" onClick={scrollToHighlights} className="tt-dest-btn ghost">
                    <MapPin size={18} />
                    View Locations
                  </button>
                </div>
              </div>

              <div className="tt-dest-card tt-dest-plan">
                <p className="tt-dest-plan-title">Plan at a glance</p>
                <p className="tt-dest-mini">Highlights included, {highlightsCount} must see locations.</p>

                <div className="tt-dest-plan-grid">
                  <div className="tt-dest-plan-item">
                    <strong>Current temperature</strong>
                    <span>{weatherToShow.temperature}°C</span>
                  </div>

                  <div className="tt-dest-plan-item">
                    <strong>Condition</strong>
                    <span>{weatherToShow.condition}</span>
                  </div>

                  <div className="tt-dest-plan-item">
                    <strong>Wind</strong>
                    <span>{weatherToShow.windSpeed} km/h</span>
                  </div>

                  <div className="tt-dest-plan-item">
                    <strong>Humidity</strong>
                    <span>{weatherToShow.humidity}%</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBookNow}
                  className="tt-dest-btn primary"
                  style={{ width: '100%' }}
                >
                  <Calendar size={18} />
                  Book this trip
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="tt-dest-section alt" id="tt-highlights">
        <div className="container mx-auto px-4">
          <div className="tt-dest-wrap">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <p className="tt-dest-kicker" style={{ marginBottom: '0.5rem' }}>
                <MapPin size={20} color="#16a34a" />
                Highlights <small>Famous locations to visit</small>
              </p>

              <p className="tt-dest-mini" style={{ marginTop: 0 }}>
                Explore the places people love most in {destination.name}. We keep this list tight so you get
                the best of the destination.
              </p>

              <div className="tt-dest-cards">
                {(destination.famousLocations ?? []).map((location, index) => (
                  <motion.article
                    key={`${location.name}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.06 * Math.min(index, 6) }}
                    className="tt-dest-location"
                  >
                    <div className="tt-dest-location-top">
                      <div className="tt-dest-location-badge" aria-hidden>
                        <MapPin size={18} color="#16a34a" />
                      </div>

                      <div>
                        <p className="tt-dest-location-name">{location.name}</p>
                        <p className="tt-dest-location-desc">{location.description}</p>
                      </div>
                    </div>

                    <p className="tt-dest-location-tip">
                      Tip, add this to your itinerary, it’s one of the top experiences here.
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ✅ CTA (THIS IS THE IMPORTANT FIX — separate section like before) */}
      <section className="tt-dest-cta">
        <div className="container mx-auto px-4">
          <div className="tt-dest-cta-inner">
            <motion.p
              className="tt-dest-cta-title"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Ready to explore {destination.name}?
            </motion.p>

            <motion.p
              className="tt-dest-cta-text"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 }}
            >
              Join us for an unforgettable journey, we’ll handle the planning, you’ll enjoy the views.
            </motion.p>

            <div className="tt-dest-cta-actions">
              <button type="button" onClick={handleBookNow} className="tt-dest-cta-btn">
                Book your adventure
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DestinationDetail;
