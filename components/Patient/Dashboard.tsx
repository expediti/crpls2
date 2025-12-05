import React, { useState } from 'react';
import Link from 'next/link';
import { User, Appointment } from '@/lib/Type';
import { Button } from '@/components/ui/Button';
import { HeartPulse, Plus, Calendar, Clock, LogOut } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { AppointmentModal } from '@/components/AppointmentModal';
import { formatDateTime } from '@/lib/utils';
import { MOCK_DOCTORS } from '@/constants';

interface DashboardProps {
  user: User;
  appointments: Appointment[];
  onLogout: () => void;
  onBookAppointment: (data: any) => void;
  onCancelAppointment: (id: string) => void;
}

export const PatientDashboard: React.FC<DashboardProps> = ({ 
  user, appointments, onLogout, onBookAppointment, onCancelAppointment 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const myAppointments = appointments.filter(a => a.patientId === user.id || a.patientId === 'p1'); // Include mock data for demo

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <HeartPulse className="w-6 h-6 text-green-600" />
            <span className="font-bold text-lg text-slate-900">CarePulse</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">Patient</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Your Appointments</h1>
             <p className="text-slate-500">Manage your upcoming visits and history.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
            <Plus className="w-4 h-4 mr-2" /> New Appointment
          </Button>
        </div>

        {myAppointments.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
             <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-slate-900">No appointments yet</h3>
             <p className="text-slate-500 mb-6">Book your first medical checkup today.</p>
             <Button onClick={() => setIsModalOpen(true)}>Book Now</Button>
           </div>
        ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {myAppointments.map(apt => {
               const doc = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
               return (
                 <div key={apt.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-3">
                          <img src={doc?.image} alt="" className="w-10 h-10 rounded-full bg-slate-100 object-cover" />
                          <div>
                            <p className="font-bold text-sm text-slate-900">{doc?.name}</p>
                            <p className="text-xs text-slate-500">{doc?.specialty}</p>
                          </div>
                       </div>
                       <StatusBadge status={apt.status} />
                    </div>
                    
                    <div className="space-y-2 py-4 border-t border-b border-slate-50 my-2">
                       <div className="flex items-center gap-2 text-sm text-slate-600">
                         <Calendar className="w-4 h-4 text-slate-400" />
                         {formatDateTime(apt.date).dateOnly}
                       </div>
                       <div className="flex items-center gap-2 text-sm text-slate-600">
                         <Clock className="w-4 h-4 text-slate-400" />
                         {apt.time}
                       </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      {apt.status !== 'cancelled' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => onCancelAppointment(apt.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                 </div>
               )
             })}
           </div>
        )}
      </main>

      {/* Dashboard Footer */}
      <footer className="py-6 text-center text-sm text-slate-400 border-t border-slate-200 bg-white">
        <p>© 2024 CarePulse. Created by <span className="font-medium text-slate-500">Nidhi and Kashish</span>.</p>
      </footer>

      <AppointmentModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        userId={user.id}
        onAppointmentCreated={onBookAppointment}
      />
    </div>
  );
};