import { Hero } from '../components/Hero';
import { AboutIntro } from '../components/about/AboutIntro';
import { AboutWhyUs } from '../components/about/AboutWhyUs';
import { AboutValues } from '../components/about/AboutValues';
import { AboutCta } from '../components/about/AboutCta';

interface AboutProps {
  onNavigate?: (page: string, destinationId?: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div>
      <Hero
        backgroundImage="/images/about-hero.png"
        title="About Totally Travels"
        subtitle="Your gateway to unforgettable journeys"
        height="full"
      />

      <AboutIntro />
      <AboutWhyUs />
      <AboutValues />
      <AboutCta onNavigate={(page: string) => onNavigate?.(page)} />
    </div>
  );
}

export default About;
