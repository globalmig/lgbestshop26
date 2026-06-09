import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function PATCH(req: NextRequest) {
  if (!await verifyAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { env } = await getCloudflareContext();
  const { ids } = await req.json() as { ids: number[] };

  await Promise.all(
    ids.map((id, index) =>
      env.lgbestshop_db
        .prepare("UPDATE slides SET sort_order = ? WHERE id = ?")
        .bind(index, id)
        .run()
    )
  );

  return Response.json({ ok: true });
}
