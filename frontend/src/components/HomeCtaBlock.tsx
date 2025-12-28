import { CalendarDays, CheckCircle2, Globe2, ArrowRight } from 'lucide-react';
import '../styles/home-cta-block.css';

type Props = {
  onExploreClick?: () => void; // Learn more
  onFeaturedClick?: () => void; // Scroll to featured
  onBookClick?: () => void; // Book a tour
  onTalkClick?: () => void; // Talk to us
  featuredSectionId?: string; // default: "featured-destinations"
};

export function HomeCtaBlock({
  onExploreClick,
  onFeaturedClick,
  onBookClick,
  onTalkClick,
  featuredSectionId = 'featured-destinations',
}: Props) {
  const scrollToFeatured = () => {
    if (onFeaturedClick) return onFeaturedClick();
    document.getElementById(featuredSectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="tt-cta-section" aria-label="Explore and Upcoming Tours">
      <div className="container mx-auto px-4">
        <div className="tt-cta-header">
          <h2 className="tt-cta-title">Ready for your next trip?</h2>
          <p className="tt-cta-subtitle">
            Pick a starting point, explore inspiration, or lock in an upcoming tour.
          </p>
        </div>

        <div className="tt-cta-grid">
          {/* Explore card */}
          <div className="tt-cta-card tt-cta-card--green">
            <div className="tt-cta-blob tt-cta-blob--tr" aria-hidden="true" />

            {/* Body grows, actions stay aligned at bottom */}
            <div className="tt-cta-body">
              <div className="tt-cta-cardHeader">
                <span className="tt-cta-iconPill tt-cta-iconPill--green" aria-hidden="true">
                  <Globe2 size={20} />
                </span>

                <div className="tt-cta-headings">
                  <h3 className="tt-cta-cardTitle">Explore the World</h3>
                  <p className="tt-cta-cardKicker">Ideas, destinations, and inspiration</p>
                </div>
              </div>

              <p className="tt-cta-text">
                Embark on a journey of discovery with Totally Travels, uncover hidden gems, embrace
                diverse cultures, and create lasting memories across Pakistan.
              </p>

              <ul className="tt-cta-list">
                <li>
                  <CheckCircle2 className="tt-cta-check" size={18} aria-hidden="true" />
                  Handpicked places worth the drive
                </li>
                <li>
                  <CheckCircle2 className="tt-cta-check" size={18} aria-hidden="true" />
                  Curated experiences (not cookie-cutter)
                </li>
                <li>
                  <CheckCircle2 className="tt-cta-check" size={18} aria-hidden="true" />
                  Clear guidance on what to do + when
                </li>
              </ul>
            </div>

            <div className="tt-cta-actions">
              <button
                type="button"
                className="tt-cta-btn tt-cta-btn--primary"
                onClick={onExploreClick}
              >
                <ArrowRight className="tt-cta-btnIcon" aria-hidden="true" />
                Learn More
              </button>

              <button
                type="button"
                className="tt-cta-btn tt-cta-btn--secondary"
                onClick={scrollToFeatured}
              >
                See Featured Destinations
              </button>
            </div>
          </div>

          {/* Upcoming card */}
          <div className="tt-cta-card tt-cta-card--gray">
            <div className="tt-cta-blob tt-cta-blob--bl" aria-hidden="true" />

            {/* Body grows, actions stay aligned at bottom */}
            <div className="tt-cta-body">
              <div className="tt-cta-cardHeader">
                <span className="tt-cta-iconPill tt-cta-iconPill--dark" aria-hidden="true">
                  <CalendarDays size={20} />
                </span>

                <div className="tt-cta-headings">
                  <h3 className="tt-cta-cardTitle">Upcoming Tours</h3>
                  <p className="tt-cta-cardKicker">Fixed dates, easy booking</p>
                </div>
              </div>

              <p className="tt-cta-text">
                Join our upcoming tours, secure your spot for an unforgettable escape. Limited
                seats, smooth planning, and guided coordination.
              </p>

              <ul className="tt-cta-list">
                <li>
                  <CheckCircle2 className="tt-cta-check" size={18} aria-hidden="true" />
                  Best for groups, families, and friends
                </li>
                <li>
                  <CheckCircle2 className="tt-cta-check" size={18} aria-hidden="true" />
                  Clear itinerary and dependable logistics
                </li>
                <li>
                  <CheckCircle2 className="tt-cta-check" size={18} aria-hidden="true" />
                  You book, we handle the rest
                </li>
              </ul>
            </div>

            <div className="tt-cta-actions">
              <button type="button" className="tt-cta-btn tt-cta-btn--primary" onClick={onBookClick}>
                <ArrowRight className="tt-cta-btnIcon" aria-hidden="true" />
                Book a Tour
              </button>

              <button type="button" className="tt-cta-btn tt-cta-btn--secondary" onClick={onTalkClick}>
                Talk to Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
