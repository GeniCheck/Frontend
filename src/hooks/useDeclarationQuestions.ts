import { useEffect, useState } from "react";
import type { DeclarationQuestion } from "@/types/declaration";

// QuestionTemplatePage(자기선언 질문 설계)의 "서술형" 목업 문항과 동일한
// 내용으로 맞춘 목업. TODO: 실제로는 GET /declarations/questions/:companyId 로 교체.
const MOCK_QUESTIONS_BY_COMPANY: Record<string, DeclarationQuestion[]> = {
  "mock-company-1": [
    {
      id: "q1",
      companyId: "mock-company-1",
      question: "재직 중 가장 대표적인 성과를 구체적으로 기술해 주세요.",
      orderIndex: 0,
    },
    {
      id: "q2",
      companyId: "mock-company-1",
      question:
        "재직 중 아쉬웠던 점이나 더 성장이 필요했던 영역을 기술해 주세요.",
      orderIndex: 1,
    },
    {
      id: "q3",
      companyId: "mock-company-1",
      question: "재직 기간 동안 조직에 기여한 바를 종합적으로 서술해 주세요.",
      orderIndex: 2,
    },
  ],
};

interface UseDeclarationQuestionsResult {
  questions: DeclarationQuestion[];
  isLoading: boolean;
}

// companyId도 useTokenValidation의 token과 마찬가지로 페이지 마운트 중엔
// 바뀌지 않는 값이라, 초기 로딩 상태는 useState 초기값으로만 잡는다
// (react-hooks/set-state-in-effect 대응).
export function useDeclarationQuestions(
  companyId: string | undefined,
): UseDeclarationQuestionsResult {
  const [questions, setQuestions] = useState<DeclarationQuestion[]>([]);
  const [isLoading, setLoading] = useState(Boolean(companyId));

  useEffect(() => {
    if (!companyId) return;

    const timer = setTimeout(() => {
      const list = MOCK_QUESTIONS_BY_COMPANY[companyId] ?? [];
      setQuestions([...list].sort((a, b) => a.orderIndex - b.orderIndex));
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [companyId]);

  return { questions, isLoading };
}
