"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { getProductById, updateProduct, type ProductRow } from "@/lib/supabase/products";
import { getCategories, type CategoryRow } from "@/lib/supabase/categories";

export default function Page() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [p, setP] = useState<ProductRow | null>(null);
  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getProductById(id), getCategories()])
      .then(([product, categories]) => { setP(product); setCats(categories); })
      .catch(() => router.push("/admin/products"));
  }, [id, router]);

  async function handleSave() {
    if (!p) return;
    setSaving(true);
    try {
      await updateProduct(id, {
        name: p.name,
        name_en: p.name_en,
        brand: p.brand,
        description: p.description,
        price: p.price,
        old_price: p.old_price,
        image_url: p.image_url,
        category_id: p.category_id,
        stock: p.stock,
        sku: p.sku,
        is_active: p.is_active,
        is_featured: p.is_featured,
        tags: p.tags,
      });
      router.push("/admin/products");
    } catch { /* ignore */ }
    setSaving(false);
  }

  function set<K extends keyof ProductRow>(field: K, value: ProductRow[K]) {
    if (!p) return;
    setP({ ...p, [field]: value });
  }

  if (!p) return <AdminShell title="جاري التحميل..."><div className="text-center text-white/60">...</div></AdminShell>;

  return (
    <AdminShell title={`تعديل: ${p.name}`} actions={
      <><Link href="/admin/products" className="rounded-full border border-white/10 px-5 py-2 text-sm">للقائمة</Link>
      <button onClick={handleSave} disabled={saving} className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black disabled:opacity-50">{saving ? "جاري الحفظ..." : "حفظ"}</button></>
    }>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-4 font-display text-lg font-black">معلومات أساسية</h3>
          <div className="space-y-4">
            <div><label className="mb-1 block text-xs text-white/60">الاسم (عربي)</label><input value={p.name} onChange={e => set("name", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الاسم (إنجليزي)</label><input value={p.name_en} onChange={e => set("name_en", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الماركة</label><input value={p.brand} onChange={e => set("brand", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الوصف</label><textarea value={p.description} onChange={e => set("description", e.target.value)} rows={3} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">صورة (URL)</label><input value={p.image_url} onChange={e => set("image_url", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-4 font-display text-lg font-black">السعر والمخزون</h3>
          <div className="space-y-4">
            <div><label className="mb-1 block text-xs text-white/60">السعر (ج.م)</label><input type="number" value={p.price} onChange={e => set("price", Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">السعر القديم (اختياري)</label><input type="number" value={p.old_price ?? ""} onChange={e => set("old_price", e.target.value ? Number(e.target.value) : null)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">المخزون</label><input type="number" value={p.stock} onChange={e => set("stock", Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">SKU</label><input value={p.sku || ""} onChange={e => set("sku", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الفئة</label>
              <select value={p.category_id || ""} onChange={e => set("category_id", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm">
                <option value="">اختر فئة</option>
                {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.is_active} onChange={e => set("is_active", e.target.checked)} className="accent-azm-gold" /> نشط</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.is_featured} onChange={e => set("is_featured", e.target.checked)} className="accent-azm-gold" /> مميز</label>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
