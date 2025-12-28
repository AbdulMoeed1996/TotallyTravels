import { Eye, Leaf, BadgeCheck } from 'lucide-react';
import '../../styles/about.css';

export function AboutValues() {
  return (
    <section className="tt-about-section tt-about-section--alt">
      <div className="container mx-auto px-4">
        <div className="tt-about-header">
          <h2 className="tt-about-title">What we stand for</h2>
          <p className="tt-about-subtitle">
            Authentic, respectful, and genuinely enjoyable travel, the kind we would want for ourselves.
          </p>
        </div>

        <div className="tt-about-grid3">
          <div className="tt-about-card">
            <div className="tt-about-cardHeader">
              <div className="tt-about-iconPill">
                <Eye className="tt-about-icon" aria-hidden="true" />
              </div>
              <h3 className="tt-about-cardTitle">Our Vision</h3>
            </div>
            <p className="tt-about-cardText">
              To be a leading travel partner that connects people with authentic and unforgettable experiences
              across Pakistan and beyond.
            </p>
          </div>

          <div className="tt-about-card">
            <div className="tt-about-cardHeader">
              <div className="tt-about-iconPill">
                <Leaf className="tt-about-icon" aria-hidden="true" />
              </div>
              <h3 className="tt-about-cardTitle">Our Values</h3>
            </div>

            <ul className="tt-about-valuesList">
              <li className="tt-about-valuesItem">
                <span className="tt-about-dot" />
                Excellence in service and communication
              </li>
              <li className="tt-about-valuesItem">
                <span className="tt-about-dot" />
                Authentic cultural experiences
              </li>
              <li className="tt-about-valuesItem">
                <span className="tt-about-dot" />
                Respect for nature and local communities
              </li>
              <li className="tt-about-valuesItem">
                <span className="tt-about-dot" />
                Commitment to customer satisfaction
              </li>
            </ul>
          </div>

          <div className="tt-about-card">
            <div className="tt-about-cardHeader">
              <div className="tt-about-iconPill">
                <BadgeCheck className="tt-about-icon" aria-hidden="true" />
              </div>
              <h3 className="tt-about-cardTitle">Our Promise</h3>
            </div>
            <p className="tt-about-cardText">
              Clear communication, honest guidance, and a trip that feels smooth, safe, and thoughtfully planned.
              No confusion, no last-minute chaos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
