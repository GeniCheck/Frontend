import type { DeclarationItemType } from "@/api/declarationResponses";
import type { CompetencyScoreDtoKey } from "@/api/generated/models/competencyScoreDtoKey";

export interface DeclarationAnswer {
  type: DeclarationItemType;
  score?: number;
  text?: string;
  optionId?: string;
  label?: string;
}

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

// 자기평가 폼(EvaluationItem)과 별개 타입. 실제 응답에 order 필드가 없고,
// 대신 commonCompetencies가 함께 내려온다 — 자기평가 쪽 타입을 공유하면
// SelfEvaluationPage.tsx(직원 파트)가 의존하는 order 필드가 깨지므로 분리했다.
export interface CeoEvaluationFormItem {
  questionId: string;
  question: string;
  declarationAnswer: DeclarationAnswer;
  selfScore: number | null;
  ceoScore: number | null;
}

export interface CeoEvaluationFormCompetency {
  key: CompetencyScoreDtoKey;
  name: string;
  ceoScore: number | null;
}

export interface CeoEvaluationFormResponse {
  evaluationId: string;
  employee: {
    employeeId?: string;
    name: string;
    department?: string;
    position?: string;
    resignedAt?: string;
  };
  status: string;
  ceoEvaluationDueAt: string;
  scoreMin: number;
  scoreMax: number;
  items: CeoEvaluationFormItem[];
  commonCompetencies: CeoEvaluationFormCompetency[];
}

export interface EvaluationResultItem {
  questionId: string;
  question: string;
  selfScore: number;
  ceoScore: number;
  scoreGap: number;
}

export interface EvaluationResultCompetency {
  key: string;
  name: string;
  ceoScore: number;
}

export interface EvaluationResultResponse {
  evaluationId: string;
  employee: {
    name: string;
    companyName: string;
  };
  completedAt: string;
  items: EvaluationResultItem[];
  commonCompetencies: EvaluationResultCompetency[];
  rehireIntent: boolean;
  opinion: {
    allowed: boolean;
    submitted: boolean;
    dueAt: string;
  };
}
