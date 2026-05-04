"use client";

import { useState } from "react";
import Image from "next/image";

type Tier = {
  spend: string;
  discount: string;
  note?: string;
};

type TableRow = {
  minSpend: string;
  directDiscount: string;
  pointAccrual?: string;
  promoDiscount: string;
  total: string;
  remarks?: string[];
};

type CardData = {
  id: string;
  company: string;
  label?: string;
  fullName: string;
  minSpend: string;
  maxDiscount: string;
  annualFee: { domestic: string; overseas?: string; brand?: string };
  tiers: Tier[];
  detail: {
    targetCard: string;
    period: string;
    benefit: string;
    tableRows: TableRow[];
    tableNotes: string[];
    excludedItems: string[];
  };
  notes: string[];
  image: string;
};

const cards: CardData[] = [
  {
    id: "shinhan",
    company: "신한카드",
    fullName: "[신한] LG전자 The 구독케어 신한카드",
    minSpend: "130만원 이상",
    maxDiscount: "30,000원",
    image: "/images/card/신한카드.jpg",
    annualFee: { domestic: "22,000원", overseas: "25,000원", brand: "Mastercard" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 17,000원 할인" },
      {
        spend: "70만원 이상 사용 시",
        discount: "월 최대 27,000원 할인",
        note: "할인 금액 중 일부는 포인트로 적립되며, 자세한 내용은 카드 상세에서 확인 가능합니다.",
      },
      {
        spend: "130만원 이상 사용 시",
        discount: "월 최대 30,000원 할인",
        note: "할인 금액 중 일부는 포인트로 적립되며, 자세한 내용은 카드 상세에서 확인 가능합니다.",
      },
    ],
    detail: {
      targetCard: "LG전자 The 구독케어 신한카드 (Mastercard)",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        {
          minSpend: "30만원 이상",
          directDiscount: "13,000원",
          promoDiscount: "4,000원",
          total: "17,000원",
          remarks: ["LG전자 The 구독케어 신한카드 Mastercard 브랜드만 프로모션 제공", "LG전자 구독요금 자동이체 시 제공", "월 1회, 최대 72개월간 제공"],
        },
        { minSpend: "70만원 이상", directDiscount: "16,000원", pointAccrual: "10,000포인트", promoDiscount: "1,000원", total: "17,000 ~ 27,000원" },
        { minSpend: "130만원 이상", directDiscount: "20,000원", pointAccrual: "10,000포인트", promoDiscount: "1,000원", total: "20,000 ~ 30,000원" },
      ],
      tableNotes: ["* 포인트 적립 서비스는 LG전자 구독요금 할인 전 자동납부 이용금액 기준 1회 7만원 이상인 경우 적용(월 1회)"],
      excludedItems: [
        "무이자할부(슬림할부 등 부분 무이자 포함) 이용거래, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자(할부수수료, 연체이자 등)",
        "가프트카드/신불카드 구매·충전금액, 지방세, 국세, 지방세외수입, 환경개선부담금, 4대보험(국민연금, 고용보험, 건강보험, 산재보험)",
        "유치원/초중고 납입금(스쿨뱅킹), 대학(원)등록금, 아파트관리비, 도시가스, 전기요금, TV수신료, 수도요금",
        "상품권/신불전자지급수단 구매·충전금액, 포인트/캐시/사이버머니/예치금 등 전자지급(결제)수단 구매·충전금액, 거래 취소금액",
      ],
    },
    notes: [
      "연회비: 국내전용 22,000원 / 해외겸용 25,000원. 프로모션 혜택은 해외겸용(Mastercard)카드만 적용됩니다. (국내전용 카드는 프로모션 혜택 미적용 되며, 신한카드 홈페이지를 통해 신청 가능합니다.)",
      "전월 이용금액은 'LG전자 The 구독케어 신한카드'의 전월(1일~말일) 거래 시점 이용금액(일시불+할부)을 기준으로 반영됩니다.",
      "'LG전자 The 구독케어 신한카드' 최초 신규 발급 회원*은 카드 사용 등록한 월의 다음달 등록월+1개월까지 전월 이용금액 30만원 이상 70만원 미만 구간의 서비스가 적용됩니다.",
      "단, 해당 기간에 70만원 이상 이용할 경우 그에 맞는 서비스가 이월에 적용됩니다.",
      "'LG전자 The 구독케어 신한카드' 유효기간 만기 또는 해지 후 재발급 시 최초 신규발급 회원에서 제외됩니다.",
      "카드 해지 후 취소거래는 국내 거래의 경우 최초 승인금액에서, 해외 거래의 경우 최초 전표 매입일의 이용금액에서 차감됩니다.",
      "카드 혜택 등 관련 문의사항은 신한카드 고객센터(1544-7000)로 문의하시기 바랍니다.",
      "LG전자는 신한카드의 신용카드 모집 업무를 대리·중개합니다.",
      "LG전자는 다수의 여신전문금융회사를 대리하거나 중개하지 않습니다.",
      "LG전자는 신한카드의 금융상품에 대해 계약 체결 권한이 없습니다.",
      "LG전자는 금융관계법령에 따라 신한카사(주)와 제휴 체결한 금융상품 판매대리·중개업입니다.",
      "계약을 체결 전, 연회비 등 상세 사항은 반드시 금융상품설명서 및 약관을 확인하시기 바랍니다.",
      "금융소비자는 금융소비자보호법 제19조 제1항에 따라 해당 금융상품 또는 서비스에 대하여 설명받을 권리가 있습니다.",
      "연체이자율은 '회원별, 이용상품별 약정금리(연20%)이내'에서 적용됩니다.",
      "카드 이용대금과 이에 수반되는 모든 수수료는 고객님이 지정하신 결제일에 상환하여야 합니다.",
      "상환능력에 비해 신용카드 사용에 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.",
      "개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.",
      "일정기간 신용카드 이용대금을 연체할 경우, 결제일이 도래하지 않은 모든 신용카드 이용대금을 변제할 의무가 발생할 수 있습니다.",
      "여신금융협회 심의필 제2026-C1h-05089호(2026.04.01-2027.03.31)",
    ],
  },
  {
    id: "lotte",
    company: "롯데카드",
    fullName: "[롯데] LG전자 플러스 카드",
    minSpend: "160만원 이상",
    maxDiscount: "26,000원",
    image: "/images/card/롯데카드.jpg",
    annualFee: { domestic: "20,000원" },
    tiers: [
      { spend: "50만원 이상 사용 시", discount: "월 최대 15,000원 할인" },
      { spend: "100만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
      {
        spend: "160만원 이상 사용 시",
        discount: "월 최대 26,000원 할인",
        note: "최초 발급 이후 72개월만 추가 혜택 적용",
      },
    ],
    detail: {
      targetCard: "LG전자 플러스 롯데카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "50만원 이상", directDiscount: "12,000원", promoDiscount: "3,000원", total: "15,000원" },
        { minSpend: "100만원 이상", directDiscount: "16,000원", promoDiscount: "4,000원", total: "20,000원" },
        { minSpend: "160만원 이상", directDiscount: "20,000원", promoDiscount: "6,000원", total: "26,000원", remarks: ["최초 발급 이후 72개월만 추가 혜택 적용"] },
      ],
      tableNotes: ["* 최초 발급 이후 72개월 동안만 추가 혜택이 적용됩니다."],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "최초 발급 이후 72개월 동안만 추가 혜택이 적용됩니다.",
      "카드 혜택 등 관련 문의사항은 롯데카드 고객센터(1588-8300)로 문의하시기 바랍니다.",
      "LG전자는 롯데카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "kb",
    company: "KB국민카드",
    fullName: "[KB국민] LG전자 구독 KB카드",
    minSpend: "80만원 이상",
    maxDiscount: "22,000원",
    image: "/images/card/KB국민카드.jpg",
    annualFee: { domestic: "15,000원" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 12,000원 할인" },
      { spend: "80만원 이상 사용 시", discount: "월 최대 22,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 구독 KB국민카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "30만원 이상", directDiscount: "10,000원", promoDiscount: "2,000원", total: "12,000원" },
        { minSpend: "80만원 이상", directDiscount: "18,000원", promoDiscount: "4,000원", total: "22,000원" },
      ],
      tableNotes: [],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "카드 혜택 등 관련 문의사항은 KB국민카드 고객센터(1588-1688)로 문의하시기 바랍니다.",
      "LG전자는 KB국민카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "woori",
    company: "우리카드",
    fullName: "[우리] LG전자 구독 우리카드",
    minSpend: "120만원 이상",
    maxDiscount: "24,000원",
    image: "/images/card/우리카드.jpg",
    annualFee: { domestic: "15,000원" },
    tiers: [
      { spend: "40만원 이상 사용 시", discount: "월 최대 13,000원 할인" },
      { spend: "120만원 이상 사용 시", discount: "월 최대 24,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 구독 우리카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "40만원 이상", directDiscount: "11,000원", promoDiscount: "2,000원", total: "13,000원" },
        { minSpend: "120만원 이상", directDiscount: "20,000원", promoDiscount: "4,000원", total: "24,000원" },
      ],
      tableNotes: [],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "카드 혜택 등 관련 문의사항은 우리카드 고객센터(1588-9955)로 문의하시기 바랍니다.",
      "LG전자는 우리카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "woori-platinum",
    company: "우리카드",
    label: "Platinum",
    fullName: "[우리] LG전자 구독 우리카드 Platinum",
    minSpend: "200만원 이상",
    maxDiscount: "42,000원",
    image: "/images/card/우리카드(platinum).jpg",
    annualFee: { domestic: "30,000원", overseas: "35,000원" },
    tiers: [
      { spend: "80만원 이상 사용 시", discount: "월 최대 25,000원 할인" },
      { spend: "200만원 이상 사용 시", discount: "월 최대 42,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 구독 우리카드 Platinum",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "80만원 이상", directDiscount: "20,000원", promoDiscount: "5,000원", total: "25,000원" },
        { minSpend: "200만원 이상", directDiscount: "35,000원", promoDiscount: "7,000원", total: "42,000원" },
      ],
      tableNotes: [],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "카드 혜택 등 관련 문의사항은 우리카드 고객센터(1588-9955)로 문의하시기 바랍니다.",
      "LG전자는 우리카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "nh",
    company: "NH카드",
    fullName: "[NH농협] LG전자 구독 NH카드",
    minSpend: "100만원 이상",
    maxDiscount: "20,000원",
    image: "/images/card/농협카드.jpg",
    annualFee: { domestic: "15,000원" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 10,000원 할인" },
      { spend: "100만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 구독 NH농협카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "30만원 이상", directDiscount: "8,000원", promoDiscount: "2,000원", total: "10,000원" },
        { minSpend: "100만원 이상", directDiscount: "17,000원", promoDiscount: "3,000원", total: "20,000원" },
      ],
      tableNotes: [],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "카드 혜택 등 관련 문의사항은 NH농협카드 고객센터(1644-4000)로 문의하시기 바랍니다.",
      "LG전자는 NH농협카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "hyundai",
    company: "현대카드",
    fullName: "[현대] LG전자 구독 현대카드",
    minSpend: "120만원 이상",
    maxDiscount: "19,000원",
    image: "/images/card/현대카드.jpg",
    annualFee: { domestic: "15,000원" },
    tiers: [
      { spend: "40만원 이상 사용 시", discount: "월 최대 10,000원 할인" },
      { spend: "120만원 이상 사용 시", discount: "월 최대 19,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 구독 현대카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "40만원 이상", directDiscount: "8,500원", promoDiscount: "1,500원", total: "10,000원" },
        { minSpend: "120만원 이상", directDiscount: "16,000원", promoDiscount: "3,000원", total: "19,000원" },
      ],
      tableNotes: [],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "카드 혜택 등 관련 문의사항은 현대카드 고객센터(1577-6000)로 문의하시기 바랍니다.",
      "LG전자는 현대카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "jeonbuk",
    company: "전북카드",
    fullName: "[전북은행] LG전자 구독 JB카드",
    minSpend: "100만원 이상",
    maxDiscount: "20,000원",
    image: "/images/card/전북카드.jpg",
    annualFee: { domestic: "10,000원" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 10,000원 할인" },
      { spend: "100만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 구독 JB카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "30만원 이상", directDiscount: "8,000원", promoDiscount: "2,000원", total: "10,000원" },
        { minSpend: "100만원 이상", directDiscount: "17,000원", promoDiscount: "3,000원", total: "20,000원" },
      ],
      tableNotes: [],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "카드 혜택 등 관련 문의사항은 전북은행 고객센터(1588-4477)로 문의하시기 바랍니다.",
      "LG전자는 전북은행카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "gwangju",
    company: "광주카드",
    fullName: "[광주은행] LG전자 구독 광주카드",
    minSpend: "100만원 이상",
    maxDiscount: "20,000원",
    image: "/images/card/광주카드.jpg",
    annualFee: { domestic: "10,000원" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 10,000원 할인" },
      { spend: "100만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 구독 광주카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableRows: [
        { minSpend: "30만원 이상", directDiscount: "8,000원", promoDiscount: "2,000원", total: "10,000원" },
        { minSpend: "100만원 이상", directDiscount: "17,000원", promoDiscount: "3,000원", total: "20,000원" },
      ],
      tableNotes: [],
      excludedItems: ["무이자할부, 단카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자", "지방세, 국세, 4대보험, 아파트관리비, 도시가스, 전기요금, 수도요금, 거래 취소금액"],
    },
    notes: [
      "제휴카드 할인은 전월 실적 기준으로 월 1회 청구할인 방식으로 제공됩니다.",
      "카드 혜택 등 관련 문의사항은 광주은행 고객센터(1588-3388)로 문의하시기 바랍니다.",
      "LG전자는 광주은행카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
];

function CoinIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#f5c842] to-[#e0a800] shadow-sm">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="#f5c842" stroke="#c8960a" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#8a6200">
          ₩
        </text>
      </svg>
    </div>
  );
}

function CardVisual({ card, size = "lg" }: { card: CardData; size?: "sm" | "lg" }) {
  const isLg = size === "lg";
  return <Image src={card.image} alt={card.company} width={isLg ? 200 : 90} height={isLg ? 320 : 144} className={`h-auto rounded-xl shadow-md ${isLg ? "w-50" : "w-[90px]"}`} />;
}

export default function CardTab() {
  const [activeId, setActiveId] = useState(cards[0].id);
  const [detailOpen, setDetailOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const active = cards.find((c) => c.id === activeId)!;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-full max-w-6xl px-5">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-[13px] font-medium text-[#c90f45]">제휴 카드 혜택도 있나요?</p>
          <h2 className="mb-4 text-[32px] font-black leading-[1.35] tracking-tighter text-[#1a1a1a]">
            다양한 제휴카드로 월 구독료 할인을
            <br />
            받을 수 있습니다
          </h2>
          <p className="text-[14px] leading-[1.7] text-[#c90f45]">전월 실적에 따라 월 1회 할인이 적용되며, 다른 가전 추가 구독 시 다른 카드사의 제휴카드를 이용해야만 할인이 적용됩니다.</p>
        </div>

        {/* Card Tab Selector */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ minWidth: "max-content" }}>
            {cards.map((card) => {
              const isActive = card.id === activeId;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    setActiveId(card.id);
                    setDetailOpen(false);
                    setNotesOpen(false);
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <span
                    className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                      isActive ? "bg-[#1a1a1a] text-white" : "border border-[#ddd] bg-white text-[#555] hover:border-[#aaa]"
                    }`}
                  >
                    {card.company}
                    {card.label && <span className="ml-1 text-[11px] opacity-80">({card.label})</span>}
                  </span>
                  <CardVisual card={card} size="sm" />
                  <div className="text-center">
                    <p className="text-[11px] text-[#888]">{card.minSpend} 사용 시</p>
                    <p className="text-[11px] text-[#888]">월 최대 할인</p>
                    <p className="text-[14px] font-black text-[#1a1a1a]">{card.maxDiscount}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Card Detail */}
        <div className="mb-0 rounded-t-2xl border border-b-0 border-[#e8e8e8] bg-white">
          <div className="p-8">
            <h3 className="mb-8 text-[22px] font-black tracking-[-0.04em] text-[#1a1a1a]">{active.fullName}</h3>
            <div className="flex gap-10">
              {/* Left: card image */}
              <div className="flex shrink-0 flex-col items-center gap-3">
                <CardVisual card={active} size="lg" />
                <button type="button" className="text-[13px] text-[#555] hover:text-[#1a1a1a]">
                  카드 정보 자세히 보기 &gt;
                </button>
              </div>

              {/* Right: tiers */}
              <div className="flex flex-1 flex-col gap-3">
                {active.tiers.map((tier, i) => (
                  <div key={i} className="flex gap-4 rounded-xl bg-[#fafafa] p-4">
                    <CoinIcon />
                    <div>
                      <p className="text-[13px] text-[#666]">{tier.spend}</p>
                      <p className="text-[16px] font-black text-[#1a1a1a]">{tier.discount}</p>
                      {tier.note && <p className="mt-1 text-[11px] leading-[1.5] text-[#999]">*{tier.note}</p>}
                    </div>
                  </div>
                ))}

                {/* Annual fee */}
                <div className="flex gap-4 rounded-xl bg-[#fafafa] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8e8e8]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="6" width="18" height="13" rx="2" stroke="#888" strokeWidth="1.5" />
                      <path d="M3 10h18" stroke="#888" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#666]">연회비</p>
                    <p className="text-[14px] font-bold text-[#1a1a1a]">
                      국내전용 : {active.annualFee.domestic}
                      {active.annualFee.overseas && (
                        <>
                          {" "}
                          / 해외겸용 : {active.annualFee.overseas}
                          {active.annualFee.brand && ` (${active.annualFee.brand})`}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion: 카드 상세 내용 */}
        <div className="border border-b-0 border-[#e8e8e8]">
          <button
            type="button"
            onClick={() => setDetailOpen((v) => !v)}
            className="flex w-full items-center justify-center gap-2 border-t border-[#e8e8e8] py-4 text-[14px] font-bold text-[#1a1a1a] hover:bg-[#fafafa]"
          >
            카드 상세 내용
            <span className="text-[12px] text-[#888]">{detailOpen ? "▲" : "▼"}</span>
          </button>

          {detailOpen && (
            <div className="border-t border-[#e8e8e8] px-8 py-6">
              {/* Info rows */}
              <div className="mb-6 space-y-2">
                <div className="flex gap-2 text-[14px]">
                  <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">대상카드</span>
                  <span className="text-[#555]">· {active.detail.targetCard}</span>
                </div>
                <div className="flex gap-2 text-[14px]">
                  <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">기간</span>
                  <span className="text-[#555]">· {active.detail.period}</span>
                </div>
                <div className="flex gap-2 text-[14px]">
                  <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">혜택</span>
                  <span className="text-[#555]">· {active.detail.benefit}</span>
                </div>
              </div>

              {/* Benefit table */}
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#f0f0f0]">
                      <th rowSpan={2} className="border border-[#ddd] px-3 py-2 text-center font-bold">
                        전월 실적
                        <br />
                        (1일~말일)
                      </th>
                      <th colSpan={2} className="border border-[#ddd] px-3 py-2 text-center font-bold">
                        카드 서비스
                      </th>
                      <th className="border border-[#ddd] px-3 py-2 text-center font-bold">
                        프로모션 혜택
                        <br />
                        (72개월)
                      </th>
                      <th className="border border-[#ddd] px-3 py-2 text-center font-bold">혜택 합계</th>
                      <th className="border border-[#ddd] px-3 py-2 text-center font-bold">비고</th>
                    </tr>
                    <tr className="bg-[#f0f0f0]">
                      <th className="border border-[#ddd] px-3 py-2 text-center font-bold">결제일 할인</th>
                      <th className="border border-[#ddd] px-3 py-2 text-center font-bold">
                        포인트 적립
                        <br />
                        (구독요금
                        <br />
                        7만원 이상 시)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.detail.tableRows.map((row, i) => (
                      <tr key={i} className="even:bg-[#fafafa]">
                        <td className="border border-[#ddd] px-3 py-3 text-center">{row.minSpend}</td>
                        <td className="border border-[#ddd] px-3 py-3 text-center">{row.directDiscount}</td>
                        <td className="border border-[#ddd] px-3 py-3 text-center">{row.pointAccrual ?? "-"}</td>
                        <td className="border border-[#ddd] px-3 py-3 text-center">{row.promoDiscount}</td>
                        <td className="border border-[#ddd] px-3 py-3 text-center font-bold">{row.total}</td>
                        <td className="border border-[#ddd] px-3 py-3 text-[12px] text-[#555]">
                          {row.remarks?.map((r, j) => (
                            <p key={j} className="leading-[1.6]">
                              · {r}
                            </p>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {active.detail.tableNotes.map((note, i) => (
                <p key={i} className="mb-3 text-[12px] leading-[1.6] text-[#888]">
                  {note}
                </p>
              ))}

              {/* Excluded items */}
              {active.detail.excludedItems.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-[13px] font-bold text-[#1a1a1a]">* 전월 실적 제외항목</p>
                  <div className="space-y-1">
                    {active.detail.excludedItems.map((item, i) => (
                      <p key={i} className="text-[12px] leading-[1.7] text-[#666]">
                        - {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Accordion: 유의 사항 */}
        <div className="rounded-b-2xl border border-[#e8e8e8]">
          <button
            type="button"
            onClick={() => setNotesOpen((v) => !v)}
            className="flex w-full items-center justify-center gap-2 border-t border-[#e8e8e8] py-4 text-[14px] font-bold text-[#1a1a1a] hover:bg-[#fafafa]"
          >
            유의 사항
            <span className="text-[12px] text-[#888]">{notesOpen ? "▲" : "▼"}</span>
          </button>

          {notesOpen && (
            <div className="border-t border-[#e8e8e8] px-8 py-6">
              <ul className="space-y-2">
                {active.notes.map((note, i) => (
                  <li key={i} className="flex gap-2 text-[13px] leading-[1.7] text-[#555]">
                    <span className="mt-0.75 shrink-0 text-[#888]">·</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
