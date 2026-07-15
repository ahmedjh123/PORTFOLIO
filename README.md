# Ahmed Habib — portfölj

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

Byggd som ett **statiskt export** (`output: "export"` i
[next.config.mjs](next.config.mjs)) för att kunna hostas på GitHub Pages på
domänen `ahmedjh.great-site.net`. Det innebär att sidan inte har någon
Node-server eller API-routes — allt är HTML/CSS/JS som serveras direkt.

## Kom igång lokalt

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

För att se exakt vad som publiceras (det statiska bygget):

```bash
npm run build   # bygger till out/
npm run start   # serverar out/ lokalt på http://localhost:3000
```

## Innan deploy — det här måste fyllas i

1. **Kontaktformulär (Formspree)**
   Eftersom GitHub Pages inte kan köra server-kod går kontaktformuläret via
   [Formspree](https://formspree.io) istället för en egen backend:

   1. Skapa ett gratis konto på formspree.io och ett nytt formulär.
   2. Kopiera formulärets ID (ser ut som `https://formspree.io/f/xxxxxxxx`).
   3. Klistra in det i [components/Contact.tsx](components/Contact.tsx),
      i konstanten `FORMSPREE_ENDPOINT` högst upp i filen.

   Formuläret använder Formsprees inbyggda honeypot-fält (`_gotcha`) mot
   enkla spam-bottar samt `_subject` för att sätta ämnesraden på mejlen som
   kommer in. Det här har inte kunnat testas end-to-end här eftersom det
   inte finns ett riktigt Formspree-formulär kopplat i den här miljön.

2. **GitHub Pages-inställning**
   Deploy sker via [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
   som bygger sajten och publicerar den vid varje push till `main`. För att
   det ska fungera måste repots **Settings → Pages → Source** vara satt till
   **"GitHub Actions"** (inte "Deploy from a branch").

## Struktur

- `app/` — App Router: `layout.tsx`, `page.tsx`, `globals.css`
- `components/` — en komponent per sektion (`Hero`, `About`, `Skills`,
  `Projects`, `Contact`, plus `Nav`, `Footer` och delade hjälpkomponenter)
- `public/` — statiska filer: `CNAME` (custom domain), `.nojekyll`
  (förhindrar GitHub Pages från att Jekyll-processa sajten), bilder och
  sökmotorverifieringsfiler
- `.github/workflows/deploy.yml` — bygger och publicerar till GitHub Pages

## Övrigt

- Hero-bakgrunden är en canvas-baserad partikelanimation
  ([components/HeroCanvas.tsx](components/HeroCanvas.tsx)). Den är byggd
  för att enkelt kunna ersättas av en `<video>`-bakgrund senare — se
  kommentaren i [components/Hero.tsx](components/Hero.tsx).
- Designtokens (färger, typsnitt, typskala) ligger i
  [tailwind.config.ts](tailwind.config.ts), inte Tailwinds standardtema.
- `next/image` körs i `unoptimized`-läge eftersom statisk export inte har
  någon server att optimera bilder på.
