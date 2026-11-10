import Image from "next/image";
import SectionHeading from "./SectionHeading";

const META = [
  {
    label: "Yrke",
    value: "Systemutvecklare i Malmö",
  },
  {
    label: "Utbildning",
    value: "Digitala tjänster (informatik), Högskolan Dalarna",
  },
  {
    label: "Bakgrund",
    value: "Ekonomi och juridik, Malmö Borgarskola",
  },
  {
    label: "Just nu",
    value: "VD och huvudutvecklare på Nexus Sportmatch, medgrundare och CTO på Procura",
  },
];

export default function About() {
  return (
    <section id="om-mig" className="bg-scandi py-section">
      <div className="container-content">
        <SectionHeading title="Om mig" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="relative mb-6 aspect-[4/5] w-full max-w-[260px] overflow-hidden border border-line">
              <Image
                src="/ahmed.jpg"
                alt="Ahmed Habib, systemutvecklare i Malmö"
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
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                Jag heter Ahmed Habib och är systemutvecklare i Malmö. Jag
                bygger webb- och mobilappar, oftast med React, Next.js,
                TypeScript och Supabase.
              </p>
              <p>
                Jag har läst Digitala tjänster med inriktning informatik på
                Högskolan Dalarna. Där jobbade jag med både frontend och
                backend, UX/UI-design, tillgänglighet och projektledning i
                agila team.
              </p>
              <p>
                Innan dess gick jag ekonomi och juridik på Malmö Borgarskola.
                Det märks fortfarande i hur jag jobbar: när jag bygger något
                vill jag veta vad det kostar och vad det betyder för
                verksamheten, inte bara hur det ska kodas.
              </p>
              <p>
                I dag är jag VD och huvudutvecklare på{" "}
                <span className="text-ink">Nexus Sportmatch</span> och
                medgrundare och CTO på{" "}
                <span className="text-ink">Procura</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
