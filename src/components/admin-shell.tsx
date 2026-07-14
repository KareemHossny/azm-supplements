"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Warehouse,
  Truck, Ticket, BarChart3, Star, Bell, Settings, ShieldCheck, LogOut, Search,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { l: "لوحة التحكم", to: "/admin", i: LayoutDashboard, exact: true },
  { l: "المنتجات", to: "/admin/products", i: Package },
  { l: "الفئات", to: "/admin/categories", i: FolderTree },
  { l: "الطلبات", to: "/admin/orders", i: ShoppingCart },
  { l: "العملاء", to: "/admin/customers", i: Users },
  { l: "المخزون", to: "/admin/inventory", i: Warehouse },
  { l: "الشحن", to: "/admin/shipping", i: Truck },
  { l: "الكوبونات", to: "/admin/coupons", i: Ticket },
  { l: "التحليلات", to: "/admin/analytics", i: BarChart3 },
  { l: "التقييمات", to: "/admin/reviews", i: Star },
  { l: "الإشعارات", to: "/admin/notifications", i: Bell },
  { l: "الإعدادات", to: "/admin/settings", i: Settings },
  { l: "المشرفين", to: "/admin/admins", i: ShieldCheck },
];

export function AdminShell({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div dir="rtl" className="min-h-screen bg-azm-black text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-l border-white/5 bg-azm-charcoal/30 lg:flex">
          <Link href="/admin" className="flex items-center gap-2 border-b border-white/5 px-6 py-5">
            <span className="font-display text-2xl font-black">
              ع<span className="gold-text">ز</span>م
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-azm-gold">Admin</span>
          </Link>
          <nav className="flex-1 overflow-y-auto p-3">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  href={n.to}
                  className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-azm-gold/10 text-azm-gold"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <n.i className="h-4 w-4" />
                  {n.l}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/5 p-3">
            <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white">
              <LogOut className="h-4 w-4" />
              الخروج للمتجر
            </Link>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/5 bg-azm-black/85 px-4 py-4 backdrop-blur-xl sm:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <h1 className="truncate font-display text-xl font-black sm:text-2xl">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 sm:flex">
                <Search className="h-4 w-4 text-white/40" />
                <input placeholder="بحث سريع..." className="w-48 bg-transparent text-sm placeholder:text-white/40 focus:outline-none" />
              </div>
              <Link href="/admin/notifications" className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:border-azm-gold/40">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-azm-gold text-[10px] font-bold text-azm-black">3</span>
              </Link>
              <div className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-3 sm:flex">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-azm-gold/20 text-xs font-bold text-azm-gold">م</div>
                <span className="text-sm font-medium">مروان</span>
              </div>
              {actions}
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}