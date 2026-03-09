import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type ChangeEvent as ReactChangeEvent,
  type FormEvent as ReactFormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { experienceItems } from "./content/experience";
import { projects } from "./content/projects";
import type { ExperienceItem, Project, ProjectMedia } from "./types";

type RouteState =
  | { page: "home" }
  | { page: "project"; id: string }
  | { page: "resume" }
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

const FORM_ENDPOINT = "https://formsubmit.co/ajax/afergyy@gmail.com";
const RESUME_PATH = "/resume.pdf";
const SITE_ORIGIN = "https://aferguson.art";
const SITE_NAME = "Lex Ferguson";
const SITE_DESCRIPTION =
  "Portfolio of Lex Ferguson, a creative technologist focused on product design, UI/UX, and visual systems.";
const SITE_LINKEDIN = "https://linkedin.com/in/lex-ferguson";
const SITE_GITHUB = "https://github.com/SynisterSage";
const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RATE_MAX_SUBMISSIONS = 4;
const CONTACT_RATE_STORAGE_KEY = "port26_contact_rate_v1";

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

const processSteps = [
  {
    index: "01",
    title: "Frame",
    detail: "Define the goal, user context, constraints, and what success should look like.",
  },
  {
    index: "02",
    title: "Research",
    detail: "Build signal with moodboards, user input, and competitor scans to spot real opportunities.",
  },
  {
    index: "03",
    title: "Direction",
    detail: "Explore 1-2 clear directions, then choose the path with the strongest clarity and impact.",
  },
  {
    index: "04",
    title: "Prototype",
    detail: "Map core flows and key states so the experience feels coherent before full polish.",
  },
  {
    index: "05",
    title: "Validate + Ship",
    detail: "Review fast, refine friction points, and stay involved through build QA to protect quality.",
  },
] as const;

const parseRoute = (pathname: string): RouteState => {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (cleanPath === "/") return { page: "home" };
  if (cleanPath === "/resume") return { page: "resume" };

  if (cleanPath.startsWith("/projects/")) {
    const id = decodeURIComponent(cleanPath.slice("/projects/".length));
    if (id) return { page: "project", id };
  }

  return { page: "not-found", path: cleanPath };
};

const buildProjectPath = (id: string) => `/projects/${id}`;
const buildResumePath = () => "/resume";

