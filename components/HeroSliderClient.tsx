"use client";

import dynamic from "next/dynamic";
import type { Slide } from "@/data/slides";

const HeroSlider = dynamic(() => import("@/components/HeroSlider"), {
  ssr: false,
  loading: () => <div className="h-145 bg-[#f5f5f5]" />,
});

export default function HeroSliderClient({ initialSlides }: { initialSlides: Slide[] }) {
  return <HeroSlider initialSlides={initialSlides} />;
}
