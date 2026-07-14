"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, Tag, ShoppingBag } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { EmptyState } from "@/components/ui-bits";
import { useCart } from "@/lib/cart-context";

export default function Page() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const shipping = items.length > 0 ? 50 : 0;
  const discount = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping - discount;

  if (items.length === 0) {
    return (
      <PageShell title="السلة" breadcrumbs={[{ l: "السلة" }]}>
        <EmptyState icon={ShoppingBag} title="سلتك فارغة" description="ابدأ التسوق وأضف منتجاتك المفضلة." action="تسوق الآن" />
      </PageShell>
    );
  }

  return (
    <PageShell title="السلة" description={`${items.length} منتج في السلة`} breadcrumbs={[{ l: "السلة" }]}>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-4">
              <img src={item.image} className="h-28 w-28 rounded-xl object-cover" alt={item.name} />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-azm-gold">{item.brand}</div>
                  <div className="text-base font-bold">{item.name}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/5"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/5"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="text-lg font-black text-azm-gold">{(item.price * item.qty).toLocaleString("ar-EG")} ج.م</div>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="grid h-9 w-9 place-items-center rounded-full text-white/40 hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-azm-gold">← متابعة التسوق</Link>
        </div>

        <aside className="h-fit rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="font-display text-xl font-black">ملخص الطلب</h3>
          <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-azm-black/40 p-1.5 pr-4">
            <Tag className="h-4 w-4 text-azm-gold" />
            <input placeholder="كود الخصم" className="flex-1 bg-transparent text-sm placeholder:text-white/40 focus:outline-none" />
            <button className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold">تطبيق</button>
          </div>
          <div className="mt-6 space-y-3 border-t border-white/5 pt-4 text-sm">
            <div className="flex justify-between text-white/70"><span>المجموع الفرعي</span><span>{subtotal.toLocaleString("ar-EG")} ج.م</span></div>
            <div className="flex justify-between text-white/70"><span>الشحن</span><span>{shipping} ج.م</span></div>
            <div className="flex justify-between text-emerald-400"><span>الخصم</span><span>-{discount} ج.م</span></div>
            <div className="flex justify-between border-t border-white/5 pt-3 text-lg font-black"><span>الإجمالي</span><span className="text-azm-gold">{total.toLocaleString("ar-EG")} ج.م</span></div>
          </div>
          <Link href="/checkout" className="mt-6 block w-full rounded-full bg-azm-gold py-4 text-center text-sm font-bold text-azm-black hover:bg-azm-sand">إتمام الشراء</Link>
        </aside>
      </div>
    </PageShell>
  );
}
