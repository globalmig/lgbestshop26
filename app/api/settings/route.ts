import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    const { env } = await getCloudflareContext();
    const { results } = await env.lgbestshop_db
      .prepare("SELECT key, value FROM settings")
      .all<{ key: string; value: string }>();
    const obj: Record<string, string> = {};
    for (const row of results) obj[row.key] = row.value;
    return Response.json(obj);
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!await verifyAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { env } = await getCloudflareContext();
  const body = await req.json() as Record<string, string>;

  const stmt = env.lgbestshop_db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
  await Promise.all(Object.entries(body).map(([key, value]) => stmt.bind(key, value).run()));

  return Response.json({ ok: true });
}
