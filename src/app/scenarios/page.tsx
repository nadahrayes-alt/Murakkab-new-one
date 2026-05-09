import Link from "next/link";

type Scenario = {
  href: string;
  title: string;
  description: string;
  group: "عام" | "محمي" | "تفاصيل" | "قانوني";
};

const scenarios: Scenario[] = [
  {
    href: "/",
    title: "الرئيسية",
    description: "Hero, About, Process, Services, Benefits, Articles, News, Testimonials, Plans",
    group: "عام",
  },
  {
    href: "/forgot-password",
    title: "استعادة كلمة المرور",
    description: "نموذج إرسال رابط الاستعادة",
    group: "عام",
  },
  {
    href: "/dashboard",
    title: "لوحة التحكم",
    description: "نظرة عامة على المحفظة والإحصاءات",
    group: "محمي",
  },
  {
    href: "/watchlist",
    title: "قائمة المتابعة",
    description: "الأسهم المحفوظة للمتابعة",
    group: "محمي",
  },
  {
    href: "/alerts",
    title: "التنبيهات",
    description: "إدارة تنبيهات الأسعار والأحداث",
    group: "محمي",
  },
  {
    href: "/account",
    title: "الحساب",
    description: "بيانات المستخدم والاشتراك",
    group: "محمي",
  },
  {
    href: "/checkout",
    title: "الدفع",
    description: "ترقية الاشتراك لـ Premium",
    group: "محمي",
  },
  {
    href: "/earnings",
    title: "الأرباح",
    description: "تقويم نتائج الشركات",
    group: "محمي",
  },
  {
    href: "/stock/ARMD",
    title: "تفاصيل سهم (ARMD)",
    description: "صفحة تفاصيل سهم ديناميكية — مثال: Armada Tech.",
    group: "تفاصيل",
  },
  {
    href: "/article/article-1",
    title: "تفاصيل مقال",
    description: "صفحة مقال ديناميكية بـ slug",
    group: "تفاصيل",
  },
  {
    href: "/privacy",
    title: "سياسة الخصوصية",
    description: "صفحة قانونية",
    group: "قانوني",
  },
  {
    href: "/terms",
    title: "الشروط والأحكام",
    description: "صفحة قانونية",
    group: "قانوني",
  },
];

const groupOrder: Scenario["group"][] = ["عام", "محمي", "تفاصيل", "قانوني"];

export const metadata = {
  title: "السيناريوهات — مركّب+",
  description: "فهرس بكل صفحات التطبيق",
};

export default function ScenariosPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="text-sm uppercase tracking-widest text-[var(--foreground)]/60">
          Index
        </p>
        <h1 className="mt-2 text-4xl font-[var(--font-display)] sm:text-5xl">
          كل السيناريوهات
        </h1>
        <p className="mt-3 text-[var(--foreground)]/70">
          فهرس مباشر بكل صفحات التطبيق ({scenarios.length} صفحة).
        </p>
      </header>

      <div className="space-y-12">
        {groupOrder.map((group) => {
          const items = scenarios.filter((s) => s.group === group);
          return (
            <div key={group}>
              <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]/80">
                {group}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="group block rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.02] p-4 transition hover:border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/[0.05]"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-base font-medium">{s.title}</span>
                        <code className="text-xs text-[var(--foreground)]/50 group-hover:text-[var(--foreground)]/80">
                          {s.href}
                        </code>
                      </div>
                      <p className="mt-1 text-sm text-[var(--foreground)]/60">
                        {s.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
