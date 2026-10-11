// 직원 퇴사 등록(및 자기평가 시작) API 응답 모양.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.
export interface ResignEmployeeResponse {
  employmentId: string;
  evaluationId: string;
  employmentStatus: "RESIGNED";
  evaluationStatus: "SELF_PENDING" | "SELF_EXPIRED";
  selfEvaluationDueAt: string;
  ceoEvaluationDueAt: string;
  linkSent: boolean;
}
