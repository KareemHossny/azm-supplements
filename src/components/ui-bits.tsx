"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { PackageOpen } from "lucide-react";

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
  actionTo = "/shop",
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: string;
  actionTo?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-azm-charcoal/20 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full border border-azm-gold/30 bg-azm-gold/5 text-azm-gold">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-black text-white">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-white/60">{description}</p>}
      {action && (
        <Link href={actionTo} className="mt-6 rounded-full bg-azm-gold px-6 py-3 text-sm font-bold text-azm-black transition hover:bg-azm-sand">
          {action}
        </Link>
      )}
    </div>
  );
}

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${active ? "border-azm-gold bg-azm-gold text-azm-black" : "border-white/10 bg-white/[0.03] text-white/70 hover:border-azm-gold/40 hover:text-white"}`}>
      {children}
    </button>
  );
}

export function StatCard({ label, value, delta, tone = "default" }: { label: string; value: string; delta?: string; tone?: "default" | "up" | "down" }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{label}</div>
      <div className="mt-3 font-display text-3xl font-black text-white">{value}</div>
      {delta && (
        <div className={`mt-2 text-xs font-semibold ${tone === "up" ? "text-emerald-400" : tone === "down" ? "text-red-400" : "text-white/50"}`}>{delta}</div>
      )}
    </div>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "green" | "red" | "blue" | "gray" }) {
  const map: Record<string, string> = {
    gold: "bg-azm-gold/15 text-azm-gold border-azm-gold/30",
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    red: "bg-red-500/15 text-red-400 border-red-500/30",
    blue: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    gray: "bg-white/5 text-white/60 border-white/10",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map[tone]}`}>{children}</span>;
}