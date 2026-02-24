import { sql } from "@/lib/db";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  page_source: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  pageSource?: string;
  ipAddress?: string;
}

export async function createLead(data: CreateLeadInput): Promise<string> {
  const rows = await sql`
    INSERT INTO leads (name, email, phone, message, page_source, ip_address)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone ?? null},
      ${data.message},
      ${data.pageSource ?? null},
      ${data.ipAddress ?? null}
    )
    RETURNING id
  `;
  return (rows[0] as { id: string }).id;
}

export async function getLeads(limit = 50): Promise<Lead[]> {
  const rows = await sql`
    SELECT * FROM leads
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as Lead[];
}
