import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

import '../styles/destination-card.css';

interface DestinationCardProps {
  image: string;
  title: string;
  description: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function DestinationCard({
  image,
  title,
  description,
  buttonText = 'Learn More',
  onButtonClick,
}: DestinationCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  const [imgSrc, setImgSrc] = useState(image);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgSrc(image);
    setImgFailed(false);
  }, [image]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="tt-dcard"
    >
      {/* Media area always same size (16:9) */}
      <div className="tt-dcard-media">
        {!imgFailed && imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => {
              setImgFailed(true);
              setImgSrc('');
            }}
          />
        ) : (
          <div className="tt-dcard-placeholder">
            <div className="tt-dcard-placeholder-inner">
              <ImageIcon size={18} />
              <span>Image coming soon</span>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="tt-dcard-body">
        <h3 className="tt-dcard-title">{title}</h3>

        <p className="tt-dcard-desc">{description}</p>

        {onButtonClick && (
          <div className="tt-dcard-footer">
            <button type="button" onClick={onButtonClick} className="tt-dcard-btn">
              {buttonText}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default DestinationCard;
