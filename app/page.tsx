'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  ArrowRight, 
  UserCheck, 
  Lock, 
  Activity, 
  Calendar as CalIcon, 
  Clock,
  Phone,
  CheckCircle,
  Star,
  Stethoscope,
  HeartPulse,
  Plus
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
  const [showLanding, setShowLanding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Simple Mock Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay for realism
    setTimeout(() => {
        if(phone === '0000') {
            window.location.href = '/admin'; // Force navigation to admin
            return;
        }

        if(phone.length < 3) {
            alert("Please enter a valid phone number");
            setIsLoading(false);
            return;
        }

        // Simulate patient login success
        setUser({
            id: 'p-' + Date.now(),
            name: 'Patient User',
            phone: phone,
            role: 'patient',
            age: 30
        });
        setIsLoading(false);
    }, 800);
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

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowLanding(false);
  };

  // ----------------------------------------------------------------------
  // VIEW 1: PATIENT DASHBOARD (Logged In)
  // ----------------------------------------------------------------------
  if (user) {
    const myAppointments = appointments.filter(a => a.patientId === user.id || a.patientId === 'p1'); 
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-slate-50">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <HeartPulse className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">CarePulse</h1>
                    <p className="text-slate-500 text-sm">Patient Portal • {user.name}</p>
                </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setUser(null)}>Log Out</Button>
              <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                <Plus className="w-4 h-4 mr-2" /> New Appointment
              </Button>
            </div>
        </header>

        <section className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
              <Activity className="w-5 h-5 text-blue-600" />
              Your Appointments
            </h2>
            {myAppointments.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
                <p>No appointments found.</p>
                <Button variant="link" onClick={() => setIsModalOpen(true)} className="mt-2 text-blue-600">
                    Book your first one today
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {myAppointments.map(apt => {
                      const doc = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
                      return (
                          <div key={apt.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <div className="relative">
                                        <img src={doc?.image} alt={doc?.name} className="w-12 h-12 rounded-full object-cover border border-slate-100 bg-slate-100"/>
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                                      </div>
                                      <div>
                                          <p className="font-bold text-slate-900">{doc?.name}</p>
                                          <p className="text-xs text-slate-500 font-medium">{doc?.specialty}</p>
                                      </div>
                                  </div>
                                  <StatusBadge status={apt.status} />
                              </div>
                              <div className="space-y-3 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="p-2 bg-slate-50 rounded-md group-hover:bg-slate-100 transition-colors">
                                        <CalIcon className="w-4 h-4 text-slate-500"/> 
                                    </div>
                                    <span className="font-medium">{formatDateTime(apt.date).dateOnly}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="p-2 bg-slate-50 rounded-md group-hover:bg-slate-100 transition-colors">
                                        <Clock className="w-4 h-4 text-slate-500"/> 
                                    </div>
                                    <span className="font-medium">{apt.time}</span>
                                </div>
                              </div>
                          </div>
                      )
                  })}
              </div>
            )}
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

  // ----------------------------------------------------------------------
  // VIEW 2: LANDING PAGE (Not Logged In, showLanding = true)
  // ----------------------------------------------------------------------
  if (showLanding) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
            <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight cursor-pointer" onClick={() => setShowLanding(true)}>
                <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-lg shadow-blue-600/20">
                    <HeartPulse className="w-5 h-5" />
                </div>
                CarePulse
            </div>
            <div className="flex items-center gap-4">
                 <Button onClick={() => openAuth('signin')} variant="ghost" className="hidden sm:flex hover:bg-slate-50 text-slate-600 font-medium">
                    Log In
                 </Button>
                 <Button onClick={() => openAuth('signup')} className="rounded-full bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 px-6">
                    Sign Up
                 </Button>
            </div>
        </nav>

        {/* Hero Section */}
        <main className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white -z-10"></div>
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                            </span>
                            Smart Healthcare Management
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                            The Pulse of <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                Your Health.
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Streamline your medical experience. Book appointments with top specialists, access your records, and manage your health journey in one secure place.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <Button size="lg" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20" onClick={() => openAuth('signup')}>
                                Get Started <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto bg-white hover:bg-slate-50 border-slate-200 text-slate-700" onClick={() => openAuth('signin')}>
                                Patient Login
                            </Button>
                        </div>
                        
                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
                            <span className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-blue-600" /> Verified Doctors</span>
                            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-slate-900" /> HIPAA Compliant</span>
                            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> 4.9/5 Rating</span>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-slate-50 rounded-[2.5rem] transform rotate-3 scale-105 -z-10 opacity-60"></div>
                        <div className="bg-white p-3 rounded-[2rem] shadow-2xl border border-slate-100 relative">
                            <img 
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
                                alt="Medical Professional" 
                                className="rounded-[1.5rem] w-full h-auto object-cover grayscale-[10%]"
                            />
                            {/* Floating Card */}
                            <div className="absolute bottom-8 -left-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-100 max-w-[260px] animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Stethoscope className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">Dr. Sarah Johnson</p>
                                        <p className="text-xs text-slate-500">Cardiologist • Available Today</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <div className="h-2 w-16 bg-blue-500 rounded-full"></div>
                                    <div className="h-2 w-8 bg-slate-200 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* Features Section */}
        <section className="py-24 bg-white">
             <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Why CarePulse?</h2>
                    <p className="mt-4 text-slate-600 text-lg">We've redesigned the healthcare experience to put you in control.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                   {[
                      {
                        icon: <CalIcon className="w-6 h-6 text-white" />,
                        title: "Instant Scheduling",
                        desc: "Say goodbye to hold music. View real-time availability and book appointments instantly."
                      },
                      {
                        icon: <Shield className="w-6 h-6 text-white" />,
                        title: "Secure Health Records",
                        desc: "Your data is encrypted with bank-level security. Access your history anytime, anywhere."
                      },
                      {
                        icon: <HeartPulse className="w-6 h-6 text-white" />,
                        title: "Proactive Care",
                        desc: "Automated reminders and health tracking help you stay on top of your wellness journey."
                      }
                   ].map((feature, i) => (
                      <div key={i} className="group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          <div className="w-12 h-12 bg-slate-900 group-hover:bg-blue-600 transition-colors rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-slate-900/10 group-hover:shadow-blue-600/20">
                              {feature.icon}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                      </div>
                   ))}
                </div>
             </div>
        </section>

        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <HeartPulse className="w-5 h-5 text-white" />
                    </div>
                    CarePulse
                </div>
                <p className="text-sm">© 2024 CarePulse Health Inc. All rights reserved.</p>
                <div className="flex gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
                </div>
            </div>
        </footer>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW 3: LOGIN / SIGNUP FORM (Not Logged In, showLanding = false)
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
       {/* Background pattern */}
       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

       <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 relative z-10 animate-in zoom-in-95 duration-300">
           {/* Header */}
           <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent"></div>
                <div className="relative z-10">
                    <div className="mx-auto bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30 ring-4 ring-white/10">
                        <HeartPulse className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-slate-400 mt-2 text-sm">
                        {authMode === 'signin' 
                            ? 'Enter your phone number to access your account.' 
                            : 'Join CarePulse to manage your health journey.'}
                    </p>
                </div>
           </div>

           {/* Form */}
           <div className="p-8 pt-6">
               <form onSubmit={handleLogin} className="space-y-6">
                   <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700 ml-1">Phone Number</label>
                       <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="+1 (555) 000-0000" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                                type="tel"
                                autoFocus
                            />
                       </div>
                   </div>
                   
                   <Button 
                        type="submit" 
                        className="w-full h-11 text-base bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/10" 
                        disabled={isLoading}
                   >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                Verifying...
                            </span>
                        ) : (authMode === 'signin' ? 'Sign In' : 'Get Started')}
                   </Button>

                   <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500 font-medium tracking-wider">Or</span></div>
                   </div>
                   
                   <div className="text-center space-y-4">
                        {authMode === 'signin' ? (
                            <p className="text-sm text-slate-600">
                                New to CarePulse?{' '}
                                <button type="button" onClick={() => setAuthMode('signup')} className="font-semibold text-blue-600 hover:underline">
                                    Sign Up
                                </button>
                            </p>
                        ) : (
                             <p className="text-sm text-slate-600">
                                Already have an account?{' '}
                                <button type="button" onClick={() => setAuthMode('signin')} className="font-semibold text-blue-600 hover:underline">
                                    Log In
                                </button>
                            </p>
                        )}
                        
                        <div className="pt-2">
                             <button 
                                type="button" 
                                onClick={() => setShowLanding(true)}
                                className="text-xs text-slate-400 hover:text-slate-600"
                            >
                                Return to Home
                            </button>
                        </div>
                   </div>
               </form>
           </div>
       </div>
    </div>
  );
}