import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = await getCloudflareContext();
  const { id } = await params;
  const body = await req.json() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  await env.lgbestshop_db
    .prepare("UPDATE slides SET image = ?, subtitle = ?, title = ?, description = ?, show_gradient = ?, text_color = ? WHERE id = ?")
    .bind(body.image ?? "", body.subtitle ?? "", body.title ?? "", body.description ?? "", body.show_gradient ?? "mobile", body.text_color ?? "black", Number(id))
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = await getCloudflareContext();
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
