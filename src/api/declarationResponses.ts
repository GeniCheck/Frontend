// 직원 자기선언 조회 API 응답 모양.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.
export type DeclarationItemType = "SCORE" | "SINGLE_CHOICE" | "TEXT";
export type DeclarationStatus = "SUBMITTED" | "EXPIRED";

export interface DeclarationAnswerOption {
  optionId: string;
  label: string;
}

export interface DeclarationItem {
  questionId: string;
  type: DeclarationItemType;
  question: string;
  answerScore?: number;
  answerOption?: DeclarationAnswerOption;
  answerText?: string;
  evaluationEnabled: boolean;
}

export interface DeclarationConsents {
  evaluationAgreed: boolean;
  dataAccessAgreed: boolean;
  evidenceRetentionAgreed: boolean;
  consentVersion: string;
  agreedAt: string;
}

export interface Declaration {
  declarationId: string;
  templateId: string;
  templateName: string;
  templateVersion: number;
  status: DeclarationStatus;
  submittedAt: string;
  items: DeclarationItem[];
  consents: DeclarationConsents;
}

export interface EmployeeDeclarationsResponse {
  employeeId: string;
  declarations: Declaration[];
}

// GET /declarations/forms/:token 응답. 스웨거에 스키마가 없어 실제 응답 기준으로 작성.
export interface DeclarationFormOption {
  optionId: string;
  label: string;
}

export interface DeclarationFormQuestion {
  questionId: string;
  order: number;
  type: DeclarationItemType;
  text: string;
  required: boolean;
  scoreMin?: number;
  scoreMax?: number;
  options?: DeclarationFormOption[];
  maxLength?: number;
  evaluationEnabled: boolean;
}

export type DeclarationRequiredConsent =
  "EVALUATION" | "DATA_ACCESS" | "EVIDENCE_RETENTION";

export interface DeclarationFormResponse {
  declarationId: string;
  templateName: string;
  templateVersion: number;
  employee: {
    name: string;
    companyName: string;
    position?: string;
  };
  status: string;
  expiresAt: string;
  questions: DeclarationFormQuestion[];
  requiredConsents: DeclarationRequiredConsent[];
  consentVersion: string;
}
