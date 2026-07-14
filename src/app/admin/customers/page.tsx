import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
export default function Page() {
  const c = [
    { n:"مروان عبد الرحمن", e:"marwan@example.com", o:12, t:24500, s:"VIP", tone:"gold" },
    { n:"أحمد الشناوي", e:"ahmed@example.com", o:8, t:15200, s:"نشط", tone:"green" },
    { n:"سارة سعد", e:"sara@example.com", o:3, t:4800, s:"جديد", tone:"blue" },
  ];
  return (
    <AdminShell title="العملاء">
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50"><tr><th className="p-3">العميل</th><th className="p-3">الطلبات</th><th className="p-3">إجمالي المشتريات</th><th className="p-3">الحالة</th></tr></thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {c.map(x => (
              <tr key={x.e}><td className="p-3"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-azm-gold/15 font-bold text-azm-gold">{x.n[0]}</div><div><div className="font-bold">{x.n}</div><div className="text-xs text-white/50">{x.e}</div></div></div></td><td className="p-3">{x.o}</td><td className="p-3 font-bold text-azm-gold">{x.t.toLocaleString("ar-EG")} ج.م</td><td className="p-3"><Badge tone={x.tone as "gold"|"green"|"blue"}>{x.s}</Badge></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
