# Ahmed Habib – portfölj

Next.js 14 (App Router) + TypeScript + Tailwind.

Byggd som en **statisk export** (`output: "export"` i
[next.config.mjs](next.config.mjs)) och publicerad på Cloudflare Pages:
https://ahmedjh-portfolio.pages.dev/. Cloudflare bygger om sidan automatiskt
vid varje push till `main`. Sidan har ingen Node-server eller API-routes, allt
är HTML/CSS/JS som serveras direkt.

## Kom igång lokalt

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

För att se exakt vad som publiceras (det statiska bygget):

```bash
npm run build   # bygger till out/
npm run start   # serverar out/ lokalt
```

## Kontaktformulär (Web3Forms)

Eftersom sidan är statisk skickas formuläret via
[Web3Forms](https://web3forms.com), som mejlar varje meddelande vidare.
Nyckeln skapas på web3forms.com för den e-postadress som ska ta emot
meddelandena och klistras in i `WEB3FORMS_ACCESS_KEY` i
[components/Contact.tsx](components/Contact.tsx). Nyckeln får ligga publikt,
den kan bara skicka till just den inkorgen. Utan nyckel visar formuläret ett
meddelande om att mejla direkt i stället.

## SEO

- Identitetsdata (namn, ort, e-post, LinkedIn, sidans adress) ligger i
  [lib/site.ts](lib/site.ts) och används av metadata, JSON-LD, sitemap och
  `robots.txt`.
- [public/llms.txt](public/llms.txt) är en sammanfattning för AI-sökmotorer.
- Sidan är verifierad i Google Search Console och Bing
  (verifieringsfilerna ligger i `public/`).

## Struktur

- `app/` – App Router: `layout.tsx` (metadata + JSON-LD), `page.tsx`,
  `robots.ts`, `sitemap.ts`, `globals.css`
- `components/` – en komponent per sektion (`Hero`, `About`, `Skills`,
  `Projects`, `Contact`, plus `Nav`, `Footer` och delade hjälpkomponenter)
- `lib/site.ts` – gemensamma uppgifter om person och webbplats
- `public/` – bilder, `llms.txt` och sökmotorverifieringsfiler

## Övrigt

- Designtokens (färger, typsnitt, typskala) ligger i
  [tailwind.config.ts](tailwind.config.ts), inte Tailwinds standardtema.
- `next/image` körs i `unoptimized`-läge eftersom statisk export inte har
  någon server att optimera bilder på.
