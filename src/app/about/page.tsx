import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن — AZM",
};

export default function Page() {
  return (
    <PageShell eyebrow="About" title="قصتنا" description="AZM ولدت في مصر من شغف الرياضة والإيمان بإن كل رياضي مصري يستحق منتجات على مستوى عالمي." breadcrumbs={[{ l: "من نحن" }]}>
      <div className="grid gap-8 lg:grid-cols-3">
        {[{n:"+٥",l:"سنوات خبرة"},{n:"+١٠٠٠٠",l:"عميل سعيد"},{n:"+٥٠",l:"علامة حصرية"}].map(s => (
          <div key={s.l} className="rounded-2xl border border-white/5 bg-azm-charcoal/40 p-8"><div className="font-display text-5xl font-black gold-text">{s.n}</div><div className="mt-2 text-white/60">{s.l}</div></div>
        ))}
      </div>
      <div className="mt-12 space-y-6 rounded-3xl border border-white/5 bg-azm-charcoal/30 p-8 text-white/70 leading-loose">
        <p>بدأت AZM بفكرة بسيطة: كل لاعب مصري لازم يوصله مكملات أصلية بأسعار عادلة، وبإكسسوارات جودتها على مستوى الأبطال. من يومها وإحنا بنكبر مع مجتمعنا.</p>
        <p>اليوم AZM هي الوجهة الأولى للرياضيين في مصر، بأكثر من ٥٠ علامة تجارية عالمية، وشحن سريع لكل المحافظات، ودعم مستمر من مدربين محترفين.</p>
      </div>
    </PageShell>
  );
}
