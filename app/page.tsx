import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import Benefit from "@/components/Benefit";
import BlogSection from "@/components/BlogSection";
import { getNaverBlogPosts } from "@/lib/naverBlog";

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

const managers = [
  {
    img: "/images/main/bestWorker01.png",
    name: "이원표 지점장",
    store: "용산전자상가점",
    tags: ["구독 전문", "진철", "혼수 & 이사 전문"],
    desc: "현실적인 컨설팅",
    href: "https://map.naver.com/p/search/lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90/place/33706664?placePath=/ticket?bk_query=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&fromNxList=true&fromPanelNum=2&timestamp=202605131002&locale=ko&svcName=map_pcv5&searchText=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&type=list&fromNxList=true&fromPanelNum=2&timestamp=202605131002&locale=ko&svcName=map_pcv5&searchText=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&type=list&from=map&searchType=place&c=15.00,0,0,0,dh",
  },
  {
    img: "/images/main/bestWorker02.png",
    name: "장수석 부장님",
    store: "용산전자상가점",
    tags: ["구독전문", "진철", "혼수 패키지"],
    desc: "꼼꼼한 설명",
    href: "https://map.naver.com/p/search/lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90/place/33706664?placePath=/ticket?bk_query=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&fromNxList=true&fromPanelNum=2&timestamp=202605131002&locale=ko&svcName=map_pcv5&searchText=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&type=list&fromNxList=true&fromPanelNum=2&timestamp=202605131002&locale=ko&svcName=map_pcv5&searchText=lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90&type=list&from=map&searchType=place&c=15.00,0,0,0,dh",
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

        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1440px] w-full px-5">
            <div className="mb-12 text-center">
              <p className="mb-3 text-[13px] font-medium tracking-[0.08em] text-[#c90f45]">용산점 직원을 소개합니다</p>
              <h2 className="mb-3 text-[34px] font-black tracking-[-0.05em] text-[#1a1a1a]">매니저 리뷰 어워드</h2>
              <p className="text-[14px] text-[#888]">고객 리뷰를 바탕으로 선정된 MVP 매니저를 소개합니다.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center  gap-6">
              {managers.map((m) => (
                <a key={m.name} href={m.href} className="group flex w-full max-w-90 flex-col items-center rounded-2xl bg-[#fdf3f5] px-10 py-10 transition-shadow hover:shadow-md">
                  <div className="mb-5 h-[140px] w-[140px] overflow-hidden rounded-full bg-[#f0dde2]">
                    <Image src={m.img} alt={m.name} width={140} height={140} className="h-full w-full object-cover object-top" />
                  </div>
                  <p className="mb-1 text-[20px] font-black tracking-[-0.04em] text-[#1a1a1a]">{m.name}</p>
                  <p className="mb-5 text-[13px] text-[#aaa]">{m.store}</p>
                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {m.tags.map((tag, i) => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-[12px] font-medium ${i === 0 ? "border border-[#c90f45] text-[#c90f45]" : "bg-white text-[#555]"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mb-6 text-[13px] text-[#666]">{m.desc}</p>
                  <span className="flex h-10 w-full items-center justify-center rounded-full bg-[#c90f45] text-[13px] font-bold text-white transition-opacity group-hover:opacity-90">
                    예약 상담 신청
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <BlogSection posts={blogPosts} moreHref="https://blog.naver.com/lg_yongsan" />
      </main>
    </>
  );
}
