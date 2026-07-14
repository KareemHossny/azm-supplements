"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminShell } from "@/components/admin-shell";
import { getSettings, updateSetting, type SettingRow } from "@/lib/supabase/settings";

type SettingsMap = Record<string, string>;

export default function Page() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getSettings().then(rows => {
      const map: SettingsMap = {};
      rows.forEach(r => { map[r.key] = r.value; });
      setSettings(map);
    }).catch(() => {});
  }, []);

  const set = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = useCallback(async () => {
    setSaving(true);
    setMsg("");
    try {
      for (const [key, value] of Object.entries(settings)) {
        await updateSetting(key, value);
      }
      setMsg("تم الحفظ");
      setTimeout(() => setMsg(""), 2000);
    } catch { setMsg("حدث خطأ"); }
    setSaving(false);
  }, [settings]);

  return (
    <AdminShell title="الإعدادات" actions={
      <button onClick={handleSave} disabled={saving} className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black disabled:opacity-50">
        {saving ? "جاري الحفظ..." : msg || "حفظ"}
      </button>
    }>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="بيانات المتجر">
          <F label="اسم المتجر" value={settings.store_name || ""} onChange={v => set("store_name", v)} />
          <F label="البريد الرسمي" value={settings.store_email || ""} onChange={v => set("store_email", v)} />
          <F label="الموبايل" value={settings.store_phone || ""} onChange={v => set("store_phone", v)} />
          <F label="العنوان" value={settings.store_address || ""} onChange={v => set("store_address", v)} />
        </Card>
        <Card title="الضرائب والشحن">
          <F label="ضريبة القيمة المضافة %" value={settings.tax_rate || "14"} onChange={v => set("tax_rate", v)} />
          <F label="الشحن المجاني عند طلب (ج.م)" value={settings.shipping_threshold || "500"} onChange={v => set("shipping_threshold", v)} />
        </Card>
      </div>
    </AdminShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6"><h3 className="mb-4 font-display text-lg font-black">{title}</h3><div className="space-y-3">{children}</div></div>;
}

function F({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <div><label className="mb-2 block text-xs font-bold text-white/60">{label}</label><input value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm focus:border-azm-gold focus:outline-none" /></div>;
}
