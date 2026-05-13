"use client";

import { useState } from "react";
import { adminStore, type ConsultSubmission } from "@/lib/adminStore";

const STATUS = {
  new: { label: "신규", cls: "bg-blue-50 text-blue-600 border-blue-200" },
  inProgress: { label: "진행중", cls: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  completed: { label: "완료", cls: "bg-green-50 text-green-600 border-green-200" },
} as const;

export default function ConsultAdmin() {
  const [submissions, setSubmissions] = useState<ConsultSubmission[]>(() => adminStore.consult.get());
  const [selected, setSelected] = useState<ConsultSubmission | null>(null);

  const updateStatus = (id: string, status: ConsultSubmission["status"]) => {
    const updated = submissions.map((s) => (s.id === id ? { ...s, status } : s));
    setSubmissions(updated);
    adminStore.consult.set(updated);
    if (selected?.id === id) setSelected((prev) => prev && { ...prev, status });
  };

  const handleDelete = (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    const updated = submissions.filter((s) => s.id !== id);
    setSubmissions(updated);
    adminStore.consult.set(updated);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[18px] font-black text-[#1a1a1a]">상담 신청 현황</h2>
        <span className="text-[13px] text-[#888]">총 {submissions.length}건 · 신규 {submissions.filter((s) => s.status === "new").length}건</span>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl bg-white py-20 text-center text-[14px] text-[#aaa] shadow-sm">접수된 상담 신청이 없습니다.</div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} onClick={() => setSelected(sub)}
              className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div>
                <p className="font-bold text-[#1a1a1a]">{sub.name} <span className="font-normal text-[#888] text-[13px]">{sub.phone}</span></p>
                <p className="text-[13px] text-[#888]">{sub.purpose} · {sub.area}</p>
                <p className="text-[11px] text-[#bbb]">{new Date(sub.submittedAt).toLocaleString("ko-KR")}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-[12px] font-semibold ${STATUS[sub.status].cls}`}>
                {STATUS[sub.status].label}
              </span>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white mx-4">
            <div className="flex items-center justify-between border-b border-[#f1f1f1] px-6 py-4">
              <h3 className="text-[16px] font-black text-[#1a1a1a]">{selected.name} 님 상담 신청</h3>
              <button onClick={() => setSelected(null)} className="flex h-8 w-8 items-center justify-center rounded-full text-[18px] text-[#888] hover:bg-[#f5f5f5]">✕</button>
            </div>

            <div className="overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                {[
                  ["이름", selected.name],
                  ["연락처", selected.phone],
                  ["구매 목적", selected.purpose],
                  ["배송 지역", selected.area],
                  ["아파트", selected.apartment || "없음"],
                  ["견적 채널", selected.channels.join(", ") || "없음"],
                  ["모델명", selected.model || "없음"],
                  ["신청 일시", new Date(selected.submittedAt).toLocaleString("ko-KR")],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <span className="w-20 shrink-0 text-[12px] font-semibold text-[#888]">{label}</span>
                    <span className="text-[13px] text-[#333]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#f1f1f1] px-6 py-4 space-y-3">
              <p className="text-[12px] font-semibold text-[#666]">진행 상태 변경</p>
              <div className="flex gap-2">
                {(["new", "inProgress", "completed"] as const).map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`flex-1 rounded-full py-2 text-[13px] font-semibold transition-colors ${selected.status === s ? "bg-[#c90f45] text-white" : "border border-[#e8e8e8] text-[#666] hover:border-[#c90f45]"}`}>
                    {STATUS[s].label}
                  </button>
                ))}
              </div>
              <button onClick={() => handleDelete(selected.id)}
                className="flex h-10 w-full items-center justify-center rounded-full border border-red-200 text-[13px] text-red-400 hover:bg-red-50">
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
