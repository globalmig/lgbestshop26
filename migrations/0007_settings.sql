CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('footer_company', '우주전자 전자랜드지점'),
  ('footer_ceo', '김진웅'),
  ('footer_reg_no', '106-85-38456'),
  ('footer_address', '서울특별시 용산구 청파로 74 용산전자랜드'),
  ('footer_copyright', '© 2025 LG Electronics Inc. All rights reserved.'),
  ('consult_badge', '주주 상담'),
  ('consult_title', '지금 바로 상담을 신청하세요'),
  ('consult_desc', '전담 매니저가 빠르게 연락드립니다. 방문 없이 집에서 편리하게.'),
  ('consult_btn', '지금 바로 상담 예약'),
  ('consult_href', '/consult');
