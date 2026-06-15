"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

type ConsultSettings = {
  consult_badge: string;
  consult_title: string;
  consult_desc: string;
  consult_btn: string;
  consult_href: string;
};

const DEFAULTS: ConsultSettings = {
  consult_badge: "주주 상담",
  consult_title: "지금 바로 상담을 신청하세요",
  consult_desc: "전담 매니저가 빠르게 연락드립니다. 방문 없이 집에서 편리하게.",
  consult_btn: "지금 바로 상담 예약",
  consult_href: "/consult",
};

export default function ConsultBannerAdmin() {
  const [form, setForm] = useState<ConsultSettings>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json() as Promise<Partial<ConsultSettings>>)
      .then((data) => setForm({ ...DEFAULTS, ...data }))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await adminFetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[18px] font-black text-[#1a1a1a]">문의하기 배너 관리</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex h-9 items-center rounded-full bg-[#c90f45] px-5 text-[13px] font-bold text-white disabled:opacity-50"
        >
          {saved ? "저장됨 ✓" : saving ? "저장 중..." : "저장"}
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <Field label="배지 텍스트">
          <input
            value={form.consult_badge}
            onChange={(e) => setForm({ ...form, consult_badge: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="제목">
          <input
            value={form.consult_title}
            onChange={(e) => setForm({ ...form, consult_title: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="설명">
          <input
            value={form.consult_desc}
            onChange={(e) => setForm({ ...form, consult_desc: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="버튼 텍스트">
          <input
            value={form.consult_btn}
            onChange={(e) => setForm({ ...form, consult_btn: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="버튼 링크">
          <input
            value={form.consult_href}
            onChange={(e) => setForm({ ...form, consult_href: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
      </div>

      {/* 미리보기 */}
      <div className="mt-6">
        <p className="mb-3 text-[12px] font-semibold text-[#666]">미리보기</p>
        <div className="rounded-2xl bg-[#fdf3f5] px-6 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-[12px] font-medium text-[#c90f45]">{form.consult_badge}</p>
              <p className="mb-1 text-[18px] font-black tracking-tighter text-[#1a1a1a]">{form.consult_title}</p>
              <p className="text-[13px] text-[#888]">{form.consult_desc}</p>
            </div>
            <div className="flex h-10 w-fit items-center justify-center gap-1 rounded-full bg-[#c90f45] px-6 text-[13px] font-bold text-white">
              {form.consult_btn} <span className="text-[16px] font-light">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[12px] font-semibold text-[#666]">{label}</p>
      {children}
    </div>
  );
}
