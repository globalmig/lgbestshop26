import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = await getCloudflareContext();
  const { id } = await params;
  const body = await req.json() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  await env.lgbestshop_db
    .prepare(
      "UPDATE managers SET img = ?, name = ?, store = ?, tags = ?, desc = ?, href = ? WHERE id = ?"
    )
    .bind(
      body.img ?? "",
      body.name,
      body.store ?? "용산전자상가점",
      JSON.stringify(body.tags ?? []),
      body.desc ?? "",
      body.href ?? "#",
      id
    )
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = await getCloudflareContext();
  const { id } = await params;

  const row = await env.lgbestshop_db
    .prepare("SELECT img FROM managers WHERE id = ?")
    .bind(id)
    .first<{ img: string }>();

  await env.lgbestshop_db
    .prepare("DELETE FROM managers WHERE id = ?")
    .bind(id)
    .run();

  const key = row?.img?.split("/api/files/")[1];
  if (key) await env.lgbestshop_storage.delete(key);

  return Response.json({ ok: true });
}
