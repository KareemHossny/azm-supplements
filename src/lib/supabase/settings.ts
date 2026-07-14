"use client";

import { createClient } from "./client";

export type SettingRow = {
  id: string;
  key: string;
  value: string;
  updated_at: string;
};

export async function getSettings() {
  const supabase = createClient();
  const { data, error } = await supabase.from("settings").select("*").order("key");
  if (error) throw error;
  return data as SettingRow[];
}

export async function updateSetting(key: string, value: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("settings").update({ value }).eq("key", key).select().single();
  if (error) throw error;
  return data as SettingRow;
}
