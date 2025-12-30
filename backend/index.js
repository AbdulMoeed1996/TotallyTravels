require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch'); // v2

const app = express();

/* ------------------- CORS ------------------- */
const defaultAllowedOrigins = [
  'https://totallytravels.com',
  'https://www.totallytravels.com',
];

const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const allowedProdOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);

    // Allow local dev
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return cb(null, true);
    }

    // Allow production domains
    if (allowedProdOrigins.has(origin)) return cb(null, true);

    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

/* ------------------- Email ------------------- */
const MAIL_USER = process.env.GMAIL_USER;
const MAIL_PASS = process.env.GMAIL_PASS;
const CONTACT_TO = process.env.CONTACT_TO || MAIL_USER;

function emailIsConfigured() {
  return Boolean(MAIL_USER && MAIL_PASS && CONTACT_TO);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: MAIL_USER, pass: MAIL_PASS },
});

/* ------------------- Helpers ------------------- */
function toCleanString(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v.trim();
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return '';
}

/**
 * Pretty format for date-only values:
 * "2026-01-05" -> "05 Jan 2026"
 * Uses UTC to avoid timezone shifting the date.
 */
function formatPrettyDate(dateStr) {
  const s = toCleanString(dateStr);
  if (!s) return '';

  // Match YYYY-MM-DD
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const dt = new Date(`${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}T00:00:00Z`);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(dt);
  }

  return s;
}

/**
 * Creates a nice "Preferred Dates" string from:
 * - dates: "2026-01-01 to 2026-01-05"
 * - dates: { startDate, endDate }
 * - startDate/endDate on body
 * - dates: ["2026-01-01","2026-01-05"]
 */
function formatPreferredDates(body) {
  const direct = body?.dates;

  // 1) dates as string
  if (typeof direct === 'string') {
    const raw = direct.trim();
    const matches = raw.match(/\d{4}-\d{2}-\d{2}/g);
    if (matches && matches.length >= 2) {
      const start = formatPrettyDate(matches[0]);
      const end = formatPrettyDate(matches[1]);
      if (start && end) return `${start} to ${end}`;
      if (start) return start;
      if (end) return end;
    }
    if (matches && matches.length === 1) {
      const one = formatPrettyDate(matches[0]);
      return one || raw;
    }
    return raw;
  }

  // 2) dates as object
  if (direct && typeof direct === 'object' && !Array.isArray(direct)) {
    const s = toCleanString(direct.startDate || direct.start || body?.startDate);
    const e = toCleanString(direct.endDate || direct.end || body?.endDate);

    const start = formatPrettyDate(s);
    const end = formatPrettyDate(e);

    if (start && end) return `${start} to ${end}`;
    if (start) return start;
    if (end) return end;
  }

  // 3) dates as array
  if (Array.isArray(direct)) {
    const parts = direct.map((x) => toCleanString(x)).filter(Boolean);
    const start = formatPrettyDate(parts[0]);
    const end = formatPrettyDate(parts[1]);

    if (start && end) return `${start} to ${end}`;
    if (start) return start;
  }

  // 4) fallback to top-level startDate/endDate
  const startDate = formatPrettyDate(body?.startDate);
  const endDate = formatPrettyDate(body?.endDate);

  if (startDate && endDate) return `${startDate} to ${endDate}`;
  if (startDate) return startDate;
  if (endDate) return endDate;

  return '';
}

function normalizeDestinations(body) {
  const d1 = body?.destinations;
  if (typeof d1 === 'string') return d1.trim();
  if (Array.isArray(d1)) return d1.map((x) => toCleanString(x)).filter(Boolean).join(', ');

  const d2 = body?.destination;
  if (typeof d2 === 'string') return d2.trim();
  if (Array.isArray(d2)) return d2.map((x) => toCleanString(x)).filter(Boolean).join(', ');

  return '';
}

function normalizeTravelers(body) {
  const t = body?.travelers ?? body?.numberOfPeople ?? body?.travellers ?? body?.people;
  const n = Number(t);
  if (Number.isFinite(n) && n > 0) return n;
  return '';
}

const VALID_TRANSPORT_OPTIONS = ['Sedan', 'Crossover', 'SUV', 'Coaster'];
const VALID_ACCOMMODATION_TYPES = ['Standard', 'Deluxe', 'Luxury'];

function normalizeTransportOption(body) {
  const t = body?.transportOption ?? body?.transportType ?? body?.transport;
  return toCleanString(t);
}

function normalizeAccommodationType(body) {
  const a = body?.accommodationType ?? body?.accommodation ?? body?.hotelType;
  return toCleanString(a);
}

