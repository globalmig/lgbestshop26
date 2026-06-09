import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { env } = await getCloudflareContext();
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return Response.json({ error: "파일이 없습니다." }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const key = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  await env.lgbestshop_storage.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  return Response.json({ url: `/api/files/${key}` });
}
