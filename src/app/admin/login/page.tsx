"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/supabase/admin";
import { LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await signIn(email, password);

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        : "حدث خطأ، حاول مرة أخرى");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-azm-black px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-display text-4xl font-black tracking-tight">
            ع<span className="gold-text">ز</span>م
          </div>
          <div className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-azm-gold">Admin</div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6 space-y-4">
          <h1 className="font-display text-xl font-black text-center">تسجيل الدخول</h1>

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 text-center">{error}</div>
          )}

          <div>
            <label className="mb-2 block text-xs font-bold text-white/60">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@azm.com"
              required
              className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-white/60">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm focus:border-azm-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-azm-gold py-3 text-sm font-bold text-azm-black transition hover:bg-azm-sand disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : <><LogIn className="h-4 w-4" /> دخول</>}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-xs text-white/50 hover:text-azm-gold">← العودة للمتجر</a>
        </div>
      </div>
    </div>
  );
}