function matchAllowedCaseInsensitive(val, allowed) {
  const v = toCleanString(val);
  if (!v) return '';
  const hit = allowed.find((x) => x.toLowerCase() === v.toLowerCase());
  return hit || '';
}

/* ------------------- Health ------------------- */
app.get('/', (_req, res) => {
  res.send('Totally Travels backend is running');
});

/* ------------------- CONTACT ------------------- */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, message',
      });
    }

    if (!emailIsConfigured()) {
      return res.status(500).json({
        success: false,
        error:
          'Email is not configured on the server. Set GMAIL_USER, GMAIL_PASS (and optionally CONTACT_TO).',
      });
    }

    await transporter.sendMail({
      from: `"Totally Travels Website" <${MAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New Contact Form Enquiry from ${name}`,
      text: `
You have received a new contact form enquiry from the website.

Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/contact:', err);
    return res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
});

/* ------------------- BOOK ------------------- */
app.post('/api/book', async (req, res) => {
  try {
    const body = req.body || {};

    const name = toCleanString(body.name);
    const email = toCleanString(body.email);
    const phone = toCleanString(body.phone);

    const preferredDates = formatPreferredDates(body);
    const destinationsText = normalizeDestinations(body);
    const travelers = normalizeTravelers(body);

    const transportOptionRaw = normalizeTransportOption(body);
    const accommodationTypeRaw = normalizeAccommodationType(body);

    const missing = [];
    if (!name) missing.push('name');
    if (!email) missing.push('email');
    if (!phone) missing.push('phone');
    if (!preferredDates) missing.push('dates');
    if (!destinationsText) missing.push('destinations');
    if (!travelers) missing.push('travelers');
    if (!transportOptionRaw) missing.push('transportOption');
    if (!accommodationTypeRaw) missing.push('accommodationType');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(', ')}`,
      });
    }

    const transportOption = matchAllowedCaseInsensitive(
      transportOptionRaw,
      VALID_TRANSPORT_OPTIONS
    );
    if (!transportOption) {
      return res.status(400).json({
        success: false,
        error: `Invalid transport option. Allowed: ${VALID_TRANSPORT_OPTIONS.join(', ')}`,
      });
    }

    const accommodationType = matchAllowedCaseInsensitive(
      accommodationTypeRaw,
      VALID_ACCOMMODATION_TYPES
    );
    if (!accommodationType) {
      return res.status(400).json({
        success: false,
        error: `Invalid accommodation type. Allowed: ${VALID_ACCOMMODATION_TYPES.join(', ')}`,
      });
    }

    if (!emailIsConfigured()) {
      return res.status(500).json({
        success: false,
        error:
          'Email is not configured on the server. Set GMAIL_USER, GMAIL_PASS (and optionally CONTACT_TO).',
      });
    }

    const bookingMessage = toCleanString(body.message) || '(No additional message)';

    await transporter.sendMail({
      from: `"Totally Travels Website" <${MAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New Tour Booking Request from ${name}`,
      text: `
New booking request:

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Dates: ${preferredDates}
Destinations: ${destinationsText}
Number of Travelers: ${travelers}
Transport Type: ${transportOption}
Accommodation Type: ${accommodationType}

Message:
${bookingMessage}
      `.trim(),
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/book:', err);
    return res.status(500).json({ success: false, error: 'Failed to send booking.' });
  }
});

/* ------------------- WEATHER ------------------- */
const CITY_COORDS = {
  lahore: { latitude: 31.5204, longitude: 74.3587, label: 'Lahore, Pakistan' },
  hunza: { latitude: 36.3167, longitude: 74.65, label: 'Hunza, Pakistan' },
  skardu: { latitude: 35.2976, longitude: 75.6333, label: 'Skardu, Pakistan' },
  swat: { latitude: 35.222, longitude: 72.4258, label: 'Swat, Pakistan' },
  neelum: { latitude: 34.5869, longitude: 73.907, label: 'Neelum Valley, Pakistan' },
};

function weatherCodeToText(code) {
  switch (Number(code)) {
    case 0:
      return 'Clear sky';
    case 1:
      return 'Mainly clear';
    case 2:
      return 'Partly cloudy';
    case 3:
      return 'Overcast';
    case 45:
      return 'Fog';
    case 48:
      return 'Rime fog';
    case 51:
      return 'Light drizzle';
    case 53:
      return 'Moderate drizzle';
    case 55:
      return 'Dense drizzle';
    case 56:
      return 'Light freezing drizzle';
    case 57:
      return 'Dense freezing drizzle';
    case 61:
      return 'Light rain';
    case 63:
      return 'Moderate rain';
    case 65:
      return 'Heavy rain';
    case 66:
      return 'Light freezing rain';
    case 67:
      return 'Heavy freezing rain';
    case 71:
      return 'Light snowfall';
    case 73:
      return 'Moderate snowfall';
    case 75:
      return 'Heavy snowfall';
    case 77:
      return 'Snow grains';
    case 80:
      return 'Light rain showers';
    case 81:
      return 'Moderate rain showers';
    case 82:
      return 'Violent rain showers';
    case 85:
      return 'Light snow showers';
    case 86:
      return 'Heavy snow showers';
    case 95:
      return 'Thunderstorm';
    case 96:
      return 'Thunderstorm with hail';
    case 99:
      return 'Thunderstorm with heavy hail';
    default:
      return 'Unknown';
  }
}

