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
  promoDiscount?: string;
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
  annualFee: { domestic: string; overseas?: string; brand?: string; overseasLabel?: string };
  benefitPeriod?: string;
  tiers: Tier[];
  detail: {
    targetCard?: string;
    period?: string;
    benefit?: string;
    features?: string[];
    tableTitle?: string;
    tableStyle?: "full" | "simple" | "basic";
    promoMonthsLabel?: string;
    showAnnualFeeInDetail?: boolean;
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
        "무이자할부(슬림할부 등 부분 무이자 포함) 이용거래, 단기카드대출(현금서비스), 장기카드대출(카드론), 연회비, 각종 수수료/이자(할부수수료, 연체이자 등)",
        "기프트카드/ 선불카드 구매·충전금액, 지방세, 국세, 지방세외수입, 환경개선부담금, 4대보험(국민연금, 고용보험, 건강보험, 산재보험)",
        "유치원/초중고 납입금(스쿨뱅킹), 대학(원)등록금, 아파트관리비, 도시가스, 전기요금, TV수신료, 수도요금",
        "상품권/선불전자지급수단 구매·충전금액, 포인트/캐시/사이버머니/예치금 등 전자지급(결제)수단 구매·충전금액, 거래 취소금액",
      ],
    },
    notes: [
      "연회비 : 국내전용 22,000원/ 해외겸용 25,000원 프로모션 혜택은 해외겸용(Mastercard)카드만 적용됩니다. (국내전용 카드는 프로모션 혜택 미적용 되며, 신한카드 홈페이지를 통해 신청 가능합니다.)",
      "전월 이용금액은 'LG전자 The 구독케어 신한카드'의 전월(1일~말일) 거래 시점 이용금액(일시불+할부)을 기준으로 반영됩니다. - 해외 이용금액은 매입일자를 기준으로 반영됩니다. - 교통카드 이용금액은 전전월 이용금액이 전월 이용금액에 반영됩니다. (단, 모바일 후불 교통카드 이용금액은 전월이 반영됩니다.)",
      "'LG전자 The 구독케어 신한카드' 최초 신규 발급 회원*은 카드 사용 등록한 월의 다음달 등록월+1개월까지 전월 이용금액 30만원 이상 70만원 미만 구간의 서비스가 적용됩니다. 단, 해당 기간에 월 70만원 이상 이용할 경우 그에 맞는 서비스가 익월에 적용됩니다. * 'LG전자 The 구독케어 신한카드' 유효기간 만기 또는 해지 후 재발급 시 최초 신규발급 회원에서 제외됩니다.",
      "거래 후 취소금액은 국내 거래의 경우 최초 승인된 달의 이용금액에서, 해외 거래의 경우 취소 전표가 매입된 달의 이용금액에서 차감됩니다. [예시] 1월 20일 국내 이용금액을 2월 10일 취소하는 경우 1월 이용금액에서 차감",
      "'결제일 할인 및 포인트 적립 혜택'은 신한카드에서 제공합니다.",
      "카드 혜택 등 관련 문의사항은 신한카드 고객센터(1544-7000)로 문의하시기 바랍니다.",
      "LG전자는 신한카드(주)의 신용카드 모집 업무를 대리·중개합니다.",
      "LG전자는 다수의 여신전문금융회사를 대리하거나 중개합니다.",
      "LG전자는 신한카드(주)의 금융상품에 대해 계약 체결 권한이 없습니다.",
      "LG전자는 금융관계법령에 따라 신한카드(주)와 제휴 계약을 체결한 금융상품 판매대리·중개업자입니다.",
      "계약을 체결전, 연회비 등 상세 사항은 반드시 금융상품설명서 및 약관을 확인하시기 바랍니다.",
      "금융소비자는 금융소비자보호법 제19조 제1항에 따라 해당 금융상품 또는 서비스에 대하여설명받을 권리가 있습니다.",
      '연체이자율은 "회원별, 이용상품별 약정금리+최대 연3%, 법정 최고금리(연20%)이내"에서 적용됩니다. 단,연체 발생 시점에 약정금리가 없는 경우 약정금리는 아래와 같이 적용함 - 일시불 거래 연체 시 : 거래 발생 시점의 최소기간(2개월) 유이자 할부 금리 - 무이자 할부 거래 연체 시 : 거래 발생 시점의 동일한 할부 계약기간의 유이자 할부 금리',
      "신용카드 발급이 부적정한 경우(개인신용평점 낮음, 연체(단기포함) 사유 발생 등), 카드발급이 제한될 수 있습니다.",
      "카드 이용대금과 이에 수반되는 모든 수수료는 고객님께서 지정하신 결제일에 상환하여야 합니다.",
      "상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.",
      "개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.",
      "일정기간 신용카드 이용대금을 연체할 경우, 결제일이 도래하지 않은 모든 신용카드 이용대금을 변제할 의무가 발생할 수 있습니다.",
      "여신금융협회 심의필 제2026-C1h-05089호(2026.04.01~2027.03.31)",
    ],
  },
  {
    id: "lotte",
    company: "롯데카드",
    fullName: "[롯데] LG구독엔로카",
    minSpend: "160만원 이상",
    maxDiscount: "26,000원",
    image: "/images/card/롯데카드.jpg",
    annualFee: { domestic: "20,000원", overseas: "20,000원", brand: "AMEX, Mastercard" },
    benefitPeriod: "2026.05.01~2026.05.31",
    tiers: [
      { spend: "40만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
      { spend: "80만원 이상 사용 시", discount: "월 최대 23,000원 할인" },
      { spend: "160만원 이상 사용 시", discount: "월 최대 26,000원 할인" },
    ],
    detail: {
      targetCard: "LG구독엔로카 (AMEX)",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상 카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableTitle: "결제일 할인 혜택",
      tableStyle: "simple",
      showAnnualFeeInDetail: true,
      tableRows: [
        {
          minSpend: "40만 원 이상",
          directDiscount: "13,000원",
          promoDiscount: "7,000원",
          total: "20,000원",
          remarks: ["LG구독엔로카 AMEX브랜드만 프로모션 제공", "LG전자 구독요금 자동이체 시 제공", "프로모션 혜택은 월 1회, 최대 72개월간 제공(자동이체 등록에 따라 차등적용됨)"],
        },
        { minSpend: "80만 원 이상", directDiscount: "18,000원", promoDiscount: "5,000원", total: "23,000원" },
        { minSpend: "160만 원 이상", directDiscount: "26,000원", promoDiscount: "-", total: "26,000원" },
      ],
      tableNotes: [
        "- 전월 실적 제외항목 : 현금서비스, 카드론, 수수료, 이자, 연회비, 케어솔루션 요금 자동이체, 아파트관리비, 국세, 지방세, 취소매출 등 자세한 내용은 홈페이지 상품공시실 및 상품안내장 참조",
        "※ 결제일 할인 시 자동이체 필수 (월 1회 할인)",
      ],
      excludedItems: [],
    },
    notes: [
      "'결제일 할인'은 LG전자가 아닌 카드사에서 할인됩니다. 요금 출금일에는 정상 요금이 출금되고, 카드 대금 결제일에 전월 실적(1일~말일)이 충족되면 할인됩니다.",
      "이벤트 관련 자세한 문의사항은 롯데카드 고객센터(1588-8100)로 연락하시기 바랍니다.",
      "해당 이벤트는 롯데카드 또는 제휴사 사정에 따라 사전고지 없이 종료되거나 변경될 수 있습니다.",
      "계약체결 전 금융상품설명서와 약관을 확인하시기 바랍니다.",
      "서비스 제공 업종은 롯데카드에 등록된 가맹점 업종을 기준으로 합니다.",
      "신용카드 발급이 부적정한 경우(개인신용평점 낮음 등) 카드발급이 제한될 수 있습니다.",
      "카드이용대금과 이에 수반되는 모든 수수료를 지정된 대금 결제일에 상환해야 합니다.",
      "금융소비자는 금소법 제19조제1항에따라 해당상품 또는 서비스에 대하여 설명을 받을 권리가 있습니다.",
      "LG전자는 롯데카드(주)의 신용카드 회원모집업무를 대리- 중개합니다.",
      "LG전자는 다수의 신용카드사를 대리하거나 중개합니다.",
      "LG전자는 롯데카드(주)로 부터 금융상품 계약체결권을 부여받지 않았으며,",
      "신용카드 계약은 해당금융사와 직접 체결됩니다.",
      "LG전자는 금융관계법률에 따라 롯데카드(주)와 위탁계약을 체결한 금융상품판매대리- 중개업자입니다.",
      "연체 이자율 : 회원별- 이용상품별 약정이율 + 최대 3% 법정 최고금리(연20%) 이내 ※ 단, 연체 발생 시점에 약정이율이 없는 경우 아래와 같이 약정이율을 적용 - 일시불 거래 연체 시 : 거래 발생 시점의 최소기간(2개월) 유이자 할부 금리 - 무이자 할부 거래 연체 시 : 거래 발생 시점의 동일한 할부 계약 기간의 유이자 할부 금리",
      "상환능력에 비해 신용카드 사용액이 과도할 경우 귀하의 개인신용평점이 하락할 수 있습니다.",
      "개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.",
      "일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.",
      "여신금융협회 심의필 제2025-C1h-11099호 (2025.07.30 ~ 2026.07.29)",
    ],
  },
  {
    id: "kb",
    company: "KB국민카드",
    fullName: "[KB국민] LG전자 KB국민",
    minSpend: "80만원 이상",
    maxDiscount: "22,000원",
    image: "/images/card/KB국민카드.jpg",
    annualFee: { domestic: "15,000원", overseas: "15,000원" },
    benefitPeriod: "2026.05.01~2026.05.31",
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 17,000원 할인" },
      { spend: "80만원 이상 사용 시", discount: "월 최대 22,000원 할인" },
    ],
    detail: {
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상카드로 LG전자 구독 요금 자동이체 시 프로모션 혜택 제공",
      tableTitle: "결제일 할인 혜택",
      tableStyle: "simple",
      promoMonthsLabel: "(60개월)",
      showAnnualFeeInDetail: true,
      tableRows: [
        {
          minSpend: "30만 원 이상",
          directDiscount: "10,000원",
          promoDiscount: "7,000원",
          total: "17,000원",
          remarks: ["LG전자 구독요금 자동이체 시 제공", "프로모션 혜택은 최대 60개월간 제공"],
        },
        { minSpend: "80만 원 이상", directDiscount: "15,000원", promoDiscount: "7,000원", total: "22,000원" },
      ],
      tableNotes: [
        "※ 라이트 할부 할인과 구독요금 할인은 중복 제공되지 않습니다.",
        "* 추가청구할인 혜택 제공기간 : 2026.6월 ~ 2031.8월(63개월 중 최대 60개월 제공)",
        "- 카드서비스 실적 유예기간 : 구독요금 할인은 최초 카드발급 후 사용등록일로부터 다음달 말까지는 전월 실적 조건 미달 시에도 1만원 할인이 적용되며, 라이트 할부의 경우 최초카드 발급 후 사용등록일로부터 다음 달 말까지는 전월 이용실적 5만원 이상 ~ 30만원 미만시에도 전월 말일 기준 라이트 할부잔액 존재 시 다음달 1만원 할인 적용",
        "- 전월 실적 제외대상 LG전자 KB국민카드로 '구독요금 할인서비스' 받은 이용건(해당 매출 전체) 무이자할부 이용금액, 단기카드대출(현금서비스), 장기카드대출(카드론), 각종 세금 및 공과금, 정부지원금, 대학(원) 등록금, 각종 수수료 및 이자, 연체료, 연회비, 상품권 및 선불카드 구입/충전금액, 무승인전표(대중교통, 자판기, 터널이용료, 항공기내 이용 등), 취소금액",
        "- 해당 카드는 발급 후 납부 정보를 해당 카드로 직접 등록/변경해야 청구할인 혜택을 받을 수 있습니다. (마이페이지 >구독 관리>계약 현황)",
      ],
      excludedItems: [],
    },
    notes: [
      "연체 이자율 : 회원별 / 이용상품별 정상이자율 +3%p, 최고 연 20% 이내 ※ 단, 연체 발생시점에 약정이율이 없는 경우 아래와 같이 적용함 - 일시불 거래 연체 시 : 거래 발생 시점의 최소 기간(2개월) 유이자 할부수수료율 적용 - 무이자 할부 거래 연체 시 : 거래발생시점의 동일한 할부계약기간의 유이자 할부수수료율 적용 - 그 외의 경우: 상법상 상사법정이율과 상호금융가계자금대출금리 중 높은 금리 적용 * 한국은행에서 매월 발표하는 가장 최근의 비은행 금융기관 가중평균 대출금리(신규대출기준)",
      "카드 발급 후 직접 납부 정보를 해당 카드로 변경해야 청구할인 혜택을 받을 수 있습니다. (납부정보 변경은 \"마이페이지>구독 관리>계약 현황에서 변경 가능)",
      "카드 상품별 연회비 및 서비스 등에 관한 상세 사항은 각 카드사의 홈페이지를 참조 해 주시기 바랍니다.",
      "계약을 체결하기 전에 상품에 관한 상세한 사항은 각 카드사의 상품설명서 및 약관을 확인하시기 바랍니다.",
      "상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.",
      "개인신용평점 하락시 금융거래와 관련된 불이익이 발생할 수 있습니다.",
      "일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.",
      "금융소비자는 금소법 제19조 제1항에 따라 해당 상품 또는 서비스에 대하여 설명 받을 권리가 있으며, 그 설명을 듣고 내용을 충분히 이해한 후 거래하시기 바랍니다.",
      "신용카드 발급이 부적정한 경우(연체금 보유, 개인신용평점 낮음 등) 카드 발급이 제한될 수 있습니다.",
      "카드 이용 대금과 이에 수반되는 모든 수수료를 지정된 대금 결제일에 상환합니다.",
      "LG전자는 KB국민카드의 신용카드 상품 판매 업무를 중개하고 있습니다.",
      "LG전자는 다수의 금융상품 직접판매업자를 대리하거나 중개합니다.",
      "LG전자는 KB국민카드의 금융상품에 대한 계약 체결 권한이 없습니다.",
      "LG전자는 금융관계법률에 따라 KB국민카드와 제휴 계약을 체결한 금융상품 판매대리 중개업자입니다.",
      "고의 또는 과실로 금융소비자보호법을 위반하여 금융소비자에게 손해를 발생시킨 경우에는 그 손해를 배상할 책임이 있습니다.",
      "LG전자는 금융상품직접판매업자로부터 급부 수령에 관한 권한을 부여 받을 경우 제외하고는 금융소비자로부터 급부를 수령할 권한이 없습니다.",
      "금융소비자가 제공한 개인(신용)정보 등은 금융상품직접판매업자가 보유 관리하며, LG전자는 기타 금융소비자보호법에서 요구하는 금융소비자 보호 또는 건전한 질서유지를 위한 내용을 준수하고 있습니다.",
      "여신금융협회 심의필 : 제 2026-C1h-03718호(2026.03.19 ~ 2027.03.18)",
    ],
  },
  {
    id: "woori",
    company: "우리카드",
    fullName: "[우리] LG전자 우리카드",
    minSpend: "120만원 이상",
    maxDiscount: "24,000원",
    image: "/images/card/우리카드.jpg",
    annualFee: { domestic: "15,000원", overseas: "15,000원", brand: "Mastercard" },
    benefitPeriod: "2026.05.01~2026.05.31",
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 17,000원 할인" },
      { spend: "70만원 이상 사용 시", discount: "월 최대 22,000원 할인" },
      { spend: "120만원 이상 사용 시", discount: "월 최대 24,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 우리카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상카드로 LG전자 구독요금 자동납부 최초 결제 시 프로모션 혜택 제공",
      tableTitle: "LG전자 구독요금 및 장기할부 청구할인 서비스\n※ LG전자 구독요금 자동납부 시 제공",
      tableStyle: "simple",
      tableRows: [
        {
          minSpend: "30만 원 이상",
          directDiscount: "10,000원",
          promoDiscount: "7,000원",
          total: "17,000원",
          remarks: [
            "LG전자 구독요금 자동납부 또는 제품구매 장기할부(24/36개월) 필수",
            "※ 프로모션 혜택(72개월)은 LG전자 구독요금 자동납부 시 한정 적용",
          ],
        },
        { minSpend: "70만 원 이상", directDiscount: "15,000원", promoDiscount: "7,000원", total: "22,000원" },
        { minSpend: "120만 원 이상", directDiscount: "20,000원", promoDiscount: "4,000원", total: "24,000원" },
      ],
      tableNotes: [
        "※ 구독요금 자동납부 최초 결제 고객 대상 추가할인",
        "- 프로모션 기간 : 2026.05.01~2026.05.31",
        "- 대상 : LG전자 우리카드로 LG전자 구독요금 자동납부 최초 결제 회원 (가족카드 적용 불가)",
        "- 프로모션 혜택은 최대 72개월간 적용됩니다. (프로모션 기간의 익월까지 LG전자 구독요금 자동납부 매입 시, 최대 72개월간 혜택 적용)",
        "예) 프로모션 기간이 25.7월인 경우, 25.8월 LG전자 구독요금 자동납부 첫 매입 시 추가할인 혜택 기간: '25.8월 ~ '31.7월",
        "- LG전자 우리카드 프로모션 혜택은 LG전자 구독요금 자동납부 시에만 할인 적용됩니다.",
        "- 프로모션 이용실적 조건은 상품서비스와 동일합니다.",
        "- 프로모션 시작일 직전 1년간(25.4.1~26.3.31) LG전자 우리카드 탈퇴 또는 해지 이력 있을 시 프로모션 대상에서 제외됩니다.",
        "- 상기 프로모션은 우리카드에서 제공하는 서비스로 예산 소진 등과 같은 우리카드 상황에 따라 프로모션의 혜택이 중단 또는 변경될 수 있습니다.",
        "- 매월 청구되는 LG전자 구독요금 자동납부 금액 또는 제품구매 장기할부 금액에 대해 전월 이용실적별 청구할인 서비스를 적용합니다.",
        "- LG전자 구독요금 자동납부 또는 제품구매 장기할부 이용 시에만 적용되며, 자동납부/장기할부가 아닌 일반결제(1회성 단순결제)는 할인 적용 불가합니다.",
        "- 자동납부 또는 장기할부 건이 여러건인 경우 합산하여 할인한도 내에서 통합 할인 적용됩니다.",
        "- 백화점, 대형할인점 등 입점 매장에서는 장기할부 서비스 제공이 불가합니다.",
        "- LG전자 장기할부 서비스 이용으로 청구할인 서비스가 적용되는 경우, LG전자 장기할부 상환 종료 시에는 청구할인 서비스가 적용되지 않습니다.",
        "- 전월 실적 제외항목 : LG전자 우리카드로 할인받은 구독요금 이용금액(해당 이용금액 전체), LG전자 장기할부 이용 금액, 아파트 관리비, LH/SH/전북개발공사임대료, 정부지원금(보육료, 유치원보조비, 바우처 이용금액 등), 대학(대학원)등록금, 국세, 지방세, 공공요금(공과금)*, 단기카드대출(현금서비스), 장기카드대출(카드론), 상품권(카카오톡 선물하기 등 모바일상품권 포함)/선불카드(포인트, 사이버머니, 게임머니 등 전자지급 수단 포함)/기프트카드 구매 및 충전금액, 교통카드(모바일포함) 구매 및 충전금액, 고속버스(차내단말기 및 고속버스 APP결제), 각종 수수료 및 이자, 연회비, 매출취소금액, 무이자할부금액은 전월 실적에 포함되지 않습니다.",
        "* 공공요금(공과금) 내역 4대보험(건강보험/국민연금/고용보험/산재보험), 전기요금, 우편요금, 도시가스요금, 상하수도요금, 과태료·범칙금·벌금, 여권발급비용, 국가·공공기관·공공단체(지방자치단체 등)로 개설된 가맹점 이용금액",
      ],
      excludedItems: [],
    },
    notes: [
      "연회비 : 국내전용 15,000원 / 해외겸용(MasterCard) 15,000원",
      "상세혜택 및 이용조건은 계약체결 전 홈페이지(www.wooricard.com), 상품설명서 및 약관 등을 통해 확인하시기 바랍니다.",
      "신용카드 발급이 부적정한 경우(개인신용평점 낮음 등) 카드발급이 제한될 수 있습니다.",
      "카드이용대금과 이에 수반되는 모든 수수료를 지정된 대금결제일에 상환합니다.",
      "금융소비자는 금융소비자보호법 제19조제1항에 따라 해당상품 또는 서비스에 대하여 설명을 받을 권리가 있으며, 그 설명을 듣고 내용을 충분히 이해한 후 거래하시기 바랍니다.",
      "엘지전자(주)는 (주)우리카드의 신용카드 회원 모집업무를 대리·중개합니다.",
      "엘지전자(주)는 (주)우리카드를 포함한 다수의 금융회사를 대리·중개합니다.",
      "엘지전자(주)는 (주)우리카드의 금융상품에 대한 계약 체결 권한이 없습니다.",
      "엘지전자(주)는 금융관계법률에 따라 (주)우리카드와 제휴계약을 체결한 금융상품 판매대리·중개업자입니다.",
      "상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.",
      "개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.",
      "일정 기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.",
      "연체이율: 회원별/이용상품별 정상이자율 + 최대 연 3%(법정최고금리 연 20% 이내) 단, 연체 발생 시점에 정상이자율이 없는 경우는 아래와 같이 적용함 - 일시불 거래 연체 시 : 거래 발생 시점의 최소기간(2개월) 유이자 할부 금리 - 무이자 할부 거래 연체 시 : 거래 발생 시점의 동일한 할부 계약기간의 유이자 할부 금리 - 그 외의 경우 : 상사법정이율과 상호금융 가계자금 대출금리* 중 높은 금리 적용 * 한국은행에서 매월 발표하는 가장 최근의 비은행 금융기관 가중평균대출금리(신규대출 기준)",
      "여신금융협회 심의필 제 2025 – C1h – 10251호 (2025.07.16 ~ 2026.07.15)",
    ],
  },
  {
    id: "woori-platinum",
    company: "우리카드",
    label: "Platinum",
    fullName: "[우리] LG전자 우리카드",
    minSpend: "200만원 이상",
    maxDiscount: "42,000원",
    image: "/images/card/우리카드(platinum).jpg",
    annualFee: { domestic: "25,000원", overseas: "25,000원", brand: "VISA" },
    benefitPeriod: "2026.05.01~2026.05.31",
    tiers: [
      { spend: "100만원 이상 사용 시", discount: "월 최대 35,000원 할인" },
      { spend: "150만원 이상 사용 시", discount: "월 최대 39,000원 할인" },
      { spend: "200만원 이상 사용 시", discount: "월 최대 42,000원 할인" },
    ],
    detail: {
      targetCard: "LG전자 Platinum 우리카드",
      period: "2026.05.01~2026.05.31",
      benefit: "이벤트 기간 내 대상카드로 LG전자 구독요금 자동납부 최초 결제 시 프로모션 혜택 제공",
      tableTitle: "LG전자 구독요금 및 장기할부 청구할인 서비스\n※ LG전자 구독요금 자동납부 시 제공",
      tableStyle: "simple",
      tableRows: [
        {
          minSpend: "100만 원 이상",
          directDiscount: "29,000원",
          promoDiscount: "6,000원",
          total: "35,000원",
          remarks: ["LG전자 구독요금 자동납부 필수"],
        },
        { minSpend: "150만 원 이상", directDiscount: "34,000원", promoDiscount: "5,000원", total: "39,000원" },
        { minSpend: "200만 원 이상", directDiscount: "40,000원", promoDiscount: "2,000원", total: "42,000원" },
      ],
      tableNotes: [
        "※ 구독요금 자동납부 최초 결제 고객 대상 추가할인",
        "- 프로모션 기간 : 2026.05.01~2026.05.31",
        "- 대상 : LG전자 Platinum 우리카드로 LG전자 구독요금 자동납부 최초 결제 회원 (가족카드 적용 불가)",
        "- 프로모션 혜택은 최대 72개월간 적용됩니다. (프로모션 기간의 익월까지 LG전자 구독요금 자동납부 매입 시, 최대 72개월간 혜택 적용)",
        "예) 프로모션 기간이 26.3월인 경우, 26.4월 LG전자 구독요금 자동납부 첫 매입 시 추가할인 혜택 기간: '26.4월 ~ '32.3월",
        "- LG전자 Platinum 우리카드 프로모션 혜택은 LG전자 구독요금 자동납부 시에만 할인 적용됩니다.",
        "- 프로모션 이용실적 조건은 상품서비스와 동일합니다.",
        "- 프로모션 시작일 직전 1년간(25.3.1~26.2.28) LG전자 Platinum 우리카드 탈퇴 또는 해지 이력 있을 시 프로모션 대상에서 제외됩니다.",
        "- 상기 프로모션은 우리카드에서 제공하는 서비스로 예산 소진 등과 같은 우리카드 상황에 따라 프로모션의 혜택이 중단 또는 변경될 수 있습니다.",
        "- 매월 청구되는 LG전자 구독 자동납부 금액에 대해 전월 국내외 가맹점 이용실적별 청구할인 서비스가 제공됩니다.",
        "- LG전자 구독 자동납부는 카드 수령 후 별도 신청이 필요하며, 카드를 재발급 받는 경우 자동납부 재신청이 필요합니다. (LG전자 구독 자동납부 신청 등 관련 문의 : LG전자 고객센터 ☎1544-7777)",
        "- LG전자 구독 자동납부 건이 여러 건인 경우 월 할인한도 내에서 통합할인 적용됩니다.",
        "- 월 할인한도보다 LG전자 구독 자동납부 승인금액이 적을 경우, 승인금액 만큼만 할인이 적용됩니다.",
        "예) 월 자동납부 승인금액이 25,000원인 경우, 전월 이용실적 100만원 이상이더라도 25,000원 할인 적용 (월 자동납부 승인금액 ≤ 월 할인한도) LG전자 구독 자동납부 이용 시에만 적용되며, 자동납부가 아닌 일반 결제(1회성 단순결제 등)는 할인이 적용되지 않습니다.",
        "- LG전자 구독 자동납부가 청구되지 않거나 구독 만료로 청구가 종료된 경우에는 할인이 적용되지 않습니다.",
        "- LG전자 Platinum 우리카드의 가족카드는 청구할인 서비스가 적용되지 않습니다.",
        "전월실적 제외항목 : 무이자할부금액, 정부지원금(보육료, 유치원보조비, 바우처 이용금액 등), 아파트 관리비, LH/SH/전북개발공사 등 공공 임대료, 부동산임대료, 대학(대학원)등록금, 국세, 지방세, 공공요금(공과금)*, 상품권(카카오톡 선물하기 등 모바일상품권 포함)/선불카드(포인트, 사이버머니, 게임머니 등 전자지급수단 포함)/기프트카드 구매 및 충전금액, 교통카드(모바일 포함)구매 및 충전금액, 고속버스(차내단말기 및 고속버스 APP결제), 각종 수수료 및 이자, 연회비,단 기카드대출(현금서비스), 장기카드대출(카드론), 매출취소금액은 전월실적에 포함되지않습니다.",
        "* 공공요금(공과금) 내역 4대보험(건강보험/국민연금/고용보험/산재보험), 전기요금, 우편요금, 도시가스요금, 상하 수도요금, 과태료·범칙금·벌금, 여권발급비용, 국가·공공기관·공공단체(지방자치단체 등)로 개설된 가맹점 이용금액",
      ],
      excludedItems: [],
    },
    notes: [
      "연회비 : 국내전용 25,000원 / 해외겸용(VISA) 25,000원",
      "상세혜택 및 이용조건은 계약체결 전 홈페이지(www.wooricard.com), 상품설명서 및 약관 등을 통해 확인하시기 바랍니다.",
      "신용카드 발급이 부적정한 경우(개인신용평점 낮음 등) 카드발급이 제한될 수 있습니다.",
      "카드이용대금과 이에 수반되는 모든 수수료를 지정된 대금결제일에 상환합니다.",
      "금융소비자는 금융소비자보호법 제19조제1항에 따라 해당상품 또는 서비스에 대하여 설명을 받을 권리가 있으며, 그 설명을 듣고 내용을 충분히 이해한 후 거래하시기 바랍니다.",
      "엘지전자(주)는 (주)우리카드의 신용카드 회원 모집업무를 대리·중개합니다.",
      "엘지전자(주)는 (주)우리카드를 포함한 다수의 금융회사를 대리·중개합니다.",
      "엘지전자(주)는 (주)우리카드의 금융상품에 대한 계약 체결 권한이 없습니다.",
      "엘지전자(주)는 금융관계법률에 따라 (주)우리카드와 제휴계약을 체결한 금융상품 판매대리·중개업자입니다.",
      "상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.",
      "개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.",
      "일정 기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.",
      "연체이율: 회원별/이용상품별 정상이자율 + 최대 연 3%(법정최고금리 연 20% 이내) 단, 연체 발생 시점에 정상이자율이 없는 경우는 아래와 같이 적용함 - 일시불 거래 연체 시 : 거래 발생 시점의 최소기간(2개월) 유이자 할부 금리 - 무이자 할부 거래 연체 시 : 거래 발생 시점의 동일한 할부 계약기간의 유이자 할부 금리 - 그 외의 경우 : 상사법정이율과 상호금융 가계자금 대출금리* 중 높은 금리 적용 * 한국은행에서 매월 발표하는 가장 최근의 비은행 금융기관 가중평균대출금리(신규대출 기준)",
      "여신금융협회 심의필 제 2026 - C1h - 02775호 (2026.03.03 ~ 2027.03.02)",
    ],
  },
  {
    id: "nh",
    company: "NH카드",
    fullName: "[NH] 올원 LG전자 BEST",
    minSpend: "100만원 이상",
    maxDiscount: "20,000원",
    image: "/images/card/농협카드.jpg",
    annualFee: { domestic: "15,000원", overseas: "17,000원", brand: "Mastercard" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 10,000원 할인" },
      { spend: "60만원 이상 사용 시", discount: "월 최대 15,000원 할인" },
      { spend: "100만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
    ],
    detail: {
      features: ["카페/빵집을 자주 이용하는 고객에게 청구할인 혜택"],
      showAnnualFeeInDetail: true,
      tableTitle: "할인 혜택",
      tableStyle: "basic",
      tableRows: [
        { minSpend: "무실적 기간 (카드 사용등록월)", directDiscount: "10,000원", total: "10,000원" },
        { minSpend: "30만 원 이상", directDiscount: "10,000원", total: "10,000원" },
        { minSpend: "60만 원 이상", directDiscount: "15,000원", total: "15,000원" },
        { minSpend: "100만 원 이상", directDiscount: "20,000원", total: "20,000원" },
      ],
      tableNotes: [
        "- 전월 실적 제외항목 : 아파트관리비, 각종 세금, 공과금, 장기할부 할부금, 해외매출, 대학(원)등록금현금 서비스, 카드론, 수수료, 이자, 연회비",
        "- 해당 카드는 발급 후 납부 정보를 해당 카드로 직접 등록/변경해야 청구할인 혜택을 받을 수 있습니다. (마이페이지 >구독 관리>계약 현황)",
      ],
      excludedItems: [],
    },
    notes: [
      "카드 혜택 등 관련 문의사항은 NH농협카드 고객센터(1644-4000)로 문의하시기 바랍니다.",
      "LG전자는 NH농협카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "hyundai",
    company: "현대카드",
    fullName: "[현대] LG전자 현대카드",
    minSpend: "120만원 이상",
    maxDiscount: "19,000원",
    image: "/images/card/현대카드.jpg",
    annualFee: { domestic: "20,000원", overseas: "20,000원", brand: "Visa Platinum" },
    tiers: [
      { spend: "40만원 이상 사용 시", discount: "월 최대 15,000원 청구 할인" },
      { spend: "80만원 이상 사용 시", discount: "월 최대 17,000원 청구 할인" },
      { spend: "120만원 이상 사용 시", discount: "월 최대 19,000원 청구 할인" },
    ],
    detail: {
      targetCard: "LG전자 현대카드 (Visa Platinum) 기소지 회원",
      period: "2026.05.01~2026.05.31",
      benefit: "기간 내 LG전자 현대카드로 LG전자 구독료 자동이체 시 전월 이용 금액에 따라 구독료 최대 60개월 간 1만 9000원 청구 할인",
      tableTitle: "결제일 할인 혜택",
      tableStyle: "simple",
      promoMonthsLabel: "(60개월)",
      tableRows: [
        { minSpend: "40만 원 이상", directDiscount: "8,000원", promoDiscount: "7,000원", total: "15,000원" },
        { minSpend: "80만 원 이상", directDiscount: "12,000원", promoDiscount: "5,000원", total: "17,000원" },
        { minSpend: "120만 원 이상", directDiscount: "16,000원", promoDiscount: "3,000원", total: "19,000원" },
      ],
      tableNotes: [
        "※ 전월 실적에 따라 혜택 제공",
        "※ 실적 조건 및 할인 한도, 혜택 제외 가맹점 기준 등 자세한 내용은 상품설명서를 통해 확인 가능",
        "전월 이용 금액 합산 제외 기준",
        "- 청구 할인 적용된 구독료 정기결제 금액",
        "- 장기카드대출(카드론), 단기카드대출(현금서비스), 연회비, 제수수료, 이자",
        "- 국제브랜드 수수료 및 해외서비스 수수료",
        "- 공과금 납부액(국세, 관세, 지방세, 지방세외수입, 상하수도 요금, 벌과금, 과태료, 인지세, 송달료, 민원 발급 수수료 등 국가 또는 공공단체가 부과하는 부담금)",
        "- 전기 요금, TV 수신료, 도시가스 요금, 아파트 관리비, 부동산 임대료(월세), 자동납부 서비스 이용 수수료",
        "- 사립유치원 교육비 납입금, 초·중·고교 학교 납입금, 대학·대학원 등록금 납부 결제 건",
        "- 상품권 등 현금성 유가증권 구매 및 선불 카드 구매·충전 금액",
        "- 건강보험, 국민연금, 고용보험, 산재보험 및 장애인 고용 부담금",
        "- 고속도로 통행 요금, 후불하이패스카드 이용 금액, 고속버스(차내 단말기 및 고속버스 앱 결제 포함)",
        "- 무이자 할부 이용 금액",
        "- LG전자 현대카드 이용 금액만 인정되며, 그 외 모든 카드 이용 금액은 합산 불가",
      ],
      excludedItems: [],
    },
    notes: [
      "전월 이용 금액은 전월 1일~말일까지 LG전자 현대카드(본인+가족 카드)의 일시불 및 할부 이용 금액임",
      "전월 이용 금액 40만원 미만 시 청구 할인 제외",
      "구독료 정기결제 결제 건에 한해 혜택 적용 - 일반 납부 건, 정기결제일 이후 납부 건은 혜택 제외",
      "LG전자 구독료가 청구 할인 금액보다 적을 경우, 결제 금액만큼만 혜택 적용",
      "정기결제 등록한 LG전자 구독료가 카드사에 청구되는 시점부터 혜택 적용",
      "할인 혜택은 결제 순서가 아닌 현대카드 매출전표 접수 순서에 따라 적용",
      "혜택 적용된 결제 건을 월 할인 한도 초과 후 취소할 경우, 한도 초과로 혜택이 적용되지 않은 이전 결제 건에 대해 다음 달 15일경 혜택 적용(월 할인 한도 이내)",
      "정상 금액 결제 후 회원별 카드 이용 대금 청구일에 할인 적용된 금액으로 청구",
      "LG전자 구독료 정기결제 건수와 관계없이 전월 이용 금액별 월 할인 한도 내 혜택 적용",
      "할인 한도는 본인+가족 카드 합산 적용",
      "정기결제는 LG전자 고객센터를 통해 신청 가능",
      "자세한 내용은 현대카드 홈페이지 참고",
      "전월 이용 금액 산정 기준 : 전월 이용 금액은 전월 1일~말일까지 LG전자 현대카드(본인+가족 카드)의 일시불 및 할부 이용 금액임 / 할부, 일부결제금액이월약정(리볼빙) 이용 시 최초 승인일 기준으로 해당월의 이용 금액에 포함 / 전표매입 지연, 매출 취소의 경우 이용 금액 합산이 달라질 수 있음 / 매출 취소 시 취소 발생월이 아닌 승인월 이용 금액에서 제외되며, 취소 금액으로 전월 이용 금액 미충족 시 당월 혜택 미제공(단, 해외 이용 금액은 취소 발생월 이용 금액에서 제외) / 대중교통, 정기결제 등 사후 승인 가맹점 이용 금액과 해외 이용 금액은 매출일자 기준으로 해당월의 이용 금액에 포함",
      "LG전자는 현대카드의 신용카드 회원 모집 업무를 대리·중개합니다.",
      "LG전자는 다수의 신용카드사를 대리하거나 중개합니다.",
      "LG전자는 현대카드의 금융상품에 대한 계약체결권한이 없습니다.",
      "LG전자는 금융관계법률에 따라 현대카드와 위탁계약을 체결한 금융상품판매대리·중개업자입니다.",
      "카드 이용 대금 연체 시 약정 금리 + 연체 가산 금리 3%의 연체 금리가 적용됩니다.(회원별, 이용 상품별 차등 적용/법정 최고 금리 20% 이내) 단, 연체 발생 시점에 약정 금리가 없는 경우 아래와 같이 적용 - 일시불 : 거래 발생 시점 기준 최소 기간(2개월)의 유이자 할부 약정 금리 + 연체 가산 금리 3% - 무이자 할부 : 거래 발생 시점 기준 동일한 할부 계약 기간의 유이자 할부 약정 금리 + 연체 가산 금리 3%",
      "상환 능력에 비해 신용카드 이용금액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.",
      "개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.",
      "일정 기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.",
      "신용카드 발급이 부적정한 경우(연체금 보유, 개인신용평점 낮음 등) 카드 발급이 제한될 수 있습니다.",
      "카드 이용대금과 이에 수반되는 모든 수수료를 지정된 대금 결제일에 상환합니다.",
      "금융소비자는 금융소비자보호법 제19조 제1항에 따라 해당 상품 또는 서비스에 대하여 설명을 받을 권리가 있습니다.",
      "자세한 내용 및 이용 조건은 카드 신청 전 현대카드 홈페이지 및 상품설명서, 약관 참고",
      "여신금융협회 심의필 제2026-C1h-050303호(2026.04.14~2027.04.13)",
    ],
  },
  {
    id: "jeonbuk",
    company: "전북카드",
    fullName: "[전북] 베스트케어",
    minSpend: "100만원 이상",
    maxDiscount: "20,000원",
    image: "/images/card/전북카드.jpg",
    annualFee: { domestic: "14,000원", overseas: "15,000원", overseasLabel: "Mastercard" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 8,000원 할인" },
      { spend: "100만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
    ],
    detail: {
      features: ["LG전자 구독 이용시, 월 최대 20,000원 청구할인 혜택"],
      showAnnualFeeInDetail: true,
      tableTitle: "할인 혜택",
      tableStyle: "basic",
      tableRows: [
        { minSpend: "무실적 기간 (카드 사용등록월)", directDiscount: "8,000원", total: "8,000원" },
        { minSpend: "30만 원 이상", directDiscount: "8,000원", total: "8,000원" },
        { minSpend: "100만 원 이상", directDiscount: "20,000원", total: "20,000원" },
      ],
      tableNotes: [
        "- 전월 실적 제외항목 : 무이자할부, 장/단기카드대출(카드론,현금서비스), 제세공과금, 국세, 지방세, 관세, 과태료, 건강보험, 국민연금, 고용보험, 장애인 고용부담금, 아파트관리비, 대학교(대학원)등록금, 이자, 기프트/선불카드(전자지급수단포함) 구매 및 충전금액, 상품권(모바일상품권) 구매, 거래 취소 건, 연회비, 제수수료(SMS수수료, 할부수수료, 단기카드대출(현금서비스 수수료), 해외사용 수수료 등)",
        "- 해당 카드는 발급 후 납부 정보를 해당 카드로 직접 등록/변경해야 청구할인 혜택을 받을 수 있습니다. (마이페이지 >구독 관리>계약 현황)",
      ],
      excludedItems: [],
    },
    notes: [
      "카드 혜택 등 관련 문의사항은 전북은행 고객센터(1588-4477)로 문의하시기 바랍니다.",
      "LG전자는 전북은행카드의 신용카드 모집 업무를 대리·중개합니다.",
    ],
  },
  {
    id: "gwangju",
    company: "광주카드",
    fullName: "[광주] 베스트케어",
    minSpend: "100만원 이상",
    maxDiscount: "20,000원",
    image: "/images/card/광주카드.jpg",
    annualFee: { domestic: "14,000원", overseas: "15,000원", overseasLabel: "Mastercard" },
    tiers: [
      { spend: "30만원 이상 사용 시", discount: "월 최대 8,000원 할인" },
      { spend: "100만원 이상 사용 시", discount: "월 최대 20,000원 할인" },
    ],
    detail: {
      features: ["LG전자 구독 이용시, 월 최대 20,000원 청구할인 혜택"],
      showAnnualFeeInDetail: true,
      tableTitle: "할인 혜택",
      tableStyle: "basic",
      tableRows: [
        { minSpend: "무실적 기간 (카드 사용등록월)", directDiscount: "8,000원", total: "8,000원" },
        { minSpend: "30만 원 이상", directDiscount: "8,000원", total: "8,000원" },
        { minSpend: "100만 원 이상", directDiscount: "20,000원", total: "20,000원" },
      ],
      tableNotes: [
        "- 전월 실적 제외항목 : 무이자할부, 장/단기카드대출(카드론,현금서비스), 제세공과금, 국세, 지방세, 관세, 과태료, 건강보험, 국민연금, 고용보험, 장애인 고용부담금, 아파트관리비, 대학교(대학원)등록금, 이자, 기프트/선불카드(전자지급수단포함) 구매 및 충전금액, 상품권(모바일상품권) 구매, 거래 취소 건, 연회비, 제수수료(SMS수수료, 할부수수료, 단기카드대출(현금서비스 수수료), 해외사용 수수료 등)",
        "- 해당 카드는 발급 후 납부 정보를 해당 카드로 직접 등록/변경해야 청구할인 혜택을 받을 수 있습니다. (마이페이지 >구독 관리>계약 현황)",
      ],
      excludedItems: [],
    },
    notes: [
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
  return <Image src={card.image} alt={card.company} width={isLg ? 200 : 90} height={isLg ? 320 : 144} className={`rounded-xl shadow-md ${isLg ? "w-28 sm:w-36 md:w-50" : "w-22.5"}`} style={{ height: "auto" }} />;
}

export default function CardTab() {
  const [activeId, setActiveId] = useState(cards[0].id);
  const [detailOpen, setDetailOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const active = cards.find((c) => c.id === activeId)!;

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5">
        {/* Header */}
        <div className="mb-6 text-center md:mb-10">
          <p className="mb-2 text-[11px] font-medium text-[#c90f45] sm:text-[13px]">제휴 카드 혜택도 있나요?</p>
          <h2 className="mb-3 text-[20px] font-black leading-[1.35] tracking-tighter text-[#1a1a1a] sm:text-[26px] md:text-[32px]">
            다양한 제휴카드로 월 구독료 할인을
            <br />
            받을 수 있습니다
          </h2>
          <p className="text-[12px] leading-[1.7] text-[#c90f45] sm:text-[13px] md:text-[14px]">전월 실적에 따라 월 1회 할인이 적용되며, 다른 가전 추가 구독 시 다른 카드사의 제휴카드를 이용해야만 할인이 적용됩니다.</p>
        </div>

        {/* Card Tab Selector */}
        <div className="mb-10 overflow-x-auto w-full">
          <div className="flex gap-3 pb-2 bg-white justify-between" style={{ minWidth: "max-content" }}>
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
                  className="flex flex-col items-center   gap-2"
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
          <div className="p-4 sm:p-6 md:p-8">
            <h3 className="mb-5 text-[16px] font-black tracking-[-0.04em] text-[#1a1a1a] sm:text-[19px] md:mb-8 md:text-[22px]">{active.fullName}</h3>
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-10 md:gap-20">
              {/* Left: card image */}
              <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:items-center sm:gap-3">
                <CardVisual card={active} size="lg" />
              </div>

              {/* Right: tiers */}
              <div className="flex flex-1 flex-col gap-3">
                {active.benefitPeriod && (
                  <div className="flex gap-4 rounded-xl bg-[#fafafa] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[20px]">📅</div>
                    <div>
                      <p className="text-[13px] text-[#666]">혜택 기간</p>
                      <p className="text-[16px] font-black text-[#1a1a1a]">{active.benefitPeriod}</p>
                    </div>
                  </div>
                )}
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
                          / {active.annualFee.overseasLabel ?? "해외겸용"} : {active.annualFee.overseas}
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
            <div className="border-t border-[#e8e8e8] px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
              {/* Info rows */}
              <div className="mb-6 space-y-2">
                {active.detail.features && active.detail.features.length > 0 && (
                  <div className="flex gap-2 text-[14px]">
                    <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">특장점</span>
                    <div className="text-[#555]">
                      {active.detail.features.map((f, i) => <p key={i}>· {f}</p>)}
                    </div>
                  </div>
                )}
                {active.detail.targetCard && (
                  <div className="flex gap-2 text-[14px]">
                    <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">대상카드</span>
                    <span className="text-[#555]">· {active.detail.targetCard}</span>
                  </div>
                )}
                {active.detail.period && (
                  <div className="flex gap-2 text-[14px]">
                    <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">기간</span>
                    <span className="text-[#555]">· {active.detail.period}</span>
                  </div>
                )}
                {active.detail.benefit && (
                  <div className="flex gap-2 text-[14px]">
                    <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">혜택</span>
                    <span className="text-[#555]">· {active.detail.benefit}</span>
                  </div>
                )}
                {active.detail.showAnnualFeeInDetail && (
                  <div className="flex gap-2 text-[14px]">
                    <span className="w-16 shrink-0 font-bold text-[#1a1a1a]">연회비</span>
                    <div className="text-[#555]">
                      <p>· 국내전용 : {active.annualFee.domestic}</p>
                      {active.annualFee.overseas && (
                        <p>
                          · {active.annualFee.overseasLabel ?? "해외겸용"} : {active.annualFee.overseas}
                          {active.annualFee.brand && ` (${active.annualFee.brand})`}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Benefit table */}
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  {active.detail.tableStyle === "basic" ? (
                    <>
                      <thead>
                        {active.detail.tableTitle && (
                          <tr className="bg-[#e8e8e8]">
                            <th colSpan={2} className="whitespace-pre-line border border-[#ddd] px-3 py-2 text-center font-bold">
                              {active.detail.tableTitle}
                            </th>
                          </tr>
                        )}
                        <tr className="bg-[#f0f0f0]">
                          <th className="border border-[#ddd] px-3 py-2 text-center font-bold">전월 실적(1일~말일)</th>
                          <th className="border border-[#ddd] px-3 py-2 text-center font-bold">기본 서비스</th>
                        </tr>
                      </thead>
                      <tbody>
                        {active.detail.tableRows.map((row, i) => (
                          <tr key={i} className="even:bg-[#fafafa]">
                            <td className="border border-[#ddd] px-3 py-3 text-center">{row.minSpend}</td>
                            <td className="border border-[#ddd] px-3 py-3 text-center font-bold">{row.directDiscount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  ) : active.detail.tableStyle === "simple" ? (
                    <>
                      <thead>
                        {active.detail.tableTitle && (
                          <tr className="bg-[#e8e8e8]">
                            <th colSpan={5} className="whitespace-pre-line border border-[#ddd] px-3 py-2 text-center font-bold">
                              {active.detail.tableTitle}
                            </th>
                          </tr>
                        )}
                        <tr className="bg-[#f0f0f0]">
                          <th className="border border-[#ddd] px-3 py-2 text-center font-bold">
                            전월 실적
                            <br />
                            (1일~말일)
                          </th>
                          <th className="border border-[#ddd] px-3 py-2 text-center font-bold">기본 서비스</th>
                          <th className="border border-[#ddd] px-3 py-2 text-center font-bold">
                            프로모션 혜택
                            <br />
                            {active.detail.promoMonthsLabel ?? "(72개월)"}
                          </th>
                          <th className="border border-[#ddd] px-3 py-2 text-center font-bold">혜택 합계</th>
                          <th className="border border-[#ddd] px-3 py-2 text-center font-bold">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        {active.detail.tableRows.map((row, i) => (
                          <tr key={i} className="even:bg-[#fafafa]">
                            <td className="border border-[#ddd] px-3 py-3 text-center">{row.minSpend}</td>
                            <td className="border border-[#ddd] px-3 py-3 text-center">{row.directDiscount}</td>
                            <td className="border border-[#ddd] px-3 py-3 text-center">{row.promoDiscount ?? "-"}</td>
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
                    </>
                  ) : (
                    <>
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
                            <td className="border border-[#ddd] px-3 py-3 text-center">{row.promoDiscount ?? "-"}</td>
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
                    </>
                  )}
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
            <div className="border-t border-[#e8e8e8] px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
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
