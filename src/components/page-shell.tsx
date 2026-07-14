"use client";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  wide = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { l: string; to?: string }[];
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-azm-black text-white">
      <SiteHeader />
      <div className="pt-24 sm:pt-32">
        <div className={`mx-auto ${wide ? "max-w-[1400px]" : "max-w-7xl"} px-4 sm:px-6 lg:px-10`}>
          {breadcrumbs && (
            <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-white/50">
              <Link href="/" className="hover:text-azm-gold">الرئيسية</Link>
              {breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronLeft className="h-3 w-3" />
                  {b.to ? (
                    <Link href={b.to} className="hover:text-azm-gold">{b.l}</Link>
                  ) : (
                    <span className="text-white/80">{b.l}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <div className="mb-10 border-b border-white/5 pb-8">
            {eyebrow && (
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-azm-gold">{eyebrow}</div>
            )}
            <h1 className="mt-3 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-base text-white/60 sm:text-lg">{description}</p>
            )}
          </div>
          {children}
        </div>
      </div>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </div>
  );
}