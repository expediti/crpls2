import React from 'react';
import { AppointmentStatus } from '@/lib/Type';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

export const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const styles = {
    scheduled: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-slate-100 text-slate-800",
  };

  const icons = {
    scheduled: Calendar,
    pending: Clock,
    cancelled: XCircle,
    completed: CheckCircle,
  };

  const Icon = icons[status];

  return (
    <div className={cn("flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit", styles[status])}>
      <Icon className="w-3 h-3" />
      <span className="capitalize">{status}</span>
    </div>
  );
};