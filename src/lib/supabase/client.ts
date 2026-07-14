import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("your-project") || key === "your-anon-key-here") {
    console.warn("Supabase env vars missing — returning mock client");
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return { from: () => ({
      select: () => ({ order: () => ({ data: [], error: null }), eq: () => ({ single: () => ({ data: null, error: { message: "not configured" } }), data: [], error: null }) }),
      insert: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "not configured" } }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "not configured" } }) }) }) }),
      delete: () => ({ eq: () => ({ error: null }) }),
    }), auth: { getUser: () => Promise.resolve({ data: { user: null }, error: null }), signOut: () => Promise.resolve({ error: null }) }, storage: { from: () => ({ upload: () => Promise.resolve({ data: null, error: null }), getPublicUrl: () => ({ data: { publicUrl: "" } }) }) }, } as any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  return createBrowserClient(url, key);
}
