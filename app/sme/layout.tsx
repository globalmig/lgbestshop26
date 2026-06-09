import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소상공인 전용 안내",
  description:
    "사업장 규모와 업종에 맞는 가전 구성, 구독, 설치 상담을 LG전자 베스트샵 용산점에서 도와드립니다.",
  openGraph: {
    title: "소상공인 전용 안내 | LG전자 베스트샵 용산점",
    description: "소상공인·사업자 전용 LG 가전 구독 및 상담 안내.",
    url: "/sme",
  },
};

export default function SmeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
