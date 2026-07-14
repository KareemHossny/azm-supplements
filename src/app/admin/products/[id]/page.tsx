"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
import { getProductById, updateProduct, type ProductRow } from "@/lib/supabase/products";
import { getCategories, type CategoryRow } from "@/lib/supabase/categories";
import { getVariants, createVariant, updateVariant, deleteVariant, type VariantRow } from "@/lib/supabase/variants";

type EditableProduct = Omit<ProductRow, "id" | "created_at" | "updated_at">;

export default function Page() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [p, setP] = useState<EditableProduct | null>(null);
  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [newImg, setNewImg] = useState("");

  useEffect(() => {
    Promise.all([getProductById(id), getCategories(), getVariants(id)])
      .then(([product, categories, v]) => {
        const { id: _id, created_at: _c, updated_at: _u, ...rest } = product;
        setP({ ...rest, images: product.images || [] });
        setCats(categories);
        setVariants(v);
      })
      .catch(() => router.push("/admin/products"));
  }, [id, router]);

  function set<K extends keyof EditableProduct>(field: K, value: EditableProduct[K]) {
    if (!p) return;
    setP({ ...p, [field]: value });
  }

  async function handleSave() {
    if (!p) return;
    setSaving(true);
    try {
      await updateProduct(id, p as Partial<ProductRow>);
      router.push("/admin/products");
    } catch { /* ignore */ }
    setSaving(false);
  }

  function addImage() {
    if (!newImg.trim() || !p) return;
    setP({ ...p, images: [...p.images, newImg.trim()], image_url: p.images.length === 0 ? newImg.trim() : p.image_url });
    setNewImg("");
  }

  function removeImage(idx: number) {
    if (!p) return;
    const imgs = p.images.filter((_, i) => i !== idx);
    setP({ ...p, images: imgs, image_url: imgs[0] || "" });
  }

  async function handleAddVariant() {
    const v = await createVariant({ product_id: id, name: "نكهة", value: "جديد", stock: 10 });
    setVariants(prev => [...prev, v]);
  }

  async function handleDeleteVariant(vId: string) {
    await deleteVariant(vId);
    setVariants(prev => prev.filter(v => v.id !== vId));
  }

  async function handleVariantChange(vId: string, field: keyof VariantRow, value: string | number | boolean) {
    setVariants(prev => prev.map(v => v.id === vId ? { ...v, [field]: value } : v));
    await updateVariant(vId, { [field]: value });
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
            <div><label className="mb-1 block text-xs text-white/60">الفئة</label>
              <select value={p.category_id || ""} onChange={e => set("category_id", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm">
                <option value="">اختر فئة</option>
                {cats.map(c => <option key={c.id} value={c.id}>{c.name} ({c.name_en})</option>)}
              </select>
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.is_active} onChange={e => set("is_active", e.target.checked)} className="accent-azm-gold" /> نشط</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.is_featured} onChange={e => set("is_featured", e.target.checked)} className="accent-azm-gold" /> مميز</label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-4 font-display text-lg font-black">السعر والمخزون</h3>
          <div className="space-y-4">
            <div><label className="mb-1 block text-xs text-white/60">السعر (ج.م)</label><input type="number" value={p.price} onChange={e => set("price", Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">السعر القديم (اختياري)</label><input type="number" value={p.old_price ?? ""} onChange={e => set("old_price", e.target.value ? Number(e.target.value) : null)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">المخزون الكلي</label><input type="number" value={p.stock} onChange={e => set("stock", Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الوسوم (tags)</label><input value={p.tags?.join(", ") || ""} onChange={e => set("tags", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" placeholder="الأكثر مبيعاً, جديد, خصم" /></div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="mt-6 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <h3 className="mb-4 font-display text-lg font-black">صور المنتج</h3>
        <div className="flex flex-wrap gap-3">
          {p.images.map((img, i) => (
            <div key={i} className="group relative">
              <img src={img} className="h-24 w-24 rounded-xl object-cover border border-white/10" />
              <button onClick={() => removeImage(i)} className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"><Trash2 className="h-3 w-3" /></button>
            </div>
          ))}
          {p.image_url && !p.images.includes(p.image_url) && (
            <div className="group relative">
              <img src={p.image_url} className="h-24 w-24 rounded-xl object-cover border border-azm-gold/50" />
              <span className="absolute -top-2 -right-2 rounded-full bg-azm-gold px-1.5 py-0.5 text-[9px] text-black font-bold">رئيسية</span>
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={newImg} onChange={e => setNewImg(e.target.value)} onKeyDown={e => e.key === "Enter" && addImage()} placeholder="URL الصورة" className="flex-1 rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm" />
          <button onClick={addImage} className="rounded-full bg-azm-gold px-4 py-2 text-sm font-bold text-azm-black">إضافة</button>
        </div>
      </div>

      {/* Variants */}
      <div className="mt-6 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-black">المتغيرات (النكهات / الأحجام)</h3>
          <button onClick={handleAddVariant} className="flex items-center gap-2 rounded-full bg-azm-gold px-4 py-2 text-xs font-bold text-azm-black"><Plus className="h-3 w-3" /> إضافة</button>
        </div>
        {variants.length === 0 && <p className="text-sm text-white/40">لا توجد متغيرات مضافة</p>}
        {variants.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-white/5">
            <table className="w-full text-right text-sm">
              <thead className="bg-azm-charcoal/60 text-xs text-white/50"><tr><th className="p-2">النوع</th><th className="p-2">القيمة</th><th className="p-2">فرق السعر</th><th className="p-2">المخزون</th><th className="p-2">الحالة</th><th className="p-2"></th></tr></thead>
              <tbody className="divide-y divide-white/5">
                {variants.map(v => (
                  <tr key={v.id}>
                    <td className="p-2"><input value={v.name} onChange={e => handleVariantChange(v.id, "name", e.target.value)} className="w-20 rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1 text-xs" /></td>
                    <td className="p-2"><input value={v.value} onChange={e => handleVariantChange(v.id, "value", e.target.value)} className="w-24 rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1 text-xs" /></td>
                    <td className="p-2"><input type="number" value={v.price_modifier} onChange={e => handleVariantChange(v.id, "price_modifier", Number(e.target.value))} className="w-20 rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1 text-xs" /></td>
                    <td className="p-2"><input type="number" value={v.stock} onChange={e => handleVariantChange(v.id, "stock", Number(e.target.value))} className="w-16 rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1 text-xs" /></td>
                    <td className="p-2"><Badge tone={v.is_active ? "green" : "gray"}>{v.is_active ? "نشط" : "ملغي"}</Badge></td>
                    <td className="p-2"><button onClick={() => handleDeleteVariant(v.id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-3.5 w-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
