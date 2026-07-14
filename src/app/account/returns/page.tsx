import { Badge } from "@/components/ui-bits"

export default function Returns() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-black">المرتجعات</h2>
        <button className="rounded-full bg-azm-gold px-5 py-2.5 text-sm font-bold text-azm-black">طلب إرجاع جديد</button>
      </div>
      <div className="space-y-3">
        {[{n:"RET-0021",o:"AZM-0128",r:"منتج تالف",s:"مقبول",tone:"green"},{n:"RET-0018",o:"AZM-0102",r:"طلبت بالغلط",s:"قيد المراجعة",tone:"blue"}].map(r => (
          <div key={r.n} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
            <div><div className="font-bold">{r.n}</div><div className="text-xs text-white/50">طلب {r.o} • {r.r}</div></div>
            <Badge tone={r.tone as "green"|"blue"}>{r.s}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
