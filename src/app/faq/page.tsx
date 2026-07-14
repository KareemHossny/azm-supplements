"use client";

import { ChevronDown } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export default function Page() {
  const groups = [
    { title: "الطلبات والشحن", items: [{q:"كم مدة الشحن؟",a:"١-٢ يوم للقاهرة والجيزة، و٢-٥ أيام لباقي المحافظات."},{q:"هل الشحن مجاني؟",a:"للطلبات فوق ١٥٠٠ ج.م الشحن مجاني."}] },
    { title: "الدفع", items: [{q:"طرق الدفع المتاحة؟",a:"كاش عند الاستلام، فيزا/ماستركارد، محفظة، وتحويل بنكي."}] },
    { title: "الإرجاع", items: [{q:"مدة الإرجاع؟",a:"١٤ يوم من الاستلام مع الحفاظ على المنتج مغلق."}] },
  ];
  return (
    <PageShell eyebrow="FAQ" title="الأسئلة الشائعة" breadcrumbs={[{ l: "الأسئلة" }]}>
      <div className="space-y-8">
        {groups.map(g => (
          <div key={g.title}>
            <h3 className="mb-3 font-display text-xl font-black gold-text">{g.title}</h3>
            <div className="space-y-2">
              {g.items.map(f => (
                <details key={f.q} className="group rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5 open:border-azm-gold/30">
                  <summary className="flex cursor-pointer items-center justify-between font-bold text-white">{f.q}<ChevronDown className="h-4 w-4 text-azm-gold group-open:rotate-180" /></summary>
                  <p className="mt-3 text-sm text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
