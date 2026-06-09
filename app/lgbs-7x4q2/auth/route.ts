import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json() as { password: string };
    const { env } = await getCloudflareContext();
    const adminPassword = (env as unknown as Record<string, string>).ADMIN_PASSWORD;
    if (adminPassword && password === adminPassword) {
      return Response.json({ ok: true });
    }
    return Response.json({ ok: false }, { status: 401 });
  } catch (e) {
    console.error("[auth] error:", e);
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
