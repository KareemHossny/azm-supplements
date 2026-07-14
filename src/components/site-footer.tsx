import Link from "next/link";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

export function SiteFooter() {
  const cols = [
    {
      title: "المتجر",
      links: [
        { l: "كل المنتجات", to: "/shop" },
        { l: "المكملات", to: "/shop" },
        { l: "الإكسسوارات", to: "/shop" },
        { l: "العروض", to: "/shop" },
        { l: "العلامات التجارية", to: "/brands" },
      ],
    },
    {
      title: "الدعم",
      links: [
        { l: "الشحن والتوصيل", to: "/faq" },
        { l: "الإرجاع والاستبدال", to: "/returns" },
        { l: "الأسئلة الشائعة", to: "/faq" },
        { l: "تواصل معنا", to: "/contact" },
        { l: "تتبع الطلب", to: "/track" },
      ],
    },
    {
      title: "AZM",
      links: [
        { l: "قصتنا", to: "/about" },
        { l: "الشروط والأحكام", to: "/terms" },
        { l: "سياسة الخصوصية", to: "/privacy" },
        { l: "سياسة الإرجاع", to: "/returns" },
      ],
    },
  ];
  return (
    <footer className="border-t border-white/5 bg-azm-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-black tracking-tight">
                ع<span className="gold-text">ز</span>م
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">AZM</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              كل اللي تحتاجه للتمرين الحقيقي. مكملات أصلية وإكسسوارات جيم مختارة للرياضيين في مصر.
            </p>
            <form className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pr-4">
              <input type="email" placeholder="بريدك للحصول على العروض" className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none" />
              <button className="rounded-full bg-azm-gold px-4 py-2 text-xs font-bold text-azm-black transition hover:bg-azm-sand">اشترك</button>
            </form>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Facebook, Youtube, MessageCircle].map((I, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-azm-gold/40 hover:text-azm-gold">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-azm-gold">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.l}>
                    <Link href={l.to} className="text-sm text-white/70 transition hover:text-white">{l.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">© 2026 AZM. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/admin" className="hover:text-azm-gold">لوحة الإدارة</Link>
            <span>صُنع بعزم في القاهرة 🇪🇬</span>
          </div>
        </div>
      </div>
    </footer>
  );
}