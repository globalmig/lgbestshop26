import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
const ALLOWED_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};
const MAX_BYTES = 10 * 1024 * 1024;

function detectMime(buf: Uint8Array): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return "image/gif";
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return "image/webp";
  return null;
}

export async function POST(req: NextRequest) {
  const { env } = await getCloudflareContext();
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return Response.json({ error: "파일이 없습니다." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "파일 크기는 최대 10MB입니다." }, { status: 400 });

  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED_EXT[ext]) return Response.json({ error: "허용되지 않는 파일 형식입니다." }, { status: 400 });

  const buf = new Uint8Array(await file.arrayBuffer());
  const realMime = detectMime(buf);
  if (!realMime || !ALLOWED_MIME.includes(realMime as typeof ALLOWED_MIME[number])) {
    return Response.json({ error: "허용되지 않는 파일 형식입니다." }, { status: 400 });
  }

  const key = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  await env.lgbestshop_storage.put(key, buf, { httpMetadata: { contentType: realMime } });

  return Response.json({ url: `/api/files/${key}` });
}
