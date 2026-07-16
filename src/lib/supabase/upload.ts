"use client";

import { createClient } from "./client";

export async function uploadImage(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024) throw new Error("حجم الصورة كبير جدًا — الحد الأقصى 5 ميجابايت");
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from("product-images").upload(path, file);
  if (error) {
    if (error.message?.includes("bucket")) throw new Error("bucket 'product-images' غير موجود — أنشئه في Supabase Storage Dashboard");
    if (error.message?.includes("policy") || error.message?.includes("unauthorized")) throw new Error("ليس لديك صلاحية للرفع — تأكد من تسجيل الدخول كمشرف");
    throw new Error(error.message || "فشل رفع الصورة");
  }
  const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(data.path);
  return urlData.publicUrl;
}
