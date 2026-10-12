import type { DeclarationItemType } from "@/api/declarationResponses";

// 평가(자기평가·대표 검증) API 응답 모양.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.

// 직원이 자기선언 때 남긴 답변. type에 따라 score / text / optionId·label 중 하나가 채워진다.
export interface DeclarationAnswer {
  type: DeclarationItemType;
  score?: number;
  text?: string;
  optionId?: string;
  label?: string;
}

// 평가 항목 = 자기선언 질문 + 그 질문에 대한 직원의 자기선언 답변.
export interface EvaluationItem {
  questionId: string;
  order: number;
  question: string;
  declarationAnswer: DeclarationAnswer;
  selfScore: number | null;
}

export const formatDeclarationAnswer = (answer: DeclarationAnswer) => {
  if (answer.type === "SCORE") {
    return answer.score != null ? `${answer.score}점` : "—";
  }
  if (answer.type === "SINGLE_CHOICE") return answer.label ?? "—";
  return answer.text || "—";
};

// GET /evaluations/self/:token
export interface SelfEvaluationFormResponse {
  evaluationId: string;
  employee: {
    name: string;
    companyName: string;
    position?: string;
  };
  status: string;
  dueAt: string;
  scoreMin: number;
  scoreMax: number;
  items: EvaluationItem[];
}

// GET /evaluations/:evaluationId/ceo. 자기평가 조회 응답을 기준으로 추정한 모양이라
// 실제 응답 확인 후 맞춰야 한다.
export interface CeoEvaluationFormResponse {
  evaluationId: string;
  employee: {
    name: string;
    department?: string;
    position?: string;
    resignedAt?: string;
  };
  status: string;
  dueAt: string;
  scoreMin: number;
  scoreMax: number;
  items: EvaluationItem[];
}
