import { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Helmet } from 'react-helmet';
import { destinationsData } from './data/destinationsData';

import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import BookYourTour from './pages/BookYourTour';
import Contact from './pages/Contact';

export default function App() {
  /**
   * Lightweight hash-based routing.
   * - Fixes refresh resetting to Home.
   * - Enables browser back/forward navigation.
   * - Works on static hosting without server-side rewrites.
   *
   * Routes:
   *   #/                 -> home
   *   #/about            -> about
   *   #/destinations     -> destinations
   *   #/destinations/:id -> destination detail
   *   #/book             -> book
   *   #/contact          -> contact
   */
  const parseHashRoute = useCallback((hash: string) => {
    const raw = (hash || '').trim();

    // normalize empty hashes
    if (!raw || raw === '#' || raw === '#/' || raw === '#!/' || raw === '#!') {
      return { page: 'home', destinationId: null as string | null };
    }

    // strip leading # or #!
    const cleaned = raw.replace(/^#!?/, '');
    const path = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    const parts = path.split('/').filter(Boolean).map((p) => decodeURIComponent(p));

    const first = parts[0] || 'home';

    if (first === 'destinations' && parts[1]) {
      return { page: 'destination-detail', destinationId: parts[1] };
    }

    if (['home', 'about', 'destinations', 'book', 'contact'].includes(first)) {
      return { page: first, destinationId: null };
    }

    return { page: 'home', destinationId: null };
  }, []);

  const getInitialRoute = () => {
    if (typeof window === 'undefined') return { page: 'home', destinationId: null as string | null };
    return parseHashRoute(window.location.hash);
  };

  const initial = getInitialRoute();
  const [currentPage, setCurrentPage] = useState<string>(initial.page);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(
    initial.destinationId
  );

  // Enable smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Keep state in sync with the hash (supports refresh + back/forward)
  useEffect(() => {
    const syncFromHash = () => {
      const next = parseHashRoute(window.location.hash);
      setCurrentPage(next.page);
      setSelectedDestinationId(next.destinationId);
    };

    // If user lands on the site with no hash, set it once (without adding history)
    if (typeof window !== 'undefined' && (!window.location.hash || window.location.hash === '#')) {
      window.location.replace('#/');
    }

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [parseHashRoute]);

  const routeToHash = (page: string, destinationId?: string) => {
    if (page === 'destination-detail' && destinationId) {
      return `#/destinations/${encodeURIComponent(destinationId)}`;
    }
    if (page === 'home') return '#/';
    if (['about', 'destinations', 'book', 'contact'].includes(page)) return `#/${page}`;
    return '#/';
  };

  const handleNavigate = (page: string, destinationId?: string) => {
    const nextHash = routeToHash(page, destinationId);
    if (typeof window === 'undefined') return;

    // Setting hash automatically creates a history entry, so back/forward works.
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      // same route, still ensure state is correct
      const next = parseHashRoute(nextHash);
      setCurrentPage(next.page);
      setSelectedDestinationId(next.destinationId);
    }
  };

  const handleBackToDestinations = () => {
    handleNavigate('destinations');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'destinations':
        return <Destinations onNavigate={handleNavigate} />;
      case 'destination-detail':
        const destination = destinationsData.find((d) => d.id === selectedDestinationId);
        if (destination) {
          return (
            <DestinationDetail
              destination={destination}
              onNavigate={handleNavigate}
              onBack={handleBackToDestinations}
            />
          );
        }
        return <Destinations onNavigate={handleNavigate} />;
      case 'book':
        return <BookYourTour />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Totally Travels – Travel With Us!</title>
        <meta
          name="description"
          content="Explore curated travel experiences with Totally Travels. Discover hidden gems, immersive culture, and unforgettable journeys."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation
          // highlight “Destinations” while on a destination detail page
          currentPage={currentPage === 'destination-detail' ? 'destinations' : currentPage}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 pt-20">{renderPage()}</main>
        <Footer />
      </div>
    </>
  );
}
