import React, { useState } from 'react';
import { MOCK_DOCTORS } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface AppointmentFormProps {
  userId: string;
  type: string;
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ userId, onSuccess, onCancel }) => {
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId || !date || !time) return;

    onSuccess({
      doctorId,
      date,
      time,
      notes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div>
         <h2 className="text-xl font-bold text-slate-900">New Appointment</h2>
         <p className="text-sm text-slate-500">Book a visit in seconds.</p>
       </div>

       <div className="space-y-2">
         <label className="text-sm font-medium">Select Specialist</label>
         <select 
           className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
           value={doctorId}
           onChange={e => setDoctorId(e.target.value)}
           required
         >
           <option value="">Select Doctor...</option>
           {MOCK_DOCTORS.map(d => (
             <option key={d.id} value={d.id}>{d.name} - {d.specialty}</option>
           ))}
         </select>
       </div>

       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
           <label className="text-sm font-medium">Date</label>
           <Input 
             type="date" 
             value={date} 
             onChange={e => setDate(e.target.value)} 
             required 
             min={new Date().toISOString().split('T')[0]}
           />
         </div>
         <div className="space-y-2">
           <label className="text-sm font-medium">Time</label>
           <select
             className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
             value={time}
             onChange={e => setTime(e.target.value)}
             disabled={!doctor}
             required
           >
             <option value="">Select Time...</option>
             {doctor?.availability.map(t => (
               <option key={t} value={t}>{t}</option>
             ))}
           </select>
         </div>
       </div>

       <div className="space-y-2">
         <label className="text-sm font-medium">Reason for Visit</label>
         <textarea 
           className="w-full min-h-[80px] p-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
           placeholder="Brief description of symptoms..."
           value={notes}
           onChange={e => setNotes(e.target.value)}
         />
       </div>

       <div className="flex gap-3 pt-2">
         <Button type="button" variant="outline" className="w-full" onClick={onCancel}>Cancel</Button>
         <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Confirm Booking</Button>
       </div>
    </form>
  );
};