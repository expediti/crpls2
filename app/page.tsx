'use client';

import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { AuthScreen } from '@/components/Auth/AuthScreen';
import { PatientDashboard } from '@/components/Patient/Dashboard';
import { User, Appointment } from '@/lib/Type';
import { INITIAL_APPOINTMENTS } from '@/constants';

export default function Home() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // Check for session (mock)
  useEffect(() => {
    const savedUser = localStorage.getItem('carepulse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('carepulse_user', JSON.stringify(newUser));
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('carepulse_user');
    setView('landing');
  };

  const handleBookAppointment = (apt: any) => {
    if (!user) return;
    const newApt = {
      ...apt,
      id: Math.random().toString(36).substr(2, 9),
      patientId: user.id,
      patientName: user.name,
      status: 'pending' as const,
    };
    setAppointments([...appointments, newApt]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
  };

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('auth')} />;
  }

  if (view === 'auth') {
    return (
      <AuthScreen 
        onLogin={handleLogin} 
        onBack={() => setView('landing')} 
      />
    );
  }

  if (view === 'dashboard' && user) {
    return (
      <PatientDashboard
        user={user}
        appointments={appointments}
        onLogout={handleLogout}
        onBookAppointment={handleBookAppointment}
        onCancelAppointment={handleCancelAppointment}
      />
    );
  }

  return null;
}