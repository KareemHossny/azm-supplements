export default function Returns() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-black">المرتجعات</h2>
        <button className="rounded-full bg-azm-gold px-5 py-2.5 text-sm font-bold text-azm-black">طلب إرجاع جديد</button>
      </div>
      <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-8 text-center text-sm text-white/50">
        لا توجد مرتجعات حتى الآن
      </div>
    </div>
  )
}