import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import Benefit from "@/components/Benefit";
import BlogSection from "@/components/BlogSection";
import { getNaverBlogPosts } from "@/lib/naverBlog";
import ManagerSection from "@/components/ManagerSection";

const quickLinks = [
  {
    icon: "/images/icon/reservation.png",
    title: "매장 상담 예약",
    description: "네이버 예약으로 가까운 매장 예약",
    href: "https://map.naver.com/p/search/lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90/place/33706664?placePath=/ticket?bk_query=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&fromNxList=true&fromPanelNum=2&timestamp=202605131002&locale=ko&svcName=map_pcv5&searchText=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&type=list&fromNxList=true&fromPanelNum=2&timestamp=202605131002&locale=ko&svcName=map_pcv5&searchText=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&type=list&from=map&searchType=place&c=15.00,0,0,0,dh",
    blank: true,
  },
  {
    icon: "/images/icon/subscription.png",
    title: "가전구독",
    description: "월 구독으로 최신 가전을",
    href: "/subscription",
  },
  {
    icon: "/images/icon/benefit.png",
    title: "혜택 & 이달의 소식",
    description: "최신 프로모션 & 이벤트",
    href: "#",
  },
  {
    icon: "/images/icon/smallBusiness.png",
    title: "소상공인",
    description: "기업 · 사업자 전용 혜택",
    href: "#",
  },
];


export default async function Home() {
  const blogPosts = await getNaverBlogPosts("lg_yongsan");

  return (
    <>
      <main className="min-h-[calc(100vh-44px)] bg-white text-black">
        <HeroSlider />

        {/* 퀵메뉴 */}
        <section className="border-t border-[#f1f1f1] bg-white">
          <div className="mx-auto grid max-w-360 grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => (
              <a
                href={link.href}
                key={link.title}
                {...(link.blank && { target: "_blank", rel: "noopener noreferrer" })}
                className={[
                  "flex items-center gap-3 px-5 py-4 sm:gap-5 sm:px-8 lg:h-21.5 lg:py-0 border-[#eeeeee]",
                  index % 2 !== 0 ? "border-l" : "",
                  index >= 2 ? "border-t lg:border-t-0" : "",
                  index > 0 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <Image src={link.icon} alt="" width={32} height={32} className="shrink-0" />
                <span>
                  <span className="mb-0.5 block text-[12px] sm:text-[13px] font-bold tracking-[-0.04em] text-[#171717]">
                    {link.title}
                    <span className="pl-2 text-[#9b9b9b]">›</span>
                  </span>
                  <span className="block text-[10px] sm:text-[11px] tracking-[-0.03em] text-[#999]">{link.description}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* 혜택 소개 */}
        <Benefit bg="/images/main/bg_benefit.png" />

        <ManagerSection />

        <BlogSection posts={blogPosts} moreHref="https://blog.naver.com/lg_yongsan" />
      </main>
    </>
  );
}
