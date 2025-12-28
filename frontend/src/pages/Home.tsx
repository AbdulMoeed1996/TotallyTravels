import { Hero } from '../components/Hero';
import { WhatWeOffer } from '../components/WhatWeOffer';
import { FeaturedDestinations } from '../components/FeaturedDestinations';
import { HomeCtaBlock } from '../components/HomeCtaBlock';

type HomeProps = {
  onNavigate: (page: string, destinationId?: string) => void;
};

export function Home({ onNavigate }: HomeProps) {
  const scrollToFeatured = () => {
    document.getElementById('featured-destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goAbout = () => {
    onNavigate('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBook = () => {
    onNavigate('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goContact = () => {
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDestination = (destinationId: string) => {
    onNavigate('destination-detail', destinationId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1635351261340-55f437000b21?auto=format&fit=crop&w=1600&q=80"
        title="Totally Travels"
        subtitle="Travel with us"
        buttonText="Explore Destinations"
        onButtonClick={scrollToFeatured}
        height="medium"
      />

      <WhatWeOffer onBookClick={goBook} onTalkClick={goContact} />

      <FeaturedDestinations
        sectionId="featured-destinations"
        onDestinationClick={openDestination}
      />

      <HomeCtaBlock
        onExploreClick={goAbout}
        onBookClick={goBook}
        onTalkClick={goContact}
        featuredSectionId="featured-destinations"
      />
    </div>
  );
}

export default Home;
