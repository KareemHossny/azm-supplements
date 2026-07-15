"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

const nav = [
  { ar: "الرئيسية", en: "Home", to: "/" },
  { ar: "المتجر", en: "Shop", to: "/shop" },
  { ar: "العلامات", en: "Brands", to: "/brands" },
  { ar: "تتبع الطلب", en: "Track", to: "/track" },
  { ar: "من نحن", en: "About", to: "/about" },
  { ar: "تواصل", en: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-azm-black/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
              ع<span className="gold-text">ز</span>م
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:block">
              AZM
            </span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.ar}
                href={n.to}
                className={`text-sm font-medium transition ${
                  isActive(n.to, n.to === "/")
                    ? "text-azm-gold"
                    : "text-white/70 hover:text-azm-gold"
                }`}
              >
                {n.ar}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/shop" className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white">
            <Search className="h-5 w-5" />
          </Link>

          <Link href="/account/favorites" className="hidden h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white sm:grid">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/account" className="hidden h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white sm:grid">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-azm-gold text-[10px] font-bold text-azm-black">{itemCount > 9 ? "9+" : itemCount}</span>}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-azm-black/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((n) => (
              <Link
                key={n.ar}
                href={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5"
              >
                <span>{n.ar}</span>
                <span className="text-xs uppercase tracking-widest text-white/30">{n.en}</span>
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
              <Link href="/account" onClick={() => setOpen(false)} className="rounded-lg bg-white/5 px-3 py-3 text-center text-sm">حسابي</Link>
              <Link href="/cart" onClick={() => setOpen(false)} className="rounded-lg bg-azm-gold px-3 py-3 text-center text-sm font-bold text-azm-black">السلة</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}