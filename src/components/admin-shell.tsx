"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Warehouse,
  Truck, Ticket, Settings, LogOut, Search,
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
  { l: "الإعدادات", to: "/admin/settings", i: Settings },
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
              <div className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-3 sm:flex">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-azm-gold/20 text-xs font-bold text-azm-gold">م</div>
                <span className="text-sm font-medium">المدير</span>
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