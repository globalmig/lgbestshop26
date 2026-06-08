import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = getRequestContext();
  const { id } = await params;
  const body = await req.json();

  await env.lgbestshop_db
    .prepare("UPDATE consult_submissions SET status = ? WHERE id = ?")
    .bind(body.status, id)
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { env } = getRequestContext();
  const { id } = await params;

  await env.lgbestshop_db
    .prepare("DELETE FROM consult_submissions WHERE id = ?")
    .bind(id)
    .run();

  return Response.json({ ok: true });
}
