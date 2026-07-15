"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/supabase/auth";
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
      await signIn(email, password);
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل تسجيل الدخول");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-azm-black text-white">
      <SiteHeader />
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-black">تسجيل الدخول</h1>
            <p className="mt-2 text-sm text-white/60">أهلاً بعودتك! ادخل بياناتك للمتابعة</p>
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
            {loading ? "جاري..." : "تسجيل الدخول"}
          </button>
          <p className="text-center text-sm text-white/60">
            ليس لديك حساب؟ <Link href="/signup" className="font-bold text-azm-gold">إنشاء حساب</Link>
          </p>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}
