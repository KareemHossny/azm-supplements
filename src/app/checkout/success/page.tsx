"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";

function Content() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "AZM-2026-0142";
  return (
    <PageShell title="">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"><CheckCircle2 className="h-10 w-10" /></div>
        <h1 className="mt-8 font-display text-4xl font-black">تم استلام طلبك!</h1>
        <p className="mt-3 text-white/60">رقم الطلب: <span className="font-bold text-azm-gold">{orderNumber}</span></p>
        <p className="mt-2 text-sm text-white/60">هنبعتلك تأكيد على الإيميل وهنكلمك لتأكيد التوصيل.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/track" className="rounded-full bg-azm-gold px-6 py-3 text-sm font-bold text-azm-black">تتبع الطلب</Link>
          <Link href="/shop" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold">متابعة التسوق</Link>
        </div>
      </div>
    </PageShell>
  );
}

export default function Page() {
  return <Suspense><Content /></Suspense>;
}
