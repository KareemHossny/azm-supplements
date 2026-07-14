"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { getCategories, createCategory, updateCategory, deleteCategory, type CategoryRow } from "@/lib/supabase/categories";

export default function Page() {
  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editNameEn, setEditNameEn] = useState("");
  const [newName, setNewName] = useState("");
  const [newNameEn, setNewNameEn] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => { getCategories().then(setCats).catch(() => {}); }, []);

  async function handleSave(id: string) {
    await updateCategory(id, { name: editName, name_en: editNameEn });
    setCats(prev => prev.map(c => c.id === id ? { ...c, name: editName, name_en: editNameEn } : c));
    setEditing(null);
  }

  async function handleDelete(id: string) {
    await deleteCategory(id);
    setCats(prev => prev.filter(c => c.id !== id));
  }

  async function handleAdd() {
    const slug = newNameEn.toLowerCase().replace(/\s+/g, "-");
    const created = await createCategory({ slug, name: newName, name_en: newNameEn });
    setCats(prev => [...prev, created]);
    setNewName(""); setNewNameEn(""); setAdding(false);
  }

  return (
    <AdminShell title="الفئات" actions={
      <button onClick={() => setAdding(true)} className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> فئة جديدة</button>
    }>
      {adding && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-azm-gold/30 bg-azm-gold/5 p-4">
          <div><label className="mb-1 block text-xs text-white/60">الاسم (عربي)</label><input value={newName} onChange={e => setNewName(e.target.value)} className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-xs text-white/60">الاسم (إنجليزي)</label><input value={newNameEn} onChange={e => setNewNameEn(e.target.value)} className="rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2 text-sm" /></div>
          <button onClick={handleAdd} className="rounded-full bg-azm-gold px-4 py-2 text-sm font-bold text-azm-black"><Check className="h-4 w-4" /></button>
          <button onClick={() => setAdding(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm"><X className="h-4 w-4" /></button>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map(c => (
          <div key={c.id} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
            {editing === c.id ? (
              <div className="space-y-2">
                <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-azm-black/40 px-3 py-1.5 text-sm" />
                <input value={editNameEn} onChange={e => setEditNameEn(e.target.value)} className="w-full rounded-lg border border-white/10 bg-azm-black/40 px-3 py-1.5 text-sm" />
                <div className="flex gap-1">
                  <button onClick={() => handleSave(c.id)} className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400"><Check className="h-3 w-3" /></button>
                  <button onClick={() => setEditing(null)} className="rounded-full border border-white/10 px-3 py-1 text-xs"><X className="h-3 w-3" /></button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold">{c.name}</div>
                  <div className="text-xs text-white/50">{c.name_en}</div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(c.id); setEditName(c.name); setEditNameEn(c.name_en); }} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => handleDelete(c.id)} className="grid h-8 w-8 place-items-center rounded-full text-red-400 hover:bg-red-500/10"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
