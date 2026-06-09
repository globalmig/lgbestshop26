import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const { env } = await getCloudflareContext();
  const { ids } = await req.json() as { ids: string[] };

  await Promise.all(
    ids.map((id, index) =>
      env.lgbestshop_db
        .prepare("UPDATE posts SET sort_order = ? WHERE id = ?")
        .bind(index, id)
        .run()
    )
  );

  return Response.json({ ok: true });
}
