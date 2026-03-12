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
const experienceSourcePath = resolve(rootDir, "src/content/experience.ts");
const siteSourcePath = resolve(rootDir, "src/content/site.ts");

const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_SOCIAL_IMAGE_PATH = "/og-default.jpg";
const ABOUT_SOCIAL_IMAGE_PATH = "/about.jpg";
const RESUME_SOCIAL_IMAGE_PATH = "/resume.jpg";
const PROJECT_SOCIAL_IMAGE_PATH = "/project.jpg";
const VERITY_PROTECT_APP_STORE_URL = "https://apps.apple.com/us/app/verity-protect/id6759526773";

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

const buildProjectPath = (id) => `/projects/${id}`;

const buildAbsoluteUrl = (origin, path) => {
  if (/^https?:\/\//.test(path)) return path;
  return `${origin}${path}`;
};

const getImageMimeType = (path) => {
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
};

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

const renderProjectTags = (tags) => tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("");

const renderProjectLine = (project) => `\
<li class="project-line">
  <div>
    <a href="${escapeAttribute(buildProjectPath(project.id))}" class="project-line-title">${escapeHtml(project.title)}</a>
    <span class="project-line-summary"> - ${escapeHtml(project.summary)}</span>
  </div>
  <div class="project-line-meta">
    <span class="project-year">${escapeHtml(project.year)}</span>
    ${renderProjectTags(project.tags.slice(0, 2))}
  </div>
</li>`;

const renderExperienceLine = (item, projectsById) => {
  const relatedProjects = (item.relatedProjectIds || [])
    .map((id) => projectsById.get(id))
    .filter(Boolean);
  const relatedLinks = item.relatedLinks || [];

  return `\
<li class="experience-line">
  <p class="experience-period">${escapeHtml(item.period)}</p>
  <p class="experience-role">${escapeHtml(item.role)} <span class="experience-at">@ ${escapeHtml(item.company)}</span></p>
  <p class="experience-summary">${escapeHtml(item.summary)}</p>
  <ul class="experience-highlights">
    ${item.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}
  </ul>
  <div class="experience-meta">
    <div class="experience-tags">
      ${item.tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
    ${
      relatedProjects.length || relatedLinks.length
        ? `\
    <div class="experience-links">
      <span>Related:</span>
      ${relatedProjects
        .map(
          (project) =>
            `<a href="${escapeAttribute(buildProjectPath(project.id))}" class="experience-link">${escapeHtml(project.title)}</a>`,
        )
        .join("")}
      ${relatedLinks
        .map(
          (link) =>
            `<a href="${escapeAttribute(link.url)}" class="experience-link">${escapeHtml(link.label)}</a>`,
        )
        .join("")}
    </div>`
        : ""
    }
  </div>
</li>`;
};

const renderListSection = (title, items) => `\
<section class="about-section">
  <article>
    <h2 class="project-more-title">${escapeHtml(title)}</h2>
    <hr />
    <ol class="process-lines">
      ${items
        .map(
          (item) => `\
<li class="process-line">
  <p class="process-head">
    <span class="process-index">${escapeHtml(item.index)}</span>
    <span class="process-title">${
      item.url
        ? `<a href="${escapeAttribute(item.url)}" class="process-title-link">${escapeHtml(item.title)}</a>`
        : escapeHtml(item.title)
    }</span>
  </p>
  <p class="process-text">${escapeHtml(item.detail)}</p>
</li>`,
        )
        .join("")}
    </ol>
  </article>
</section>`;

const renderProcessSection = (siteProfile, processSteps) => `\
<section>
  <h2>My Process</h2>
  <hr />
  <p class="process-intro">${escapeHtml(siteProfile.processIntro)}</p>
  <ol class="process-lines">
    ${processSteps
      .map(
        (step) => `\
<li class="process-line">
  <p class="process-head">
    <span class="process-index">${escapeHtml(step.index)}</span>
    <span class="process-title">${escapeHtml(step.title)}</span>
  </p>
  <p class="process-text">${escapeHtml(step.detail)}</p>
  <p class="process-more-text">${escapeHtml(step.expanded)}</p>
</li>`,
      )
      .join("")}
  </ol>
  <p class="process-tools">${escapeHtml(siteProfile.processTools)}</p>
</section>`;

const renderProjectLinks = (project) => {
  if (!project.links.length) return "<p>No public external links are attached to this project.</p>";

  return `\
<ul class="project-lines">
  ${project.links
    .map(
      (link) => `\
<li class="project-line">
  <div>
    <a href="${escapeAttribute(link.url)}" class="project-line-title">${escapeHtml(link.label)}</a>
    <span class="project-line-summary"> - ${escapeHtml(link.url)}</span>
  </div>
</li>`,
    )
    .join("")}
</ul>`;
};

const renderMediaIndex = (origin, project) => `\
<ol class="process-lines">
  ${project.media
    .map(
      (media, index) => `\
<li class="process-line">
  <p class="process-head">
    <span class="process-index">${String(index + 1).padStart(2, "0")}</span>
    <span class="process-title">${escapeHtml(media.type === "video" ? "Video" : "Image")}</span>
  </p>
  <p class="process-text">${escapeHtml(media.alt)}</p>
  <p class="process-text"><a href="${escapeAttribute(buildAbsoluteUrl(origin, media.src))}">${escapeHtml(buildAbsoluteUrl(origin, media.src))}</a></p>
</li>`,
    )
    .join("")}
</ol>`;

const renderHomeMarkup = ({
  siteProfile,
  projects,
  experienceItems,
  processSteps,
}) => {
  const shortlist = projects.filter((project) => project.tier === "shortlist").slice(0, 3);
  const archive = projects
    .filter((project) => project.tier === "archive")
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  const timeline = experienceItems
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const aPresent = /present/i.test(a.item.period);
      const bPresent = /present/i.test(b.item.period);
      if (a.item.startYear !== b.item.startYear) return b.item.startYear - a.item.startYear;
      if (aPresent !== bPresent) return Number(bPresent) - Number(aPresent);
      return a.index - b.index;
    })
    .map(({ item }) => item);
  const projectsById = new Map(projects.map((project) => [project.id, project]));

  return `\
<main class="cube-content" data-static-route="home">
  <header>
    <p class="project-detail-year">Portfolio</p>
    <h1>${escapeHtml(siteProfile.name)}</h1>
    <p>${escapeHtml(siteProfile.heroSummary)}</p>
    <p>${escapeHtml(siteProfile.aboutDescription)}</p>
    <ul>
      <li><a href="mailto:${escapeAttribute(siteProfile.email)}">${escapeHtml(siteProfile.email)}</a></li>
      <li><a href="${escapeAttribute(siteProfile.linkedinUrl)}">${escapeHtml(siteProfile.linkedinUrl.replace(/^https?:\/\//, ""))}</a></li>
      <li><a href="${escapeAttribute(siteProfile.githubUrl)}">${escapeHtml(siteProfile.githubUrl.replace(/^https?:\/\//, ""))}</a></li>
      <li><a href="/about">About</a> · <a href="/resume">Resume</a> · <a href="/llms.txt">LLM Summary</a></li>
    </ul>
  </header>

  <section>
    <h2>Project Shortlist</h2>
    <hr />
    <ul class="project-lines">
      ${shortlist.map(renderProjectLine).join("")}
    </ul>
  </section>

  <section>
    <h2>Archive</h2>
    <hr />
    <ul class="project-lines">
      ${archive.map(renderProjectLine).join("")}
    </ul>
  </section>

  <section>
    <h2>Experience Log</h2>
    <hr />
    <ul class="experience-lines">
      ${timeline.map((item) => renderExperienceLine(item, projectsById)).join("")}
    </ul>
  </section>

  ${renderProcessSection(siteProfile, processSteps)}

  <section>
    <h2>Contact</h2>
    <hr />
    <p>${escapeHtml(siteProfile.contactIntro)}</p>
    <p>Email: <a href="mailto:${escapeAttribute(siteProfile.email)}">${escapeHtml(siteProfile.email)}</a></p>
  </section>
</main>`;
};

