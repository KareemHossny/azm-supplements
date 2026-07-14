"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { products } from "@/lib/products";

export default function Page() {
  const { id } = useParams() as { id: string };
  const p = products.find(x => x.id === id);
  return (
    <AdminShell title={`تعديل: ${p?.name ?? id}`} actions={<><Link href="/admin/products" className="rounded-full border border-white/10 px-5 py-2 text-sm">للقائمة</Link><button className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black">حفظ</button></>}>
      <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
        <p className="text-white/60">صفحة التعديل — نفس تصميم صفحة الإضافة مع بيانات مُعبأة مسبقاً.</p>
        {p && (
          <div className="mt-6 flex items-center gap-4">
            <img src={p.image} className="h-24 w-24 rounded-xl object-cover" alt="" />
            <div><div className="font-bold">{p.name}</div><div className="text-sm text-white/60">{p.brand} • {p.price} ج.م</div></div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
