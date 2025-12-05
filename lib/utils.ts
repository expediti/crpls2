import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return {
    dateOnly: date.toLocaleDateString(),
    timeOnly: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    dateTime: date.toLocaleString(),
  };
};