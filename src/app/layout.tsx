import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { LoadingScreen } from "@/components/loading/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { AILayout } from "@/components/ui/ai-assistant/ai-layout";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Never hardcode the production domain: read it from the environment so
// staging/preview/production deployments each get correct absolute URLs
// for Open Graph/Twitter images, with a safe localhost fallback for
// local development when the env var isn't set yet.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const SITE_TITLE =
  "MD. Shamiul Basher Siam — CSE Student & Aspiring Software Engineer";

const SITE_DESCRIPTION =
  "Portfolio of MD. Shamiul Basher Siam, a Computer Science & Engineering student at KUET, building toward a career as a software engineer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Shamiul Basher Siam",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Shamiul Basher Siam",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} h-full`}
    >
      <body className="bg-bg-primary text-text-primary flex min-h-full flex-col antialiased">
        <LoadingScreen />

        <Providers>
          <ScrollProgress />

          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />

          {/* Global AI Assistant */}
          <AILayout />
        </Providers>
      </body>
    </html>
  );
}