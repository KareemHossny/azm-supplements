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

export async function createCategory(cat: { slug: string; name: string; name_en: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").insert(cat).select().single();
  if (error) throw error;
  return data as CategoryRow;
}

export async function updateCategory(id: string, updates: Partial<CategoryRow>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as CategoryRow;
}

export async function deleteCategory(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
