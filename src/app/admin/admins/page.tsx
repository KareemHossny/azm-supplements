import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
export default function Page() {
  return (
    <AdminShell title="المشرفون والصلاحيات" actions={<button className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> مشرف جديد</button>}>
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50"><tr><th className="p-3">المشرف</th><th className="p-3">الدور</th><th className="p-3">آخر دخول</th><th className="p-3">الحالة</th></tr></thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {[{n:"مروان",r:"مدير عام",l:"اليوم",s:"نشط",tone:"green"},{n:"سارة",r:"مدير طلبات",l:"أمس",s:"نشط",tone:"green"},{n:"عمرو",r:"دعم",l:"منذ أسبوع",s:"معطل",tone:"red"}].map(a => (
              <tr key={a.n}><td className="p-3"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-azm-gold/15 font-bold text-azm-gold">{a.n[0]}</div><span className="font-bold">{a.n}</span></div></td><td className="p-3"><Badge tone="gold">{a.r}</Badge></td><td className="p-3 text-white/60">{a.l}</td><td className="p-3"><Badge tone={a.tone as "green"|"red"}>{a.s}</Badge></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <h3 className="mb-4 font-display text-lg font-black">الأدوار والصلاحيات</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {["مدير عام","مدير طلبات","دعم","محرر محتوى"].map(r => (
            <div key={r} className="rounded-xl border border-white/5 bg-azm-black/40 p-4"><div className="font-bold">{r}</div><div className="mt-1 text-xs text-white/50">صلاحيات مخصصة</div></div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
