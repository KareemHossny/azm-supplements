"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Filter } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
import { getProducts, deleteProduct, type ProductRow } from "@/lib/supabase/products";

const categoryLabel: Record<string, string> = {
  supplements: "مكملات",
  accessories: "إكسسوارات",
};

export default function Page() {
  const [products, setProducts] = useState<(ProductRow & { categories: { name: string; name_en: string; slug: string } | null })[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <AdminShell title="المنتجات" actions={<Link href="/admin/products/new" className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> منتج جديد</Link>}>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input placeholder="بحث..." className="flex-1 rounded-full border border-white/10 bg-azm-black/40 px-4 py-2 text-sm focus:outline-none" />
        <button className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm"><Filter className="h-4 w-4" /> فلترة</button>
        <button className="rounded-full border border-white/10 px-4 py-2 text-sm">إجراءات</button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50">
            <tr>
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3">المنتج</th><th className="p-3">الفئة</th>
              <th className="p-3">السعر</th><th className="p-3">المخزون</th><th className="p-3">الحالة</th><th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {products.map(p => {
              const cat = p.categories?.name || categoryLabel[p.category_id] || "—";
              const stock = p.stock ?? 0;
              return (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3"><div className="flex items-center gap-3"><img src={p.images?.[0] || p.image_url} className="h-10 w-10 rounded-lg object-cover" alt="" /><div><div className="font-bold">{p.name}</div><div className="text-xs text-white/40">{p.brand}</div></div></div></td>
                  <td className="p-3 text-white/70">{cat}</td>
                  <td className="p-3 font-bold text-azm-gold">{p.price} ج.م</td>
                  <td className="p-3">{stock}</td>
                  <td className="p-3"><Badge tone={p.is_active ? "green" : "gray"}>{p.is_active ? "نشط" : "غير نشط"}</Badge></td>
                  <td className="p-3"><div className="flex gap-1"><Link href={"/admin/products/" + p.id} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"><Pencil className="h-3.5 w-3.5" /></Link><button onClick={() => handleDelete(p.id)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
