/**
 * Template rendering engine.
 * Loads templates from DB; replaces {{variable}} placeholders.
 */
import { prisma } from "@/lib/prisma";

type TemplateVars = Record<string, string | number | undefined | null>;

export function renderTemplate(body: string, vars: TemplateVars): string {
  return body.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const val = vars[key];
    return val !== undefined && val !== null ? String(val) : `[${key}]`;
  });
}

export async function getTemplate(key: string): Promise<string | null> {
  try {
    const t = await prisma.messageTemplate.findUnique({ where: { key, isActive: true } });
    return t?.body ?? null;
  } catch {
    return null;
  }
}

export async function renderNamedTemplate(key: string, vars: TemplateVars): Promise<string> {
  const body = await getTemplate(key);
  if (!body) return `[Template '${key}' not found]`;
  return renderTemplate(body, vars);
}
