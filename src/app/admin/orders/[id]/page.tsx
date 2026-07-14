"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
import { getOrderById, updateOrderStatus, type OrderRow, type OrderItemRow } from "@/lib/supabase/orders";

const statusMap: Record<string, { label: string; tone: "blue" | "gold" | "green" | "red" | "gray" }> = {
  new: { label: "جديد", tone: "blue" },
  pending: { label: "معلق", tone: "gold" },
  processing: { label: "قيد التجهيز", tone: "gold" },
  shipped: { label: "مشحون", tone: "green" },
  delivered: { label: "مكتمل", tone: "green" },
  cancelled: { label: "ملغي", tone: "red" },
};

const statusList = ["new", "pending", "processing", "shipped", "delivered", "cancelled"] as const;

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<OrderRow | null>(null);
  const [items, setItems] = useState<OrderItemRow[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    getOrderById(id)
      .then((data) => {
        setOrder(data.order);
        setItems(data.items);
        setCurrentStatus(data.order.status);
      })
      .catch(() => {});
  }, [id]);

  const handleStatusChange = useCallback(async (status: string) => {
    try {
      await updateOrderStatus(id, status as OrderRow["status"]);
      setCurrentStatus(status);
      setOrder((prev) => prev ? { ...prev, status: status as OrderRow["status"] } : prev);
    } catch {
      /* ignore */
    }
  }, [id]);

  if (!order) {
    return (
      <AdminShell title="الطلبات">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6 text-center text-white/50">جاري تحميل الطلب...</div>
      </AdminShell>
    );
  }

  const s = statusMap[currentStatus] || { label: currentStatus, tone: "gray" as const };

  return (
    <AdminShell title={`طلب ${order.order_number}`} actions={<><Link href="/admin/orders" className="rounded-full border border-white/10 px-5 py-2 text-sm">للقائمة</Link><button className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black">طباعة الفاتورة</button></>}>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <div className="mb-4 flex items-center justify-between"><h3 className="font-bold">المنتجات</h3><Badge tone={s.tone}>{s.label}</Badge></div>
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b border-white/5 py-3 last:border-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-azm-black/40 text-lg font-bold text-azm-gold">{item.quantity}</div>
                <div className="flex-1"><div className="font-bold text-sm">{item.product_name}</div><div className="text-xs text-white/50">SKU: {item.product_id ? item.product_id.slice(0, 8) : "—"} • ×{item.quantity}</div></div>
                <div className="font-bold text-azm-gold">{item.product_price.toLocaleString("ar-EG")} ج.م</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-4 font-bold">تحديث الحالة</h3>
            <div className="flex flex-wrap gap-2">
              {statusList.map((statusKey) => {
                const st = statusMap[statusKey] || { label: statusKey };
                return (
                  <button
                    key={statusKey}
                    onClick={() => handleStatusChange(statusKey)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${currentStatus === statusKey ? "border-azm-gold bg-azm-gold text-azm-black" : "border-white/10"}`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-3 font-bold">العميل</h3>
            <p className="text-sm text-white/70">
              {order.customer_name}<br />
              {order.customer_email || "—"}<br />
              {order.customer_phone || "—"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-3 font-bold">العنوان</h3>
            <p className="text-sm text-white/70">
              {order.governorate}{order.city ? `، ${order.city}` : ""}<br />
              {order.address}
              {order.landmark ? <><br />{order.landmark}</> : ""}
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-3 font-bold">ملخص الطلب</h3>
            <div className="space-y-1 text-sm text-white/70">
              <div className="flex justify-between"><span>المجموع الفرعي</span><span>{order.subtotal.toLocaleString("ar-EG")} ج.م</span></div>
              <div className="flex justify-between"><span>الشحن</span><span>{order.shipping_fee.toLocaleString("ar-EG")} ج.م</span></div>
              {order.discount > 0 && <div className="flex justify-between"><span>الخصم</span><span className="text-red-400">-{order.discount.toLocaleString("ar-EG")} ج.م</span></div>}
              <div className="flex justify-between border-t border-white/10 pt-1 font-bold text-white"><span>الإجمالي</span><span className="text-azm-gold">{order.total.toLocaleString("ar-EG")} ج.م</span></div>
            </div>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
