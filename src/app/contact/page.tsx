import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا — AZM",
};

export default function Page() {
  return (
    <PageShell eyebrow="Contact" title="تواصل معنا" description="فريق الدعم متاح ٧ أيام في الأسبوع." breadcrumbs={[{ l: "تواصل" }]}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {[{i:Phone,l:"هاتف",v:"19999"},{i:Mail,l:"بريد",v:"support@azm.com"},{i:MessageCircle,l:"واتساب",v:"01xxxxxxxxx"},{i:MapPin,l:"العنوان",v:"القاهرة، مدينة نصر"}].map(c => (
            <div key={c.l} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-azm-gold/15 text-azm-gold"><c.i className="h-5 w-5" /></div>
              <div><div className="text-xs text-white/50">{c.l}</div><div className="font-bold">{c.v}</div></div>
            </div>
          ))}
        </div>
        <form className="space-y-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="الاسم" className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" />
            <input placeholder="البريد" type="email" className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" />
          </div>
          <input placeholder="الموضوع" className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" />
          <textarea rows={6} placeholder="رسالتك..." className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" />
          <button className="rounded-full bg-azm-gold px-8 py-3 text-sm font-bold text-azm-black">إرسال</button>
        </form>
      </div>
    </PageShell>
  );
}
