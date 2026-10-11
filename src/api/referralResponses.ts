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
