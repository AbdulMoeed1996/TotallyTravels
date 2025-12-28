import { useMemo, useRef, useState } from 'react';
import {
  Building2,
  SlidersHorizontal,
  Landmark,
  MountainSnow,
  CheckCircle2,
  ArrowRight,
  MessageSquareText,
} from 'lucide-react';

import '../styles/what-we-offer.css';

type OfferKey = 'corporate' | 'custom' | 'religious' | 'adventure';

interface WhatWeOfferProps {
  onBookClick?: () => void;
  onTalkClick?: () => void;
}

export function WhatWeOffer({ onBookClick, onTalkClick }: WhatWeOfferProps) {
  const offers = useMemo(
    () =>
      [
        {
          key: 'corporate' as const,
          label: 'Corporate trips',
          Icon: Building2,
          bestFor: 'Best for teams',
          headline: 'Corporate Offsites & Team Retreats',
          description:
            'Plan seamless corporate getaways, offsites, and team-building retreats anywhere in Pakistan. From meeting-friendly hotels and transport to curated activities, we handle logistics so your team can focus on connection, creativity, and strategy.',
          bullets: [
            'Hotels, transport, meals, and scheduling handled end-to-end',
            'Team-building activities curated for your group',
            'Reliable coordination so your team can actually relax',
          ],
          tags: ['Logistics', 'Team Activities', 'Comfort Stays', 'Transport'],
          tip: 'Tip: You can request a fully custom plan in “Customized trips”.',
          image:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'Team working together in a meeting room',
        },
        {
          key: 'custom' as const,
          label: 'Customized trips',
          Icon: SlidersHorizontal,
          bestFor: 'Best for flexibility',
          headline: 'Built Around Your Plan',
          description:
            'Tell us your dates, budget, and vibe, and we will build a plan that fits. Choose destinations, pace, hotels, and add-ons, we will bring it together end-to-end.',
          bullets: [
            'Flexible itineraries, you choose the pace',
            'Hotel and transport options across budgets',
            'Add-ons like guides, photography, and experiences',
          ],
          tags: ['Custom Itinerary', 'Budget Options', 'Add-ons', 'Support'],
          tip: 'Tip: Share your budget range, we will optimize the best fit.',
          image:
            'https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'Person planning a trip on a map with a notebook',
        },
        {
          key: 'religious' as const,
          label: 'Religious trips',
          Icon: Landmark,
          bestFor: 'Best for groups',
          headline: 'Meaningful, Well-Managed Journeys',
          description:
            'We plan respectful religious travel with careful scheduling, comfortable stays, and reliable transport. Ideal for families and group travel with clear coordination throughout.',
          bullets: [
            'Group-friendly planning and transport',
            'Comfortable stays, meal planning, and timelines',
            'Clear coordination from start to finish',
          ],
          tags: ['Group Travel', 'Scheduling', 'Comfort Stays', 'Coordination'],
          tip: 'Tip: Tell us group size and preferred travel dates up front.',
          image:
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'Scenic landscape with a peaceful atmosphere',
        },
        {
          key: 'adventure' as const,
          label: 'Adventure trips',
          Icon: MountainSnow,
          bestFor: 'Best for thrill-seekers',
          headline: 'High-Energy, High-Scenery',
          description:
            'From hikes to jeep tracks, we plan adventure trips with smart routing, safe transport, and comfort stops. You get the thrill, we handle the logistics.',
          bullets: [
            'Adventure-forward itinerary design',
            'Route planning with safe transport options',
            'Comfort stops so the trip stays enjoyable',
          ],
          tags: ['Hiking', 'Jeep Tours', 'Route Planning', 'Safety'],
          tip: 'Tip: Let us know fitness level so we match activities properly.',
          image:
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
          imageAlt: 'Mountains and a scenic hiking trail',
        },
      ] as const,
    [],
  );

  const [active, setActive] = useState<OfferKey>('corporate');
  const activeOffer = offers.find((o) => o.key === active) ?? offers[0];

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (nextIndex: number) => {
    const el = tabRefs.current[nextIndex];
    if (el) el.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    // Arrow keys + Home/End: common ARIA Tabs keyboard pattern.
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % offers.length;
      setActive(offers[next].key);
      moveFocus(next);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + offers.length) % offers.length;
      setActive(offers[prev].key);
      moveFocus(prev);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setActive(offers[0].key);
      moveFocus(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      const last = offers.length - 1;
      setActive(offers[last].key);
      moveFocus(last);
    }
  };

  return (
    <section className="offer-section" aria-label="What we offer">
      <div className="container mx-auto px-4">
        <div className="offer-header">
          <h2 className="offer-title">What we offer</h2>
          <p className="offer-subtitle">
            Choose the type of journey that fits you best, and we will handle the rest.
          </p>
        </div>

        <div className="offer-tabs" role="tablist" aria-label="Trip types">
          {offers.map((o, idx) => {
            const isActive = o.key === active;
            const tabId = `offer-tab-${o.key}`;
            const panelId = `offer-panel-${o.key}`;
            const Icon = o.Icon;

            return (
              <button
                key={o.key}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                className={`offer-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => setActive(o.key)}
                onKeyDown={(e) => onTabKeyDown(e, idx)}
              >
                <Icon className="offer-tab-icon" aria-hidden="true" />
                <span className="offer-tab-label">{o.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`offer-panel-${activeOffer.key}`}
          role="tabpanel"
          aria-labelledby={`offer-tab-${activeOffer.key}`}
          className="offer-panel"
        >
          <div className="offer-layout">
            <div className="offer-card">
              <div className="offer-card-top">
                <div className="offer-category">
                  <activeOffer.Icon className="offer-category-icon" aria-hidden="true" />
                  <span>{activeOffer.label}</span>
                </div>
                <h3 className="offer-headline">{activeOffer.headline}</h3>
                <p className="offer-description">{activeOffer.description}</p>
              </div>

              <ul className="offer-bullets">
                {activeOffer.bullets.map((b) => (
                  <li key={b} className="offer-bullet">
                    <CheckCircle2 className="offer-bullet-icon" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="offer-tags" aria-label="Highlights">
                {activeOffer.tags.map((t) => (
                  <span key={t} className="offer-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="offer-actions">
                <button type="button" className="offer-btn offer-btn-primary" onClick={onBookClick}>
                  <ArrowRight className="offer-btn-icon" aria-hidden="true" />
                  Book this trip
                </button>

                <button
                  type="button"
                  className="offer-btn offer-btn-secondary"
                  onClick={onTalkClick}
                >
                  <MessageSquareText className="offer-btn-icon" aria-hidden="true" />
                  Talk to us
                </button>

                <p className="offer-tip">{activeOffer.tip}</p>
              </div>
            </div>

            <div className="offer-imageWrap">
              <div className="offer-badge">{activeOffer.bestFor}</div>
              <img className="offer-image" src={activeOffer.image} alt={activeOffer.imageAlt} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
