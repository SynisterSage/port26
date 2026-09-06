import type { Project } from "../types";

const image = (src: string, alt: string) => ({ type: "image" as const, src, alt });
const video = (src: string, alt: string) => ({ type: "video" as const, src, alt });
const embed = (src: string, alt: string) => ({ type: "embed" as const, src, alt });

export const projects: Project[] = [
  {
    id: "pgc-website",
    title: "PGC Website",
    year: 2025,
    tier: "shortlist",
    tags: ["Web", "Brand"],
    tools: ["HTML", "CSS", "JavaScript", "SEO"],
    summary:
      "A three-week website redesign that turned an outdated, non-responsive golf club site into a clearer sales and service experience for prospective members, golfers, and event customers.",
    description:
      "I redesigned and rebuilt Packanack Golf Club's website as a contracted workplace project, working independently across strategy, UX, visual design, photography, drone production, SEO, frontend development, and deployment. The previous site was outdated, failed across multiple breakpoints, and did not clearly support the club's key business areas, including memberships, golf lessons, restaurant and catering services, and events. Within a five-week project window, I completed three weeks of focused design and development work, reworking every page, removing unnecessary content, and improving the site's SEO foundation to create a shorter, clearer path through the experience. Because the existing site ran through a cPanel structure rather than my usual React and Vercel workflow, I also adapted to a more constrained HTML/CSS implementation and deployment environment. I created original course photography and drone footage, then designed the hole-by-hole course pages as a visual and technical centerpiece. The new site now receives more than 1,500 monthly views compared with roughly 500 previously, a growth the improved content structure and SEO work helped support. It also supports membership inquiry forms that did not exist before and has contributed to new membership and catering interest after launch.",
    media: [
      image("/images/projects/pgc-website/thumbnail.jpg", "PGC Website preview"),
      embed("https://www.packanackgolfclub.com/", "Packanack Golf Club live website embed"),
    ],
    links: [{ label: "Live Site", url: "https://www.packanackgolfclub.com/" }],
  },
  {
    id: "overtone-app",
    title: "Overtone App",
    year: 2025,
    tier: "archive",
    tags: ["UI/UX", "Audio"],
    tools: ["React", "Vercel"],
    summary:
      "A mobile-first drum tuner web app designed to deliver faster live feedback with a cleaner, more usable interface.",
    description:
      "I designed and built Overtone as a mobile-first tuner for drummers who need fast feedback during setup and practice. I led the product direction, UI design, and React implementation, then shipped it as a live web app on Vercel. The interface was kept intentionally simple so the core tuning actions stay visible and readable on smaller screens, resulting in a quicker and less cluttered tuning experience.",
    media: [image("/images/projects/overtone/thumbnail.png", "Overtone app screens")],
    links: [{ label: "Open Prototype", url: "https://testapp-rust.vercel.app/login" }],
  },
  {
    id: "verity-protect",
    title: "Verity Protect",
    year: 2026,
    tier: "shortlist",
    tags: ["Mobile Development", "Brand", "Product"],
    tools: ["React Native", "Supabase", "Render", "Twilio"],
    summary:
      "An independently built call-screening product that gives older adults and caregivers a simpler, harder barrier against scam calls.",
    description:
      `I created Verity Protect as a personal startup and passion project after my grandmother was personally scammed by a phone call. Existing spam blockers did not provide the hard barrier I was looking for, so I designed and built a call-screening system for older adults, caregivers, and family members setting up protection for someone else. I worked independently across product strategy, UX, UI, branding, marketing, frontend, backend, and launch, using Figma to make the design decisions and Codex as an implementation partner. The design direction, interaction logic, and accessibility choices remained mine throughout.

      The core experience lets a user create a PIN and add trusted people through the native contact picker. Trusted callers are recognized and connected without friction, while unknown callers are required to pass the PIN before reaching the user. An optional hard-block mode allows only trusted contacts through. To avoid blocking legitimate calls from doctors and other professionals, I also added an allowlist for medical and other trusted phone numbers. Caregivers can review messages left by callers who failed the screening step, while connected-call recordings are not retained, keeping the system useful without creating unnecessary privacy exposure.

      I designed the onboarding and controls around low cognitive load, readable screens, clear status information, and Apple platform conventions, with accessibility-informed decisions throughout. The most difficult technical challenge was learning VoIP call bridging and building the Twilio flow reliably across many moving parts, including onboarding, trusted-contact routing, alerts, blocked contacts, message handling, and caregiver access. The app is live and stable on iOS, has been used by my grandmother for more than eight months, and has reached over 100 installs, 20 active protected users, and more than 400 screened calls.`,
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
    id: "wayne-nj-real-estate",
    title: "Wayne NJ Real Estate",
    year: 2026,
    tier: "shortlist",
    tags: ["Web", "Brand", "CMS", "SEO"],
    tools: ["Figma", "React", "HTML/CSS/JS", "Vercel", "CMS"],
    summary:
      "A contracted real estate website redesign that replaced a Squarespace site with a cleaner, CMS-backed experience built from scratch.",
    description:
      "I redesigned this real estate site as a contracted project and carried it from discovery through launch. The previous Squarespace site had weak flow, unclear calls to action, and a look that did not match the brand, so I led prep, research, moodboards, design system work, wireframes, revisions, implementation, and deployment. I built the site from scratch with a CMS-backed blog, handled photography, SEO, analytics, and hosting migration, and shaped the visual direction to feel clean, editorial, warm, and professional. The result was a fresher site with clearer navigation, stronger branding, and better engagement after launch.",
    media: [
      image("/images/projects/wayne-nj-realestate/thumbnail.jpg", "Wayne NJ Real Estate thumbnail"),
      embed("https://www.waynenjrealestate.com/", "Wayne NJ Real Estate live website embed"),
    ],
    links: [{ label: "Live Site", url: "https://www.waynenjrealestate.com/" }],
  },
  {
    id: "phase-shift",
    title: "Phase Shift",
    year: 2026,
    tier: "archive",
    tags: ["Poster", "Digital Imaging", "Typography", "Event Poster"],
    tools: ["Photoshop"],
    summary:
      "An experimental event poster exploring compositing, expressive typography, and controlled vintage color treatment.",
    description:
      "I designed Phase Shift in Photoshop as a poster study focused on layout energy, compositing control, and type-led communication. I owned concept, art direction, and final execution, using grain, blur, and texture to build a nostalgic look without losing legibility. The project pushed me to balance expressive effects with clear information hierarchy so the poster still reads quickly. I iterated on color and contrast to preserve mood while keeping typography crisp at a distance. The outcome was a complete poster direction that balances experimental visuals with strong readability.",
    media: [
      image("/images/projects/phase-shift/thumbnail.webp", "Phase Shift poster thumbnail"),
      image("/images/projects/phase-shift/gallery-1.webp", "Phase Shift event poster final"),
    ],
    links: [],
  },
  {
    id: "year-of-the-horse",
    title: "Year of the Horse",
    year: 2026,
    tier: "archive",
    tags: ["Motion", "Poster", "Digital Imaging"],
    tools: ["Photoshop"],
    summary:
      "An animated poster series using motion, silkscreen-inspired texture, and high-contrast color to create a stronger visual narrative.",
    description:
      "I created Year of the Horse as a self-directed animated poster series to explore motion as a communication layer, not just decoration. I led concept, visual direction, and animation, combining blue-and-white contrast, layered texture, and negative space for stronger focus. Each composition was designed to work as both a still and a motion state, so the narrative remains clear across formats. I used short, deliberate movement timing to guide the eye without overpowering the layout. The outcome was a multi-frame poster system that captures attention quickly and rewards deeper visual inspection.",
    media: [
      video("/images/projects/year-of-the-horse/thumbnail.mp4", "Year of the Horse animated poster"),
      image("/images/projects/year-of-the-horse/gallery-1.webp", "Year of the Horse composition one"),
      image("/images/projects/year-of-the-horse/gallery-2.webp", "Year of the Horse composition two"),
      image("/images/projects/year-of-the-horse/gallery-3.webp", "Year of the Horse composition three"),
    ],
    links: [],
  },
  {
    id: "octone-ink",
    title: "Octone Ink",
    year: 2024,
    tier: "archive",
    tags: ["Brand", "Packaging"],
    tools: ["Illustrator"],
    summary:
      "A fictional ink-brand identity project covering naming, logo system, and packaging applications.",
    description:
      "I built Octone Ink as a full identity exercise for a fictional product company, from naming through packaging. I led logo design, label architecture, and supporting brand applications in Illustrator. The system was designed to feel expressive while still maintaining repeatable rules across multiple packaging formats. I focused on hierarchy, label readability, and mark consistency so each asset feels related without looking duplicated. The outcome was a cohesive brand direction that carries personality while staying structured in real product contexts.",
    media: [
      image("/images/projects/octone/thumbnail.png", "Octone Ink thumbnail"),
      image("/images/projects/octone/gallery-3.png", "Octone Ink gallery image one"),
      image("/images/projects/octone/gallery-2.png", "Octone Ink gallery image two"),
      image("/images/projects/octone/gallery-1.png", "Octone Ink gallery image three"),
    ],
    links: [],
  },
  {
    id: "dominos-redesign",
    title: "Dominos App Redesign",
    year: 2025,
    tier: "shortlist",
    tags: ["UI/UX", "App"],
    tools: ["Figma"],
    summary:
      "A UI/UX redesign focused on reducing checkout friction, modernizing visual direction, and streamlining the core pizza-ordering journey.",
    description:
      "I redesigned Domino's mobile experience to remove clutter and make checkout feel faster. After mapping the original flow, I restructured the ordering journey, refreshed the visual system, and prototyped the revised screens in Figma across about 14 core pages. The work focused on clearer hierarchy, stronger brand consistency, and a shorter path to checkout, cutting friction without losing recognition.",
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
    tools: ["React"],
    summary:
      "A private lead-finding platform that turns prospect research into a faster, more actionable outreach workflow.",
    description:
      "I designed and built GridLead as an internal product to speed up prospect discovery and outreach planning. I owned UX, UI, and implementation, shaping a cleaner React interface for turning scattered research into clear next actions. The product was structured around reducing context switching between lead research and outreach prep. I focused on simplifying how data is reviewed so users can move from discovery to action faster. Although the project is no longer active, it shipped as a complete workflow tool and proved my approach to practical, utility-first product design.",
    media: [
      image("/images/projects/grid-lead/thumbnail.png", "GridLead thumbnail"),
      image("/images/projects/grid-lead/main.png", "GridLead dashboard preview"),
      image("/images/projects/grid-lead/gallery-1.png", "GridLead gallery image one"),
      image("/images/projects/grid-lead/gallery-2.png", "GridLead gallery image two"),
      image("/images/projects/grid-lead/gallery-3.png", "GridLead gallery image three"),
    ],
    links: [],
  },
  {
    id: "pgc-app",
    title: "PGC App",
    year: 2025,
    tier: "archive",
    tags: ["App", "Product"],
    tools: ["React Native"],
    summary:
      "A React Native companion app for golf-club members and staff covering bookings, events, food ordering, and updates.",
    description:
      "I built the PGC App as a React Native companion for roughly 300 active members and staff. I led product design and implementation, covering tee-time booking, event reservations, food ordering, and course communication in one role-aware experience. I structured key flows to minimize taps and reduce confusion between member-facing and staff-facing actions. The interface was designed to keep recurring tasks fast, especially during peak operational hours. The outcome was a clearer operational system with fewer handoff gaps between front-of-house, kitchen, and course updates.",
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
    tools: ["Figma", "After Effects", "Illustrator"],
    summary:
      "A satirical construction brand system spanning identity, motion ads, packaging, and landing-page concept work.",
    description:
      "I developed Halfway Construction as an end-to-end brand exercise with a deliberately satirical tone. I led identity design, poster direction, packaging, social and video ads, and a landing-page prototype using Figma, After Effects, and Illustrator. The challenge was keeping the concept playful while maintaining enough structure for system-level consistency. I built reusable visual rules so the campaign remained recognizable across print, motion, and web outputs. The outcome was a cohesive cross-channel brand system with a clear voice and consistent execution.",
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
    tools: ["Illustrator"],
    summary:
      "A modular typeface project extended into a poster and editorial layout system.",
    description:
      "I designed Velkro as a modular typeface and tested it across real editorial contexts instead of isolated glyph sheets. I led type construction, specimen direction, poster application, and book-layout integration in Illustrator. The project focused on proving that the letterform system could scale from character design into full-page composition. I refined spacing and rhythm to keep the type expressive while still usable in practical layouts. The outcome was a complete type-led system with a downloadable OTF and multi-format proof of use.",
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
    tier: "shortlist",
    tags: ["Product", "Mobile"],
    tools: ["Figma", "Illustrator"],
    summary:
      "A mobile-first AI golf companion concept designed as a \"caddy in your pocket,\" combining live guidance, shot planning, and score tracking for everyday golfers.",
    description:
      "I designed Tempo as a mobile-first golf companion concept to make on-course decision-making easier, especially for beginner golfers. Over three weeks, I led product direction, brand identity, design system decisions, UX architecture, UI design, and a high-fidelity prototype across roughly 20 screens. The concept combines score tracking, shot planning, and contextual guidance into one system, with an implementation path already mapped for React Native. The result is a complete product concept that feels build-ready instead of purely speculative.",
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
    tools: ["InDesign"],
    summary: "A typography class study of Adelle through black-and-white and color editorial layouts.",
    description:
      "Created for a university typography course, this project explored Adelle through two editorial directions: one monochrome and one color-led. I focused on hierarchy, spacing, and pacing so each spread supports readability without flattening personality. I led layout composition and style direction in InDesign, treating the work as both a type study and a publication design system. The project helped me sharpen decisions around contrast, rhythm, and type-image balance. The outcome was a stronger editorial framework grounded in typographic control.",
    media: [
      image("/images/projects/adelle/thumbnail.jpg", "Adelle study cover"),
      image("/images/projects/adelle/gallery-2.jpg", "Adelle study spread one"),
      image("/images/projects/adelle/gallery-1.jpg", "Adelle study spread two"),
    ],
    links: [],
  },
  {
    id: "stop-motion",
    title: "Stop Motion Color Project",
    year: 2024,
    tier: "archive",
    tags: ["Motion", "Color"],
    summary: "Two frame-by-frame class animations exploring motion, timing, and color through simple forms.",
    description:
      "This project includes two short frame-by-frame animations created to study how motion and color interact. I focused on timing, sequencing, and transition clarity rather than narrative complexity. Keeping the forms simple allowed me to test movement principles with less visual noise. I iterated rhythm and spacing to improve perceived motion quality between frames. The outcome was a stronger foundation in motion pacing and visual continuity.",
    media: [
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
    tools: ["Illustrator", "Figma"],
    summary:
      "A Tokyo-inspired identity and wayfinding project built through badges, UI, banners, and postcards.",
    description:
      "City Scapes is a city-identity and wayfinding concept built around Tokyo as the source context. I designed a cohesive system across badges, banners, postcards, and a supporting UI wayfinding concept. The project focused on balancing visual character with practical navigation cues. I used Illustrator and Figma to keep brand expression and interface behavior aligned. The outcome was a multi-surface identity system that feels atmospheric while still functionally clear.",
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
    tools: ["DSLR", "Lightroom"],
    summary: "A digital photography series using real neon tubes and glass reflections to create depth and nostalgia.",
    description:
      "Created for a digital photography course, this series explores neon lighting through close-up compositions and glass reflections. I shot with a DSLR and handled color and tonal finishing in Lightroom. The core goal was to preserve glow intensity while maintaining detail and mood. I iterated framing and exposure to strengthen depth and atmosphere across the set. The outcome was a cohesive photo series with consistent nostalgic tone and stronger lighting control.",
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
    tools: ["Illustrator"],
    summary: "A vector illustration of Rechnitz Hall focused on proportion, gradients, and spatial depth.",
    description:
      "This vector illustration translates a real Rechnitz Hall interior into a controlled, stylized scene. I led the full construction in Illustrator, focusing on proportion, layered depth, and gradient-driven lighting. The project emphasized spatial clarity without relying on photoreal rendering. I refined geometry and tonal transitions to keep the composition clean but dimensional. The outcome was a stronger approach to environmental illustration with better structural discipline.",
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
    tools: ["Illustrator"],
    summary: "A class poster concept balancing expressive type with a more minimal composition and color system.",
    description:
      "Sunscape Poster explores how to build expressive concert visuals through restrained composition. I focused on type, color, and spacing to carry impact without overloading the layout. The project was designed as a control exercise in doing more with fewer elements. I iterated hierarchy and negative space to improve clarity at first glance. The outcome was a cleaner poster direction that still feels energetic and memorable.",
    media: [image("/images/projects/sunscape-poster/thumbnail.png", "Sunscape poster design")],
    links: [],
  },
  {
    id: "currency-redesign",
    title: "Currency Redesign",
    year: 2024,
    tier: "archive",
    tags: ["Illustration", "Concept"],
    tools: ["Illustrator"],
    summary: "A Fender-themed redesign of U.S. currency built as a full bill set with music-inspired details.",
    description:
      "This concept reimagines U.S. currency through Fender-inspired visual language and music culture references. I designed a full bill set and companion poster in Illustrator, including microprint-style details, emblems, serial logic, and portrait treatment. The project focused on balancing expressive thematic elements with the precision of real banknote structure. I used hierarchy and pattern control to keep each denomination distinct but system-consistent. The outcome was a complete speculative currency system with strong thematic coherence.",
    media: [image("/images/projects/currency-redesign/thumbnail.png", "Currency redesign concept")],
    links: [],
  },
  {
    id: "selfbranding",
    title: "Self Branding",
    year: 2024,
    tier: "archive",
    tags: ["Brand", "Identity"],
    tools: ["Illustrator"],
    summary: "A personal identity system built around a custom monogram and an eight-point layout structure.",
    description:
      "I built this personal identity system around a custom monogram and an eight-point layout logic. I led mark design, layout rules, and application testing across apparel, business card, and ad formats. The project focused on making a personal brand feel consistent without becoming visually repetitive. I refined spacing and alignment behavior so the system could scale across different media sizes. The outcome was a repeatable personal brand framework with clear structure and flexibility.",
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
    tools: ["Figma"],
    summary: "A space-themed widget and icon system designed for small-screen clarity and reusable UI components.",
    description:
      "This project explores how far a compact UI system can scale through space-themed widgets and icon sets. I designed reusable components in Figma with a focus on readability at small sizes. The challenge was balancing visual personality with functional clarity in constrained surfaces. I standardized spacing, icon rhythm, and color behavior to improve consistency across modules. The outcome was a reusable small-screen system with stronger component discipline.",
    media: [image("/images/projects/space-themed-widgets/thumbnail.png", "Space themed widgets preview")],
    links: [],
  },
  {
    id: "minimalist-poster",
    title: "Minimalist Poster",
    year: 2024,
    tier: "archive",
    tags: ["Poster", "Print"],
    tools: ["Illustrator"],
    summary: "A minimalist poster for Whiplash built with flat shapes, reduced color, and a restrained print feel.",
    description:
      "This poster reinterprets Whiplash through a minimal visual language rather than literal scene depiction. I led concept and execution in Illustrator using flat shapes, reduced color, and restrained composition. The design focus was translating intensity through hierarchy instead of detail overload. I iterated balance and contrast to keep the piece readable while preserving emotional tension. The outcome was a concise poster direction that communicates mood with fewer elements.",
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
    tools: ["Charcoal", "Sanguine"],
    summary: "Selected drawing-class works in charcoal and sanguine, from figure studies to portraits and still life.",
    description:
      "This project collects selected drawing studies in charcoal and sanguine across figure, portrait, and still-life work. I focused on classical rendering principles, especially value control, edge handling, and form construction. The exercises strengthened how I think about light, volume, and depth before moving into digital workflows. I treated each piece as a structural study rather than purely aesthetic output. The outcome was stronger foundational draftsmanship that directly improved my digital composition and shading decisions.",
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
    tools: ["Photoshop"],
    summary: "Three space-themed digital collages built from scanned media and composed to tell a visual story.",
    description:
      "Color Collages is a three-piece digital series built from scanned source material and Photoshop compositing. I directed a space-themed narrative and focused on connecting each composition through tone and structure. The main challenge was preserving variation across pieces while maintaining series-level cohesion. I iterated layering, contrast, and focal hierarchy to keep each collage distinct but related. The outcome was a tighter visual story arc across all three compositions.",
    media: [
      image("/images/projects/color-collages/thumbnail.jpg", "Color collage thumbnail"),
      image("/images/projects/color-collages/gallery-1.jpg", "Color collage artwork"),
    ],
    links: [],
  },
  {
    id: "replica-collages",
    title: "Replica Collages",
    year: 2026,
    tier: "archive",
    tags: ["Mixed Media", "Digital Imaging"],
    tools: ["Photoshop"],
    summary:
      "A three-part collage series about chasing the idea of something better and losing the present.",
    description:
      "I created Replica Collages as a three-part narrative series exploring fixation, loss of perspective, and return to reality. I led concept writing, composition, and visual treatment, using sepia direction, overexposure, and scanned mixed-media assets. Each frame was designed to advance the same narrative while preserving a consistent visual language. I refined progression cues so the emotional shift reads clearly from first image to last. The outcome was a cohesive three-image story arc with stronger continuity and pacing.",
    media: [
      image("/images/projects/replica-collages/thumbnail.webp", "Replica Collages composition one"),
      image("/images/projects/replica-collages/gallery-1.webp", "Replica Collages composition two"),
      image("/images/projects/replica-collages/gallery-2.webp", "Replica Collages composition three"),
    ],
    links: [],
  },
  {
    id: "silkscreen-prints",
    title: "Silkscreen Prints",
    year: 2026,
    tier: "archive",
    tags: ["Print", "Mixed Media"],
    tools: ["Photoshop", "Illustrator", "Silkscreen"],
    summary:
      "A silkscreen print study focused on translating layered digital compositions into physical print outcomes.",
    description:
      "I used this project to bridge digital composition and physical print production through silkscreen workflows. I led image development in Photoshop and Illustrator, then translated layered files into print-ready separations and studio outputs. The process focused on how color shifts, layering order, and texture change meaning in physical media. I iterated print decisions to improve hierarchy and tonal control across the full set. The outcome was an eight-piece print series that strengthened my material-based design judgment.",
    media: [
      image("/images/projects/silkscreen-prints/thumbnail.webp", "Silkscreen Prints cover"),
      image("/images/projects/silkscreen-prints/gallery-1.webp", "Silkscreen Prints detail one"),
      image("/images/projects/silkscreen-prints/gallery-2.webp", "Silkscreen Prints detail two"),
      image("/images/projects/silkscreen-prints/gallery-3.webp", "Silkscreen Prints detail three"),
      image("/images/projects/silkscreen-prints/gallery-4.webp", "Silkscreen Prints detail four"),
      image("/images/projects/silkscreen-prints/gallery-5.webp", "Silkscreen Prints detail five"),
      image("/images/projects/silkscreen-prints/gallery-6.webp", "Silkscreen Prints detail six"),
      image("/images/projects/silkscreen-prints/gallery-7.webp", "Silkscreen Prints detail seven"),
      image("/images/projects/silkscreen-prints/gallery-8.webp", "Silkscreen Prints detail eight"),
    ],
    links: [],
  },
  {
    id: "squisito",
    title: "Squisito",
    year: 2023,
    tier: "shortlist",
    tags: ["UI/UX", "Prototype"],
    tools: ["Figma"],
    summary:
      "A full mobile prototype for an Italian food app focused on simple UX, clear flows, and a clean visual system.",
    description:
      "Squisito was a college product-design project where I created a full prototype for an Italian food app. I kept the experience intentionally simple, focusing on clear flows over visual complexity, and led the concept, UX structure, UI design, and prototyping in Figma. The work used personas, empathy maps, and design-system thinking to support recipe discovery, saved recipes, cook support, shopping lists, and sharing in one consistent mobile system. The result was a full interactive prototype with lower friction and a cleaner path through the core tasks.",
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
    id: "digital-imaging-posters",
    title: "Digital Imaging Posters",
    year: 2026,
    tier: "archive",
    tags: ["Poster", "Digital Imaging"],
    tools: ["Photoshop"],
    summary:
      "A two-poster Photoshop series from digital imaging class, using composited imagery to deliver two very different ideas.",
    description:
      "Digital Imaging Posters is a two-poster Photoshop series built to test compositing as a communication tool. I developed one concept around climate messaging and a second around an original sci-fi narrative, each with distinct visual tone and pacing. The climate piece was featured at Monmouth University's Global Understanding Convention, providing external validation for the communication direction. I led concept development, image treatment, and final layout for both outcomes. The result was a pair of posters that show range while maintaining clear message hierarchy and atmosphere control.",
    media: [
      image(
        "/images/projects/digital-imaging-posters/thumbnail.webp",
        "Climate change poster with a smokestack and environmental message",
      ),
      image(
        "/images/projects/digital-imaging-posters/gallery-1.webp",
        "Original sci-fi poster concept built from digital image composites",
      ),
    ],
    links: [],
  },
  {
    id: "trackerapp",
    title: "Tracker App",
    year: 2022,
    tier: "archive",
    tags: ["UI/UX", "Productivity"],
    tools: ["Figma"],
    summary: "My first real UI project, a dark-mode productivity concept for tasks, reminders, and planning.",
    description:
      "Tracker App was my first full UI concept and the project that pushed me deeper into product design. I designed a dark-mode productivity experience for tasks, reminders, and schedule planning with a focus on reducing visual clutter. The work prioritized clear hierarchy and quick task scanning for daily use. I used the project to practice consistent component behavior across multiple app states. The outcome was an early but complete UI system that shaped my direction toward UX and product work.",
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
    tools: ["Go", "Python", "Vue.js"],
    summary: "A COVID-era startup I built around retail automation, restock tracking, and fast product turnaround.",
    description:
      "I founded SageAIO during COVID to automate restock detection and purchase timing for high-demand retail products. I led the product end to end across UI/UX, engineering direction, operations, and growth, using Go and Python for automation and Vue.js for the interface. The work required balancing technical reliability with fast UX decisions as demand changed quickly. I also led branding and outreach to grow distribution alongside product development. The outcome was a functioning startup product and a community that grew to roughly 10,000 followers.",
    media: [
      image("/images/projects/sageaio/thumbnail.jpg", "SageAIO thumbnail"),
      image("/images/projects/sageaio/gallery-1.jpg", "SageAIO gallery image one"),
      image("/images/projects/sageaio/gallery-4.jpg", "SageAIO gallery image two"),
      image("/images/projects/sageaio/gallery-3.jpg", "SageAIO gallery image three"),
      image("/images/projects/sageaio/gallery-2.jpg", "SageAIO gallery image four"),
    ],
    links: [],
  },
  {
    id: "creative-book-arts",
    title: "Creative Book Arts",
    year: 2026,
    tier: "archive",
    tags: ["Mixed Media", "Print", "Hands-on"],
    tools: ["Book Cloth", "Acrylic Paint", "Construction Paper"],
    summary:
      "A college course exploring book construction through cloth, paint, and different binding techniques.",
    description:
      "Creative Book Arts is a hands-on print project focused on physical book construction and material-led storytelling. I explored multiple binding methods using book cloth, acrylic paint, and construction paper, with strongest outcomes in Coptic stitch and Japanese stamp book formats. The process emphasized how texture and material choices influence meaning before any digital polish is added. I treated each build as both a craft exercise and a composition system in physical form. The outcome was a stronger foundation in tactile design thinking that carries into my digital layout work.",
    media: [
      image("/images/projects/creative-book-arts/thumbnail.webp", "Creative Book Arts cover"),
      image("/images/projects/creative-book-arts/gallery-1.webp", "Creative Book Arts detail one"),
      image("/images/projects/creative-book-arts/gallery-2.webp", "Creative Book Arts detail two"),
    ],
    links: [],
  },
];
