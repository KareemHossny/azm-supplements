"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Heart, MapPin, Ticket } from "lucide-react";
import { StatCard } from "@/components/ui-bits";
import { getOrders } from "@/lib/supabase/orders";

export default function Dashboard() {
  const [orderCount, setOrderCount] = useState<number | null>(null);

  useEffect(() => {
    getOrders().then(o => setOrderCount(o.length)).catch(() => setOrderCount(0));
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="الطلبات" value={orderCount === null ? "—" : String(orderCount)} />
        <StatCard label="كوبونات" value="—" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[{l:"طلباتي",to:"/account/orders",i:Package,d:"عرض وتتبع طلباتك"},{l:"المفضلة",to:"/account/favorites",i:Heart,d:"منتجاتك المحفوظة"},{l:"العناوين",to:"/account/addresses",i:MapPin,d:"إدارة عناوين الشحن"},{l:"الكوبونات",to:"/account/coupons",i:Ticket,d:"أكواد الخصم المتاحة"}].map(c => (
          <Link key={c.to} href={c.to} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5 transition hover:border-azm-gold/30">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-azm-gold/10 text-azm-gold"><c.i className="h-5 w-5" /></div>
            <div><div className="font-bold">{c.l}</div><div className="text-xs text-white/50">{c.d}</div></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
