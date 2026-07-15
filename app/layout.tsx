import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ahmedjh.great-site.net"),
  title: "Ahmed Habib | Systemutvecklare & digitala tjänster-specialist",
  description:
    "Jag bygger digitala tjänster med fokus på kvalitet, tillgänglighet och modern teknik. Co-founder & CTO på Nexus Sportmatch och Procura.",
  openGraph: {
    title: "Ahmed Habib | Systemutvecklare & digitala tjänster-specialist",
    description:
      "Jag bygger digitala tjänster med fokus på kvalitet, tillgänglighet och modern teknik.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink font-body antialiased selection:bg-blue selection:text-paper">
        {children}
      </body>
    </html>
  );
}
