"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { addItem } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-azm-charcoal/40 transition-all duration-500 hover:border-azm-gold/30 hover:bg-azm-charcoal/70"
    >
      <div className="relative block aspect-square overflow-hidden bg-azm-black">
        <Link href={"/product/" + p.id}>
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
        </Link>
        {p.tag && (
          <span className="absolute top-3 right-3 rounded-full bg-azm-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-azm-black">
            {p.tag}
          </span>
        )}
        <button onClick={() => addItem({ id: p.id, name: p.name, nameEn: p.nameEn, brand: p.brand, price: p.price, oldPrice: p.oldPrice, image: p.image, qty: 1 })} className="absolute bottom-3 left-3 grid h-11 w-11 translate-y-4 place-items-center rounded-full bg-white text-azm-black opacity-0 shadow-2xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-azm-gold">
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
      <Link href={"/product/" + p.id} className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-azm-gold">
          {p.brand}
        </div>
        <h3 className="text-base font-bold leading-tight text-white sm:text-lg">
          {p.name}
        </h3>
        <div className="text-xs text-white/40">{p.nameEn}</div>
        <div className="mt-2 flex items-baseline gap-2 pt-2">
          <span className="text-lg font-black text-white">
            {p.price.toLocaleString("ar-EG")}
          </span>
          <span className="text-xs text-white/50">ج.م</span>
          {p.oldPrice && (
            <span className="mr-2 text-xs text-white/40 line-through">
              {p.oldPrice.toLocaleString("ar-EG")}
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}