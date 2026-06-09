import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAADhO6Nx4Tu8Luy0M",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.pstatic.net" },
      { protocol: "https", hostname: "blogthumb.pstatic.net" },
    ],
  },
};

export default nextConfig;
