export default function Hero() {
  return (
    <section id="hem" className="bg-paper pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="container-content">
        <h1 className="font-display text-5xl font-semibold tracking-tight text-ink md:text-6xl">
          Ahmed Habib
        </h1>

        <p className="mt-4 font-display text-2xl text-muted md:text-3xl">
          Systemutvecklare i Malmö
        </p>

        <p className="mt-8 max-w-xl text-lg text-muted">
          Jag bygger webb- och mobilappar, oftast med React, Next.js och
          Supabase. Just nu lägger jag min tid på Nexus Sportmatch och
          Procura.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projekt"
            className="border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-graphite-soft"
          >
            Se mina projekt
          </a>
          <a
            href="#kontakt"
            className="border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            Kontakta mig
          </a>
        </div>
      </div>
    </section>
  );
}
