import type { Project } from "../types";

export type ProjectGroupId = "all" | "web" | "product" | "brand" | "motion" | "typography" | "print" | "commerce";

export type ProjectGroupDefinition = {
  id: ProjectGroupId;
  label: string;
  tagMatches: string[];
};

const normalizeValue = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const PROJECT_GROUPS: ProjectGroupDefinition[] = [
  { id: "web", label: "Web", tagMatches: ["Web", "Full Stack"] },
  {
    id: "product",
    label: "Product",
    tagMatches: ["Product", "Mobile", "Mobile Development", "App", "UI/UX", "Prototype", "Concept", "Founder", "Productivity"],
  },
  { id: "brand", label: "Brand", tagMatches: ["Brand", "Identity", "Graphic", "Illustration", "Vector", "Icon System", "Drawing"] },
  { id: "motion", label: "Motion", tagMatches: ["Motion", "Audio", "Lighting"] },
  { id: "typography", label: "Typography", tagMatches: ["Typography", "Editorial", "Publication"] },
  { id: "print", label: "Print", tagMatches: ["Print", "Poster", "Digital Imaging", "Photography", "Color", "Mixed Media"] },
  { id: "commerce", label: "Commerce", tagMatches: ["E-commerce"] },
];

const GROUP_LOOKUP = new Map(PROJECT_GROUPS.map((group) => [group.id, group]));

export const normalizeProjectGroupId = (value: string | null | undefined): ProjectGroupId => {
  const normalized = normalizeValue(value ?? "");
  if (!normalized || normalized === "all") return "all";
  return GROUP_LOOKUP.has(normalized as ProjectGroupId) ? (normalized as ProjectGroupId) : "all";
};

export const buildProjectsPath = (groupId?: ProjectGroupId) =>
  groupId && groupId !== "all" ? `/projects?group=${encodeURIComponent(groupId)}` : "/projects";

const matchesTag = (projectTags: string[], tagMatch: string) => {
  const normalizedMatch = normalizeValue(tagMatch);
  return projectTags.some((tag) => normalizeValue(tag) === normalizedMatch);
};

export const getProjectGroupIds = (project: Project) => {
  const groups = PROJECT_GROUPS.filter((group) => group.tagMatches.some((tagMatch) => matchesTag(project.tags, tagMatch))).map(
    (group) => group.id,
  );

  return groups;
};

export const projectMatchesGroup = (project: Project, groupId: ProjectGroupId) => {
  if (groupId === "all") return true;
  return getProjectGroupIds(project).includes(groupId);
};
