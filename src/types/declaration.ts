import type { ScoreValue } from "@/components/common/ScoreSelector";

export type { ScoreValue };

// 자기선언 도메인 공통 타입.
// 퇴사 시 자기평가 페이지에서도 같은 "선언 항목" 단위를 그대로 재사용한다.

export interface DeclarationQuestion {
  id: string;
  companyId: string;
  question: string;
  orderIndex: number;
}

// 퇴사 시 자기평가 페이지에서 읽기 전용으로 보여줄, 질문 + 입사 시 본인
// 답변 묶음 한 건.
export interface DeclarationRecord {
  question: DeclarationQuestion;
  answerText: string;
}

// 자기선언 링크(GET /employee/link/:token) 검증 성공 시 확보되는 컨텍스트.
// companyId/employeeId가 실제로 이 응답에 포함되는지는 백엔드 확정 필요.
export interface DeclarationLinkContext {
  token: string;
  companyId: string;
  employeeId: string;
}

// 법적 사전 동의 항목. id는 제출 DTO(DeclarationConsentsDto)의 필드명과 같다.
export const CONSENT_ITEMS = [
  {
    id: "evaluationAgreed",
    label:
      "퇴사 후 대표가 자기 선언에 대해 1~10점으로 검증 점수를 부여하는 것에 동의합니다.",
  },
  {
    id: "dataAccessAgreed",
    label:
      "검증 완료 데이터를 타 기업이 대표 승인 후 유료로 열람하는 것에 동의합니다.",
  },
  {
    id: "evidenceRetentionAgreed",
    label:
      "자기선언 답변과 동의 기록을 검증 증빙 자료로 보관하는 것에 동의합니다.",
  },
] as const;

export type ConsentItemId = (typeof CONSENT_ITEMS)[number]["id"];
