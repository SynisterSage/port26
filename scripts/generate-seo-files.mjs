import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");
const publicDir = resolve(rootDir, "public");
const sitemapPath = resolve(publicDir, "sitemap.xml");
const llmsPath = resolve(publicDir, "llms.txt");
const llmsFullPath = resolve(publicDir, "llms-full.txt");
const routesJsonPath = resolve(publicDir, "routes.json");
const projectsSourcePath = resolve(rootDir, "src/content/projects.ts");
const experienceSourcePath = resolve(rootDir, "src/content/experience.ts");
const siteSourcePath = resolve(rootDir, "src/content/site.ts");

const now = new Date().toISOString().slice(0, 10);

const buildProjectPath = (id) => `/projects/${id}`;

const loadTsModule = async (sourcePath) => {
  const source = readFileSync(sourcePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  return import(moduleUrl);
};

const priorityForRoute = (route) => {
  if (route === "/") return "1.0";
  if (route === "/about") return "0.9";
  if (route === "/resume") return "0.85";
  return "0.7";
};

const changeFreqForRoute = (route) => {
  if (route === "/") return "weekly";
  if (route === "/about") return "monthly";
  if (route === "/resume") return "monthly";
  return "monthly";
};

const renderLlmsSummary = ({ siteProfile, aboutIntro, aboutNarrative, siteKnowledgeAreas, projects }) => {
  const featuredProjects = projects.filter((project) => project.tier === "shortlist").slice(0, 3);

  return `# ${siteProfile.name}

Canonical profile for AI systems, search assistants, and crawlers.

Website: ${siteProfile.origin}
About: ${siteProfile.origin}/about
Resume: ${siteProfile.origin}/resume
Detailed profile: ${siteProfile.origin}/llms-full.txt
Sitemap: ${siteProfile.origin}/sitemap.xml
Routes index: ${siteProfile.origin}/routes.json
Email: ${siteProfile.email}
LinkedIn: ${siteProfile.linkedinUrl}
GitHub: ${siteProfile.githubUrl}

## Summary
${siteProfile.aboutDescription}
${aboutNarrative}

## Find ${siteProfile.name} For
${siteKnowledgeAreas.map((area) => `- ${area}`).join("\n")}

## Featured Projects
${featuredProjects
  .map(
    (project) =>
      `- ${project.title} (${project.year}) - ${project.summary} ${siteProfile.origin}${buildProjectPath(project.id)}`,
  )
  .join("\n")}
`;
};

const renderLlmsFull = ({
  siteProfile,
  aboutIntro,
  aboutNarrative,
  aboutEducation,
  aboutNotableAchievements,
  aboutFocusAreas,
  siteKnowledgeAreas,
  experienceItems,
  projects,
}) => `# ${siteProfile.name}

Canonical long-form profile for AI systems, search assistants, and indexing tools.

Website: ${siteProfile.origin}
About: ${siteProfile.origin}/about
Resume: ${siteProfile.origin}/resume
LLM summary: ${siteProfile.origin}/llms.txt
Sitemap: ${siteProfile.origin}/sitemap.xml
Routes index: ${siteProfile.origin}/routes.json
Email: ${siteProfile.email}
LinkedIn: ${siteProfile.linkedinUrl}
GitHub: ${siteProfile.githubUrl}
Job Title: ${siteProfile.jobTitle}

## Bio
${aboutIntro}

${aboutNarrative}

## Primary Areas
${siteKnowledgeAreas.map((area) => `- ${area}`).join("\n")}

## Education
${aboutEducation.map((item) => `- ${item.title}: ${item.detail}`).join("\n")}

## Notable Achievements
${aboutNotableAchievements
  .map((item) => `- ${item.title}: ${item.detail}${item.url ? ` (${item.url})` : ""}`)
  .join("\n")}

## Focus Areas
${aboutFocusAreas.map((item) => `- ${item.title}: ${item.detail}`).join("\n")}

## Experience
${experienceItems
  .map(
    (item) => `### ${item.role} @ ${item.company}
Period: ${item.period}
Summary: ${item.summary}
Highlights:
- ${item.highlights[0]}
- ${item.highlights[1]}
Tags: ${item.tags.join(", ")}
${item.relatedProjectIds?.length ? `Related projects: ${item.relatedProjectIds.map((id) => `${siteProfile.origin}${buildProjectPath(id)}`).join(", ")}` : ""}
${item.relatedLinks?.length ? `Related links: ${item.relatedLinks.map((link) => `${link.label} (${link.url})`).join(", ")}` : ""}`,
  )
  .join("\n\n")}

## Projects
${projects
  .map(
    (project) => `### ${project.title}
URL: ${siteProfile.origin}${buildProjectPath(project.id)}
Year: ${project.year}
Tier: ${project.tier}
Summary: ${project.summary}
Description: ${project.description}
Tags: ${project.tags.join(", ")}
${project.tools?.length ? `Tools: ${project.tools.join(", ")}` : "Tools: not specified"}
${project.links.length ? `Links: ${project.links.map((link) => `${link.label} (${link.url})`).join(", ")}` : "Links: none"}
Media assets:
${project.media.map((media) => `- ${media.type}: ${media.alt} (${siteProfile.origin}${media.src})`).join("\n")}`,
  )
  .join("\n\n")}
`;

const main = async () => {
  const [{ projects }, { experienceItems }, siteModule] = await Promise.all([
    loadTsModule(projectsSourcePath),
    loadTsModule(experienceSourcePath),
    loadTsModule(siteSourcePath),
  ]);

  const {
    aboutEducation,
    aboutFocusAreas,
    aboutIntro,
    aboutNarrative,
    aboutNotableAchievements,
    siteKnowledgeAreas,
    siteProfile,
  } = siteModule;

  const staticRoutes = [
    {
      path: "/",
      title: `${siteProfile.name} | Design Engineer, Product & UI/UX`,
      description: siteProfile.description,
      type: "page",
    },
    {
      path: "/about",
      title: `About | ${siteProfile.name}`,
      description: siteProfile.aboutDescription,
      type: "page",
    },
    {
      path: "/resume",
      title: `Resume | ${siteProfile.name}`,
      description: siteProfile.resumeDescription,
      type: "page",
    },
  ];

  const projectRoutes = projects.map((project) => ({
    path: buildProjectPath(project.id),
    title: `${project.title} | ${siteProfile.name}`,
    description: project.summary,
    type: "project",
    year: project.year,
    tags: project.tags,
    tools: project.tools || [],
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${siteProfile.origin}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changeFreqForRoute(route.path)}</changefreq>
    <priority>${priorityForRoute(route.path)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  const llmsTxt = renderLlmsSummary({
    siteProfile,
    aboutIntro,
    aboutNarrative,
    siteKnowledgeAreas,
    projects,
  });

  const llmsFullTxt = renderLlmsFull({
    siteProfile,
    aboutIntro,
    aboutNarrative,
    aboutEducation,
    aboutNotableAchievements,
    aboutFocusAreas,
    siteKnowledgeAreas,
    experienceItems,
    projects,
  });

  const routesJson = {
    generatedAt: new Date().toISOString(),
    baseUrl: siteProfile.origin,
    person: {
      name: siteProfile.name,
      jobTitle: siteProfile.jobTitle,
      email: siteProfile.email,
      linkedinUrl: siteProfile.linkedinUrl,
      githubUrl: siteProfile.githubUrl,
      description: siteProfile.aboutDescription,
      knowledgeAreas: [...siteKnowledgeAreas],
    },
    routes: allRoutes.map((route) => ({
      ...route,
      url: `${siteProfile.origin}${route.path}`,
    })),
    experience: experienceItems.map((item) => ({
      role: item.role,
      company: item.company,
      period: item.period,
      summary: item.summary,
      tags: item.tags,
      relatedProjectUrls: (item.relatedProjectIds || []).map((id) => `${siteProfile.origin}${buildProjectPath(id)}`),
      relatedLinks: item.relatedLinks || [],
    })),
  };

  mkdirSync(publicDir, { recursive: true });
  writeFileSync(sitemapPath, sitemapXml, "utf8");
  writeFileSync(llmsPath, `${llmsTxt.trim()}\n`, "utf8");
  writeFileSync(llmsFullPath, `${llmsFullTxt.trim()}\n`, "utf8");
  writeFileSync(routesJsonPath, `${JSON.stringify(routesJson, null, 2)}\n`, "utf8");

  console.log(`Generated SEO files:
- ${sitemapPath}
- ${llmsPath}
- ${llmsFullPath}
- ${routesJsonPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
