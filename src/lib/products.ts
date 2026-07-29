import whey from "@/assets/prod-whey.jpg";
import creatine from "@/assets/prod-creatine.jpg";
import pre from "@/assets/prod-preworkout.jpg";
import bcaa from "@/assets/prod-bcaa.jpg";
import belt from "@/assets/acc-belt.jpg";
import straps from "@/assets/acc-straps.jpg";
import shaker from "@/assets/acc-shaker.jpg";
import gloves from "@/assets/acc-gloves.jpg";

export type Product = {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  tag?: "الأكثر مبيعاً" | "جديد" | "خصم" | "حصري";
  category: string;
  stock?: number;
};

function imgSrc(i: { src: string }): string {
  return i.src;
}

export const products: Product[] = [
  // ===== PROTEIN =====
  { id: "p1", name: "واي بروتين إيزوليت ٢ كجم", nameEn: "Whey Isolate 2kg", brand: "AZM Pro", price: 2600, oldPrice: 3000, image: imgSrc(whey), tag: "الأكثر مبيعاً", category: "protein", stock: 45 },
  { id: "p2", name: "واي بروتين كونسينترد ١ كجم", nameEn: "Whey Concentrate 1kg", brand: "AZM Core", price: 1200, image: imgSrc(whey), category: "protein", stock: 60 },
  { id: "p3", name: "بروتين نباتي ٩٠٠ جم", nameEn: "Plant Protein 900g", brand: "AZM Fuel", price: 1800, image: imgSrc(whey), tag: "جديد", category: "protein", stock: 20 },

  // ===== CREATINE =====
  { id: "c1", name: "كرياتين مونوهيدرات ٥٠٠ جم", nameEn: "Creatine Monohydrate 500g", brand: "AZM Core", price: 750, image: imgSrc(creatine), tag: "الأكثر مبيعاً", category: "creatine", stock: 35 },
  { id: "c2", name: "كرياتين ميكرونايزد ١ كجم", nameEn: "Creatine Micronized 1kg", brand: "AZM Pro", price: 1200, image: imgSrc(creatine), category: "creatine", stock: 25 },
  { id: "c3", name: "هيدرو كرياتين ٣٠٠ جم", nameEn: "HCL Creatine 300g", brand: "AZM Pro", price: 900, oldPrice: 1100, image: imgSrc(creatine), tag: "خصم", category: "creatine", stock: 15 },

  // ===== MASS GAINER =====
  { id: "m1", name: "ماس جاينر ٣ كجم", nameEn: "Mass Gainer 3kg", brand: "AZM Core", price: 1500, oldPrice: 1800, image: imgSrc(whey), tag: "خصم", category: "mass-gainer", stock: 30 },
  { id: "m2", name: "ماس جاينر برو ٥ كجم", nameEn: "Mass Gainer Pro 5kg", brand: "AZM Fuel", price: 2200, image: imgSrc(whey), category: "mass-gainer", stock: 18 },
  { id: "m3", name: "سيرياس ماس ٢.٧ كجم", nameEn: "Serious Mass 2.7kg", brand: "AZM Pro", price: 1850, image: imgSrc(whey), tag: "حصري", category: "mass-gainer", stock: 12 },

  // ===== PRE-WORKOUT =====
  { id: "pw1", name: "بري وركاوت إكستريم ٣٠٠ جم", nameEn: "Pre-Workout Extreme 300g", brand: "AZM Fuel", price: 1100, image: imgSrc(pre), tag: "الأكثر مبيعاً", category: "pre-workout", stock: 28 },
  { id: "pw2", name: "بري وركاوت نتروجين بوم", nameEn: "Nitrogen Boom Pre-Workout", brand: "AZM Pro", price: 950, image: imgSrc(pre), category: "pre-workout", stock: 22 },
  { id: "pw3", name: "كافيين تابلت ٢٠٠ مجم × ١٠٠", nameEn: "Caffeine 200mg × 100", brand: "AZM Core", price: 350, image: imgSrc(pre), category: "pre-workout", stock: 50 },

  // ===== AMINO ACIDS =====
  { id: "a1", name: "بي سي إيه إيه ٢:١:١ ٥٠٠ جم", nameEn: "BCAA 2:1:1 500g", brand: "AZM Recover", price: 850, image: imgSrc(bcaa), category: "amino", stock: 20 },
  { id: "a2", name: "إل-جلوتامين ٤٠٠ جم", nameEn: "L-Glutamine 400g", brand: "AZM Recover", price: 650, image: imgSrc(bcaa), tag: "جديد", category: "amino", stock: 15 },
  { id: "a3", name: "إل-كارنيتين ٦٠ كبسولة", nameEn: "L-Carnitine 60 Caps", brand: "AZM Fuel", price: 550, image: imgSrc(bcaa), category: "amino", stock: 40 },

  // ===== VITAMINS =====
  { id: "v1", name: "مولتي فيتامين للرياضيين ٩٠ قرص", nameEn: "Multi-Vitamin 90 Tabs", brand: "AZM Core", price: 450, image: imgSrc(creatine), tag: "الأكثر مبيعاً", category: "vitamins", stock: 60 },
  { id: "v2", name: "أوميغا ٣ ١٠٠٠ مجم ٦٠ كبسولة", nameEn: "Omega-3 1000mg 60 Softgels", brand: "AZM Pro", price: 380, image: imgSrc(creatine), category: "vitamins", stock: 45 },
  { id: "v3", name: "فيتامين د٣ ٥٠٠٠ وحدة ١٢٠ قرص", nameEn: "Vitamin D3 5000IU 120 Tabs", brand: "AZM Core", price: 320, image: imgSrc(creatine), tag: "جديد", category: "vitamins", stock: 55 },

  // ===== FAT BURNERS =====
  { id: "f1", name: "فات برنر تيرمو ٩٠ كبسولة", nameEn: "Thermo Fat Burner 90 Caps", brand: "AZM Fuel", price: 850, oldPrice: 1000, image: imgSrc(pre), tag: "خصم", category: "fat-burners", stock: 18 },
  { id: "f2", name: "إل-كارنيتين تيرمو ١٠٠٠ مجم", nameEn: "L-Carnitine Thermo 1000mg", brand: "AZM Pro", price: 650, image: imgSrc(pre), category: "fat-burners", stock: 25 },
  { id: "f3", name: "كلين سليم شاي أخضر ٣٠ كيس", nameEn: "Clean Slim Green Tea 30 Bags", brand: "AZM Core", price: 280, image: imgSrc(pre), category: "fat-burners", stock: 35 },

  // ===== ACCESSORIES =====
  { id: "ac1", name: "حزام رفع أثقال جلد", nameEn: "Leather Lifting Belt", brand: "AZM Gear", price: 1350, image: imgSrc(belt), category: "accessories", stock: 10 },
  { id: "ac2", name: "أربطة معصم جل", nameEn: "Leather Wrist Straps", brand: "AZM Gear", price: 450, image: imgSrc(straps), tag: "الأكثر مبيعاً", category: "accessories", stock: 30 },
  { id: "ac3", name: "جوانتي رفع أثقال مقاس M/L", nameEn: "Lifting Gloves M/L", brand: "AZM Gear", price: 600, image: imgSrc(gloves), category: "accessories", stock: 20 },
  { id: "ac4", name: "شيكر بروتين ٧٠٠ مل", nameEn: "Protein Shaker 700ml", brand: "AZM Gear", price: 300, image: imgSrc(shaker), tag: "حصري", category: "accessories", stock: 5 },
  { id: "ac5", name: "حبل مقاومة مطاطي ١٠-٤٠ كجم", nameEn: "Resistance Band 10-40kg", brand: "AZM Gear", price: 450, image: imgSrc(straps), category: "accessories", stock: 15 },
  { id: "ac6", name: "شريط سحب (بار) باب", nameEn: "Pull-Up Bar Doorway", brand: "AZM Gear", price: 700, image: imgSrc(belt), tag: "جديد", category: "accessories", stock: 8 },
  { id: "ac7", name: "نظارة شمس رياضية", nameEn: "Sport Sunglasses", brand: "AZM Gear", price: 550, image: imgSrc(shaker), tag: "حصري", category: "accessories", stock: 12 },
  { id: "ac8", name: "تابلت ألمنيوم للتمارين", nameEn: "Aluminum Exercise Pad", brand: "AZM Gear", price: 250, image: imgSrc(gloves), category: "accessories", stock: 40 },
];

