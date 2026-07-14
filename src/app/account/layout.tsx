"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Heart, MapPin, User, Bell, Ticket, RotateCcw, LogOut } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const nav = [
  { l: "لوحة التحكم", to: "/account", i: LayoutDashboard, exact: true },
  { l: "طلباتي", to: "/account/orders", i: Package },
  { l: "المفضلة", to: "/account/wishlist", i: Heart },
  { l: "العناوين", to: "/account/addresses", i: MapPin },
  { l: "الملف الشخصي", to: "/account/profile", i: User },
  { l: "الإشعارات", to: "/account/notifications", i: Bell },
  { l: "الكوبونات", to: "/account/coupons", i: Ticket },
  { l: "المرتجعات", to: "/account/returns", i: RotateCcw },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-azm-black text-white">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36 lg:px-10">
        <div className="mb-8 flex items-center gap-4 border-b border-white/5 pb-6">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-azm-gold/15 font-display text-2xl font-black text-azm-gold">م</div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-azm-gold">أهلاً بيك</div>
            <div className="font-display text-2xl font-black">مروان عبد الرحمن</div>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl border border-white/5 bg-azm-charcoal/30 p-3">
            {nav.map(n => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to) && pathname !== "/account"
              return (
                <Link key={n.to} href={n.to} className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-azm-gold/10 text-azm-gold" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                  <n.i className="h-4 w-4" /> {n.l}
                </Link>
              )
            })}
            <Link href="/" className="mt-2 flex items-center gap-3 rounded-xl border-t border-white/5 px-3 pt-4 text-sm font-medium text-white/60 hover:text-white"><LogOut className="h-4 w-4" /> خروج</Link>
          </aside>
          <div>{children}</div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
