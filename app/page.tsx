import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";

import Benefit from "@/components/Benefit";

const quickLinks = [
  {
    icon: "/images/icon/reservation.png",
    title: "매장 상담 예약",
    description: "네이버 예약으로 가까운 매장 예약",
  },
  {
    icon: "/images/icon/subscription.png",
    title: "가전구독",
    description: "월 구독으로 최신 가전을",
  },
  {
    icon: "/images/icon/benefit.png",
    title: "혜택 & 이달의 소식",
    description: "최신 프로모션 & 이벤트",
  },
  {
    icon: "/images/icon/smallBusiness.png",
    title: "소상공인",
    description: "기업 · 사업자 전용 혜택",
  },
];

const managers = [
  {
    img: "/images/main/bestWorker01.png",
    name: "김승근 매니저",
    store: "용산전자상가점",
    tags: ["구독 전문", "진철", "혼수 & 이사 전문"],
    desc: "현실적인 컨설팅",
  },
  {
    img: "/images/main/bestWorker02.png",
    name: "장수석 매니저",
    store: "용산전자상가점",
    tags: ["구독전문", "진철", "혼수 패키지"],
    desc: "꼼꼼한 설명",
  },
];

export default function Home() {
  return (
    <>
      <main className="min-h-[calc(100vh-44px)] bg-white text-black">
        <HeroSlider />

        <section className="border-t border-[#f1f1f1] bg-white">
          <div className="mx-auto grid h-[86px] max-w-[1440px] grid-cols-1 px-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => (
              <a href="#" key={link.title} className={`flex items-center gap-5 px-8 ${index === 0 ? "" : "border-l border-[#eeeeee]"}`}>
                <Image src={link.icon} alt="" width={32} height={32} />
                <span>
                  <span className="mb-1 block text-[13px] font-bold tracking-[-0.04em] text-[#171717]">
                    {link.title}
                    <span className="pl-2 text-[#9b9b9b]">›</span>
                  </span>
                  <span className="block text-[11px] tracking-[-0.03em] text-[#999]">{link.description}</span>
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
                <div key={m.name} className="flex w-full max-w-[360px] flex-col items-center rounded-2xl bg-[#fdf3f5] px-10 py-10">
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
                  <p className="text-[13px] text-[#666]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1440px] px-5">
            <div className="mb-10 text-center">
              <p className="mb-3 text-[13px] font-medium text-[#c90f45]">NAVER BLOG를 확인해보세요</p>
              <h2 className="mb-2 text-[34px] font-black tracking-[-0.05em] text-[#1a1a1a]">용산 전자 상가점 Blog</h2>
              <p className="text-[14px] text-[#888]">업데이트 내용을 확인해보세요</p>
            </div>

            <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {Array.from({ length: 10 }, (_, i) => (
                <a href="#" key={i} className="overflow-hidden rounded-lg">
                  <Image
                    src={`/images/main/blog/blog${String(i + 1).padStart(2, "0")}.png`}
                    alt={`블로그 ${i + 1}`}
                    width={200}
                    height={150}
                    className="max-h-[300px] w-full object-cover transition-opacity hover:opacity-90"
                  />
                </a>
              ))}
            </div>

            <div className="text-center">
              <a href="#" className="inline-flex h-10 items-center gap-1 rounded-full border border-[#ccc] px-8 text-[13px] text-[#555] hover:border-[#999]">
                전체보기 <span className="text-[16px] font-light">›</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
