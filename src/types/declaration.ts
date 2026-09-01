// 자기선언(기능명세서 2장) 도메인 공통 타입.
// 퇴사 시 자기평가 페이지(3장)에서도 같은 "선언 항목" 단위를 그대로 재사용한다.

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
