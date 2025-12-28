import { MapPin, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import '../../styles/about.css';

const highlights = [
  {
    icon: Compass,
    title: 'Personalized itineraries',
    desc: 'Trips shaped around your pace, preferences, and budget — not one-size-fits-all packages.',
  },
  {
    icon: ShieldCheck,
    title: 'Comfort and peace of mind',
    desc: 'Clear planning, reliable guidance, and practical recommendations for a smoother journey.',
  },
  {
    icon: Sparkles,
    title: 'Authentic experiences',
    desc: 'Local culture, scenic routes, and hidden-gem moments that feel genuinely special.',
  },
];

const chips = ['Hunza', 'Skardu', 'Fairy Meadows', 'Neelum Valley', 'Lahore', 'Naran'];

export function AboutIntro() {
  return (
    <section className="tt-about-intro">
      <div className="tt-about-glow tt-about-glow--tr" />
      <div className="tt-about-glow tt-about-glow--bl" />

      <div className="container mx-auto px-4">
        <div className="tt-about-wrap">
          <div className="tt-about-intro-grid">
            {/* Left */}
            <div>
              <div className="tt-about-pill">
                <MapPin className="tt-about-pillIcon" aria-hidden="true" />
                <span>Based in Lahore, Pakistan</span>
              </div>

              <h2 className="tt-about-headline">Travel that feels personal, not packaged.</h2>

              <p className="tt-about-paragraph">
                Welcome to Totally Travels, your trusted partner in creating extraordinary journeys. We plan
                experiences that highlight Pakistan’s natural beauty and cultural richness, from mountain escapes
                to city discoveries.
              </p>

              <p className="tt-about-paragraph">
                Whether you’re after adventure, calm valleys, or a cultural deep dive, we help you build a trip
                that feels seamless, safe, and memorable.
              </p>

              <div className="tt-about-chips">
                {chips.map((t) => (
                  <span key={t} className="tt-about-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="tt-about-highlights">
              {highlights.map(({ icon: Icon, title, desc }) => (
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

              <div className="tt-about-mission">
                <p className="tt-about-missionKicker">Our mission</p>
                <p className="tt-about-missionText">
                  To make exploring Pakistan and beyond feel effortless, with thoughtful planning, beautiful routes,
                  and unforgettable moments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIntro;
