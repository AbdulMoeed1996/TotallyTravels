import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import '../styles/hero.css';

interface HeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  height?: 'full' | 'medium' | 'small';
}

export function Hero({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  height = 'full',
}: HeroProps) {
  const heroStyle: CSSProperties = {
    // CSS variable so we can control parallax + overlays in CSS
    ['--tt-hero-image' as any]: `url(${backgroundImage})`,
  };

  return (
    <header
      className={`tt-hero tt-hero--${height}`}
      style={heroStyle}
      aria-label={title}
    >
      <div className="tt-hero-inner container mx-auto px-4">
        <div className="tt-hero-panel">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tt-hero-kicker"
          >
            Premium trips across Pakistan
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="tt-hero-title"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="tt-hero-subtitle"
            >
              {subtitle}
            </motion.p>
          )}

          {buttonText && onButtonClick && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="tt-hero-actions"
            >
              <button
                onClick={onButtonClick}
                className="tt-hero-btn"
                type="button"
              >
                {buttonText}
              </button>

              <p className="tt-hero-hint">Scroll to explore destinations below</p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
