import FadeInSection from "./FadeInSection";
import SectionLabel from "./SectionLabel";

type TechGroup = { label: string; value: string };

type Project = {
  index: string;
  name: string;
  org?: string;
  role: string;
  featured?: boolean;
  theme: "blue" | "graphite";
  problem: string;
  solutionIntro: string;
  solutionPoints: string[];
  outcome: string;
  stack: TechGroup[];
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Nexus Sportmatch",
    role: "CEO & Lead Developer",
    featured: true,
    theme: "blue",
    problem:
      "Människor som vill träna har idag ingen modern plattform för att hitta träningspartners, spontana matcher eller lokala sportaktiviteter. Allt sker via manuella chattar, Messenger-grupper, SMS eller slumpmässiga Facebook-inlägg, vilket leder till missade möjligheter, otydlig kommunikation och ingen överblick över sportaktiviteter i området.",
    solutionIntro:
      "Jag har designat och utvecklat hela Sportmatch-plattformen från grunden. Plattformen gör det enkelt för vanliga människor att:",
    solutionPoints: [
      "Hitta träningspartners baserat på nivå och sport",
      "Skapa och gå med i matcher, grupper och aktiviteter",
      "Bygga en sportprofil med ranking och statistik",
      "Få notiser i realtid när nya matcher skapas",
      "Kommunicera snabbt och smidigt i appen",
      "Använda ett modernt, snabbt och mobiloptimerat gränssnitt",
    ],
    outcome:
      "Sportmatch är byggt för att bli Sveriges mest moderna sportmatchningsplattform för alla som vill träna mer och hitta nya människor.",
    stack: [
      { label: "Frontend", value: "React Native (Expo), Next.js" },
      { label: "Backend", value: "Supabase (PostgreSQL, Auth, Storage)" },
      { label: "API", value: "Edge Functions" },
      { label: "Deployment", value: "Vercel + Supabase" },
      {
        label: "Övrigt",
        value: "UX/UI-design, animationer (Lottie), systemarkitektur, datamodellering",
      },
    ],
  },
  {
    index: "02",
    name: "Procura",
    org: "Quality Systems AB",
    role: "Co-founder & CTO",
    theme: "graphite",
    problem:
      "Små och medelstora leverantörer lägger enorma mängder tid på offentliga upphandlingar som de aldrig kan vinna. För att avgöra om ett anbud ens är möjligt måste någon läsa 50 till 100 sidor manuellt, bara för att upptäcka ett diskvalificerande skallkrav långt in i dokumentet. Det saknas ett verktyg som automatiskt läser kraven, matchar dem mot företagets kapabilitet och ger ett binärt kvalificeringsbesked.",
    solutionIntro:
      "Jag utvecklade kärnarkitekturen för Procura, en plattform som automatiserar kvalificeringsbeslutet i offentlig upphandling. Plattformen gör detta:",
    solutionPoints: [
      "Hämtar och strukturerar förfrågningsunderlag från svenska och europeiska annonsdatabaser",
      "Extraherar skallkrav, certifikatkrav, ekonomiska trösklar och referenskrav",
      "Matchar kraven mot företagets kapabilitetsprofil",
      "Ger ett binärt besked: kan lämna anbud, kan lämna anbud om X åtgärdas, eller kan inte lämna anbud",
      "Visar exakt vilket krav som blockerar",
      "Levererar en kvalificeringskarta över alla pågående upphandlingar i företagets region",
    ],
    outcome:
      "Resultatet är att företag slipper lägga tid på fel anbud och istället fokuserar på de upphandlingar de faktiskt kan vinna.",
    stack: [
      { label: "Frontend", value: "React, Next.js, Tailwind" },
      { label: "Backend", value: "Cloudflare Workers, Node.js" },
      { label: "Databas", value: "PostgreSQL" },
      { label: "API", value: "REST" },
      { label: "Autentisering", value: "JWT / Workers Auth" },
      { label: "Deployment", value: "Cloudflare" },
      {
        label: "Övrigt",
        value:
          "CI/CD, GitHub Actions, modulär arkitektur, hög prestanda, kravtaxonomimotor, dokumentextraktion",
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const dark = project.theme === "graphite";
  const muted = dark ? "text-muted-onDark" : "text-muted";
  const faint = dark ? "text-faint-onDark" : "text-faint";
  const rowBorder = dark ? "border-line-onDark" : "border-line";

  return (
    <article
      className={`flex h-full flex-col border p-6 md:p-8 ${
        dark
          ? "border-graphite bg-graphite text-paper"
          : "border-line bg-paper text-ink"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="label text-blue">{project.index}</span>
        {project.featured && (
          <span className="label border border-blue/40 px-2 py-0.5 text-blue">
            Flaggskepp
          </span>
        )}
      </div>

      <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">
        {project.name}
      </h3>
      <p className={`mt-1 text-sm ${faint}`}>
        {project.org ? `${project.org} — ` : ""}
        {project.role}
      </p>

      <div className="mt-6 border-l-2 border-blue/50 pl-4">
        <h4 className="label mb-1.5 text-blue">Problem</h4>
        <p className={`text-sm leading-relaxed ${muted}`}>{project.problem}</p>
      </div>

      <div className="mt-5 border-l-2 border-blue/50 pl-4">
        <h4 className="label mb-1.5 text-blue">Lösning</h4>
        <p className={`text-sm leading-relaxed ${muted}`}>
          {project.solutionIntro}
        </p>
        <ul className="mt-3 space-y-1.5">
          {project.solutionPoints.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-3 text-sm leading-relaxed ${muted}`}>
          {project.outcome}
        </p>
      </div>

      <div className="mt-5 border-l-2 border-blue/50 pl-4">
        <h4 className="label mb-2 text-blue">Tech stack</h4>
        <dl className="space-y-1">
          {project.stack.map((group) => (
            <div key={group.label} className={`flex gap-3 border-b ${rowBorder} py-1.5 text-sm`}>
              <dt className={`w-28 shrink-0 ${faint}`}>{group.label}</dt>
              <dd>{group.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projekt" className="bg-scandi py-section">
      <div className="container-content">
        <SectionLabel index="03" title="Projekt" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          {PROJECTS.map((project, i) => (
            <FadeInSection key={project.name} delay={i * 0.08} className="h-full">
              <ProjectCard project={project} />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
