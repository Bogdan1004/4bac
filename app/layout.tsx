import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4bac — Informatica pentru liceu",
  description: "Platforma de antrenament pentru bacalaureatul de informatica in C++",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={inter.className}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-E407X72B2S" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E407X72B2S');
        `}</Script>
      </head>
      <body className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
