import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section
      id="hem"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper pt-28 pb-16"
    >
      {/* Interactive dot grid: dots near the pointer turn blue and move away */}
      <div className="absolute inset-0">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper" />
      </div>

      <div className="container-content relative w-full">
        <h1 className="font-display text-5xl font-semibold tracking-tight text-ink md:text-6xl">
          Ahmed Habib
        </h1>

        <p className="mt-4 font-display text-2xl text-muted md:text-3xl">
          Systemutvecklare i Malmö
        </p>

        <p className="mt-8 max-w-xl text-lg text-muted">
          Jag utvecklar webb- och mobilapplikationer i React, Next.js,
          TypeScript och Supabase.
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
