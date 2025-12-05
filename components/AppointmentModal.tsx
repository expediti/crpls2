import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AppointmentForm } from '@/components/forms/AppointmentForm';

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onAppointmentCreated: (data: any) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
  open, onOpenChange, userId, onAppointmentCreated 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-slate-100">
        <AppointmentForm 
          userId={userId} 
          type="create" 
          onSuccess={(data) => {
            onAppointmentCreated(data);
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};