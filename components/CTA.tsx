'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden z-10 border-t border-slate-800/60">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 sm:p-16 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Ready to Automate Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Lead Enrichment Pipeline?
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Experience the full power of autonomous data scraping, Gemini AI audit synthesis, and premium PDF generation in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/lead"
              className="w-full sm:w-auto relative group px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 p-[1px] font-bold text-base shadow-2xl shadow-sky-500/20 active:scale-95 transition-all duration-300 focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="relative px-8 py-3.5 rounded-full bg-slate-950 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center gap-3 text-white">
                <Zap className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
                <span>Submit Lead & Run Audit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant AI Generation</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
