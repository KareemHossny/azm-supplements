"use client";

import { useEffect, useState } from "react";
import { MapPin, Plus, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui-bits";
import { getAddresses, createAddress, deleteAddress, type AddressRow } from "@/lib/supabase/addresses";
import { getGovernorates } from "@/lib/supabase/governorates";

export default function Addresses() {
  const [addresses, setAddresses] = useState<AddressRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [govs, setGovs] = useState<{ name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ label: "المنزل", full_name: "", phone: "", governorate: "", city: "", address: "", landmark: "" });

  useEffect(() => {
    getAddresses().then(setAddresses).catch(() => {});
    getGovernorates().then(g => setGovs(g)).catch(() => {});
  }, []);

  async function handleAdd() {
    setSaving(true);
    try {
      const a = await createAddress({ ...form, is_default: addresses.length === 0 });
      setAddresses(prev => [a, ...prev.filter(x => x.id !== a.id)]);
      setShowForm(false);
      setForm({ label: "المنزل", full_name: "", phone: "", governorate: "", city: "", address: "", landmark: "" });
    } catch { /* ignore */ }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    try {
      await deleteAddress(id);
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch { /* ignore */ }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-black">العناوين</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2.5 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> {showForm ? "إلغاء" : "إضافة"}</button>
      </div>

      {showForm && (
        <div className="mb-6 grid gap-4 rounded-2xl border border-azm-gold/20 bg-azm-gold/5 p-6 sm:grid-cols-2">
          <div><label className="mb-1 block text-xs text-white/60">التصنيف</label>
            <select value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm">
              <option value="المنزل">المنزل</option>
              <option value="العمل">العمل</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
          <div><label className="mb-1 block text-xs text-white/60">الاسم بالكامل</label><input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
          <div><label className="mb-1 block text-xs text-white/60">رقم الموبايل</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
          <div><label className="mb-1 block text-xs text-white/60">المحافظة</label>
            <select value={form.governorate} onChange={e => setForm({ ...form, governorate: e.target.value })} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm">
              <option value="">اختر</option>
              {govs.map(g => <option key={g.name}>{g.name}</option>)}
            </select>
          </div>
          <div><label className="mb-1 block text-xs text-white/60">المدينة</label><input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-xs text-white/60">العنوان بالتفصيل</label><input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-xs text-white/60">أقرب معلم</label><input value={form.landmark} onChange={e => setForm({ ...form, landmark: e.target.value })} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm" /></div>
          <div className="sm:col-span-2">
            <button onClick={handleAdd} disabled={saving} className="flex items-center gap-2 rounded-full bg-azm-gold px-6 py-2.5 text-sm font-bold text-azm-black disabled:opacity-50">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} حفظ العنوان
            </button>
          </div>
        </div>
      )}

      {addresses.length === 0 && !showForm && (
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-8 text-center text-sm text-white/50">
          <MapPin className="mx-auto mb-3 h-8 w-8 text-white/20" />
          لا توجد عناوين مضافة بعد
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {addresses.map(a => (
          <div key={a.id} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
            <div className="mb-2 flex items-center justify-between">
              <Badge tone="blue">{a.label}</Badge>
              <button onClick={() => handleDelete(a.id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="space-y-1 text-sm">
              <div className="font-bold">{a.full_name}</div>
              <div className="text-white/60">{a.phone}</div>
              <div className="text-white/60">{a.governorate} • {a.city}</div>
              <div className="text-white/50">{a.address}</div>
              {a.landmark && <div className="text-xs text-white/40">قرب: {a.landmark}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