const renderAboutMarkup = ({
  siteProfile,
  aboutIntro,
  aboutNarrative,
  aboutEducation,
  aboutNotableAchievements,
  aboutFocusAreas,
}) => `\
<main class="project-detail-main about-main" data-static-route="about">
  <div class="project-detail-nav">
    <a href="/" class="project-nav-link">Back to Home</a>
  </div>

  <section class="project-detail-head">
    <div>
      <p class="project-detail-year">About</p>
      <h1 class="project-detail-title">${escapeHtml(siteProfile.name)}</h1>
    </div>
    <div class="project-detail-links">
      <a href="/resume">Resume</a>
      <a href="${escapeAttribute(siteProfile.linkedinUrl)}">LinkedIn</a>
      <a href="${escapeAttribute(siteProfile.githubUrl)}">GitHub</a>
    </div>
  </section>

  <section class="about-copy">
    <p>${escapeHtml(aboutIntro)}</p>
    <p>${escapeHtml(aboutNarrative)}</p>
    <p>
      Current public work highlights include
      <a href="/projects/pgc-website">PGC Website</a>,
      <a href="/projects/pgc-app">PGC App</a>, and
      <a href="/projects/verity-protect">Verity Protect</a>.
      Verity Protect also has a public <a href="${escapeAttribute(VERITY_PROTECT_APP_STORE_URL)}">App Store listing</a>.
    </p>
  </section>

  ${renderListSection("Education", aboutEducation)}
  ${renderListSection("Notable Achievements", aboutNotableAchievements)}
  ${renderListSection("Focus Areas", aboutFocusAreas)}
</main>`;

