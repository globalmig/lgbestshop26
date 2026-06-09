"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Slide } from "@/data/slides";

const nl = (s: string) => s.replace(/\\n/g, "\n");

export default function HeroSlider({ initialSlides = [] }: { initialSlides?: Slide[] }) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;
  const totalRef = useRef(total);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  useEffect(() => {
    if (initialSlides.length === 0) {
      fetch("/api/slides").then((r) => r.json() as Promise<Slide[]>).then((data) => {
        setSlides(data);
        setCurrent(0);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const n = totalRef.current;
        return n > 0 ? (prev + 1) % n : 0;
      });
    }, 4000);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    if (!paused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length]);

  const go = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const n = totalRef.current;
    setCurrent(n > 0 ? (index + n) % n : 0);
    if (!paused) startTimer();
  };

  const slide = slides[current];

  if (!slide) return <div className="h-145 bg-[#f5f5f5]" />;

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[500px] md:h-[580px]">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            unoptimized
            className="object-cover object-top"
          />
        </div>
      ))}


      {(slide.show_gradient ?? "mobile") !== "hidden" && (
        <div className={`pointer-events-none absolute inset-0 z-5 bg-linear-to-r from-white to-transparent${(slide.show_gradient ?? "mobile") === "mobile" ? " sm:hidden" : ""}`} />
      )}
      <div className="relative z-10 mx-auto flex h-full max-w-[1080px] items-center px-5">
        <div className={`mb-6 sm:mb-10${slide.text_color === "white" ? " text-white" : ""}`}>
          <p className="mb-2 text-[16px] font-medium tracking-[-0.05em] sm:mb-4 sm:text-[22px] md:text-[28px] lg:text-[31px]">
            {nl(slide.subtitle)}
          </p>
          <h1 className="whitespace-pre-line text-[28px] font-black leading-[1.12] tracking-[-0.07em] sm:text-[38px] md:text-[48px] lg:text-[56px]">
            {nl(slide.title)}
          </h1>
          {slide.description && (
            <p className="mt-3 whitespace-pre-line text-[13px] font-medium leading-relaxed tracking-[-0.03em] opacity-80 sm:mt-4 sm:text-[15px] md:text-[16px] lg:mt-5 lg:text-[18px]">
              {nl(slide.description)}
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <span className="text-[10px] font-medium text-[#f1b7a1]">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`${i + 1}번 배너`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "h-2 w-7 bg-[#c90f45]" : "h-1 w-1 bg-[#d9eff4]"
            }`}
          />
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#9a9a9a]"
          aria-label={paused ? "배너 재생" : "배너 일시정지"}
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </section>
  );
}
