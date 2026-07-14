"use client";

import { PackageCheck, Package, Truck, Home, ClipboardCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui-bits";

export default function Page() {
  const steps = [
    { i: ClipboardCheck, t: "تم استلام الطلب", d: "٢ يوليو ٢٠٢٦ • ١٠:٣٢ ص", done: true },
    { i: Package, t: "قيد التجهيز", d: "٢ يوليو ٢٠٢٦ • ٠٢:١٥ م", done: true },
    { i: Truck, t: "تم الشحن", d: "٣ يوليو ٢٠٢٦ • ٠٩:٠٠ ص", done: true },
    { i: Home, t: "خرج للتوصيل", d: "قريباً", done: false, current: true },
    { i: PackageCheck, t: "تم التوصيل", d: "متوقع خلال ٢٤ ساعة", done: false },
  ];
  return (
    <PageShell title="تتبع الطلب" description="تابع طلبك خطوة بخطوة" breadcrumbs={[{ l: "تتبع الطلب" }]}>
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-4">
        <input placeholder="رقم الطلب أو رقم الموبايل" className="flex-1 rounded-full border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" />
        <button className="rounded-full bg-azm-gold px-6 py-3 text-sm font-bold text-azm-black">تتبع</button>
      </div>

      <div className="rounded-3xl border border-white/5 bg-azm-charcoal/30 p-6 sm:p-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-azm-gold">طلب رقم</div>
            <div className="mt-1 font-display text-2xl font-black">AZM-2026-0142</div>
          </div>
          <Badge tone="blue">قيد التوصيل</Badge>
        </div>
        <div className="mt-8 space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`grid h-11 w-11 place-items-center rounded-full ${s.done ? "bg-emerald-500/15 text-emerald-400" : s.current ? "bg-azm-gold text-azm-black" : "border border-white/10 text-white/30"}`}><s.i className="h-5 w-5" /></div>
                {i < steps.length - 1 && <div className={`mt-2 h-16 w-px ${s.done ? "bg-emerald-500/50" : "bg-white/10"}`} />}
              </div>
              <div className="flex-1 pb-4">
                <div className={`text-base font-bold ${s.done || s.current ? "text-white" : "text-white/40"}`}>{s.t}</div>
                <div className="text-sm text-white/50">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