const renderResumeMarkup = ({ siteProfile, experienceItems, projects }) => {
  const projectsById = new Map(projects.map((project) => [project.id, project]));

  return `\
<main class="project-detail-main resume-main" data-static-route="resume">
  <div class="project-detail-nav">
    <a href="/" class="project-nav-link">Back to Home</a>
  </div>

  <section class="project-detail-head">
    <div>
      <p class="project-detail-year">Resume</p>
      <h1 class="project-detail-title">${escapeHtml(siteProfile.name)}</h1>
    </div>
    <div class="project-detail-links">
      <a href="${escapeAttribute(siteProfile.resumePath)}">Open PDF</a>
      <a href="${escapeAttribute(siteProfile.resumePath)}" download>Download</a>
    </div>
  </section>

  <section class="about-copy">
    <p>${escapeHtml(siteProfile.resumeDescription)}</p>
    <p>${escapeHtml(siteProfile.contactIntro)}</p>
    <p>Email: <a href="mailto:${escapeAttribute(siteProfile.email)}">${escapeHtml(siteProfile.email)}</a></p>
  </section>

  <section>
    <h2>Experience Summary</h2>
    <hr />
    <ul class="experience-lines">
      ${experienceItems.map((item) => renderExperienceLine(item, projectsById)).join("")}
    </ul>
  </section>
</main>`;
};

const renderProjectMarkup = ({ origin, siteProfile, project, projects }) => {
  const moreProjects = projects
    .filter((candidate) => candidate.id !== project.id)
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
    .slice(0, 3);

  return `\
<main class="project-detail-main" data-static-route="project">
  <div class="project-detail-nav">
    <a href="/" class="project-nav-link">Back to Projects</a>
  </div>

  <section class="project-detail-head">
    <div>
      <p class="project-detail-year">${escapeHtml(project.year)}</p>
      <h1 class="project-detail-title">${escapeHtml(project.title)}</h1>
    </div>
    <div class="project-detail-links">
      <a href="/about">About ${escapeHtml(siteProfile.name)}</a>
      <a href="/resume">Resume</a>
    </div>
  </section>

  <section class="project-detail-copy">
    <p>${escapeHtml(project.summary)}</p>
    <p>${escapeHtml(project.description)}</p>
    <div class="project-tag-row">
      ${project.tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
    ${
      project.tools?.length
        ? `<p class="project-tools-line"><span class="project-tools-label">Tools:</span> ${escapeHtml(project.tools.join(", "))}</p>`
        : ""
    }
  </section>

  <section class="about-section">
    <article>
      <h2 class="project-more-title">External Links</h2>
      <hr />
      ${renderProjectLinks(project)}
    </article>
  </section>

  <section class="about-section">
    <article>
      <h2 class="project-more-title">Media Index</h2>
      <hr />
      ${renderMediaIndex(origin, project)}
    </article>
  </section>

  <section class="project-more" id="more-projects">
    <h2 class="project-more-title">More Projects</h2>
    <hr />
    <ul class="project-lines">
      ${moreProjects.map(renderProjectLine).join("")}
    </ul>
  </section>
</main>`;
};

