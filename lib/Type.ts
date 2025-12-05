export type UserRole = 'patient' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  medicalHistory?: string;
  age?: number;
  identificationUrl?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availability: string[];
}

export type AppointmentStatus = 'scheduled' | 'pending' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
}

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}