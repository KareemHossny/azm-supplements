"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
import { getOrders, type OrderRow } from "@/lib/supabase/orders";

const statusMap: Record<string, { label: string; tone: "blue" | "gold" | "green" | "red" | "gray" }> = {
  new: { label: "جديد", tone: "blue" },
  pending: { label: "معلق", tone: "gold" },
  processing: { label: "قيد التجهيز", tone: "gold" },
  shipped: { label: "مشحون", tone: "green" },
  delivered: { label: "مكتمل", tone: "green" },
  cancelled: { label: "ملغي", tone: "red" },
};

export default function Page() {
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => {});
  }, []);

  const fmtDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("ar-EG", { day: "numeric", month: "short" });
  };

  return (
    <AdminShell title="الطلبات">
      <div className="mb-4 flex flex-wrap gap-2">
        {["الكل", "جديد", "قيد التجهيز", "مشحون", "مكتمل", "ملغي"].map((s, i) => (
          <button key={s} className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${i === 0 ? "border-azm-gold bg-azm-gold text-azm-black" : "border-white/10 text-white/70"}`}>{s}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50">
            <tr><th className="p-3">رقم</th><th className="p-3">العميل</th><th className="p-3">التاريخ</th><th className="p-3">الإجمالي</th><th className="p-3">الحالة</th><th className="p-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {orders.map(o => {
              const s = statusMap[o.status] || { label: o.status, tone: "gray" as const };
              return (
                <tr key={o.id} className="hover:bg-white/[0.02]">
                  <td className="p-3 font-bold">{o.order_number}</td>
                  <td className="p-3 text-white/80">{o.customer_name}</td>
                  <td className="p-3 text-white/60">{fmtDate(o.created_at)}</td>
                  <td className="p-3 font-bold text-azm-gold">{o.total.toLocaleString("ar-EG")} ج.م</td>
                  <td className="p-3"><Badge tone={s.tone}>{s.label}</Badge></td>
                  <td className="p-3"><Link href={"/admin/orders/" + o.id} className="text-azm-gold hover:underline">عرض</Link></td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-white/40">لا توجد طلبات</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
