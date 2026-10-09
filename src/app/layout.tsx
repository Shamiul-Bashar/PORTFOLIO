import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { LoadingScreen } from "@/components/loading/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { AILayout } from "@/components/ui/ai-assistant/ai-layout";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_TITLE = "MD. Shamiul Basher Siam — Software Engineering Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of MD. Shamiul Basher Siam, CSE undergraduate at KUET. Exploring software engineering, problem solving and reliable systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — Shamiul Basher Siam" },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE, description: SITE_DESCRIPTION,
    url: SITE_URL, siteName: "Shamiul Basher Siam", locale: "en_US", type: "website",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${jetBrainsMono.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg-primary text-text-primary antialiased">
        <LoadingScreen />
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AILayout />
        </Providers>
      </body>
    </html>
  );
}
