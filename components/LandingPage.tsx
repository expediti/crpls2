import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartPulse, ArrowRight, Shield, Clock, Users, CheckCircle, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-green-500 p-1.5 rounded-lg shadow-sm">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">CarePulse</span>
          </Link>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={onGetStarted} className="text-slate-600 hover:text-slate-900">Log In</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 shadow-md shadow-green-600/20" onClick={onGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden flex-grow">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Accepting New Patients
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Healthcare that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                Puts You First.
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Experience the future of medical care. Book appointments with verified specialists, access your history, and manage your health journey in one secure portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-lg shadow-xl shadow-slate-900/10" onClick={onGetStarted}>
                Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-slate-300 hover:bg-slate-50" onClick={onGetStarted}>
                Learn More
              </Button>
            </div>
            <div className="pt-8 flex items-center gap-8 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" /> HIPAA Secure
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" /> Verified Doctors
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-slate-100 rounded-[3rem] transform rotate-3 scale-95" />
            <img 
              src="https://images.unsplash.com/photo-1638202993639-612527d387d2?auto=format&fit=crop&q=80&w=1000"
              alt="Doctor"
              className="relative rounded-[2.5rem] shadow-2xl border border-white"
            />
            {/* Float Card - Moved to right-6 to avoid overlapping text on the left */}
            <div className="absolute bottom-10 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Dr. Sarah Smith</p>
                <p className="text-xs text-slate-500">Cardiologist • Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why CarePulse?</h2>
            <p className="text-slate-500 mt-4">Everything you need for better health management.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Instant Scheduling", desc: "Book appointments in seconds. No more waiting on hold." },
              { icon: Shield, title: "Secure Records", desc: "Your medical data is encrypted and safe with us." },
              { icon: CheckCircle, title: "Top Specialists", desc: "Access a network of verified and highly rated doctors." }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-1 rounded-lg">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">CarePulse</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Empowering your health journey with advanced scheduling and verified specialists.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="hover:text-green-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-green-400 transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-green-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-500" /> support@carepulse.com</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-500" /> 7905623658</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-500" /> Varanasi</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2024 CarePulse. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Created with <span className="text-red-500 animate-pulse">❤️</span> by <span className="text-slate-300 font-medium">Nidhi and Kashish</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};