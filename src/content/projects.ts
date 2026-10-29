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
      "A five-week engagement, including a three-week redesign and build, that replaced an outdated, non-responsive golf club site for prospective members, golfers, and event customers.",
    description:
      "I redesigned and rebuilt Packanack Golf Club's website as a contracted workplace project, working independently across strategy, UX, visual design, photography, drone production, SEO, frontend development, and deployment. The previous site was outdated, failed across multiple breakpoints, and did not separate the club's key business areas: memberships, golf lessons, restaurant and catering services, and events. Within a five-week project window, I completed three weeks of focused design and development work, reworking every page, removing unnecessary content, and rebuilding the SEO foundation. Because the existing site ran through a cPanel structure rather than my usual React and Vercel workflow, I adapted to a constrained HTML/CSS implementation and deployment environment. I created original course photography and drone footage, then designed the hole-by-hole course pages as a visual and technical centerpiece. Since launch, the site has received more than 1,500 monthly views, up from roughly 500. I also added membership inquiry forms that were not previously available.",
    media: [embed("https://www.packanackgolfclub.com/", "Packanack Golf Club live website embed")],
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
      "A mobile-first drum tuner web app for fast, readable live feedback during setup and practice.",
    description:
      "I designed and built Overtone as a mobile-first tuner for drummers who need fast feedback during setup and practice. I led the product direction, UI design, and React implementation, then shipped it as a web app on Vercel. The interface keeps core tuning actions visible and readable on smaller screens.",
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
      "A production iOS call-screening service that helps older adults and caregivers screen unknown callers while keeping trusted contacts connected.",
    description:
      `I created Verity Protect after my grandmother was scammed by a phone call. I designed and built a call-screening service for older adults, caregivers, and family members setting up protection for someone else. I led product strategy, UX, UI, branding, marketing, frontend, backend, and launch.

      The core experience lets a user create a PIN and add trusted people through the native contact picker. Trusted callers are recognized and connected without friction, while unknown callers are required to pass the PIN before reaching the user. An optional hard-block mode allows only trusted contacts through. To avoid blocking legitimate calls from doctors and other professionals, I also added an allowlist for medical and other trusted phone numbers. Caregivers can review messages left by callers who failed the screening step, while connected-call recordings are not retained, keeping the system useful without creating unnecessary privacy exposure.

      I designed the onboarding and controls around low cognitive load, readable screens, clear status information, and Apple platform conventions, with accessibility-informed decisions throughout. The most difficult technical challenge was learning VoIP call bridging and building the Twilio flow across onboarding, trusted-contact routing, alerts, blocked contacts, message handling, and caregiver access. The app is live on the App Store and has reached 200+ installs, 70 active protected users, and 400+ calls screened since launch.`,
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
    statusLabel: "Live on the App Store",
    tractionStats: [
      { value: "200+", label: "installs" },
      { value: "70", label: "active protected users" },
      { value: "400+", label: "calls screened" },
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
      "A contracted real estate website redesign that replaced a Squarespace site with a custom, CMS-backed website.",
    description:
      "I redesigned this real estate site as a contracted project and carried it from discovery through launch. The previous Squarespace site had unclear calls to action and did not reflect the brand, so I led prep, research, moodboards, design system work, wireframes, revisions, implementation, and deployment. I built the site from scratch with a CMS-backed blog, handled photography, SEO, analytics, and hosting migration, and established the visual direction around an editorial, warm, professional tone.",
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
      "I designed Phase Shift in Photoshop as a poster study focused on layout energy, compositing, and type-led communication. I developed the concept and art direction, then used grain, blur, and texture to create a nostalgic look. I adjusted color, contrast, and type placement to keep the event information readable within the layered composition.",
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
      "An animated poster series pairing silkscreen-inspired texture and high-contrast color with deliberate motion.",
    description:
      "I created Year of the Horse as a self-directed animated poster series to explore motion as part of the composition. I led the concept, visual direction, and animation, combining blue-and-white contrast, layered texture, and negative space. Each composition works as both a still and a motion piece, with short movements that guide the eye through the layout.",
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
      "I built Octone Ink as an identity exercise for a fictional product company, from naming through packaging. I designed the logo, label architecture, and supporting brand applications in Illustrator. Across the packaging formats, I used a consistent mark and information hierarchy while varying the compositions.",
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
    title: "Domino's App Redesign",
    year: 2025,
    tier: "shortlist",
    tags: ["UI/UX", "App"],
    tools: ["Figma"],
    summary:
      "A two-and-a-half-week mobile app redesign concept that reworks Domino's core ordering journey from roughly 14 screens into a five-screen flow.",
    description:
      "I redesigned Domino's mobile app independently as the final project for my third-year Graphic Design Studio II course. Working within a two-and-a-half-week deadline, I took the project from research and app audit through user persona planning, empathy mapping, pain-point analysis, competitor review, moodboarding, visual direction, user flows, wireframes, high-fidelity UI, and presentation prototype. The original experience felt outdated and made ordering feel longer than it needed to be, with cluttered content, confusing navigation, and important menu and account actions buried behind extra steps. I restructured the core journey from roughly 14 screens into a focused five-screen flow covering entry and order settings, menu browsing, item customization, cart review, and checkout. I preserved recognizable Domino's brand cues while adapting the existing feature set into a lighter interface with clearer hierarchy, updated typography and color, and reusable components. I owned the full project and used critique from classmates and professors to refine the flow and visual decisions. The project produced a five-screen prototype for the core ordering journey.",
    media: [image("/images/projects/dominos/thumbnail.jpg", "Domino's redesign preview")],
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
    summary: "An internal lead-finding platform for prospect research and outreach planning.",
    description:
      "I designed and built GridLead as an internal product for prospect discovery and outreach planning. I owned UX, UI, and implementation, organizing lead research and outreach prep in one React workflow. The project is no longer active.",
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
      "I built the PGC App as a React Native companion for roughly 300 active members and staff. I led product design and implementation across tee-time booking, event reservations, food ordering, and course communication. The app brings member and staff tasks into one role-aware experience, including updates for the front of house, kitchen, and course.",
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
      "I developed Halfway Construction as a satirical brand exercise. I designed the identity, posters, packaging, social and video ads, and a landing-page prototype using Figma, After Effects, and Illustrator. Reusable type, color, and layout rules carry the same visual voice across print, motion, and web pieces.",
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
      "I designed Velkro as a modular typeface and applied it to editorial layouts rather than presenting it only as a glyph set. I built the letterforms and designed a specimen, poster, and book layout in Illustrator, refining spacing and rhythm across each format. The typeface is available as a downloadable OTF.",
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
      "A three-week mobile product concept for an AI- and AR-enabled golf caddy that combines course intelligence, shot planning, practice, and scoring.",
    description:
      "I designed Tempo independently over three weeks for my third-year Graphic Design Studio II course, taking the project from research and competitor review through personas, empathy maps, user flows, wireframes, visual direction, design system, and high-fidelity prototype. Classmates and instructors challenged the work through critiques, which helped me refine the scope and turn a broad golf-tech idea into a coherent mobile product direction. Tempo is positioned as an on-course caddy for beginners through instructors: more capable than a paper scorecard or rangefinder, and more focused on real-time course intelligence than social-first apps such as 18Birdies or The Grint. The planned experience combines camera-based AR guidance with course and map data to support tee-box distances, wind tracing, hazards, out-of-bounds detection, green heatmaps, blind-shot detection, shot tracing, practice mode, and everyday score tracking. I designed a light-first interface for outdoor readability while supporting dark mode, translucent controls, clear hierarchy, and fast access to tools during a round. The hardest challenge was translating complex pre-round planning and on-course flows into a usable prototype while creating a flexible visual system that could support maps, data, coaching, practice, and scoring without becoming overwhelming. The result is a detailed product concept with a strong visual point of view and a clear interaction model for a future native build.",
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
      "Created for a university typography course, this project explores Adelle through two editorial directions, one monochrome and one color-led. I designed the layouts in InDesign, using hierarchy, spacing, pacing, and type-image balance to give each direction a distinct character.",
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
      "This project includes two short frame-by-frame animations exploring how motion and color interact. I kept the forms simple and focused on timing, sequence, and transitions. The two pieces use different rhythms to test how spacing and color affect movement.",
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
      "City Scapes is a city identity and wayfinding concept built around Tokyo. I designed badges, banners, postcards, and a supporting wayfinding interface in Illustrator and Figma. The visual system carries the same identity across printed pieces and navigation cues.",
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
      "Created for a digital photography course, this series explores neon lighting through close-up compositions and glass reflections. I photographed the scenes with a DSLR and finished the color and tone in Lightroom, adjusting framing and exposure to retain detail around the light sources.",
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
      "This vector illustration translates a real Rechnitz Hall interior into a stylized scene. I built it in Illustrator with layered forms, controlled proportions, and gradient lighting to suggest depth without photoreal rendering.",
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
      "Sunscape Poster explores expressive concert visuals through restrained composition. I used type, color, and spacing to carry the composition, then adjusted hierarchy and negative space to keep the information easy to scan.",
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
      "This concept reimagines U.S. currency through Fender-inspired visual language and music references. I designed a full bill set and companion poster in Illustrator, using portraits, emblems, serial details, and microprint-style patterns within a banknote structure. Each denomination has its own layout while sharing the same visual cues.",
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
      "I built this personal identity system around a custom monogram and an eight-point layout grid. I designed the mark and layout rules, then applied them across apparel, a business card, and an ad. Spacing and alignment adapt to each format while keeping the identity recognizable.",
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
      "This project explores a compact UI system through space-themed widgets and icons. I designed reusable components in Figma, setting spacing, icon, and color rules for small-screen layouts. The set pairs a space-inspired visual style with readable labels and controls.",
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
      "This poster reinterprets Whiplash through a minimal visual language rather than literal scene depiction. I developed the concept in Illustrator using flat shapes, a reduced palette, and restrained composition. Hierarchy and contrast carry the intensity without relying on detailed imagery.",
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
      "This project collects drawing studies in charcoal and sanguine across figure, portrait, and still life. I focused on value, edges, and form to study how light creates volume and depth. Those observations also inform how I approach shading and composition in digital work.",
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
      "Color Collages is a three-piece digital series built from scanned source material and Photoshop compositing. I developed a space-themed narrative and varied the layering, contrast, and focal point across the compositions while keeping a shared visual language.",
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
      "I created Replica Collages as a three-part narrative series about fixation, loss of perspective, and return to reality. I developed the concept and compositions using sepia tones, overexposure, and scanned mixed-media assets. The images progress from an idealized view to a more direct return to the present.",
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
      "I developed the images in Photoshop and Illustrator, then prepared layered files as print-ready separations for silkscreen production. Across eight prints, I explored how color shifts, layer order, and texture changed between the digital compositions and physical results.",
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
      "Squisito was a college product-design project where I created a full prototype for an Italian food app. I led the concept, UX structure, UI design, and prototyping in Figma, using personas and empathy maps to organize the core tasks. The prototype brings recipe discovery and saving, cook support, shopping lists, and sharing into one mobile app.",
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
      "Digital Imaging Posters is a two-poster Photoshop series exploring compositing as a communication tool. I developed one poster around climate messaging and the other around an original sci-fi narrative, with distinct image treatments and pacing. I led concept development, image treatment, and final layout for both. The climate poster was featured at Monmouth University's Global Understanding Convention.",
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
      "Tracker App was my first full UI concept and helped lead me toward product design. I designed a dark-mode productivity app for tasks, reminders, and schedule planning. The project gave me an early opportunity to work through hierarchy, task scanning, and component behavior across multiple app states.",
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
      "I founded SageAIO during COVID to automate restock detection and purchase timing for high-demand retail products. I led product design, engineering direction, operations, and growth, using Go and Python for automation and Vue.js for the interface. I also led branding and outreach. The community grew to roughly 10,000 followers.",
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
      "Creative Book Arts is a hands-on project in physical book construction and material-led storytelling. I explored several binding methods using book cloth, acrylic paint, and construction paper. My strongest pieces used Coptic stitch and Japanese stamp bindings, where the binding and material choices became part of the composition.",
    media: [
      image("/images/projects/creative-book-arts/thumbnail.webp", "Creative Book Arts cover"),
      image("/images/projects/creative-book-arts/gallery-1.webp", "Creative Book Arts detail one"),
      image("/images/projects/creative-book-arts/gallery-2.webp", "Creative Book Arts detail two"),
    ],
    links: [],
  },
];
