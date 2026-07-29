"use client";

import { createClient } from "./client";

export type AddressRow = {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  landmark: string;
  is_default: boolean;
  created_at: string;
};

export async function getAddresses() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("user_addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false });
  if (error) throw error;
  return data as AddressRow[];
}

export async function createAddress(address: Omit<AddressRow, "id" | "user_id" | "created_at">) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("يجب تسجيل الدخول أولاً");
  if (address.is_default) {
    await supabase.from("user_addresses").update({ is_default: false }).eq("user_id", user.id);
  }
  const { data, error } = await supabase
    .from("user_addresses")
    .insert({ ...address, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data as AddressRow;
}

export async function deleteAddress(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("user_addresses").delete().eq("id", id);
  if (error) throw error;
}
