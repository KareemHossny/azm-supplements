"use client";

import { createClient } from "./client";

export type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  name_en: string;
};

export async function getCategories() {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw error;
  return data as CategoryRow[];
}
