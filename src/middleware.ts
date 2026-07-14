import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_LOGIN = "/admin/login";
const ADMIN_PREFIX = "/admin";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_PREFIX) || pathname === ADMIN_LOGIN) {
    return NextResponse.next();
  }

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

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_LOGIN;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!admin) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_LOGIN;
    url.searchParams.set("reason", "not-admin");
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: "/admin/:path*",
};
