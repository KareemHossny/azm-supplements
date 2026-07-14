"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
import { getProducts, updateProduct, type ProductRow } from "@/lib/supabase/products";

export default function Page() {
  const [products, setProducts] = useState<(ProductRow & { categories: { name: string; name_en: string; slug: string } | null })[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);

  const handleStockUpdate = useCallback(async (id: string, stock: number) => {
    try {
      await updateProduct(id, { stock });
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock } : p)));
    } catch {
      /* ignore */
    }
  }, []);

  const handleBlur = useCallback((id: string, e: React.FocusEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      handleStockUpdate(id, val);
    }
  }, [handleStockUpdate]);

  return (
    <AdminShell title="المخزون">
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50"><tr><th className="p-3">المنتج</th><th className="p-3">SKU</th><th className="p-3">المخزون الحالي</th><th className="p-3">الحد الأدنى</th><th className="p-3">الحالة</th><th className="p-3">تحديث</th></tr></thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {products.map((p) => {
              const stock = p.stock ?? 0;
              const low = stock < 10;
              return (
                <tr key={p.id}>
                  <td className="p-3"><div className="flex items-center gap-3"><img src={p.image_url} className="h-9 w-9 rounded-lg object-cover" alt="" /><span className="font-bold">{p.name}</span></div></td>
                  <td className="p-3 font-mono text-xs">{p.sku || `AZM-${p.id.slice(0, 4).toUpperCase()}`}</td>
                  <td className="p-3 font-bold">{stock}</td>
                  <td className="p-3 text-white/60">10</td>
                  <td className="p-3"><Badge tone={low ? "red" : "green"}>{low ? "منخفض" : "متوفر"}</Badge></td>
                  <td className="p-3"><input type="number" defaultValue={stock} onBlur={(e) => handleBlur(p.id, e)} className="w-20 rounded-lg border border-white/10 bg-azm-black/40 px-2 py-1" /></td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-white/40">لا توجد منتجات</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
