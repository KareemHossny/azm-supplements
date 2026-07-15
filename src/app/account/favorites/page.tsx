"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { getWishlist } from "@/lib/supabase/wishlist";
import { mapProduct } from "@/lib/map-product";
import type { Product } from "@/lib/products";
import type { ProductRow } from "@/lib/supabase/products";

export default function Favorites() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getWishlist()
      .then(data => setItems(data.map(d => mapProduct(d.products as ProductRow))))
      .catch(() => {});
  }, []);

  if (items.length === 0) {
    return (
      <div>
        <h2 className="mb-6 font-display text-2xl font-black">المفضلة</h2>
        <div className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-8 text-center text-sm text-white/50">
          لم تضف أي منتجات للمفضلة بعد
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">المفضلة</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {items.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
      </div>
    </div>
  );
}
