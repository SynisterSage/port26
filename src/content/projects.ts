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
      "A clean golf club website refresh built around strong photography, easy booking paths, and clear membership info.",
    description:
      "I redesigned the public site experience to feel faster, cleaner, and easier to scan. The work focused on clearer booking paths, stronger hierarchy, and a photo-led visual tone.",
    media: [image("/images/projects/pgc-website/thumbnail.jpg", "PGC Website preview")],
    links: [{ label: "Live Site", url: "https://www.packanackgolfclub.com/" }],
  },
  {
    id: "overtone-app",
    title: "Overtone App",
    year: 2025,
    tier: "shortlist",
    tags: ["UI/UX", "Audio"],
    summary:
      "A mobile drum-tuning app with live frequency pickup, lock states, and a focused interface for studio and stage.",
    description:
      "Overtone is a product experience for drummers who need quick, readable tuning feedback. I centered the design around live pitch, lock behavior, and low-friction kit management.",
    media: [image("/images/projects/overtone/thumbnail.png", "Overtone app screens")],
    links: [{ label: "Open Prototype", url: "https://testapp-rust.vercel.app/login" }],
  },
  {
    id: "octone-ink",
    title: "Octone Ink",
    year: 2024,
    tier: "shortlist",
    tags: ["Brand", "Packaging"],
    summary:
      "A tattoo-ink identity system with packaging mockups and merch direction inspired by fluid, protective forms.",
    description:
      "This brand system explores bold marks and product-first packaging layouts. I developed naming, logo structure, and label direction to keep the identity expressive but production-ready.",
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
    summary: "A custom storefront for a technical streetwear brand with a flexible product system and fast UX.",
    description:
      "I designed and built a modern storefront that blends editorial brand presentation with clean product browsing. The platform supports ongoing growth with structured product and content workflows.",
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
      "A full mobile ordering redesign that simplifies flow from browse to checkout with a sharper component system.",
    description:
      "I rebuilt the experience to reduce friction in key ordering paths while keeping the interface visually consistent across screens. The prototype focuses on hierarchy, clarity, and faster task completion.",
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
      "I designed and shipped the core product flow from discovery to scoring and outbound actions. The interface balances dense information with clear next steps.",
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
      "A member and staff app system for tee sheets, events, and live on-course ordering with role-based views.",
    description:
      "This project unified member and staff workflows into a shared design language while preserving role-specific actions. I focused on clarity in high-traffic flows and live updates.",
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
      "A playful anti-corporate construction identity with bold color, modular marks, and motion-led brand moments.",
    description:
      "I built the visual language across logo studies, sticker-like compositions, and motion tests. The system is intentionally loud while still structured across digital and print.",
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
      "A custom type project developed from sketch to specimen with a geometric voice for posters and print.",
    description:
      "I built this typeface through iterative form and spacing studies, then applied it across specimen layouts and poster compositions to test expression and readability.",
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
      "A golf companion concept designed to surface real-time swing and course insights through a playful mobile UX.",
    description:
      "Tempo brings user research, system thinking, and interface craft into one focused mobile concept. The work centers on clarity under motion and confident decision support.",
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
    summary: "A publication study exploring the Adelle type family through editorial spreads and usage tests.",
    description:
      "I documented the type family through structured editorial layouts, weight studies, and specimen-style spreads. The project balances typographic history with practical application.",
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
    summary: "Two stop-motion shorts exploring rhythm and color progression through frame-by-frame storytelling.",
    description:
      "This series focuses on pacing, sequencing, and color rhythm across short motion pieces. Each film uses simple forms and controlled transitions to keep visual momentum.",
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
      "A Tokyo-inspired identity concept with a modular icon language and interface system built from transit cues.",
    description:
      "I translated urban wayfinding references into a brand and interface language that feels both expressive and systematic. The result blends cultural tone with digital usability.",
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
    summary: "A lighting and mood series using neon setups, reflections, and color contrast exploration.",
    description:
      "This photo study explores controlled color environments and reflective surfaces. The edits preserve vibrant highlights while keeping overall composition balanced and readable.",
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
    summary: "A vector reconstruction of Rechnitz Hall using geometric form, layered gradients, and architectural proportion.",
    description:
      "I rebuilt the space as a stylized yet accurate vector environment, focusing on structural rhythm and tonal depth through gradient systems and clean linework.",
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
      "I iterated on composition and color to keep the wordmark expressive but still legible in dense poster space. The final direction emphasizes print impact without visual clutter.",
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
      "This project reframes banknote design with portrait, texture, and symbolic systems inspired by music history. The result balances concept art energy with structured note layouts.",
    media: [image("/images/projects/currency-redesign/thumbnail.png", "Currency redesign concept")],
    links: [],
  },
  {
    id: "selfbranding",
    title: "Self Branding",
    year: 2024,
    tier: "archive",
    tags: ["Brand", "Identity"],
    summary: "A personal identity system built around a custom monogram and modular 8-point layout logic.",
    description:
      "I developed a flexible personal brand system designed to scale across print and digital contexts. The work focuses on consistency, spacing discipline, and recognizable signature forms.",
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
    summary: "A themed iOS widget and icon set with reusable components across multiple screen contexts.",
    description:
      "I designed a compact visual system for widgets and icons that stays readable at small sizes. The project centers on consistency, hierarchy, and playful theming.",
    media: [image("/images/projects/space-themed-widgets/thumbnail.png", "Space themed widgets preview")],
    links: [],
  },
  {
    id: "minimalist-poster",
    title: "Minimalist Poster",
    year: 2024,
    tier: "archive",
    tags: ["Poster", "Print"],
    summary: "A print-focused poster study using restrained typography, grain texture, and high-contrast composition.",
    description:
      "This poster explores how minimal forms and type blocks can carry strong visual weight. I refined the layout through print-aware contrast and texture tests.",
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
    summary: "A study series in charcoal and sanguine focused on gesture, value control, and tactile mark-making.",
    description:
      "These drawings investigate tone, texture, and structure through traditional materials. The work balances expressive gesture with careful form development.",
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
    summary: "A collage series combining analog textures with digital compositing and color balancing.",
    description:
      "I blended scanned physical materials with digital finishing to create textured compositions that feel both raw and controlled. The series focuses on color relationships and layering.",
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
      "A recipe-sharing app concept designed as a clean, reusable mobile system with interactive prototype flows.",
    description:
      "I focused on clarity in search, recipe viewing, and sharing flows while building reusable interface patterns in Figma. The concept is intentionally simple and social.",
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
      "I designed this concept around focused daily planning with minimal friction between task, reminder, and calendar contexts. The interface keeps hierarchy clear in a dark visual system.",
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
    summary: "A startup product effort covering interface direction, launch workflows, and fast iteration across teams.",
    description:
      "I led product and design direction for core internal tools, shaping interface patterns and workflows used by the team during rapid growth. The focus was speed and alignment.",
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
