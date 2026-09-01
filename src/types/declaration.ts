// 자기선언 도메인 공통 타입.
// 퇴사 시 자기평가 페이지에서도 같은 "선언 항목" 단위를 그대로 재사용한다.

export interface DeclarationQuestion {
  id: string;
  companyId: string;
  question: string; // 서술형 질문, 100자 이내 (2.1)
  orderIndex: number;
}

export interface DeclarationAnswerInput {
  questionId: string;
  answerText: string; // 500자 이내 (2.1)
}

// 자기선언 링크(GET /employee/link/:token) 검증 성공 시 확보되는 컨텍스트.
// companyId/employeeId가 실제로 이 응답에 포함되는지는 백엔드 확정 필요.
export interface DeclarationLinkContext {
  token: string;
  companyId: string;
  employeeId: string;
}

// 법적 사전 동의 항목. ConsentCheckboxes와 SelfDeclarePage가 공유.
export const CONSENT_ITEMS = [
  {
    id: "capability-verification",
    label:
      "퇴사 후 대표가 자기 선언에 대해 1~10점으로 검증 점수를 부여하는 것에 동의합니다.",
  },
  {
    id: "data-access",
    label:
      "검증 완료 데이터를 타 기업이 대표 승인 후 유료로 열람하는 것에 동의합니다.",
  },
] as const;

export type ConsentItemId = (typeof CONSENT_ITEMS)[number]["id"];
