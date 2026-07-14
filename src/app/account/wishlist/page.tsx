import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export default function Wishlist() {
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-black">المفضلة</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
      </div>
    </div>
  )
}
