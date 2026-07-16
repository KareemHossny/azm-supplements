"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Check, Truck, Loader2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { governorates as staticGovernorates } from "@/lib/products";
import { getGovernorates } from "@/lib/supabase/governorates";
import { createOrder } from "@/lib/supabase/orders";
import { getSettings } from "@/lib/supabase/settings";
import { useCart } from "@/lib/cart-context";

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-white/60">{label}</label>
      <input {...props} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none" />
    </div>
  );
}
function ReviewRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between border-b border-white/5 py-3 text-sm"><span className="text-white/50">{label}</span><span className="font-bold">{value}</span></div>;
}

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [govList, setGovList] = useState(staticGovernorates);
  const [gov, setGov] = useState(staticGovernorates[0]);
  const { items, subtotal: cartSubtotal, clearCart } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(0);
  const steps = ["البيانات", "العنوان", "الدفع", "المراجعة"];

  useEffect(() => {
    getGovernorates()
      .then((data) => {
        const mapped = data.map((g) => ({
          name: g.name,
          fee: g.fee,
          days: g.delivery_days,
        }));
        setGovList(mapped);
        setGov(mapped[0] || staticGovernorates[0]);
      })
      .catch(() => {});
    getSettings()
      .then((rows) => {
        const s = rows.find(r => r.key === "shipping_threshold");
        if (s) setFreeShippingThreshold(Number(s.value) || 0);
      })
      .catch(() => {});
  }, []);

  const discount = 0;
  const freeShipping = freeShippingThreshold > 0 && cartSubtotal >= freeShippingThreshold;
  const shippingFee = freeShipping ? 0 : (gov?.fee || 50);
  const total = cartSubtotal + shippingFee;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const order = await createOrder({
        customer_name: `${firstName} ${lastName}`,
        customer_phone: phone,
        customer_email: email || undefined,
        governorate: gov.name,
        city,
        address,
        landmark: landmark || undefined,
        shipping_fee: shippingFee,
        discount,
        subtotal: cartSubtotal,
        total,
        payment_method: "cod",
        items: items.map(i => ({
          product_id: i.id,
          product_name: i.name,
          product_price: i.price,
          quantity: i.qty,
        })),
      });
      clearCart();
      router.push(`/checkout/success?order=${order.order_number}`);
    } catch {
      setError("حدث خطأ أثناء إنشاء الطلب. حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell title="إتمام الشراء" breadcrumbs={[{ l: "السلة", to: "/cart" }, { l: "إتمام الشراء" }]}>
      <div className="mb-10 flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <button onClick={() => setStep(i + 1)} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${step > i + 1 ? "bg-azm-gold text-azm-black" : step === i + 1 ? "border-2 border-azm-gold text-azm-gold" : "border border-white/10 text-white/40"}`}>
              {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
            </button>
            <div className="hidden text-xs font-semibold sm:block">{s}</div>
            {i < steps.length - 1 && <div className={`h-px flex-1 ${step > i + 1 ? "bg-azm-gold" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-black">البيانات الشخصية</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="الاسم الأول" placeholder="مروان" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <Input label="الاسم الأخير" placeholder="عبد الرحمن" value={lastName} onChange={e => setLastName(e.target.value)} />
                <Input label="البريد الإلكتروني" placeholder="you@example.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input label="رقم الموبايل" placeholder="01xxxxxxxxx" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-black">عنوان الشحن</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-white/60">المحافظة</label>
                  <select value={gov.name} onChange={e => setGov(govList.find(g => g.name === e.target.value) || govList[0])} className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none">
                    {govList.map(g => <option key={g.name}>{g.name}</option>)}
                  </select>
                </div>
                <Input label="المدينة / الحي" placeholder="مدينة نصر" value={city} onChange={e => setCity(e.target.value)} />
                <div className="sm:col-span-2"><Input label="العنوان بالتفصيل" placeholder="شارع، مبنى، شقة..." value={address} onChange={e => setAddress(e.target.value)} /></div>
                <Input label="أقرب معلم" placeholder="اختياري" value={landmark} onChange={e => setLandmark(e.target.value)} />
                <Input label="كود بريدي" placeholder="اختياري" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
              </div>
              <div className="rounded-xl border border-azm-gold/30 bg-azm-gold/5 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">شحن إلى {gov.name}</span>
                  <span className="font-bold text-azm-gold">{gov.fee} ج.م • {gov.days} أيام</span>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-black">طريقة الدفع</h2>
              <div className="flex items-center gap-4 rounded-2xl border border-azm-gold/30 bg-azm-gold/5 p-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-azm-gold text-azm-black"><Truck className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold">الدفع عند الاستلام</div>
                  <div className="text-xs text-white/50">ادفع كاش عند وصول الطلب</div>
                </div>
                <Check className="mr-auto h-5 w-5 text-azm-gold" />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-black">مراجعة الطلب</h2>
              <ReviewRow label="الاسم" value={`${firstName} ${lastName}`} />
              <ReviewRow label="الموبايل" value={phone} />
              <ReviewRow label="العنوان" value={`${gov.name} • ${city} • ${address}`} />
              <ReviewRow label="الشحن" value={`${shippingFee} ج.م • ${gov.days} أيام`} />
              <ReviewRow label="طريقة الدفع" value="الدفع عند الاستلام" />
            </div>
          )}

          {error && <div className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">{error}</div>}
          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
            {step > 1 ? <button onClick={() => setStep(step - 1)} className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold">السابق</button> : <Link href="/cart" className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold">للسلة</Link>}
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} className="rounded-full bg-azm-gold px-8 py-3 text-sm font-bold text-azm-black">التالي</button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-2 rounded-full bg-azm-gold px-8 py-3 text-sm font-bold text-azm-black disabled:opacity-60">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "جارٍ إنشاء الطلب..." : "تأكيد الطلب"}
              </button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6">
          <h3 className="font-display text-xl font-black">ملخص الطلب</h3>
          <div className="mt-4 space-y-2 text-sm">
            {items.map(i => (
              <div key={i.id} className="flex justify-between text-white/70">
                <span>{i.name} × {i.qty}</span>
                <span>{(i.price * i.qty).toLocaleString("ar-EG")} ج.م</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3 border-t border-white/5 pt-4 text-sm">
            <div className="flex justify-between text-white/70"><span>المجموع الفرعي</span><span>{cartSubtotal.toLocaleString("ar-EG")} ج.م</span></div>
            {freeShipping ? (
              <div className="flex justify-between text-emerald-400"><span>الشحن مجاني</span><span>0 ج.م</span></div>
            ) : (
              <div className="flex justify-between text-white/70"><span>الشحن</span><span>{shippingFee} ج.م</span></div>
            )}
            <div className="flex justify-between border-t border-white/5 pt-3 text-lg font-black"><span>الإجمالي</span><span className="text-azm-gold">{total.toLocaleString("ar-EG")} ج.م</span></div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
