import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type ChangeEvent as ReactChangeEvent,
  type FormEvent as ReactFormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import posthog from "posthog-js";
import {
  aboutEducation,
  aboutFocusAreas,
  aboutIntro,
  aboutNotableAchievements,
  processSteps,
  siteProfile,
} from "./content/site";
import { experienceItems } from "./content/experience";
import { projects } from "./content/projects";
import {
  buildProjectsPath,
  normalizeProjectGroupId,
  projectMatchesGroup,
  PROJECT_GROUPS,
  type ProjectGroupId,
} from "./content/project-taxonomy";
import type { ExperienceItem, Project, ProjectMedia } from "./types";

type RouteState =
  | { page: "home" }
  | { page: "projects" }
  | { page: "project"; id: string }
  | { page: "about" }
  | { page: "resume" }
  | { page: "cv" }
  | { page: "not-found"; path: string };
type ContactSubmitStatus = "idle" | "sending" | "success" | "error";
type ContactFormState = {
  name: string;
  email: string;
  message: string;
};
type ContactRateWindow = {
  windowStartedAt: number;
  count: number;
};
type ProjectOpenSource = "about" | "archive" | "direct" | "experience" | "more_projects" | "projects_index" | "shortlist";
type ProjectNavigationContext = {
  source: ProjectOpenSource;
  groupId?: ProjectGroupId;
};
type SocialLinkType = "email" | "github" | "linkedin";
type SocialLinkLocation = "about" | "footer" | "hero";
type AnalyticsProperty = string | number | boolean | null | undefined;

const FORM_ENDPOINT = "https://formsubmit.co/ajax/afergyy@gmail.com";
const RESUME_PATH = siteProfile.resumePath;
const CV_PATH = siteProfile.cvPath;
const SITE_ORIGIN = siteProfile.origin;
const SITE_NAME = siteProfile.name;
const SITE_DESCRIPTION = siteProfile.description;
const SITE_LINKEDIN = siteProfile.linkedinUrl;
const SITE_GITHUB = siteProfile.githubUrl;
const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_SOCIAL_IMAGE_PATH = "/og-default.jpg";
const ABOUT_SOCIAL_IMAGE_PATH = "/about.jpg";
const RESUME_SOCIAL_IMAGE_PATH = "/resume.jpg";
const CV_SOCIAL_IMAGE_PATH = "/resume.jpg";
const CV_SOCIAL_IMAGE_ALT = "Cover letter page share image for Lex Ferguson.";
const CV_DESCRIPTION = siteProfile.cvDescription;
const PROJECT_SOCIAL_IMAGE_PATH = "/project.jpg";
const FALLBACK_SOCIAL_IMAGE_ALT = "Lex Ferguson portfolio";
const VERITY_PROTECT_APP_STORE_URL = "https://apps.apple.com/us/app/verity-protect/id6759526773";
const PROJECTS_INDEX_DESCRIPTION =
  "A curated index of selected and archive design projects.";
const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RATE_MAX_SUBMISSIONS = 4;
const CONTACT_RATE_STORAGE_KEY = "port26_contact_rate_v1";
const ALL_PROJECTS = [...projects].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeSearchTokens = (value: string) => normalizeSearchText(value).split(" ").filter(Boolean);

const splitSearchWords = (value: string) => normalizeSearchText(value).split(/\s+/).filter(Boolean);

const isSubsequence = (needle: string, haystack: string) => {
  if (!needle) return true;
  let index = 0;

  for (const char of haystack) {
    if (char === needle[index]) {
      index += 1;
      if (index === needle.length) return true;
    }
  }

  return false;
};

const buildSearchWords = (project: Project) => ({
  title: splitSearchWords(project.title),
  summary: splitSearchWords(project.summary),
  description: splitSearchWords(project.description),
  tags: project.tags.flatMap((tag) => splitSearchWords(tag)),
  year: [String(project.year)],
});

const matchTokenScore = (token: string, words: string[], wholeText: string) => {
  if (!token) return 0;
  if (words.includes(token)) return 20;
  if (words.some((word) => word.startsWith(token))) return 16;
  if (wholeText.includes(token)) return 12;
  if (token.length >= 5 && words.some((word) => isSubsequence(token, word))) return 8;
  return 0;
};

const scoreProjectSearch = (project: Project, query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 1;

  const tokens = normalizeSearchTokens(normalizedQuery);
  const { title, summary, description, tags, year } = buildSearchWords(project);
  const titleText = title.join(" ");
  const summaryText = summary.join(" ");
  const descriptionText = description.join(" ");
  const tagsText = tags.join(" ");

  let score = 0;

  for (const token of tokens) {
    const titleScore = matchTokenScore(token, title, titleText);
    const tagScore = matchTokenScore(token, tags, tagsText);
    const summaryScore = matchTokenScore(token, summary, summaryText);
    const descriptionScore = matchTokenScore(token, description, descriptionText);
    const yearScore = year.includes(token) ? 14 : 0;

    const tokenScore = Math.max(titleScore * 5, tagScore * 4, summaryScore * 3, descriptionScore * 2, yearScore);
    score += tokenScore;
  }

  if (normalizedQuery === project.title.toLowerCase()) score += 80;
  else if (project.title.toLowerCase().includes(normalizedQuery)) score += 45;

  if (project.tags.some((tag) => normalizeSearchText(tag) === normalizedQuery)) score += 35;
  if (String(project.year) === normalizedQuery) score += 50;

  if (tokens.length > 1) {
    const tokensMatched = tokens.every((token) => {
      const titleScore = matchTokenScore(token, title, titleText);
      const tagScore = matchTokenScore(token, tags, tagsText);
      const summaryScore = matchTokenScore(token, summary, summaryText);
      const descriptionScore = matchTokenScore(token, description, descriptionText);
      const yearScore = year.includes(token) ? 1 : 0;
      return titleScore || tagScore || summaryScore || descriptionScore || yearScore;
    });

    if (!tokensMatched) return 0;
    score += 24;
  }

  return score;
};

const readContactRateWindow = (now: number): ContactRateWindow => {
  if (typeof window === "undefined") return { windowStartedAt: now, count: 0 };

  try {
    const raw = window.localStorage.getItem(CONTACT_RATE_STORAGE_KEY);
    if (!raw) return { windowStartedAt: now, count: 0 };

    const parsed = JSON.parse(raw) as ContactRateWindow;
    if (
      !parsed ||
      typeof parsed.windowStartedAt !== "number" ||
      typeof parsed.count !== "number" ||
      parsed.windowStartedAt <= 0 ||
      parsed.count < 0
    ) {
      return { windowStartedAt: now, count: 0 };
    }

    if (now - parsed.windowStartedAt >= CONTACT_RATE_WINDOW_MS) {
      return { windowStartedAt: now, count: 0 };
    }

    return parsed;
  } catch {
    return { windowStartedAt: now, count: 0 };
  }
};

const writeContactRateWindow = (state: ContactRateWindow) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONTACT_RATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures and allow submits to continue.
  }
};

const formatCooldown = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  if (minutes === 0) return `${remainder}s`;
  if (remainder === 0) return `${minutes}m`;
  return `${minutes}m ${remainder}s`;
};

type ProcessStep = (typeof processSteps)[number];

const HOME_SHORTLIST = projects.filter((project) => project.tier === "shortlist").slice(0, 5);
const HOME_ARCHIVE = projects
  .filter((project) => project.tier === "archive")
  .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
const HOME_TIMELINE = experienceItems
  .map((item, index) => ({ item, index }))
  .sort((a, b) => {
    const aPresent = /present/i.test(a.item.period);
    const bPresent = /present/i.test(b.item.period);
    if (a.item.startYear !== b.item.startYear) return b.item.startYear - a.item.startYear;
    if (aPresent !== bPresent) return Number(bPresent) - Number(aPresent);
    return a.index - b.index;
  })
  .map(({ item }) => item);
