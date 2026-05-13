export default function ConsultBanner() {
  return (
    <section id="consult" className="bg-[#fdf3f5] py-14">
      <div className="mx-auto flex max-w-270 items-center justify-between px-5">
        <div>
          <p className="mb-2 text-[13px] font-medium text-[#c90f45]">주주 상담</p>
          <h2 className="mb-2 text-[30px] font-black tracking-tighter text-[#1a1a1a]">
            지금 바로 상담을 신청하세요
          </h2>
          <p className="text-[14px] text-[#888]">
            전담 매니저가 빠르게 연락드립니다. 방문 없이 집에서 편리하게.
          </p>
        </div>
        <a
          href="/consult"
          className="flex h-12 items-center gap-1 whitespace-nowrap rounded-full bg-[#c90f45] px-8 text-[15px] font-bold text-white"
        >
          지금 바로 상담 예약 <span className="text-[18px] font-light">›</span>
        </a>
      </div>
    </section>
  );
}
