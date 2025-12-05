'use client';

import React, { useState } from 'react';
import { INITIAL_APPOINTMENTS, MOCK_DOCTORS } from '@/constants';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartPulse, Calendar, Users, Shield, ArrowLeft } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function AdminPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  const handleStatus = (id: string, status: any) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const stats = {
    scheduled: appointments.filter(a => a.status === 'scheduled').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       <header className="bg-slate-900 text-white px-6 h-16 flex justify-between items-center sticky top-0 z-20">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-green-400 transition-colors">
             <HeartPulse className="w-5 h-5 text-green-500" /> 
             <span>CarePulse Admin</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" /> Exit to Home
            </Button>
          </Link>
       </header>

       <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 flex-grow w-full">
          <section className="grid md:grid-cols-3 gap-6">
             <StatCard icon={Calendar} label="Scheduled" value={stats.scheduled} type="success" />
             <StatCard icon={Users} label="Pending" value={stats.pending} type="warning" />
             <StatCard icon={Shield} label="Cancelled" value={stats.cancelled} type="danger" />
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-900">Recent Appointments</h2>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-medium">Patient</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Doctor</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {appointments.map(apt => {
                       const doc = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
                       return (
                         <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-medium text-slate-900">{apt.patientName}</td>
                           <td className="px-6 py-4 text-slate-600">
                             {formatDateTime(apt.date).dateOnly} <br/>
                             <span className="text-xs text-slate-400">{apt.time}</span>
                           </td>
                           <td className="px-6 py-4 flex items-center gap-2">
                             <img src={doc?.image} className="w-6 h-6 rounded-full bg-slate-200" />
                             <span className="text-slate-700">{doc?.name}</span>
                           </td>
                           <td className="px-6 py-4">
                             <StatusBadge status={apt.status} />
                           </td>
                           <td className="px-6 py-4 text-right space-x-2">
                              <button onClick={() => handleStatus(apt.id, 'scheduled')} className="text-green-600 hover:underline font-medium text-xs">Approve</button>
                              <button onClick={() => handleStatus(apt.id, 'cancelled')} className="text-red-600 hover:underline font-medium text-xs">Cancel</button>
                           </td>
                         </tr>
                       );
                    })}
                 </tbody>
               </table>
             </div>
          </section>
       </main>

       {/* Admin Footer */}
       <footer className="py-6 text-center text-sm text-slate-500 border-t border-slate-200 bg-white">
         <p>Admin Portal • Created by Nidhi and Kashish</p>
       </footer>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  type: 'success' | 'warning' | 'danger';
}

const StatCard = ({ icon: Icon, label, value, type }: StatCardProps) => {
  const colors: Record<StatCardProps['type'], string> = {
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600'
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
       <div className={`p-4 rounded-full ${colors[type]}`}>
          <Icon className="w-6 h-6" />
       </div>
       <div>
         <p className="text-2xl font-bold text-slate-900">{value}</p>
         <p className="text-sm text-slate-500">{label}</p>
       </div>
    </div>
  );
}