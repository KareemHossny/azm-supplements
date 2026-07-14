import { Ticket } from "lucide-react"

export default function Coupons() {
  const c = [
    { code: "AZM10", d: "خصم ١٠٪ على كل الطلب", exp: "٣١ يوليو ٢٠٢٦" },
    { code: "SHIP0", d: "شحن مجاني للقاهرة والجيزة", exp: "١٥ أغسطس ٢٠٢٦" },
  ]
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">الكوبونات</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {c.map(x => (
          <div key={x.code} className="relative overflow-hidden rounded-2xl border border-azm-gold/30 bg-gradient-to-l from-azm-gold/10 to-transparent p-5">
            <Ticket className="absolute -left-4 -bottom-4 h-24 w-24 text-azm-gold/10" />
            <div className="text-xs font-bold uppercase text-azm-gold">كود</div>
            <div className="mt-1 font-display text-3xl font-black text-white">{x.code}</div>
            <div className="mt-2 text-sm text-white/70">{x.d}</div>
            <div className="mt-3 text-xs text-white/50">صالح حتى {x.exp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
