import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    const { env } = await getCloudflareContext();
    const { results } = await env.lgbestshop_db
      .prepare("SELECT * FROM slides ORDER BY sort_order ASC")
      .all();
    return Response.json(results);
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!await verifyAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { env } = await getCloudflareContext();
  const body = await req.json() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  const { results } = await env.lgbestshop_db
    .prepare("SELECT MAX(id) as maxId FROM slides")
    .all();
  const maxId = (results[0]?.maxId as number) ?? 0;

  await env.lgbestshop_db
    .prepare("INSERT INTO slides (id, image, subtitle, title, description, show_gradient, text_color, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(maxId + 1, body.image ?? "", body.subtitle ?? "", body.title ?? "", body.description ?? "", body.show_gradient ?? "mobile", body.text_color ?? "black", maxId + 1)
    .run();

  return Response.json({ ok: true, id: maxId + 1 });
}

