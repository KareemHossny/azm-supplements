import Link from "next/link";
import { Upload, Plus, X } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";

export default function Page() {
  return (
    <AdminShell title="إضافة منتج جديد" actions={<><Link href="/admin/products" className="rounded-full border border-white/10 px-5 py-2 text-sm">إلغاء</Link><button className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black">حفظ</button></>}>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-4 font-display text-lg font-black">المعلومات الأساسية</h3>
            <div className="grid gap-4">
              <F l="الاسم بالعربية" p="مثال: واي بروتين إيزوليت" />
              <F l="الاسم بالإنجليزية" p="Whey Isolate 2kg" />
              <div><label className="mb-2 block text-xs font-bold text-white/60">الوصف</label><textarea rows={5} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" /></div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-4 font-display text-lg font-black">الصور</h3>
            <div className="grid grid-cols-4 gap-3">
              {[1,2,3].map(i => <div key={i} className="aspect-square rounded-xl border border-white/10 bg-azm-black/40" />)}
              <button className="grid aspect-square place-items-center rounded-xl border border-dashed border-white/20 text-white/40 hover:border-azm-gold hover:text-azm-gold"><Upload className="h-6 w-6" /></button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-4 font-display text-lg font-black">المتغيرات</h3>
            <table className="w-full text-right text-sm">
              <thead className="text-xs uppercase text-white/50"><tr><th className="p-2">النكهة</th><th className="p-2">الحجم</th><th className="p-2">الوزن</th><th className="p-2">السعر</th><th className="p-2">المخزون</th><th /></tr></thead>
              <tbody className="divide-y divide-white/5">
                {["شوكولاتة","فانيليا"].map(f => (
                  <tr key={f}><td className="p-2">{f}</td><td className="p-2">2kg</td><td className="p-2">2000g</td><td className="p-2">2400</td><td className="p-2">15</td><td className="p-2"><button className="text-red-400"><X className="h-4 w-4" /></button></td></tr>
                ))}
              </tbody>
            </table>
            <button className="mt-3 flex items-center gap-1 text-xs font-bold text-azm-gold"><Plus className="h-3 w-3" /> إضافة متغير</button>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-4 font-display text-lg font-black">التنظيم</h3>
            <div className="space-y-4">
              <F l="الفئة" p="بروتين" />
              <F l="العلامة" p="AZM Pro" />
              <F l="SKU" p="AZM-0001" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
            <h3 className="mb-4 font-display text-lg font-black">الحالة</h3>
            <select className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm"><option>نشط</option><option>مسودة</option><option>مؤرشف</option></select>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
function F({ l, p }: { l: string; p: string }) {
  return (<div><label className="mb-2 block text-xs font-bold text-white/60">{l}</label><input placeholder={p} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm focus:border-azm-gold focus:outline-none" /></div>);
}
