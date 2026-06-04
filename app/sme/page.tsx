import Image from "next/image";

const posts = [
  {
    category: "사업자 혜택",
    date: "상시 운영",
    title: "소상공인·사업자 전용 가전 구매 상담",
    summary: "매장, 사무실, 숙박업, 병원 등 업종별 공간에 필요한 가전을 예산과 설치 환경에 맞춰 제안합니다.",
    tags: ["사업자상담", "업종별제안"],
  },
  {
    category: "구독 안내",
    date: "상시 운영",
    title: "초기 비용 부담을 줄이는 가전구독 구성",
    summary: "정수기, 공기청정기, 냉난방 제품 등 관리가 필요한 품목은 구독 방식으로 운영 부담을 줄일 수 있습니다.",
    tags: ["가전구독", "관리서비스"],
  },
  {
    category: "패키지",
    date: "2026.06",
    title: "매장 오픈·리뉴얼 가전 패키지 제안",
    summary: "오픈 준비 일정에 맞춰 냉장고, 세탁기, TV, 공조 제품 등 필수 품목을 패키지로 상담합니다.",
    tags: ["오픈준비", "패키지"],
  },
  {
    category: "상담",
    date: "2026.06",
    title: "법인·사업자 구매 증빙 상담",
    summary: "사업자 구매 시 필요한 견적, 품목 구성, 결제 방식 등 기본 절차를 매장 담당자가 안내합니다.",
    tags: ["견적", "구매상담"],
  },
  {
    category: "설치",
    date: "상시 운영",
    title: "공간 조건에 맞춘 설치 가능 여부 확인",
    summary: "제품 선택 전 전기 용량, 배수, 배관, 동선 등 설치 조건을 함께 점검해 불필요한 시행착오를 줄입니다.",
    tags: ["설치상담", "공간점검"],
  },
];

export default function SmePage() {
  return (
    <main className="bg-white text-[#171717]">
      <section className="relative isolate min-h-[430px] overflow-hidden bg-[#171717] px-5 py-24 sm:min-h-[520px] sm:py-32">
        <Image src="/images/main/bg_hero_1.png" alt="" fill sizes="100vw" priority className="object-cover object-center opacity-58" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/76 via-black/42 to-black/12" />
        <div className="relative z-10 mx-auto flex min-h-[250px] max-w-[1180px] flex-col justify-end">
          <p className="mb-4 text-[14px] font-bold tracking-[0.16em] text-white/75">SMALL BUSINESS</p>
          <h1 className="max-w-[760px] text-[38px] font-black leading-[1.18] tracking-[-0.04em] text-white sm:text-[56px]">
            소상공인 전용 안내
          </h1>
          <p className="mt-5 max-w-[640px] break-keep text-[16px] leading-[1.8] text-white/82 sm:text-[18px]">
            사업장 규모와 업종에 맞는 가전 구성, 구독, 설치 상담을 LG전자 베스트샵 용산점에서 도와드립니다.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-8 flex flex-col gap-3 border-b border-[#1a1a1a] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[13px] font-bold text-[#c90f45]">LIST</p>
              <h2 className="text-[30px] font-black tracking-[-0.04em] sm:text-[36px]">사업자 상담 항목</h2>
            </div>
            <p className="text-[14px] text-[#777]">게시물 상세 화면 없이 리스트만 제공합니다.</p>
          </div>

          <ul className="divide-y divide-[#ececec]">
            {posts.map((post) => (
              <li key={post.title} className="py-7">
                <article className="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
                  <div className="flex items-center gap-3 sm:block">
                    <span className="inline-flex h-8 items-center rounded-full bg-[#f8eef2] px-3 text-[12px] font-bold text-[#c90f45]">{post.category}</span>
                    <time className="text-[13px] font-semibold text-[#999] sm:mt-3 sm:block">{post.date}</time>
                  </div>
                  <div>
                    <h3 className="break-keep text-[22px] font-black leading-[1.45] tracking-[-0.04em] text-[#1a1a1a]">{post.title}</h3>
                    <p className="mt-3 break-keep text-[15px] leading-[1.8] text-[#666]">{post.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[12px] font-semibold text-[#999]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
