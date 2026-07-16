import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_LOGIN = "/admin/login";
const ADMIN_PREFIX = "/admin";
const ACCOUNT_PREFIX = "/account";
const USER_LOGIN = "/login";
const PUBLIC_ACCOUNT_PATHS = [USER_LOGIN, "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("your-project") || key === "your-anon-key-here") {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  let user;
  try {
    const r = await supabase.auth.getUser();
    user = r.data?.user;
  } catch {
    user = null;
  }

  // Protect admin routes
  if (pathname.startsWith(ADMIN_PREFIX) && pathname !== ADMIN_LOGIN) {
    if (!user) {
      const r = request.nextUrl.clone();
      r.pathname = ADMIN_LOGIN;
      r.searchParams.set("redirect", pathname);
      return NextResponse.redirect(r);
    }
    const { data: admin } = await supabase.from("admins").select("id").eq("user_id", user.id).single();
    if (!admin) {
      await supabase.auth.signOut();
      const r = request.nextUrl.clone();
      r.pathname = ADMIN_LOGIN;
      r.searchParams.set("reason", "not-admin");
      return NextResponse.redirect(r);
    }
    return supabaseResponse;
  }

  // Protect account routes — redirect to login if not authenticated
  if (pathname.startsWith(ACCOUNT_PREFIX) && !PUBLIC_ACCOUNT_PATHS.includes(pathname)) {
    if (!user) {
      const r = request.nextUrl.clone();
      r.pathname = USER_LOGIN;
      r.searchParams.set("redirect", pathname);
      return NextResponse.redirect(r);
    }
    return supabaseResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/account", "/account/", "/account/:path*", "/login", "/signup"],
};
