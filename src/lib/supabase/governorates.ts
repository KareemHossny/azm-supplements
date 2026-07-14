"use client";

import { createClient } from "./client";

export type GovernorateRow = {
  id: string;
  name: string;
  fee: number;
  delivery_days: string;
  is_active: boolean;
};

export async function getGovernorates() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("governorates")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;
  return data as GovernorateRow[];
}
