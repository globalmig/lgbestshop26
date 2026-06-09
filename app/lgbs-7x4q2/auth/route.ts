import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password, cfToken } = await req.json() as { password: string; cfToken?: string };
    const { env } = await getCloudflareContext();
    const cfEnv = env as unknown as Record<string, string>;

    const turnstileSecret = cfEnv.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!cfToken) return Response.json({ ok: false }, { status: 401 });
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: turnstileSecret, response: cfToken }),
      });
      const { success } = await verifyRes.json() as { success: boolean };
      if (!success) return Response.json({ ok: false }, { status: 401 });
    }

    const adminPassword = cfEnv.ADMIN_PASSWORD;
    if (adminPassword && password === adminPassword) {
      return Response.json({ ok: true, token: adminPassword });
    }
    return Response.json({ ok: false }, { status: 401 });
  } catch (e) {
    console.error("[auth] error:", e);
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