const HOME_PROJECTS_BY_ID = new Map(projects.map((project) => [project.id, project]));

const parseRoute = (input: string): RouteState => {
  const url = new URL(input, SITE_ORIGIN);
  const cleanPath = url.pathname.replace(/\/+$/, "") || "/";
  if (cleanPath === "/") return { page: "home" };
  if (cleanPath === "/projects") return { page: "projects" };
  if (cleanPath === "/about") return { page: "about" };
  if (cleanPath === "/resume") return { page: "resume" };
  if (cleanPath === "/cv") return { page: "cv" };

  if (cleanPath.startsWith("/projects/")) {
    const id = decodeURIComponent(cleanPath.slice("/projects/".length));
    if (id) return { page: "project", id };
  }

  return { page: "not-found", path: cleanPath };
};

const buildProjectPath = (id: string) => `/projects/${id}`;
const buildAboutPath = () => "/about";
const buildResumePath = () => "/resume";
const buildCvPath = () => "/cv";
const buildProjectBackPath = (context: ProjectNavigationContext | null) =>
  context?.source === "projects_index" ? buildProjectsPath(context.groupId) : context ? "/" : buildProjectsPath();
const buildProjectBackLabel = (context: ProjectNavigationContext | null) =>
  context?.source === "projects_index" || !context
    ? "Back to Projects"
    : "Back to Home";


const isPrimaryClick = (event: ReactMouseEvent<HTMLAnchorElement>) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const captureAnalyticsEvent = (eventName: string, properties?: Record<string, AnalyticsProperty>) => {
  posthog.capture(eventName, properties);
};

const getMessageLengthBucket = (message: string) => {
  const trimmedLength = message.trim().length;
  if (trimmedLength < 80) return "short";
  if (trimmedLength < 240) return "medium";
  return "long";
};

const getUrlDomain = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

const InternalLink = ({
  to,
  onNavigate,
  onBeforeNavigate,
  className,
  ariaLabel,
  children,
}: {
  to: string;
  onNavigate: (to: string) => void;
  onBeforeNavigate?: () => void;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) => (
  <a
    href={to}
    className={className}
    aria-label={ariaLabel}
    onClick={(event) => {
      if (!isPrimaryClick(event)) return;
      event.preventDefault();
      onBeforeNavigate?.();
      onNavigate(to);
    }}
  >
    {children}
  </a>
);

type HeadMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: "website" | "article";
  robots: string;
  socialImagePath: string;
  socialImageAlt: string;
};

const buildAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_ORIGIN}${path}`;
};

type GalleryMediaStatus = "loading" | "loaded" | "error";
type ShareActionStatus = "idle" | "copied" | "error";

const hashString = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const getImageMimeType = (path: string) => {
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
};

const getProjectSocialImage = (project: Project | undefined) => {
  if (!project) return { path: PROJECT_SOCIAL_IMAGE_PATH, alt: FALLBACK_SOCIAL_IMAGE_ALT };
  const firstImage = project.media.find((media) => media.type === "image");
  if (firstImage) return { path: firstImage.src, alt: firstImage.alt };
  return { path: PROJECT_SOCIAL_IMAGE_PATH, alt: `${project.title} preview for the Lex Ferguson portfolio.` };
};

const HeroLogo = () => (
  <svg
    className="hero-logo"
    width="122"
    height="73"
    viewBox="0 0 122 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M122 72.9999L21.5195 72.7625L51.8161 42.586L60.3561 51.1304H69.9467L56.6284 37.8053L72.0817 22.4119L122 72.9999Z"
      fill="currentColor"
    />
    <path
      d="M10.5056 72.2541H0L72.9289 0L114.511 41.3994H102.853L72.8611 11.5959L10.5056 72.2541Z"
      fill="currentColor"
    />
  </svg>
);

const upsertMetaTag = (attr: "name" | "property", key: string, content: string) => {
  const selector = `meta[${attr}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
};

const setHeadMetadata = (meta: HeadMeta) => {
  document.title = meta.title;

  const canonicalHref = `${SITE_ORIGIN}${meta.canonicalPath}`;
  const socialImageHref = buildAbsoluteUrl(meta.socialImagePath);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalHref;

  upsertMetaTag("name", "description", meta.description);
  upsertMetaTag("name", "robots", meta.robots);
  upsertMetaTag("property", "og:type", meta.ogType);
  upsertMetaTag("property", "og:title", meta.title);
  upsertMetaTag("property", "og:description", meta.description);
  upsertMetaTag("property", "og:url", canonicalHref);
  upsertMetaTag("property", "og:site_name", SITE_NAME);
  upsertMetaTag("property", "og:locale", "en_US");
  upsertMetaTag("property", "og:image", socialImageHref);
  upsertMetaTag("property", "og:image:secure_url", socialImageHref);
  upsertMetaTag("property", "og:image:type", getImageMimeType(meta.socialImagePath));
  upsertMetaTag("property", "og:image:width", "1200");
  upsertMetaTag("property", "og:image:height", "630");
  upsertMetaTag("property", "og:image:alt", meta.socialImageAlt);
  upsertMetaTag("name", "twitter:card", "summary_large_image");
  upsertMetaTag("name", "twitter:title", meta.title);
  upsertMetaTag("name", "twitter:description", meta.description);
  upsertMetaTag("name", "twitter:image", socialImageHref);
  upsertMetaTag("name", "twitter:image:alt", meta.socialImageAlt);
};

const upsertJsonLd = (id: string, payload: unknown) => {
  const scriptId = `jsonld-${id}`;
  let tag = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!tag) {
    tag = document.createElement("script");
    tag.id = scriptId;
    tag.type = "application/ld+json";
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(payload);
};

const removeJsonLd = (id: string) => {
  const tag = document.getElementById(`jsonld-${id}`);
  tag?.remove();
};

const createGalleryMediaStatus = (media: ProjectMedia[]) => media.map(() => "loading" as GalleryMediaStatus);

const ProjectShareButton = ({ project }: { project: Project }) => {
  const resetTimeoutRef = useRef<number | null>(null);
  const [status, setStatus] = useState<ShareActionStatus>("idle");
  const projectUrl = buildAbsoluteUrl(buildProjectPath(project.id));

  const scheduleReset = useCallback(() => {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setStatus("idle");
    }, 1800);
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: `${project.title} | ${SITE_NAME}`,
      text: project.summary,
      url: projectUrl,
    };

    const canUseNativeShare =
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      (typeof navigator.canShare !== "function" || navigator.canShare({ url: projectUrl }));

    if (canUseNativeShare) {
      try {
        await navigator.share(shareData);
        captureAnalyticsEvent("project_shared", {
          project_id: project.id,
          project_title: project.title,
          method: "native_share",
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(projectUrl);
      captureAnalyticsEvent("project_shared", {
        project_id: project.id,
        project_title: project.title,
        method: "clipboard",
      });
      setStatus("copied");
      scheduleReset();
    } catch {
      captureAnalyticsEvent("project_shared", {
        project_id: project.id,
        project_title: project.title,
        method: "error",
      });
      setStatus("error");
      scheduleReset();
    }
  }, [project.id, project.summary, project.title, projectUrl, scheduleReset]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <button type="button" className="project-detail-share" onClick={handleShare}>
      {status === "copied" ? "Copied" : status === "error" ? "Copy failed" : "Share"}
    </button>
  );
};

const ProjectLine = ({
  project,
  navigationContext,
  onNavigate,
  onProjectNavigation,
}: {
  project: Project;
  navigationContext: ProjectNavigationContext;
  onNavigate: (to: string) => void;
  onProjectNavigation: (context: ProjectNavigationContext) => void;
}) => (
  <li className="project-line" key={project.id}>
    <div>
      <InternalLink
        to={buildProjectPath(project.id)}
        onNavigate={onNavigate}
        onBeforeNavigate={() => onProjectNavigation(navigationContext)}
        className="project-line-title"
      >
        {project.title}
      </InternalLink>
      <span className="project-line-summary"> - {project.summary}</span>
    </div>
    <div className="project-line-meta">
      <span className="project-year">{project.year}</span>
      {project.tags.slice(0, 2).map((tag) => (
        <span className="project-tag" key={`${project.id}-${tag}`}>
          {tag}
        </span>
      ))}
    </div>
  </li>
);

