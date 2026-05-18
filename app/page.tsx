import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Workflow from '../components/Workflow';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-sky-500/30 selection:text-sky-200">
      <main className="flex-1">
        <Hero />
        <Features />
        <Workflow />
        <Testimonials />
        <CTA />
      </main>
    </div>
  );
}
