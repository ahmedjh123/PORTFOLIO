import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import {
  PERSON,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${PERSON.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: PERSON.name,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  keywords: [
    "Ahmed Habib",
    "Ahmad Habib",
    "systemutvecklare",
    "systemutvecklare Malmö",
    "webbutvecklare Malmö",
    "fullstackutvecklare",
    "frontendutvecklare",
    "apputvecklare",
    "React",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Nexus Sportmatch",
    "Procura",
    "digitala tjänster",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: PERSON.name,
    type: "profile",
    firstName: "Ahmed",
    lastName: "Habib",
    locale: "sv_SE",
    images: [
      {
        url: PERSON.image,
        width: 1350,
        height: 900,
        alt: `${PERSON.name}, systemutvecklare i ${PERSON.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [PERSON.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personId = `${SITE_URL}/#person`;

// Structured data: tells Google (and AI search) exactly who this page is
// about, so the site can be shown for searches on the name + profession.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: PERSON.name,
      alternateName: PERSON.alternateNames,
      givenName: "Ahmed",
      familyName: "Habib",
      jobTitle: PERSON.jobTitle,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${PERSON.image}`,
      email: `mailto:${PERSON.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.city,
        addressRegion: PERSON.region,
        addressCountry: PERSON.country,
      },
      homeLocation: {
        "@type": "Place",
        name: `${PERSON.city}, Sverige`,
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Högskolan Dalarna",
        },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Systemutvecklare",
        occupationLocation: {
          "@type": "City",
          name: PERSON.city,
        },
        skills:
          "React, React Native, Next.js, TypeScript, JavaScript, Node.js, Supabase, PostgreSQL, UX/UI-design, systemarkitektur",
      },
      knowsAbout: [
        "Systemutveckling",
        "Webbutveckling",
        "Apputveckling",
        "React",
        "React Native",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Supabase",
        "PostgreSQL",
        "UX/UI-design",
        "Tillgänglighet (WCAG)",
        "Systemarkitektur",
        "AI-assisterad utveckling",
      ],
      knowsLanguage: ["sv", "en"],
      worksFor: [
        { "@type": "Organization", name: "Nexus Sportmatch" },
        { "@type": "Organization", name: "Procura" },
      ],
      sameAs: PERSON.sameAs,
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      inLanguage: "sv-SE",
      mainEntity: { "@id": personId },
      about: { "@id": personId },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: PERSON.name,
      inLanguage: "sv-SE",
      publisher: { "@id": personId },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink font-body antialiased selection:bg-blue selection:text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
