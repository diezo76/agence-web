"use client";

import type { ReactNode } from "react";

interface StatCardProps {
  value: string | number | ReactNode;
  label: string;
  suffix?: string;
  className?: string;
}

export function StatCard({ value, label, suffix = "", className }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm sm:p-5 md:p-6 ${className ?? ""}`}
    >
      <p className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        {value}
        {suffix}
      </p>
      <p className="mt-1 text-xs text-gray-400 sm:text-sm">{label}</p>
    </div>
  );
}
