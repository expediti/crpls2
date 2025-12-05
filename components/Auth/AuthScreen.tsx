import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HeartPulse, ArrowLeft } from 'lucide-react';
import { User } from '@/lib/Type';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  
  // Form State
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API
    setTimeout(() => {
      // Check Admin
      if (phone === '0000') {
         window.location.href = '/admin'; // Redirect to admin page
         return;
      }

      const user: User = {
        id: 'u-' + Math.random().toString(36),
        name: name || 'Patient User',
        phone: phone,
        role: 'patient',
        medicalHistory: 'None'
      };
      
      onLogin(user);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center relative">
           <button onClick={onBack} className="absolute left-4 top-4 text-slate-400 hover:text-white transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div className="bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
             <HeartPulse className="w-8 h-8 text-white" />
           </div>
           <h2 className="text-2xl font-bold text-white">
             {isRegister ? 'Create Account' : 'Welcome Back'}
           </h2>
           <p className="text-slate-400 text-sm mt-2">
             Enter your details to access CarePulse
           </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
           {isRegister && (
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-700">Full Name</label>
               <Input 
                 placeholder="John Doe" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required={isRegister}
               />
             </div>
           )}
           
           <div className="space-y-2">
             <label className="text-sm font-medium text-slate-700">Phone Number</label>
             <Input 
               placeholder="+1 (555) 000-0000" 
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               required
             />
             <p className="text-xs text-slate-500">Use '0000' for Admin demo</p>
           </div>

           <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
             {loading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Log In')}
           </Button>

           <div className="text-center pt-2">
             <button 
               type="button" 
               onClick={() => setIsRegister(!isRegister)} 
               className="text-sm text-slate-600 hover:text-green-600 font-medium transition-colors"
             >
               {isRegister ? 'Already have an account? Log In' : 'New to CarePulse? Sign Up'}
             </button>
           </div>
        </form>
      </div>

      <div className="mt-8 text-slate-400 text-sm font-medium">
         © 2024 CarePulse • Created by Nidhi and Kashish
      </div>
    </div>
  );
};