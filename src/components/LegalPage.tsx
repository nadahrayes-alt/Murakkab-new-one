"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";

type DocKey = "terms" | "privacy";

const COPY: Record<DocKey, { en: { title: string; effective: string; sections: { heading: string; body: string }[] }; ar: { title: string; effective: string; sections: { heading: string; body: string }[] } }> = {
  terms: {
    en: {
      title: "Terms of Service",
      effective: "Effective May 2026",
      sections: [
        {
          heading: "Acceptance",
          body: "By using Murakkab+ you agree to these Terms. If you do not agree, please do not use the service.",
        },
        {
          heading: "The service",
          body: "Murakkab+ provides educational and analytical content about publicly traded stocks. It is not investment advice and is not regulated as a financial advisor.",
        },
        {
          heading: "Accounts",
          body: "You're responsible for the security of your account credentials. We do not collect investment account credentials of any kind.",
        },
        {
          heading: "Subscriptions",
          body: "Premium subscriptions renew automatically until cancelled. You can cancel anytime from your account settings; cancellation takes effect at the end of the current billing period.",
        },
        {
          heading: "Limitation of liability",
          body: "Investment decisions are yours. Murakkab+ is not liable for losses incurred from acting on information shown on the platform.",
        },
        {
          heading: "Contact",
          body: "Questions about these Terms? Contact legal@murakkab.example.",
        },
      ],
    },
    ar: {
      title: "شروط الخدمة",
      effective: "سارية اعتبارًا من مايو 2026",
      sections: [
        { heading: "القبول", body: "باستخدامك مركّب+ فأنت توافق على هذه الشروط. إذا لم توافق، يرجى عدم استخدام الخدمة." },
        { heading: "الخدمة", body: "يوفّر مركّب+ محتوى تعليميًا وتحليليًا حول الأسهم المتداولة. هذا ليس استشارة استثمارية ولا تخضع المنصة لتنظيم المستشارين الماليين." },
        { heading: "الحسابات", body: "أنت مسؤول عن حماية بيانات حسابك. لا نجمع أي بيانات حسابات استثمارية على الإطلاق." },
        { heading: "الاشتراكات", body: "تتجدد اشتراكات Premium تلقائيًا حتى يتم إلغاؤها. يمكنك الإلغاء في أي وقت من إعدادات الحساب، ويسري الإلغاء في نهاية فترة الفوترة الحالية." },
        { heading: "حدود المسؤولية", body: "قرارات الاستثمار قراراتك أنت. لا يتحمّل مركّب+ مسؤولية أي خسائر ناتجة عن التصرّف بناءً على معلومات معروضة في المنصة." },
        { heading: "للتواصل", body: "للاستفسار حول هذه الشروط: legal@murakkab.example" },
      ],
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy",
      effective: "Effective May 2026",
      sections: [
        { heading: "What we collect", body: "Email address, display name, and your in-product activity (watchlist, alerts, articles read). Nothing else." },
        { heading: "How we use it", body: "To run the service, personalise your dashboard, and send notifications you opt into. We do not sell your data." },
        { heading: "Cookies", body: "Strictly functional only — preserving your language, theme, and login state in your browser's localStorage." },
        { heading: "Third parties", body: "We use sub-processors for hosting and (when enabled) email delivery. They process data only on our behalf." },
        { heading: "Your rights", body: "You can export or delete your data at any time from Settings → Danger zone → Delete account." },
        { heading: "Contact", body: "Privacy questions: privacy@murakkab.example" },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      effective: "سارية اعتبارًا من مايو 2026",
      sections: [
        { heading: "ما الذي نجمعه", body: "البريد الإلكتروني، الاسم المعروض، ونشاطك داخل المنتج (قائمة المتابعة، التنبيهات، المقالات المقروءة). لا شيء غير ذلك." },
        { heading: "كيف نستخدم البيانات", body: "لتشغيل الخدمة وتخصيص لوحتك وإرسال الإشعارات التي تفعّلها بنفسك. لا نبيع بياناتك." },
        { heading: "الكوكيز", body: "وظيفية فقط — تحفظ لغتك وثيمك وحالة تسجيل الدخول في localStorage داخل متصفحك." },
        { heading: "الأطراف الثالثة", body: "نستخدم مزوّدين لاستضافة الخدمة ولإرسال البريد (عند تفعيله). يعالجون البيانات بالنيابة عنّا فقط." },
        { heading: "حقوقك", body: "يمكنك تصدير أو حذف بياناتك في أي وقت من الإعدادات ← المنطقة الحساسة ← حذف الحساب." },
        { heading: "للتواصل", body: "أسئلة الخصوصية: privacy@murakkab.example" },
      ],
    },
  },
};

export default function LegalPage({ docKey }: { docKey: DocKey }) {
  const { lang } = useLang();
  const doc = COPY[docKey][lang];

  return (
    <article className="relative">
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 pt-24 sm:pt-32">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
          </Link>
          <h1 className="font-display text-3xl sm:text-5xl tracking-tight leading-tight">{doc.title}</h1>
          <p className="mt-3 text-[12.5px] text-[var(--muted)]">{doc.effective}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {doc.sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-xl sm:text-2xl tracking-tight">{s.heading}</h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-[var(--foreground)]/95">{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
