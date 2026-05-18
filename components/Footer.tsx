'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Globe, Share2, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 py-16 relative overflow-hidden z-10">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-slate-800/60 pb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 p-[1.5px] shadow-md shadow-sky-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                InsightForge <span className="text-sky-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An elite, full-stack AI-powered lead automation platform designed for the SimplifiIQ AI Software Developer Intern Assessment. Built with Next.js 15, TypeScript, and Gemini AI.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors" aria-label="Website">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors" aria-label="Social">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors" aria-label="Community">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-white uppercase tracking-wider">Navigation</span>
            <Link href="/" className="text-sm hover:text-white transition-colors">Home</Link>
            <Link href="/lead" className="text-sm hover:text-white transition-colors">Submit Lead</Link>
            <Link href="/admin" className="text-sm hover:text-white transition-colors">Admin Dashboard</Link>
          </div>

          {/* Assessment Info */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-white uppercase tracking-wider">Assessment</span>
            <div className="flex items-center gap-1 text-sm text-slate-300">
              <span>SimplifiIQ Assessment</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <span>Position: AI Software Developer Intern</span>
            </div>
            <a href="https://simplifiiq.com" target="_blank" rel="noreferrer" className="text-sm text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 mt-1 inline-flex">
              <span>Visit SimplifiIQ</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} InsightForge AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
