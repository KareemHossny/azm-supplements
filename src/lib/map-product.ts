import type { Product } from "./products";
import type { ProductRow } from "./supabase/products";

export function mapProduct(row: ProductRow & { categories?: { slug: string } | null }): Product {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    brand: row.brand,
    price: Number(row.price),
    oldPrice: row.old_price ? Number(row.old_price) : undefined,
    image: row.images?.[0] || row.image_url || "/placeholder.svg",
    images: row.images?.length ? row.images : row.image_url ? [row.image_url] : [],
    tag: row.tags?.includes("الأكثر مبيعاً") ? "الأكثر مبيعاً"
      : row.tags?.includes("جديد") ? "جديد"
      : row.tags?.includes("خصم") ? "خصم"
      : row.tags?.includes("حصري") ? "حصري"
      : undefined,
    stock: row.stock ?? 0,
    category: row.categories?.slug || "supplements",
  };
}

export { products as fallbackProducts } from "./products";
