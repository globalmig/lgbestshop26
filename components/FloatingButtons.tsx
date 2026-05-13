import Image from "next/image";

const buttons = [
  { src: "/images/main/btn/reservation-1.png", alt: "상담 신청", size: 64, href: "/consult" },
  { src: "/images/main/btn/kakaotalk.png", alt: "카카오톡 상담", size: 56, href: "#" },
  { src: "/images/main/btn/insta.png", alt: "인스타그램", size: 56, href: "https://www.instagram.com/lgebestshop_yongsan" },
  { src: "/images/main/btn/blog.png", alt: "블로그", size: 56, href: "https://blog.naver.com/lg_yongsan" },
];

export default function FloatingButtons() {
  return (
    <div className="fixed right-[2.5%] bottom-[24px] md:bottom-[10%] z-50  flex-col items-center gap-3 flex">
      {buttons.map((btn) => (
        <a href={btn.href} key={btn.alt} aria-label={btn.alt} target={btn.href.startsWith("http") ? "_blank" : undefined} rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}>
          <Image src={btn.src} alt={btn.alt} width={btn.size} height={btn.size} className="drop-shadow-sm" />
        </a>
      ))}
    </div>
  );
}
