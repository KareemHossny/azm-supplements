"use client";

import { createClient } from "./client";

export type ProductRow = {
  id: string;
  name: string;
  name_en: string;
  brand: string;
  description: string;
  price: number;
  old_price: number | null;
  image_url: string;
  images: string[];
  category_id: string;
  tags: string[];
  stock: number;
  sku: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export async function getProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, name_en, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as (ProductRow & { categories: { name: string; name_en: string; slug: string } | null })[];
}

export async function getProductById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, name_en, slug)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as ProductRow & { categories: { name: string; name_en: string; slug: string } | null };
}

export async function getFeaturedProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true);

  if (error) throw error;
  return data as ProductRow[];
}

export async function createProduct(product: {
  name: string;
  name_en: string;
  brand: string;
  description?: string;
  price: number;
  old_price?: number;
  image_url: string;
  images?: string[];
  category_id: string;
  stock?: number;
  tags?: string[];
}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").insert(product).select().single();
  if (error) throw error;
  return data as ProductRow;
}

export async function updateProduct(id: string, updates: Partial<ProductRow>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as ProductRow;
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
