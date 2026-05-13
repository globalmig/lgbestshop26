import { slides as defaultSlides, type Slide } from "@/data/slides";

export type { Slide };

export interface Manager {
  id: string;
  img: string;
  name: string;
  store: string;
  tags: string[];
  desc: string;
  href: string;
}

export interface ConsultSubmission {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  area: string;
  apartment: string;
  channels: string[];
  model: string;
  submittedAt: string;
  status: "new" | "inProgress" | "completed";
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const DEFAULT_MANAGERS: Manager[] = [
  {
    id: "1",
    img: "/images/main/bestWorker01.png",
    name: "이원표 지점장",
    store: "용산전자상가점",
    tags: ["구독 전문", "진철", "혼수 & 이사 전문"],
    desc: "현실적인 컨설팅",
    href: "https://map.naver.com/p/search/lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90/place/33706664?placePath=/ticket",
  },
  {
    id: "2",
    img: "/images/main/bestWorker02.png",
    name: "장수석 부장님",
    store: "용산전자상가점",
    tags: ["구독전문", "진철", "혼수 패키지"],
    desc: "꼼꼼한 설명",
    href: "https://map.naver.com/p/search/lg%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%20%EC%9A%A9%EC%82%B0%EC%A0%90/place/33706664?placePath=/ticket",
  },
];

function get<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const adminStore = {
  slides: {
    get: () => get<Slide[]>("admin_slides", defaultSlides),
    set: (v: Slide[]) => save("admin_slides", v),
  },
  managers: {
    get: () => get<Manager[]>("admin_managers", DEFAULT_MANAGERS),
    set: (v: Manager[]) => save("admin_managers", v),
  },
  consult: {
    get: () => get<ConsultSubmission[]>("admin_consult", []),
    set: (v: ConsultSubmission[]) => save("admin_consult", v),
    add: (sub: ConsultSubmission) => save("admin_consult", [sub, ...get<ConsultSubmission[]>("admin_consult", [])]),
  },
  benefit: {
    get: () => get<Post[]>("admin_benefit", []),
    set: (v: Post[]) => save("admin_benefit", v),
  },
  smallbiz: {
    get: () => get<Post[]>("admin_smallbiz", []),
    set: (v: Post[]) => save("admin_smallbiz", v),
  },
};
