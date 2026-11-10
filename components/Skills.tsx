import SectionHeading from "./SectionHeading";
import { ClaudeLogo, OpenAILogo, TechIcon, type TechIconName } from "./icons";

const TECHNOLOGIES: { name: string; icon: TechIconName }[] = [
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "React Native", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Expo", icon: "expo" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "shadcn/ui", icon: "shadcnui" },
  { name: "Framer Motion", icon: "framer" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Express", icon: "express" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Prisma", icon: "prisma" },
  { name: "Redis", icon: "redis" },
  { name: "Supabase", icon: "supabase" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Cloudflare", icon: "cloudflare" },
  { name: "Docker", icon: "docker" },
  { name: "Sentry", icon: "sentry" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Vercel", icon: "vercel" },
  { name: "Railway", icon: "railway" },
];

const COMPETENCIES = [
  "UX/UI-design",
  "Tillgänglighet (WCAG)",
  "Prototyping",
  "Komponentdriven design",
  "Systemarkitektur",
  "API-design",
  "REST API",
  "Zustand",
  "Next.js App Router",
  "SSR / SSG / ISR",
  "Supabase Edge Functions",
  "WebSockets (realtid)",
  "Agila metoder",
  "CI/CD (GitHub Actions)",
  "Monitoring & Logging (Sentry, Logflare)",
];

export default function Skills() {
  return (
    <section id="fardigheter" className="bg-paper py-section">
      <div className="container-content">
        <SectionHeading title="Färdigheter" />

        <div>
          <h3 className="label mb-4 text-faint">Teknologier</h3>
          <ul className="grid grid-cols-3 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4 md:grid-cols-6">
            {TECHNOLOGIES.map((tech) => (
              <li
                key={tech.name}
                className="group flex flex-col items-center justify-center gap-2 bg-paper px-2 py-4 transition-colors hover:bg-scandi"
              >
                <TechIcon
                  name={tech.icon}
                  className="h-5 w-5 text-ink transition-colors group-hover:text-blue"
                />
                <span className="text-center text-xs text-muted">
                  {tech.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="label mb-4 text-faint">Kompetensområden</h3>
          <ul className="flex flex-wrap gap-2">
            {COMPETENCIES.map((item) => (
              <li
                key={item}
                className="border border-line px-3 py-1.5 text-sm text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-5 border border-graphite bg-graphite p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="max-w-xl">
              <h3 className="label mb-2 text-blue">AI i utvecklingen</h3>
              <p className="text-base text-paper">
                Jag använder Claude Code och Codex varje dag. De gör mig
                snabbare, men jag läser och förstår all kod innan den går ut.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <ClaudeLogo className="h-7 w-7 text-paper" />
              <OpenAILogo className="h-7 w-7 text-paper" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
