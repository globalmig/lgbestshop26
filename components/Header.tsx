"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "가전구독", href: "/subscription" },
  { label: "혜택&이달의 소식", href: "#" },
  { label: "소상공인", href: "#" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 h-11 border-b py-8 border-[#e8e8e8] bg-white">
      <div className="mx-auto flex h-full max-w-[940px] items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2" aria-label="LG전자 BEST SHOP 홈">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#c90f45] text-[10px] font-black leading-none text-white">LG</span>
          <span className="text-[21px] font-bold tracking-[-0.02em] text-[#6c6c6c]">LG전자</span>
          <span className="h-4 w-px bg-[#9b9b9b]" />
          <span className="text-[21px] font-bold tracking-[-0.02em] text-[#6c6c6c]">BEST SHOP</span>
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

        <a href="#consult" className="hidden h-7 min-w-[88px] items-center justify-center rounded-full bg-[#c90f45] px-5 py-4 text-[14px] font-bold text-white md:flex">
          상담 신청
        </a>
      </div>
    </header>
  );
}
