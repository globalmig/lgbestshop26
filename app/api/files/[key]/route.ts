import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { env } = getRequestContext();
  const { key } = await params;

  const obj = await env.lgbestshop_storage.get(key);
  if (!obj) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  headers.set("Content-Type", obj.httpMetadata?.contentType ?? "application/octet-stream");
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(obj.body, { headers });
}
