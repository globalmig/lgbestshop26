"use client";

import { useEffect, useState } from "react";

type Settings = {
  consult_badge: string;
  consult_title: string;
  consult_desc: string;
  consult_btn: string;
  consult_href: string;
};

const DEFAULTS: Settings = {
  consult_badge: "주주 상담",
  consult_title: "지금 바로 상담을 신청하세요",
  consult_desc: "전담 매니저가 빠르게 연락드립니다. 방문 없이 집에서 편리하게.",
  consult_btn: "지금 바로 상담 예약",
  consult_href: "/consult",
};

export default function ConsultBanner() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json() as Promise<Partial<Settings>>)
      .then((data) => setSettings({ ...DEFAULTS, ...data }))
      .catch(() => {});
  }, []);

  return (
    <section id="consult" className="bg-[#fdf3f5] py-14">
      <div className="mx-auto flex max-w-270 flex-col items-start gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-[13px] font-medium text-[#c90f45]">{settings.consult_badge}</p>
          <h2 className="mb-2 text-[22px] font-black tracking-tighter text-[#1a1a1a] sm:text-[30px]">
            {settings.consult_title}
          </h2>
          <p className="text-[14px] text-[#888]">{settings.consult_desc}</p>
        </div>
        <a
          href={settings.consult_href}
          className="flex h-12 w-full items-center justify-center gap-1 rounded-full bg-[#c90f45] px-8 text-[15px] font-bold text-white sm:w-auto sm:justify-start"
        >
          {settings.consult_btn} <span className="text-[18px] font-light">›</span>
        </a>
      </div>
    </section>
  );
}
