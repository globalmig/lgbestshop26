import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://lgbestshop26.cksdlr4579.workers.dev"),
  title: {
    default: "LG전자 베스트샵 용산점",
    template: "%s | LG전자 베스트샵 용산점",
  },
  description:
    "LG전자 베스트샵 용산전자상가점 공식 안내. 가전 구독, 혜택·이달의 소식, 소상공인 전용 안내, 비대면 상담 신청까지 한곳에서 확인하세요.",
  keywords: [
    "LG전자", "베스트샵", "용산", "가전구독", "LG베스트샵",
    "용산전자상가", "LG구독", "가전렌탈", "소상공인가전",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "LG전자 베스트샵 용산점",
    images: [
      { url: "/images/main/bg_benefit.png", width: 1200, height: 630, alt: "LG전자 베스트샵 용산점" },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ElectronicsStore",
              name: "LG전자 베스트샵 용산전자랜드점",
              alternateName: ["LG베스트샵 용산점", "우주전자 전자랜드지점"],
              legalName: "우주전자 전자랜드지점",
              url: "https://lgbestshop26.cksdlr4579.workers.dev",
              description:
                "LG전자 공식 베스트샵 용산전자랜드점. 가전 구독, 소상공인 전용 안내, 비대면 상담 신청 서비스를 제공합니다.",
              brand: {
                "@type": "Brand",
                name: "LG전자",
                url: "https://www.lge.co.kr",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "청파로 74 용산전자랜드",
                addressLocality: "용산구",
                addressRegion: "서울특별시",
                postalCode: "04379",
                addressCountry: "KR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.5298,
                longitude: 126.9644,
              },
              telephone: "+82-2-703-7399",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "10:00",
                  closes: "20:00",
                },
              ],
              priceRange: "₩₩",
              sameAs: [
                "https://blog.naver.com/lg_yongsan",
                "https://map.naver.com/p/entry/place/33706664",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <ConditionalLayout />
        <Footer />
      </body>
    </html>
  );
}
