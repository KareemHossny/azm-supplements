"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Filter, Grid3x3, List, Search, X, SlidersHorizontal, PackageOpen } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { EmptyState, Chip } from "@/components/ui-bits";
import { products as fallbackProducts, brands, categories as fallbackCats } from "@/lib/products";
import { getProducts } from "@/lib/supabase/products";
import { getCategories } from "@/lib/supabase/categories";
import { mapProduct } from "@/lib/map-product";

export default function Page() {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCats);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prodData.map(mapProduct));
        setCategories(catData.map(c => ({
          slug: c.slug,
          name: c.name,
          nameEn: c.name_en,
          count: fallbackCats.find(fc => fc.slug === c.slug)?.count ?? 0,
        })));
      } catch {
        // use fallback
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState("popular");
  const [openFilters, setOpenFilters] = useState(false);

  const filtered = products.filter(p => {
    if (q && !p.name.includes(q) && !p.nameEn.toLowerCase().includes(q.toLowerCase())) return false;
    if (cat !== "all" && cat !== p.category && !(cat === "protein" && p.nameEn.toLowerCase().includes("whey"))) return false;
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <PageShell eyebrow="Shop" title="المتجر" description="أكثر من ١٢٠٠ منتج أصلي من أفضل العلامات التجارية." breadcrumbs={[{ l: "المتجر" }]} wide>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className={`${openFilters ? "block" : "hidden"} lg:block`}>
          <div className="sticky top-28 space-y-6 rounded-2xl border border-white/5 bg-azm-charcoal/30 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-black">الفلاتر</h3>
              <button onClick={() => setOpenFilters(false)} className="lg:hidden"><X className="h-4 w-4" /></button>
            </div>
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-azm-gold">الفئة</div>
              <div className="space-y-2">
                <button onClick={() => setCat("all")} className={`block w-full text-right text-sm ${cat === "all" ? "text-azm-gold" : "text-white/70 hover:text-white"}`}>الكل ({products.length})</button>
                {categories.map(c => (
                  <button key={c.slug} onClick={() => setCat(c.slug)} className={`block w-full text-right text-sm ${cat === c.slug ? "text-azm-gold" : "text-white/70 hover:text-white"}`}>
                    {c.name} <span className="text-white/30">({c.count})</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-azm-gold">السعر (ج.م)</div>
              <input type="range" min="0" max="5000" defaultValue="2500" className="w-full accent-azm-gold" />
              <div className="mt-2 flex items-center justify-between text-xs text-white/60"><span>٠</span><span>٥٠٠٠</span></div>
            </div>
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-azm-gold">العلامة</div>
              <div className="space-y-2">
                {brands.map(b => (
                  <label key={b} className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" className="accent-azm-gold" /> {b}</label>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-azm-gold">التقييم</div>
              {[5,4,3,2].map(r => (
                <label key={r} className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" className="accent-azm-gold" /> {r}★ فأعلى</label>
              ))}
            </div>
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-azm-gold">التوفر</div>
              <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" defaultChecked className="accent-azm-gold" /> متوفر</label>
              <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" className="accent-azm-gold" /> نفذ المخزون</label>
            </div>
            <button className="w-full rounded-full bg-azm-gold py-2.5 text-sm font-bold text-azm-black">تطبيق</button>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-azm-charcoal/30 p-3">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-azm-black/40 px-4 py-2">
              <Search className="h-4 w-4 text-white/40" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="ابحث عن منتج..." className="flex-1 bg-transparent text-sm placeholder:text-white/40 focus:outline-none" />
            </div>
            <button onClick={() => setOpenFilters(true)} className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold lg:hidden">
              <Filter className="h-4 w-4" /> فلترة
            </button>
            <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-full border border-white/10 bg-azm-black/40 px-4 py-2 text-sm text-white/80 focus:outline-none">
              <option value="popular">الأكثر شعبية</option>
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: من الأقل</option>
              <option value="price-desc">السعر: من الأعلى</option>
            </select>
            <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
              <button onClick={() => setView("grid")} className={`grid h-8 w-8 place-items-center rounded-full ${view === "grid" ? "bg-azm-gold text-azm-black" : "text-white/60"}`}><Grid3x3 className="h-4 w-4" /></button>
              <button onClick={() => setView("list")} className={`grid h-8 w-8 place-items-center rounded-full ${view === "list" ? "bg-azm-gold text-azm-black" : "text-white/60"}`}><List className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            {cat !== "all" && <Chip active onClick={() => setCat("all")}>{categories.find(c => c.slug === cat)?.name} ×</Chip>}
            <span className="text-xs text-white/50">{sorted.length} منتج</span>
          </div>

          {sorted.length === 0 ? (
            <EmptyState icon={PackageOpen} title="لا توجد نتائج" description="جرّب تعديل الفلاتر أو البحث بكلمات أخرى." action="عرض كل المنتجات" actionTo="/shop" />
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {sorted.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map(p => (
                <Link key={p.id} href={"/product/" + p.id} className="flex gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-3 transition hover:border-azm-gold/30">
                  <img src={p.image} className="h-24 w-24 rounded-xl object-cover" alt={p.name} />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-azm-gold">{p.brand}</div>
                      <div className="text-base font-bold text-white">{p.name}</div>
                      <div className="text-xs text-white/40">{p.nameEn}</div>
                    </div>
                    <div className="text-lg font-black text-azm-gold">{p.price.toLocaleString("ar-EG")} ج.م</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 flex items-center justify-center gap-1">
            {[1,2,3,4,5].map(n => (
              <button key={n} className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${n === 1 ? "bg-azm-gold text-azm-black" : "border border-white/10 text-white/70 hover:border-azm-gold/40"}`}>{n}</button>
            ))}
            <button className="mr-2 rounded-full border border-white/10 px-4 py-2 text-sm">التالي</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
