"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
import { getOrders, type OrderRow } from "@/lib/supabase/orders";

type CustomerSummary = {
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
};

export default function Page() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);

  useEffect(() => {
    getOrders()
      .then((orders) => {
        const map = new Map<string, CustomerSummary>();
        for (const o of orders) {
          const key = o.customer_phone;
          const existing = map.get(key);
          if (existing) {
            existing.orderCount++;
            existing.totalSpent += o.total;
          } else {
            map.set(key, {
              name: o.customer_name,
              email: o.customer_email,
              phone: o.customer_phone,
              orderCount: 1,
              totalSpent: o.total,
            });
          }
        }
        setCustomers(Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent));
      })
      .catch(() => {});
  }, []);

  return (
    <AdminShell title="العملاء">
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50">
            <tr><th className="p-3">العميل</th><th className="p-3">موبايل</th><th className="p-3">الطلبات</th><th className="p-3">إجمالي المشتريات</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {customers.map(c => (
              <tr key={c.phone}>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-azm-gold/15 font-bold text-azm-gold">{c.name[0]}</div>
                    <div><div className="font-bold">{c.name}</div><div className="text-xs text-white/50">{c.email}</div></div>
                  </div>
                </td>
                <td className="p-3 text-white/70">{c.phone}</td>
                <td className="p-3">{c.orderCount}</td>
                <td className="p-3 font-bold text-azm-gold">{c.totalSpent.toLocaleString("ar-EG")} ج.م</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-white/40">لا يوجد عملاء بعد</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
