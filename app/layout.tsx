import React from 'react';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "CarePulse | Medical Booking System",
  description: "Your health, our priority. Book appointments with top specialists instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-green-100 selection:text-green-900", fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}