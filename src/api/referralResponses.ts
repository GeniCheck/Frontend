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

// 게시물 목록(GET /referral/posts) 응답도 정확한 필드명이 문서로 확인되지
// 않았다. 작성 요청 DTO(employeeId/title/recommendationReason/...)와, 같은
// 백엔드의 다른 목록 API들(question-templates, employees)이 공통으로 쓰는
// `{ items, page, size, totalElements }` 페이지네이션 모양을 근거로 추정했다.
// 익명 게시물은 "익명은 이름 마스킹"이라는 설명대로 서버가 이미 마스킹된
// employeeName을 내려준다고 가정한다.
export interface ReferralPostListItem {
  postId: string;
  employeeName: string;
  position: string;
  companyName: string;
  title: string;
  recommendationReason: string;
  publishedAt?: string;
  expiresAt?: string;
}

export interface ReferralPostListResponse {
  items: ReferralPostListItem[];
  page: number;
  size: number;
  totalElements: number;
}
