import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ParticleBackground } from '../components/ParticleBackground';
export function Landing() {
  return <div className="bg-gradient-to-b from-black via-neutral-800 to-black  text-white min-h-screen w-full relative overflow-hidden">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Header />
        <Hero />
      </div>
    </div>;
}
