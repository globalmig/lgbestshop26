import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = getRequestContext();
  const { id } = await params;

  const result = await env.lgbestshop_db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .bind(id)
    .first();

  if (!result) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(result);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = getRequestContext();
  const { id } = await params;
  const body = await req.json();

  await env.lgbestshop_db
    .prepare("UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?")
    .bind(body.title, body.content, body.image ?? "", id)
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = getRequestContext();
  const { id } = await params;

  const row = await env.lgbestshop_db
    .prepare("SELECT image FROM posts WHERE id = ?")
    .bind(id)
    .first<{ image: string }>();

  await env.lgbestshop_db
    .prepare("DELETE FROM posts WHERE id = ?")
    .bind(id)
    .run();

  const key = row?.image?.split("/api/files/")[1];
  if (key) await env.lgbestshop_storage.delete(key);

  return Response.json({ ok: true });
}
