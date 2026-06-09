import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const token = req.headers.get("x-admin-token");
  if (!token) return false;
  const { env } = await getCloudflareContext();
  const adminPassword = (env as unknown as Record<string, string>).ADMIN_PASSWORD;
  return !!(adminPassword && token === adminPassword);
}
