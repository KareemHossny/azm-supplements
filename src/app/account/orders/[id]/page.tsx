"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui-bits";
import { getOrderById, type OrderRow, type OrderItemRow } from "@/lib/supabase/orders";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [items, setItems] = useState<OrderItemRow[]>([]);

  useEffect(() => {
    getOrderById(id).then(({ order, items }) => {
      setOrder(order);
      setItems(items || []);
    }).catch(() => {});
  }, [id]);

  if (!order) return <div className="text-center text-white/50 py-10">جاري التحميل...</div>;

  const badgeTone = order.status === "delivered" ? "green" : order.status === "cancelled" ? "red" : "blue";
  const statusLabel = order.status === "new" ? "جديد" : order.status === "processing" ? "قيد التجهيز" : order.status === "shipped" ? "مشحون" : order.status === "delivered" ? "مكتمل" : order.status === "cancelled" ? "ملغي" : "قيد التوصيل";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/account/orders" className="text-xs text-white/50 hover:text-azm-gold">← كل الطلبات</Link>
          <h2 className="mt-2 font-display text-2xl font-black">طلب {order.order_number}</h2>
        </div>
        <Badge tone={badgeTone}>{statusLabel}</Badge>
      </div>
      <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <h3 className="mb-4 font-bold">المنتجات</h3>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0">
              <div className="h-14 w-14 rounded-lg bg-azm-black/40" />
              <div className="flex-1"><div className="font-bold">{item.product_name}</div><div className="text-xs text-white/50">الكمية: {item.quantity}</div></div>
              <div className="font-bold text-azm-gold">{Number(item.product_price).toLocaleString("ar-EG")} ج.م</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-3 font-bold">عنوان الشحن</h3>
          <p className="text-sm text-white/70">{order.customer_name}<br />{order.governorate}{order.city ? `، ${order.city}` : ""}<br />{order.address}<br />{order.customer_phone}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-3 font-bold">الإجمالي</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/70"><span>الفرعي</span><span>{Number(order.subtotal).toLocaleString("ar-EG")} ج.م</span></div>
            <div className="flex justify-between text-white/70"><span>الشحن</span><span>{Number(order.shipping_fee).toLocaleString("ar-EG")} ج.م</span></div>
            {Number(order.discount) > 0 && <div className="flex justify-between text-white/70"><span>الخصم</span><span>-{Number(order.discount).toLocaleString("ar-EG")} ج.م</span></div>}
            <div className="flex justify-between border-t border-white/5 pt-2 font-bold text-azm-gold"><span>الإجمالي</span><span>{Number(order.total).toLocaleString("ar-EG")} ج.م</span></div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Link href="/track" className="rounded-full bg-azm-gold px-6 py-3 text-sm font-bold text-azm-black">تتبع الطلب</Link>
        <button className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold">إعادة الطلب</button>
      </div>
    </div>
  );
}
