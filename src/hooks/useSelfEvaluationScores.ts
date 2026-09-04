import { useEffect, useState } from "react";
import type { ScoreValue } from "@/types/declaration";

// TODO: 실제로는 GET /evaluation/:employeeId/result 로 교체.
const MOCK_SCORES_BY_EMPLOYEE: Record<string, Record<string, ScoreValue>> = {
  "mock-employee-1": { q1: 8, q2: 6, q3: 9 },
};

interface UseSelfEvaluationScoresResult {
  scores: Record<string, ScoreValue>;
  isLoading: boolean;
}

export function useSelfEvaluationScores(
  employeeId: string | undefined,
): UseSelfEvaluationScoresResult {
  const [scores, setScores] = useState<Record<string, ScoreValue>>({});
  const [isLoading, setLoading] = useState(Boolean(employeeId));

  useEffect(() => {
    if (!employeeId) return;

    const timer = setTimeout(() => {
      setScores(MOCK_SCORES_BY_EMPLOYEE[employeeId] ?? {});
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [employeeId]);

  return { scores, isLoading };
}
