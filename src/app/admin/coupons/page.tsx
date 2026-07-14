"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui-bits";
import { getCoupons, createCoupon, deleteCoupon, type CouponRow } from "@/lib/supabase/coupons";

export default function Page() {
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState("percentage");
  const [value, setValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxUses, setMaxUses] = useState("");

  useEffect(() => { getCoupons().then(setCoupons).catch(() => {}); }, []);

  async function handleAdd() {
    await createCoupon({ code, type, value: Number(value), min_order: Number(minOrder) || 0, max_uses: Number(maxUses) || 0 });
    setCoupons(await getCoupons());
    setShowAdd(false); setCode(""); setType("percentage"); setValue(""); setMinOrder(""); setMaxUses("");
  }

  async function handleDelete(id: string) {
    await deleteCoupon(id);
    setCoupons(prev => prev.filter(c => c.id !== id));
  }

  const typeLabel: Record<string, string> = { percentage: "نسبة", fixed: "مبلغ", shipping: "شحن مجاني" };

  return (
    <AdminShell title="الكوبونات" actions={
      <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> كوبون جديد</button>
    }>
      {showAdd && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-azm-gold/30 bg-azm-gold/5 p-4">
          <div><label className="mb-1 block text-xs text-white/60">الكود</label><input value={code} onChange={e => setCode(e.target.value.toUpperCase())} className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm font-mono" /></div>
          <div><label className="mb-1 block text-xs text-white/60">النوع</label>
            <select value={type} onChange={e => setType(e.target.value)} className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm">
              <option value="percentage">نسبة</option><option value="fixed">مبلغ</option><option value="shipping">شحن مجاني</option>
            </select>
          </div>
          <div><label className="mb-1 block text-xs text-white/60">القيمة</label><input type="number" value={value} onChange={e => setValue(e.target.value)} className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm w-24" /></div>
          <div><label className="mb-1 block text-xs text-white/60">أقل طلب</label><input type="number" value={minOrder} onChange={e => setMinOrder(e.target.value)} className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm w-24" /></div>
          <div><label className="mb-1 block text-xs text-white/60">حد الاستخدام</label><input type="number" value={maxUses} onChange={e => setMaxUses(e.target.value)} className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm w-24" /></div>
          <button onClick={handleAdd} className="rounded-full bg-azm-gold px-4 py-2 text-sm font-bold text-azm-black">إضافة</button>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50">
            <tr><th className="p-3">الكود</th><th className="p-3">النوع</th><th className="p-3">القيمة</th><th className="p-3">أقل طلب</th><th className="p-3">الاستخدام</th><th className="p-3">الحالة</th><th className="p-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {coupons.map(c => (
              <tr key={c.id}>
                <td className="p-3 font-mono font-bold text-azm-gold">{c.code}</td>
                <td className="p-3">{typeLabel[c.type] || c.type}</td>
                <td className="p-3 font-bold">{c.type === "percentage" ? `${c.value}%` : `${c.value} ج.م`}</td>
                <td className="p-3">{c.min_order > 0 ? `${c.min_order} ج.م` : "—"}</td>
                <td className="p-3">{c.used_count}{c.max_uses > 0 ? ` / ${c.max_uses}` : ""}</td>
                <td className="p-3"><Badge tone={c.is_active ? "green" : "red"}>{c.is_active ? "نشط" : "ملغي"}</Badge></td>
                <td className="p-3">
                  <button onClick={() => handleDelete(c.id)} className="grid h-8 w-8 place-items-center rounded-full text-red-400 hover:bg-red-500/10"><Trash2 className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-white/40">لا توجد كوبونات</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
