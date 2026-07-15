"use client";

import { createClient } from "./client";

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from("product-images").upload(path, file);
  if (error) throw new Error(error.message || "فشل رفع الصورة");
  if (!data) throw new Error("تعذر رفع الصورة — تأكد من وجود bucket product-images في Supabase Storage");
  const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(data.path);
  return urlData.publicUrl;
}
