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
  { id: "1", name: "واي بروتين إيزوليت", nameEn: "Whey Isolate 2kg", brand: "AZM Pro", price: 2400, oldPrice: 2800, image: imgSrc(whey), tag: "الأكثر مبيعاً", category: "supplements", stock: 50 },
  { id: "2", name: "كرياتين مونوهيدرات", nameEn: "Creatine Monohydrate", brand: "AZM Core", price: 850, image: imgSrc(creatine), tag: "الأكثر مبيعاً", category: "supplements", stock: 30 },
  { id: "3", name: "بري وركاوت النار", nameEn: "Pre-Workout Fire", brand: "AZM Fuel", price: 1150, oldPrice: 1350, image: imgSrc(pre), tag: "خصم", category: "supplements", stock: 20 },
  { id: "4", name: "بي سي إيه إيه ٢:١:١", nameEn: "BCAA 2:1:1", brand: "AZM Recover", price: 950, image: imgSrc(bcaa), tag: "جديد", category: "supplements", stock: 15 },
  { id: "5", name: "حزام رفع الأثقال", nameEn: "Weightlifting Belt", brand: "AZM Gear", price: 1200, image: imgSrc(belt), category: "accessories", stock: 10 },
  { id: "6", name: "أربطة معصم وكاحل", nameEn: "Wrist & Ankle Straps", brand: "AZM Gear", price: 450, image: imgSrc(straps), category: "accessories", stock: 25 },
  { id: "7", name: "شيكر بروتين ٧٠٠ مل", nameEn: "Protein Shaker 700ml", brand: "AZM Gear", price: 350, image: imgSrc(shaker), tag: "حصري", category: "accessories", stock: 3 },
  { id: "8", name: "جوانتي رفع الأثقال", nameEn: "Lifting Gloves", brand: "AZM Gear", price: 550, image: imgSrc(gloves), tag: "خصم", category: "accessories", stock: 8 },
];

export const brands = ["AZM Pro", "AZM Core", "AZM Fuel", "AZM Iron", "AZM Recover", "AZM"];

export const categories = [
  { slug: "protein", name: "بروتين", nameEn: "Protein", count: 42 },
  { slug: "creatine", name: "كرياتين", nameEn: "Creatine", count: 18 },
  { slug: "mass-gainer", name: "زيادة وزن", nameEn: "Mass Gainer", count: 12 },
  { slug: "pre-workout", name: "بري وركاوت", nameEn: "Pre-Workout", count: 24 },
  { slug: "amino", name: "أحماض أمينية", nameEn: "Amino", count: 16 },
  { slug: "vitamins", name: "فيتامينات", nameEn: "Vitamins", count: 30 },
  { slug: "fat-burners", name: "حرق الدهون", nameEn: "Fat Burners", count: 14 },
  { slug: "accessories", name: "إكسسوارات", nameEn: "Accessories", count: 36 },
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