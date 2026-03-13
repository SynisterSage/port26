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
    tools: ["HTML", "CSS"],
    summary:
      "A golf club website redesign built to clarify membership, modernize the brand, and improve responsiveness.",
    description:
      "I redesigned and rebuilt Packanack Golf Club's website to replace an outdated experience that no longer reflected the club well or helped drive new interest. The main goal was to make membership information clearer for prospective members while giving the site a stronger visual system, cleaner navigation, and a more polished responsive experience across devices. I handled the project end to end, including strategy, sitemap, UI design, development, SEO, and photography direction, while keeping the final design classic, simple, and true to the club's character.",
    media: [image("/images/projects/pgc-website/thumbnail.jpg", "PGC Website preview")],
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
      "A mobile-first drum tuner web app that pairs live tuning feedback with a cleaner interface.",
    description:
      "Overtone is a working mobile-first web app built for drummers who need a tuner that feels as good as it functions. The goal was to create something useful for all drummers, not just as a tuning tool but as a cleaner and more considered interface than the average tuner experience. I built it with React and hosted it on Vercel, focusing on live tuning feedback and a UI that stays fast, readable, and easy to use on mobile.",
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
      "A call-screening app that hard-blocks fraud, lets trusted contacts through, and protects loved ones.",
    description:
      "I built Verity Protect as a call-screening app that protects loved ones from scam calls by hard-blocking unknown callers and only letting trusted contacts through. I owned the project end to end, including the app, website, branding, advertising, UX, UI, and overall product direction, with AI used only to help support backend development. The experience was designed around clarity and peace of mind: users forward their phone or landline to a Verity number, trusted contacts bypass screening, unknown callers must pass a family PIN or leave a voicemail, and family members receive live alerts, transcripts, and fraud scoring so they can review threats without forcing parents or older adults to manage a new system themselves.",
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
    tier: "archive",
    tags: ["Brand", "Packaging"],
    tools: ["Illustrator"],
    summary:
      "A class project for a made-up ink company, built through branding, packaging, and core brand essentials.",
    description:
      "Octone Ink was a class project for a fictional ink company where I built the branding, packaging, and core brand essentials from the ground up. I developed the name, mark, label system, and supporting applications with a visual language that felt fluid, sharp, and expressive. The project helped me think through how a brand can stay consistent across packaging and supporting materials while still having personality.",
    media: [
      image("/images/projects/octone/thumbnail.png", "Octone Ink thumbnail"),
      image("/images/projects/octone/gallery-3.png", "Octone Ink gallery image one"),
      image("/images/projects/octone/gallery-2.png", "Octone Ink gallery image two"),
      image("/images/projects/octone/gallery-1.png", "Octone Ink gallery image three"),
    ],
    links: [],
  },
  {
    id: "wicked-works-shopify",
    title: "Wicked Works",
    year: 2026,
    tier: "archive",
    tags: ["E-commerce", "Full Stack"],
    tools: ["React", "Vercel", "Shopify Storefront API"],
    summary: "A streetwear storefront built to sell products cleanly and support future content growth.",
    description:
      "I designed and built Wicked Works as a streetwear storefront for a client who needed a cleaner way to sell products and support future brand growth. The build used React, Vercel, and Shopify Storefront APIs, including product and blog integrations that balanced direct merchandising with content. The store is no longer active because the client lost interest in continuing the project, but the work reflects my approach to building lean, brand-conscious e-commerce experiences.",
    media: [
      image("/images/projects/wicked-works-storefront/thumbnail.png", "Wicked Works storefront thumbnail"),
      image("/images/projects/wicked-works-storefront/gallery-1.png", "Wicked Works storefront gallery image one"),
      image("/images/projects/wicked-works-storefront/gallery-2.png", "Wicked Works storefront gallery image two"),
    ],
    links: [],
  },
  {
    id: "dominos-redesign",
    title: "Dominos App Redesign",
    year: 2025,
    tier: "archive",
    tags: ["UI/UX", "App"],
    tools: ["Figma"],
    summary:
      "A mobile ordering redesign that cuts friction, simplifies checkout, and replaces a hectic app flow.",
    description:
      "I redesigned most of the Dominos app with the main focus on making ordering and checkout feel less overwhelming. The original experience felt outdated, cluttered with hectic CTAs, and forced users through too many steps just to order a pizza, so I used research, user analysis, and flow mapping to simplify the journey. I handled the UX, UI, and advanced prototype work in Figma, reworking the broader app while putting the most attention on the core checkout flow.",
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
      "A lead-finding platform that helps web designers discover prospects and move into outreach faster.",
    description:
      "I built and designed GridLead as a private lead-finding tool for my own use, focused on helping me discover potential website clients and move into outreach faster. The product was shaped around the needs of freelancers, agencies, and website builders, but it was built as an internal tool rather than a public product, with a cleaner React interface for turning research into clear next steps. It is no longer active because of infrastructure funding limits and school taking priority, but the project reflects my interest in practical tools that turn messy research into usable workflows.",
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
      "A golf club app for members and staff covering tee times, events, food ordering, and course updates.",
    description:
      "I built PGC App as a shared product for both members and staff, with each side getting the tools they need without making the experience feel overloaded. Members can book tee times with guests or other members, reserve event times, order food on and off the course, and check course conditions, while staff can manage those updates and use a tracking system that keeps orders moving between the course and the kitchen. I handled the design work and backend implementation with AI support, building the app in React Native with a strong focus on clarity, speed, and role-based usability.",
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
      "A satirical construction brand built through identity, motion, packaging, and landing-page concepts.",
    description:
      "Halfway Construction was a full brand development project that expanded into a website concept and advertisement system. The branding was intentionally satirical and far less corporate than the kind of design I usually make, which made it a fun chance to push a louder and less expected visual direction. I created the logo, posters, packaging, video and social ads, and a landing-page concept in Figma, using After Effects and Illustrator to build a brand system that could carry the joke while still feeling cohesive across print, motion, and digital touchpoints.",
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
      "A modular typeface created for class and applied across a poster and editorial book layout.",
    description:
      "Velkro was a class project focused on creating a modular typeface and applying it beyond the letterforms themselves. I designed the font, then extended it into a poster and book-layout system to explore how the type could hold up across larger editorial compositions. The project was built in Illustrator and focused on creating a typeface with a distinct structure that still felt usable in real layouts.",
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
      "An AI golf companion concept with shot planning, AR guidance, and on-course insight in one mobile UX.",
    description:
      "I designed Tempo as a premium on-course companion that brings the feel of an AI caddy to a mobile app, built primarily for casual golfers but useful for more serious players as well. The concept combines club suggestions, shot planning, course strategy, weather insight, swing feedback, score tracking, and AR shot-path visualization into one focused experience that helps players make smarter decisions throughout a round. This was a UI and concept project, so I handled the brand identity, visual guidelines, concept direction, and advanced prototyping in Figma and Illustrator rather than development.",
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
      "Created for a university typography course, this project explored the Adelle typeface through two editorial directions: one black-and-white layout and one color layout. The assignment focused on how graphic elements, spacing, hierarchy, and color can work with a typeface to shape a stronger editorial system without overpowering the letterforms themselves. I used InDesign to build the spreads and treat the project as both a font study and a publication design exercise.",
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
      "This class project consists of two short animations I made frame by frame to study how motion and color work together. Rather than focusing on story, I used the pieces to understand timing, sequencing, and how small visual changes can create a stronger sense of movement. It was one of those projects where keeping the forms simple made the lessons around motion much clearer.",
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
      "City Scapes was a college project where I chose a city and built a visual system to represent it, using Tokyo as the source. I created badges, banners, postcards, and a UI concept for helping visitors find their way around the city, with the goal of capturing Tokyo's atmosphere while still feeling useful and inviting. Built in Illustrator and Figma, the project was meant to translate the energy of the city into a cohesive system that could both represent the place and guide people through it.",
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
      "Created for a digital photography class, this series focused on close-up images of real neon tubes placed on glass to create layered reflections and a stronger sense of depth. The project was meant to capture the feeling of old neon lights while leaning into a nostalgic atmosphere through color, glow, and composition. I shot the images on a DSLR and finished them in Lightroom, using the edits to preserve the intensity of the light without losing the mood of the scene.",
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
      "This was a vector illustration of Rechnitz Hall built in Illustrator, based on translating a real interior into a cleaner illustrated scene. The project taught me a lot about how to create depth with gradients and layering instead of relying on more literal rendering. It was a good exercise in balancing structure, proportion, and atmosphere while still keeping the drawing graphic and controlled.",
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
      "Sunscape Poster was a class project where I explored how to make a concert poster feel expressive without letting it become visually messy. I kept the composition more minimal and used color and typography to carry most of the energy. It was a useful study in restraint, especially in figuring out how little you can use while still making a poster feel intentional and memorable.",
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
      "This project reimagined U.S. currency through the visual language of Fender and guitar culture, turning each bill into part of a full themed note system. I designed a complete set of bills and a poster, building in details like microprint, emblems, serial numbers, and portraits of well-known musicians to make the concept feel collectible while still grounded in real currency structure. The work was created in Illustrator and focused on balancing expressive music references with the precision and hierarchy that make banknote design feel believable.",
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
      "This project was my attempt to build a personal identity system that actually felt like it could live in the real world. I created a custom monogram and layout logic, then applied it across a shirt, business card, and advertisement to see how the brand held up across different touchpoints. It was less about making one logo and more about figuring out how a personal brand can stay consistent without feeling rigid.",
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
      "This project explored how far a small UI system could go through a set of space-themed app widgets and icons. The work focused on building reusable components that stay readable at widget size while still feeling playful and visually distinct. I treated it as both an icon-system exercise and a small product-design study built around consistency at a tiny scale.",
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
      "This class project was a poster based on the film Whiplash, approached through a minimal visual language rather than a literal scene-based treatment. I used flat shapes, minimal color, and a stripped-back composition to represent the tension and energy of the movie in a more graphic way. Built in Illustrator, the piece focused on restraint and clarity while still trying to capture the feeling of the film.",
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
      "This project collects selected work from my drawing class, including figure studies, portraits, and still life pieces created with charcoal and sanguine. The course focused on more classical Renaissance-style techniques, which pushed me to think more carefully about form, value, and how to render things dimensionally by hand. That process ended up influencing how I build depth digitally as well, since it sharpened the way I think about structure, light, and volume. Special thanks to M. Donato.",
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
      "Color Collages was a project built around scanned media and digital compositing, with the goal of telling a story across three separate compositions. I took a space-themed direction and used Photoshop to layer, arrange, and balance the pieces so they felt connected without repeating the exact same structure. What I liked about this project was learning how to use collage as both image-making and storytelling at the same time.",
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
    tier: "shortlist",
    tags: ["Mixed Media", "Digital Imaging"],
    tools: ["Photoshop"],
    summary:
      "A three-part collage series about chasing the idea of something better and losing the present.",
    description:
      "Created for an advanced digital imaging class, Replica Collages explores how people can get so focused on the idea of something better that they lose sight of the present. The series follows a single figure across three compositions. In the first, he stands in a beautiful environment but becomes drawn to a distant door across the water, a symbol of that imagined better life just out of reach. In the second, that fixation narrows his world as the surrounding details begin to fall away, leaving only a few foreground elements to show how locked in he has become. In the final piece, the pursuit consumes him and drops him back into reality, right where he started. I kept the work sepia toned with a dreamlike, vintage quality and focused on overexposure, texture, and a mix of photo realism and collage using scanned assets, including materials from black-and-white photo work and lumen prints.",
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
      "A silkscreen print study that started as a curiosity and became a hands-on way to test color and composition.",
    description:
      "Silkscreen Prints began as a fun college elective, but it quickly turned into something I wanted to pursue alongside digital work. I leaned into Photoshop and Illustrator to build layered compositions with outlines, shifting opacity, and evolving textures before translating the art into the print studio. Playing with how a single color change can rewrite the story of a piece pushed my sense of hierarchy, palette, and mood, and the class gave me the hands-on knowledge to bring those layered digital mockups into silkscreen form.",
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
      "A full Figma prototype for an Italian food app built as a college class project.",
    description:
      "Squisito was a college class project where I designed a full prototype for an Italian food app in Figma. The app was built around browsing, viewing, and sharing recipes in a cleaner mobile system, with enough screens and flow detail to feel like a full product rather than a loose concept. It was one of the projects where I got to focus on making a prototype feel complete from both a UI and interaction standpoint.",
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
      "Digital Imaging Posters was a class project focused on compositing digital images to communicate a point clearly through poster design. The first piece centered on climate change and used a smokestack emitting the line 'Peace cannot grow where the air is heavy,' supported by a statistic to give the message more weight. That poster was later used for the Global Understanding Convention at Monmouth University. The second piece took a more narrative direction as an original sci-fi concept that I developed through the story, design, and overall composition myself. Even though the subjects are different, both posters came out of the same class and were built in Photoshop with a focus on layering images, controlling atmosphere, and using composition to make the idea land.",
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
      "Tracker App was the first UI project I made that really got me interested in interface design. I built it as a dark-mode productivity concept for tasks, reminders, and schedules, with the goal of making daily planning feel more focused and less scattered. Looking back, it was an early project, but it was important because it was the moment I realized I wanted to keep going deeper into UI and product design.",
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
      "I started SageAIO during COVID as a retail automation startup focused on helping people buy out-of-stock items as soon as they came back into stock. I built the product around scraping and automation, using Go and Python on the backend with Vue.js for the UI, while also handling the UI/UX, media, PR, and day-to-day operation of the app. On my own I grew the brand to around 10k followers, which made it one of the first projects where I was not just designing the product but also building attention around it and running the whole thing end to end.",
    media: [
      image("/images/projects/sageaio/thumbnail.jpg", "SageAIO thumbnail"),
      image("/images/projects/sageaio/gallery-1.jpg", "SageAIO gallery image one"),
      image("/images/projects/sageaio/gallery-4.jpg", "SageAIO gallery image two"),
      image("/images/projects/sageaio/gallery-3.jpg", "SageAIO gallery image three"),
      image("/images/projects/sageaio/gallery-2.jpg", "SageAIO gallery image four"),
    ],
    links: [],
  },
];
