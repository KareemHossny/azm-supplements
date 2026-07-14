import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
export default function Page() {
  const c = [
    { code:"AZM10", type:"نسبة", val:"10%", exp:"31/07/2026", used:145, limit:1000, s:"نشط", tone:"green" },
    { code:"SHIP0", type:"شحن مجاني", val:"—", exp:"15/08/2026", used:80, limit:500, s:"نشط", tone:"green" },
    { code:"NEW50", type:"مبلغ", val:"50 ج.م", exp:"01/07/2026", used:200, limit:200, s:"منتهي", tone:"red" },
  ];
  return (
    <AdminShell title="الكوبونات" actions={<button className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> كوبون جديد</button>}>
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50"><tr><th className="p-3">الكود</th><th className="p-3">النوع</th><th className="p-3">القيمة</th><th className="p-3">الاستخدام</th><th className="p-3">ينتهي</th><th className="p-3">الحالة</th></tr></thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {c.map(x => (
              <tr key={x.code}><td className="p-3 font-mono font-bold text-azm-gold">{x.code}</td><td className="p-3">{x.type}</td><td className="p-3 font-bold">{x.val}</td><td className="p-3">{x.used} / {x.limit}</td><td className="p-3">{x.exp}</td><td className="p-3"><Badge tone={x.tone as "green"|"red"}>{x.s}</Badge></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
