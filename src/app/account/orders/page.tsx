import Link from "next/link"
import { Badge } from "@/components/ui-bits"

const orders = [
  { n: "AZM-0142", d: "٢ يوليو ٢٠٢٦", s: "قيد التوصيل", t: 1850, tone: "blue", items: 3 },
  { n: "AZM-0128", d: "٢٠ يونيو ٢٠٢٦", s: "مكتمل", t: 3200, tone: "green", items: 5 },
  { n: "AZM-0119", d: "٥ يونيو ٢٠٢٦", s: "مكتمل", t: 850, tone: "green", items: 1 },
  { n: "AZM-0102", d: "١٨ مايو ٢٠٢٦", s: "ملغي", t: 1200, tone: "red", items: 2 },
]

export default function Orders() {
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">طلباتي</h2>
      <div className="space-y-3">
        {orders.map(o => (
          <Link key={o.n} href={`/account/orders/${o.n}`} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5 transition hover:border-azm-gold/30">
            <div>
              <div className="font-display text-lg font-black">{o.n}</div>
              <div className="text-xs text-white/50">{o.d} • {o.items} منتجات</div>
            </div>
            <Badge tone={o.tone as "blue"|"green"|"red"}>{o.s}</Badge>
            <div className="font-black text-azm-gold">{o.t.toLocaleString("ar-EG")} ج.م</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
