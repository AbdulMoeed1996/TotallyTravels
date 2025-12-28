import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface SectionHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}
    >
      {/* Accent line */}
      <div className={`flex ${centered ? 'justify-center' : 'justify-start'} mb-4`}>
        <span className="h-1 w-14 rounded-full bg-green-600" />
      </div>

      {/* Title */}
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
        style={{ lineHeight: 1.15 }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {description && (
        <p className={`mt-4 text-base md:text-lg text-gray-600 leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
