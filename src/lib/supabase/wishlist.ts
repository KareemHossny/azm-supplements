"use client";

import { createClient } from "./client";

export type WishlistRow = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

export async function getWishlist() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wishlist")
    .select("*, products(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as (WishlistRow & { products: Record<string, unknown> })[];
}

export async function addToWishlist(productId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("wishlist")
    .insert({ user_id: user.id, product_id: productId })
    .select()
    .single();
  if (error) throw error;
  return data as WishlistRow;
}

export async function removeFromWishlist(productId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);
  if (error) throw error;
}

export async function isInWishlist(productId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data, error } = await supabase
    .from("wishlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();
  if (error) return false;
  return !!data;
}