const buildPersonEntity = ({ origin, siteProfile, aboutIntro, aboutNarrative, siteKnowledgeAreas, experienceItems }) => ({
  "@type": "Person",
  name: siteProfile.name,
  url: origin,
  jobTitle: siteProfile.jobTitle,
  description: `${siteProfile.aboutDescription} ${aboutNarrative}`,
  email: `mailto:${siteProfile.email}`,
  image: buildAbsoluteUrl(origin, DEFAULT_SOCIAL_IMAGE_PATH),
  sameAs: [siteProfile.linkedinUrl, siteProfile.githubUrl],
  knowsAbout: [...siteKnowledgeAreas],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Monmouth University",
  },
  worksFor: {
    "@type": "Organization",
    name: experienceItems[0]?.company || "Packanack Golf Club",
  },
  hasOccupation: experienceItems.map((item) => ({
    "@type": "Occupation",
    name: item.role,
    occupationLocation: {
      "@type": "AdministrativeArea",
      name: item.company,
    },
    description: item.summary,
  })),
  about: aboutIntro,
});

const buildPersonSchema = (payload) => ({
  "@context": "https://schema.org",
  ...buildPersonEntity(payload),
});

const buildWebsiteSchema = (origin, siteProfile) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteProfile.name} Portfolio`,
  url: origin,
  inLanguage: "en-US",
});

const buildRootRouteSchema = (origin, siteProfile, projects) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${siteProfile.name} Portfolio`,
  url: origin,
  description: siteProfile.description,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${origin}${buildProjectPath(project.id)}`,
      name: project.title,
      description: project.summary,
    })),
  },
});

const buildRouteHtml = (template, meta, routeSchemas, bodyMarkup, siteProfile) => {
  const canonicalUrl = `${siteProfile.origin}${meta.canonicalPath}`;
  const socialImageUrl = buildAbsoluteUrl(siteProfile.origin, meta.socialImagePath);

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
  html = replaceTag(
    html,
    /<div id="root"><\/div>/,
    `<div id="root">${bodyMarkup}</div>`,
    "root container",
  );

  const jsonLdScripts = routeSchemas
    .filter(Boolean)
    .map((payload) => `    <script type="application/ld+json">${JSON.stringify(payload)}</script>`)
    .join("\n");

  html = replaceTag(
    html,
    /(\s*<script type="module" crossorigin src="\/assets\/[^"]+"><\/script>)/,
    `\n    <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM summary" />\n    <link rel="alternate" type="application/json" href="/routes.json" title="Route index" />\n${jsonLdScripts}\n$1`,
    "module script tag",
  );

  return `${html.trim()}\n`;
};

const writeRoutePage = (relativeDir, html) => {
  const outputDir = resolve(distDir, relativeDir);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(resolve(outputDir, "index.html"), html, "utf8");
};

