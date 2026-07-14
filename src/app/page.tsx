"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Truck, ShieldCheck, Award, Star, Quote, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products as fallbackProducts, brands, categories as fallbackCats } from "@/lib/products";
import { getProducts } from "@/lib/supabase/products";
import { getCategories } from "@/lib/supabase/categories";
import { mapProduct } from "@/lib/map-product";

function Section({
  eyebrow, title, cta, ctaTo, children,
}: { eyebrow: string; title: string; cta?: string; ctaTo?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 flex items-end justify-between gap-6"
      >
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-azm-gold">{eyebrow}</div>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
        </div>
        {cta && (
          <Link href={ctaTo ?? "/shop"} className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-azm-gold sm:flex">
            {cta}
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        )}
      </motion.div>
      {children}
    </section>
  );
}

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

  const bestSellers = products.filter((p) => p.tag === "الأكثر مبيعاً" || p.id === "5");
  const newest = [...products].reverse().slice(0, 4);
  const offers = products.filter((p) => p.oldPrice);
  const featured = products.slice(0, 4);
  const accessories = products.filter((p) => p.category === "accessories");

  return (
    <div className="min-h-screen bg-azm-black text-white">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
        <img src={heroImg.src} alt="AZM gym atmosphere" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-l from-azm-black/40 via-azm-black/70 to-azm-black" />
        <div className="absolute inset-0 arabic-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-azm-black via-transparent to-azm-black/60" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-azm-gold/30 bg-azm-gold/5 px-4 py-1.5 text-xs font-semibold text-azm-gold backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-azm-gold" />
              عزم • AZM Athletics
            </div>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              كل اللي تحتاجه
              <br />
              <span className="gold-text">للتمرين الحقيقي</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              مكملات أصلية وإكسسوارات جيم مختارة للرياضيين في مصر. جودة عالمية، أسعار عادلة، وشحن سريع لكل المحافظات.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/shop" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-azm-gold px-7 py-4 text-sm font-bold text-azm-black transition-all hover:bg-azm-sand hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.11_82/0.6)]">
                تسوق المكملات
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link href="/shop" className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/10">
                تسوق الإكسسوارات
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {[
              { n: "+٥٠", l: "علامة تجارية" },
              { n: "+١٢٠٠", l: "منتج أصلي" },
              { n: "٢٤س", l: "شحن للقاهرة" },
              { n: "١٠٠٪", l: "منتجات مضمونة" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-black text-white sm:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-y border-white/5 bg-azm-charcoal/30">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/5 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse sm:px-6 lg:px-10">
          {[
            { i: Truck, t: "شحن سريع", d: "لكل محافظات مصر" },
            { i: ShieldCheck, t: "منتجات أصلية", d: "بضمان المصدر" },
            { i: Award, t: "دعم المدربين", d: "استشارة مجانية" },
          ].map((f) => (
            <div key={f.t} className="flex items-center gap-4 px-4 py-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-azm-gold/30 bg-azm-gold/5 text-azm-gold">
                <f.i className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white">{f.t}</div>
                <div className="text-xs text-white/50">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Section eyebrow="Best Sellers" title="الأكثر مبيعاً" cta="عرض الكل" ctaTo="/shop">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {bestSellers.slice(0, 4).map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
        </div>
      </Section>

      <div className="border-t border-white/5 bg-azm-charcoal/20">
        <Section eyebrow="New Arrivals" title="أحدث المنتجات" cta="عرض الكل" ctaTo="/shop">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {newest.map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
          </div>
        </Section>
      </div>

      {/* Special offers banner */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-azm-gold/20 bg-gradient-to-l from-azm-black via-azm-charcoal to-azm-black p-8 sm:p-14"
        >
          <div className="absolute inset-0 arabic-pattern opacity-30" />
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-azm-gold/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-azm-gold">Special Offers • عروض خاصة</div>
              <h2 className="mt-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
                خصم يصل إلى <span className="gold-text">٣٠٪</span>
                <br />على تشكيلة مختارة
              </h2>
              <p className="mt-5 max-w-md text-base text-white/60">عروض محدودة على أفضل المكملات والإكسسوارات. الفرصة لا تتكرر.</p>
              <Link href="/shop" className="mt-8 inline-flex items-center gap-3 rounded-full bg-azm-gold px-7 py-4 text-sm font-bold text-azm-black transition hover:bg-azm-sand">
                تسوق العروض
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {offers.slice(0, 2).map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured */}
      <div className="border-t border-white/5">
        <Section eyebrow="Featured" title="المنتجات المميزة" cta="عرض الكل" ctaTo="/shop">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
          </div>
        </Section>
      </div>

      {/* Brands */}
      <div className="border-y border-white/5 bg-azm-charcoal/20">
        <Section eyebrow="Our Brands" title="العلامات التجارية" cta="كل العلامات" ctaTo="/brands">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((b, i) => (
              <motion.div key={b} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <Link href="/brands" className="group flex aspect-[3/2] w-full items-center justify-center bg-azm-black transition hover:bg-azm-charcoal">
                  <span className="font-display text-xl font-black text-white/50 transition group-hover:text-azm-gold sm:text-2xl">{b}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Categories */}
      <Section eyebrow="Browse" title="تصفح حسب الفئة" cta="كل الفئات" ctaTo="/shop">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.slice(0, 8).map((c) => (
            <Link key={c.slug} href="/shop" className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5 transition hover:border-azm-gold/30 hover:bg-azm-charcoal/70">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-azm-gold">{c.nameEn}</div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl font-black text-white">{c.name}</div>
                  <div className="mt-1 text-xs text-white/40">{c.count} منتج</div>
                </div>
                <ArrowLeft className="h-5 w-5 text-white/40 transition group-hover:-translate-x-1 group-hover:text-azm-gold" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Accessories */}
      <div className="border-t border-white/5">
        <Section eyebrow="Gym Gear" title="منتجات الجيم والإكسسوارات" cta="عرض الكل" ctaTo="/shop">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {accessories.map((p, i) => (<ProductCard key={p.id} p={p} index={i} />))}
          </div>
        </Section>
      </div>

      {/* Testimonials */}
      <div className="border-t border-white/5 bg-azm-charcoal/20">
        <Section eyebrow="Testimonials" title="آراء العملاء">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { n: "أحمد الشناوي", r: "لاعب كمال أجسام • القاهرة", q: "أخيراً مكان بيبيع مكملات أصلية بأسعار محترمة. الواي بروتين تحفة والشحن جالي في يومين." },
              { n: "منة عبد الرحمن", r: "مدربة كروس فيت • الإسكندرية", q: "الإكسسوارات جودتها ممتازة، خصوصاً الحزام والقفازات. AZM بقى الاختيار الأول لكل الطلبة عندي." },
              { n: "كريم يوسف", r: "لاعب باور ليفتنغ • الجيزة", q: "بجرب مكملات من سنين، دي أول مرة أحس إن في براند مصري بيفهم اللاعبين فعلاً. مستوى مختلف." },
            ].map((t, i) => (
              <motion.figure key={t.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="relative flex flex-col gap-6 rounded-2xl border border-white/5 bg-azm-charcoal/50 p-8">
                <Quote className="h-8 w-8 text-azm-gold/60" />
                <blockquote className="text-lg leading-relaxed text-white/85">{t.q}</blockquote>
                <div className="flex items-center gap-1 text-azm-gold">
                  {Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="h-4 w-4 fill-current" />))}
                </div>
                <figcaption className="hairline flex items-center gap-4 pt-6">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-azm-gold/10 font-bold text-azm-gold">{t.n.charAt(0)}</div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.n}</div>
                    <div className="text-xs text-white/50">{t.r}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Section>
      </div>

      {/* Partners */}
      <div className="border-t border-white/5">
        <Section eyebrow="Partners" title="شركاؤنا">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {["GoldGym", "FitZone", "IronHouse", "Elite Sports", "PowerHub", "Muscle Factory"].map((p) => (
              <div key={p} className="flex aspect-[3/2] items-center justify-center rounded-xl border border-white/5 bg-azm-charcoal/40 text-center text-sm font-bold text-white/60">
                {p}
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* FAQ */}
      <div className="border-t border-white/5 bg-azm-charcoal/20">
        <Section eyebrow="FAQ" title="أسئلة شائعة" cta="كل الأسئلة" ctaTo="/faq">
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              { q: "هل المنتجات أصلية؟", a: "كل منتجاتنا مستوردة من الوكيل المعتمد مع ضمان الأصالة." },
              { q: "كم مدة الشحن؟", a: "من ١-٢ يوم للقاهرة والجيزة، و٢-٥ أيام لباقي المحافظات." },
              { q: "هل يمكنني الإرجاع؟", a: "نعم، خلال ١٤ يوم من الاستلام مع الحفاظ على المنتج مغلق." },
              { q: "هل الدفع عند الاستلام متاح؟", a: "نعم متاح لكل المحافظات، بالإضافة للدفع بالفيزا والمحفظة." },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5 transition open:border-azm-gold/30">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-white">
                  {f.q}
                  <ChevronDown className="h-4 w-4 text-azm-gold transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-azm-gold/20 bg-azm-charcoal/40 p-10 text-center sm:p-16">
          <div className="absolute inset-0 arabic-pattern opacity-20" />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-azm-gold">Newsletter</div>
            <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">اشترك واحصل على <span className="gold-text">١٠٪ خصم</span></h2>
            <p className="mt-3 text-sm text-white/60">أول من يعرف بالعروض والمنتجات الجديدة.</p>
            <form className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-azm-black/50 p-1.5 pr-4">
              <input type="email" placeholder="بريدك الإلكتروني" className="flex-1 bg-transparent text-sm placeholder:text-white/40 focus:outline-none" />
              <button className="rounded-full bg-azm-gold px-5 py-2.5 text-xs font-bold text-azm-black transition hover:bg-azm-sand">اشترك</button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
