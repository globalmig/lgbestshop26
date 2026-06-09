import type { MetadataRoute } from "next";

const base = "https://lgbestshop26.cksdlr4579.workers.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 일반 크롤러 — 관리자 페이지 제외
      {
        userAgent: "*",
        allow: "/",
        disallow: "/lgbs-7x4q2/",
      },

      // OpenAI (ChatGPT 학습 및 검색)
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        disallow: "/",
      },

      // Google AI (Gemini 학습)
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },

      // Anthropic (Claude 학습)
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },

      // Meta AI (LLaMA 학습)
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },

      // Common Crawl (AI 학습 데이터셋 주요 소스)
      {
        userAgent: "CCBot",
        disallow: "/",
      },

      // Cohere AI
      {
        userAgent: "cohere-ai",
        disallow: "/",
      },

      // Bytedance (ByteSpider — TikTok AI)
      {
        userAgent: "Bytespider",
        disallow: "/",
      },

      // Apple AI (Apple Intelligence)
      {
        userAgent: "Applebot-Extended",
        disallow: "/",
      },

      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },

      // Amazon Alexa AI
      {
        userAgent: "Amazonbot",
        disallow: "/",
      },

      // Diffbot (구조화 데이터 AI 크롤러)
      {
        userAgent: "Diffbot",
        disallow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