const geocodeCache = new Map();
const weatherCache = new Map();
const GEOCODE_TTL_MS = 24 * 60 * 60 * 1000;
const WEATHER_TTL_MS = 5 * 60 * 1000;

function cacheGet(map, key, ttlMs) {
  const hit = map.get(key);
  if (!hit) return null;

  if (Date.now() - hit.ts > ttlMs) {
    map.delete(key);
    return null;
  }

  return hit.value;
}

function cacheSet(map, key, value) {
  map.set(key, { ts: Date.now(), value });
}

async function geocodePlace(placeName) {
  const cached = cacheGet(geocodeCache, placeName, GEOCODE_TTL_MS);
  if (cached) return cached;

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    placeName
  )}&count=5&language=en&format=json`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Geocoding failed with status ${resp.status}`);

  const data = await resp.json();
  const results = Array.isArray(data?.results) ? data.results : [];

  if (results.length === 0) {
    cacheSet(geocodeCache, placeName, null);
    return null;
  }

  const pkHit =
    results.find((r) => String(r.country_code || '').toUpperCase() === 'PK') ||
    results.find((r) => String(r.country || '').toLowerCase() === 'pakistan');

  const hit = pkHit || results[0];

  const labelParts = [hit.name];
  if (hit.admin1) labelParts.push(hit.admin1);
  if (hit.country) labelParts.push(hit.country);

  const value = {
    latitude: hit.latitude,
    longitude: hit.longitude,
    label: labelParts.join(', '),
  };

  cacheSet(geocodeCache, placeName, value);
  return value;
}

async function fetchCurrentWeather(latitude, longitude) {
  const key = `${latitude},${longitude}`;
  const cached = cacheGet(weatherCache, key, WEATHER_TTL_MS);
  if (cached) return cached;

  const apiUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
    `&timezone=auto`;

  const weatherResp = await fetch(apiUrl);
  if (!weatherResp.ok) throw new Error(`Weather fetch failed with status ${weatherResp.status}`);

  const weatherData = await weatherResp.json();
  const current = weatherData?.current;
  if (!current) throw new Error('Weather data missing current conditions');

  cacheSet(weatherCache, key, current);
  return current;
}

app.get('/api/weather', async (req, res) => {
  try {
    const city = (req.query.city || '').toString().trim().toLowerCase();
    const q = (req.query.q || '').toString().trim();

    const latRaw = req.query.lat ?? null;
    const lonRaw = req.query.lon ?? req.query.lng ?? null;

    const lat = latRaw !== null ? Number(latRaw) : null;
    const lon = lonRaw !== null ? Number(lonRaw) : null;

    let latitude;
    let longitude;
    let locationLabel;

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      latitude = lat;
      longitude = lon;
      locationLabel = q || city || 'Custom location';
    } else if (q) {
      const geo = await geocodePlace(q);
      if (!geo) {
        return res.status(404).json({ success: false, error: `Location not found for "${q}"` });
      }
      latitude = geo.latitude;
      longitude = geo.longitude;
      locationLabel = geo.label;
    } else if (city && CITY_COORDS[city]) {
      latitude = CITY_COORDS[city].latitude;
      longitude = CITY_COORDS[city].longitude;
      locationLabel = CITY_COORDS[city].label;
    } else {
      return res.status(400).json({
        success: false,
        error: 'Provide ?q=<place name> OR one of the supported ?city= values OR ?lat=&lon=',
      });
    }

    const current = await fetchCurrentWeather(latitude, longitude);

    return res.json({
      success: true,
      query: q || city,
      location: locationLabel,
      latitude,
      longitude,
      temperatureC: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeedKmh: current.wind_speed_10m,
      weatherCode: current.weather_code,
      condition: weatherCodeToText(current.weather_code),
      time: current.time,
    });
  } catch (err) {
    console.error('Error in /api/weather:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch weather.' });
  }
});

/* ------------------- CORS error handler ------------------- */
app.use((err, _req, res, next) => {
  if (err && typeof err.message === 'string' && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({ success: false, error: err.message });
  }
  return next(err);
});

module.exports = app;
