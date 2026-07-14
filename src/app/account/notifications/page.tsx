import { Package, Tag, Bell } from "lucide-react"

export default function Notifications() {
  const list = [
    { i: Package, t: "تم شحن طلبك AZM-0142", d: "منذ ساعتين", u: true },
    { i: Tag, t: "خصم ٢٠٪ على الواي بروتين", d: "أمس", u: true },
    { i: Bell, t: "منتجك المفضل متوفر الآن", d: "منذ ٣ أيام", u: false },
  ]
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">الإشعارات</h2>
      <div className="space-y-2">
        {list.map((n, i) => (
          <div key={i} className={`flex items-start gap-4 rounded-2xl border p-4 ${n.u ? "border-azm-gold/30 bg-azm-gold/5" : "border-white/5 bg-azm-charcoal/40"}`}>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-azm-gold/15 text-azm-gold"><n.i className="h-4 w-4" /></div>
            <div className="flex-1"><div className="font-bold">{n.t}</div><div className="text-xs text-white/50">{n.d}</div></div>
            {n.u && <span className="mt-2 h-2 w-2 rounded-full bg-azm-gold" />}
          </div>
        ))}
      </div>
    </div>
  )
}
