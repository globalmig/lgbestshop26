import Image from "next/image";

const benefits = [
  { icon: "/images/icon/3D/house.png", text: "전문가의\n방문관리" },
  { icon: "/images/icon/3D/calendar.png", text: "구독 기간내\n무상 A/S" },
  { icon: "/images/icon/3D/box.png", text: "LG 정품\n소모품 정기\n무상 교체" },
  { icon: "/images/icon/3D/Wallet.png", text: "전문가의\n방문관리" },
  { icon: "/images/icon/3D/gift.png", text: "일시불과\n차이없는\n가격!" },
  { icon: "/images/icon/3D/truck.png", text: "이사 & 위치 변경\n무상 재설치" },
];

interface BenefitProps {
  bg: string;
}

export default function Benefit({ bg }: BenefitProps) {
  return (
    <section className="relative overflow-hidden py-10 md:py-20">
      <Image src={bg} alt="" fill sizes="100vw" className="object-cover object-center" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-5">
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 text-[11px] font-medium text-[#c90f45] sm:text-[13px]">가전 구독하면 무엇이 좋은가요?</p>
          <h2 className="text-[18px] font-black leading-[1.3] tracking-[-0.05em] text-[#1a1a1a] sm:text-[22px] md:text-[26px] lg:text-[30px]">
            일시불과 차이없는 가격!
            <br />
            부담은 지우고 전문가의 빈틈없는 케어를 남겨드립니다.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {benefits.map((item, i) => (
            <div key={i} className="flex min-h-30 flex-col justify-center overflow-hidden rounded-2xl bg-white px-20 pt-4 shadow-sm sm:min-h-35 sm:px-6 sm:pt-5 md:min-h-40 md:px-8 md:pt-6">
              <p className="whitespace-pre-line text-[1.4rem] font-black leading-[1.35] tracking-[-0.04em] text-[#5E4242] md:text-[1.4rem] lg:text-[1.7rem]">{item.text}</p>
              <div className="flex justify-end">
                <Image src={item.icon} alt="" width={200} height={172} className="h-auto w-28 md:w-32 lg:w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
