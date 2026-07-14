import Link from "next/link"
import { Package, Heart, Ticket, MapPin } from "lucide-react"
import { StatCard, Badge } from "@/components/ui-bits"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="الطلبات" value="١٢" />
        <StatCard label="المفضلة" value="٧" />
        <StatCard label="نقاط الولاء" value="٤٥٠" />
        <StatCard label="كوبونات نشطة" value="٢" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[{l:"طلباتي",to:"/account/orders",i:Package,d:"عرض وتتبع طلباتك"},{l:"المفضلة",to:"/account/wishlist",i:Heart,d:"منتجاتك المحفوظة"},{l:"العناوين",to:"/account/addresses",i:MapPin,d:"إدارة عناوين الشحن"},{l:"الكوبونات",to:"/account/coupons",i:Ticket,d:"أكواد الخصم المتاحة"}].map(c => (
          <Link key={c.to} href={c.to} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5 transition hover:border-azm-gold/30">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-azm-gold/10 text-azm-gold"><c.i className="h-5 w-5" /></div>
            <div><div className="font-bold">{c.l}</div><div className="text-xs text-white/50">{c.d}</div></div>
          </Link>
        ))}
      </div>
      <div>
        <h3 className="mb-4 font-display text-xl font-black">آخر الطلبات</h3>
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <table className="w-full text-right text-sm">
            <thead className="bg-azm-charcoal/50 text-xs uppercase text-white/50">
              <tr><th className="p-3">رقم</th><th className="p-3">التاريخ</th><th className="p-3">الحالة</th><th className="p-3">الإجمالي</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
              {[{n:"AZM-0142",d:"٢ يوليو",s:"قيد التوصيل",t:"1,850",tone:"blue"},{n:"AZM-0128",d:"٢٠ يونيو",s:"مكتمل",t:"3,200",tone:"green"},{n:"AZM-0119",d:"٥ يونيو",s:"مكتمل",t:"850",tone:"green"}].map(o => (
                <tr key={o.n}><td className="p-3 font-bold">{o.n}</td><td className="p-3 text-white/70">{o.d}</td><td className="p-3"><Badge tone={o.tone as "blue"|"green"}>{o.s}</Badge></td><td className="p-3 font-bold text-azm-gold">{o.t} ج.م</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
