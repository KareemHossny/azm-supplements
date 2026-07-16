"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/supabase/auth";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getUser().then(u => {
      if (!u) return;
      setEmail(u.email || "");
      setFullName(u.user_metadata?.full_name || "");
      setPhone(u.phone || "");
    }).catch(() => {});
  }, []);

  const names = fullName.split(" ");
  const firstName = names[0] || "";
  const lastName = names.slice(1).join(" ") || "";

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">الملف الشخصي</h2>
      <div className="grid gap-4 rounded-2xl border border-white/5 bg-azm-charcoal/40 p-6 sm:grid-cols-2">
        <div><label className="mb-2 block text-xs font-bold text-white/60">الاسم الأول</label><input value={firstName} readOnly className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm text-white/60" /></div>
        <div><label className="mb-2 block text-xs font-bold text-white/60">الاسم الأخير</label><input value={lastName} readOnly className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm text-white/60" /></div>
        <div><label className="mb-2 block text-xs font-bold text-white/60">البريد</label><input value={email} readOnly className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm text-white/60" /></div>
        <div><label className="mb-2 block text-xs font-bold text-white/60">الموبايل</label><input value={phone} readOnly className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-azm-black/40 px-4 py-3 text-sm text-white/60" /></div>
      </div>
    </div>
  );
}
