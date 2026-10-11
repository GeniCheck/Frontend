// 질문 템플릿 생성/목록/상세 조회 API가 공통으로 쓰는 응답 모양.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.
export type QuestionTemplateStatus = "ACTIVE" | "ARCHIVED";
export type QuestionTemplateQuestionType = "SCORE" | "SINGLE_CHOICE" | "TEXT";

export interface CreateQuestionTemplateResponse {
  templateId: string;
  version: number;
  questionCount: number;
  status: QuestionTemplateStatus;
}

// 수정 응답도 생성 응답과 모양이 같다 (templateId/version/questionCount/status).
export type UpdateQuestionTemplateResponse = CreateQuestionTemplateResponse;

export interface QuestionTemplateListItem {
  templateId: string;
  name: string;
  version: number;
  questionCount: number;
  status: QuestionTemplateStatus;
  updatedAt: string;
}

export interface QuestionTemplateListResponse {
  items: QuestionTemplateListItem[];
  page: number;
  size: number;
  totalElements: number;
}

export interface QuestionTemplateDetailQuestion {
  questionId: string;
  order: number;
  type: QuestionTemplateQuestionType;
  text: string;
  required: boolean;
  scoreMin?: number;
  scoreMax?: number;
  options?: string[];
  maxLength?: number;
  evaluationEnabled: boolean;
}

export interface QuestionTemplateDetail {
  templateId: string;
  name: string;
  version: number;
  status: QuestionTemplateStatus;
  questions: QuestionTemplateDetailQuestion[];
}
