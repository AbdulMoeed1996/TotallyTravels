import { Hero } from '../components/Hero';
import { DestinationCard } from '../components/DestinationCard';
import { destinationsData } from '../data/destinationsData';

interface DestinationsProps {
  onNavigate: (page: string, destinationId?: string) => void;
}

export function Destinations({ onNavigate }: DestinationsProps) {
  const handleLearnMore = (destinationId: string) => {
    onNavigate('destination-detail', destinationId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        backgroundImage="/images/destinations-hero.jpg"
        title="Our Destinations"
        subtitle="Discover breathtaking locations and create unforgettable memories"
        height="full"
      />

      {/* Destinations Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* ✅ Premium heading (inline styles so it WILL change) */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.2vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#0f172a',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Explore Our Curated{' '}
              <span style={{ color: '#16a34a' }}>Destinations</span>
            </h2>

            <p
              style={{
                margin: '14px auto 0',
                maxWidth: '780px',
                fontSize: 'clamp(14px, 1.2vw, 18px)',
                lineHeight: 1.7,
                color: '#64748b',
              }}
            >
              From towering peaks to cultural treasures, we offer journeys that inspire and transform.
            </p>

            <div
              style={{
                height: '4px',
                width: '88px',
                background: '#16a34a',
                borderRadius: '999px',
                margin: '22px auto 0',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {destinationsData.map((destination) => (
              <DestinationCard
                key={destination.id}
                image={destination.cardImage}
                title={destination.name}
                description={destination.shortDescription}
                buttonText="Learn More"
                onButtonClick={() => handleLearnMore(destination.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Destinations;
