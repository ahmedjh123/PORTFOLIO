import Image from "next/image";
import FadeInSection from "./FadeInSection";
import SectionLabel from "./SectionLabel";

const META = [
  {
    label: "Utbildning",
    value: "Högskolan Dalarna, Digitala tjänster (informatik)",
  },
  {
    label: "Bakgrund",
    value: "Ekonomi och juridik, Malmö Borgarskola",
  },
  {
    label: "Roll idag",
    value: "CEO och Lead Developer på Nexus Sportmatch, medgrundare och CTO på Procura",
  },
];

export default function About() {
  return (
    <section id="om-mig" className="bg-scandi py-section">
      <div className="container-content">
        <SectionLabel index="01" title="Om mig" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeInSection>
              <div className="relative mb-6 aspect-[4/5] w-full max-w-[260px] overflow-hidden border border-line">
                <Image
                  src="/ahmed.jpg"
                  alt="Ahmed Habib"
                  fill
                  sizes="(min-width: 768px) 260px, 60vw"
                  className="object-cover object-top"
                />
              </div>
              <dl className="space-y-5">
                {META.map((item) => (
                  <div key={item.label} className="border-t border-line pt-3">
                    <dt className="label text-faint">{item.label}</dt>
                    <dd className="mt-1.5 text-sm text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeInSection>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <FadeInSection delay={0.1}>
              <div className="space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Jag är utbildad på Högskolan Dalarnas program i digitala
                  tjänster, med inriktning informatik. Innan dess läste jag
                  ekonomi och juridik på Malmö Borgarskola, en bakgrund som
                  fortfarande märks i hur jag närmar mig affärskritiska och
                  kommersiella projekt: jag ser sällan ett tekniskt problem
                  isolerat från vad det faktiskt kostar, löser eller riskerar
                  för verksamheten bakom det.
                </p>
                <p>
                  Utbildningen gav mig en bred grund i både
                  frontendutveckling och backendutveckling, design inom UX
                  och UI samt komponentdriven webbdesign,
                  applikationsutveckling för webben, systemutveckling,
                  projektledning och agila arbetssätt, tillgänglighet och
                  användbarhet, digital transformation och digital strategi
                  samt forskningsmetodik och kravanalys. Det är den
                  kombinationen av designtänk, teknisk grund och förståelse
                  för hela vägen från idé till en förvaltad digital tjänst
                  som jag jobbar utifrån idag.
                </p>
                <p>
                  I dag är jag CEO och Lead Developer på{" "}
                  <span className="text-ink">Nexus Sportmatch</span> samt
                  medgrundare och CTO på{" "}
                  <span className="text-ink">Procura</span>. Jag kodar starkt
                  både med och utan AI: grunderna sitter på djupet, men jag
                  använder också AI effektivt i utvecklingsarbetet, med
                  verktyg som Claude Code och Codex, för att ta projekt
                  snabbare från idé till produktion utan att ge avkall på
                  kvalitet eller tillgänglighet.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}
