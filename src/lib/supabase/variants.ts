"use client";

import { createClient } from "./client";

export type VariantRow = {
  id: string;
  product_id: string;
  name: string;
  value: string;
  price_modifier: number;
  stock: number;
  is_active: boolean;
  created_at: string;
};

export async function getVariants(productId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("product_variants").select("*").eq("product_id", productId).order("name");
  if (error) throw error;
  return data as VariantRow[];
}

export async function createVariant(v: { product_id: string; name: string; value: string; price_modifier?: number; stock?: number }) {
  const supabase = createClient();
  const { data, error } = await supabase.from("product_variants").insert(v).select().single();
  if (error) throw error;
  return data as VariantRow;
}

export async function updateVariant(id: string, updates: Partial<VariantRow>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("product_variants").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as VariantRow;
}

export async function deleteVariant(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("product_variants").delete().eq("id", id);
  if (error) throw error;
}
