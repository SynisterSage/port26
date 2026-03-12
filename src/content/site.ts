export type ProcessStep = {
  index: string;
  title: string;
  detail: string;
  expanded: string;
};

export type AboutListItem = {
  index: string;
  title: string;
  detail: string;
  url?: string;
};

export const siteProfile = {
  origin: "https://aferguson.art",
  name: "Lex Ferguson",
  jobTitle: "Creative Technologist",
  email: "afergyy@gmail.com",
  linkedinUrl: "https://linkedin.com/in/lex-ferguson",
  githubUrl: "https://github.com/SynisterSage",
  resumePath: "/resume.pdf",
  description:
    "Portfolio of Lex Ferguson, a design engineer working across web, mobile, branding, UI/UX, and visual systems.",
  aboutDescription:
    "My name is Lex Ferguson, a design engineer working across web, mobile, branding, and UI/UX. I design and build products that balance clarity, responsiveness, and personality, with experience spanning shipped club software, app concepts, identity systems, and visual design.",
  resumeDescription:
    "Resume and experience overview for Lex Ferguson across design engineering, product, branding, and digital work.",
  heroSummary: "Creative Technologist focused on UI/UX, branding, and visual systems.",
  contactIntro: "Open to freelance, contract, and full-time roles.",
  processIntro:
    "I combine product thinking, visual design, and build awareness to keep outcomes clear and usable.",
  processTools:
    "Selected tools: Figma, Adobe CC, React/TypeScript when implementation is needed. Knowledge in Python, Go, Vercel, Render & AWS.",
} as const;

export const aboutIntro =
  "I'm Lex Ferguson, a junior at Monmouth University in West Long Branch studying graphic design with a focus on interactivity and user experience. I am currently 21 and have been into design since high school, and over time that turned into a real focus on product design, UI/UX, branding, web design, and design systems. I care most about clarity, responsiveness, strong hierarchy, and making digital experiences feel considered from the first impression to the smallest detail.";

export const aboutNarrative =
  "I'm a product designer at heart, but I like seeing ideas all the way through. I usually lead the concept, UX, UI, branding, and overall product direction, then use implementation knowledge and AI-assisted workflows to help bring the work to life without giving up the creative vision. Recent work includes Packanack Golf Club's live website and app, along with Verity Protect, an iOS app I launched on the App Store. My taste leans toward clean, practical UX, but I always like leaving room for personality, systems thinking, and a point of view that makes the work feel memorable.";

export const siteKnowledgeAreas = [
  "Product design",
  "Design engineering",
  "UI design",
  "UX design",
  "Brand systems",
  "Visual systems",
  "Web design",
  "Mobile app design",
  "Frontend development",
  "React",
  "React Native",
  "Typography",
  "Motion design",
] as const;

export const processSteps: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Frame",
    detail: "I define the goal, the audience, and the non-negotiables before anything starts to sprawl.",
    expanded:
      "I start by getting specific about the outcome, not just the ask. I want to understand who this is for, what tension they are feeling, and what success actually means in practice. If the brief is fuzzy, I rewrite it into a sharper problem statement. That gives the rest of the work something solid to push against.",
  },
  {
    index: "02",
    title: "Research",
    detail: "I gather visual and product signal with intent so the work is informed, not derivative.",
    expanded:
      "Once the problem is clear, I collect reference with purpose. That usually means moodboards, competitor scans, and examples of how people already solve the same job. I am not trying to copy what is out there. I am looking for patterns, blind spots, and places where the experience can feel clearer or more honest.",
  },
  {
    index: "03",
    title: "Direction",
    detail: "I explore a small number of strong directions and choose the one with the cleanest point of view.",
    expanded:
      "This is where I narrow instead of widen. I usually build one or two directions that each say something clearly, then test them against the original goal and constraints. That helps me avoid polished options that look good but solve the wrong problem. The direction that survives is the one that feels most legible, memorable, and realistic to build well.",
  },
  {
    index: "04",
    title: "Prototype",
    detail: "I prototype the core flow early so the experience feels coherent before polish hides the weak spots.",
    expanded:
      "Before I overwork details, I want the important states and transitions to make sense in motion. This is usually where real product decisions reveal themselves, especially around pacing, hierarchy, and friction. If something feels confusing or heavy here, I fix it now instead of decorating around it later. A strong prototype keeps the final build focused and calm.",
  },
  {
    index: "05",
    title: "Validate + Ship",
    detail: "I stay involved through implementation and QA so the finished thing still feels intentional.",
    expanded:
      "I do not treat shipping like a handoff. I stay close during build review, interaction tuning, and final QA so the little details keep their integrity in the real product. That usually means tightening rough edges, checking actual device behavior, and protecting the original intent from drift. The last ten percent matters because it is often where trust is won or lost.",
  },
] as const;

export const aboutEducation: readonly AboutListItem[] = [
  {
    index: "01",
    title: "Monmouth University",
    detail: "West Long Branch, NJ",
  },
  {
    index: "02",
    title: "Program",
    detail: "4-year program, 3.8 GPA",
  },
  {
    index: "03",
    title: "Collaboration",
    detail: "Collaborated with CS majors to ship UX and UI ideas into production apps and websites",
  },
] as const;

export const aboutNotableAchievements: readonly AboutListItem[] = [
  {
    index: "01",
    title: "Monmouth Review Vol. 67",
    detail: "Published work in the 67th volume of Monmouth Review.",
    url: "https://review.monmouth.edu/vol-67/",
  },
  {
    index: "02",
    title: "Monmouth Review Vol. 68",
    detail: "Published work again in the 68th volume of Monmouth Review.",
    url: "https://review.monmouth.edu/vol-68/",
  },
  {
    index: "03",
    title: "Dean's List",
    detail: "Named to the Dean's List across three semesters.",
  },
  {
    index: "04",
    title: "Wayne Valley Golf",
    detail: "Three-year varsity captain for the Wayne Valley golf team.",
  },
  {
    index: "05",
    title: "Championship Wins",
    detail: "Won a Big North Conference title and a county championship title.",
  },
  {
    index: "06",
    title: "Junior Tour Finishes",
    detail: "Recorded multiple top-three finishes across the Pioneer Junior Golf Tour and NJPGA Junior Tour over two years.",
  },
] as const;

export const aboutFocusAreas: readonly AboutListItem[] = [
  {
    index: "01",
    title: "Performance",
    detail: "Performance-minded interfaces",
  },
  {
    index: "02",
    title: "Motion",
    detail: "Motion craft and interaction design",
  },
  {
    index: "03",
    title: "Brand Systems",
    detail: "Brand identity systems",
  },
  {
    index: "04",
    title: "Product UX",
    detail: "Product UX that stays readable at scale",
  },
] as const;
