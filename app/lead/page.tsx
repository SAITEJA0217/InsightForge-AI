import React from 'react';
import LeadForm from '../../components/LeadForm';

export default function LeadPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-sky-500/30 selection:text-sky-200">
      <main>
        <LeadForm />
      </main>
    </div>
  );
}
