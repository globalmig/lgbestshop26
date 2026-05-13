"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "가전구독", href: "/subscription" },
  { label: "혜택&이달의 소식", href: "#" },
  { label: "소상공인", href: "#" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/lgbs-7x4q2")) return null;

  return (
    <>
      <header className="sticky top-0 z-30 h-11 border-b py-8 border-[#e8e8e8] bg-white">
        <div className="mx-auto flex h-full max-w-[940px] items-center justify-between px-5">
          <Link href="/" aria-label="LG전자 BEST SHOP 홈">
            <Image src="/images/logo.png" alt="LG전자 BEST SHOP" width={160} height={40} priority />
          </Link>

          <nav className="hidden h-full items-center gap-9 md:flex" aria-label="주요 메뉴">
            {navItems.map(({ label, href }) => {
              const isActive = href !== "#" && (href === "/" ? pathname === "/" : pathname.startsWith(href));
              return (
                <Link
                  href={href}
                  key={label}
                  className={`flex h-6 items-center border-b-2 px-0.5 text-[14px] font-semibold transition-colors ${
                    isActive ? "border-b-[#c90f45] text-[#c90f45]" : "border-transparent text-[#333] hover:text-[#c90f45]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <a href="/consult" className="hidden h-7 min-w-[88px] items-center justify-center rounded-full bg-[#c90f45] px-5 py-4 text-[14px] font-bold text-white md:flex">
            상담 신청
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="메뉴 열기"
          >
            <span className="h-[2px] w-5 bg-[#333]" />
            <span className="h-[2px] w-5 bg-[#333]" />
            <span className="h-[2px] w-5 bg-[#333]" />
          </button>
        </div>
      </header>

      {/* 모바일 드로어 */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between border-b border-[#f1f1f1] px-5 py-4">
              <span className="text-[15px] font-bold text-[#333]">메뉴</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-[22px] text-[#666]"
                aria-label="메뉴 닫기"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col px-5 py-4">
              {navItems.map(({ label, href }) => {
                const isActive = href !== "#" && (href === "/" ? pathname === "/" : pathname.startsWith(href));
                return (
                  <Link
                    href={href}
                    key={label}
                    onClick={() => setOpen(false)}
                    className={`border-b border-[#f1f1f1] py-4 text-[15px] font-semibold tracking-[-0.03em] ${
                      isActive ? "text-[#c90f45]" : "text-[#333]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-5 pt-2">
              <a
                href="/consult"
                onClick={() => setOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-full bg-[#c90f45] text-[14px] font-bold text-white"
              >
                상담 신청
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
