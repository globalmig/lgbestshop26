import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const { results } = await env.lgbestshop_db
    .prepare("SELECT * FROM slides ORDER BY sort_order ASC")
    .all();

  return Response.json(results);
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const body = await req.json();

  const { results } = await env.lgbestshop_db
    .prepare("SELECT MAX(id) as maxId FROM slides")
    .all();
  const maxId = (results[0]?.maxId as number) ?? 0;

  await env.lgbestshop_db
    .prepare("INSERT INTO slides (id, image, subtitle, title, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(maxId + 1, body.image ?? "", body.subtitle ?? "", body.title ?? "", body.description ?? "", maxId + 1)
    .run();

  return Response.json({ ok: true, id: maxId + 1 });
}

