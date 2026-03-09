import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");
const projectsSourcePath = resolve(rootDir, "src/content/projects.ts");
const publicDir = resolve(rootDir, "public");
const sitemapPath = resolve(publicDir, "sitemap.xml");
const llmsPath = resolve(publicDir, "llms.txt");
const routesJsonPath = resolve(publicDir, "routes.json");

const baseUrl = "https://aferguson.art";
const now = new Date().toISOString().slice(0, 10);

const projectSource = readFileSync(projectsSourcePath, "utf8");
const projectIds = Array.from(projectSource.matchAll(/\bid:\s*"([^"]+)"/g), (match) => match[1]).filter(
  (value, index, list) => list.indexOf(value) === index,
);

const staticRoutes = ["/", "/resume"];
const projectRoutes = projectIds.map((id) => `/projects/${id}`);
const allRoutes = [...staticRoutes, ...projectRoutes];

const priorityForRoute = (route) => {
  if (route === "/") return "1.0";
  if (route === "/resume") return "0.8";
  return "0.65";
};

const changeFreqForRoute = (route) => {
  if (route === "/") return "weekly";
  if (route === "/resume") return "monthly";
  return "monthly";
};

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changeFreqForRoute(route)}</changefreq>
    <priority>${priorityForRoute(route)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const llmsTxt = `# Lex Ferguson Portfolio

Site: ${baseUrl}
Owner: Lex Ferguson
Focus: Product design, UI/UX, design engineering, and visual systems.

## Primary URLs
- ${baseUrl}/
- ${baseUrl}/resume
- ${baseUrl}/sitemap.xml

## Project URLs
${projectRoutes.map((route) => `- ${baseUrl}${route}`).join("\n")}
`;

const routesJson = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routes: allRoutes.map((route) => ({
    path: route,
    url: `${baseUrl}${route}`,
    type: route.startsWith("/projects/") ? "project" : "page",
  })),
};

mkdirSync(publicDir, { recursive: true });
writeFileSync(sitemapPath, sitemapXml, "utf8");
writeFileSync(llmsPath, llmsTxt, "utf8");
writeFileSync(routesJsonPath, `${JSON.stringify(routesJson, null, 2)}\n`, "utf8");

console.log(`Generated SEO files:
- ${sitemapPath}
- ${llmsPath}
- ${routesJsonPath}`);
