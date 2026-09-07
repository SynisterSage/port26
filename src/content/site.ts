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
  jobTitle: "Product Designer / UI-UX Designer",
  email: "afergyy@gmail.com",
  linkedinUrl: "https://linkedin.com/in/lex-ferguson",
  githubUrl: "https://github.com/SynisterSage",
  resumePath: "/resume.pdf",
  description:
    "Portfolio of Lex Ferguson, a product designer and UI/UX designer focused on shipped web and mobile experiences.",
  aboutDescription:
    "Product designer and UI/UX designer focused on shipped web and mobile products. I design clear, high-trust experiences with strong visual systems, interaction quality, and implementation awareness.",
  resumeDescription:
    "Resume and experience overview for Lex Ferguson across design engineering, product, branding, and digital work.",
  heroSummary: "Product Designer / UI-UX Designer for web and mobile products.",
  contactIntro: "Open to full-time Product Design and UI/UX roles (2026).",
  processIntro:
    "I move from a clear product problem to a tested, buildable experience—keeping the user, the system, and the final details in view.",
  processTools:
    "Typical tools: Figma and Adobe CC for design, with React, TypeScript, HTML, and CSS when implementation helps validate the work.",
} as const;

export const aboutIntro =
  "I'm Lex Ferguson, a product designer and design engineer studying Design & Animation at Monmouth University, with a concentration in Graphic and Interactive Design. I design web and mobile experiences across product strategy, UX, UI, visual systems, and implementation. I care about making complex products feel clear, responsive, and considered from the first interaction to the final detail.";

export const aboutNarrative =
  "I like seeing ideas all the way through. I lead concept development, research, user flows, interaction design, visual direction, and design systems, then stay close to implementation and QA so the shipped experience matches the intent. My practice combines clean, practical UX with strong visual craft, accessibility awareness, and enough technical fluency to make better product decisions with engineers.";

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
    title: "Define",
    detail: "I clarify the user, the goal, the constraints, and what a successful outcome needs to make possible.",
    expanded:
      "I start with the outcome, not just the request. I identify who the experience is for, what they need to accomplish, and where the product currently creates friction. When the brief is vague, I turn it into a sharper problem statement and a set of practical constraints.",
  },
  {
    index: "02",
    title: "Understand",
    detail: "I use research, competitive review, and visual references to find patterns, gaps, and useful opportunities.",
    expanded:
      "I gather signal with purpose through user and competitor research, content review, moodboards, and critique. I am looking for patterns and blind spots—not copying what already exists. The goal is to understand the user's context well enough to make the next design decision deliberately.",
  },
  {
    index: "03",
    title: "Shape",
    detail: "I turn the insight into an information architecture, interaction model, and visual system that can hold together.",
    expanded:
      "I translate the problem into flows, hierarchy, components, and visual direction. I explore enough options to find a clear point of view, then narrow against the original goals, accessibility needs, and technical constraints. The strongest direction is the one that feels useful, coherent, and realistic to build.",
  },
  {
    index: "04",
    title: "Test",
    detail: "I prototype the important states and transitions early, then use critique and feedback to remove friction.",
    expanded:
      "I prototype the core journey before polishing every screen. This makes pacing, hierarchy, edge cases, and interaction behavior visible while they are still easy to change. I use critique, usability feedback, and implementation checks to find confusion early and keep the experience focused.",
  },
  {
    index: "05",
    title: "Ship",
    detail: "I work with implementation through handoff, QA, and iteration so the final product stays true to the design.",
    expanded:
      "Shipping is part of design. I communicate states and behavior clearly, review the implementation, check responsive and device behavior, and tune the details that affect trust. I keep iterating after launch when real usage or feedback reveals a better answer.",
  },
] as const;

export const aboutEducation: readonly AboutListItem[] = [
  {
    index: "01",
    title: "Monmouth University",
    detail: "BFA in Design & Animation, concentration in Graphic and Interactive Design",
  },
  {
    index: "02",
    title: "Academic record",
    detail: "3.8 GPA · West Long Branch, NJ",
  },
  {
    index: "03",
    title: "Cross-disciplinary work",
    detail: "Collaborated with computer science students to move UX and UI ideas into production apps and websites",
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
    title: "Monmouth Review Vol. 69",
    detail: "Published work again in the 69th volume of Monmouth Review.",
    url: "https://review.monmouth.edu/vol-69/",
  },
  {
    index: "04",
    title: "Dean's List",
    detail: "Recognized on the Dean's List across three semesters.",
  },
  {
    index: "05",
    title: "Wayne Valley Golf",
    detail: "Served as a three-year varsity captain for the Wayne Valley golf team.",
  },
  {
    index: "06",
    title: "Championship Wins",
    detail: "Helped win a Big North Conference title and a county championship title.",
  },
  {
    index: "07",
    title: "Junior Tour Finishes",
    detail: "Recorded multiple top-three finishes across the Pioneer Junior Golf Tour and NJPGA Junior Tour.",
  },
] as const;

export const aboutFocusAreas: readonly AboutListItem[] = [
  {
    index: "01",
    title: "Product thinking",
    detail: "Problem framing, user goals, product direction, and information architecture for clear experiences",
  },
  {
    index: "02",
    title: "Interaction design",
    detail: "User flows, wireframes, high-fidelity prototypes, and interaction patterns that make complex tasks learnable",
  },
  {
    index: "03",
    title: "Visual systems",
    detail: "Typography, color, layout, components, and scalable design systems with a distinct point of view",
  },
  {
    index: "04",
    title: "Research & accessibility",
    detail: "User research, critique, usability-informed iteration, and accessibility-aware interface decisions",
  },
  {
    index: "05",
    title: "Production design",
    detail: "Design QA, developer handoff, frontend implementation, and technical decisions grounded in feasibility",
  },
] as const;
