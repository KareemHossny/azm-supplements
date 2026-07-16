"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { getCategories, type CategoryRow } from "@/lib/supabase/categories";
import { createProduct } from "@/lib/supabase/products";
import { createVariant } from "@/lib/supabase/variants";
import { uploadImage } from "@/lib/supabase/upload";

export default function Page() {
  const router = useRouter();
  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<{ name: string; value: string; price_modifier: number; stock: number }[]>([]);
  const [form, setForm] = useState<Record<string, string>>({
    name: "", name_en: "", brand: "", description: "", price: "", old_price: "",
    category_id: "", stock: "", tags: "",
  });

  useEffect(() => { getCategories().then(setCats).catch(() => {}); }, []);

  function f(k: string, v: string) { setForm(prev => ({ ...prev, [k]: v })); }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");
    try {
      for (const file of Array.from(files)) {
        const url = await uploadImage(file);
        setImages(prev => [...prev, url]);
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "فشل رفع الصورة");
    }
    setUploading(false);
    e.target.value = "";
  }

  function removeImage(idx: number) { setImages(prev => prev.filter((_, i) => i !== idx)); }

  function addVariant() { setVariants(prev => [...prev, { name: "نكهة", value: "جديد", price_modifier: 0, stock: 10 }]); }

  function setVariant(idx: number, k: string, v: string | number) {
    setVariants(prev => prev.map((vt, i) => i === idx ? { ...vt, [k]: v } : vt));
  }

  function removeVariant(idx: number) { setVariants(prev => prev.filter((_, i) => i !== idx)); }

  async function handleSave() {
    setSaving(true);
    try {
      const prod = await createProduct({
        name: form.name,
        name_en: form.name_en,
        brand: form.brand,
        description: form.description,
        price: Number(form.price),
        old_price: form.old_price ? Number(form.old_price) : undefined,
        image_url: images[0] || "",
        images,
        category_id: form.category_id,
        stock: Number(form.stock),
        tags: form.tags.split(",").map(s => s.trim()).filter(Boolean),
      });
      for (const v of variants) {
        await createVariant({ product_id: prod.id, ...v });
      }
      router.push("/admin/products");
    } catch { /* ignore */ }
    setSaving(false);
  }

  return (
    <AdminShell title="إضافة منتج جديد" actions={
      <><Link href="/admin/products" className="rounded-full border border-white/10 px-5 py-2 text-sm">إلغاء</Link>
      <button onClick={handleSave} disabled={saving} className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black disabled:opacity-50">{saving ? "جاري الحفظ..." : "حفظ"}</button></>
    }>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-4 font-display text-lg font-black">معلومات أساسية</h3>
          <div className="space-y-4">
            <div><label className="mb-1 block text-xs text-white/60">الاسم (عربي)</label><input value={form.name} onChange={e => f("name", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الاسم (إنجليزي)</label><input value={form.name_en} onChange={e => f("name_en", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الماركة</label><input value={form.brand} onChange={e => f("brand", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الوصف</label><textarea value={form.description} onChange={e => f("description", e.target.value)} rows={3} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الفئة</label>
              <select value={form.category_id} onChange={e => f("category_id", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm">
                <option value="">اختر فئة</option>
                {cats.map(c => <option key={c.id} value={c.id}>{c.name} ({c.name_en})</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-4 font-display text-lg font-black">السعر والمخزون</h3>
          <div className="space-y-4">
            <div><label className="mb-1 block text-xs text-white/60">السعر (ج.م)</label><input type="number" value={form.price} onChange={e => f("price", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">السعر القديم (اختياري)</label><input type="number" value={form.old_price} onChange={e => f("old_price", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">المخزون</label><input type="number" value={form.stock} onChange={e => f("stock", e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-xs text-white/60">الوسوم (مفصولة بفاصلة)</label><input value={form.tags} onChange={e => f("tags", e.target.value)} placeholder="الأكثر مبيعاً, جديد, خصم" className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="mt-6 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <h3 className="mb-4 font-display text-lg font-black">الصور</h3>
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="group relative">
              <img src={img} className="h-24 w-24 rounded-xl object-cover border border-white/10" onError={e => (e.target as HTMLImageElement).style.display = "none"} />
              <button onClick={() => removeImage(i)} className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"><Trash2 className="h-3 w-3" /></button>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/20 px-4 py-8 text-sm text-white/60 hover:border-azm-gold/40 hover:text-azm-gold">
            {uploading ? <><Loader2 className="h-5 w-5 animate-spin" /> جاري الرفع...</> : <><Upload className="h-5 w-5" /> اضغط لرفع الصور</>}
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
        {uploadError && <p className="mt-2 text-xs text-red-400">{uploadError}</p>}
      </div>

      {/* Variants */}
      <div className="mt-6 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-black">المتغيرات (النكهات / الأحجام)</h3>
          <button onClick={addVariant} className="flex items-center gap-2 rounded-full bg-azm-gold px-4 py-2 text-xs font-bold text-azm-black"><Plus className="h-3 w-3" /> إضافة</button>
        </div>
        {variants.length === 0 && <p className="text-sm text-white/40">لا توجد متغيرات مضافة</p>}
        {variants.map((v, i) => (
          <div key={i} className="mb-2 flex flex-wrap items-end gap-2 rounded-xl border border-white/5 bg-azm-black/20 p-3">
            <div><label className="mb-1 block text-[10px] text-white/50">النوع</label><input value={v.name} onChange={e => setVariant(i, "name", e.target.value)} className="rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1.5 text-xs w-20" /></div>
            <div><label className="mb-1 block text-[10px] text-white/50">القيمة</label><input value={v.value} onChange={e => setVariant(i, "value", e.target.value)} className="rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1.5 text-xs w-24" /></div>
            <div><label className="mb-1 block text-[10px] text-white/50">فرق السعر</label><input type="number" value={v.price_modifier} onChange={e => setVariant(i, "price_modifier", Number(e.target.value))} className="rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1.5 text-xs w-20" /></div>
            <div><label className="mb-1 block text-[10px] text-white/50">المخزون</label><input type="number" value={v.stock} onChange={e => setVariant(i, "stock", Number(e.target.value))} className="rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1.5 text-xs w-16" /></div>
            <button onClick={() => removeVariant(i)} className="rounded-lg bg-red-500/10 p-2 text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
