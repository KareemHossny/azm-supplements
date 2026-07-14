import { Plus, Bell, Send } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
export default function Page() {
  return (
    <AdminShell title="الإشعارات" actions={<button className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> إشعار جديد</button>}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-black"><Send className="h-4 w-4 text-azm-gold" /> إرسال إشعار</h3>
          <div className="space-y-3">
            <input placeholder="العنوان" className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm" />
            <textarea rows={4} placeholder="محتوى الإشعار..." className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm" />
            <select className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm"><option>كل العملاء</option><option>عملاء VIP</option><option>العملاء الجدد</option></select>
            <button className="w-full rounded-full bg-azm-gold py-2.5 text-sm font-bold text-azm-black">إرسال</button>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display text-lg font-black">آخر الإشعارات</h3>
          <div className="space-y-2">
            {["خصم ٢٠٪ على الواي بروتين","منتجات جديدة وصلت","شحن مجاني نهاية الأسبوع"].map((t, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-azm-gold/15 text-azm-gold"><Bell className="h-4 w-4" /></div>
                <div className="flex-1"><div className="font-bold">{t}</div><div className="text-xs text-white/50">وصل لـ ١,٢٣٤ عميل</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
