/**
 * Static content — non-translatable data (names, handles, tech tags, URLs).
 * Translatable copy lives in `messages/{locale}.json`.
 */

export type TeamMember = {
  slug: string;
  name: string;
  roleKey: "fullstack" | "mobile" | "fullstack_ai";
  avatar: string;
  github?: string;
  website?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    slug: "alejandro",
    name: "Alejandro Vázquez",
    roleKey: "fullstack_ai",
    avatar: "/team/alejandro.webp",
    github: "alejandrovazquez",
  },
  {
    slug: "valeria",
    name: "Valeria Ortega",
    roleKey: "fullstack",
    avatar: "/team/valeria.webp",
    github: "valeriaortega",
  },
  {
    slug: "mateo",
    name: "Mateo Fernández",
    roleKey: "mobile",
    avatar: "/team/mateo.webp",
    github: "mateofernandez",
  },
];

export type Service = {
  slug: "web" | "mobile" | "automation";
  icon: "globe" | "smartphone" | "workflow";
  tech: readonly string[];
};

export const services: Service[] = [
  {
    slug: "web",
    icon: "globe",
    tech: ["Next.js", "React", "Angular", "Astro", "TypeScript", "NestJS"],
  },
  {
    slug: "mobile",
    icon: "smartphone",
    tech: ["Flutter", "React Native", "Ionic", "iOS", "Android"],
  },
  {
    slug: "automation",
    icon: "workflow",
    tech: ["n8n", "Zapier", "MCP", "Node.js", "PostgreSQL"],
  },
];

export type Project = {
  slug: string;
  titleKey: string;
  summaryKey: string;
  tech: readonly string[];
  year: string;
  url?: string;
  span?: "wide" | "tall" | "default";
};

export const projects: Project[] = [
  {
    slug: "delivery",
    titleKey: "projects.items.delivery.title",
    summaryKey: "projects.items.delivery.summary",
    tech: ["Flutter", "NestJS", "PostgreSQL", "Firebase"],
    year: "2024",
    span: "wide",
  },
  {
    slug: "backoffice",
    titleKey: "projects.items.backoffice.title",
    summaryKey: "projects.items.backoffice.summary",
    tech: ["Angular", ".NET 8", "SQL Server", "Azure"],
    year: "2024",
  },
  {
    slug: "pos",
    titleKey: "projects.items.pos.title",
    summaryKey: "projects.items.pos.summary",
    tech: ["Ionic", "Railway", "PostgreSQL"],
    year: "2023",
  },
  {
    slug: "fintech",
    titleKey: "projects.items.fintech.title",
    summaryKey: "projects.items.fintech.summary",
    tech: ["Next.js", "AWS Lambda", "DynamoDB"],
    year: "2025",
  },
  {
    slug: "realestate",
    titleKey: "projects.items.realestate.title",
    summaryKey: "projects.items.realestate.summary",
    tech: ["Astro", "Vercel", "Sanity CMS"],
    year: "2023",
  },
  {
    slug: "aiagent",
    titleKey: "projects.items.aiagent.title",
    summaryKey: "projects.items.aiagent.summary",
    tech: ["Next.js", "MCP", "OpenAI", "PostgreSQL"],
    year: "2025",
  },
  {
    slug: "automation",
    titleKey: "projects.items.automation.title",
    summaryKey: "projects.items.automation.summary",
    tech: ["n8n", "Railway", "Webhooks"],
    year: "2024",
  },
  {
    slug: "fitness",
    titleKey: "projects.items.fitness.title",
    summaryKey: "projects.items.fitness.summary",
    tech: ["React Native", "Firebase", "Stripe"],
    year: "2025",
  },
];

/**
 * Tech stack logos for the marquee section.
 * Each entry is a brand name — the marquee component renders them
 * as text pills or maps to a logo SVG if available.
 */
export const techStack = [
  "Next.js",
  "React",
  "Angular",
  "Astro",
  "Flutter",
  "Ionic",
  ".NET",
  "NestJS",
  "PostgreSQL",
  "SQL Server",
  "Firebase",
  "Railway",
  "Vercel",
  "AWS",
  "Azure",
  "n8n",
  "OpenAI",
  "Stripe",
] as const;

/**
 * Headline stats for the animated counter strip.
 */
export const stats = [
  { valueKey: "stats.projects.value", labelKey: "stats.projects.label", value: 25, suffix: "+" },
  { valueKey: "stats.endpoints.value", labelKey: "stats.endpoints.label", value: 130, suffix: "+" },
  { valueKey: "stats.modules.value", labelKey: "stats.modules.label", value: 100, suffix: "+" },
  { valueKey: "stats.clients.value", labelKey: "stats.clients.label", value: 15, suffix: "+" },
] as const;

export const socials = {
  github: "https://github.com/axiom-studio",
  linkedin: "https://linkedin.com/company/axiom-studio",
  email: "hello@axiom.studio",
} as const;
