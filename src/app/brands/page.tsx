import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { brands } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "العلامات التجارية — AZM",
};

export default function Page() {
  return (
    <PageShell eyebrow="Brands" title="العلامات التجارية" description="أفضل العلامات العالمية والمحلية تحت سقف واحد." breadcrumbs={[{ l: "العلامات" }]}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {brands.concat(["Optimum","MuscleTech","BSN","Dymatize","Rule1","MyProtein"]).map(b => (
          <Link key={b} href="/shop" className="group flex aspect-[3/2] items-center justify-center rounded-2xl border border-white/5 bg-azm-charcoal/40 transition hover:border-azm-gold/30 hover:bg-azm-charcoal/70">
            <span className="font-display text-xl font-black text-white/60 transition group-hover:text-azm-gold sm:text-2xl">{b}</span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