const main = async () => {
  const template = readFileSync(distIndexPath, "utf8");
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
    processSteps,
    siteKnowledgeAreas,
    siteProfile,
  } = siteModule;

  const schemaPayload = {
    origin: siteProfile.origin,
    siteProfile,
    aboutIntro,
    aboutNarrative,
    siteKnowledgeAreas,
    experienceItems,
  };

  const sharedSchemas = [buildPersonSchema(schemaPayload), buildWebsiteSchema(siteProfile.origin, siteProfile)];

  const rootHtml = buildRouteHtml(
    template,
    {
      title: `${siteProfile.name} | Design Engineer, Product & UI/UX`,
      description: siteProfile.description,
      canonicalPath: "/",
      ogType: "website",
      robots: INDEXABLE_ROBOTS,
      socialImagePath: DEFAULT_SOCIAL_IMAGE_PATH,
      socialImageAlt: "Lex Ferguson portfolio share image with logo and wordmark.",
    },
    [...sharedSchemas, buildRootRouteSchema(siteProfile.origin, siteProfile, projects)],
    renderHomeMarkup({ siteProfile, projects, experienceItems, processSteps }),
    siteProfile,
  );
  writeFileSync(distIndexPath, rootHtml, "utf8");

  writeRoutePage(
    "about",
    buildRouteHtml(
      template,
      {
        title: `About | ${siteProfile.name}`,
        description: siteProfile.aboutDescription,
        canonicalPath: "/about",
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: ABOUT_SOCIAL_IMAGE_PATH,
        socialImageAlt: "About page share image for Lex Ferguson.",
      },
      [
        ...sharedSchemas,
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `${siteProfile.name} About`,
          url: `${siteProfile.origin}/about`,
          description: siteProfile.aboutDescription,
          mainEntity: buildPersonEntity(schemaPayload),
        },
      ],
      renderAboutMarkup({
        siteProfile,
        aboutIntro,
        aboutNarrative,
        aboutEducation,
        aboutNotableAchievements,
        aboutFocusAreas,
      }),
      siteProfile,
    ),
  );

  writeRoutePage(
    "resume",
    buildRouteHtml(
      template,
      {
        title: `Resume | ${siteProfile.name}`,
        description: siteProfile.resumeDescription,
        canonicalPath: "/resume",
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: RESUME_SOCIAL_IMAGE_PATH,
        socialImageAlt: "Resume page share image for Lex Ferguson.",
      },
      [
        ...sharedSchemas,
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: `${siteProfile.name} Resume`,
          url: `${siteProfile.origin}/resume`,
          description: siteProfile.resumeDescription,
          mainEntity: buildPersonEntity(schemaPayload),
        },
      ],
      renderResumeMarkup({ siteProfile, experienceItems, projects }),
      siteProfile,
    ),
  );

  for (const project of projects) {
    writeRoutePage(
      `projects/${project.id}`,
      buildRouteHtml(
        template,
        {
          title: `${project.title} | ${siteProfile.name}`,
          description: project.summary,
          canonicalPath: buildProjectPath(project.id),
          ogType: "article",
          robots: INDEXABLE_ROBOTS,
          socialImagePath: PROJECT_SOCIAL_IMAGE_PATH,
          socialImageAlt: `${project.title} project preview for the Lex Ferguson portfolio.`,
        },
        [
          ...sharedSchemas,
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            abstract: project.summary,
            url: `${siteProfile.origin}${buildProjectPath(project.id)}`,
            datePublished: `${project.year}-01-01`,
            creator: {
              "@type": "Person",
              name: siteProfile.name,
              url: siteProfile.origin,
            },
            image:
              project.media.find((media) => media.type === "image")?.src
                ? buildAbsoluteUrl(
                    siteProfile.origin,
                    project.media.find((media) => media.type === "image").src,
                  )
                : buildAbsoluteUrl(siteProfile.origin, PROJECT_SOCIAL_IMAGE_PATH),
            keywords: project.tags.join(", "),
          },
        ],
        renderProjectMarkup({
          origin: siteProfile.origin,
          siteProfile,
          project,
          projects,
        }),
        siteProfile,
      ),
    );
  }

  console.log(`Generated route HTML:
- ${resolve(distDir, "index.html")}
- ${resolve(distDir, "about/index.html")}
- ${resolve(distDir, "resume/index.html")}
- ${resolve(distDir, "projects")}/*/index.html`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
