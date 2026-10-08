import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { EscapeCategories } from '../components/EscapeCategories';
import { IndiaDiscovery } from '../components/IndiaDiscovery';
import { InternationalDiscovery } from '../components/InternationalDiscovery';
import { TravelStyles } from '../components/TravelStyles';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SocialProof } from '../components/SocialProof';
import { FinalCTA } from '../components/FinalCTA';

export const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <EscapeCategories />
      <IndiaDiscovery />
      <InternationalDiscovery />
      <TravelStyles />
      <WhyChooseUs />
      <SocialProof />
      <FinalCTA />
    </div>
  );
};
