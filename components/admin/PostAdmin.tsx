"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { adminFetch } from "@/lib/adminFetch";

// ─── Block types ───────────────────────────────────────────
type TextBlock = { type: "text"; value: string };
type ImageBlock = { type: "image"; url: string };
type Block = TextBlock | ImageBlock;

function parseBlocks(content: string): Block[] {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return content ? [{ type: "text", value: content }] : [];
}

function blocksPreview(content: string): string {
  const blocks = parseBlocks(content);
  const first = blocks.find((b) => b.type === "text") as TextBlock | undefined;
  return first?.value ?? "";
}

// ─── Post types ────────────────────────────────────────────
interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

interface Props {
  storeKey: "benefit" | "smallbiz";
  title: string;
}

const EMPTY_FORM = { title: "", content: "[]", image: "" };

// ─── Image upload (단일) ───────────────────────────────────
function ImgUpload({ value, onChange, label = "이미지 (선택)", hint = "권장 크기: 1200×630px · 최대 5MB · JPG/PNG" }: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await adminFetch("/api/upload", { method: "POST", body: fd });
    const { url } = await res.json() as { url: string };
    onChange(url);
    setUploading(false);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline gap-2">
        <p className="text-[12px] font-semibold text-[#666]">{label}</p>
        <p className="text-[11px] text-[#bbb]">{hint}</p>
      </div>
      {value ? (
        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-[#e8e8e8] bg-[#f8f8f8]">
          <Image src={value} alt="preview" fill className="object-contain" unoptimized />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-[12px] text-white hover:bg-black/80"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="flex h-24 w-full items-center justify-center rounded-xl border-2 border-dashed border-[#e0e0e0] text-[13px] text-[#aaa] hover:border-[#c90f45] hover:text-[#c90f45] disabled:opacity-50 transition-colors"
        >
          {uploading ? "업로드 중..." : "+ 이미지 선택"}
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}

// ─── Block editor ──────────────────────────────────────────
function BlockEditor({ blocks, onChange }: { blocks: Block[]; onChange: (b: Block[]) => void }) {
  const fileRefs = useRef<Map<number, HTMLInputElement>>(new Map());
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const update = (idx: number, block: Block) => {
    const next = [...blocks];
    next[idx] = block;
    onChange(next);
  };

  const remove = (idx: number) => onChange(blocks.filter((_, i) => i !== idx));

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...blocks];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const moveDown = (idx: number) => {
    if (idx === blocks.length - 1) return;
    const next = [...blocks];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  const addText = () => onChange([...blocks, { type: "text", value: "" }]);
  const addImage = () => onChange([...blocks, { type: "image", url: "" }]);

  const handleImageFile = async (idx: number, file: File) => {
    setUploadingIdx(idx);
    const fd = new FormData();
    fd.append("file", file);
    const res = await adminFetch("/api/upload", { method: "POST", body: fd });
    const { url } = await res.json() as { url: string };
    update(idx, { type: "image", url });
    setUploadingIdx(null);
  };

  return (
    <div className="space-y-2">
      {blocks.map((block, idx) => (
        <div key={idx} className="group relative rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
          {/* 블록 컨트롤 */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#bbb]">
              {block.type === "text" ? "텍스트" : "이미지"}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => moveUp(idx)} disabled={idx === 0} className="flex h-6 w-6 items-center justify-center rounded text-[12px] text-[#bbb] hover:bg-[#eee] hover:text-[#555] disabled:opacity-30">↑</button>
              <button type="button" onClick={() => moveDown(idx)} disabled={idx === blocks.length - 1} className="flex h-6 w-6 items-center justify-center rounded text-[12px] text-[#bbb] hover:bg-[#eee] hover:text-[#555] disabled:opacity-30">↓</button>
              <button type="button" onClick={() => remove(idx)} className="flex h-6 w-6 items-center justify-center rounded text-[12px] text-[#bbb] hover:bg-red-50 hover:text-red-400">✕</button>
            </div>
          </div>

          {block.type === "text" ? (
            <textarea
              value={block.value}
              onChange={(e) => update(idx, { type: "text", value: e.target.value })}
              rows={4}
              placeholder="텍스트를 입력하세요"
              className="w-full resize-y rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-[13px] leading-relaxed outline-none focus:border-[#c90f45]"
            />
          ) : (
            <div>
              {block.url ? (
                <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-[#f0f0f0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.url} alt="" className="max-h-48 w-full object-contain" />
                  <button
                    type="button"
                    onClick={() => update(idx, { type: "image", url: "" })}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-[12px] text-white hover:bg-black/80"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRefs.current.get(idx)?.click()}
                  disabled={uploadingIdx === idx}
                  className="flex h-20 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#e0e0e0] text-[13px] text-[#aaa] hover:border-[#c90f45] hover:text-[#c90f45] disabled:opacity-50 transition-colors"
                >
                  {uploadingIdx === idx ? "업로드 중..." : "+ 이미지 선택"}
                </button>
              )}
              <input
                ref={(el) => { if (el) fileRefs.current.set(idx, el); else fileRefs.current.delete(idx); }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImageFile(idx, e.target.files[0])}
              />
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={addText}
          className="flex h-9 items-center gap-1.5 rounded-full border border-[#e0e0e0] px-4 text-[12px] text-[#555] hover:border-[#c90f45] hover:text-[#c90f45] transition-colors"
        >
          + 텍스트 추가
        </button>
        <button
          type="button"
          onClick={addImage}
          className="flex h-9 items-center gap-1.5 rounded-full border border-[#e0e0e0] px-4 text-[12px] text-[#555] hover:border-[#c90f45] hover:text-[#c90f45] transition-colors"
        >
          + 이미지 추가
        </button>
      </div>
    </div>
  );
}

// ─── Post modal ────────────────────────────────────────────
function PostModal({
  title,
  form,
  onChange,
  onSave,
  onClose,
  saveLabel,
}: {
  title: string;
  form: { title: string; content: string; image: string };
  onChange: (f: typeof form) => void;
  onSave: () => void;
  onClose: () => void;
  saveLabel: string;
}) {
  const blocks = parseBlocks(form.content);
  const hasContent = blocks.some((b) => b.type === "image" || (b.type === "text" && b.value.trim()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#f0f0f0] px-6 py-4">
          <h3 className="text-[16px] font-black text-[#1a1a1a]">{title}</h3>
          <button onClick={onClose} className="text-[20px] text-[#aaa] hover:text-[#555]">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* 제목 */}
          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold text-[#666]">제목 <span className="text-[#c90f45]">*</span></p>
            <input
              value={form.title}
              onChange={(e) => onChange({ ...form, title: e.target.value })}
              placeholder="제목을 입력하세요"
              className="h-11 w-full rounded-xl border border-[#e8e8e8] px-4 text-[14px] font-semibold outline-none focus:border-[#c90f45]"
            />
          </div>

          {/* 본문 블록 에디터 */}
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-[#666]">본문 내용 <span className="text-[#c90f45]">*</span></p>
            <BlockEditor
              blocks={blocks}
              onChange={(b) => onChange({ ...form, content: JSON.stringify(b) })}
            />
          </div>

          {/* 썸네일 이미지 */}
          <ImgUpload
            value={form.image}
            onChange={(url) => onChange({ ...form, image: url })}
            label="썸네일 이미지 (선택)"
            hint="목록 및 상단에 표시 · 권장 1200×630px"
          />
        </div>
        <div className="flex gap-2 border-t border-[#f0f0f0] px-6 py-4">
          <button
            onClick={onSave}
            disabled={!form.title || !hasContent}
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#c90f45] text-[14px] font-bold text-white disabled:opacity-40"
          >
            {saveLabel}
          </button>
          <button
            onClick={onClose}
            className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#e8e8e8] text-[14px] text-[#666] hover:border-[#ccc]"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sortable row ──────────────────────────────────────────
function SortablePostRow({ post, onEdit, onDelete }: { post: Post; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: post.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none shrink-0 text-[#ccc] hover:text-[#888] active:cursor-grabbing px-1"
        aria-label="순서 변경"
      >
        ⠿
      </button>
      {post.image && (
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
          <Image src={post.image} alt="" fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-[#1a1a1a]">{post.title}</p>
        <p className="mt-0.5 line-clamp-1 text-[13px] text-[#888]">{blocksPreview(post.content)}</p>
        <p className="mt-1 text-[11px] text-[#bbb]">
          {new Date(post.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={onEdit}
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
  );
}

// ─── PostAdmin ─────────────────────────────────────────────
export default function PostAdmin({ storeKey, title }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetch(`/api/posts?type=${storeKey}`).then((r) => r.json() as Promise<Post[]>).then(setPosts);
  }, [storeKey]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = posts.findIndex((p) => p.id === active.id);
    const newIndex = posts.findIndex((p) => p.id === over.id);
    const next = arrayMove(posts, oldIndex, newIndex);
    setPosts(next);
    adminFetch("/api/posts/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((p) => p.id) }),
    });
  };

  const handleAdd = async () => {
    const newPost: Post = { id: Date.now().toString(), ...form, createdAt: new Date().toISOString() };
    await adminFetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newPost, type: storeKey }),
    });
    setPosts((prev) => [newPost, ...prev]);
    setForm(EMPTY_FORM);
    setAdding(false);
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    await adminFetch(`/api/posts/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editing.title, content: editing.content, image: editing.image ?? "" }),
    });
    setPosts((prev) => prev.map((p) => (p.id === editing.id ? editing : p)));
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await adminFetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[18px] font-black text-[#1a1a1a]">{title} 관리</h2>
        <button
          onClick={() => { setForm(EMPTY_FORM); setAdding(true); }}
          className="flex h-9 items-center rounded-full bg-[#c90f45] px-5 text-[13px] font-bold text-white"
        >
          + 게시글 추가
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl bg-white py-20 text-center text-[14px] text-[#aaa] shadow-sm">
          등록된 게시글이 없습니다.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={posts.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {posts.map((post) => (
                <SortablePostRow
                  key={post.id}
                  post={post}
                  onEdit={() => setEditing({ ...post })}
                  onDelete={() => handleDelete(post.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {adding && (
        <PostModal
          title="게시글 추가"
          form={form}
          onChange={setForm}
          onSave={handleAdd}
          onClose={() => setAdding(false)}
          saveLabel="추가하기"
        />
      )}

      {editing && (
        <PostModal
          title="게시글 수정"
          form={{ title: editing.title, content: editing.content, image: editing.image ?? "" }}
          onChange={(f) => setEditing({ ...editing, ...f })}
          onSave={handleSaveEdit}
          onClose={() => setEditing(null)}
          saveLabel="저장하기"
        />
      )}
    </div>
  );
}
