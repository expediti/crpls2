'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ArrowRight, UserCheck, Lock, Activity, Calendar as CalIcon, Clock, Heart, Users, CheckCircle, Stethoscope } from 'lucide-react';
import { MOCK_DOCTORS, INITIAL_APPOINTMENTS } from '@/constants';
import { Appointment, User } from '@/lib/Type';
import { StatusBadge } from '@/components/StatusBadge';
import { AppointmentModal } from '@/components/AppointmentModal';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple Mock Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone === '0000') {
      window.location.href = '/admin';
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

  // PATIENT DASHBOARD VIEW
  if (user) {
    const myAppointments = appointments.filter(a => a.patientId === user.id || a.patientId === 'p1');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Appointments</h1>
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <CalIcon className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </div>

          <div className="grid gap-4">
            {myAppointments.map(apt => {
              const doc = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
              return (
                <div key={apt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{doc?.name}</h3>
                      <p className="text-gray-600 mt-1">{doc?.specialty}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalIcon className="w-4 h-4" />
                          {formatDateTime(apt.date).dateOnly}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                </div>
              );
            })}
          </div>

         <AppointmentModal
  open={isModalOpen}
  onOpenChange={setIsModalOpen}
  userId={user.id}
  onAppointmentCreated={handleCreateAppointment}
/>


        </div>
      </div>
    );
  }

  // LOGIN VIEW
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Enter your phone number to continue</p>
            <Link href="/admin" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              Admin Access
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Use 0000 for admin access
                </p>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Verified Doctors
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-600" />
                Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LANDING PAGE (DEFAULT VIEW)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MedCare Connect</span>
          </div>
          <Link href="/admin" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Admin Access
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Your Health, Our Priority
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Healthcare Made
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Simple</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Book appointments with top specialists, manage your health records, and get quality care when you need it most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-gray-300 hover:border-blue-600 px-8 py-6 text-lg rounded-xl transition-all"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Stethoscope className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Doctors</h3>
            <p className="text-gray-600 leading-relaxed">
              Access to certified healthcare professionals across multiple specialties with proven track records.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Platform</h3>
            <p className="text-gray-600 leading-relaxed">
              Your health data is protected with enterprise-grade security and complete privacy compliance.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <CalIcon className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Scheduling</h3>
            <p className="text-gray-600 leading-relaxed">
              Book, reschedule, or cancel appointments instantly with our intuitive booking system.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Verified Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 border-t border-gray-200">
        <p>© 2025 MedCare Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}
