import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");
const distDir = resolve(rootDir, "dist");
const distIndexPath = resolve(distDir, "index.html");
const projectsSourcePath = resolve(rootDir, "src/content/projects.ts");

const SITE_ORIGIN = "https://aferguson.art";
const SITE_NAME = "Lex Ferguson";
const SITE_DESCRIPTION =
  "Portfolio of Lex Ferguson, a design engineer working across web, mobile, branding, UI/UX, and visual systems.";
const ABOUT_INTRO =
  "My name is Lex Ferguson, a design engineer working across web, mobile, branding, and UI/UX. I design and build products that balance clarity, responsiveness, and personality, with experience spanning shipped club software, app concepts, identity systems, and visual design.";
const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_SOCIAL_IMAGE_PATH = "/og-default.jpg";
const ABOUT_SOCIAL_IMAGE_PATH = "/about.jpg";
const RESUME_SOCIAL_IMAGE_PATH = "/resume.jpg";
const PROJECT_SOCIAL_IMAGE_PATH = "/project.jpg";
const SITE_LINKEDIN = "https://linkedin.com/in/lex-ferguson";
const SITE_GITHUB = "https://github.com/SynisterSage";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeAttribute = (value) =>
  escapeHtml(value)
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildAbsoluteUrl = (path) => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_ORIGIN}${path}`;
};

const getImageMimeType = (path) => {
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
};

const buildProjectPath = (id) => `/projects/${id}`;

const replaceTag = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${label} in dist/index.html`);
  }

  return html.replace(pattern, replacement);
};

const replaceMetaTag = (html, attr, key, content) =>
  replaceTag(
    html,
    new RegExp(`<meta\\s+${attr}="${escapeRegex(key)}"\\s+content="[^"]*"\\s*/?>`),
    `<meta ${attr}="${key}" content="${escapeAttribute(content)}" />`,
    `meta ${attr}=${key}`,
  );

const replaceLinkHref = (html, rel, href) =>
  replaceTag(
    html,
    new RegExp(`<link\\s+rel="${escapeRegex(rel)}"\\s+href="[^"]*"\\s*/?>`),
    `<link rel="${rel}" href="${escapeAttribute(href)}" />`,
    `link rel=${rel}`,
  );

const buildPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  jobTitle: "Creative Technologist",
  email: "mailto:afergyy@gmail.com",
  sameAs: [SITE_LINKEDIN, SITE_GITHUB],
});

