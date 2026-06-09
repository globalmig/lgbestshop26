"use client";

import { useEffect, useRef, useState } from "react";
import type { Slide } from "@/lib/adminStore";
import { adminFetch } from "@/lib/adminFetch";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SlideForm = { image: string; subtitle: string; title: string; description: string; show_gradient: "mobile" | "always" | "hidden"; text_color: "black" | "white" };
const EMPTY: SlideForm = { image: "", subtitle: "", title: "", description: "", show_gradient: "mobile", text_color: "black" };

export default function HeroAdmin() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [editing, setEditing] = useState<Slide | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<SlideForm>(EMPTY);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetch("/api/slides")
      .then((r) => r.json() as Promise<Slide[]>)
      .then(setSlides);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = slides.findIndex((s) => String(s.id) === active.id);
    const newIndex = slides.findIndex((s) => String(s.id) === over.id);
    const next = arrayMove(slides, oldIndex, newIndex);
    setSlides(next);
    adminFetch("/api/slides/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((s) => s.id) }),
    });
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    await adminFetch(`/api/slides/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: editing.image, subtitle: editing.subtitle, title: editing.title, description: editing.description, show_gradient: editing.show_gradient ?? "mobile", text_color: editing.text_color ?? "black" }),
    });
    setSlides((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
    setEditing(null);
  };

  const handleAdd = async () => {
    const res = await adminFetch("/api/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const { id } = await res.json() as { id: number };
    setSlides((prev) => [...prev, { id, ...form }]);
    setForm(EMPTY);
    setAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await adminFetch(`/api/slides/${id}`, { method: "DELETE" });
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[18px] font-black text-[#1a1a1a]">히어로 슬라이드 관리</h2>
        <button onClick={() => setAdding(true)} className="flex h-9 items-center rounded-full bg-[#c90f45] px-5 text-[13px] font-bold text-white">
          + 슬라이드 추가
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={slides.map((s) => String(s.id))} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {slides.map((slide) => (
              <SortableSlideRow
                key={slide.id}
                slide={slide}
                isEditing={editing?.id === slide.id}
                editing={editing}
                onEditChange={setEditing as (v: typeof editing) => void}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={() => setEditing(null)}
                onStartEdit={() => setEditing({ ...slide })}
                onDelete={() => handleDelete(slide.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {adding && (
        <Modal title="슬라이드 추가" onClose={() => setAdding(false)}>
          <SlideForm
            data={{ id: 0, ...form }}
            onChange={(v) => setForm({ image: v.image, subtitle: v.subtitle, title: v.title, description: v.description ?? "", show_gradient: v.show_gradient ?? "mobile", text_color: v.text_color ?? "black" })}
            onSave={handleAdd}
            onCancel={() => setAdding(false)}
            saveLabel="추가"
          />
        </Modal>
      )}
    </div>
  );
}

function SortableSlideRow({
  slide, isEditing, editing, onEditChange, onSaveEdit, onCancelEdit, onStartEdit, onDelete,
}: {
  slide: Slide;
  isEditing: boolean;
  editing: Slide | null;
  onEditChange: (v: Slide) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: String(slide.id) });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="rounded-2xl bg-white p-5 shadow-sm">
      {isEditing && editing ? (
        <SlideForm data={editing} onChange={onEditChange} onSave={onSaveEdit} onCancel={onCancelEdit} />
      ) : (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none shrink-0 text-[#ccc] hover:text-[#888] active:cursor-grabbing px-1"
              aria-label="순서 변경"
            >
              ⠿
            </button>
            {slide.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slide.image} alt="" className="h-14 w-24 shrink-0 rounded-lg object-contain bg-[#f5f5f5]" />
            ) : (
              <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-[#f5f5f5] text-[11px] text-[#bbb]">이미지 없음</div>
            )}
            <div className="min-w-0">
              <p className="mb-0.5 text-[11px] text-[#aaa]">슬라이드 {slide.id}</p>
              <p className="text-[13px] text-[#888]">{slide.subtitle}</p>
              <p className="text-[15px] font-black text-[#1a1a1a]">{slide.title.replace(/\n/g, " / ")}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={onStartEdit}
              className="flex h-8 items-center rounded-full border border-[#e8e8e8] px-4 text-[12px] text-[#555] hover:border-[#c90f45] hover:text-[#c90f45]"
            >
              수정
            </button>
            <button
              onClick={onDelete}
              className="flex h-8 items-center rounded-full border border-[#e8e8e8] px-4 text-[12px] text-[#555] hover:border-red-400 hover:text-red-500"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SlideForm({ data, onChange, onSave, onCancel, saveLabel = "저장" }: { data: Slide; onChange: (v: Slide) => void; onSave: () => void; onCancel: () => void; saveLabel?: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await adminFetch("/api/upload", { method: "POST", body: formData });
    const { url } = await res.json() as { url: string };
    onChange({ ...data, image: url });
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <Field label="이미지">
        <div
          onClick={() => fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e8e8e8] py-5 hover:border-[#c90f45] transition-colors"
        >
          {data.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.image} alt="" className="max-h-32 w-full rounded-lg object-contain" />
          ) : (
            <>
              <span className="text-[24px]">🖼</span>
              <p className="text-[12px] text-[#aaa]">클릭해서 이미지 업로드</p>
            </>
          )}
          {uploading && <p className="text-[12px] text-[#c90f45]">업로드 중...</p>}
          {data.image && !uploading && <p className="text-[11px] text-[#aaa]">클릭해서 이미지 변경</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <p className="mt-1.5 text-[11px] text-[#bbb]">권장 크기: 1920×1080px 이상 · 최대 1MB (JPG, PNG, WebP)</p>
      </Field>
      <Field label="부제목">
        <input
          value={data.subtitle}
          onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
          className="h-10 w-full rounded-lg border border-[#e8e8e8] px-3 text-[13px] outline-none focus:border-[#c90f45]"
        />
      </Field>
      <Field label="제목">
        <textarea
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          rows={2}
          className="w-full resize-none rounded-lg border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#c90f45]"
        />
      </Field>
      <Field label="설명 (선택)">
        <textarea
          value={data.description ?? ""}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={2}
          className="w-full resize-none rounded-lg border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#c90f45]"
        />
      </Field>
      <Field label="흰 그라데이션 표시">
        <div className="flex gap-2">
          {(["mobile", "always", "hidden"] as const).map((val) => {
            const labels = { mobile: "모바일만", always: "항상 표시", hidden: "숨김" };
            const active = (data.show_gradient ?? "mobile") === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ ...data, show_gradient: val })}
                className={`flex h-8 items-center rounded-full px-4 text-[12px] font-medium border transition-colors ${active ? "bg-[#c90f45] border-[#c90f45] text-white" : "border-[#e8e8e8] text-[#555] hover:border-[#c90f45] hover:text-[#c90f45]"}`}
              >
                {labels[val]}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="텍스트 색상">
        <div className="flex gap-2">
          {(["black", "white"] as const).map((val) => {
            const labels = { black: "검정", white: "흰색" };
            const active = (data.text_color ?? "black") === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ ...data, text_color: val })}
                className={`flex h-8 items-center gap-1.5 rounded-full px-4 text-[12px] font-medium border transition-colors ${active ? "bg-[#c90f45] border-[#c90f45] text-white" : "border-[#e8e8e8] text-[#555] hover:border-[#c90f45] hover:text-[#c90f45]"}`}
              >
                <span className={`inline-block h-3 w-3 rounded-full border ${val === "black" ? "bg-[#1a1a1a] border-[#1a1a1a]" : "bg-white border-[#ccc]"}`} />
                {labels[val]}
              </button>
            );
          })}
        </div>
      </Field>
      <div className="flex gap-2">
        <button onClick={onSave} className="flex h-9 items-center rounded-full bg-[#c90f45] px-5 text-[13px] font-bold text-white">
          {saveLabel}
        </button>
        <button onClick={onCancel} className="flex h-9 items-center rounded-full border border-[#e8e8e8] px-5 text-[13px] text-[#666]">
          취소
        </button>
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

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 mx-4">
        <h3 className="mb-4 text-[16px] font-black text-[#1a1a1a]">{title}</h3>
        {children}
      </div>
    </div>
  );
}
