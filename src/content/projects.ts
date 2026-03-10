import type { Project } from "../types";

const image = (src: string, alt: string) => ({ type: "image" as const, src, alt });
const video = (src: string, alt: string) => ({ type: "video" as const, src, alt });

export const projects: Project[] = [
  {
    id: "pgc-website",
    title: "PGC Website",
    year: 2025,
    tier: "shortlist",
    tags: ["Web", "Brand"],
    summary:
      "A golf club website refresh that makes booking, membership info, and seasonal updates faster to navigate.",
    description:
      "I redesigned the public site to reduce friction in booking and clarify membership content. I focused on hierarchy, photography direction, and cleaner page flow so members can find key info quickly. I mapped top user tasks first, then structured each section around those priorities.",
    media: [image("/images/projects/pgc-website/thumbnail.jpg", "PGC Website preview")],
    links: [{ label: "Live Site", url: "https://www.packanackgolfclub.com/" }],
  },
  {
    id: "overtone-app",
    title: "Overtone App",
    year: 2025,
    tier: "archive",
    tags: ["UI/UX", "Audio"],
    summary:
      "A mobile drum tuning app with live frequency pickup, lock states, and a studio to stage interface.",
    description:
      "I designed Overtone for drummers who need fast, readable feedback while tuning. I shaped the live pitch, lock, and kit flow to keep core actions quick under real use. I iterated the tuner states through quick prototypes so feedback stays clear at a glance.",
    media: [image("/images/projects/overtone/thumbnail.png", "Overtone app screens")],
    links: [{ label: "Open Prototype", url: "https://testapp-rust.vercel.app/login" }],
  },
  {
    id: "verity-protect",
    title: "Verity Protect",
    year: 2026,
    tier: "shortlist",
    tags: ["Mobile Development", "Brand", "Product"],
    summary:
      "A call-screening app that blocks fraud, lets family through, and reduces unknown-call stress.",
    description:
      "I handled Verity Protect end to end, including product direction, UX strategy, interface design, branding, development, and the videos shown here. AI only assisted with backend code support; the UX decisions, design system, and creative execution were mine. I focused the experience on clarity and reassurance so families can block fraud without missing real calls.",
    media: [
      image("/images/projects/verity-protect/thumbnail.webp", "Verity Protect cover"),
      image("/images/projects/verity-protect/gallery-1.webp", "Verity Protect screen one"),
      image("/images/projects/verity-protect/gallery-2.webp", "Verity Protect screen two"),
      image("/images/projects/verity-protect/gallery-3.webp", "Verity Protect screen three"),
      image("/images/projects/verity-protect/gallery-4.webp", "Verity Protect screen four"),
      image("/images/projects/verity-protect/gallery-5.webp", "Verity Protect screen five"),
      image("/images/projects/verity-protect/gallery-6.webp", "Verity Protect screen six"),
      image("/images/projects/verity-protect/gallery-7.webp", "Verity Protect screen seven"),
      video("/images/projects/verity-protect/gallery-8.mp4", "Verity Protect demo video"),
    ],
    links: [
      { label: "Website", url: "https://www.verityprotect.com/" },
      { label: "App Store", url: "https://apps.apple.com/us/app/verity-protect/id6759526773" },
    ],
  },
  {
    id: "octone-ink",
    title: "Octone Ink",
    year: 2024,
    tier: "shortlist",
    tags: ["Brand", "Packaging"],
    summary:
      "A tattoo ink brand system with packaging and merch direction built from fluid, protective forms.",
    description:
      "I developed the naming, mark structure, and label system for Octone Ink. The goal was expressive branding that still feels production ready across packaging and merchandise. I tested hierarchy across mockups to keep the system consistent on shelf and online.",
    media: [
      image("/images/projects/octone/thumbnail.png", "Octone Ink thumbnail"),
      image("/images/projects/octone/gallery-1.png", "Octone Ink gallery image one"),
      image("/images/projects/octone/gallery-2.png", "Octone Ink gallery image two"),
      image("/images/projects/octone/gallery-3.png", "Octone Ink gallery image three"),
    ],
    links: [],
  },
  {
    id: "wicked-works-shopify",
    title: "Wicked Works",
    year: 2026,
    tier: "archive",
    tags: ["E-commerce", "Full Stack"],
    summary: "A custom storefront for a technical streetwear brand, built for clear product discovery and scalable content.",
    description:
      "I designed and built the storefront to balance brand storytelling with direct product browsing. I structured the product and content system so the shop can grow without losing clarity. I audited navigation and merchandising patterns first, then built reusable page sections from that work.",
    media: [
      image("/images/projects/wicked-works-storefront/thumbnail.png", "Wicked Works storefront thumbnail"),
      image("/images/projects/wicked-works-storefront/gallery-1.png", "Wicked Works storefront gallery image one"),
      image("/images/projects/wicked-works-storefront/gallery-2.png", "Wicked Works storefront gallery image two"),
    ],
    links: [{ label: "Live Store", url: "https://wickedworks.store/" }],
  },
  {
    id: "dominos-redesign",
    title: "Dominos App Redesign",
    year: 2025,
    tier: "archive",
    tags: ["UI/UX", "App"],
    summary:
      "A mobile ordering redesign that streamlines the path from browse to checkout with a cleaner component system.",
    description:
      "I reworked key ordering flows to cut hesitation between menu, customization, and checkout. I focused on consistency, hierarchy, and faster decision making on mobile. I mapped the full path end to end before redesigning screens so each step stays predictable.",
    media: [image("/images/projects/dominos/thumbnail.jpg", "Dominos redesign preview")],
    links: [
      {
        label: "Open Prototype",
        url: "https://embed.figma.com/proto/dJgsXGf3LhAJuVZAnJyLqh/Dominos-Redesign-Main-File?node-id=108-916&p=f&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=108%3A914&embed-host=share",
      },
    ],
  },
  {
    id: "grid-lead",
    title: "GridLead",
    year: 2025,
    tier: "archive",
    tags: ["Product", "Full Stack"],
    summary:
      "A lead-generation platform that combines business discovery, automated audits, and outreach workflows.",
    description:
      "I designed and shipped the core flow from prospect discovery to scoring and outreach actions. The interface handles dense data while keeping next steps obvious. I prioritized actionable states so users can move from research to outreach without losing context.",
    media: [
      image("/images/projects/grid-lead/thumbnail.png", "GridLead thumbnail"),
      image("/images/projects/grid-lead/main.png", "GridLead dashboard preview"),
      image("/images/projects/grid-lead/gallery-1.png", "GridLead gallery image one"),
      image("/images/projects/grid-lead/gallery-2.png", "GridLead gallery image two"),
      image("/images/projects/grid-lead/gallery-3.png", "GridLead gallery image three"),
    ],
    links: [{ label: "Open GridLead", url: "https://gridlead.space/" }],
  },
  {
    id: "pgc-app",
    title: "PGC App",
    year: 2025,
    tier: "archive",
    tags: ["App", "Product"],
    summary:
      "A member and staff app for tee sheets, events, and live on course ordering with role based views.",
    description:
      "I unified member and staff workflows in one product while preserving role specific actions. I focused on high traffic paths, live updates, and readable UI under time pressure. I organized screens by role and scenario so staff speed and member clarity both hold up.",
    media: [
      image("/images/projects/pgc-app/thumbnail.png", "PGC App thumbnail"),
      video("/images/projects/pgc-app/gallery-1.mp4", "PGC App flow video one"),
      video("/images/projects/pgc-app/gallery-2.mp4", "PGC App flow video two"),
    ],
    links: [],
  },
  {
    id: "halfway-construction",
    title: "Halfway Construction",
    year: 2025,
    tier: "archive",
    tags: ["Brand", "Motion"],
    summary:
      "A construction identity with bold color, modular marks, and motion driven brand moments.",
    description:
      "I built the visual system through logo studies, poster compositions, and motion tests. The result is intentionally loud but still structured across web and print. I developed static and motion assets in parallel to keep one clear brand voice.",
    media: [
      image("/images/projects/halfway/main.gif", "Halfway Construction animated cover"),
      image("/images/projects/halfway/gallery-1.jpg", "Halfway Construction poster"),
      video("/images/projects/halfway/gallery-2.mp4", "Halfway Construction motion test one"),
      video("/images/projects/halfway/gallery-3.mp4", "Halfway Construction motion test two"),
    ],
    links: [
      {
        label: "Open Prototype",
        url: "https://embed.figma.com/proto/ApePTuZihCRpIRA2Jo39PP/Halfway-Construction-website?node-id=1-3&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=28%3A168&embed-host=share",
      },
    ],
  },
  {
    id: "velkro-type",
    title: "Velkro Type Creation",
    year: 2025,
    tier: "archive",
    tags: ["Typography", "Editorial"],
    summary:
      "A custom typeface developed from sketch to specimen, with a geometric voice for posters and print.",
    description:
      "I developed this typeface through iterative form and spacing studies, then applied it across specimen layouts and poster tests. The goal was expressive character with practical readability. I repeated print and screen checks to tune spacing, rhythm, and overall texture.",
    media: [
      image("/images/projects/velkro/thumbnail.jpg", "Velkro type thumbnail"),
      image("/images/projects/velkro/gallery-2.jpg", "Velkro type specimen page two"),
      image("/images/projects/velkro/gallery-1.jpg", "Velkro type specimen page one"),

    ],
    links: [{ label: "Download OTF", url: "/fonts/velkro.otf" }],
  },
  {
    id: "tempo",
    title: "Tempo",
    year: 2025,
    tier: "archive",
    tags: ["Product", "Mobile"],
    summary:
      "A golf companion concept that surfaces real time swing and course insight through a focused mobile UX.",
    description:
      "I combined user research, system thinking, and interface design into a mobile concept for in round decisions. I prioritized clarity under motion and quick read feedback. I storyboarded key moments first, then built interface states around those decisions.",
    media: [image("/images/projects/tempo/thumbnail.png", "Tempo mobile app preview")],
    links: [
      {
        label: "Open Prototype",
        url: "https://embed.figma.com/proto/0DtNFQehR40PBvAKV7wGmv/Final-Project-GD3?node-id=203-1111&p=f&scaling=scale-down&content-scaling=fixed&page-id=203%3A2&starting-point-node-id=203%3A1102&embed-host=share",
      },
    ],
  },
  {
    id: "adelle-study",
    title: "Adelle Font Study",
    year: 2025,
    tier: "archive",
    tags: ["Typography", "Publication"],
    summary: "A publication study of the Adelle type family through editorial spreads and usage tests.",
    description:
      "I documented Adelle through structured layouts, weight comparisons, and specimen style pages. I aimed to balance typographic context with practical application. I sequenced the spreads as a narrative so each page builds on the last.",
    media: [
      image("/images/projects/adelle/thumbnail.jpg", "Adelle study cover"),
      image("/images/projects/adelle/gallery-1.jpg", "Adelle study spread one"),
      image("/images/projects/adelle/gallery-2.jpg", "Adelle study spread two"),
    ],
    links: [],
  },
  {
    id: "stop-motion",
    title: "Stop Motion Color Project",
    year: 2024,
    tier: "archive",
    tags: ["Motion", "Color"],
    summary: "Two stop motion shorts exploring rhythm and color progression through frame by frame storytelling.",
    description:
      "I developed these films around pacing, sequencing, and color rhythm across short loops. Each piece uses simple forms and controlled transitions to keep momentum clear. I planned timing and color passes before capture so the final edits feel intentional.",
    media: [
      image("/images/projects/stopmotion/thumbnail.jpg", "Stop motion project thumbnail"),
      video("/images/projects/stopmotion/gallery-1.mp4", "Stop motion short one"),
      video("/images/projects/stopmotion/gallary-2.mp4", "Stop motion short two"),
    ],
    links: [],
  },
  {
    id: "city-scapes",
    title: "City Scapes",
    year: 2024,
    tier: "archive",
    tags: ["Brand", "UI/UX"],
    summary:
      "A Tokyo inspired identity concept with a modular icon language and interface system informed by transit cues.",
    description:
      "I translated wayfinding references into a brand and UI language that feels expressive and systematic. The system balances cultural tone with digital usability. I set icon and layout rules early so the system could scale cleanly.",
    media: [
      image("/images/projects/city-scapes/thumbnail.jpg", "City Scapes thumbnail"),
      image("/images/projects/city-scapes/gallery-1.jpg", "City Scapes gallery image one"),
      image("/images/projects/city-scapes/gallery-2.jpg", "City Scapes gallery image two"),
      image("/images/projects/city-scapes/gallery-3.jpg", "City Scapes gallery image three"),
    ],
    links: [],
  },
  {
    id: "neon-photo",
    title: "Neon Photography",
    year: 2024,
    tier: "archive",
    tags: ["Photography", "Lighting"],
    summary: "A photography series exploring neon lighting, reflections, and high contrast color control.",
    description:
      "I explored controlled color environments and reflective surfaces through staged shoots and edits. I preserved highlight intensity while keeping composition clean. I shot and graded in passes to dial in color without losing detail.",
    media: [
      image("/images/projects/neon-photo/thumbnail.jpg", "Neon photography thumbnail"),
      image("/images/projects/neon-photo/gallery-1.jpg", "Neon photography image one"),
      image("/images/projects/neon-photo/gallery-2.jpg", "Neon photography image two"),
      image("/images/projects/neon-photo/gallery-3.jpg", "Neon photography image three"),
    ],
    links: [],
  },
  {
    id: "room-illustration",
    title: "Room Illustration",
    year: 2024,
    tier: "archive",
    tags: ["Illustration", "Vector"],
    summary: "A vector reconstruction of Rechnitz Hall using geometric form, gradients, and architectural proportion.",
    description:
      "I rebuilt the space as a stylized but accurate vector scene, focusing on structure, depth, and tone. The piece relies on clean linework and controlled gradient systems. I blocked major forms first, then refined proportion and surface depth.",
    media: [
      image("/images/projects/room-illsutration/thumbnail.png", "Room illustration thumbnail"),
      image("/images/projects/room-illsutration/gallery-1.jpg", "Room illustration artwork"),
    ],
    links: [],
  },
  {
    id: "sunscape-poster",
    title: "Sunscape Poster",
    year: 2024,
    tier: "archive",
    tags: ["Poster", "Typography"],
    summary: "A concert poster concept with layered gradients and a psychedelic wordmark system.",
    description:
      "I iterated on composition and color to keep the wordmark expressive and legible in dense poster space. The final direction pushes print impact without excess clutter. I ran multiple layout passes to balance expression with readability at distance.",
    media: [image("/images/projects/sunscape-poster/thumbnail.png", "Sunscape poster design")],
    links: [],
  },
  {
    id: "currency-redesign",
    title: "Currency Redesign",
    year: 2024,
    tier: "archive",
    tags: ["Illustration", "Concept"],
    summary: "A concept study reimagining U.S. currency through guitar culture and collectible visual language.",
    description:
      "I reframed banknote design with portraits, textures, and symbols inspired by music history. The layouts balance conceptual energy with structured note conventions. I sketched denomination structure early to keep the concept grounded in familiar logic.",
    media: [image("/images/projects/currency-redesign/thumbnail.png", "Currency redesign concept")],
    links: [],
  },
  {
    id: "selfbranding",
    title: "Self Branding",
    year: 2024,
    tier: "archive",
    tags: ["Brand", "Identity"],
    summary: "A personal identity system built around a custom monogram and modular eight point layout logic.",
    description:
      "I developed a flexible personal brand that scales across digital and print contexts. I focused on spacing discipline, consistency, and a recognizable signature form. I built the rule set first, then pressure tested it across real touchpoints.",
    media: [
      image("/images/projects/self-branding/thumbnail.svg", "Self branding mark"),
      image("/images/projects/self-branding/main.jpg", "Self branding hero"),
      image("/images/projects/self-branding/gallery-1.jpg", "Self branding application one"),
      image("/images/projects/self-branding/gallery-2.jpg", "Self branding application two"),
    ],
    links: [],
  },
  {
    id: "space-widgets",
    title: "Space Themed App Widgets",
    year: 2024,
    tier: "archive",
    tags: ["Product", "Icon System"],
    summary: "An iOS widget and icon set with reusable components across multiple screen contexts.",
    description:
      "I designed a compact widget and icon system that stays readable at small sizes. The work centers on consistency, hierarchy, and playful utility. I validated legibility at actual device scale before expanding the set.",
    media: [image("/images/projects/space-themed-widgets/thumbnail.png", "Space themed widgets preview")],
    links: [],
  },
  {
    id: "minimalist-poster",
    title: "Minimalist Poster",
    year: 2024,
    tier: "archive",
    tags: ["Poster", "Print"],
    summary: "A print focused poster study using restrained typography, grain texture, and high contrast composition.",
    description:
      "I explored how minimal forms and type blocks can still carry strong visual weight. I refined contrast, spacing, and texture through print aware tests. I iterated proofs to tune material feel before final output.",
    media: [
      image("/images/projects/minimalist-poster/thumbnail.jpg", "Minimalist poster thumbnail"),
      image("/images/projects/minimalist-poster/main.jpg", "Minimalist poster final"),
    ],
    links: [],
  },
  {
    id: "charcole",
    title: "Charcole",
    year: 2024,
    tier: "archive",
    tags: ["Illustration", "Drawing"],
    summary: "A charcoal and sanguine drawing series focused on gesture, value control, and tactile mark making.",
    description:
      "I used traditional materials to study tone, structure, and surface texture. The series balances expressive gesture with careful form development. I started with short studies, then carried the strongest forms into finished pieces.",
    media: [
      image("/images/projects/charcole/thumbnail.jpg", "Charcole drawing thumbnail"),
      image("/images/projects/charcole/main.jpg", "Charcole main drawing"),
      image("/images/projects/charcole/gallery-1.jpg", "Charcole drawing one"),
      image("/images/projects/charcole/gallery-2.jpg", "Charcole drawing two"),
    ],
    links: [],
  },
  {
    id: "color-collages",
    title: "Color Collages",
    year: 2023,
    tier: "archive",
    tags: ["Mixed Media", "Graphic"],
    summary: "A collage series combining analog texture with digital compositing and color balancing.",
    description:
      "I combined scanned physical materials with digital finishing to build compositions that feel raw but controlled. The work focuses on layering and color relationships. I built each piece in stages and tuned color late in the process.",
    media: [
      image("/images/projects/color-collages/thumbnail.jpg", "Color collage thumbnail"),
      image("/images/projects/color-collages/gallery-1.jpg", "Color collage artwork"),
    ],
    links: [],
  },
  {
    id: "squisito",
    title: "Squisito",
    year: 2023,
    tier: "archive",
    tags: ["UI/UX", "Prototype"],
    summary:
      "A recipe sharing app concept designed as a clean mobile system with reusable flows.",
    description:
      "I designed search, recipe, and sharing flows with clarity as the priority, then built reusable patterns in Figma. The concept keeps the social layer simple and lightweight. I started from user tasks and content priorities before polishing visuals.",
    media: [
      image("/images/projects/squisito/thumbnail.jpg", "Squisito thumbnail"),
      image("/images/projects/squisito/gallery-1.jpg", "Squisito gallery image one"),
      image("/images/projects/squisito/gallery-2.jpg", "Squisito gallery image two"),
    ],
    links: [
      {
        label: "Open Prototype",
        url: "https://embed.figma.com/proto/2ZRtnCoyDoQAiYCT3hL73i/Untitled?node-id=0-525&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=0%3A524&embed-host=share",
      },
    ],
  },
  {
    id: "trackerapp",
    title: "Tracker App",
    year: 2022,
    tier: "archive",
    tags: ["UI/UX", "Productivity"],
    summary: "A dark-mode productivity app concept for tasks, reminders, and schedule planning in one flow.",
    description:
      "I designed this concept around focused daily planning with minimal switching between contexts. The interface keeps hierarchy clear in a dark visual system. I mapped daily routines first so navigation follows real planning behavior.",
    media: [
      image("/images/projects/tracker-app/thumbnail.svg", "Tracker app thumbnail"),
      image("/images/projects/tracker-app/gallery-1.svg", "Tracker app screen one"),
      image("/images/projects/tracker-app/gallery-2.svg", "Tracker app screen two"),
    ],
    links: [],
  },
  {
    id: "sageaio",
    title: "SageAIO",
    year: 2022,
    tier: "archive",
    tags: ["Founder", "Product"],
    summary: "A startup product effort spanning interface direction, launch workflows, and fast cross team iteration.",
    description:
      "I led product and design direction for internal tools during a fast growth phase. I defined interface patterns and workflows that helped the team move quickly with alignment. I ran tight review loops with the team so decisions stayed practical and shippable.",
    media: [
      image("/images/projects/sageaio/thumbnail.jpg", "SageAIO thumbnail"),
      image("/images/projects/sageaio/gallery-1.jpg", "SageAIO gallery image one"),
      image("/images/projects/sageaio/gallery-2.jpg", "SageAIO gallery image two"),
      image("/images/projects/sageaio/gallery-3.jpg", "SageAIO gallery image three"),
      image("/images/projects/sageaio/gallery-4.jpg", "SageAIO gallery image four"),
    ],
    links: [],
  },
];
