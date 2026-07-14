import type { Product } from "./products";
import type { ProductRow } from "./supabase/products";

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    brand: row.brand,
    price: Number(row.price),
    oldPrice: row.old_price ? Number(row.old_price) : undefined,
    image: row.image_url || "/placeholder.svg",
    tag: row.tags?.includes("الأكثر مبيعاً") ? "الأكثر مبيعاً"
      : row.tags?.includes("جديد") ? "جديد"
      : row.tags?.includes("خصم") ? "خصم"
      : row.tags?.includes("حصري") ? "حصري"
      : undefined,
    category: "supplements",
  };
}

export { products as fallbackProducts } from "./products";
