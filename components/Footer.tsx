import Link from "next/link";

const footerLinks = ["개인정보 처리방침", "이용약관", "사이트맵"];

export default function Footer() {
  return (
    <footer className="border-t border-[#efefef] bg-white py-8">
      <div className="mx-auto max-w-[1080px] px-5 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#c90f45] text-[10px] font-black leading-none text-white">
            LG
          </span>
          <span className="text-[18px] font-bold tracking-[-0.02em] text-[#6c6c6c]">
            LG전자
          </span>
          <span className="h-4 w-px bg-[#9b9b9b]" />
          <span className="text-[18px] font-bold tracking-[-0.02em] text-[#6c6c6c]">
            BEST SHOP
          </span>
        </div>

        <nav className="mb-4 flex items-center justify-center gap-4">
          {footerLinks.map((label, i) => (
            <span key={label} className="flex items-center gap-4">
              <Link href="#" className="text-[12px] text-[#666] hover:underline">
                {label}
              </Link>
              {i < footerLinks.length - 1 && (
                <span className="h-3 w-px bg-[#ddd]" />
              )}
            </span>
          ))}
        </nav>

        <p className="text-[11px] text-[#aaa]">
          © 2025 LG Electronics Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
