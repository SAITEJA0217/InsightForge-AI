import React from 'react';
import AdminTable from '../../components/AdminTable';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-sky-500/30 selection:text-sky-200">
      <main>
        <AdminTable />
      </main>
    </div>
  );
}
