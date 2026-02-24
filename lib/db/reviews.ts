import { sql } from "@/lib/db";

export interface Review {
  id: string;
  reviewer_name: string;
  area: string | null;
  service: string | null;
  rating: number;
  review_text: string;
  review_date: string;
  platform: string;
  verified: boolean;
  published: boolean;
}

export interface AggregateRating {
  average: number;
  count: number;
}

export async function getPublishedReviews(limit = 50): Promise<Review[]> {
  const rows = await sql`
    SELECT * FROM reviews
    WHERE published = TRUE
    ORDER BY review_date DESC
    LIMIT ${limit}
  `;
  return rows as Review[];
}

export async function getAggregateRating(): Promise<AggregateRating> {
  const rows = await sql`
    SELECT
      ROUND(AVG(rating)::numeric, 1) AS average,
      COUNT(*)::int AS count
    FROM reviews
    WHERE published = TRUE
  `;
  const row = rows[0] as { average: string; count: number };
  return {
    average: parseFloat(row.average ?? "0"),
    count: row.count ?? 0,
  };
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  const rows = await sql`
    SELECT * FROM reviews
    WHERE published = TRUE AND rating >= 5
    ORDER BY review_date DESC
    LIMIT ${limit}
  `;
  return rows as Review[];
}
