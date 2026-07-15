"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/supabase/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password);
      router.push("/login?confirmed=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل إنشاء الحساب");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-azm-black text-white">
      <SiteHeader />
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-black">إنشاء حساب</h1>
            <p className="mt-2 text-sm text-white/60">أنشئ حسابك لتتمكن من الطلب والمتابعة</p>
          </div>
          {error && <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">{error}</div>}
          <div>
            <label className="mb-1 block text-xs text-white/60">البريد الإلكتروني</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/60">كلمة المرور</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm" />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-azm-gold py-3 text-sm font-bold text-azm-black disabled:opacity-50">
            {loading ? "جاري..." : "إنشاء حساب"}
          </button>
          <p className="text-center text-sm text-white/60">
            لديك حساب بالفعل؟ <Link href="/login" className="font-bold text-azm-gold">تسجيل الدخول</Link>
          </p>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}
