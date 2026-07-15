# Ahmed Habib — portfölj

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

## Kom igång lokalt

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Innan deploy — det här måste fyllas i

1. **Projektbeskrivningar** ([components/Projects.tsx](components/Projects.tsx))
   Nexus Sportmatch och Procura har just nu tomma, streckade platshållare
   för Problem / Lösning / Tech stack (markerade med `{/* TODO */}` i
   koden). Fyll i riktig text där.

2. **SMTP-uppgifter för kontaktformuläret**
   Kopiera `.env.example` till `.env.local` och fyll i:

   ```
   ZOHO_SMTP_HOST=smtp.zoho.com
   ZOHO_SMTP_PORT=465
   ZOHO_SMTP_USER=ahmad@omegasoftware.se
   ZOHO_SMTP_PASSWORD=<ditt Zoho-lösenord eller app-specifika lösenord>
   CONTACT_RECEIVER_EMAIL=ahmad@omegasoftware.se
   ```

   Skriv **aldrig** in riktiga lösenord i koden eller committa `.env.local`
   — den är redan listad i `.gitignore`. På Vercel läggs samma variabler in
   under Project Settings → Environment Variables.

   Kontaktformuläret (`app/api/contact/route.ts`) har inte kunnat testas
   end-to-end här eftersom det inte finns några riktiga SMTP-uppgifter i
   den här miljön. Validering, honeypot och felhantering är på plats, men
   det faktiska mejlutskicket bör testas manuellt en gång med riktiga
   uppgifter innan launch.

3. **Domän/deploy**
   Repot innehåller fortfarande `CNAME` och `.htaccess` från den gamla
   GitHub Pages-baserade sajten. De används inte av Next.js/Vercel — ta
   bort dem eller låt dem ligga orört beroende på om domänen
   `ahmedjh.great-site.net` ska pekas om mot Vercel.

## Struktur

- `app/` — App Router: `layout.tsx`, `page.tsx`, `globals.css`, samt
  `api/contact/route.ts` för kontaktformuläret
- `components/` — en komponent per sektion (`Hero`, `About`, `Skills`,
  `Projects`, `Contact`, plus `Nav`, `Footer` och delade hjälpkomponenter)
- `public/` — statiska filer, inklusive de befintliga
  sökmotorverifieringsfilerna (Bing, Google)

## Övrigt

- Hero-bakgrunden är en canvas-baserad partikelanimation
  ([components/HeroCanvas.tsx](components/HeroCanvas.tsx)). Den är byggd
  för att enkelt kunna ersättas av en `<video>`-bakgrund senare — se
  kommentaren i [components/Hero.tsx](components/Hero.tsx).
- Designtokens (färger, typsnitt, typskala) ligger i
  [tailwind.config.ts](tailwind.config.ts), inte Tailwinds standardtema.
