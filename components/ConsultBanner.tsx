export default function ConsultBanner() {
  return (
    <section id="consult" className="bg-[#fdf3f5] py-14">
      <div className="mx-auto flex max-w-270 flex-col items-start gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-[13px] font-medium text-[#c90f45]">주주 상담</p>
          <h2 className="mb-2 text-[22px] font-black tracking-tighter text-[#1a1a1a] sm:text-[30px]">
            지금 바로 상담을 신청하세요
          </h2>
          <p className="text-[14px] text-[#888]">
            전담 매니저가 빠르게 연락드립니다. 방문 없이 집에서 편리하게.
          </p>
        </div>
        <a
          href="/consult"
          className="flex h-12 w-full items-center justify-center gap-1 rounded-full bg-[#c90f45] px-8 text-[15px] font-bold text-white sm:w-auto sm:justify-start"
        >
          지금 바로 상담 예약 <span className="text-[18px] font-light">›</span>
        </a>
      </div>
    </section>
  );
}
