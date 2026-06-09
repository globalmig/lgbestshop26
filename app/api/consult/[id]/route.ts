import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await verifyAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { env } = await getCloudflareContext();
  const { id } = await params;
  const body = await req.json() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  await env.lgbestshop_db
    .prepare("UPDATE consult_submissions SET status = ? WHERE id = ?")
    .bind(body.status, id)
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await verifyAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { env } = await getCloudflareContext();
  const { id } = await params;

  await env.lgbestshop_db
    .prepare("DELETE FROM consult_submissions WHERE id = ?")
    .bind(id)
    .run();

  return Response.json({ ok: true });
}
