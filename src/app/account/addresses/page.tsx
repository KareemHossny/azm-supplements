import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui-bits"

export default function Addresses() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-black">العناوين</h2>
        <button className="flex items-center gap-2 rounded-full bg-azm-gold px-5 py-2.5 text-sm font-bold text-azm-black"><Plus className="h-4 w-4" /> إضافة</button>
      </div>
      <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-8 text-center text-sm text-white/50">
        لا توجد عناوين مضافة بعد
      </div>
    </div>
  )
}
