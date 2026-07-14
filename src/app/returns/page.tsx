import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الإرجاع — AZM",
};

export default function Page() {
  return (
    <PageShell eyebrow="Policy" title="سياسة الإرجاع والاستبدال" breadcrumbs={[{ l: "الإرجاع" }]}>
      <div className="grid gap-4 sm:grid-cols-3">
        {[{n:"١",t:"مدة الإرجاع",d:"١٤ يوم من الاستلام"},{n:"٢",t:"حالة المنتج",d:"مغلق وبحالته الأصلية"},{n:"٣",t:"استرداد المبلغ",d:"خلال ٧ أيام عمل"}].map(s => (
          <div key={s.n} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <div className="font-display text-4xl font-black gold-text">{s.n}</div>
            <div className="mt-3 font-bold">{s.t}</div>
            <div className="mt-1 text-sm text-white/60">{s.d}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
