// Main Page - Single page with all sections

'use client';

import { Scene } from '@/components/three';
import { Hero, Exhibition, Capabilities, Contact } from '@/components/sections';
import { LoadingProvider, useLoading } from '@/components/providers/LoadingProvider';

function PageContent() {
  const { setSceneLoaded } = useLoading();

  const handleExplore = () => {
    const exhibition = document.getElementById('exhibition');
    exhibition?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Scene onLoaded={setSceneLoaded} />
      
      <Hero onExplore={handleExplore} />
      <Exhibition />
      <Capabilities />
      <Contact />
    </>
  );
}

export default function Home() {
  return (
    <LoadingProvider>
      <PageContent />
    </LoadingProvider>
  );
}
