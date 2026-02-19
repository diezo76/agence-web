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
      className={`rounded-xl border bg-card p-6 text-center ${className ?? ""}`}
    >
      <p className="text-3xl font-bold text-foreground md:text-4xl">
        {value}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
