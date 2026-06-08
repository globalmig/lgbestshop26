import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = getRequestContext();
  const { id } = await params;
  const body = await req.json();

  await env.lgbestshop_db
    .prepare("UPDATE slides SET image = ?, subtitle = ?, title = ?, description = ? WHERE id = ?")
    .bind(body.image ?? "", body.subtitle ?? "", body.title ?? "", body.description ?? "", Number(id))
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = getRequestContext();
  const { id } = await params;

  const row = await env.lgbestshop_db
    .prepare("SELECT image FROM slides WHERE id = ?")
    .bind(Number(id))
    .first<{ image: string }>();

  await env.lgbestshop_db
    .prepare("DELETE FROM slides WHERE id = ?")
    .bind(Number(id))
    .run();

  const key = row?.image?.split("/api/files/")[1];
  if (key) await env.lgbestshop_storage.delete(key);

  return Response.json({ ok: true });
}
