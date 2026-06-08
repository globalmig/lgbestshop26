import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const { env } = getRequestContext();
    const { results } = await env.lgbestshop_db
      .prepare("SELECT * FROM managers ORDER BY sort_order ASC")
      .all();

    const rows = results.map((r: Record<string, unknown>) => ({
      ...r,
      tags: JSON.parse((r.tags as string) || "[]"),
    }));

    return Response.json(rows);
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const body = await req.json();

  const { results } = await env.lgbestshop_db
    .prepare("SELECT COUNT(*) as cnt FROM managers")
    .all();
  const sortOrder = (results[0]?.cnt as number) ?? 0;

  await env.lgbestshop_db
    .prepare(
      `INSERT INTO managers (id, img, name, store, tags, desc, href, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      body.id,
      body.img ?? "",
      body.name,
      body.store ?? "용산전자상가점",
      JSON.stringify(body.tags ?? []),
      body.desc ?? "",
      body.href ?? "#",
      sortOrder
    )
    .run();

  return Response.json({ ok: true });
}
