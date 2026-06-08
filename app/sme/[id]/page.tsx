"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export default function SmeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setPost);
  }, [id]);

  if (!post) return <div className="flex min-h-screen items-center justify-center text-[#aaa]">불러오는 중...</div>;

  return (
    <main className="bg-white text-[#171717]">
      <section className="relative isolate min-h-[280px] overflow-hidden bg-[#171717] px-5 py-20 sm:min-h-[340px]">
        <Image src="/images/main/bg_hero_1.png" alt="" fill sizes="100vw" priority className="object-cover object-center opacity-58" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/76 via-black/42 to-black/12" />
        <div className="relative z-10 mx-auto flex min-h-[180px] max-w-[1180px] flex-col justify-end">
          <p className="mb-3 text-[13px] font-bold tracking-[0.16em] text-white/75">SMALL BUSINESS</p>
          <h1 className="max-w-[800px] text-[28px] font-black leading-[1.25] tracking-[-0.04em] text-white sm:text-[40px]">{post.title}</h1>
          <p className="mt-4 text-[13px] text-white/60">
            {new Date(post.createdAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-[780px]">
          {post.image && (
            <div className="relative mb-10 h-[320px] w-full overflow-hidden rounded-2xl sm:h-[440px]">
              <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
            </div>
          )}
          <p className="break-keep text-[16px] leading-[2] text-[#444] sm:text-[17px]">{post.content}</p>
          <div className="mt-14 border-t border-[#ececec] pt-8">
            <button
              onClick={() => router.back()}
              className="flex h-11 items-center rounded-full border border-[#e0e0e0] px-7 text-[14px] font-semibold text-[#555] hover:border-[#c90f45] hover:text-[#c90f45] transition-colors"
            >
              ← 목록으로
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
