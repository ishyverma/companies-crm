import { companies as seed } from "./data";
import type { Category, Company, Connection } from "./types";

export interface NewCompanyInput {
  name: string;
  domain: string;
  connection: Connection;
  category: Category;
  interaction: string | null;
  description: string;
}

// in-memory "database"
const db: Company[] = [...seed];
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function normalizeDomain(raw: string) {
  return raw.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
}

export function makeId(name: string) {
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "company";
  return `${slug}-${Math.random().toString(36).slice(2, 6)}`;
}

export function buildCompany(input: NewCompanyInput, id: string): Company {
  return {
    id,
    name: input.name,
    domain: input.domain,
    logoDomain: input.domain,
    connection: input.connection,
    interaction: input.interaction,
    category: input.category,
    description: input.description || "No description yet.",
    activeProjects: 0,
    teamSize: 1,
    activity: [0, 0, 0, 0, 0, 0, 0],
  };
}

export async function listCompanies(): Promise<Company[]> {
  await wait(0);
  return [...db];
}

export async function createCompany(id: string, input: NewCompanyInput): Promise<Company> {
  await wait(350);
  const company = buildCompany(input, id);
  db.unshift(company);
  return company;
}
