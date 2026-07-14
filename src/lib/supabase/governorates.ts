"use client";

import { createClient } from "./client";

export type GovernorateRow = {
  id: string;
  name: string;
  fee: number;
  delivery_days: string;
  is_active: boolean;
};

export async function getGovernorates(includeInactive = false) {
  const supabase = createClient();
  let query = supabase.from("governorates").select("*").order("name");
  if (!includeInactive) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw error;
  return data as GovernorateRow[];
}

export async function updateGovernorate(id: string, updates: Partial<GovernorateRow>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("governorates").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as GovernorateRow;
}
