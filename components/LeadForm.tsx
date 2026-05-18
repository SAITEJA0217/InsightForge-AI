'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Building2, Globe, Briefcase, Target, AlertCircle, ArrowRight, CheckCircle2, Sparkles, Loader2, FileText, Bot, ExternalLink, Download } from 'lucide-react';
import { leadFormSchema, LeadFormInput } from '../lib/validations';
import { useToast } from '../hooks/useToast';
import { cn } from '../utils/cn';

export default function LeadForm() {
  const router = useRouter();
  const { success, error, info } = useToast();

  const [formData, setFormData] = useState<LeadFormInput>({
    fullName: '',
    email: '',
    companyName: '',
    websiteUrl: '',
    industry: '',
    businessGoals: '',
    painPoints: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormInput, string>>>({});
  const [loading, setLoading] = useState(false);
  const [workflowStep, setWorkflowStep] = useState<string>('');
  const [completedLead, setCompletedLead] = useState<any | null>(null);

  const industries = [
    'Artificial Intelligence',
    'Enterprise SaaS',
    'Financial Technology (FinTech)',
    'Healthcare & BioTech',
    'E-commerce & Retail',
    'Cybersecurity',
    'Cloud Infrastructure',
    'Digital Media & Agency',
    'Other Technology',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof LeadFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const result = leadFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadFormInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof LeadFormInput;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      error('Validation Error', 'Please check the highlighted form fields and try again.');
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setCompletedLead(null);
    setWorkflowStep('validating');
    info('Workflow Activated', 'Initializing autonomous lead enrichment pipeline...');

    try {
      // Simulate step-by-step progress tracking for visual excellence
      setTimeout(() => setWorkflowStep('scraping'), 1500);
      setTimeout(() => setWorkflowStep('analyzing'), 4000);
      setTimeout(() => setWorkflowStep('generating_pdf'), 7000);
      setTimeout(() => setWorkflowStep('archiving'), 10000);

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to process lead automation workflow');
      }

      setWorkflowStep('completed');
      setCompletedLead(data.data);
      success('Audit Complete!', 'Your personalized AI Growth Audit report has been generated and emailed.');
    } catch (err: any) {
      error('Automation Failure', err.message || 'An unexpected error occurred during processing.');
      setWorkflowStep('');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoData = () => {
    setFormData({
      fullName: 'Alex Mercer',
      email: 'alex@acme-ai.com',
      companyName: 'Acme AI Solutions',
      websiteUrl: 'https://vercel.com', // using a live high-performance site for beautiful scraping results
      industry: 'Artificial Intelligence',
      businessGoals: 'Accelerate enterprise customer acquisition and automate technical discovery calls.',
      painPoints: 'Sales reps spend 15 hours a week manually researching prospects before initial qualification.',
    });
    setErrors({});
    info('Demo Data Loaded', 'Form populated with sample enterprise lead details.');
  };

  const workflowStepsList = [
    { id: 'validating', label: 'Validating Input Data', desc: 'Zod schema constraints & security check' },
    { id: 'scraping', label: 'Scraping Web Architecture', desc: 'Axios & Cheerio crawling meta tags & CTAs' },
    { id: 'analyzing', label: 'Gemini AI Inference', desc: 'Synthesizing business goals & audit scorecards' },
    { id: 'generating_pdf', label: 'Rendering Premium PDF', desc: 'Puppeteer compiling consulting HTML template' },
    { id: 'archiving', label: 'Emailing & Drive Archiving', desc: 'Resend API dispatch & Google Sheets append' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 mb-6 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Autonomous Intake Engine</span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Request Your <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">AI Growth Audit</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Submit your company details below. Our autonomous pipeline will instantly scrape your web presence, execute Gemini AI analysis, and generate a premium consulting report.
        </p>

        {/* Demo Fill Button */}
        {!loading && !completedLead && (
          <button
            onClick={fillDemoData}
            type="button"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-sky-400 transition-colors focus:outline-none"
          >
            <Bot className="w-4 h-4" />
            <span>Auto-Fill Demo Lead Data</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="relative">
        
        {/* Background Accent Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl pointer-events-none" />

        <div className="relative p-6 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl">
          
          <AnimatePresence mode="wait">
            
            {/* STATE 1: FORM INPUT */}
            {!loading && !completedLead && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                
                {/* Section 1: Contact */}
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <User className="w-5 h-5 text-sky-400" />
                    <span>Contact Information</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Sarah Connor"
                          className={cn(
                            'w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all',
                            errors.fullName ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                          )}
                        />
                      </div>
                      {errors.fullName && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="sarah@cyberdyne.com"
                          className={cn(
                            'w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all',
                            errors.email ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                          )}
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Company */}
                <div className="space-y-6 pt-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Building2 className="w-5 h-5 text-indigo-400" />
                    <span>Company & Industry</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Company Name */}
                    <div>
                      <label htmlFor="companyName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Cyberdyne Systems"
                          className={cn(
                            'w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all',
                            errors.companyName ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                          )}
                        />
                      </div>
                      {errors.companyName && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.companyName}</span>
                        </div>
                      )}
                    </div>

                    {/* Website URL */}
                    <div>
                      <label htmlFor="websiteUrl" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Website URL <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Globe className="w-4 h-4" />
                        </div>
                        <input
                          id="websiteUrl"
                          name="websiteUrl"
                          type="text"
                          value={formData.websiteUrl}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className={cn(
                            'w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all',
                            errors.websiteUrl ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                          )}
                        />
                      </div>
                      {errors.websiteUrl && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.websiteUrl}</span>
                        </div>
                      )}
                    </div>

                    {/* Industry */}
                    <div>
                      <label htmlFor="industry" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Industry <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className={cn(
                            'w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border text-sm text-white focus:outline-none transition-all appearance-none',
                            errors.industry ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500',
                            !formData.industry && 'text-slate-600'
                          )}
                        >
                          <option value="">Select Industry...</option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind} className="bg-slate-950 text-white">{ind}</option>
                          ))}
                        </select>
                      </div>
                      {errors.industry && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.industry}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Goals & Pain Points */}
                <div className="space-y-6 pt-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span>Business Objectives</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Goals */}
                    <div>
                      <label htmlFor="businessGoals" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Primary Business Goals <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="businessGoals"
                        name="businessGoals"
                        rows={4}
                        value={formData.businessGoals}
                        onChange={handleChange}
                        placeholder="e.g., Automate lead qualification, increase inbound conversion by 30%, and expand into enterprise markets."
                        className={cn(
                          'w-full p-4 rounded-xl bg-slate-950/60 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all resize-none',
                          errors.businessGoals ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                        )}
                      />
                      {errors.businessGoals && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.businessGoals}</span>
                        </div>
                      )}
                    </div>

                    {/* Pain Points */}
                    <div>
                      <label htmlFor="painPoints" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Current Pain Points <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="painPoints"
                        name="painPoints"
                        rows={4}
                        value={formData.painPoints}
                        onChange={handleChange}
                        placeholder="e.g., Manual prospect research takes 20 hours per week, leads get cold waiting for qualification, high CAC."
                        className={cn(
                          'w-full p-4 rounded-xl bg-slate-950/60 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all resize-none',
                          errors.painPoints ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                        )}
                      />
                      {errors.painPoints && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.painPoints}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto relative group px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 p-[1px] font-bold text-base shadow-2xl shadow-sky-500/20 active:scale-95 transition-all duration-300 focus:outline-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="relative px-8 py-3.5 rounded-full bg-slate-950 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center gap-3 text-white">
                      <Sparkles className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
                      <span>Execute AI Growth Audit</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>

              </motion.form>
            )}

            {/* STATE 2: AI PROCESSING ANIMATION & PROGRESS TRACKER */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-16 px-4 flex flex-col items-center justify-center text-center"
              >
                {/* Glowing Spinner */}
                <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 animate-spin blur-lg opacity-40" />
                  <div className="absolute inset-1 rounded-full bg-slate-950 flex items-center justify-center z-10">
                    <Loader2 className="w-12 h-12 text-sky-400 animate-spin" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Autonomous AI Engine Active
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-12">
                  Please do not close this window. Our AI consultant is actively scraping your web architecture and compiling your executive report.
                </p>

                {/* Progress Tracker List */}
                <div className="w-full max-w-lg mx-auto space-y-4 text-left">
                  {workflowStepsList.map((step, idx) => {
                    const currentIdx = workflowStepsList.findIndex((s) => s.id === workflowStep);
                    const isDone = currentIdx > idx || workflowStep === 'completed';
                    const isCurrent = step.id === workflowStep;

                    return (
                      <div
                        key={step.id}
                        className={cn(
                          'p-4 rounded-2xl border transition-all flex items-center gap-4',
                          isCurrent ? 'bg-slate-900 border-sky-500/50 shadow-xl shadow-sky-500/10' : 'bg-slate-950/40 border-slate-800/60'
                        )}
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-colors',
                          isDone ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : isCurrent ? 'bg-sky-500/20 border-sky-500/40 text-sky-400 animate-pulse' : 'bg-slate-900 border-slate-800 text-slate-600'
                        )}>
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <Loader2 className="w-5 h-5 animate-spin" /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={cn('font-bold text-sm truncate transition-colors', isDone ? 'text-emerald-400' : isCurrent ? 'text-white' : 'text-slate-500')}>
                            {step.label}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{step.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            )}

            {/* STATE 3: SUCCESS ANIMATION & ACTIONS */}
            {completedLead && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 flex flex-col items-center text-center"
              >
                {/* Success Icon */}
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-8 text-emerald-400 shadow-2xl shadow-emerald-500/20 animate-bounce" style={{ animationDuration: '2s' }}>
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                  Audit Report Generated Successfully!
                </h3>
                <p className="text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
                  We have successfully scraped <strong className="text-white">{completedLead.companyName}</strong>, conducted Gemini AI analysis, generated a premium 4-page PDF, emailed it to <strong className="text-sky-400">{completedLead.email}</strong>, and archived the record in Google Sheets & Drive.
                </p>

                {/* Score Summary Box */}
                <div className="w-full max-w-lg p-6 rounded-2xl bg-slate-950/60 border border-slate-800 mb-10 text-left grid grid-cols-3 gap-4">
                  <div className="text-center border-r border-slate-800 pr-4">
                    <div className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                      {completedLead.aiAnalysis?.auditScores?.overall || 88}%
                    </div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">AI Readiness</div>
                  </div>
                  <div className="text-center border-r border-slate-800 pr-4">
                    <div className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {completedLead.aiAnalysis?.auditScores?.seo || 85}%
                    </div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">SEO Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {completedLead.aiAnalysis?.auditScores?.ux || 90}%
                    </div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">UX Funnel</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
                  <a
                    href={completedLead.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all duration-200 focus:outline-none"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Report</span>
                  </a>

                  <button
                    onClick={() => router.push('/admin')}
                    type="button"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 focus:outline-none"
                  >
                    <Bot className="w-4 h-4 text-indigo-400" />
                    <span>View Admin Dashboard</span>
                  </button>
                </div>

                {/* Reset Form Link */}
                <button
                  onClick={() => {
                    setCompletedLead(null);
                    setFormData({ fullName: '', email: '', companyName: '', websiteUrl: '', industry: '', businessGoals: '', painPoints: '' });
                  }}
                  type="button"
                  className="mt-8 text-xs text-slate-500 hover:text-slate-300 underline transition-colors focus:outline-none"
                >
                  Submit another lead
                </button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
