import { useEffect, useState } from "react";
import type { DeclarationRecord } from "@/types/declaration";

// 입사 시 제출된 자기선언(질문+답변)을 흉내 낸 목업.
// useDeclarationQuestions의 질문 목록과 내용을 맞춰서, 같은 회사 목업이
// 자기선언 페이지와 자기평가 페이지에서 일관되게 보이도록 함.
// TODO: 실제로는 GET /declarations/:employeeId 로 교체.
const MOCK_RECORDS_BY_EMPLOYEE: Record<string, DeclarationRecord[]> = {
  "mock-employee-1": [
    {
      question: {
        id: "q1",
        companyId: "mock-company-1",
        question: "재직 중 가장 대표적인 성과를 구체적으로 기술해 주세요.",
        orderIndex: 0,
      },
      answerText:
        "사내 결제 시스템 리뉴얼 프로젝트를 리드하며 결제 실패율을 12%에서 3%로 낮췄습니다.",
    },
    {
      question: {
        id: "q2",
        companyId: "mock-company-1",
        question:
          "재직 중 아쉬웠던 점이나 더 성장이 필요했던 영역을 기술해 주세요.",
        orderIndex: 1,
      },
      answerText:
        "초기에는 일정 산정이 낙관적이어서 몇 차례 마감을 조정한 경험이 있습니다.",
    },
    {
      question: {
        id: "q3",
        companyId: "mock-company-1",
        question: "재직 기간 동안 조직에 기여한 바를 종합적으로 서술해 주세요.",
        orderIndex: 2,
      },
      answerText:
        "결제 시스템 리뉴얼 외에도 신입 개발자 온보딩 문서를 정비해 적응 기간을 단축했습니다.",
    },
  ],
  // VerificationPage emp-1(김민준) 자기선언 — 대표 검증화면에서 employee.id로 조회.
  "emp-1": [
    {
      question: {
        id: "emp1-q1",
        companyId: "mock-company-1",
        question: "재직 중 가장 대표적인 성과를 구체적으로 기술해 주세요.",
        orderIndex: 0,
      },
      answerText:
        "팀 내 협업 프로세스를 개선해 스프린트 지연을 줄이는 데 기여했습니다.",
    },
    {
      question: {
        id: "emp1-q2",
        companyId: "mock-company-1",
        question:
          "재직 중 아쉬웠던 점이나 더 성장이 필요했던 영역을 기술해 주세요.",
        orderIndex: 1,
      },
      answerText: "타 부서와의 요구사항 조율에 더 적극적이었으면 좋았을 것 같습니다.",
    },
  ],
};

interface UseMyDeclarationResult {
  records: DeclarationRecord[];
  isLoading: boolean;
}

// employeeId도 companyId(useDeclarationQuestions)와 마찬가지로 페이지
// 마운트 중엔 안 바뀌는 값이라, 초기 로딩 상태는 useState 초기값으로만
// 잡는다 (react-hooks/set-state-in-effect 대응).
export function useMyDeclaration(
  employeeId: string | undefined,
): UseMyDeclarationResult {
  const [records, setRecords] = useState<DeclarationRecord[]>([]);
  const [isLoading, setLoading] = useState(Boolean(employeeId));

  useEffect(() => {
    if (!employeeId) return;

    const timer = setTimeout(() => {
      const list = MOCK_RECORDS_BY_EMPLOYEE[employeeId] ?? [];
      setRecords(
        [...list].sort((a, b) => a.question.orderIndex - b.question.orderIndex),
      );
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [employeeId]);

  return { records, isLoading };
}
