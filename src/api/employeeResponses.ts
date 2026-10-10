// 직원 목록/상세 조회 API가 공통으로 쓰는 응답 모양과 상태값 라벨.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.
export type EmploymentStatus = "EMPLOYED" | "RESIGNED";
export type DeclarationStatus = "NOT_SENT" | "SENT" | "SUBMITTED";
export type EvaluationStatus = "NOT_OPENED" | "OPENED";

export interface EmployeeDetail {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  phone?: string;
  employmentStartDate?: string;
  resignedAt?: string;
  employmentStatus: EmploymentStatus;
  declarationStatus: DeclarationStatus;
  evaluationStatus: EvaluationStatus;
}

export const EMPLOYMENT_STATUS_LABEL: Record<EmploymentStatus, string> = {
  EMPLOYED: "재직중",
  RESIGNED: "퇴사",
};

export const DECLARATION_STATUS_LABEL: Record<DeclarationStatus, string> = {
  NOT_SENT: "미발송",
  SENT: "미완료",
  SUBMITTED: "완료",
};

export const EVALUATION_STATUS_LABEL: Record<EvaluationStatus, string> = {
  NOT_OPENED: "미공개",
  OPENED: "공개됨",
};
