export type Slide = {
  id: number;
  image: string;
  image_mobile?: string;
  subtitle: string;
  title: string;
  description?: string;
  show_gradient?: "mobile" | "always" | "hidden";
  text_color?: "black" | "white";
};

export const slides: Slide[] = [
  {
    id: 1,
    image: "/images/main/bg_hero_1.png",
    subtitle: "바쁘신 고객님을 위한",
    title: "1:1 비대면\n프리미엄 가전 상담",
    description: "원하는 시간에, 원하는 장소에서 편안하게\n맞춤형 가전 견적을 받아보세요.",
  },
  {
    id: 2,
    image: "/images/main/bg_hero_1.png",
    subtitle: "LG 가전 구독 전문점",
    title: "월 구독으로\n최신 가전을!",
  },
  {
    id: 3,
    image: "/images/main/bg_hero_1.png",
    subtitle: "전문가의 빈틈없는 케어",
    title: "일시불과\n차이없는 가격!",
  },
  {
    id: 4,
    image: "/images/main/bg_hero_1.png",
    subtitle: "용산전자상가점 단독 혜택",
    title: "지금 바로\n상담 신청하세요!",
  },
];
