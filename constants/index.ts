import { Doctor, Appointment } from '@/lib/Type';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    availability: ['09:00', '10:00', '11:00', '14:00', '15:00']
  },
  {
    id: 'd2',
    name: 'Dr. James Wilson',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    availability: ['10:00', '11:30', '13:00', '16:00']
  },
  {
    id: 'd3',
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300',
    availability: ['08:30', '09:30', '10:30', '12:00', '14:30']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd1',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'scheduled',
    notes: 'Regular checkup'
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Jane Smith',
    doctorId: 'd2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00',
    status: 'pending',
    notes: 'Skin rash consultation'
  }
];