import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "혜택 & 이달의 소식",
  description:
    "LG전자 베스트샵 용산점에서 진행 중인 최신 프로모션, 이벤트, 매장 소식을 확인하세요.",
  openGraph: {
    title: "혜택 & 이달의 소식 | LG전자 베스트샵 용산점",
    description: "LG전자 베스트샵 용산점의 최신 혜택과 이달의 소식을 확인하세요.",
    url: "/benefit",
  },
};

export default function BenefitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
