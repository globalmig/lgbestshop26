import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!await verifyAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { env } = await getCloudflareContext();
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
  const { env } = await getCloudflareContext();
  const body = await req.json() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  await env.lgbestshop_db
    .prepare(
      `INSERT INTO consult_submissions (id, name, phone, purpose, area, apartment, channels, model, submitted_at, status, file_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`
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
      body.submittedAt,
      body.file_url ?? null
    )
    .run();

  return Response.json({ ok: true });
}

