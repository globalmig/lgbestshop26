import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { password } = await req.json() as { password: string };
  const { env } = await getCloudflareContext({ async: true });
  const adminPassword = (env as unknown as Record<string, string>).ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD;
  if (adminPassword && password === adminPassword) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
