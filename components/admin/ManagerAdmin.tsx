"use client";

import Image from "next/image";
import { useState } from "react";
import { adminStore, type Manager } from "@/lib/adminStore";

const EMPTY: Omit<Manager, "id"> = { img: "", name: "", store: "용산전자상가점", tags: [], desc: "", href: "#" };

export default function ManagerAdmin() {
  const [managers, setManagers] = useState<Manager[]>(() => adminStore.managers.get());
  const [editing, setEditing] = useState<Manager | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Manager, "id">>(EMPTY);

  const persist = (updated: Manager[]) => { setManagers(updated); adminStore.managers.set(updated); };

  const handleSaveEdit = () => {
    if (!editing) return;
    persist(managers.map((m) => (m.id === editing.id ? editing : m)));
    setEditing(null);
  };

  const handleAdd = () => {
    persist([...managers, { id: Date.now().toString(), ...form }]);
    setForm(EMPTY);
    setAdding(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    persist(managers.filter((m) => m.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[18px] font-black text-[#1a1a1a]">매니저 관리</h2>
        <button onClick={() => setAdding(true)} className="flex h-9 items-center rounded-full bg-[#c90f45] px-5 text-[13px] font-bold text-white">
          + 매니저 추가
        </button>
      </div>

      <div className="space-y-4">
        {managers.map((m) => (
          <div key={m.id} className="rounded-2xl bg-white p-5 shadow-sm">
            {editing?.id === m.id ? (
              <div>
                <ManagerForm data={editing} onChange={(d) => setEditing({ id: m.id, ...d })} />
                <div className="mt-3 flex gap-2">
                  <button onClick={handleSaveEdit} className="flex h-9 items-center rounded-full bg-[#c90f45] px-5 text-[13px] font-bold text-white">저장</button>
                  <button onClick={() => setEditing(null)} className="flex h-9 items-center rounded-full border border-[#e8e8e8] px-5 text-[13px] text-[#666]">취소</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#f0dde2]">
                    {m.img && <Image src={m.img} alt={m.name} width={48} height={48} className="h-full w-full object-cover object-top" />}
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">{m.name} <span className="text-[13px] font-normal text-[#888]">{m.store}</span></p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {m.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#fdf3f5] px-2 py-0.5 text-[11px] text-[#c90f45]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => setEditing({ ...m })} className="flex h-8 items-center rounded-full border border-[#e8e8e8] px-4 text-[12px] text-[#555] hover:border-[#c90f45] hover:text-[#c90f45]">수정</button>
                  <button onClick={() => handleDelete(m.id)} className="flex h-8 items-center rounded-full border border-[#e8e8e8] px-4 text-[12px] text-[#555] hover:border-red-400 hover:text-red-500">삭제</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setAdding(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 mx-4">
            <h3 className="mb-4 text-[16px] font-black text-[#1a1a1a]">매니저 추가</h3>
            <ManagerForm data={form} onChange={setForm} />
            <div className="mt-4 flex gap-2">
              <button onClick={handleAdd} disabled={!form.name} className="flex h-10 flex-1 items-center justify-center rounded-full bg-[#c90f45] text-[14px] font-bold text-white disabled:opacity-40">추가</button>
              <button onClick={() => setAdding(false)} className="flex h-10 flex-1 items-center justify-center rounded-full border border-[#e8e8e8] text-[14px] text-[#666]">취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ManagerForm({ data, onChange }: { data: Omit<Manager, "id">; onChange: (v: Omit<Manager, "id">) => void }) {
  const f = (k: keyof Omit<Manager, "id">, v: string) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="이름"><input value={data.name} onChange={(e) => f("name", e.target.value)} className={inp} /></Field>
        <Field label="지점"><input value={data.store} onChange={(e) => f("store", e.target.value)} className={inp} /></Field>
      </div>
      <Field label="이미지 경로"><input value={data.img} onChange={(e) => f("img", e.target.value)} placeholder="/images/main/bestWorkerXX.png" className={inp} /></Field>
      <Field label="태그 (쉼표 구분)">
        <input
          value={data.tags.join(", ")}
          onChange={(e) => onChange({ ...data, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
          className={inp}
        />
      </Field>
      <Field label="소개 문구"><input value={data.desc} onChange={(e) => f("desc", e.target.value)} className={inp} /></Field>
      <Field label="예약 링크"><input value={data.href} onChange={(e) => f("href", e.target.value)} className={inp} /></Field>
    </div>
  );
}

const inp = "h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-1 text-[12px] font-semibold text-[#666]">{label}</p>{children}</div>;
}
