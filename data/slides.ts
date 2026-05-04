export type Slide = {
  id: number;
  image: string;
  subtitle: string;
  title: string;
};

export const slides: Slide[] = [
  {
    id: 1,
    image: "/images/main/bg_hero_1.png",
    subtitle: "모르는 사람은 받을 수 없는",
    title: "용산전자에서\n받아가세요!",
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