export const brands = [
  "AZM Pro", "AZM Core", "AZM Fuel", "AZM Recover", "AZM Gear",
];

export const categories = [
  { slug: "protein", name: "بروتين", nameEn: "Protein", count: 3 },
  { slug: "creatine", name: "كرياتين", nameEn: "Creatine", count: 3 },
  { slug: "mass-gainer", name: "زيادة وزن", nameEn: "Mass Gainer", count: 3 },
  { slug: "pre-workout", name: "بري وركاوت", nameEn: "Pre-Workout", count: 3 },
  { slug: "amino", name: "أحماض أمينية", nameEn: "Amino", count: 3 },
  { slug: "vitamins", name: "فيتامينات", nameEn: "Vitamins", count: 3 },
  { slug: "fat-burners", name: "حرق الدهون", nameEn: "Fat Burners", count: 3 },
  { slug: "accessories", name: "إكسسوارات", nameEn: "Accessories", count: 8 },
];

export const governorates = [
  { name: "القاهرة", fee: 40, days: "1-2" },
  { name: "الجيزة", fee: 40, days: "1-2" },
  { name: "الإسكندرية", fee: 55, days: "2-3" },
  { name: "الدقهلية", fee: 55, days: "2-3" },
  { name: "الشرقية", fee: 55, days: "2-3" },
  { name: "الغربية", fee: 55, days: "2-3" },
  { name: "المنوفية", fee: 55, days: "2-3" },
  { name: "البحيرة", fee: 60, days: "2-3" },
  { name: "كفر الشيخ", fee: 60, days: "2-4" },
  { name: "بورسعيد", fee: 65, days: "2-4" },
  { name: "الإسماعيلية", fee: 65, days: "2-4" },
  { name: "السويس", fee: 65, days: "2-4" },
  { name: "دمياط", fee: 60, days: "2-4" },
  { name: "شمال سيناء", fee: 90, days: "3-5" },
  { name: "جنوب سيناء", fee: 90, days: "3-5" },
  { name: "المنيا", fee: 70, days: "3-4" },
  { name: "أسيوط", fee: 75, days: "3-4" },
  { name: "سوهاج", fee: 80, days: "3-5" },
  { name: "قنا", fee: 85, days: "3-5" },
  { name: "الأقصر", fee: 90, days: "3-5" },
  { name: "أسوان", fee: 95, days: "4-6" },
  { name: "البحر الأحمر", fee: 90, days: "3-5" },
  { name: "الفيوم", fee: 65, days: "2-4" },
  { name: "بني سويف", fee: 65, days: "2-4" },
  { name: "القليوبية", fee: 45, days: "1-2" },
  { name: "مطروح", fee: 90, days: "3-5" },
  { name: "الوادي الجديد", fee: 100, days: "4-6" },
];
