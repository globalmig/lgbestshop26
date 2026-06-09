"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Manager } from "@/lib/adminStore";

export default function ManagerSection() {
  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    fetch("/api/managers").then((r) => r.json() as Promise<Manager[]>).then(setManagers);
  }, []);

  if (managers.length === 0) return null;

  return (
    <section className="bg-white py-10 md:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5">
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 text-[11px] font-medium tracking-[0.08em] text-[#c90f45] sm:text-[13px]">용산전자상가점 매니저를 소개합니다</p>
          <h2 className="mb-2 text-[22px] font-black tracking-[-0.05em] text-[#1a1a1a] sm:text-[28px] md:text-[34px]">상담 매니저</h2>
          <p className="text-[12px] text-[#888] sm:text-[14px]">고객 리뷰를 바탕으로 선정된 MVP 매니저를 소개합니다.</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:flex-row md:items-stretch">
          {managers.map((m) => (
            <a
              key={m.id}
              href={m.href}
              target={m.href.startsWith("http") ? "_blank" : undefined}
              rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex w-full max-w-90 flex-col items-center rounded-2xl bg-[#fdf3f5] px-6 py-8 transition-shadow hover:shadow-md sm:max-w-80 md:max-w-75 lg:max-w-85 xl:max-w-90 md:px-8 md:py-10"
            >
              <div className="mb-4 h-36 w-36 overflow-hidden rounded-full bg-[#f0dde2] sm:h-44 sm:w-44 md:h-48 md:w-48">
                <Image src={m.img} alt={m.name} width={192} height={192} className="h-full w-full object-cover object-top" />
              </div>
              <p className="mb-1 text-[17px] font-black tracking-[-0.04em] text-[#1a1a1a] sm:text-[18px] md:text-[20px]">{m.name}</p>
              <p className="mb-4 text-[12px] text-[#aaa] sm:text-[13px]">{m.store}</p>
              <div className="mb-3 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {m.tags.map((tag, i) => (
                  <span key={tag} className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium sm:px-3 sm:py-1 sm:text-[12px] ${i === 0 ? "border border-[#c90f45] text-[#c90f45]" : "bg-white text-[#555]"}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-5 text-[12px] text-[#666] sm:text-[13px]">{m.desc}</p>
              <span className="mt-auto flex h-9 w-full items-center justify-center rounded-full bg-[#c90f45] text-[12px] font-bold text-white transition-opacity group-hover:opacity-90 sm:h-10 sm:text-[13px]">예약 상담 신청</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
