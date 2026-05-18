'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RefreshCw, CheckCircle2, XCircle, Clock, ExternalLink, Download, Eye, Bot, Building2, Mail, AlertTriangle, FileText } from 'lucide-react';
import { Lead } from '../types';
import ReportPreview from './ReportPreview';
import { useToast } from '../hooks/useToast';
import { cn } from '../utils/cn';

export default function AdminTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { success, error } = useToast();

  const fetchLeads = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
        if (!silent) success('Dashboard Synced', 'Successfully fetched latest leads and audit reports.');
      } else {
        throw new Error(data.error || 'Failed to fetch leads');
      }
    } catch (err: any) {
      error('Sync Error', err.message || 'Unable to load leads from storage.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.reportStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case 'scraping':
      case 'analyzing':
      case 'generating_pdf':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{status.replace('_', ' ')}</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" />
            <span>Failed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Admin <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Lead Dashboard</span>
          </h1>
          <p className="text-sm text-slate-400">
            Real-time administrative tracking of submitted leads, AI audit generation, email dispatch, and Google Drive archiving.
          </p>
        </div>

        <button
          onClick={() => fetchLeads(false)}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-semibold text-white shadow-lg active:scale-95 transition-all focus:outline-none"
        >
          <RefreshCw className={cn('w-4 h-4 text-sky-400', loading && 'animate-spin')} />
          <span>Refresh Dashboard</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, name, email..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-2 sm:ml-0" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">Filter:</span>
          {['all', 'completed', 'scraping', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all shrink-0 focus:outline-none',
                statusFilter === status
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950/40 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table / Grid */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-2xl">
        
        {loading ? (
          /* Skeleton Loading UI */
          <div className="p-8 space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-slate-800 rounded" />
                    <div className="h-3 w-32 bg-slate-800/60 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-6 w-24 bg-slate-800 rounded-full" />
                  <div className="h-10 w-28 bg-slate-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredLeads.length === 0 ? (
          /* Empty State */
          <div className="p-16 text-center text-slate-400 space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Leads Found</h3>
            <p className="text-sm max-w-md mx-auto">
              No lead submissions match your current search criteria or status filter. Try adjusting your filters or submitting a new lead.
            </p>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-5 px-6">Company & Lead</th>
                  <th className="py-5 px-6">Industry</th>
                  <th className="py-5 px-6">Audit Status</th>
                  <th className="py-5 px-6">Delivery & Archive</th>
                  <th className="py-5 px-6">Timestamp</th>
                  <th className="py-5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/60 transition-colors group">
                    
                    {/* Company & Lead */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center font-bold text-white text-xs shrink-0 group-hover:border-sky-500/50 transition-colors">
                          {lead.companyName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-base truncate flex items-center gap-1.5">
                            <span>{lead.companyName}</span>
                            <a href={lead.websiteUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-400 transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <div className="text-xs text-slate-400 truncate">{lead.fullName} &bull; {lead.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="py-5 px-6 font-medium text-slate-300">
                      {lead.industry}
                    </td>

                    {/* Audit Status */}
                    <td className="py-5 px-6">
                      {getStatusBadge(lead.reportStatus)}
                    </td>

                    {/* Delivery & Archive */}
                    <td className="py-5 px-6 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className={cn('w-3.5 h-3.5', lead.emailStatus === 'sent' ? 'text-emerald-400' : 'text-slate-500')} />
                        <span className="capitalize text-slate-400">Email: <strong className={cn(lead.emailStatus === 'sent' ? 'text-emerald-400 font-semibold' : 'text-slate-400')}>{lead.emailStatus}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <FileText className={cn('w-3.5 h-3.5', lead.pdfArchiveStatus === 'archived' ? 'text-sky-400' : 'text-slate-500')} />
                        <span className="capitalize text-slate-400">Drive: <strong className={cn(lead.pdfArchiveStatus === 'archived' ? 'text-sky-400 font-semibold' : 'text-slate-400')}>{lead.pdfArchiveStatus}</strong></span>
                      </div>
                    </td>

                    {/* Timestamp */}
                    <td className="py-5 px-6 text-xs text-slate-400 font-medium">
                      {new Date(lead.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-6 text-right space-x-2">
                      {lead.reportStatus === 'completed' && (
                        <>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            type="button"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 hover:text-white text-xs font-semibold text-slate-300 transition-all focus:outline-none"
                          >
                            <Eye className="w-3.5 h-3.5 text-sky-400" />
                            <span>Preview</span>
                          </button>

                          {lead.pdfUrl && (
                            <a
                              href={lead.pdfUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-xs font-bold text-white shadow-lg shadow-sky-500/20 transition-all focus:outline-none"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </a>
                          )}
                        </>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Modal / Popup for Report Preview */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl overflow-y-auto custom-scrollbar">
            <div className="absolute inset-0" onClick={() => setSelectedLead(null)} />
            <div className="relative z-10 w-full max-w-5xl my-8">
              <ReportPreview lead={selectedLead} onClose={() => setSelectedLead(null)} />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
