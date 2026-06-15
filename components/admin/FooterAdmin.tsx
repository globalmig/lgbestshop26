"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

type FooterSettings = {
  footer_company: string;
  footer_ceo: string;
  footer_reg_no: string;
  footer_address: string;
  footer_copyright: string;
};

const DEFAULTS: FooterSettings = {
  footer_company: "우주전자 전자랜드지점",
  footer_ceo: "김진웅",
  footer_reg_no: "106-85-38456",
  footer_address: "서울특별시 용산구 청파로 74 용산전자랜드",
  footer_copyright: "© 2025 LG Electronics Inc. All rights reserved.",
};

export default function FooterAdmin() {
  const [form, setForm] = useState<FooterSettings>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json() as Promise<Partial<FooterSettings>>)
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
        <h2 className="text-[18px] font-black text-[#1a1a1a]">푸터 정보 관리</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex h-9 items-center rounded-full bg-[#c90f45] px-5 text-[13px] font-bold text-white disabled:opacity-50"
        >
          {saved ? "저장됨 ✓" : saving ? "저장 중..." : "저장"}
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <Field label="사업자명">
          <input
            value={form.footer_company}
            onChange={(e) => setForm({ ...form, footer_company: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="대표">
          <input
            value={form.footer_ceo}
            onChange={(e) => setForm({ ...form, footer_ceo: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="사업자등록번호">
          <input
            value={form.footer_reg_no}
            onChange={(e) => setForm({ ...form, footer_reg_no: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="주소">
          <input
            value={form.footer_address}
            onChange={(e) => setForm({ ...form, footer_address: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
        <Field label="저작권 문구">
          <input
            value={form.footer_copyright}
            onChange={(e) => setForm({ ...form, footer_copyright: e.target.value })}
            className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
          />
        </Field>
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
