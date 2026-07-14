"use client"
import { use } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui-bits"
import { products } from "@/lib/products"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/account/orders" className="text-xs text-white/50 hover:text-azm-gold">← كل الطلبات</Link>
          <h2 className="mt-2 font-display text-2xl font-black">طلب {id}</h2>
        </div>
        <Badge tone="blue">قيد التوصيل</Badge>
      </div>
      <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <h3 className="mb-4 font-bold">المنتجات</h3>
        <div className="space-y-3">
          {products.slice(0, 3).map(p => (
            <div key={p.id} className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0">
              <img src={p.image} className="h-14 w-14 rounded-lg object-cover" alt="" />
              <div className="flex-1"><div className="font-bold">{p.name}</div><div className="text-xs text-white/50">الكمية: ١</div></div>
              <div className="font-bold text-azm-gold">{p.price} ج.م</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6"><h3 className="mb-3 font-bold">عنوان الشحن</h3><p className="text-sm text-white/70">مروان عبد الرحمن<br/>القاهرة، مدينة نصر<br/>01xxxxxxxxx</p></div>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-3 font-bold">الإجمالي</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/70"><span>الفرعي</span><span>1,760 ج.م</span></div>
            <div className="flex justify-between text-white/70"><span>الشحن</span><span>40 ج.م</span></div>
            <div className="flex justify-between border-t border-white/5 pt-2 font-bold text-azm-gold"><span>الإجمالي</span><span>1,850 ج.م</span></div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Link href="/track" className="rounded-full bg-azm-gold px-6 py-3 text-sm font-bold text-azm-black">تتبع الطلب</Link>
        <button className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold">إعادة الطلب</button>
      </div>
    </div>
  )
}
