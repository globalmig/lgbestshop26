"use client";

import { useState, useRef } from "react";

const PRIVACY_CONTENT = `1. 수집하는 개인정보 항목
· 필수항목: 이름, 연락처(휴대폰 번호)
· 선택항목: 배송 지역, 거주 아파트명, 구매 희망 제품 모델명

2. 개인정보 수집 및 이용 목적
· 상담 신청 접수 및 예약 확인
· 담당 매니저 배정 및 상담 진행
· 견적 안내 및 구매 정보 제공

3. 개인정보 보유 및 이용 기간
상담 완료 후 3개월간 보유 후 즉시 파기합니다.

4. 개인정보의 제3자 제공
원칙적으로 외부에 제공하지 않습니다.
단, 법령의 규정에 의거하거나 수사 목적으로 기관의 요청이 있는 경우는 예외로 합니다.

5. 개인정보 파기
보유 기간이 경과한 개인정보는 복구 불가능한 방법으로 즉시 파기합니다.`;

const estimateChannels = [
  "LG베스트샵 타지점",
  "이마트(일렉트로마트)/홈플러스",
  "하이마트/전자랜드",
  "온라인",
  "삼성스토어",
];

export default function ConsultForm() {
  const [submitted, setSubmitted] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [purposeEtc, setPurposeEtc] = useState("");
  const [apartment, setApartment] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleChannel = (ch: string) => {
    setChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 최대 10MB까지 가능합니다.");
      e.target.value = "";
      return;
    }
    setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf3f5] text-3xl">✓</div>
        <h2 className="mb-3 text-[24px] font-black tracking-tighter text-[#1a1a1a]">상담 신청이 완료되었습니다!</h2>
        <p className="mb-8 text-[14px] leading-relaxed text-[#888]">
          담당 매니저가 빠르게 연락드리겠습니다.<br />조금만 기다려주세요 🫡
        </p>
        <a href="/" className="flex h-11 items-center rounded-full bg-[#c90f45] px-8 text-[14px] font-bold text-white">
          홈으로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* 성함 */}
      <div>
        <label className="mb-1.5 block text-[14px] font-bold text-[#1a1a1a]">
          고객님의 성함을 입력해주세요! <span className="text-[#c90f45]">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="홍길동"
          className="h-11 w-full rounded-xl border border-[#e8e8e8] px-4 text-[14px] outline-none placeholder:text-[#bbb] focus:border-[#c90f45]"
        />
      </div>

      {/* 연락처 */}
      <div>
        <label className="mb-1 block text-[14px] font-bold text-[#1a1a1a]">
          🚀 연락처를 입력해주세요 <span className="text-[#c90f45]">*</span>
        </label>
        <p className="mb-2 text-[12px] text-[#888]">잘못 입력되지 않도록 주의해주세요! 🫡</p>
        <input
          type="tel"
          required
          placeholder="010-1234-5678 또는 01012345678"
          className="h-11 w-full rounded-xl border border-[#e8e8e8] px-4 text-[14px] outline-none placeholder:text-[#bbb] focus:border-[#c90f45]"
        />
      </div>

      {/* 구매 목적 */}
      <div>
        <label className="mb-1 block text-[14px] font-bold text-[#1a1a1a]">
          구매 목적을 선택해주세요 <span className="text-[#c90f45]">*</span>
        </label>
        <p className="mb-3 text-[12px] leading-relaxed text-[#888]">
          혼수·이사가 아닌 단품의 경우 기타를 선택 후 제품군을 입력해주세요.<br />
          예) 냉장고 600리터 / 컨버터블 / 에어컨 2in1
        </p>
        <div className="space-y-2">
          {["웨딩_결혼_혼수", "이사_입주"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e8e8e8] px-4 py-3 has-[:checked]:border-[#c90f45] has-[:checked]:bg-[#fdf3f5]">
              <input
                type="radio"
                name="purpose"
                value={opt}
                required
                checked={purpose === opt}
                onChange={() => setPurpose(opt)}
                className="accent-[#c90f45]"
              />
              <span className="text-[14px] text-[#333]">{opt.replaceAll("_", " · ")}</span>
            </label>
          ))}
          <div>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e8e8e8] px-4 py-3 has-[:checked]:border-[#c90f45] has-[:checked]:bg-[#fdf3f5]">
              <input
                type="radio"
                name="purpose"
                value="기타"
                checked={purpose === "기타"}
                onChange={() => setPurpose("기타")}
                className="accent-[#c90f45]"
              />
              <span className="text-[14px] text-[#333]">기타 (단품)</span>
            </label>
            {purpose === "기타" && (
              <input
                type="text"
                placeholder="예) 냉장고 600리터, 에어컨 2in1"
                value={purposeEtc}
                onChange={(e) => setPurposeEtc(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#e8e8e8] px-4 text-[14px] outline-none placeholder:text-[#bbb] focus:border-[#c90f45]"
              />
            )}
          </div>
        </div>
      </div>

      {/* 배송 지역 */}
      <div>
        <label className="mb-1 block text-[14px] font-bold text-[#1a1a1a]">
          배송받으실 지역을 입력해주세요 <span className="text-[#c90f45]">*</span>
        </label>
        <p className="mb-2 text-[12px] text-[#888]">시, 구까지만 입력해주세요. 예) 서울시 용산구, 인천 계양구</p>
        <input
          type="text"
          required
          placeholder="서울시 용산구"
          className="h-11 w-full rounded-xl border border-[#e8e8e8] px-4 text-[14px] outline-none placeholder:text-[#bbb] focus:border-[#c90f45]"
        />
      </div>

      {/* 아파트 거주 여부 */}
      <div>
        <label className="mb-3 block text-[14px] font-bold text-[#1a1a1a]">
          아파트에 거주하고 계신가요? <span className="text-[#c90f45]">*</span>
        </label>
        <div className="space-y-2">
          {["네", "아니요"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e8e8e8] px-4 py-3 has-[:checked]:border-[#c90f45] has-[:checked]:bg-[#fdf3f5]">
              <input
                type="radio"
                name="apartment"
                value={opt}
                checked={apartment === opt}
                onChange={() => setApartment(opt)}
                className="accent-[#c90f45]"
              />
              <span className="text-[14px] text-[#333]">
                {opt === "네" ? "네! (아파트명을 아래에 입력해주세요)" : "아니요"}
              </span>
            </label>
          ))}
          {apartment === "네" && (
            <input
              type="text"
              required
              placeholder="아파트명을 입력해주세요"
              value={apartmentName}
              onChange={(e) => setApartmentName(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#e8e8e8] px-4 text-[14px] outline-none placeholder:text-[#bbb] focus:border-[#c90f45]"
            />
          )}
        </div>
      </div>

      {/* 견적 채널 */}
      <div>
        <label className="mb-3 block text-[14px] font-bold text-[#1a1a1a]">견적을 받아보신 채널을 선택해주세요</label>
        <div className="space-y-2">
          {estimateChannels.map((ch) => (
            <label key={ch} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e8e8e8] px-4 py-3 has-[:checked]:border-[#c90f45] has-[:checked]:bg-[#fdf3f5]">
              <input
                type="checkbox"
                checked={channels.includes(ch)}
                onChange={() => toggleChannel(ch)}
                className="accent-[#c90f45]"
              />
              <span className="text-[14px] text-[#333]">{ch}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 제품 모델명 */}
      <div>
        <label className="mb-1 block text-[14px] font-bold text-[#1a1a1a]">
          🚀 상담받으실 제품 모델명을 입력해주세요
        </label>
        <p className="mb-2 text-[12px] text-[#888]">모델명을 알고 계시면 더 빠른 상담이 가능합니다!</p>
        <textarea
          rows={3}
          placeholder="예) LG 오브제컬렉션 냉장고 M874 / LMWS27596S"
          className="w-full resize-none rounded-xl border border-[#e8e8e8] px-4 py-3 text-[14px] outline-none placeholder:text-[#bbb] focus:border-[#c90f45]"
        />
      </div>

      {/* 파일 업로드 */}
      <div>
        <label className="mb-1 block text-[14px] font-bold text-[#1a1a1a]">타사 견적서 업로드 (선택)</label>
        <p className="mb-3 text-[12px] text-[#888]">이미지 파일 1개 / 최대 10MB</p>
        <div
          onClick={() => fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e8e8e8] py-8 text-center transition-colors hover:border-[#c90f45]"
        >
          <span className="mb-2 text-2xl">📎</span>
          {fileName ? (
            <p className="text-[13px] font-medium text-[#c90f45]">{fileName}</p>
          ) : (
            <>
              <p className="text-[13px] font-medium text-[#555]">파일을 클릭하여 업로드하세요</p>
              <p className="text-[11px] text-[#aaa]">최대 10MB</p>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {/* 개인정보 동의 */}
      <div
        onClick={(e) => { if ((e.target as HTMLElement).tagName !== "BUTTON") setAgreed((v) => !v); }}
        className={`cursor-pointer rounded-xl border p-4 transition-colors ${agreed ? "border-[#c90f45] bg-[#fdf3f5]" : "border-[#e8e8e8]"}`}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-bold text-[#1a1a1a]">개인정보 수집 및 이용 동의 <span className="text-[#c90f45]">*</span></p>
          <button
            type="button"
            onClick={() => setPrivacyOpen(true)}
            className="text-[12px] text-[#c90f45] underline underline-offset-2"
          >
            전문 보기
          </button>
        </div>
        <p className="mb-3 text-[12px] leading-relaxed text-[#888]">
          수집 항목: 이름, 연락처 · 수집 목적: 상담 신청 및 예약 확인 · 보유 기간: 상담 완료 후 3개월
        </p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={() => {}}
            className="accent-[#c90f45]"
          />
          <span className="text-[13px] text-[#555]">개인정보 수집 및 이용에 동의합니다</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!agreed}
        className="flex h-13 w-full items-center justify-center rounded-full bg-[#c90f45] text-[15px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        상담 신청하기 🚀
      </button>

      {/* 개인정보 모달 */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPrivacyOpen(false)} />
          <div className="relative z-10 flex max-h-[80vh] w-full max-w-150 flex-col rounded-t-2xl bg-white sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-[#f1f1f1] px-6 py-4">
              <h2 className="text-[16px] font-black tracking-tighter text-[#1a1a1a]">개인정보 수집 및 이용 동의</h2>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[18px] text-[#888] hover:bg-[#f5f5f5]"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5">
              <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-[#555]">
                {PRIVACY_CONTENT}
              </pre>
            </div>
            <div className="border-t border-[#f1f1f1] px-6 py-4">
              <button
                type="button"
                onClick={() => { setAgreed(true); setPrivacyOpen(false); }}
                className="flex h-11 w-full items-center justify-center rounded-full bg-[#c90f45] text-[14px] font-bold text-white"
              >
                동의하고 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
