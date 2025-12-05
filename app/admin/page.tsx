'use client';

import React, { useState } from 'react';
import { INITIAL_APPOINTMENTS, MOCK_DOCTORS } from '@/constants';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Users, Calendar, ArrowLeft, HeartPulse } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function AdminPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  const stats = {
    scheduled: appointments.filter(a => a.status === 'scheduled').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  const handleStatusUpdate = (id: string, status: any) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       <header className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-10 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-xl">
             <HeartPulse className="w-6 h-6 text-blue-500" /> 
             <span>CarePulse <span className="text-slate-500 text-sm font-normal ml-1">Admin</span></span>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Site
            </Button>
          </Link>
       </header>

       <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="space-y-2">
             <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
             <p className="text-slate-500">Welcome back, Administrator. Here's what's happening today.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-green-100 rounded-full text-green-600"><Calendar className="w-6 h-6" /></div>
                <div>
                    <p className="text-2xl font-bold">{stats.scheduled}</p>
                    <p className="text-sm text-slate-500">Scheduled Appointments</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-yellow-100 rounded-full text-yellow-600"><Users className="w-6 h-6" /></div>
                <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-sm text-slate-500">Pending Requests</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-red-100 rounded-full text-red-600"><Shield className="w-6 h-6" /></div>
                <div>
                    <p className="text-2xl font-bold">{stats.cancelled}</p>
                    <p className="text-sm text-slate-500">Cancelled</p>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold">Recent Appointments</h2>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 text-slate-500">
                      <tr>
                         <th className="px-6 py-4 font-medium">Patient</th>
                         <th className="px-6 py-4 font-medium">Date</th>
                         <th className="px-6 py-4 font-medium">Doctor</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                         <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {appointments.map(apt => {
                         const doc = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
                         return (
                            <tr key={apt.id} className="hover:bg-slate-50/50">
                               <td className="px-6 py-4 font-medium text-slate-900">{apt.patientName}</td>
                               <td className="px-6 py-4 text-slate-600">
                                  {formatDateTime(apt.date).dateOnly} at {apt.time}
                               </td>
                               <td className="px-6 py-4 flex items-center gap-2">
                                  <img src={doc?.image} className="w-6 h-6 rounded-full" />
                                  <span className="text-slate-700">{doc?.name}</span>
                               </td>
                               <td className="px-6 py-4">
                                  <StatusBadge status={apt.status} />
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                     <button onClick={() => handleStatusUpdate(apt.id, 'scheduled')} className="text-green-600 text-xs font-medium hover:underline">Schedule</button>
                                     <button onClick={() => handleStatusUpdate(apt.id, 'cancelled')} className="text-red-600 text-xs font-medium hover:underline">Cancel</button>
                                  </div>
                               </td>
                            </tr>
                         )
                      })}
                   </tbody>
                </table>
             </div>
          </div>
       </main>
    </div>
  );
}