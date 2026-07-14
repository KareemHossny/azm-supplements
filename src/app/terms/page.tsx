import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط — AZM",
};

export default function Page() {
  return (
    <PageShell eyebrow="Legal" title="الشروط والأحكام" breadcrumbs={[{ l: "الشروط" }]}>
      <article className="prose prose-invert max-w-none rounded-3xl border border-white/5 bg-azm-charcoal/30 p-8 text-white/70 leading-loose">
        <p>باستخدامك موقع AZM فإنك توافق على الشروط التالية. AZM تحتفظ بحق تعديل هذه الشروط في أي وقت.</p>
        <h3 className="mt-6 font-bold text-white">استخدام الموقع</h3>
        <p>يُمنع استخدام الموقع لأي غرض غير قانوني أو ينتهك حقوق الآخرين.</p>
        <h3 className="mt-6 font-bold text-white">المنتجات والأسعار</h3>
        <p>كل الأسعار بالجنيه المصري وشاملة الضريبة. الأسعار قابلة للتغيير دون إشعار مسبق.</p>
      </article>
    </PageShell>
  );
}
