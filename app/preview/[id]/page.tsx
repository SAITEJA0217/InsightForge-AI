import React from 'react';
import { getLeadById } from '../../../lib/storage';
import ReportPreview from '../../../components/ReportPreview';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default async function PreviewPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const lead = await getLeadById(id);

  if (!lead) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <AlertTriangle className="w-16 h-16 text-amber-400 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Audit Report Not Found</h1>
        <p className="text-sm max-w-md mb-8">We couldn't find an AI growth audit report matching the requested ID ({id}).</p>
        <Link href="/admin" className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-semibold text-sm flex items-center gap-2 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden selection:bg-sky-500/30 selection:text-sky-200">
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>
      <main>
        <ReportPreview lead={lead} />
      </main>
    </div>
  );
}