const isPrimaryClick = (event: ReactMouseEvent<HTMLAnchorElement>) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const InternalLink = ({
  to,
  onNavigate,
  className,
  children,
}: {
  to: string;
  onNavigate: (to: string) => void;
  className?: string;
  children: ReactNode;
}) => (
  <a
    href={to}
    className={className}
    onClick={(event) => {
      if (!isPrimaryClick(event)) return;
      event.preventDefault();
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
  robots: "index, follow" | "noindex, nofollow";
};

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
  upsertMetaTag("name", "twitter:card", "summary");
  upsertMetaTag("name", "twitter:title", meta.title);
  upsertMetaTag("name", "twitter:description", meta.description);
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

const ProjectLine = ({
  project,
  onNavigate,
}: {
  project: Project;
  onNavigate: (to: string) => void;
}) => (
  <li className="project-line" key={project.id}>
    <div>
      <InternalLink to={buildProjectPath(project.id)} onNavigate={onNavigate} className="project-line-title">
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

const ExperienceLine = ({
  item,
  projectsById,
  onNavigate,
}: {
  item: ExperienceItem;
  projectsById: Map<string, Project>;
  onNavigate: (to: string) => void;
}) => {
  const relatedProjects = (item.relatedProjectIds || [])
    .map((id) => projectsById.get(id))
    .filter((project): project is Project => Boolean(project));

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

        {relatedProjects.length > 0 ? (
          <div className="experience-links">
            <span>Related:</span>
            {relatedProjects.map((project) => (
              <InternalLink
                key={`${item.id}-${project.id}`}
                to={buildProjectPath(project.id)}
                onNavigate={onNavigate}
                className="experience-link"
              >
                {project.title}
              </InternalLink>
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
      <p className="contact-intro">Open to freelance, contract, and full-time roles.</p>

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

const HomeContent = ({
  onNavigate,
  contactForm,
  contactStatus,
  contactError,
  contactCooldownSeconds,
  onContactFieldChange,
  onContactSubmit,
}: {
  onNavigate: (to: string) => void;
  contactForm: ContactFormState;
  contactStatus: ContactSubmitStatus;
  contactError: string;
  contactCooldownSeconds: number;
  onContactFieldChange: (field: keyof ContactFormState, value: string) => void;
  onContactSubmit: (event: ReactFormEvent<HTMLFormElement>) => void;
}) => {
  const shortlist = useMemo(
    () => projects.filter((project) => project.tier === "shortlist").slice(0, 3),
    [],
  );
  const archive = useMemo(
    () =>
      projects
        .filter((project) => project.tier === "archive")
        .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)),
    [],
  );
  const timeline = useMemo(
    () =>
      [...experienceItems].sort((a, b) => {
        const aPresent = /present/i.test(a.period);
        const bPresent = /present/i.test(b.period);
        if (a.startYear !== b.startYear) return b.startYear - a.startYear;
        if (aPresent !== bPresent) return Number(bPresent) - Number(aPresent);
        return a.company.localeCompare(b.company);
      }),
    [],
  );
  const projectsById = useMemo(() => new Map(projects.map((project) => [project.id, project])), []);
  const currentYear = new Date().getFullYear();

  return (
    <main className="cube-content">
      <header>
        <InternalLink to={buildResumePath()} onNavigate={onNavigate} className="hero-logo-link">
          <img className="hero-logo" src="/images/logo.svg" alt="Open resume" />
        </InternalLink>
        <h1>Lex Ferguson</h1>
      </header>

      <section>
        <ul>
          <li>Creative Technologist focused on UI/UX, branding, and visual systems.</li>
          <li>
            <a href="mailto:afergyy@gmail.com">afergyy@gmail.com</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/lex-ferguson" target="_blank" rel="noreferrer">
              linkedin.com/in/lex-ferguson
            </a>{" "}
            ·{" "}
            <a href="https://github.com/SynisterSage" target="_blank" rel="noreferrer">
              github.com/SynisterSage
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Project Shortlist</h2>
        <hr />
        <ul className="project-lines">
          {shortlist.map((project) => (
            <ProjectLine key={project.id} project={project} onNavigate={onNavigate} />
          ))}
        </ul>
      </section>

      <section>
        <h2>Archive</h2>
        <hr />
        <ul className="project-lines">
          {archive.map((project) => (
            <ProjectLine key={project.id} project={project} onNavigate={onNavigate} />
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience Log</h2>
        <hr />
        <ul className="experience-lines">
          {timeline.map((item) => (
            <ExperienceLine key={item.id} item={item} projectsById={projectsById} onNavigate={onNavigate} />
          ))}
        </ul>
      </section>

      <section>
        <h2>My Process</h2>
        <hr />
        <p className="process-intro">
          I combine product thinking, visual design, and build awareness to keep outcomes clear and usable.
        </p>
        <ol className="process-lines">
          {processSteps.map((step) => (
            <li className="process-line" key={step.index}>
              <p className="process-head">
                <span className="process-index">{step.index}</span>
                <span className="process-title">{step.title}</span>
              </p>
              <p className="process-text">{step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="process-tools">
          Selected tools: Figma, Adobe CC, React/TypeScript when implementation is needed.
        </p>
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
          © {currentYear} Lex Ferguson · <a href="mailto:afergyy@gmail.com">afergyy@gmail.com</a>
        </p>
      </section>

      <div className="cube-end-space" aria-hidden="true" />
    </main>
  );
};

const CubeHome = ({ onNavigate }: { onNavigate: (to: string) => void }) => {
  const centerContentRef = useRef<HTMLDivElement | null>(null);
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
    const centerContent = centerContentRef.current;
    const centerFold = centerFoldRef.current;
    const layers = [topContentRef.current, centerContentRef.current, bottomContentRef.current].filter(
      Boolean,
    ) as HTMLDivElement[];

    if (!centerContent || !centerFold || layers.length === 0) return;

    const originalBodyHeight = document.body.style.height;
    let raf: number | undefined;
    let observer: ResizeObserver | undefined;

    const updateBodyHeight = () => {
      const scrollableHeight = centerContent.clientHeight - centerFold.clientHeight;
      document.body.style.height = `${Math.max(0, scrollableHeight) + window.innerHeight}px`;
    };

    const tick = () => {
      const offsetY = -(window.scrollY || document.documentElement.scrollTop || 0);
      layers.forEach((layer) => {
        layer.style.transform = `translateY(${offsetY}px)`;
      });
      raf = window.requestAnimationFrame(tick);
    };

    const handleResize = () => {
      updateBodyHeight();
    };

    window.addEventListener("resize", handleResize);
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateBodyHeight);
      observer.observe(centerContent);
    }
    updateBodyHeight();
    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (raf) window.cancelAnimationFrame(raf);
      observer?.disconnect();
      document.body.style.height = originalBodyHeight;
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
      <div className="wrapper3d">
        <div className="fold fold-top">
          <div className="fold-align">
            <div data-fold-content="true" ref={topContentRef}>
              <HomeContent
                onNavigate={onNavigate}
                contactForm={contactForm}
                contactStatus={contactStatus}
                contactError={contactError}
                contactCooldownSeconds={contactCooldownSeconds}
                onContactFieldChange={handleContactFieldChange}
                onContactSubmit={handleContactSubmit}
              />
            </div>
          </div>
        </div>

        <div className="fold center-fold" ref={centerFoldRef}>
          <div className="fold-align">
            <div data-fold-content="true" ref={centerContentRef}>
              <HomeContent
                onNavigate={onNavigate}
                contactForm={contactForm}
                contactStatus={contactStatus}
                contactError={contactError}
                contactCooldownSeconds={contactCooldownSeconds}
                onContactFieldChange={handleContactFieldChange}
                onContactSubmit={handleContactSubmit}
              />
            </div>
          </div>
        </div>

        <div className="fold fold-bottom">
          <div className="fold-align">
            <div data-fold-content="true" ref={bottomContentRef}>
              <HomeContent
                onNavigate={onNavigate}
                contactForm={contactForm}
                contactStatus={contactStatus}
                contactError={contactError}
                contactCooldownSeconds={contactCooldownSeconds}
                onContactFieldChange={handleContactFieldChange}
                onContactSubmit={handleContactSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectGallery = ({ media, title }: { media: ProjectMedia[]; title: string }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
          <figure className="gallery-slide" key={`${asset.src}-${index}`}>
            {asset.type === "video" ? (
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                src={asset.src}
                muted
                loop
                playsInline
                controls
                autoPlay={index === activeIndex}
                preload={index === activeIndex ? "auto" : "metadata"}
              />
            ) : (
              <img src={asset.src} alt={asset.alt} loading={index === 0 ? "eager" : "lazy"} />
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
  onNavigate,
}: {
  project: Project;
  onNavigate: (to: string) => void;
}) => {
  const moreProjects = useMemo(() => projects.filter((item) => item.id !== project.id).slice(0, 4), [project.id]);

  return (
    <div className="project-page">
      <main className="project-detail-main">
        <div className="project-detail-nav">
          <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
            Back to Projects
          </InternalLink>
        </div>

        <section className="project-detail-head">
          <div>
            <p className="project-detail-year">{project.year}</p>
            <h1 className="project-detail-title">{project.title}</h1>
          </div>
          <div className="project-detail-links">
            {project.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
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
        </section>

        <section className="project-more" id="more-projects">
          <h2 className="project-more-title">More Projects</h2>
          <hr />
          <ul className="project-lines">
            {moreProjects.map((item) => (
              <ProjectLine key={item.id} project={item} onNavigate={onNavigate} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

const ResumePage = ({ onNavigate }: { onNavigate: (to: string) => void }) => (
  <div className="project-page">
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
          <a href={RESUME_PATH} target="_blank" rel="noreferrer">
            Open PDF
          </a>
          <a href={RESUME_PATH} download>
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

const MissingProjectPage = ({ onNavigate }: { onNavigate: (to: string) => void }) => (
  <div className="project-page">
    <main className="project-detail-main">
      <h1 className="project-detail-title">Project not found</h1>
      <p>This project link is broken or the case study has moved.</p>
      <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
        Back to Projects
      </InternalLink>
    </main>
  </div>
);

const NotFoundPage = ({ onNavigate }: { onNavigate: (to: string) => void }) => (
  <div className="project-page">
    <main className="project-detail-main">
      <h1 className="project-detail-title">Page not found</h1>
      <p>This route does not exist.</p>
      <InternalLink to="/" onNavigate={onNavigate} className="project-nav-link">
        Back to Home
      </InternalLink>
    </main>
  </div>
);

function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.pathname));
  const resumePrintFrameRef = useRef<HTMLIFrameElement | null>(null);

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

  const navigate = useCallback((to: string) => {
    if (window.location.pathname === to) return;
    window.history.pushState({}, "", to);
    setRoute(parseRoute(to));
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    let nextHead: HeadMeta;
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      jobTitle: "Creative Technologist",
      email: "mailto:afergyy@gmail.com",
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
        nextHead = {
          title: `${project.title} | ${SITE_NAME}`,
          description: project.summary,
          canonicalPath: buildProjectPath(project.id),
          ogType: "article",
          robots: "index, follow",
        };
        upsertJsonLd("route", {
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
        });
      } else {
        nextHead = {
          title: `Project Not Found | ${SITE_NAME}`,
          description: SITE_DESCRIPTION,
          canonicalPath: "/",
          ogType: "website",
          robots: "noindex, nofollow",
        };
        removeJsonLd("route");
      }
    } else if (route.page === "resume") {
      nextHead = {
        title: `Resume | ${SITE_NAME}`,
        description: `Resume and experience overview for ${SITE_NAME}.`,
        canonicalPath: "/resume",
        ogType: "website",
        robots: "index, follow",
      };
      upsertJsonLd("route", {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: `${SITE_NAME} Resume`,
        url: `${SITE_ORIGIN}/resume`,
        mainEntity: {
          "@type": "Person",
          name: SITE_NAME,
          jobTitle: "Creative Technologist",
        },
      });
    } else if (route.page === "not-found") {
      nextHead = {
        title: `Page Not Found | ${SITE_NAME}`,
        description: "This page does not exist.",
        canonicalPath: "/",
        ogType: "website",
        robots: "noindex, nofollow",
      };
      removeJsonLd("route");
    } else {
      nextHead = {
        title: `${SITE_NAME} | Product Design & UI/UX`,
        description: SITE_DESCRIPTION,
        canonicalPath: "/",
        ogType: "website",
        robots: "index, follow",
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
    const onPopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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
    return <ProjectDetailPage project={project} onNavigate={navigate} />;
  }

  if (route.page === "resume") {
    return <ResumePage onNavigate={navigate} />;
  }

  if (route.page === "not-found") {
    return <NotFoundPage onNavigate={navigate} />;
  }

  return <CubeHome onNavigate={navigate} />;
}

export default App;
