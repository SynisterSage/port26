import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "dominos-redesign",
    title: "Dominos App Redesign",
    categories: ["UI/UX", "App Design"],
    description:
      "Reimagining the Domino's mobile ordering journey through flow audits, clearer affordances, and a refreshed component system. I mapped each core path, sketched alternative flows, and built out states so handoff to engineering would stay precise. The prototype balances browsing, build-a-pizza, and checkout while keeping the brand math clean. Stack: Figma, modular UI components.",
    year: "2025",
    service: "UI/UX",
    tools: ["Figma"],
    fullDescription:
      "This mobile redesign reimagines the Domino's ordering experience with a sharper, more intuitive user flow and a bold flat-UI aesthetic. After auditing the existing app I mapped each core journey, sketched flows, and defined states before translating them into a component system. Created as a class assignment, it became a passion project driven by my love for improving everyday digital experiences. The goal was simple: fix the frustrating UX of the existing app and make pizza ordering fast, clear, and visually cohesive.\n\nI rebuilt the entire design system from the ground up with clean, modular components, defined states, and a flexible variable structure supporting light and dark modes. The color palette was reinvented for vibrancy and contrast, while typography stays confident yet readable. Every interaction, from micro animations to modal transitions, was refined to feel responsive and satisfying.\n\nThe new flow dramatically reduces the number of steps to browse the menu, build a pizza, and check out. Features like guest checkout and simplified navigation remove friction while keeping the brand's personality intact. I validated improvements through peer feedback and user testing, iterating based on real behavior.\n\nIt's a complete end-to-end Figma prototype that feels modern, efficient, and cohesive from screen to screen, a redesign that makes ordering pizza actually enjoyable.",
    link: "https://embed.figma.com/proto/dJgsXGf3LhAJuVZAnJyLqh/Dominos-Redesign-Main-File?node-id=108-916&p=f&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=108%3A914&embed-host=share",
    linkLabel: "Open Prototype",
    thumbnail: "/images/projects/dominos/thumbnail.jpg",
    images: ["/images/projects/dominos/thumbnail.jpg"],
  },
  {
    id: "overtone-app",
    title: "Overtone App",
    categories: ["Full Stack", "Audio Tool"],
    description:
      "Live drum tuning platform centered on a responsive tuner and kit management experience, built by layering Web Audio detection, kit persistence, and reactive UI states. I tuned the Hz pickup, implemented locking, and stored kit presets in local storage so the UI stays synced and predictable. Continuous deployment on Vercel keeps the demo fresh while delivering light/dark modes for studio and stage. Stack: TypeScript, React, Web Audio API, Vercel.",
    year: "2025",
    service: "App Development",
    tools: ["TypeScript", "React", "Web Audio API"],
    fullDescription:
      "Deployed as Overtone, this mobile-first drum-tuning companion was prototyped and designed in Figma, then coded in TypeScript/JavaScript, HTML, and CSS and hosted on Vercel. The interface supports light and dark modes for studio and stage, and the app runs as a fast single-page experience so it feels instant on phones.\n\nAt its core is a Hz mic pickup written in JavaScript using the Web Audio API that listens through the device mic and detects the fundamental in real time. A locking system holds the reading once the pitch stabilizes so fine adjustments are easy and the value does not jump around. Settings let you dial in detection behavior and create kits with named drums, sizes, and saved values, all persisted in local storage so session tweaks return on reload. The main tuner view keeps focus with a large frequency readout, note mapping, peak hold, and clear Live/Locked states. Continuous deploys keep the embedded demo current while iterating on workflows and presets.",
    link: "https://testapp-rust.vercel.app/login",
    linkLabel: "Open Prototype",
    thumbnail: "/images/projects/overtone/thumbnail.png",
    images: [],
  },
  {
    id: "grid-lead",
    title: "GridLead",
    categories: ["Full Stack", "Automation", "Founder"],
    description:
      "GridLead is a solo-built platform that finds local businesses, runs automated audits, and drives outreach. The React/Vite frontend ships as an installable PWA and Supabase covers auth/Postgres/Edge Functions for Gmail OAuth/send/poll, Stripe subscriptions, and Places-powered discovery. A PageSpeed + Playwright render proxy scores performance, design, and trust, then feeds the notification stack.",
    year: "2025",
    service: "Full Stack",
    tools: [
      "React",
      "Vite",
      "Supabase",
      "Stripe",
      "Playwright",
      "Logo Creation: Dan Martin",
    ],
    fullDescription:
      "GridLead is a solo-built, full-stack platform that mines local businesses, runs AI-flavored audits, and automates outreach. The frontend is React/Vite with an installable PWA shell. Supabase powers auth, Postgres, and Edge Functions for Gmail OAuth/send/poll, Stripe subscriptions, and Places-based discovery. A custom audit pipeline (PageSpeed + Playwright render proxy) scores performance, design, and trust, generates briefs, and feeds a notification stack (Realtime, push, tracking pixels). It ships on Vercel/Supabase with RLS-secured migrations and plan-based limits. (Shout out to Dan Martin for the logo creation)",
    link: "https://gridlead.space/",
    linkLabel: "Open GridLead",
    thumbnail: "/images/projects/grid-lead/thumbnail.png",
    images: [
      "/images/projects/grid-lead/main.png",
      "/images/projects/grid-lead/gallery-1.png",
      "/images/projects/grid-lead/gallery-2.png",
      "/images/projects/grid-lead/gallery-3.png",
    ],
  },
];
