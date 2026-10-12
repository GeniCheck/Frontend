import type { DeclarationItemType } from "@/api/declarationResponses";

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
