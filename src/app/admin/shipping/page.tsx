import { AdminShell } from "@/components/admin-shell";
import { governorates } from "@/lib/products";
export default function Page() {
  return (
    <AdminShell title="إعدادات الشحن" actions={<button className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black">حفظ التغييرات</button>}>
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50"><tr><th className="p-3">المحافظة</th><th className="p-3">تكلفة الشحن (ج.م)</th><th className="p-3">مدة التوصيل (أيام)</th><th className="p-3">مُفعّل</th></tr></thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {governorates.map(g => (
              <tr key={g.name}><td className="p-3 font-bold">{g.name}</td><td className="p-3"><input type="number" defaultValue={g.fee} className="w-24 rounded-lg border border-white/10 bg-azm-black/40 px-3 py-1.5" /></td><td className="p-3"><input defaultValue={g.days} className="w-24 rounded-lg border border-white/10 bg-azm-black/40 px-3 py-1.5" /></td><td className="p-3"><input type="checkbox" defaultChecked className="accent-azm-gold" /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
