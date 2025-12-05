import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormFieldType, Doctor } from '@/lib/Type';
import CustomFormField from '@/components/CustomFormField';
import { Button } from '@/components/ui/button';
import { MOCK_DOCTORS } from '@/constants';
import { User, Calendar } from 'lucide-react';

const formSchema = z.object({
  doctorId: z.string().min(1, "Select a doctor"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  notes: z.string().optional(),
});

interface AppointmentFormProps {
  userId: string;
  type: "create" | "cancel";
  onSuccess: (data: any) => void;
  onCancel?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ userId, type, onSuccess, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorId: '',
      date: '',
      time: '',
      notes: '',
    },
  });

  const selectedDoctorId = form.watch('doctorId');
  const selectedDoctor = MOCK_DOCTORS.find(d => d.id === selectedDoctorId);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSuccess(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">New Appointment</h2>
        <p className="text-slate-500">Request a new appointment in 10 seconds</p>
      </div>

      <CustomFormField
        fieldType={FormFieldType.SELECT}
        control={form.control}
        name="doctorId"
        label="Doctor"
        placeholder="Select a doctor"
      >
        {MOCK_DOCTORS.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </CustomFormField>

      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="date"
          label="Expected Appointment Date"
          className="flex-1"
        />
        
        <CustomFormField
           fieldType={FormFieldType.SELECT}
           control={form.control}
           name="time"
           label="Time Slot"
           placeholder="Select time"
           className="flex-1"
           disabled={!selectedDoctor}
        >
             {selectedDoctor?.availability.map(time => (
               <option key={time} value={time}>{time}</option>
             )) || <option>Select a doctor first</option>}
        </CustomFormField>
      </div>

      <CustomFormField
        fieldType={FormFieldType.TEXTAREA}
        control={form.control}
        name="notes"
        label="Additional Notes"
        placeholder="Describe your symptoms or reason for visit"
      />

      <div className="flex gap-4">
        <Button type="button" variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="w-full">
          Submit Request
        </Button>
      </div>
    </form>
  );
};