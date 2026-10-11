import type { Category, Company, Connection } from "./types";

const c = (
  id: string, name: string, domain: string, logoDomain: string,
  connection: Connection, interaction: string | null, category: Category,
  description: string, activeProjects: number, teamSize: number, activity: number[],
): Company => ({
  id, name, domain, logoDomain, connection, interaction, category,
  description, activeProjects, teamSize, activity,
});

export const companies: Company[] = [
  c("zendesk", "Zendesk", "zendesk.app", "zendesk.com", "very-strong", "2026-01-12", "Productivity", "Customer support platform. Used daily by the success team for ticket routing and SLAs.", 8, 14, [4, 6, 5, 8, 7, 9, 6]),
  c("figma", "Figma", "figma.com", "figma.com", "very-strong", "2026-01-03", "Collaboration", "UI/UX design and prototyping tool. Usage is high across product and design, with frequent interaction.", 12, 18, [5, 7, 9, 6, 10, 8, 11]),
  c("stripe", "Stripe", "stripe.com", "stripe.com", "strong", "2026-01-20", "B2B", "Payments infrastructure powering billing and invoicing across all customer accounts.", 5, 9, [3, 4, 6, 5, 7, 6, 8]),
  c("framer", "Framer", "framer.com", "framer.com", "good", null, "B2B", "Site builder used for marketing pages and quick landing page experiments.", 3, 5, [2, 3, 2, 4, 3, 5, 4]),
  c("notion", "Notion", "notion.so", "notion.so", "good", null, "Productivity", "Docs and wiki. Internal knowledge base and product specs live here.", 6, 22, [4, 5, 7, 6, 5, 8, 7]),
  c("webflow", "Webflow", "webflow.com", "webflow.com", "strong", "2026-01-06", "SaaS", "Visual CMS handling the public site and blog publishing workflow.", 4, 7, [3, 5, 4, 6, 5, 7, 6]),
  c("zapier", "Zapier", "zapier.com", "zapier.com", "good", null, "Productivity", "Automation glue between forms, CRM and Slack notifications.", 7, 4, [2, 4, 3, 5, 4, 6, 5]),
  c("atlassian", "Atlassian", "atlassian.com", "atlassian.com", "weak", null, "SaaS", "Jira and Confluence. Legacy usage, being migrated off gradually.", 2, 11, [5, 4, 3, 3, 2, 2, 1]),
  c("mixpanel", "Mixpanel", "mixpanel.com", "mixpanel.com", "very-strong", "2026-01-10", "B2B", "Product analytics for funnels, retention and feature adoption.", 9, 8, [4, 6, 8, 7, 9, 8, 10]),
  c("loom", "Loom", "loom.com", "loom.com", "strong", null, "Software", "Async video updates shared with customers and across the team.", 3, 12, [3, 4, 5, 4, 6, 5, 6]),
  c("slack", "Slack", "slack.com", "slack.com", "very-strong", "2026-01-15", "Productivity", "Primary team chat with shared channels for key accounts.", 11, 30, [6, 8, 9, 10, 8, 11, 9]),
  c("miro", "Miro", "miro.com", "miro.com", "strong", "2026-01-07", "Collaboration", "Whiteboarding for roadmap sessions and customer workshops.", 4, 10, [3, 4, 6, 5, 7, 6, 8]),
  c("hubspot", "HubSpot", "hubspot.com", "hubspot.com", "very-strong", "2026-01-22", "Software", "Marketing automation and CRM source of truth for inbound leads.", 10, 16, [5, 7, 8, 9, 8, 10, 11]),
  c("calendly", "Calendly", "calendly.com", "calendly.com", "good", "2026-01-28", "B2B", "Scheduling links used by sales for discovery and onboarding calls.", 2, 6, [2, 3, 4, 3, 5, 4, 5]),
  c("typeform", "Typeform", "typeform.com", "typeform.com", "weak", null, "Software", "Survey tool used for occasional NPS and feedback campaigns.", 1, 3, [3, 2, 2, 1, 2, 1, 1]),
];
