# AZM — عزم

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=fff)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=fff)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=fff)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=fff)

Full-featured Arabic (RTL) e-commerce storefront for fitness supplements and gym accessories, built for athletes in Egypt. Powered by Next.js App Router, Supabase (auth + database + storage), and shadcn/ui — with a complete customer account area and an admin panel.

---

## Project Structure

```
src/
├── middleware.ts       → Route protection (admin + account)
├── app/                → Next.js App Router — pages & layouts
│   ├── layout.tsx      → Root layout (RTL, fonts, SEO, CartProvider)
│   ├── page.tsx        → Homepage (hero, bestsellers, offers, brands…)
│   ├── shop/           → Product catalog
│   ├── product/[id]/   → Product detail
│   ├── cart/           → Shopping cart
│   ├── checkout/       → Checkout + order confirmation
│   ├── account/        → Customer dashboard (orders, addresses, favorites…)
│   ├── admin/          → Admin panel (products, orders, inventory…)
│   └── …               → Static pages (about, contact, faq, terms…)
├── components/
│   ├── ui/             → shadcn/ui primitives (Radix-based)
│   ├── site-header.tsx → Store nav, search, cart, auth
│   ├── site-footer.tsx
│   ├── product-card.tsx
│   ├── page-shell.tsx  → Public page layout shell
│   └── admin-shell.tsx → Admin sidebar layout shell
├── hooks/              → use-mobile, etc.
├── lib/
│   ├── supabase/       → Data layer (products, orders, auth, admin, coupons…)
│   ├── cart-context.tsx → Cart state (React Context)
│   ├── cart-wrapper.tsx  → Cart provider
│   ├── products.ts     → Static catalog (build-time fallback)
│   └── utils.ts        → cn() helper (clsx + tailwind-merge)
└── assets/             → Static images (hero, products)

supabase/
└── migrations/         → 11 SQL migrations (schema, RLS, storage, seed data)
```

### Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero, stats, bestsellers, new arrivals, offers, brands, categories, testimonials, FAQ |
| `/shop` | Shop | Product catalog with filters |
| `/product/[id]` | Product | Product detail, images, pricing, stock |
| `/brands` | Brands | Brand directory |
| `/cart` | Cart | Line items, quantities, totals |
| `/checkout` · `/checkout/success` | Checkout | Shipping, payment method, order confirmation |
| `/track` | Track | Order tracking by number |
| `/about` · `/contact` · `/faq` | Info | Firm story, contact, FAQ |
| `/terms` · `/privacy` · `/returns` | Legal | Terms, privacy, returns policy |
| `/login` · `/signup` | Auth | Customer sign in / sign up (Supabase) |
| `/account` | Account | Orders, profile, addresses, favorites, coupons, notifications, returns |
| `/admin` | Admin | Dashboard, products, categories, orders, customers, inventory, shipping, coupons, settings |

---

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5.8, React 19 |
| Styling | Tailwind CSS 4, `tw-animate-css`, oklch design tokens |
| UI Library | shadcn/ui (Radix primitives) |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Backend | Supabase (Postgres, Auth, Storage) |
| Icons | Lucide React |
| Linting | ESLint 9 + Prettier |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (copy and fill in your Supabase keys)
cp .env.example .env.local

# 3. Start dev server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

> **Note:** The store works in "catalog mode" without Supabase keys. The full storefront (auth, cart persistence, checkout, admin) requires a Supabase project — see below.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server with Turbopack + HMR |
| `npm run build` | Production build to `.next/` |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint across the project |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes* | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes* | Supabase anon/public key |

\* Required for full functionality. If unset, the site runs as a static catalog with build-time product data.

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migrations in `supabase/migrations/` (via the SQL editor or the Supabase CLI)
3. Enable Email auth in **Authentication → Providers**
4. Configure storage buckets for product images
5. Create an admin user (see `.env.example`):
   - Add a user in **Authentication → Users**
   - Insert their ID into the `admins` table: `INSERT INTO admins (user_id, name, role) VALUES ('<auth_user_id>', 'Admin Name', 'super_admin');`

---

## Deployment (Vercel)

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js (`vercel.json` already sets the framework) — no configuration needed
4. Add your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
5. Deploy

All routes are rendered client-side, so refresh navigation works out of the box on Vercel.

---

## Design

- **Locale**: Full Arabic RTL — `lang="ar" dir="rtl"` at the root, with mirror-aware layout utilities
- **Fonts**: Tajawal (body), Cairo (display), Inter (Latin) — served from Google Fonts
- **Palette**: Black `oklch(0.14 0 0)`, Charcoal, Graphite, Gold `oklch(0.78 0.11 82)`, Sand — defined as Tailwind tokens
- **Motion**: Framer Motion scroll-reveals, staggered grid entrances, hover micro-interactions
- **Patterns**: Arabic-geometric backdrop pattern, gold-text accents, glassmorphism header
- **Commerce UX**: Trust bar, discount tags, testimonials, order tracking, loyalty/newsletter CTA

---

## 👨‍💻 Author

**AZM — عزم Athletics**  
كل اللي تحتاجه للتمرين الحقيقي. مكملات أصلية وإكسسوارات جيم مختارة بعناية للرياضيين في مصر والعالم العربي.
