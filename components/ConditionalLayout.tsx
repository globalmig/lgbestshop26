"use client";

import { usePathname } from "next/navigation";
import ConsultBanner from "./ConsultBanner";
import FloatingButtons from "./FloatingButtons";

const HIDDEN_PATHS = ["/consult"];

export default function ConditionalLayout() {
  const pathname = usePathname();
  if (HIDDEN_PATHS.includes(pathname)) return null;
  return (
    <>
      <FloatingButtons />
      <ConsultBanner />
    </>
  );
}
