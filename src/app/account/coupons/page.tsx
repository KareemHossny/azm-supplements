"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface CouponRow {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "shipping";
  value: number;
  min_order: number;
  max_uses: number;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
}

export default function Coupons() {
  const [coupons, setCoupons] = useState<CouponRow[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("coupons")
      .select("*")
      .eq("is_active", true)
      .order("value", { ascending: false })
      .then((res: { data: CouponRow[] | null }) => {
        if (res.data) setCoupons(res.data);
      })
      .catch(() => {});
  }, []);

  if (coupons.length === 0) {
    return (
      <div>
        <h2 className="mb-6 font-display text-2xl font-black">الكوبونات</h2>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-8 text-center text-sm text-white/50">
          لا توجد كوبونات متاحة
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">الكوبونات المتاحة</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {coupons.map(c => (
          <div key={c.id} className="rounded-2xl border border-azm-gold/20 bg-azm-gold/5 p-5">
            <div className="mb-2 font-display text-2xl font-black tracking-wider text-azm-gold">{c.code}</div>
            <div className="text-sm text-white/70">
              {c.type === "percentage" ? `خصم ${c.value}%` : c.type === "fixed" ? `خصم ${c.value} ج.م` : "شحن مجاني"}
              {c.min_order > 0 && ` للطلبات فوق ${c.min_order} ج.م`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