const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_NAME} Portfolio`,
  url: SITE_ORIGIN,
  inLanguage: "en-US",
});

const buildRootRouteSchema = (projects) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE_NAME} Project Portfolio`,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_ORIGIN}${buildProjectPath(project.id)}`,
    name: project.title,
  })),
});

const buildRouteHtml = (template, meta, routeSchema) => {
  const canonicalUrl = `${SITE_ORIGIN}${meta.canonicalPath}`;
  const socialImageUrl = buildAbsoluteUrl(meta.socialImagePath);

  let html = template;
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
    "title",
  );
  html = replaceMetaTag(html, "name", "description", meta.description);
  html = replaceMetaTag(html, "name", "robots", meta.robots);
  html = replaceLinkHref(html, "canonical", canonicalUrl);
  html = replaceMetaTag(html, "property", "og:type", meta.ogType);
  html = replaceMetaTag(html, "property", "og:title", meta.title);
  html = replaceMetaTag(html, "property", "og:description", meta.description);
  html = replaceMetaTag(html, "property", "og:url", canonicalUrl);
  html = replaceMetaTag(html, "property", "og:image", socialImageUrl);
  html = replaceMetaTag(html, "property", "og:image:secure_url", socialImageUrl);
  html = replaceMetaTag(html, "property", "og:image:type", getImageMimeType(meta.socialImagePath));
  html = replaceMetaTag(html, "property", "og:image:width", "1200");
  html = replaceMetaTag(html, "property", "og:image:height", "630");
  html = replaceMetaTag(html, "property", "og:image:alt", meta.socialImageAlt);
  html = replaceMetaTag(html, "name", "twitter:card", "summary_large_image");
  html = replaceMetaTag(html, "name", "twitter:title", meta.title);
  html = replaceMetaTag(html, "name", "twitter:description", meta.description);
  html = replaceMetaTag(html, "name", "twitter:image", socialImageUrl);
  html = replaceMetaTag(html, "name", "twitter:image:alt", meta.socialImageAlt);
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  const jsonLdScripts = [buildPersonSchema(), buildWebsiteSchema(), routeSchema]
    .filter(Boolean)
    .map(
      (payload) =>
        `    <script type="application/ld+json">${JSON.stringify(payload)}</script>`,
    )
    .join("\n");

  html = replaceTag(
    html,
    /(\s*<script type="module" crossorigin src="\/assets\/[^"]+"><\/script>)/,
    `\n${jsonLdScripts}\n$1`,
    "module script tag",
  );

  return `${html.trim()}\n`;
};

const loadProjects = async () => {
  const source = readFileSync(projectsSourcePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  const imported = await import(moduleUrl);
  return imported.projects;
};

const writeRoutePage = (relativeDir, html) => {
  const outputDir = resolve(distDir, relativeDir);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(resolve(outputDir, "index.html"), html, "utf8");
};

const main = async () => {
  const template = readFileSync(distIndexPath, "utf8");
  const projects = await loadProjects();

  const rootHtml = buildRouteHtml(
    template,
    {
      title: `${SITE_NAME} | Design Engineer, Product & UI/UX`,
      description: SITE_DESCRIPTION,
      canonicalPath: "/",
      ogType: "website",
      robots: INDEXABLE_ROBOTS,
      socialImagePath: DEFAULT_SOCIAL_IMAGE_PATH,
      socialImageAlt: "Lex Ferguson portfolio share image with logo and wordmark.",
    },
    buildRootRouteSchema(projects),
  );
  writeFileSync(distIndexPath, rootHtml, "utf8");

  writeRoutePage(
    "about",
    buildRouteHtml(
      template,
      {
        title: `About | ${SITE_NAME}`,
        description: ABOUT_INTRO,
        canonicalPath: "/about",
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: ABOUT_SOCIAL_IMAGE_PATH,
        socialImageAlt: "About page share image for Lex Ferguson.",
      },
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: `${SITE_NAME} About`,
        url: `${SITE_ORIGIN}/about`,
        description: ABOUT_INTRO,
        mainEntity: {
          "@type": "Person",
          name: SITE_NAME,
          jobTitle: "Design Engineer",
          sameAs: [SITE_LINKEDIN, SITE_GITHUB],
        },
      },
    ),
  );

  writeRoutePage(
    "resume",
    buildRouteHtml(
      template,
      {
        title: `Resume | ${SITE_NAME}`,
        description: `Resume and experience overview for ${SITE_NAME} across design engineering, product, branding, and digital work.`,
        canonicalPath: "/resume",
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: RESUME_SOCIAL_IMAGE_PATH,
        socialImageAlt: "Resume page share image for Lex Ferguson.",
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: `${SITE_NAME} Resume`,
        url: `${SITE_ORIGIN}/resume`,
        mainEntity: {
          "@type": "Person",
          name: SITE_NAME,
          jobTitle: "Creative Technologist",
        },
      },
    ),
  );

  for (const project of projects) {
    writeRoutePage(
      `projects/${project.id}`,
      buildRouteHtml(
        template,
        {
          title: `${project.title} | ${SITE_NAME}`,
          description: project.summary,
          canonicalPath: buildProjectPath(project.id),
          ogType: "article",
          robots: INDEXABLE_ROBOTS,
          socialImagePath: PROJECT_SOCIAL_IMAGE_PATH,
          socialImageAlt: `${project.title} project preview for the Lex Ferguson portfolio.`,
        },
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `${SITE_ORIGIN}${buildProjectPath(project.id)}`,
          datePublished: `${project.year}-01-01`,
          author: {
            "@type": "Person",
            name: SITE_NAME,
            url: SITE_ORIGIN,
          },
          keywords: project.tags.join(", "),
        },
      ),
    );
  }

  console.log(`Generated route HTML:
- ${resolve(distDir, "about/index.html")}
- ${resolve(distDir, "resume/index.html")}
- ${resolve(distDir, "projects")}/*/index.html`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
