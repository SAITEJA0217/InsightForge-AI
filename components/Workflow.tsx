'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Globe, Cpu, FileText, Mail, Database, HardDrive } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: ShieldCheck,
      title: '1. Lead Validation',
      subtitle: 'Zod Schema Verification',
      desc: 'Prospect submits form. System instantly validates email format, URL validity, and character constraints before processing.',
      badge: 'Instant',
    },
    {
      icon: Globe,
      title: '2. Data Enrichment',
      subtitle: 'Axios + Cheerio Scraper',
      desc: 'System crawls prospect website, extracting meta tags, heading hierarchies, core services, and CTA conversion structures.',
      badge: 'Scraping',
    },
    {
      icon: Cpu,
      title: '3. AI Audit Inference',
      subtitle: 'Gemini / OpenAI Consultant',
      desc: 'LLM synthesizes scraped data with stated business goals to generate personalized UX, SEO, and AI automation opportunities.',
      badge: 'AI Inference',
    },
    {
      icon: FileText,
      title: '4. PDF Compilation',
      subtitle: 'Puppeteer HTML Engine',
      desc: 'Transforms AI JSON into a stunning 4-page consulting report complete with audit scorecards, modern typography, and charts.',
      badge: 'Rendering',
    },
    {
      icon: Mail,
      title: '5. Automated Email',
      subtitle: 'Resend API Delivery',
      desc: 'Dispatches a professional HTML email with the personalized PDF audit attached directly to the prospect inbox.',
      badge: 'Delivery',
    },
    {
      icon: Database,
      title: '6. Sheets Archiving',
      subtitle: 'Google Sheets API',
      desc: 'Appends lead details, timestamps, and delivery success metrics into the central sales tracking spreadsheet.',
      badge: 'Pipeline',
    },
    {
      icon: HardDrive,
      title: '7. Drive Cloud Backup',
      subtitle: 'Google Drive API',
      desc: 'Uploads the generated PDF report into a permanent Google Drive folder for administrative record-keeping.',
      badge: 'Archiving',
    },
  ];

  return (
    <section className="py-32 bg-slate-900/40 border-t border-slate-800/60 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Autonomous <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Workflow Lifecycle</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-normal">
            An interactive breakdown of the 7-stage automated pipeline executed instantly upon form submission without human intervention.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Steps List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    'w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group focus:outline-none',
                    isActive
                      ? 'bg-slate-900 border-sky-500/50 shadow-xl shadow-sky-500/10 translate-x-2'
                      : 'bg-slate-950/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/40'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center border transition-colors shrink-0',
                    isActive ? 'bg-sky-500/20 border-sky-500/40 text-sky-400' : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200'
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={cn('font-bold text-base transition-colors truncate', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')}>
                        {step.title}
                      </span>
                      <span className={cn('text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider border shrink-0', isActive ? 'bg-sky-500/20 border-sky-500/30 text-sky-300' : 'bg-slate-800/50 border-slate-700 text-slate-400')}>
                        {step.badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate font-medium">{step.subtitle}</div>
                  </div>
                  <ArrowRight className={cn('w-5 h-5 transition-transform shrink-0', isActive ? 'text-sky-400 translate-x-1' : 'text-slate-600 opacity-0 group-hover:opacity-100')} />
                </button>
              );
            })}
          </div>

          {/* Step Detail Display Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-sky-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full min-h-[360px] justify-between">
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-8">
                    {React.createElement(steps[activeStep].icon, { className: 'w-10 h-10 text-sky-400' })}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{steps[activeStep].title}</h3>
                      <div className="text-sm text-sky-400 font-semibold">{steps[activeStep].subtitle}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 border-l-2 border-sky-500/40 pl-6 py-2 bg-sky-500/[0.02]">
                    {steps[activeStep].desc}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Automated Execution</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={cn(
                          'w-8 h-2 rounded-full transition-all duration-300 focus:outline-none',
                          i === activeStep ? 'bg-sky-400 w-12' : 'bg-slate-800 hover:bg-slate-700'
                        )}
                        aria-label={`Step ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
