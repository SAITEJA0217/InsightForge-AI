'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Bot } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
      
      {/* Animated Gradient Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-sky-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl mb-8 shadow-2xl"
        >
          <Sparkles className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            SimplifiIQ AI Software Developer Intern Assessment
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-8"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-sans">
            Autonomous <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              AI Lead Enrichment
            </span> & Audit Platform
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
            Instantly validate leads, scrape website data, run Gemini AI analysis, generate premium consulting PDFs, and deliver via email & Drive—<span className="text-white font-semibold">100% autonomously</span>.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto justify-center"
        >
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

          <Link
            href="/admin"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 focus:outline-none"
          >
            <Bot className="w-5 h-5 text-indigo-400" />
            <span>Admin Dashboard</span>
          </Link>
        </motion.div>

        {/* Feature Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto w-full pt-8 border-t border-slate-800/80"
        >
          <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <span className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">100%</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Autonomous Workflow</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <span className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Gemini</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">AI Prompt Engineering</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <span className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">PDF</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Puppeteer Generation</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <span className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">Sheets</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">& Drive Integration</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
