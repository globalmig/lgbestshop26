import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { env } = getRequestContext();
  const type = req.nextUrl.searchParams.get("type");

  const { results } = await env.lgbestshop_db
    .prepare("SELECT * FROM posts WHERE type = ? ORDER BY created_at DESC")
    .bind(type)
    .all();

  const rows = results.map((r: Record<string, unknown>) => ({
    ...r,
    createdAt: r.created_at,
  }));

  return Response.json(rows);
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const body = await req.json();

  await env.lgbestshop_db
    .prepare("INSERT INTO posts (id, type, title, content, image, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(body.id, body.type, body.title, body.content, body.image ?? "", body.createdAt)
    .run();

  return Response.json({ ok: true });
}

