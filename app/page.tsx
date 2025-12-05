'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { 
  Shield, ArrowRight, Activity, Calendar as CalIcon, Clock, 
  Stethoscope, CheckCircle, Menu, X, ChevronDown 
} from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simple Mock Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone === '0000') {
      window.location.href = '/admin';
      return;
    }

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
      <div className="min-h-screen bg-white">
        {/* Dashboard Navigation */}
        <nav className="border-b border-gray-200 sticky top-0 bg-white z-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-black">MedCare</span>
              </div>
              <Button 
                onClick={() => setUser(null)} 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black">Your Appointments</h1>
              <p className="text-gray-600 mt-2">Manage your healthcare schedule</p>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-black hover:bg-gray-800 text-white w-full lg:w-auto"
            >
              <CalIcon className="w-4 h-4 mr-2" />
              Book New Appointment
            </Button>
          </div>

          {/* Appointments Grid */}
          <div className="grid gap-4 lg:gap-6">
            {myAppointments.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl">
                <CalIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments yet</h3>
                <p className="text-gray-600 mb-6">Book your first appointment to get started</p>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Book Appointment
                </Button>
              </div>
            ) : (
              myAppointments.map(apt => {
                const doc = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
                return (
                  <div 
                    key={apt.id} 
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 lg:p-6 hover:border-black transition-all"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-black">{doc?.name}</h3>
                        <p className="text-gray-600 mt-1">{doc?.specialty}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
                          <span className="flex items-center gap-2">
                            <CalIcon className="w-4 h-4" />
                            {formatDateTime(apt.date).dateOnly}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {apt.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <StatusBadge status={apt.status} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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

  // LANDING PAGE (DEFAULT VIEW)
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">MedCare</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-black font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-black font-medium transition-colors">
                How It Works
              </a>
              <a href="#auth" className="text-gray-700 hover:text-black font-medium transition-colors">
                Login
              </a>
              <Link 
                href="/admin" 
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-black font-medium"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-black font-medium"
              >
                How It Works
              </a>
              <a 
                href="#auth" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-black font-medium"
              >
                Login
              </a>
              <Link 
                href="/admin" 
                className="block text-gray-600 hover:text-black"
              >
                Admin Access
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-black mb-6 leading-tight">
            Healthcare Made
            <br />
            <span className="relative inline-block mt-2">
              Simple & Accessible
              <div className="absolute bottom-0 left-0 w-full h-3 bg-gray-200 -z-10"></div>
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Book appointments with verified doctors, manage your health records, and access quality healthcare from anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#auth">
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base lg:text-lg w-full sm:w-auto">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="#features">
              <Button 
                variant="outline" 
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 text-base lg:text-lg w-full sm:w-auto"
              >
                Learn More
                <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 mt-16 lg:mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-black">500+</div>
              <div className="text-sm lg:text-base text-gray-600 mt-1">Doctors</div>
            </div>
            <div className="text-center border-x border-gray-300">
              <div className="text-3xl lg:text-4xl font-bold text-black">10k+</div>
              <div className="text-sm lg:text-base text-gray-600 mt-1">Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-black">24/7</div>
              <div className="text-sm lg:text-base text-gray-600 mt-1">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Why Choose MedCare
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need for better healthcare management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 lg:p-8 hover:border-black transition-all">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Verified Doctors</h3>
              <p className="text-gray-600 leading-relaxed">
                Access certified healthcare professionals across multiple specialties with proven expertise.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 lg:p-8 hover:border-black transition-all">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Secure Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                Your health data is protected with enterprise-grade security and complete privacy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 lg:p-8 hover:border-black transition-all">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <CalIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Easy Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">
                Book, reschedule, or cancel appointments instantly with our intuitive system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your account with just your phone number in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Book Appointment</h3>
              <p className="text-gray-600">
                Choose your doctor, select a time slot that works for you
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Get Care</h3>
              <p className="text-gray-600">
                Meet with your doctor and receive quality healthcare
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login/Signup Section */}
      <section id="auth" className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">Get Started</h2>
              <p className="text-gray-600">Enter your phone number to continue</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 lg:p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border-2 border-gray-300 focus:border-black rounded-lg px-4 py-3"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Demo: Use <span className="font-semibold">0000</span> for admin access
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-800 text-white py-6 text-base"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <div className="flex items-center justify-center gap-6 lg:gap-8 mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Verified
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-black" />
                  Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-black">MedCare</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2025 MedCare Connect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
