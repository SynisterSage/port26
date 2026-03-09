export type PortfolioMode = "cube" | "plain";

export interface Project {
  id: string;
  title: string;
  categories: string[];
  description: string;
  fullDescription?: string;
  year?: string;
  service?: string;
  tools?: string[];
  link?: string;
  linkLabel?: string;
  thumbnail: string;
  images: string[];
}
