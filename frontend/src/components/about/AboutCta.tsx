import '../../styles/about.css';

interface AboutCtaProps {
  onNavigate?: (page: string) => void;
}

export function AboutCta({ onNavigate }: AboutCtaProps) {
  const go = (page: string) => {
    if (!onNavigate) return;
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="tt-about-section">
      <div className="container mx-auto px-4">
        <div className="tt-about-ctaCard">
          <h2 className="tt-about-title">Ready to plan your next trip?</h2>
          <p className="tt-about-subtitle">
            Tell us what you’re looking for, we’ll help you shape a journey that fits your style, your pace, and your
            budget.
          </p>

          <div className="tt-about-actions">
            <button type="button" className="tt-about-btn tt-about-btnPrimary" onClick={() => go('book')}>
              Book a Tour
            </button>
            <button type="button" className="tt-about-btn tt-about-btnSecondary" onClick={() => go('contact')}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCta;
