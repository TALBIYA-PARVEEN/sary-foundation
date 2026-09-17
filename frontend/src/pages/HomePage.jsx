import React from 'react';
import HeroSection from '../components/blueprints/home/HeroSection';
import StatsCounter from '../components/common/StatsCounter';
import SDGSection from '../components/blueprints/home/SDGSection';
import InitiativesPreview from '../components/blueprints/home/InitiativesPreview';
import PartnersSection from '../components/blueprints/home/PartnersSection';

const HomePage = ({ onOpenDonate }) => {
  return (
    <div>
      <HeroSection onOpenDonate={onOpenDonate} />
      <StatsCounter />
      <SDGSection />
      <InitiativesPreview />
      <PartnersSection />
    </div>
  );
};

export default HomePage;
