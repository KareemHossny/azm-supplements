"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui-bits"
import { getOrders, type OrderRow } from "@/lib/supabase/orders"

export default function Orders() {
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    getOrders().then(setOrders).catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">طلباتي</h2>
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-8 text-center text-white/50">لا توجد طلبات بعد</div>
      ) : (
      <div className="space-y-3">
        {orders.map(o => (
          <Link key={o.id} href={`/account/orders/${o.id}`} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5 transition hover:border-azm-gold/30">
            <div>
              <div className="font-display text-lg font-black">{o.order_number}</div>
              <div className="text-xs text-white/50">{new Date(o.created_at).toLocaleDateString("ar-EG")}</div>
            </div>
            <Badge tone={o.status === "delivered" ? "green" : o.status === "cancelled" ? "red" : "blue"}>{o.status}</Badge>
            <div className="font-black text-azm-gold">{Number(o.total).toLocaleString("ar-EG")} ج.م</div>
          </Link>
        ))}
      </div>
      )}
    </div>
  )
}
