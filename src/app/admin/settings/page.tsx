import { AdminShell } from "@/components/admin-shell";
export default function Page() {
  return (
    <AdminShell title="الإعدادات" actions={<button className="rounded-full bg-azm-gold px-5 py-2 text-sm font-bold text-azm-black">حفظ</button>}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="بيانات المتجر">
          <F l="اسم المتجر" v="AZM" />
          <F l="البريد الرسمي" v="hello@azm.com" />
          <F l="الموبايل" v="19999" />
          <F l="العنوان" v="القاهرة، مصر" />
        </Card>
        <Card title="الشعار والألوان">
          <div><label className="mb-2 block text-xs font-bold text-white/60">الشعار</label><div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/20 bg-azm-black/40"><span className="font-display text-3xl font-black">AZM</span></div></div>
          <div className="grid grid-cols-4 gap-2">{["#0F0F0F","#252525","#D4A94A","#F5EBD0"].map(c => <div key={c} className="aspect-square rounded-xl border border-white/10" style={{ background: c }} />)}</div>
        </Card>
        <Card title="الدفع">
          {["الدفع عند الاستلام","فيزا/ماستركارد","فودافون كاش","تحويل بنكي"].map(m => (
            <label key={m} className="flex items-center justify-between rounded-xl border border-white/5 bg-azm-black/40 p-3"><span className="text-sm">{m}</span><input type="checkbox" defaultChecked className="accent-azm-gold" /></label>
          ))}
        </Card>
        <Card title="الضرائب">
          <F l="ضريبة القيمة المضافة %" v="14" />
          <F l="السعر شامل الضريبة" v="نعم" />
        </Card>
      </div>
    </AdminShell>
  );
}
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6"><h3 className="mb-4 font-display text-lg font-black">{title}</h3><div className="space-y-3">{children}</div></div>);
}
function F({ l, v }: { l: string; v: string }) {
  return (<div><label className="mb-2 block text-xs font-bold text-white/60">{l}</label><input defaultValue={v} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-2.5 text-sm focus:border-azm-gold focus:outline-none" /></div>);
}
