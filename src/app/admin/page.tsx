"use client";

import { useEffect, useState } from "react";
import { TrendingUp, ShoppingCart, Users, Package, AlertTriangle } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { StatCard, Badge } from "@/components/ui-bits";
import { getOrdersStats, getOrders, type OrderRow } from "@/lib/supabase/orders";
import { getProducts, type ProductRow } from "@/lib/supabase/products";

const statusMap: Record<string, { label: string; tone: "blue" | "gold" | "green" | "red" }> = {
  new: { label: "جديد", tone: "blue" },
  pending: { label: "معلق", tone: "gold" },
  processing: { label: "قيد التجهيز", tone: "gold" },
  shipped: { label: "مشحون", tone: "green" },
  delivered: { label: "مكتمل", tone: "green" },
  cancelled: { label: "ملغي", tone: "red" },
};

const dayNames = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

export default function Page() {
  const [stats, setStats] = useState<{ todayRevenue: number; todayOrders: number; pendingOrders: number } | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, ordersData, productsData] = await Promise.all([
          getOrdersStats(),
          getOrders(),
          getProducts(),
        ]);
        setStats(statsData);
        setOrders(ordersData);
        setProducts(productsData);

        const days: number[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          d.setHours(0, 0, 0, 0);
          const end = new Date(d);
          end.setHours(23, 59, 59, 999);
          const dayRevenue = ordersData
            .filter((o) => {
              const created = new Date(o.created_at);
              return created >= d && created <= end;
            })
            .reduce((s, o) => s + o.total, 0);
          days.push(dayRevenue);
        }
        setWeeklyRevenue(days);
      } catch {
        /* fallback — keep defaults */
      }
    }
    fetchData();
  }, []);

  const maxRev = Math.max(...weeklyRevenue, 1);
  const barHeights = weeklyRevenue.map((r) => Math.max(5, (r / maxRev) * 100));

  const lowStockProducts = products.filter((p) => p.stock < 10).slice(0, 3);
  const lowStockCount = products.filter((p) => p.stock < 10).length;
  const topProducts = products.slice(0, 4);

  const fmt = (n: number) => n.toLocaleString("ar-EG");

  return (
    <AdminShell title="لوحة التحكم">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="المبيعات اليوم" value={stats ? `${fmt(stats.todayRevenue)} ج.م` : "—"} delta="من اليوم" tone="up" />
        <StatCard label="الطلبات" value={stats ? `${fmt(stats.todayOrders)}` : "—"} delta={`${stats ? fmt(stats.pendingOrders) : "—"} جديدة`} tone="up" />
        <StatCard label="العملاء" value="١,٢٣٤" delta="+34 هذا الأسبوع" tone="up" />
        <StatCard label="المخزون المنخفض" value={`${lowStockCount}`} delta="يحتاج انتباه" tone="down" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-black">المبيعات (آخر ٧ أيام)</h3>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex h-56 items-end gap-2">
            {barHeights.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-azm-gold to-azm-gold/40" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-white/50">
            {dayNames.map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-4 font-display text-lg font-black">الأكثر مبيعاً</h3>
          <div className="space-y-3 text-sm">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0"><span className="text-white/80">{i + 1}. {p.name}</span><span className="text-azm-gold">{fmt(p.price)}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-display text-lg font-black">آخر الطلبات</h3><ShoppingCart className="h-5 w-5 text-azm-gold" /></div>
          <div className="space-y-2 text-sm">
            {orders.slice(0, 3).map(o => {
              const s = statusMap[o.status] || { label: o.status, tone: "gray" as const };
              return (
                <div key={o.id} className="flex items-center justify-between border-b border-white/5 py-2 last:border-0">
                  <span className="font-bold">{o.order_number}</span><span className="text-white/60">{o.customer_name}</span><Badge tone={s.tone}>{s.label}</Badge><span className="font-bold text-azm-gold">{fmt(o.total)} ج.م</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-display text-lg font-black">تنبيهات المخزون</h3><AlertTriangle className="h-5 w-5 text-red-400" /></div>
          <div className="space-y-2 text-sm">
            {lowStockProducts.map(x => (
              <div key={x.id} className="flex items-center justify-between border-b border-white/5 py-2 last:border-0"><span>{x.name}</span><Badge tone="red">{x.stock} فقط</Badge></div>
            ))}
            {lowStockProducts.length === 0 && <div className="text-sm text-white/40">لا توجد منتجات منخفضة المخزون</div>}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
