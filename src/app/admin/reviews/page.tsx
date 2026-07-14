import { Star } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
export default function Page() {
  return (
    <AdminShell title="التقييمات">
      <div className="space-y-3">
        {[{c:"مروان ع.",p:"واي بروتين",r:5,t:"منتج ممتاز جداً",s:"منشور",tone:"green"},{c:"أحمد م.",p:"كرياتين",r:4,t:"جيد لكن التغليف ممكن أحسن",s:"قيد المراجعة",tone:"gold"},{c:"سارة",p:"شيكر",r:2,t:"جودة أقل من المتوقع",s:"مرفوض",tone:"red"}].map((r, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2"><span className="font-bold">{r.c}</span><span className="text-xs text-white/50">على {r.p}</span></div>
                <div className="mt-1 flex text-azm-gold">{Array.from({length:5}).map((_,j) => <Star key={j} className={`h-3.5 w-3.5 ${j<r.r?"fill-current":""}`} />)}</div>
              </div>
              <Badge tone={r.tone as "green"|"gold"|"red"}>{r.s}</Badge>
            </div>
            <p className="mt-3 text-sm text-white/70">{r.t}</p>
            <div className="mt-4 flex gap-2"><button className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400">قبول</button><button className="rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-400">رفض</button></div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
