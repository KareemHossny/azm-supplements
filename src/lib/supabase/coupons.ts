"use client";

import { createClient } from "./client";

export type CouponRow = {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "shipping";
  value: number;
  min_order: number;
  max_uses: number;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
};

export async function getCoupons() {
  const supabase = createClient();
  const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as CouponRow[];
}

export async function createCoupon(coupon: {
  code: string; type: string; value: number; min_order?: number; max_uses?: number; expires_at?: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("coupons").insert({
    code: coupon.code.toUpperCase(),
    type: coupon.type,
    value: coupon.value,
    min_order: coupon.min_order || 0,
    max_uses: coupon.max_uses || 0,
    expires_at: coupon.expires_at || null,
  }).select().single();
  if (error) throw error;
  return data as CouponRow;
}

export async function updateCoupon(id: string, updates: Partial<CouponRow>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("coupons").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as CouponRow;
}

export async function deleteCoupon(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("coupons").delete().eq("id", id);
  if (error) throw error;
}