const SectionHeading = ({
  title,
  count,
  href,
  linkLabel,
  onNavigate,
}: {
  title: string;
  count?: string;
  href: string;
  linkLabel: string;
  onNavigate: (to: string) => void;
}) => (
  <div className="section-heading-row">
    <h2>
      <span>{title}</span>
      {count ? <span className="section-heading-count">{count}</span> : null}
    </h2>
    <InternalLink to={href} onNavigate={onNavigate} className="section-heading-link">
      {linkLabel}
    </InternalLink>
  </div>
);

const ExperienceLine = ({
  item,
  projectsById,
  onNavigate,
  onProjectNavigation,
}: {
  item: ExperienceItem;
  projectsById: Map<string, Project>;
  onNavigate: (to: string) => void;
  onProjectNavigation: (context: ProjectNavigationContext) => void;
}) => {
  const relatedProjects = (item.relatedProjectIds || [])
    .map((id) => projectsById.get(id))
    .filter((project): project is Project => Boolean(project));
  const relatedLinks = item.relatedLinks || [];
  const hasRelatedLinks = relatedProjects.length > 0 || relatedLinks.length > 0;

  return (
    <li className="experience-line">
      <p className="experience-period">{item.period}</p>
      <p className="experience-role">
        {item.role} <span className="experience-at">@ {item.company}</span>
      </p>
      <p className="experience-summary">{item.summary}</p>
      <ul className="experience-highlights">
        {item.highlights.map((highlight) => (
          <li key={`${item.id}-${highlight}`}>{highlight}</li>
        ))}
      </ul>
      <div className="experience-meta">
        <div className="experience-tags">
          {item.tags.map((tag) => (
            <span className="project-tag" key={`${item.id}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>

        {hasRelatedLinks ? (
          <div className="experience-links">
            <span>Related:</span>
            {relatedProjects.map((project) => (
              <InternalLink
                key={`${item.id}-${project.id}`}
                to={buildProjectPath(project.id)}
                onNavigate={onNavigate}
                onBeforeNavigate={() => onProjectNavigation({ source: "experience" })}
                className="experience-link"
              >
                {project.title}
              </InternalLink>
            ))}
            {relatedLinks.map((link) => (
              <a
                key={`${item.id}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="experience-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
};

const ContactForm = ({
  form,
  status,
  errorMessage,
  cooldownSeconds,
  onFieldChange,
  onSubmit,
}: {
  form: ContactFormState;
  status: ContactSubmitStatus;
  errorMessage: string;
  cooldownSeconds: number;
  onFieldChange: (field: keyof ContactFormState, value: string) => void;
  onSubmit: (event: ReactFormEvent<HTMLFormElement>) => void;
}) => {
  const handleChange = (event: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    onFieldChange(name as keyof ContactFormState, value);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <p className="contact-intro">{siteProfile.contactIntro}</p>

      <input
        className="contact-honeypot"
        type="text"
        name="_honey"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="contact-grid">
        <label className="contact-label">
          Name
          <input
            className="contact-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            required
            disabled={status === "sending"}
          />
        </label>

        <label className="contact-label">
          Email
          <input
            className="contact-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={status === "sending"}
          />
        </label>
      </div>

      <label className="contact-label">
        Message
        <textarea
          className="contact-textarea"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project."
          rows={6}
          required
          disabled={status === "sending"}
        />
      </label>

      <div className="contact-actions">
        <p
          className={`contact-status${status === "error" && cooldownSeconds === 0 ? " is-error" : ""}`}
          aria-live="polite"
        >
          {cooldownSeconds > 0 ? `Please wait ${formatCooldown(cooldownSeconds)} before sending again.` : null}
          {cooldownSeconds === 0 && status === "success" ? "Message sent. I will reply soon." : null}
          {cooldownSeconds === 0 && status === "error" ? errorMessage || "Could not send message right now." : null}
        </p>
        <button className="contact-submit" type="submit" disabled={status === "sending" || cooldownSeconds > 0}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

const HomeProcessLine = ({
  step,
  isExpanded,
  contentId,
  onToggle,
}: {
  step: ProcessStep;
  isExpanded: boolean;
  contentId: string;
  onToggle: () => void;
}) => (
  <li className={`process-line process-line--expandable${isExpanded ? " is-open" : ""}`}>
    <p className="process-head">
      <span className="process-index">{step.index}</span>
      <span className="process-title">{step.title}</span>
    </p>
    <div className="process-body">
      <div className="process-summary-row">
        <p className="process-text">{step.detail}</p>
        <button
          type="button"
          className="process-toggle"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={onToggle}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </div>
      <div className="process-more" id={contentId} aria-hidden={!isExpanded}>
        <div className="process-more-inner">
          <p className="process-more-text">{step.expanded}</p>
        </div>
      </div>
    </div>
  </li>
);

const HomeContent = ({
  onNavigate,
  contactForm,
  contactStatus,
  contactError,
  contactCooldownSeconds,
  expandedProcessStep,
  isReplica = false,
  onContactFieldChange,
  onProjectNavigation,
  onContactSubmit,
  onToggleProcessStep,
}: {
  onNavigate: (to: string) => void;
  contactForm: ContactFormState;
  contactStatus: ContactSubmitStatus;
  contactError: string;
  contactCooldownSeconds: number;
  expandedProcessStep: string | null;
  isReplica?: boolean;
  onContactFieldChange: (field: keyof ContactFormState, value: string) => void;
  onProjectNavigation: (context: ProjectNavigationContext) => void;
  onContactSubmit: (event: ReactFormEvent<HTMLFormElement>) => void;
  onToggleProcessStep: (stepIndex: string) => void;
}) => {
  const socialLinksRef = useRef<HTMLLIElement | null>(null);
  const [socialLinksWrapped, setSocialLinksWrapped] = useState(false);
  const processIdBase = useId();
  const currentYear = new Date().getFullYear();
  const trackSocialLinkClick = useCallback(
    (linkType: SocialLinkType, location: SocialLinkLocation) => {
      if (isReplica) return;
      captureAnalyticsEvent("social_link_clicked", {
        link_type: linkType,
        location,
      });
    },
    [isReplica],
  );

  useEffect(() => {
    if (isReplica) return;

    const listItem = socialLinksRef.current;
    if (!listItem) return;

    let frame = 0;
    const updateWrappedState = () => {
      const links = listItem.querySelectorAll("a");
      if (links.length < 2) {
        setSocialLinksWrapped(false);
        return;
      }

      const firstLinkTop = links[0]?.getBoundingClientRect().top ?? 0;
      const secondLinkTop = links[1]?.getBoundingClientRect().top ?? 0;
      setSocialLinksWrapped(Math.abs(firstLinkTop - secondLinkTop) > 1);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateWrappedState);
    };

    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(scheduleUpdate);
      observer.observe(listItem);
    }

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [isReplica]);

  return (
    <main className="cube-content">
      <header>
        <InternalLink to={buildResumePath()} onNavigate={onNavigate} className="hero-logo-link" ariaLabel="Open resume">
          <HeroLogo />
        </InternalLink>
        <h1>
          <InternalLink to={buildAboutPath()} onNavigate={onNavigate} className="hero-name-link">
            <span className="hero-name-word">Lex</span>
            <span className="hero-name-word">Ferguson</span>
          </InternalLink>
        </h1>
      </header>

      <section>
        <ul>
          <li>{siteProfile.heroSummary}</li>
          <li>
            <a href={`mailto:${siteProfile.email}`} onClick={() => trackSocialLinkClick("email", "hero")}>
              {siteProfile.email}
            </a>
          </li>
          <li className={`hero-social-links${socialLinksWrapped ? " is-wrapped" : ""}`} ref={socialLinksRef}>
            <a
              href={siteProfile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackSocialLinkClick("linkedin", "hero")}
            >
              {siteProfile.linkedinUrl.replace(/^https?:\/\//, "")}
            </a>
            <span className="hero-social-divider" aria-hidden="true">
              ·
            </span>
            <a
              href={siteProfile.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackSocialLinkClick("github", "hero")}
            >
              {siteProfile.githubUrl.replace(/^https?:\/\//, "").toLowerCase()}
            </a>
          </li>
        </ul>
      </section>

      <section>
        <SectionHeading title="Project Shortlist" href={buildProjectsPath()} linkLabel="View all" onNavigate={onNavigate} />
        <hr />
        <ul className="project-lines">
          {HOME_SHORTLIST.map((project) => (
            <ProjectLine
              key={project.id}
              project={project}
              navigationContext={{ source: "shortlist" }}
              onNavigate={onNavigate}
              onProjectNavigation={onProjectNavigation}
            />
          ))}
        </ul>
      </section>

      <section className="home-archive-section">
        <SectionHeading
          title="Archive"
          href={buildProjectsPath()}
          linkLabel="Search index"
          onNavigate={onNavigate}
        />
        <hr />
        <ul className="project-lines">
          {HOME_ARCHIVE.map((project) => (
            <ProjectLine
              key={project.id}
              project={project}
              navigationContext={{ source: "archive" }}
              onNavigate={onNavigate}
              onProjectNavigation={onProjectNavigation}
            />
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience Log</h2>
        <hr />
        <ul className="experience-lines">
          {HOME_TIMELINE.map((item) => (
            <ExperienceLine
              key={item.id}
              item={item}
              projectsById={HOME_PROJECTS_BY_ID}
              onNavigate={onNavigate}
              onProjectNavigation={onProjectNavigation}
            />
          ))}
        </ul>
      </section>

      <section>
        <h2>My Process</h2>
        <hr />
        <p className="process-intro">{siteProfile.processIntro}</p>
        <ol className="process-lines">
          {processSteps.map((step) => (
            <HomeProcessLine
              key={step.index}
              step={step}
              isExpanded={expandedProcessStep === step.index}
              contentId={`${processIdBase}-${step.index}`}
              onToggle={() => onToggleProcessStep(step.index)}
            />
          ))}
        </ol>
        <p className="process-tools">{siteProfile.processTools}</p>
      </section>

      <section>
        <h2>Contact</h2>
        <hr />
        <ContactForm
          form={contactForm}
          status={contactStatus}
          errorMessage={contactError}
          cooldownSeconds={contactCooldownSeconds}
          onFieldChange={onContactFieldChange}
          onSubmit={onContactSubmit}
        />
      </section>

      <section className="micro-footer" aria-label="Footer">
        <hr />
        <p>
          © {currentYear} {siteProfile.name} ·{" "}
          <a href={`mailto:${siteProfile.email}`} onClick={() => trackSocialLinkClick("email", "footer")}>
            {siteProfile.email}
          </a>
        </p>
      </section>

      <div className="cube-end-space" aria-hidden="true" />
    </main>
  );
};

const CubeHome = ({
  onNavigate,
  onProjectNavigation,
}: {
  onNavigate: (to: string) => void;
  onProjectNavigation: (context: ProjectNavigationContext) => void;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const centerFoldRef = useRef<HTMLDivElement | null>(null);
  const topContentRef = useRef<HTMLDivElement | null>(null);
  const bottomContentRef = useRef<HTMLDivElement | null>(null);
  const successResetRef = useRef<number | null>(null);
  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<ContactSubmitStatus>("idle");
  const [contactError, setContactError] = useState("");
  const [contactCooldownUntil, setContactCooldownUntil] = useState<number | null>(null);
  const [contactCooldownSeconds, setContactCooldownSeconds] = useState(0);
  const [expandedProcessStep, setExpandedProcessStep] = useState<string | null>(null);

  const handleProcessStepToggle = useCallback((stepIndex: string) => {
    setExpandedProcessStep((current) => (current === stepIndex ? null : stepIndex));
  }, []);

  const handleContactFieldChange = useCallback((field: keyof ContactFormState, value: string) => {
    setContactForm((current) => ({ ...current, [field]: value }));
    if (contactStatus !== "idle" && contactCooldownSeconds === 0) {
      setContactStatus("idle");
      setContactError("");
    }
  }, [contactCooldownSeconds, contactStatus]);

  const handleContactSubmit = useCallback(
    async (event: ReactFormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (contactStatus === "sending") return;
      if (contactCooldownSeconds > 0) return;
      if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;

      const formData = new FormData(event.currentTarget);
      const honeyValue = String(formData.get("_honey") || "").trim();
      if (honeyValue) return;

      const now = Date.now();
      const rateWindow = readContactRateWindow(now);
      const rateWindowEndsAt = rateWindow.windowStartedAt + CONTACT_RATE_WINDOW_MS;

      if (rateWindow.count >= CONTACT_RATE_MAX_SUBMISSIONS) {
        setContactCooldownUntil(rateWindowEndsAt);
        setContactStatus("error");
        setContactError("Too many messages too quickly. Please try again shortly.");
        return;
      }

      setContactStatus("sending");
      setContactError("");

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: contactForm.name.trim(),
            email: contactForm.email.trim(),
            message: contactForm.message.trim(),
            _subject: "New message from portfolio site",
            _captcha: "false",
            _template: "table",
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || "Unable to send right now. Please try again.");
        }

        const nextWindow: ContactRateWindow = {
          windowStartedAt: rateWindow.windowStartedAt,
          count: rateWindow.count + 1,
        };
        writeContactRateWindow(nextWindow);
        if (nextWindow.count >= CONTACT_RATE_MAX_SUBMISSIONS) {
          setContactCooldownUntil(nextWindow.windowStartedAt + CONTACT_RATE_WINDOW_MS);
        }

        captureAnalyticsEvent("contact_form_submitted", {
          source_page: "home",
          message_length_bucket: getMessageLengthBucket(contactForm.message),
        });
        setContactStatus("success");
        setContactForm({ name: "", email: "", message: "" });
        if (successResetRef.current !== null) {
          window.clearTimeout(successResetRef.current);
        }
        successResetRef.current = window.setTimeout(() => {
          setContactStatus("idle");
          setContactError("");
        }, 3000);
      } catch (error) {
        setContactStatus("error");
        setContactError(error instanceof Error ? error.message : "Unable to send right now. Please try again.");
      }
    },
    [contactCooldownSeconds, contactForm, contactStatus],
  );

  useEffect(() => {
    const now = Date.now();
    const rateWindow = readContactRateWindow(now);
    if (rateWindow.count >= CONTACT_RATE_MAX_SUBMISSIONS) {
      setContactCooldownUntil(rateWindow.windowStartedAt + CONTACT_RATE_WINDOW_MS);
    }
  }, []);

  useEffect(() => {
    if (!contactCooldownUntil) {
      setContactCooldownSeconds(0);
      return;
    }

    const tick = () => {
      const remainingMs = contactCooldownUntil - Date.now();
      if (remainingMs <= 0) {
        setContactCooldownUntil(null);
        setContactCooldownSeconds(0);
        setContactStatus((current) => (current === "error" ? "idle" : current));
        setContactError("");
        return;
      }

      setContactCooldownSeconds(Math.ceil(remainingMs / 1000));
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [contactCooldownUntil]);

  useEffect(() => {
    const centerFold = centerFoldRef.current;
    const replicas = [topContentRef.current, bottomContentRef.current].filter(Boolean) as HTMLDivElement[];

    if (!centerFold || replicas.length === 0) return;

    let raf: number | undefined;
    let lastOffsetY = Number.NaN;

    const syncReplicaOffsets = () => {
      raf = undefined;
      const offsetY = -centerFold.scrollTop;
      if (offsetY === lastOffsetY) return;

      lastOffsetY = offsetY;
      for (const replica of replicas) {
        replica.style.transform = `translate3d(0, ${offsetY}px, 0)`;
      }
    };

    const scheduleReplicaSync = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(syncReplicaOffsets);
    };

    const handleResize = () => {
      lastOffsetY = Number.NaN;
      scheduleReplicaSync();
    };

    centerFold.addEventListener("scroll", scheduleReplicaSync, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    scheduleReplicaSync();

    return () => {
      centerFold.removeEventListener("scroll", scheduleReplicaSync);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (raf) window.cancelAnimationFrame(raf);
      for (const replica of replicas) {
        replica.style.transform = "";
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (successResetRef.current !== null) {
        window.clearTimeout(successResetRef.current);
      }
    };
  }, []);

  return (
    <div className="app-all">
      <div className="wrapper3d" ref={wrapperRef}>
        <div className="fold fold-top">
          <div className="fold-align">
            <div data-fold-content="true" data-fold-replica="true" aria-hidden="true" ref={topContentRef}>
              <HomeContent
                onNavigate={onNavigate}
                contactForm={contactForm}
                contactStatus={contactStatus}
                contactError={contactError}
                contactCooldownSeconds={contactCooldownSeconds}
                expandedProcessStep={expandedProcessStep}
                isReplica
                onContactFieldChange={handleContactFieldChange}
                onProjectNavigation={onProjectNavigation}
                onContactSubmit={handleContactSubmit}
                onToggleProcessStep={handleProcessStepToggle}
              />
            </div>
          </div>
        </div>

        <div className="fold center-fold" ref={centerFoldRef}>
          <div className="fold-align">
            <div data-fold-content="true">
              <HomeContent
                onNavigate={onNavigate}
                contactForm={contactForm}
                contactStatus={contactStatus}
                contactError={contactError}
                contactCooldownSeconds={contactCooldownSeconds}
                expandedProcessStep={expandedProcessStep}
                onContactFieldChange={handleContactFieldChange}
                onProjectNavigation={onProjectNavigation}
                onContactSubmit={handleContactSubmit}
                onToggleProcessStep={handleProcessStepToggle}
              />
            </div>
          </div>
        </div>

        <div className="fold fold-bottom">
          <div className="fold-align">
            <div data-fold-content="true" data-fold-replica="true" aria-hidden="true" ref={bottomContentRef}>
              <HomeContent
                onNavigate={onNavigate}
                contactForm={contactForm}
                contactStatus={contactStatus}
                contactError={contactError}
                contactCooldownSeconds={contactCooldownSeconds}
                expandedProcessStep={expandedProcessStep}
                isReplica
                onContactFieldChange={handleContactFieldChange}
                onProjectNavigation={onProjectNavigation}
                onContactSubmit={handleContactSubmit}
                onToggleProcessStep={handleProcessStepToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = ({
  onNavigate,
  onProjectNavigation,
}: {
  onNavigate: (to: string) => void;
  onProjectNavigation: (context: ProjectNavigationContext) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedGroupId, setSelectedGroupId] = useState<ProjectGroupId>(() =>
    normalizeProjectGroupId(new URL(window.location.href).searchParams.get("group")),
  );
  const [animateResults, setAnimateResults] = useState(false);
  const searchInputId = useId();
  const animateResetRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const syncGroupFromLocation = () => {
      setSelectedGroupId(normalizeProjectGroupId(new URL(window.location.href).searchParams.get("group")));
    };

    window.addEventListener("popstate", syncGroupFromLocation);
    return () => window.removeEventListener("popstate", syncGroupFromLocation);
  }, []);

  const handleGroupChange = useCallback((nextGroupId: ProjectGroupId) => {
    setSelectedGroupId(nextGroupId);
    setAnimateResults(true);

    if (animateResetRef.current !== null) {
      window.clearTimeout(animateResetRef.current);
    }

    animateResetRef.current = window.setTimeout(() => {
      setAnimateResults(false);
      animateResetRef.current = null;
    }, 160);
  }, []);

  const renderGroupPill = useCallback(
    (group: { id: ProjectGroupId; label: string }) => {
      const nextGroupId = selectedGroupId === group.id ? "all" : group.id;
      return (
        <InternalLink
          key={group.id}
          to={buildProjectsPath(nextGroupId)}
          onNavigate={onNavigate}
          className={`projects-filter-pill${selectedGroupId === group.id ? " is-active" : ""}`}
          ariaLabel={`Show ${group.label} projects`}
          onBeforeNavigate={() => {
            handleGroupChange(nextGroupId);
          }}
        >
          <span>{group.label}</span>
        </InternalLink>
      );
    },
    [handleGroupChange, onNavigate, selectedGroupId],
  );

  const activeGroup = useMemo(
    () => PROJECT_GROUPS.find((group) => group.id === selectedGroupId) ?? { id: "all" as const, label: "All", tagMatches: [] },
    [selectedGroupId],
  );

  const visibleProjects = useMemo(() => {
    const groupedProjects = ALL_PROJECTS.filter((project) => projectMatchesGroup(project, selectedGroupId));
    if (!normalizeSearchText(deferredSearchQuery)) return groupedProjects;

    return groupedProjects
      .map((project) => ({ project, score: scoreProjectSearch(project, deferredSearchQuery) }))
      .filter(({ score }) => score >= 24)
      .sort(
        (left, right) =>
          right.score - left.score || right.project.year - left.project.year || left.project.title.localeCompare(right.project.title),
      )
      .map(({ project }) => project);
  }, [deferredSearchQuery, selectedGroupId]);
  const filteredProjects = visibleProjects;

  useEffect(() => {
    return () => {
      if (animateResetRef.current !== null) {
        window.clearTimeout(animateResetRef.current);
      }
    };
  }, []);

  const handleSearchChange = useCallback((event: ReactChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
    setAnimateResults(true);
    if (animateResetRef.current !== null) {
      window.clearTimeout(animateResetRef.current);
    }
    animateResetRef.current = window.setTimeout(() => {
      setAnimateResults(false);
      animateResetRef.current = null;
    }, 160);
  }, []);

  return (
    <div className="project-page projects-page">
      <main className="project-detail-main projects-main">
        <div className="project-detail-nav">
          <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
            Back to Home
          </InternalLink>
        </div>

        <section className="project-detail-head">
          <div>
            <p className="project-detail-year">Projects</p>
            <h1 className="project-detail-title">Project List</h1>
          </div>
        </section>

        <section className="project-detail-copy">
          <p>{PROJECTS_INDEX_DESCRIPTION}</p>
        </section>

        <section className="projects-search" aria-label="Project search">
          <label className="projects-search-label" htmlFor={searchInputId}>
            Search projects
          </label>
          <input
            id={searchInputId}
            className="projects-search-input"
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search anything..."
          />
          <div className="projects-search-meta" aria-live="polite">
            <p>
              {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"} shown
            </p>
            {searchQuery ? (
              <p>
                Searching {activeGroup.label.toLowerCase()} projects
              </p>
            ) : (
              <p>Browse by group or search within the list</p>
            )}
          </div>
        </section>

        <section className="projects-filters" aria-label="Project groups">
          <div className="projects-filter-pills">
            {renderGroupPill({ id: "all", label: "All" })}
            {PROJECT_GROUPS.map(renderGroupPill)}
          </div>
        </section>

        <section className="project-more" id="all-projects">
          <h2 className="project-more-title">{activeGroup.id === "all" ? "All Projects" : `${activeGroup.label} Projects`}</h2>
          <hr />
          <div className={`projects-results${animateResults ? " is-animating" : ""}`}>
            {filteredProjects.length > 0 ? (
              <ul className="project-lines">
                {filteredProjects.map((project) => (
                  <ProjectLine
                    key={project.id}
                    project={project}
                    navigationContext={{ source: "projects_index", groupId: selectedGroupId }}
                    onNavigate={onNavigate}
                    onProjectNavigation={onProjectNavigation}
                  />
                ))}
              </ul>
            ) : (
              <p className="projects-empty">No projects match that search.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

const ProjectGallery = ({ media, title }: { media: ProjectMedia[]; title: string }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaStatus, setMediaStatus] = useState<GalleryMediaStatus[]>(() => createGalleryMediaStatus(media));

  const updateMediaStatus = useCallback((index: number, status: GalleryMediaStatus) => {
    setMediaStatus((current) => {
      if (current[index] === status) return current;
      const next = [...current];
      next[index] = status;
      return next;
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const getNearestSlideIndex = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return 0;

      const scrollLeft = track.scrollLeft;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - scrollLeft);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    };

    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const index = getNearestSlideIndex();
        setActiveIndex(Math.max(0, Math.min(media.length - 1, index)));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [media.length]);

  useEffect(() => {
    media.forEach((asset, index) => {
      if (asset.type !== "video") return;

      const video = videoRefs.current[index];
      if (!video) return;

      if (index === activeIndex) {
        const playback = video.play();
        if (playback) {
          playback.catch(() => undefined);
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex, media]);

  const jumpTo = (nextIndex: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(media.length - 1, nextIndex));
    const slide = track.children.item(clamped) as HTMLElement | null;
    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || media.length <= 1) return;

    let frame = 0;
    const alignToActive = () => {
      const slide = track.children.item(activeIndex) as HTMLElement | null;
      if (!slide) return;
      track.scrollTo({
        left: slide.offsetLeft,
        top: 0,
        behavior: "auto",
      });
    };

    const onResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(alignToActive);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frame);
    };
  }, [activeIndex, media.length]);

  return (
    <section className="project-gallery">
      <div className="gallery-track" ref={trackRef}>
        {media.map((asset, index) => (
          <figure
            className={`gallery-slide${mediaStatus[index] === "loaded" ? " is-loaded" : ""}${
              mediaStatus[index] === "error" ? " is-error" : ""
            }`}
            key={`${asset.src}-${index}`}
          >
            {mediaStatus[index] !== "loaded" ? (
              <p className="gallery-slide-status">
                {mediaStatus[index] === "error" ? "Media unavailable." : "Loading..."}
              </p>
            ) : null}

            {asset.type === "video" ? (
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                  if (node && node.readyState >= 2) {
                    updateMediaStatus(index, "loaded");
                  }
                }}
                className="gallery-slide-media"
                src={asset.src}
                muted
                loop
                playsInline
                controls
                autoPlay={index === activeIndex}
                preload={index === activeIndex ? "auto" : "metadata"}
                onLoadedData={() => updateMediaStatus(index, "loaded")}
                onError={() => updateMediaStatus(index, "error")}
              />
            ) : (
              <img
                className="gallery-slide-media"
                src={asset.src}
                alt={asset.alt}
                loading={index === 0 ? "eager" : "lazy"}
                onLoad={() => updateMediaStatus(index, "loaded")}
                onError={() => updateMediaStatus(index, "error")}
              />
            )}
          </figure>
        ))}
      </div>

      {media.length > 1 ? (
        <div className="gallery-controls">
          <button type="button" onClick={() => jumpTo(activeIndex - 1)} disabled={activeIndex === 0}>
            Prev
          </button>
          <p>
            {activeIndex + 1} / {media.length}
          </p>
          <button
            type="button"
            onClick={() => jumpTo(activeIndex + 1)}
            disabled={activeIndex === media.length - 1}
          >
            Next
          </button>
        </div>
      ) : null}

      <p className="gallery-caption">{title}</p>
    </section>
  );
};

const ProjectDetailPage = ({
  project,
  backPath,
  backLabel,
  projectNavigationContext,
  onNavigate,
  onProjectNavigation,
}: {
  project: Project;
  backPath: string;
  backLabel: string;
  projectNavigationContext: ProjectNavigationContext | null;
  onNavigate: (to: string) => void;
  onProjectNavigation: (context: ProjectNavigationContext) => void;
}) => {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const moreProjects = useMemo(() => {
    return projects
      .filter((item) => item.id !== project.id)
      .sort((left, right) => {
        const leftScore = hashString(`${project.id}:${left.id}`);
        const rightScore = hashString(`${project.id}:${right.id}`);
        return leftScore - rightScore || left.title.localeCompare(right.title);
      })
      .slice(0, 3);
  }, [project.id]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    pageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [project.id]);

  return (
    <div className="project-page" ref={pageRef}>
      <main className="project-detail-main">
        <div className="project-detail-nav">
          <InternalLink to={backPath} onNavigate={onNavigate} className="project-nav-link">
            {backLabel}
          </InternalLink>
        </div>

        <section className="project-detail-head">
          <div>
            <p className="project-detail-year">{project.year}</p>
            <h1 className="project-detail-title">{project.title}</h1>
          </div>
          <div className="project-detail-links">
            <ProjectShareButton project={project} />
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  captureAnalyticsEvent("project_link_clicked", {
                    project_id: project.id,
                    project_title: project.title,
                    link_label: link.label,
                    link_url: link.url,
                    link_domain: getUrlDomain(link.url),
                  })
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <ProjectGallery key={project.id} media={project.media} title={project.title} />

        <section className="project-detail-copy">
          <p>{project.description}</p>
          <div className="project-tag-row">
            {project.tags.map((tag) => (
              <span className="project-tag" key={`${project.id}-detail-${tag}`}>
                {tag}
              </span>
            ))}
          </div>
          {project.tools?.length ? (
            <p className="project-tools-line">
              <span className="project-tools-label">Tools:</span> {project.tools.join(", ")}
            </p>
          ) : null}
        </section>

        <section className="project-more" id="more-projects">
          <h2 className="project-more-title">More Projects</h2>
          <hr />
          <ul className="project-lines">
            {moreProjects.map((item) => (
              <ProjectLine
                key={item.id}
                project={item}
                navigationContext={{ source: "projects_index", groupId: projectNavigationContext?.groupId }}
                onNavigate={onNavigate}
                onProjectNavigation={onProjectNavigation}
              />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

const ResumePage = ({ onNavigate }: { onNavigate: (to: string) => void }) => (
  <div className="project-page resume-page">
    <main className="project-detail-main resume-main">
      <div className="project-detail-nav">
        <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
          Back to Home
        </InternalLink>
      </div>

      <section className="project-detail-head">
        <div>
          <p className="project-detail-year">Resume</p>
          <h1 className="project-detail-title">Lex Ferguson</h1>
        </div>
        <div className="project-detail-links">
          <InternalLink to={buildCvPath()} onNavigate={onNavigate}>
            CV
          </InternalLink>
          <a href={RESUME_PATH} target="_blank" rel="noreferrer">
            Open PDF
          </a>
          <a
            href={RESUME_PATH}
            download
            onClick={() =>
              captureAnalyticsEvent("resume_downloaded", {
                source_page: "resume",
                source_route: "/resume",
              })
            }
          >
            Download
          </a>
        </div>
      </section>

      <section className="resume-viewer">
        <iframe className="resume-frame" src={`${RESUME_PATH}#view=FitH`} title="Lex Ferguson resume" />
      </section>

      <p className="resume-note">
        If preview does not load on your browser, use <a href={RESUME_PATH}>Open PDF</a>.
      </p>
    </main>
  </div>
);

const CvPage = ({ onNavigate }: { onNavigate: (to: string) => void }) => (
  <div className="project-page resume-page">
    <main className="project-detail-main resume-main">
      <div className="project-detail-nav">
        <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
          Back to Home
        </InternalLink>
      </div>

      <section className="project-detail-head">
        <div>
          <p className="project-detail-year">Cover Letter</p>
          <h1 className="project-detail-title">Lex Ferguson</h1>
        </div>
        <div className="project-detail-links">
          <InternalLink to={buildResumePath()} onNavigate={onNavigate}>
            Resume
          </InternalLink>
          <a href={CV_PATH} target="_blank" rel="noreferrer">
            Open PDF
          </a>
          <a href={CV_PATH} download>
            Download
          </a>
        </div>
      </section>

      <section className="resume-viewer">
        <iframe className="resume-frame" src={`${CV_PATH}#view=FitH`} title="Lex Ferguson cover letter" />
      </section>

      <p className="resume-note">
        If preview does not load on your browser, use <a href={CV_PATH}>Open PDF</a>.
      </p>
    </main>
  </div>
);

const AboutPage = ({
  onNavigate,
  onProjectNavigation,
}: {
  onNavigate: (to: string) => void;
  onProjectNavigation: (context: ProjectNavigationContext) => void;
}) => (
  <div className="project-page about-page">
    <main className="project-detail-main about-main">
      <div className="project-detail-nav">
        <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
          Back to Home
        </InternalLink>
      </div>

      <section className="project-detail-head">
        <div>
          <p className="project-detail-year">About</p>
          <h1 className="project-detail-title">Lex Ferguson</h1>
        </div>
        <div className="project-detail-links">
          <InternalLink to={buildResumePath()} onNavigate={onNavigate}>
            Resume
          </InternalLink>
          <a
            href={SITE_LINKEDIN}
            target="_blank"
            rel="noreferrer"
            onClick={() => captureAnalyticsEvent("social_link_clicked", { link_type: "linkedin", location: "about" })}
          >
            LinkedIn
          </a>
          <a
            href={SITE_GITHUB}
            target="_blank"
            rel="noreferrer"
            onClick={() => captureAnalyticsEvent("social_link_clicked", { link_type: "github", location: "about" })}
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="about-copy">
        <p>{aboutIntro}</p>
        <p>
          I'm a product designer at heart, but I like seeing ideas all the way through. I usually lead the
          concept, UX, UI, branding, and overall product direction, then use implementation knowledge and
          AI-assisted workflows to help bring the work to life without giving up the creative vision. Recent
          work includes Packanack Golf Club's live{" "}
          <InternalLink
            to={buildProjectPath("pgc-website")}
            onNavigate={onNavigate}
            onBeforeNavigate={() => onProjectNavigation({ source: "about" })}
          >
            website
          </InternalLink>{" "}
          and{" "}
          <InternalLink
            to={buildProjectPath("pgc-app")}
            onNavigate={onNavigate}
            onBeforeNavigate={() => onProjectNavigation({ source: "about" })}
          >
            app
          </InternalLink>
          , along with{" "}
          <InternalLink
            to={buildProjectPath("verity-protect")}
            onNavigate={onNavigate}
            onBeforeNavigate={() => onProjectNavigation({ source: "about" })}
          >
            Verity Protect
          </InternalLink>
          , an iOS app I launched on the{" "}
          <a href={VERITY_PROTECT_APP_STORE_URL} target="_blank" rel="noreferrer">
            App Store
          </a>
          . My taste leans toward clean, practical UX, but I always like leaving room for personality,
          systems thinking, and a point of view that makes the work feel memorable.
        </p>
      </section>

      <section className="about-section">
        <article>
          <h2 className="project-more-title">Education</h2>
          <hr />
          <ol className="process-lines">
            {aboutEducation.map((item) => (
              <li className="process-line" key={`${item.index}-${item.title}`}>
                <p className="process-head">
                  <span className="process-index">{item.index}</span>
                  <span className="process-title">{item.title}</span>
                </p>
                <p className="process-text">{item.detail}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="about-section">
        <article>
          <h2 className="project-more-title">Notable Achievements</h2>
          <hr />
          <ol className="process-lines">
            {aboutNotableAchievements.map((item) => (
              <li className="process-line" key={`${item.index}-${item.title}`}>
                <p className="process-head">
                  <span className="process-index">{item.index}</span>
                  <span className="process-title">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noreferrer" className="process-title-link">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </span>
                </p>
                <p className="process-text">{item.detail}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="about-section">
        <article>
          <h2 className="project-more-title">Focus Areas</h2>
          <hr />
          <ol className="process-lines">
            {aboutFocusAreas.map((item) => (
              <li className="process-line" key={`${item.index}-${item.title}`}>
                <p className="process-head">
                  <span className="process-index">{item.index}</span>
                  <span className="process-title">{item.title}</span>
                </p>
                <p className="process-text">{item.detail}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  </div>
);

const MissingProjectPage = ({ onNavigate }: { onNavigate: (to: string) => void }) => (
  <div className="project-page">
    <main className="project-detail-main">
      <h1 className="project-detail-title">Project not found</h1>
      <p>This project link is broken or the case study has moved.</p>
      <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
        Back to Home
      </InternalLink>
    </main>
  </div>
);

const NotFoundPage = ({
  onNavigate,
  path,
}: {
  onNavigate: (to: string) => void;
  path: string;
}) => (
  <div className="project-page not-found-page">
    <main className="project-detail-main not-found-main">
      <p className="project-detail-year">404</p>
      <h1 className="project-detail-title">Page not found</h1>
      <p className="not-found-copy">
        <code>{path}</code> does not exist or has moved.
      </p>
      <div className="not-found-actions">
        <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
          Back to Home
        </InternalLink>
        <InternalLink to={buildResumePath()} onNavigate={onNavigate} className="project-nav-link">
          Open Resume
        </InternalLink>
      </div>
    </main>
  </div>
);

function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.href));
  const resumePrintFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [projectNavigationContextState, setProjectNavigationContextState] = useState<ProjectNavigationContext | null>(null);
  const lastTrackedProjectPathRef = useRef<string | null>(null);

  const promptResumePrint = useCallback(() => {
    let frame = resumePrintFrameRef.current;
    if (!frame) {
      frame = document.createElement("iframe");
      frame.setAttribute("aria-hidden", "true");
      frame.style.position = "fixed";
      frame.style.width = "0";
      frame.style.height = "0";
      frame.style.border = "0";
      frame.style.opacity = "0";
      frame.style.pointerEvents = "none";
      frame.style.left = "-9999px";
      document.body.appendChild(frame);
      resumePrintFrameRef.current = frame;
    }

    frame.onload = () => {
      const printWindow = frame?.contentWindow;
      if (!printWindow) return;
      printWindow.focus();
      printWindow.print();
    };

    frame.src = `${RESUME_PATH}?print=${Date.now()}`;
  }, []);

  const markProjectOpenSource = useCallback((context: ProjectNavigationContext) => {
    setProjectNavigationContextState(context);
  }, []);

  const navigate = useCallback((to: string) => {
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (currentPath === to) return;
    const nextRoute = parseRoute(to);
    if (nextRoute.page !== "project") {
      setProjectNavigationContextState(null);
    }
    window.history.pushState({}, "", to);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    let nextHead: HeadMeta;
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      jobTitle: siteProfile.jobTitle,
      email: `mailto:${siteProfile.email}`,
      sameAs: [SITE_LINKEDIN, SITE_GITHUB],
    };
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${SITE_NAME} Portfolio`,
      url: SITE_ORIGIN,
      inLanguage: "en-US",
    };

    upsertJsonLd("person", personSchema);
    upsertJsonLd("website", websiteSchema);

    if (route.page === "project") {
      const project = projects.find((item) => item.id === route.id);
      if (project) {
        const projectSocial = getProjectSocialImage(project);
        nextHead = {
          title: `${project.title} | ${SITE_NAME}`,
          description: project.summary,
          canonicalPath: buildProjectPath(project.id),
          ogType: "article",
          robots: INDEXABLE_ROBOTS,
          socialImagePath: projectSocial.path,
          socialImageAlt: projectSocial.alt,
        };
        upsertJsonLd("route", {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          headline: project.title,
          description: project.summary,
          url: `${SITE_ORIGIN}${buildProjectPath(project.id)}`,
          mainEntityOfPage: `${SITE_ORIGIN}${buildProjectPath(project.id)}`,
          inLanguage: "en-US",
          datePublished: `${project.year}-01-01`,
          dateModified: new Date().toISOString().slice(0, 10),
          author: {
            "@type": "Person",
            name: SITE_NAME,
            url: SITE_ORIGIN,
          },
          image: (() => {
            const images = project.media
              .filter((media) => media.type === "image")
              .map((media) => buildAbsoluteUrl(media.src));
            return images.length ? images : buildAbsoluteUrl(PROJECT_SOCIAL_IMAGE_PATH);
          })(),
          keywords: project.tags.join(", "),
        });
      } else {
        nextHead = {
          title: `Project Not Found | ${SITE_NAME}`,
          description: SITE_DESCRIPTION,
          canonicalPath: "/",
          ogType: "website",
          robots: "noindex, nofollow",
          socialImagePath: DEFAULT_SOCIAL_IMAGE_PATH,
          socialImageAlt: "Lex Ferguson portfolio share image with logo and wordmark.",
        };
        removeJsonLd("route");
      }
    } else if (route.page === "resume") {
      nextHead = {
        title: `Resume | ${SITE_NAME}`,
        description: siteProfile.resumeDescription,
        canonicalPath: "/resume",
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: RESUME_SOCIAL_IMAGE_PATH,
        socialImageAlt: "Resume page share image for Lex Ferguson.",
      };
      upsertJsonLd("route", {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: `${SITE_NAME} Resume`,
        url: `${SITE_ORIGIN}/resume`,
        mainEntity: {
          "@type": "Person",
          name: SITE_NAME,
          jobTitle: siteProfile.jobTitle,
        },
      });
    } else if (route.page === "cv") {
      nextHead = {
        title: `Cover Letter | ${SITE_NAME}`,
        description: CV_DESCRIPTION,
        canonicalPath: buildCvPath(),
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: CV_SOCIAL_IMAGE_PATH,
        socialImageAlt: CV_SOCIAL_IMAGE_ALT,
      };
      upsertJsonLd("route", {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: `${SITE_NAME} Cover Letter`,
        url: `${SITE_ORIGIN}${buildCvPath()}`,
        mainEntity: {
          "@type": "Person",
          name: SITE_NAME,
          jobTitle: siteProfile.jobTitle,
        },
      });
    } else if (route.page === "about") {
      nextHead = {
        title: `About | ${SITE_NAME}`,
        description: siteProfile.aboutDescription,
        canonicalPath: "/about",
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: ABOUT_SOCIAL_IMAGE_PATH,
        socialImageAlt: "About page share image for Lex Ferguson.",
      };
      upsertJsonLd("route", {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: `${SITE_NAME} About`,
        url: `${SITE_ORIGIN}/about`,
        description: siteProfile.aboutDescription,
        mainEntity: {
          "@type": "Person",
          name: SITE_NAME,
          jobTitle: "Design Engineer",
          sameAs: [SITE_LINKEDIN, SITE_GITHUB],
        },
      });
    } else if (route.page === "projects") {
      nextHead = {
        title: `Projects | ${SITE_NAME}`,
        description: PROJECTS_INDEX_DESCRIPTION,
        canonicalPath: buildProjectsPath(),
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: PROJECT_SOCIAL_IMAGE_PATH,
        socialImageAlt: "Projects index share image for Lex Ferguson.",
      };
      upsertJsonLd("route", {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${SITE_NAME} Projects`,
        url: `${SITE_ORIGIN}${buildProjectsPath()}`,
        description: PROJECTS_INDEX_DESCRIPTION,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: ALL_PROJECTS.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_ORIGIN}${buildProjectPath(project.id)}`,
            name: project.title,
          })),
        },
      });
    } else if (route.page === "not-found") {
      nextHead = {
        title: `Page Not Found | ${SITE_NAME}`,
        description: "This page does not exist.",
        canonicalPath: "/",
        ogType: "website",
        robots: "noindex, nofollow",
        socialImagePath: DEFAULT_SOCIAL_IMAGE_PATH,
        socialImageAlt: "Lex Ferguson portfolio share image with logo and wordmark.",
      };
      removeJsonLd("route");
    } else {
      nextHead = {
        title: `${SITE_NAME} | Design Engineer, Product & UI/UX`,
        description: SITE_DESCRIPTION,
        canonicalPath: "/",
        ogType: "website",
        robots: INDEXABLE_ROBOTS,
        socialImagePath: DEFAULT_SOCIAL_IMAGE_PATH,
        socialImageAlt: "Lex Ferguson portfolio share image with logo and wordmark.",
      };
      upsertJsonLd("route", {
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
    }

    setHeadMetadata(nextHead);
  }, [route]);

  useEffect(() => {
    const onPopState = () => {
      const nextRoute = parseRoute(window.location.href);
      if (nextRoute.page !== "project") {
        setProjectNavigationContextState(null);
      }
      setRoute(nextRoute);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (route.page !== "project") {
      lastTrackedProjectPathRef.current = null;
      return;
    }

    const project = projects.find((item) => item.id === route.id);
    if (!project) return;

    const projectPath = buildProjectPath(project.id);
    if (lastTrackedProjectPathRef.current === projectPath) return;

    captureAnalyticsEvent("project_opened", {
      project_id: project.id,
      project_title: project.title,
      project_year: project.year,
      source: projectNavigationContextState?.source ?? "direct",
    });

    lastTrackedProjectPathRef.current = projectPath;
  }, [projectNavigationContextState, route]);

  useEffect(() => {
    document.body.dataset.route = route.page;

    return () => {
      delete document.body.dataset.route;
    };
  }, [route.page]);

  useEffect(() => {
    if (route.page !== "home") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== "p") return;

      event.preventDefault();
      promptResumePrint();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [promptResumePrint, route.page]);

  useEffect(() => {
    if (route.page !== "home") return;

    const originalPrint = window.print.bind(window);
    window.print = promptResumePrint;

    return () => {
      window.print = originalPrint;
    };
  }, [promptResumePrint, route.page]);

  useEffect(() => {
    return () => {
      const frame = resumePrintFrameRef.current;
      if (frame && frame.parentNode) {
        frame.parentNode.removeChild(frame);
      }
      resumePrintFrameRef.current = null;
    };
  }, []);

  if (route.page === "project") {
    const project = projects.find((item) => item.id === route.id);
    if (!project) return <MissingProjectPage onNavigate={navigate} />;
    const projectNavigationContext = projectNavigationContextState;
    const backPath = buildProjectBackPath(projectNavigationContext);
    const backLabel = buildProjectBackLabel(projectNavigationContext);
    return (
      <ProjectDetailPage
        project={project}
        backPath={backPath}
        backLabel={backLabel}
        projectNavigationContext={projectNavigationContext}
        onNavigate={navigate}
        onProjectNavigation={markProjectOpenSource}
      />
    );
  }

  if (route.page === "resume") {
    return <ResumePage onNavigate={navigate} />;
  }

  if (route.page === "cv") {
    return <CvPage onNavigate={navigate} />;
  }

  if (route.page === "about") {
    return <AboutPage onNavigate={navigate} onProjectNavigation={markProjectOpenSource} />;
  }

  if (route.page === "projects") {
    return <ProjectsPage onNavigate={navigate} onProjectNavigation={markProjectOpenSource} />;
  }

  if (route.page === "not-found") {
    return <NotFoundPage onNavigate={navigate} path={route.path} />;
  }

  return <CubeHome onNavigate={navigate} onProjectNavigation={markProjectOpenSource} />;
}

export default App;
