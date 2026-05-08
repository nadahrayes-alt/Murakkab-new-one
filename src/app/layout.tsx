import type { Metadata } from "next";
import { Inter, Instrument_Serif, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageProvider";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { AuthProvider } from "@/lib/AuthProvider";
import { SearchProvider } from "@/lib/SearchProvider";
import { WatchlistProvider } from "@/lib/WatchlistProvider";
import { AlertsProvider } from "@/lib/AlertsProvider";
import AuthModal from "@/components/AuthModal";
import SearchModal from "@/components/SearchModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sans = Inter({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const arabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "مركّب+ — تحليل أسهم وفق معايير الشريعة",
  description:
    "مركّب+ يوفر نظام فلترة ذكي يجمع بين الجودة والقيمة العادلة والتوافق الشرعي، مدعومًا بتحليل فريق من المحللين وخوارزميات الذكاء الاصطناعي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="dark"
      className={`${sans.variable} ${display.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <WatchlistProvider>
                <AlertsProvider>
                  <SearchProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <AuthModal />
                    <SearchModal />
                  </SearchProvider>
                </AlertsProvider>
              </WatchlistProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
