import Link from "next/link";
import { Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صيانة — AZM",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="grid min-h-screen place-items-center bg-azm-black px-4 text-center text-white">
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-azm-gold/15 text-azm-gold"><Wrench className="h-9 w-9" /></div>
        <h1 className="mt-8 font-display text-5xl font-black">صيانة مؤقتة</h1>
        <p className="mt-4 text-white/60">نعمل على تحسين تجربتك. سنعود قريباً بعزم أكبر.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-azm-gold px-6 py-3 text-sm font-bold text-azm-black">للرئيسية</Link>
      </div>
    </div>
  );
}
