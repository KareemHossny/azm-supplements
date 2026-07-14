import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui-bits"

export default function Addresses() {
  const addrs = [
    { l: "المنزل", n: "مروان عبد الرحمن", a: "القاهرة، مدينة نصر، شارع عباس العقاد", p: "01xxxxxxxxx", def: true },
    { l: "العمل", n: "مروان عبد الرحمن", a: "الجيزة، الشيخ زايد، الحي الأول", p: "01xxxxxxxxx" },
  ]
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-black">العناوين</h2>
        <button className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2.5 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> إضافة</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {addrs.map(a => (
          <div key={a.l} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-azm-gold" /><span className="font-bold">{a.l}</span></div>
              {a.def && <Badge>افتراضي</Badge>}
            </div>
            <div className="text-sm text-white/80">{a.n}</div>
            <div className="mt-1 text-sm text-white/60">{a.a}</div>
            <div className="mt-1 text-sm text-white/60">{a.p}</div>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs"><Pencil className="h-3 w-3" /> تعديل</button>
              <button className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs text-red-400"><Trash2 className="h-3 w-3" /> حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
