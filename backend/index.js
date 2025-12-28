/**
 * Vercel-ready Express backend (serverless)
 *
 * - Exports the Express app (no app.listen here)
 * - Keeps routes exactly as your frontend expects: /api/contact, /api/book, /api/weather
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch'); // v2

const app = express();

/* ------------------- CORS (dev + prod) ------------------- */
const defaultAllowedOrigins = [
  'https://totallytravels.com',
  'https://www.totallytravels.com',
];

// Optional: set ALLOWED_ORIGINS in Vercel (comma-separated)
// Example: https://totallytravels.com,https://www.totallytravels.com,https://yourcpanel-temporary-url.com
const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const allowedProdOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);

const corsOptions = {
  origin: (origin, cb) => {
    // Allow server-to-server, curl, postman, etc.
    if (!origin) return cb(null, true);

    // Allow any localhost port (Vite changes ports)
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return cb(null, true);
    }

    // Allow configured production domains
    if (allowedProdOrigins.has(origin)) return cb(null, true);

    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

/* ------------------- Email (Nodemailer / Gmail SMTP) ------------------- */
const MAIL_USER = process.env.GMAIL_USER;
const MAIL_PASS = process.env.GMAIL_PASS;

// Where enquiries/booking requests should be delivered.
// Defaults to the authenticated Gmail address.
const CONTACT_TO = process.env.CONTACT_TO || MAIL_USER;

function emailIsConfigured() {
  return Boolean(MAIL_USER && MAIL_PASS && CONTACT_TO);
}

// Vercel blocks outbound SMTP on port 25, but other ports are generally fine.
// If SMTP ever becomes unreliable, switch to an email API provider instead. :contentReference[oaicite:1]{index=1}
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

/* ------------------- Health check ------------------- */
app.get('/', (_req, res) => {
  res.send('Totally Travels backend is running');
});

/* ------------------- CONTACT FORM ------------------- */
// Expects: { name, email, message }
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
        error: 'Email is not configured on the server. Set GMAIL_USER, GMAIL_PASS (and optionally CONTACT_TO).',
      });
    }

    const mailOptions = {
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
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/contact:', err);
    return res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
});

/* ------------------- BOOK TOUR FORM ------------------- */
// Expects: { name, email, phone, dates, destinations, travelers, message }
app.post('/api/book', async (req, res) => {
  try {
    const { name, email, phone, dates, destinations, travelers, message } = req.body || {};

    if (!name || !email || !phone || !dates || !destinations || !travelers) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone, dates, destinations, travelers',
      });
    }

    if (!emailIsConfigured()) {
      return res.status(500).json({
        success: false,
        error: 'Email is not configured on the server. Set GMAIL_USER, GMAIL_PASS (and optionally CONTACT_TO).',
      });
    }

    const destinationText = Array.isArray(destinations)
      ? destinations.join(', ')
      : String(destinations);

    const mailOptions = {
      from: `"Totally Travels Website" <${MAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New Tour Booking Request from ${name}`,
      text: `
New booking request:

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Dates: ${dates}
Destinations: ${destinationText}
Number of Travelers: ${travelers}

Message:
${message || '(No additional message)'}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/book:', err);
    return res.status(500).json({ success: false, error: 'Failed to send booking.' });
  }
});

/* ------------------- WEATHER API ------------------- */
/**
 * Supported:
 * - GET /api/weather?city=lahore
 * - GET /api/weather?q=Fairy%20Meadows,%20Pakistan
 * - GET /api/weather?lat=35.2976&lon=75.6333
 */

const CITY_COORDS = {
  lahore: { latitude: 31.5204, longitude: 74.3587, label: 'Lahore, Pakistan' },
  hunza: { latitude: 36.3167, longitude: 74.65, label: 'Hunza, Pakistan' },
  skardu: { latitude: 35.2976, longitude: 75.6333, label: 'Skardu, Pakistan' },
  swat: { latitude: 35.222, longitude: 72.4258, label: 'Swat, Pakistan' },
  neelum: { latitude: 34.5869, longitude: 73.907, label: 'Neelum Valley, Pakistan' },
};

function weatherCodeToText(code) {
  switch (Number(code)) {
    case 0: return 'Clear sky';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: return 'Fog';
    case 48: return 'Rime fog';
    case 51: return 'Light drizzle';
    case 53: return 'Moderate drizzle';
    case 55: return 'Dense drizzle';
    case 56: return 'Light freezing drizzle';
    case 57: return 'Dense freezing drizzle';
    case 61: return 'Light rain';
    case 63: return 'Moderate rain';
    case 65: return 'Heavy rain';
    case 66: return 'Light freezing rain';
    case 67: return 'Heavy freezing rain';
    case 71: return 'Light snowfall';
    case 73: return 'Moderate snowfall';
    case 75: return 'Heavy snowfall';
    case 77: return 'Snow grains';
    case 80: return 'Light rain showers';
    case 81: return 'Moderate rain showers';
    case 82: return 'Violent rain showers';
    case 85: return 'Light snow showers';
    case 86: return 'Heavy snow showers';
    case 95: return 'Thunderstorm';
    case 96: return 'Thunderstorm with hail';
    case 99: return 'Thunderstorm with heavy hail';
    default: return 'Unknown';
  }
}

/* Simple in-memory caches (works per-serverless-instance) */
const geocodeCache = new Map(); // key: q -> { ts, value }
const weatherCache = new Map(); // key: "lat,lon" -> { ts, value }
const GEOCODE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const WEATHER_TTL_MS = 5 * 60 * 1000; // 5 min

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

  // Prefer Pakistan results if present
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

// IMPORTANT: export the app for Vercel
module.exports = app;
