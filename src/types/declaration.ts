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
