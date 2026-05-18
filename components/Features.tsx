'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe, Cpu, FileText, Mail, Database, HardDrive, ShieldAlert } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: ShieldAlert,
      title: 'Zod Input Validation',
      description: 'Strict schema validation ensures clean, actionable lead data before triggering high-cost scraping and AI inference workflows.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Globe,
      title: 'Robust Web Scraper',
      description: 'Powered by Axios & Cheerio with automated retry mechanisms and intelligent fallback logic to guarantee 100% data ingestion.',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      icon: Cpu,
      title: 'Gemini AI Consultant',
      description: 'Advanced prompt engineering synthesizes scraped data, business goals, and pain points into deeply personalized executive audits.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      icon: FileText,
      title: 'Premium PDF Generation',
      description: 'Puppeteer compiles beautiful, consulting-agency grade HTML templates with modern typography, charts, and audit scorecards.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: Mail,
      title: 'Resend Email Delivery',
      description: 'Automated delivery of professional HTML email templates with the generated PDF attached directly to the prospect.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
    },
    {
      icon: Database,
      title: 'Google Sheets Archiving',
      description: 'Instantly appends lead details, timestamps, and delivery status into Google Sheets for seamless sales pipeline tracking.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: HardDrive,
      title: 'Google Drive Storage',
      description: 'Automatically backs up generated consulting PDFs into Google Drive cloud storage for permanent administrative record-keeping.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: CheckCircle2,
      title: 'Clean Architecture',
      description: 'Built with Next.js 15 App Router, TypeScript, Tailwind CSS, error boundaries, and elegant UI transitions.',
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20',
    },
  ];

  return (
    <section className="py-32 bg-slate-950 border-t border-slate-800/60 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-96 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Engineered for <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Complete Automation</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-normal">
            Every step of the lead intake lifecycle is handled autonomously with enterprise-grade error handling, intelligent fallbacks, and premium visual output.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl hover:border-slate-700 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${feat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feat.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
