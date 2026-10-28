import type { ExperienceItem } from "../types";

export const experienceItems: ExperienceItem[] = [
  {
    id: "exp-alfa",
    role: "Lead Design Intern",
    company: "Alfa Art Gallery",
    period: "May 2026 - Oct 2026",
    startYear: 2026,
    summary:
      "Led visual and experience design for interactive virtual exhibitions, publications, and promotional work at a New Jersey arts organization.",
    highlights: [
      "Promoted to Lead Intern within three weeks, providing creative direction, design critique, and project coordination across exhibition and publication initiatives.",
      "Led UX and visual design for interactive virtual exhibitions, improving navigation, information hierarchy, spatial organization, and content presentation.",
      "Collaborated with design and curatorial teams to deliver digital exhibitions, catalogs, promotional assets, and presentations from concept through production.",
    ],
    tags: ["UX/UI", "Visual Systems", "Interactive Design"],
  },
  {
    id: "exp-verity",
    role: "Founder & Product Designer",
    company: "Verity Protect | Secure Screen Calling",
    period: "2026 - Present",
    startYear: 2026,
    summary:
      "Designed and launched an iOS call-screening product from concept to production, protecting older adults and their caregivers from scam calls.",
    highlights: [
      "Designed and launched an iOS call-screening product from concept to production, reaching 100+ installs, 20 active protected users, and 400+ screened calls.",
      "Defined product strategy and designed UI flows for onboarding, alerts, transcripts, fraud scoring, caregiver access, and call screening.",
      "Built and maintained a reusable design system and production React Native interfaces.",
    ],
    tags: ["Product Design", "UI/UX", "React Native"],
    relatedProjectIds: ["verity-protect"],
    relatedLinks: [
      { label: "Website", url: "https://verityprotect.com/" },
      { label: "App Store", url: "https://apps.apple.com/us/app/verity-protect/id6759526773" },
    ],
  },
  {
    id: "exp-wayne",
    role: "Web Designer & Developer",
    company: "Wayne NJ Real Estate",
    period: "Jan 2026 - Apr 2026",
    startYear: 2026,
    summary: "Redesigned and developed a custom real estate website from scratch, replacing a Squarespace site with a CMS-backed build.",
    highlights: [
      "Redesigned and developed a custom real estate website from scratch, replacing a Squarespace site with a CMS-backed build.",
      "Led UX research, wireframing, visual design, React development, CMS-backed blog implementation, hosting migration, and deployment.",
      "Established navigation, calls to action, SEO, analytics, photography, and brand patterns across the responsive website.",
    ],
    tags: ["UX/UI", "React", "CMS"],
    relatedProjectIds: ["wayne-nj-real-estate"],
  },
  {
    id: "exp-rsp",
    role: "Photo Editor & Layout Intern",
    company: "RSP Media",
    period: "2022 - 2024",
    startYear: 2022,
    summary: "Produced jewelry photography, editorial layouts, and print-ready catalogs for luxury jewelry brands and magazine work.",
    highlights: [
      "Produced jewelry photography, editorial layouts, and print-ready catalogs for brands including Gumuchian and Martin Flyer.",
      "Applied visual hierarchy, typography, composition, retouching, and color correction across catalogs, editorial features, marketing materials, and digital content.",
      "Collaborated with creative teams to deliver polished, detail-focused assets that strengthened consistency across editorial and promotional touchpoints.",
    ],
    tags: ["Photography", "Editing", "Layout"],
    relatedLinks: [{ label: "RSP Media", url: "https://rspmedia.format.com/" }],
  },
  {
    id: "exp-pack",
    role: "Web Designer & Developer",
    company: "Packanack Golf Club",
    period: "Mar 2025 - Aug 2025",
    startYear: 2025,
    summary: "Redesigned and rebuilt a non-responsive golf club website, organizing memberships, lessons, events, restaurant services, and catering into dedicated paths.",
    highlights: [
      "Redesigned and rebuilt a non-responsive golf club website, organizing memberships, lessons, events, restaurant services, and catering into dedicated paths.",
      "Managed the full project lifecycle across UX strategy, UI design, responsive HTML/CSS/JavaScript development, SEO, content structure, deployment, and maintenance.",
      "Increased monthly website traffic from approximately 500 to more than 1,500 views and introduced membership inquiry forms that supported new membership and catering interest.",
    ],
    tags: ["UX/UI", "Responsive Web", "SEO"],
    relatedProjectIds: ["pgc-website"],
  },
  {
    id: "exp-sage",
    role: "Digital Manager & UI Designer",
    company: "SageAIO",
    period: "2021 - 2024",
    startYear: 2021,
    summary: "Founded and managed a retail technology startup while coordinating a distributed team of developers and designers.",
    highlights: [
      "Founded and managed a retail technology startup while coordinating a distributed team of developers and designers across multiple countries.",
      "Designed user interfaces for digital products and websites, improving usability, visual consistency, information hierarchy, and conversion flows.",
      "Led social media strategy, content operations, and brand communications, growing the audience to more than 10,000 followers.",
    ],
    tags: ["UI/UX", "Product", "Leadership"],
    relatedProjectIds: ["sageaio"],
  },
  {
    id: "exp-mon",
    role: "BFA, Design & Animation",
    company: "Monmouth University",
    period: "2023 - Present",
    startYear: 2023,
    summary:
      "Studying Design & Animation with a concentration in Graphic and Interactive Design, a minor in Photography, and a 3.8 GPA.",
    highlights: [
      "Focus academic work on graphic and interactive design, web, motion, and digital product design.",
      "Collaborate with computer science students to move UX and UI ideas into interactive prototypes, apps, and websites.",
      "Published work in Monmouth Review Vol. 67, 68, and 69.",
    ],
    tags: ["Product Design", "UI/UX", "Interactive Design"],
  },
];
