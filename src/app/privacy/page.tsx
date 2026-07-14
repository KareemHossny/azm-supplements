import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الخصوصية — AZM",
};

export default function Page() {
  return (
    <PageShell eyebrow="Legal" title="سياسة الخصوصية" breadcrumbs={[{ l: "الخصوصية" }]}>
      <article className="rounded-3xl border border-white/5 bg-azm-charcoal/30 p-8 text-white/70 leading-loose">
        <p>خصوصيتك تهمنا. لا نشارك بياناتك مع أي طرف ثالث ونستخدم أعلى معايير الحماية.</p>
      </article>
    </PageShell>
  );
}
