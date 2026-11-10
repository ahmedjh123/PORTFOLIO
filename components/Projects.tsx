import SectionHeading from "./SectionHeading";

type TechGroup = { label: string; value: string };

type Project = {
  name: string;
  role: string;
  theme: "blue" | "graphite";
  problem: string;
  solutionIntro: string;
  solutionPoints: string[];
  outcome: string;
  stack: TechGroup[];
};

const PROJECTS: Project[] = [
  {
    name: "Nexus Sportmatch",
    role: "VD och huvudutvecklare",
    theme: "blue",
    problem:
      "Den som vill träna med andra får i dag leta i Messenger-grupper, sms-trådar och Facebook-inlägg. Det är svårt att se vad som händer i närheten, och många matcher blir aldrig av för att det saknas en eller två spelare.",
    solutionIntro:
      "Jag har designat och byggt hela Sportmatch själv, både appen och backend. I appen kan man:",
    solutionPoints: [
      "Hitta träningspartners baserat på nivå och sport",
      "Skapa och gå med i matcher, grupper och aktiviteter",
      "Bygga en sportprofil med ranking och statistik",
      "Få notiser i realtid när nya matcher skapas",
      "Chatta med andra spelare direkt i appen",
    ],
    outcome:
      "Målet är att det ska gå lika snabbt att hitta någon att träna med som att skicka ett sms.",
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
    name: "Procura",
    role: "Medgrundare och CTO",
    theme: "graphite",
    problem:
      "Små och medelstora leverantörer lägger mycket tid på upphandlingar de aldrig hade kunnat vinna. För att veta om ett anbud ens är möjligt måste någon läsa 50 till 100 sidor, och ofta dyker ett skallkrav som stoppar allt upp först långt in i dokumentet.",
    solutionIntro:
      "Jag har byggt kärnarkitekturen i Procura, som läser upphandlingen åt företaget och svarar på om de kan lämna anbud. Procura:",
    solutionPoints: [
      "Hämtar och strukturerar förfrågningsunderlag från svenska och europeiska annonsdatabaser",
      "Extraherar skallkrav, certifikatkrav, ekonomiska trösklar och referenskrav",
      "Matchar kraven mot företagets kapabilitetsprofil",
      "Ger ett binärt besked: kan lämna anbud, kan lämna anbud om X åtgärdas, eller kan inte lämna anbud",
      "Visar exakt vilket krav som blockerar",
      "Levererar en kvalificeringskarta över alla pågående upphandlingar i företagets region",
    ],
    outcome:
      "Företagen kan lägga sin tid på de anbud de faktiskt har en chans att vinna.",
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
      <h3 className="font-display text-2xl font-semibold tracking-tight">
        {project.name}
      </h3>
      <p className={`mt-1 text-sm ${faint}`}>{project.role}</p>

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
        <h4 className="label mb-2 text-blue">Teknik</h4>
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
        <SectionHeading title="Projekt" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          {PROJECTS.map((project, i) => (
            <div key={project.name} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
