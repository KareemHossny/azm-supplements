"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminShell } from "@/components/admin-shell";
import { getGovernorates, updateGovernorate, type GovernorateRow } from "@/lib/supabase/governorates";

export default function Page() {
  const [govs, setGovs] = useState<GovernorateRow[]>([]);

  useEffect(() => {
    getGovernorates(true).then(setGovs).catch(() => {});
  }, []);

  const handleBlur = useCallback(async (id: string, field: "fee" | "delivery_days" | "is_active", value: string | boolean) => {
    const updates: Partial<GovernorateRow> = {};
    if (field === "fee") updates.fee = Number(value);
    else if (field === "delivery_days") updates.delivery_days = String(value);
    else if (field === "is_active") updates.is_active = Boolean(value);
    try {
      await updateGovernorate(id, updates);
      setGovs(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    } catch { /* ignore */ }
  }, []);

  return (
    <AdminShell title="إعدادات الشحن">
      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-right text-sm">
          <thead className="bg-azm-charcoal/60 text-xs uppercase text-white/50">
            <tr><th className="p-3">المحافظة</th><th className="p-3">تكلفة الشحن (ج.م)</th><th className="p-3">مدة التوصيل</th><th className="p-3">مُفعّل</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-azm-charcoal/20">
            {govs.map(g => (
              <tr key={g.id}>
                <td className="p-3 font-bold">{g.name}</td>
                <td className="p-3">
                  <input type="number" defaultValue={g.fee} onBlur={e => handleBlur(g.id, "fee", e.target.value)} className="w-24 rounded-lg border border-white/10 bg-azm-black/40 px-3 py-1.5" />
                </td>
                <td className="p-3">
                  <input defaultValue={g.delivery_days} onBlur={e => handleBlur(g.id, "delivery_days", e.target.value)} className="w-24 rounded-lg border border-white/10 bg-azm-black/40 px-3 py-1.5" />
                </td>
                <td className="p-3">
                  <input type="checkbox" defaultChecked={g.is_active} onChange={e => handleBlur(g.id, "is_active", e.target.checked)} className="accent-azm-gold" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
