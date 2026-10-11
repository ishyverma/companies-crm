export type Connection = "very-strong" | "strong" | "good" | "weak";
export type Category = "Productivity" | "Collaboration" | "B2B" | "SaaS" | "Software";
export type SortKey = "name" | "connection" | "interaction" | "domain" | "category";
export interface SortState { key: SortKey; dir: "asc" | "desc" }

export const CONNECTION_RANK: Record<Connection, number> = {
  "very-strong": 4, strong: 3, good: 2, weak: 1,
};

export interface Company {
  id: string;
  name: string;
  domain: string;
  logoDomain: string;
  connection: Connection;
  interaction: string | null;
  category: Category;
  description: string;
  activeProjects: number;
  teamSize: number;
  activity: number[];
}

export const CONNECTIONS: Connection[] = ["very-strong", "strong", "good", "weak"];
export const CATEGORIES: Category[] = ["Productivity", "Collaboration", "B2B", "SaaS", "Software"];
