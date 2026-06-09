import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = await getCloudflareContext();
  const { id } = await params;
  const body = await req.json() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  await env.lgbestshop_db
    .prepare("UPDATE consult_submissions SET status = ? WHERE id = ?")
    .bind(body.status, id)
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = await getCloudflareContext();
  const { id } = await params;

  await env.lgbestshop_db
    .prepare("DELETE FROM consult_submissions WHERE id = ?")
    .bind(id)
    .run();

  return Response.json({ ok: true });
}
