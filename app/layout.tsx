import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistProvider from "@/components/WaitlistProvider";
import Analytics from "@/components/Analytics";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Formul8 Nutrition | Your Gut. Your Health. Your Formula.", template: "%s | Formul8 Nutrition" },
  description: "Formul8 is a simple daily gut-health powder designed to support digestion, everyday wellness, and healthy-looking skin from within. Join the waitlist.",
};
export const viewport: Viewport = { themeColor: "#123D2B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cream focus:px-4 focus:py-2">Skip to content</a>
        <WaitlistProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </WaitlistProvider>
        <Analytics />
      </body>
    </html>
  );
}
