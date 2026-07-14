import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { categories } from "@/lib/products";
export default function Page() {
  return (
    <AdminShell title="الفئات" actions={<button className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> فئة جديدة</button>}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(c => (
          <div key={c.slug} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
            <div className="flex items-start justify-between">
              <div><div className="font-bold">{c.name}</div><div className="text-xs text-white/50">{c.nameEn} • {c.count} منتج</div></div>
              <div className="flex gap-1"><button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"><Pencil className="h-3.5 w-3.5" /></button><button className="grid h-8 w-8 place-items-center rounded-full text-red-400 hover:bg-red-500/10"><Trash2 className="h-3.5 w-3.5" /></button></div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
