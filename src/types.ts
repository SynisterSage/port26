export type ProjectTier = "shortlist" | "archive";

export type ProjectMediaType = "image" | "video";

export interface ProjectMedia {
  type: ProjectMediaType;
  src: string;
  alt: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  year: number;
  tier: ProjectTier;
  tags: string[];
  tools?: string[];
  summary: string;
  description: string;
  media: ProjectMedia[];
  links: ProjectLink[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  startYear: number;
  summary: string;
  highlights: [string, string];
  tags: string[];
  relatedProjectIds?: string[];
  relatedLinks?: ProjectLink[];
}
