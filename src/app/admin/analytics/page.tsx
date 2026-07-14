import { AdminShell } from "@/components/admin-shell";
import { StatCard } from "@/components/ui-bits";
export default function Page() {
  return (
    <AdminShell title="التحليلات">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="الإيرادات (الشهر)" value="١.٢م ج.م" delta="+22%" tone="up" />
        <StatCard label="متوسط الطلب" value="١,٤٥٠ ج.م" delta="+5%" tone="up" />
        <StatCard label="معدل التحويل" value="٣.٢٪" delta="+0.4%" tone="up" />
        <StatCard label="عملاء عائدون" value="٤٨٪" delta="-2%" tone="down" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-6 font-display text-lg font-black">الإيرادات (٦ شهور)</h3>
          <div className="flex h-64 items-end gap-3">
            {[60,75,85,70,95,110].map((h, i) => <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-azm-gold to-azm-gold/40" style={{ height: `${h}%` }} />)}
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-6 font-display text-lg font-black">أكثر الفئات مبيعاً</h3>
          <div className="space-y-3">
            {[{n:"بروتين",p:45},{n:"إكسسوارات",p:22},{n:"كرياتين",p:18},{n:"بري وركاوت",p:15}].map(c => (
              <div key={c.n}>
                <div className="mb-1 flex justify-between text-sm"><span>{c.n}</span><span className="text-azm-gold font-bold">{c.p}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full bg-azm-gold" style={{ width: `${c.p}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
