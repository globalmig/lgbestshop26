import ConsultForm from "@/components/ConsultForm";

export const metadata = {
  title: "상담 신청 | LG전자 BEST SHOP",
  description: "LG베스트샵 용산전자상가점 비대면 상담 신청",
};

export default function ConsultPage() {
  return (
    <main className="bg-white">
      {/* 히어로 */}
      <section className="bg-[#fdf3f5] py-14">
        <div className="mx-auto max-w-[640px] px-5 text-center">
          <p className="mb-4 text-[28px] font-black tracking-tighter text-[#1a1a1a]">
            💌 LG베스트샵 용산전자상가점<br />비대면 상담 신청서
          </p>
          <p className="mb-6 text-[22px] font-black tracking-tighter text-[#c90f45]">
            가전 구독 최대 혜택 도전!
          </p>
          <p className="mb-6 text-[14px] leading-relaxed text-[#555]">
            하기 정보를 입력해주시면 빠른 상담 받으실 수 있도록 도와드리겠습니다.
          </p>
          <div className="mb-6 rounded-2xl bg-white px-6 py-5 text-left shadow-sm">
            <p className="mb-2 text-[15px] font-black text-[#1a1a1a]">가전은 LG!</p>
            <p className="mb-4 text-[13px] leading-relaxed text-[#666]">
              라이프스타일에 맞는 최적화된 맞춤 상담, 저희가 끝내드리겠습니다.<br />
              가전구독에 미쳐있는 지점장이 고객님께 드릴 수 있는 혜택 다 끌어 모았습니다.
            </p>
            <div className="space-y-2 border-t border-[#f1f1f1] pt-4">
              <p className="text-[13px] leading-relaxed text-[#555]">
                ⭐ LG베스트샵 용산은 최대 혜택 금액을 맞춰드리기 위해 매주·매달 변경되는 정책에 따라 지속적으로 업데이트 및 제안해드립니다.
              </p>
              <p className="text-[13px] leading-relaxed text-[#555]">
                ⭐ 고객님께서 최대한 저렴하게 구매하실 수 있도록 저희가 도와드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 폼 */}
      <section className="py-14">
        <div className="mx-auto max-w-[640px] px-5">
          <ConsultForm />
        </div>
      </section>
    </main>
  );
}
