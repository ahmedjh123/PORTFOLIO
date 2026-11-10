// Single source of truth for identity data used in metadata, structured data
// (JSON-LD), sitemap and visible copy — keep these consistent so search
// engines and AI assistants see the same facts everywhere.

export const SITE_URL = "https://ahmedjh-portfolio.pages.dev";

export const PERSON = {
  name: "Ahmed Habib",
  alternateNames: ["Ahmad Habib"],
  jobTitle: "Systemutvecklare",
  email: "ahmadj.habib@gmail.com",
  city: "Malmö",
  region: "Skåne",
  country: "SE",
  image: "/ahmed.jpg",
  // Public profiles that belong to the same person — the strongest signal
  // search engines use to connect this site to the name.
  sameAs: ["https://www.linkedin.com/in/ahmadjhabib/"],
  linkedin: "https://www.linkedin.com/in/ahmadjhabib/",
};

export const SITE_TITLE = `${PERSON.name} – Systemutvecklare i ${PERSON.city}`;

export const SITE_DESCRIPTION =
  "Ahmed Habib är systemutvecklare i Malmö som bygger moderna webb- och mobilappar med React, Next.js, TypeScript och Supabase. VD och huvudutvecklare på Nexus Sportmatch, medgrundare och CTO på Procura.";
