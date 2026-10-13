// 인재 추천(동의 요청·이력서 업로드·게시물 작성) API 응답 모양.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.

export interface ResumeUploadUrlResponse {
  resumeFileId: string;
  uploadUrl: string;
  objectKey: string;
  expiresAt: string;
}

// 목록 응답은 상세(ReferralPostDetail)와 달리 employee가 중첩되지 않고
// 평평하며, 날짜·총 개수 필드명도 서로 다르다(expiresAt vs postExpiresAt,
// total vs totalElements) — 둘을 억지로 통일하지 않고 각자 응답 그대로 둔다.
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
