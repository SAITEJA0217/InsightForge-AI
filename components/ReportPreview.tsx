'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, ShieldCheck, X, CheckCircle2, AlertCircle, FileText, Cpu, Building2, Globe, Sparkles } from 'lucide-react';
import { Lead } from '../types';
import { cn } from '../utils/cn';

interface ReportPreviewProps {
  lead: Lead;
  onClose?: () => void;
}

export default function ReportPreview({ lead, onClose }: ReportPreviewProps) {
  const analysis = lead.aiAnalysis;

  if (!analysis) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-900 rounded-3xl border border-slate-800">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">AI Analysis Pending</h3>
        <p className="text-sm">The AI growth audit for this lead is currently being compiled or encountered an error.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full mx-auto relative text-slate-100"
    >
      {/* Top Bar */}
      <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-[1.5px] shadow-md shadow-sky-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-white text-sm">
              IF
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base text-white truncate">AI Growth Audit: {lead.companyName}</h3>
            <div className="text-xs text-sky-400 flex items-center gap-1 truncate">
              <span>{lead.industry}</span> &bull; <span>{lead.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {lead.pdfUrl && (
            <a
              href={lead.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all duration-200 focus:outline-none"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Scrollable */}
      <div className="p-6 sm:p-10 space-y-12 max-h-[80vh] overflow-y-auto custom-scrollbar">
        
        {/* Section 1: Executive Summary & Scores */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Executive Summary & Audit Scores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
              <div className="text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                {analysis.auditScores.overall}%
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Overall AI Readiness</div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full" style={{ width: `${analysis.auditScores.overall}%` }} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {analysis.auditScores.seo}%
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">SEO & Discoverability</div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${analysis.auditScores.seo}%` }} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {analysis.auditScores.ux}%
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">UX Conversion Funnel</div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: `${analysis.auditScores.ux}%` }} />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-sky-400" />
                <span>Company Overview</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{analysis.companyOverview}</p>
            </div>
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                <span>Industry Understanding ({lead.industry})</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{analysis.industryUnderstanding}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Website & UX Audit */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Website Architecture & UX Audit</h2>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">Website Audit Observations</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{analysis.websiteAudit}</p>
            </div>
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">User Experience (UX) Critique</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{analysis.uxAnalysis}</p>
            </div>
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">Search Engine Optimization (SEO)</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{analysis.seoObservations}</p>
            </div>
          </div>
        </div>

        {/* Section 3: AI Automation Opportunities */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">AI Automation Opportunities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysis.aiAutomationOpportunities.map((opp, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-sky-500 to-indigo-500 opacity-80" />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 uppercase tracking-wider">
                      Impact: {opp.impact}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 uppercase tracking-wider">
                      Effort: {opp.effort}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 pl-2">{opp.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed pl-2">{opp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Roadmap & Insights */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Implementation Roadmap & Insights</h2>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Phased Implementation Roadmap</h3>
              <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6">
                {analysis.aiImplementationRoadmap.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 border-4 border-slate-950 shadow-md shadow-sky-500/50" />
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">{item.phase} ({item.duration})</div>
                    <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">Strategic Growth Recommendations</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {analysis.growthRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/20">
              <h3 className="text-base font-bold text-sky-400 mb-2">Personalized Executive Synthesis</h3>
              <p className="text-slate-200 text-sm leading-relaxed">{analysis.personalizedInsights}</p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
