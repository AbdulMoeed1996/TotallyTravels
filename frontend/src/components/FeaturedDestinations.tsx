import { ArrowRight } from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import '../styles/featured-destinations.css';

type Props = {
  sectionId?: string; // default: "featured-destinations"
  onDestinationClick?: (destinationId: string) => void;
};

type FeaturedConfig = {
  id: string;
  chips: string[];
};

const FEATURED: FeaturedConfig[] = [
  { id: 'hunza-valley', chips: ['Gilgit-Baltistan', 'Culture', 'Views'] },
  { id: 'fairy-meadows', chips: ['Nanga Parbat', 'Meadows', 'Adventure'] },
  { id: 'neelum-valley', chips: ['AJK', 'Rivers', 'Nature'] },
  { id: 'skardu-valley', chips: ['Baltistan', 'Mountains', 'Lakes'] },
  { id: 'lahore-heritage', chips: ['Heritage', 'Food', 'City'] },
  { id: 'kaghan-naran', chips: ['Kaghan', 'Valley', 'Summer'] },
];

export function FeaturedDestinations({
  sectionId = 'featured-destinations',
  onDestinationClick,
}: Props) {
  const featuredCards = FEATURED.map((cfg) => {
    const d = destinationsData.find((x) => x.id === cfg.id);
    if (!d) return null;

    return {
      id: d.id,
      name: d.name,
      image: d.cardImage,
      description: d.shortDescription,
      chips: cfg.chips,
    };
  }).filter(Boolean) as Array<{
    id: string;
    name: string;
    image: string;
    description: string;
    chips: string[];
  }>;

  return (
    <section id={sectionId} className="tt-featured-section" aria-label="Featured Destinations">
      <div className="container mx-auto px-4">
        <div className="tt-featured-header">
          <h2 className="tt-featured-title">Featured Destinations</h2>
          <p className="tt-featured-subtitle">
            Six handpicked places in Pakistan, curated for comfort, scenery, and memorable experiences.
          </p>
        </div>

        <div className="tt-featured-grid">
          {featuredCards.map((d) => (
            <article key={d.id} className="tt-featured-card">
              <div className="tt-featured-imageWrap">
                <img className="tt-featured-image" src={d.image} alt={d.name} loading="lazy" />
              </div>

              <div className="tt-featured-body">
                <h3 className="tt-featured-cardTitle">{d.name}</h3>
                <p className="tt-featured-text">{d.description}</p>

                <div className="tt-featured-chips">
                  {d.chips.map((c) => (
                    <span key={c} className="tt-featured-chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="tt-featured-actions">
                <button
                  type="button"
                  className="tt-featured-btn"
                  onClick={() => onDestinationClick?.(d.id)}
                >
                  <ArrowRight className="tt-featured-btnIcon" aria-hidden="true" />
                  Learn More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
