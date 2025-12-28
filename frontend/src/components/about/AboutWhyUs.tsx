import { HeartHandshake, Mountain, Clock3 } from 'lucide-react';
import '../../styles/about.css';

const items = [
  {
    icon: Mountain,
    title: 'Local-first routes',
    desc: 'We focus on experiences that match the terrain, seasons, and travel reality, so your trip feels smoother.',
  },
  {
    icon: Clock3,
    title: 'Planning that respects your time',
    desc: 'Clear itineraries, sensible pacing, and practical travel decisions that reduce last-minute stress.',
  },
  {
    icon: HeartHandshake,
    title: 'People who genuinely care',
    desc: 'Friendly guidance, transparent communication, and support that feels human, not transactional.',
  },
];

export function AboutWhyUs() {
  return (
    <section className="tt-about-section">
      <div className="container mx-auto px-4">
        <div className="tt-about-header">
          <h2 className="tt-about-title">Why travel with Totally Travels?</h2>
          <p className="tt-about-subtitle">
            Thoughtful planning, beautiful destinations, and a journey that feels easy from start to finish.
          </p>
        </div>

        <div className="tt-about-grid3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="tt-about-card">
              <div className="tt-about-cardHeader">
                <div className="tt-about-iconPill">
                  <Icon className="tt-about-icon" aria-hidden="true" />
                </div>
                <h3 className="tt-about-cardTitle">{title}</h3>
              </div>
              <p className="tt-about-cardText">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutWhyUs;
