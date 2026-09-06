import { writeFileSync } from "node:fs";

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 44;
const contentWidth = pageWidth - margin * 2;
const lines = [];
let cursorY = pageHeight - margin;

const colors = {
  ink: "0.09 0.09 0.09",
  blue: "0.22 0.29 0.67",
  gray: "0.28 0.28 0.28",
  rule: "0.65 0.65 0.65",
};

const escapePdf = (value) => String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
const approximateWidth = (value, size) => value.length * size * 0.5;

const wrap = (value, size, width = contentWidth) => {
  const words = value.split(/\s+/);
  const output = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && approximateWidth(candidate, size) > width) {
      output.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) output.push(current);
  return output;
};

const text = (value, { font = "F1", size = 9, color = colors.ink, x = margin, leading = size * 1.3, width = contentWidth } = {}) => {
  const wrapped = wrap(value, size, width);
  for (const line of wrapped) {
    lines.push(`${color} rg /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${cursorY.toFixed(2)} Tm (${escapePdf(line)}) Tj`);
    cursorY -= leading;
  }
};

const spacer = (amount = 7) => { cursorY -= amount; };
const rule = (color = colors.rule, thickness = 0.6) => {
  lines.push(`${color} RG ${thickness} w ${margin} ${cursorY.toFixed(2)} m ${pageWidth - margin} ${cursorY.toFixed(2)} l S`);
  cursorY -= 5;
};
const heading = (value) => {
  text(value, { font: "F2", size: 10.6, color: colors.blue, leading: 13 });
  cursorY -= 6;
};
const bullet = (value) => text(`- ${value}`, { size: 8.45, leading: 10.45, x: margin + 9, width: contentWidth - 9 });
const entry = (title, date, meta, bullets) => {
  text(title, { font: "F2", size: 9.55, leading: 11.4 });
  text(`${date}${meta ? ` · ${meta}` : ""}`, { font: "F3", size: 8.45, color: colors.gray, leading: 10.2 });
  bullets.forEach(bullet);
  spacer(8);
};

text("Lex Ferguson", { font: "F2", size: 24, color: colors.blue, leading: 27 });
text("Product Designer · UI/UX Designer · Design Engineer", { font: "F2", size: 11.2, leading: 14 });
text("Wayne, NJ · afergyy@gmail.com · linkedin.com/in/lex-ferguson · aferguson.art", { size: 9.2, leading: 11.5 });
spacer(6);

heading("Professional Summary");
text("Product Designer and UI/UX Designer with experience taking digital products from problem framing through high-fidelity design, implementation, launch, and iteration. Currently completing a BFA in Design and Animation at Monmouth University while independently leading a shipped iOS product and maintaining live web and mobile experiences. Strong in user-centered design, interaction systems, visual craft, accessibility, prototyping, and design-engineering collaboration.", { size: 9.1, leading: 11.4 });

spacer(15);
heading("Skills");
text("Product Design: Product Strategy, Design Thinking, User Flows, Information Architecture, Wireframing, Prototyping, Interaction Design", { size: 8.7, leading: 10.6 });
text("UX Research: User Research, Usability Testing, User-Centered Design, Journey Mapping, Heuristic Review, A/B Testing", { size: 8.7, leading: 10.6 });
text("UI & Visual Design: UI Design, Visual Design, Responsive Design, Typography, Color, Layout, Motion, Branding", { size: 8.7, leading: 10.6 });
text("Systems & Quality: Design Systems, Components, Design Tokens, Accessibility (WCAG), Design QA, Developer Handoff", { size: 8.7, leading: 10.6 });
text("Technical: HTML, CSS, JavaScript, React, React Native, Go, Python, Vue.js, SEO, Analytics", { size: 8.7, leading: 10.6 });
text("AI & Platforms: End-to-end AI-assisted product development, Claude CLI, Codex CLI, Supabase, Firebase, Render, Vercel, Twilio", { size: 8.7, leading: 10.6 });
text("Tools: Figma, Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Adobe XD, Adobe After Effects", { size: 8.7, leading: 10.6 });

spacer(15);
heading("Experience");
entry("Verity Protect · Founder, Product Designer, Engineer", "2026–Present", "Remote", [
  "Founded, designed, and shipped an iOS call-screening product from concept through App Store launch, owning product strategy, UX, UI, brand, backend, marketing, and support.",
  "Designed high-fidelity onboarding, trusted-contact, alert, transcript, caregiver, and privacy flows around low cognitive load and accessibility-informed interaction patterns.",
  "Built the React Native product and Twilio/Supabase infrastructure, reducing design-to-development rework by 60%; the live product has reached 100+ installs, 20 active protected users, and 400+ screened calls.",
]);
entry("Alfa Art Gallery · Lead Graphic Design Intern", "2026–Present", "", [
  "Promoted to Lead Graphic Design Intern within three weeks, taking responsibility for visual direction, prioritization, and keeping design work organized and on schedule.",
  "Design posters, banners, brochures, annual and artist catalogs, virtual exhibitions, and branded video content while maintaining a cohesive visual language across print and digital touchpoints.",
  "Develop layout and typographic systems that balance visual craft, hierarchy, and production requirements for gallery communications and artist storytelling.",
]);
entry("RSP Media · Photo Editor, Layout Intern", "2024–Present", "Pompton Plains, NJ", [
  "Photograph and retouch real jewelry-brand products using controlled multi-light setups, angle testing, and color correction to preserve accurate detail and material texture.",
  "Contribute photography, retouching, and layout to numerous Gumuchian and Martin Flyer brand catalogs, 5+ editorial features, and marketing materials while maintaining production-ready consistency across print and digital channels.",
]);
entry("Packanack Golf Club · Web Manager, Golf Shop Assistant", "2023–Present", "Wayne, NJ", [
  "Redesigned and rebuilt the club website independently in HTML/CSS within an existing cPanel environment, restructuring every page around memberships, lessons, dining, catering, events, and services.",
  "Applied responsive UX, content strategy, SEO, photography, and drone production; monthly traffic grew from roughly 500 to 1,500+ views and the site introduced membership inquiry forms.",
  "Maintain the live web experience and coordinate updates with staff, club operations, and seasonal programming.",
]);
entry("SageAIO · Founder, Digital Manager, UI Designer", "2021–2023", "Remote", [
  "Founded and managed a retail automation startup, coordinating a distributed team of about six developers and designers across multiple countries.",
  "Owned product direction and designed product and web interfaces while contributing to Go, Python, and Vue.js implementation across a restock-tracking workflow.",
  "Led social media strategy, PR, partnerships, and content operations, growing audience reach to 10,000+ followers; users often reported approximately $1,000 per month in resale income.",
]);

spacer(5);
heading("Education");
text("Monmouth University · BFA in Design & Animation, Concentration in Graphic and Interactive Design", { font: "F2", size: 8.6, leading: 10.5 });
text("GPA: 3.8", { size: 9, leading: 11 });

const content = ["q", ...lines, "Q"].join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>",
  `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`,
];

let pdf = "%PDF-1.4\n%âãÏÓ\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf, "binary"));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});
const xrefOffset = Buffer.byteLength(pdf, "binary");
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let index = 1; index <= objects.length; index += 1) pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

writeFileSync("public/resume.pdf", Buffer.from(pdf, "binary"));
console.log(`Created public/resume.pdf (${cursorY.toFixed(0)}pt remaining)`);
