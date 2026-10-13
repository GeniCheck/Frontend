// 인재 추천(동의 요청·이력서 업로드·게시물 작성) API 응답 모양.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.

// presigned URL 발급 응답의 정확한 필드명은 문서로 확인되지 않아, 요청 DTO의
// 주석("resumeFileId: 업로드가 끝난 이력서 ID")과 presigned PUT 업로드의
// 일반적인 관례(uploadUrl + fileId)로 추정한 값이다. 실제 응답과 다르면
// ReferralPostModal.tsx의 캐스팅 지점만 고치면 된다.
export interface ResumeUploadUrlResponse {
  uploadUrl: string;
  fileId: string;
}

// 이름은 서버가 이미 마스킹해서 내려준다 — 익명이면 "이**"처럼 displayName
// 자체가 마스킹된 문자열이라, 프론트에서 별도로 또 마스킹할 필요가 없다.

// 실제 GET /referral/posts 목록 응답으로 확인된 모양(2026-10-13).
// 상세(ReferralPostDetail)와 달리 employee가 중첩되지 않고 평평하며,
// 날짜 필드명도 expiresAt(상세는 postExpiresAt), 총 개수도 total(상세
// 페이지네이션은 totalElements 추정)로 서로 다르다 — 실제 응답 기준으로 둘을
// 통일하지 않고 각자 확인된 모양 그대로 둔다.
export interface ReferralPostListItem {
  postId: string;
  title: string;
  displayName: string;
  position: string;
  companyName: string;
  publishedAt?: string;
  expiresAt?: string;
}

export interface ReferralPostListResponse {
  items: ReferralPostListItem[];
  page: number;
  size: number;
  total: number;
}

// 실제 GET /referral/posts/{postId} 응답으로 확인된 모양(2026-10-13).
export interface ReferralPostEmployee {
  displayName: string;
  position: string;
}

export interface ReferralPostDetail {
  postId: string;
  title: string;
  companyName: string;
  employee: ReferralPostEmployee;
  recommendationReason: string;
  resume: { downloadUrl: string } | null;
  publishedAt: string;
  postExpiresAt: string;
}

// 상세 응답에 displayNameMode/publishMonths가 내려오지 않아, 가진 값으로
// 현재 상태를 역산한다. 수정 폼 초기값으로만 쓰는 추정치다.
export const inferDisplayNameMode = (
  displayName: string,
): "REAL_NAME" | "ANONYMOUS" =>
  displayName.includes("*") ? "ANONYMOUS" : "REAL_NAME";

export const inferPublishMonths = (
  publishedAt: string,
  postExpiresAt: string,
): 3 | 6 => {
  const months =
    (new Date(postExpiresAt).getTime() - new Date(publishedAt).getTime()) /
    (1000 * 60 * 60 * 24 * 30);
  return months >= 4.5 ? 6 : 3;
};

export type ReferralConsentStatus =
  "PENDING" | "AGREED" | "WITHDRAWN" | "EXPIRED";

export interface ReferralConsentResponse {
  consentId: string;
  status: ReferralConsentStatus;
  purpose: string;
  employee: {
    name: string;
    position?: string;
    companyName: string;
  };
  disclosure: {
    recommendation: boolean;
    resume: boolean;
    position: boolean;
    displayNameMode: "REAL_NAME" | "ANONYMOUS";
    publishMonths: number;
    publishMonthsOptions: number[];
  };
  expiresAt: string;
  agreedAt: string | null;
}
