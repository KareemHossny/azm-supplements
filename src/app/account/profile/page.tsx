function Field({ l, v, type = "text" }: { l: string; v: string; type?: string }) {
  return (<div><label className="mb-2 block text-xs font-bold text-white/60">{l}</label><input defaultValue={v} type={type} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" /></div>)
}
export default function Profile() {
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">الملف الشخصي</h2>
      <div className="grid gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6 sm:grid-cols-2">
        <Field l="الاسم الأول" v="مروان" />
        <Field l="الاسم الأخير" v="عبد الرحمن" />
        <Field l="البريد" v="marwan@example.com" type="email" />
        <Field l="الموبايل" v="01xxxxxxxxx" type="tel" />
        <Field l="تاريخ الميلاد" v="1998-05-12" type="date" />
        <Field l="النوع" v="ذكر" />
      </div>
      <div className="mt-6 grid gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6 sm:grid-cols-2">
        <h3 className="sm:col-span-2 font-bold">كلمة المرور</h3>
        <Field l="الحالية" v="" type="password" />
        <Field l="الجديدة" v="" type="password" />
      </div>
      <button className="mt-6 rounded-full bg-azm-gold px-8 py-3 text-sm font-bold text-azm-black">حفظ التغييرات</button>
    </div>
  )
}
