"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Heart, Share2, Truck, ShieldCheck, RefreshCcw, Star, Minus, Plus, ShoppingBag, ChevronDown, PackageX } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui-bits";
import { products as fallbackProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import { getProductById, getProducts } from "@/lib/supabase/products";
import { getVariants, type VariantRow } from "@/lib/supabase/variants";
import { mapProduct } from "@/lib/map-product";
import { notFound } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [p, setP] = useState<Product | undefined>(undefined);
  const [related, setRelated] = useState<Product[]>([]);
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "ingredients" | "nutrition" | "usage" | "reviews" | "faq">("desc");
  const [imgIdx, setImgIdx] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    async function load() {
      try {
        const [data, allData, v] = await Promise.all([getProductById(id), getProducts(), getVariants(id)]);
        const mapped = mapProduct(data);
        setP(mapped);
        setRelated(allData.map(mapProduct).filter(x => x.id !== id).slice(0, 4));
        setVariants(v);
        if (v.length > 0) setSelectedVariant(v[0].id);
      } catch {
        const fallback = fallbackProducts.find(x => x.id === id);
        if (fallback) {
          setP(fallback);
          setRelated(fallbackProducts.filter(x => x.id !== id).slice(0, 4));
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <PageShell title="" breadcrumbs={[{ l: "المتجر", to: "/shop" }, { l: "..." }]}>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-white/60">جاري التحميل...</div>
        </div>
      </PageShell>
    );
  }

  if (!p) notFound();

  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const allImages = p.images?.length ? p.images : [p.image];
  const currentVariant = variants.find(v => v.id === selectedVariant);
  const effectivePrice = currentVariant ? p.price + currentVariant.price_modifier : p.price;
  const effectiveStock = currentVariant ? currentVariant.stock : (p.stock ?? 0);
  const outOfStock = effectiveStock === 0;
  const limited = effectiveStock > 0 && effectiveStock < 5;
  const varNames = [...new Set(variants.map(v => v.name))];
  const varValuesByName: Record<string, { id: string; value: string }[]> = {};
  for (const v of variants) {
    if (!varValuesByName[v.name]) varValuesByName[v.name] = [];
    varValuesByName[v.name].push({ id: v.id, value: v.value });
  }

  return (
    <PageShell title="" breadcrumbs={[{ l: "المتجر", to: "/shop" }, { l: p.name }]}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}
        <div>
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-azm-charcoal/40">
            <img src={allImages[imgIdx]} alt={p.name} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {p.tag && <span className="absolute top-4 right-4 rounded-full bg-azm-gold px-3 py-1 text-[10px] font-bold text-azm-black">{p.tag}</span>}
            {discount > 0 && <span className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold text-white">-{discount}%</span>}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {allImages.map((im, i) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`overflow-hidden rounded-xl border ${i === imgIdx ? "border-azm-gold" : "border-white/10"}`}>
                <img src={im} className="aspect-square w-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-azm-gold">{p.brand}</div>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">{p.name}</h1>
          <div className="mt-2 text-sm text-white/50">{p.nameEn}</div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-azm-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
            <span className="text-sm text-white/60">٤.٨ (١٢٤ تقييم)</span>
            {outOfStock ? <Badge tone="red">غير متوفر</Badge> : limited ? <Badge tone="gold">كمية محدودة</Badge> : <Badge tone="green">متوفر</Badge>}
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-black text-azm-gold">{effectivePrice.toLocaleString("ar-EG")}</span>
            <span className="text-sm text-white/60">ج.م</span>
            {p.oldPrice && <span className="text-lg text-white/40 line-through">{p.oldPrice.toLocaleString("ar-EG")}</span>}
          </div>

          {/* Variants */}
          {varNames.length > 0 && (
            <div className="mt-8 space-y-4">
              {varNames.map(vn => (
                <div key={vn}>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">{vn}</div>
                  <div className="flex flex-wrap gap-2">
                    {(varValuesByName[vn] || []).map(vv => (
                      <button key={vv.id} onClick={() => setSelectedVariant(vv.id)} className={`rounded-full border px-4 py-2 text-xs font-semibold ${selectedVariant === vv.id ? "border-azm-gold bg-azm-gold text-azm-black" : "border-white/10 text-white/70"}`}>{vv.value}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {outOfStock ? (
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
              <PackageX className="h-5 w-5" /> هذا المنتج غير متوفر حالياً
            </div>
          ) : (
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => { addItem({ id: p.id, name: p.name, nameEn: p.nameEn, brand: p.brand, price: effectivePrice, oldPrice: p.oldPrice, image: p.image, qty }); }} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-azm-gold py-3 text-sm font-bold text-azm-black transition hover:bg-azm-sand">
              <ShoppingBag className="h-4 w-4" /> أضف للسلة
            </button>
            <button onClick={() => { addItem({ id: p.id, name: p.name, nameEn: p.nameEn, brand: p.brand, price: effectivePrice, oldPrice: p.oldPrice, image: p.image, qty }); window.location.href = "/checkout"; }} className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold hover:bg-white/5">اشتر الآن</button>
          </div>
          )}
          <div className="mt-4 flex items-center gap-2">
            <Link href="/account/wishlist" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 hover:border-azm-gold/40"><Heart className="h-4 w-4" /></Link>
            <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 hover:border-azm-gold/40"><Share2 className="h-4 w-4" /></button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/5 bg-azm-charcoal/30 p-4">
            {[{ i: Truck, t: "شحن سريع" }, { i: ShieldCheck, t: "منتج أصلي" }, { i: RefreshCcw, t: "إرجاع مجاني" }].map(f => (
              <div key={f.t} className="flex flex-col items-center gap-2 text-center">
                <f.i className="h-5 w-5 text-azm-gold" />
                <span className="text-xs text-white/70">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs (unchanged) */}
      <div className="mt-16 border-b border-white/10">
        <div className="flex flex-wrap gap-1 -mb-px">
          {[
            { k: "desc", l: "الوصف" }, { k: "ingredients", l: "المكونات" }, { k: "nutrition", l: "القيم الغذائية" },
            { k: "usage", l: "طريقة الاستخدام" }, { k: "reviews", l: "التقييمات" }, { k: "faq", l: "أسئلة" },
          ].map(t => (
            <button key={t.k} onClick={() => setTab(t.k as typeof tab)} className={`border-b-2 px-5 py-3 text-sm font-semibold ${tab === t.k ? "border-azm-gold text-azm-gold" : "border-transparent text-white/60 hover:text-white"}`}>{t.l}</button>
          ))}
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-white/5 bg-azm-charcoal/30 p-6 text-sm leading-relaxed text-white/70">
        {tab === "desc" && <p>واي بروتين إيزوليت عالي الجودة، ٢٧ جرام بروتين للحصة، منخفض السكر والدهون. مثالي لبناء العضلات والتعافي بعد التمرين.</p>}
        {tab === "ingredients" && <p>عزل بروتين مصل اللبن، نكهات طبيعية، ليسيثين الصويا، محلي طبيعي (ستيفيا).</p>}
        {tab === "nutrition" && (
          <table className="w-full text-right">
            <tbody className="divide-y divide-white/5">
              {[["السعرات", "120 كالوري"], ["البروتين", "27g"], ["الكربوهيدرات", "2g"], ["الدهون", "1g"], ["السكر", "1g"]].map(([k, v]) => (
                <tr key={k}><td className="py-2 text-white/60">{k}</td><td className="py-2 font-bold text-white">{v}</td></tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "usage" && <p>اخلط ملعقة واحدة (30 جم) مع ٢٠٠ مل ماء أو حليب. تناول بعد التمرين مباشرة أو بين الوجبات.</p>}
        {tab === "reviews" && (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-xl border border-white/5 bg-azm-black/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold">أحمد م.</div>
                  <div className="flex text-azm-gold">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}</div>
                </div>
                <p className="mt-2 text-white/70">منتج ممتاز، النكهة رائعة والذوبان سريع.</p>
              </div>
            ))}
            <button className="rounded-full bg-azm-gold px-6 py-3 text-sm font-bold text-azm-black">اكتب تقييمك</button>
          </div>
        )}
        {tab === "faq" && (
          <div className="space-y-2">
            {[{q:"مناسب للنباتيين؟",a:"لا، يحتوي على مصل اللبن."},{q:"هل يحتوي على منشطات؟",a:"لا، خالٍ من أي مواد محظورة."}].map(f => (
              <details key={f.q} className="group rounded-xl border border-white/5 bg-azm-black/40 p-4">
                <summary className="flex cursor-pointer items-center justify-between font-bold text-white">{f.q}<ChevronDown className="h-4 w-4 group-open:rotate-180" /></summary>
                <p className="mt-2 text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Frequently bought */}
      <div className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-black">يُشترى معه غالباً</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {related.map((r, i) => <ProductCard key={r.id} p={r} index={i} />)}
        </div>
      </div>
    </PageShell>
  );
}
