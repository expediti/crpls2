import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A comprehensive medical appointment booking system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-slate-50 font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  );
}