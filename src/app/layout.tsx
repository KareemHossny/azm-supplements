import type { Metadata } from "next";
import "./globals.css";
import { CartWrapper } from "@/lib/cart-wrapper";

export const metadata: Metadata = {
  title: "AZM — مكملات وإكسسوارات جيم للرياضيين في مصر",
  description: "AZM. مكملات أصلية وإكسسوارات جيم مختارة بعناية للرياضيين في مصر والعالم العربي.",
  authors: [{ name: "AZM" }],
  openGraph: {
    title: "AZM — عزم",
    description: "كل اللي تحتاجه للتمرين الحقيقي. مكملات أصلية وإكسسوارات جيم.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-azm-black text-white"><CartWrapper>{children}</CartWrapper></body>
    </html>
  );
}
