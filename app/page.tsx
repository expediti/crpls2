'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ArrowRight, UserCheck, Lock, Activity, Calendar as CalIcon, Clock } from 'lucide-react';
import { MOCK_DOCTORS, INITIAL_APPOINTMENTS } from '@/constants';
import { Appointment, User } from '@/lib/Type';
import { StatusBadge } from '@/components/StatusBadge';
import { AppointmentModal } from '@/components/AppointmentModal';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple Mock Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(phone === '0000') {
        window.location.href = '/admin'; // Force navigation to admin
        return;
    }
    // Simulate patient login
    setUser({
      id: 'p-' + Date.now(),
      name: 'Patient User',
      phone: phone,
      role: 'patient',
      age: 30
    });
  };

  const handleCreateAppointment = (data: any) => {
    if (!user) return;
    const newApt: Appointment = {
      id: Math.random().toString(36),
      patientId: user.id,
      patientName: user.name,
      doctorId: data.doctorId,
      date: data.date,
      time: data.time,
      status: 'pending',
      notes: data.notes
    };
    setAppointments([...appointments, newApt]);
  };

  if (user) {
    // Patient Dashboard View (Inline for simplicity per request structure)
    const myAppointments = appointments.filter(a => a.patientId === user.id || a.patientId === 'p1'); // Mock filter
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex justify-between items-center mb-12">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Hi, {user.name}</h1>
                <p className="text-slate-500 mt-2">Welcome to your health dashboard.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>New Appointment</Button>
        </header>

        <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">Your Appointments</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myAppointments.map(apt => {
                    const doc = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
                    return (
                        <div key={apt.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <img src={doc?.image} alt={doc?.name} className="w-10 h-10 rounded-full object-cover"/>
                                    <div>
                                        <p className="font-medium text-slate-900">{doc?.name}</p>
                                        <p className="text-xs text-slate-500">{doc?.specialty}</p>
                                    </div>
                                </div>
                                <StatusBadge status={apt.status} />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                <CalIcon className="w-4 h-4"/> {formatDateTime(apt.date).dateOnly}
                            </div>
                             <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock className="w-4 h-4"/> {apt.time}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>

        <AppointmentModal 
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            userId={user.id}
            onAppointmentCreated={handleCreateAppointment}
        />
      </div>
    );
  }

  // Landing / Login View
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="w-6 h-6 text-slate-900" /> MedCare
        </div>
        <Link href="/admin" className="text-sm font-medium hover:underline">Admin Access</Link>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
         <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                Your Health, <br />
                <span className="text-slate-500">Our Priority.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Book appointments with top specialists, manage your health records, and get care when you need it.
            </p>
            
            <form onSubmit={handleLogin} className="max-w-md space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input 
                        placeholder="Enter phone number (use 0000 for admin)" 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                </div>
                <Button className="w-full" size="lg">Get Started</Button>
            </form>

            <div className="mt-12 flex gap-8 text-slate-400 text-sm">
                 <span className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Verified Doctors</span>
                 <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Secure</span>
            </div>
         </div>
         
         <div className="hidden lg:block flex-1 bg-slate-50 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
             <img 
               src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" 
               alt="Doctors" 
               className="absolute inset-20 w-[calc(100%-10rem)] h-[calc(100%-10rem)] object-cover rounded-3xl shadow-2xl"
             />
         </div>
      </div>
    </div>
  );
}