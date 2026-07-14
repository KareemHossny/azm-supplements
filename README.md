# AZM — مكملات وإكسسوارات جيم للرياضيين في مصر

Arabic e-commerce storefront for fitness supplements and gym accessories.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **UI:** shadcn/ui (Radix primitives)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Environment Variables

None required. This is a fully static e-commerce frontend — all product data is compiled at build time.

## Deploy to Vercel

1. Connect your repository to [Vercel](https://vercel.com)
2. Vercel auto-detects Next.js — no configuration needed
3. No environment variables to set
4. Deploy

The build command and output directory are Vercel's defaults for Next.js (`next build` / `.next`).

## Project Structure

```
src/
  app/              # Next.js App Router pages
    layout.tsx      # Root layout (RTL, fonts, SEO metadata)
    page.tsx        # Homepage
    about/          # /about
    shop/           # /shop
    cart/           # /cart
    checkout/       # /checkout
    product/[id]/   # /product/:id
    account/        # /account/* (orders, wishlist, addresses, etc.)
    admin/          # /admin/* (dashboard, products, orders, etc.)
  components/       # Shared UI components
    ui/             # shadcn/ui primitives
  lib/              # Utilities and data
  assets/           # Static images
  hooks/            # Custom React hooks
```
