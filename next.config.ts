import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
  void import("@cloudflare/next-on-pages/next-dev").then(({ setupDevPlatform }) =>
    setupDevPlatform()
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.pstatic.net" },
      { protocol: "https", hostname: "blogthumb.pstatic.net" },
    ],
  },
};

export default nextConfig;
