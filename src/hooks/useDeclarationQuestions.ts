import { useEffect, useState } from "react";
import type { DeclarationQuestion } from "@/types/declaration";

// QuestionTemplatePage에서 대표가 만든 질문 리스트를 흉내 낸 목업.
// TODO: 실제로는 GET /declarations/questions/:companyId 로 교체.
const MOCK_QUESTIONS_BY_COMPANY: Record<string, DeclarationQuestion[]> = {
  "mock-company-1": [
    {
      id: "q1",
      companyId: "mock-company-1",
      question:
        "입사 후 가장 크게 기여했다고 생각하는 프로젝트와 본인의 역할을 설명해주세요.",
      orderIndex: 0,
    },
    {
      id: "q2",
      companyId: "mock-company-1",
      question: "팀 내 협업 과정에서 겪었던 어려움과 해결 방식을 설명해주세요.",
      orderIndex: 1,
    },
    {
      id: "q3",
      companyId: "mock-company-1",
      question: "본인의 강점과 약점을 각각 한 가지씩 서술해주세요.",
      orderIndex: 2,
    },
  ],
};

interface UseDeclarationQuestionsResult {
  questions: DeclarationQuestion[];
  isLoading: boolean;
}

export function useDeclarationQuestions(
  companyId: string | undefined,
): UseDeclarationQuestionsResult {
  const [questions, setQuestions] = useState<DeclarationQuestion[]>([]);
  const [isLoading, setLoading] = useState(Boolean(companyId));

  useEffect(() => {
    if (!companyId) {
      setQuestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const list = MOCK_QUESTIONS_BY_COMPANY[companyId] ?? [];
      setQuestions([...list].sort((a, b) => a.orderIndex - b.orderIndex));
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [companyId]);

  return { questions, isLoading };
}
