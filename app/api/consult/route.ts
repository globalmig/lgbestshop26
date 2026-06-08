import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const { results } = await env.lgbestshop_db
    .prepare("SELECT * FROM consult_submissions ORDER BY submitted_at DESC")
    .all();

  const rows = results.map((r: Record<string, unknown>) => ({
    ...r,
    channels: JSON.parse((r.channels as string) || "[]"),
    submittedAt: r.submitted_at,
  }));

  return Response.json(rows);
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const body = await req.json();

  await env.lgbestshop_db
    .prepare(
      `INSERT INTO consult_submissions (id, name, phone, purpose, area, apartment, channels, model, submitted_at, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`
    )
    .bind(
      body.id,
      body.name,
      body.phone,
      body.purpose,
      body.area,
      body.apartment ?? "",
      JSON.stringify(body.channels ?? []),
      body.model ?? "",
      body.submittedAt
    )
    .run();

  return Response.json({ ok: true });
}

