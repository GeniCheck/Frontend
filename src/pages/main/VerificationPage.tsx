import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useEmployeeControllerCreate,
  useEmployeeControllerList,
} from "@/api/generated/endpoints/employee/employee";
import AddEmployeeModal, {
  type NewEmployeeInput,
} from "@/components/common/AddEmployeeModal";
import EmployeeDetailModal, {
  type Employee,
} from "@/components/common/EmployeeDetailModal";

// 재직 상태(employmentStatus) 실제 enum: EMPLOYED | RESIGNED
const EMPLOYMENT_STATUS_LABEL: Record<string, string> = {
  EMPLOYED: "재직중",
  RESIGNED: "퇴사",
};

// 자기선언 상태(declarationStatus) 실제 enum: NOT_SENT | SENT | SUBMITTED
const DECLARATION_STATUS_LABEL: Record<string, string> = {
  NOT_SENT: "미발송",
  SENT: "미완료",
  SUBMITTED: "완료",
};

// 목록 응답에서 직원 한 명을 표현할 것으로 예상되는 필드.
// 스웨거에 응답 스키마가 없어(void) 실제 키 이름을 100% 확정할 수 없으므로
// 자주 쓰이는 후보 키들을 모두 받아줄 수 있게 선택적으로 둔다.
interface RawEmployee {
  employeeId?: string;
  id?: string;
  name?: string;
  email?: string;
  department?: string;
  position?: string;
  phone?: string;
  employmentStartDate?: string;
  resignedAt?: string;
  employmentStatus?: string;
  status?: string;
  declarationStatus?: string;
}

// 목록 응답이 배열 그대로 올 수도, { items / data / employees / list / results }로
// 감싸져 올 수도 있어 어떤 형태든 배열만 뽑아낸다.
const extractEmployeeArray = (data: unknown): RawEmployee[] => {
  if (Array.isArray(data)) return data as RawEmployee[];
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    for (const key of ["items", "data", "employees", "list", "results"]) {
      const value = record[key];
      if (Array.isArray(value)) return value as RawEmployee[];
    }
  }
  return [];
};

const mapRawEmployee = (raw: RawEmployee): Employee => {
  const employmentStatus = raw.employmentStatus ?? raw.status ?? "EMPLOYED";
  const declarationStatus = raw.declarationStatus ?? "NOT_SENT";
  const status = EMPLOYMENT_STATUS_LABEL[employmentStatus] ?? employmentStatus;
  const declare =
    DECLARATION_STATUS_LABEL[declarationStatus] ?? declarationStatus;

  return {
    id: raw.employeeId ?? raw.id ?? crypto.randomUUID(),
    name: raw.name ?? "",
    department: raw.department ?? "",
    position: raw.position ?? "",
    status,
    declare,
    // 목록 조회에는 리포트 열람 상태가 내려오지 않아 기본값으로 둔다 (상세 조회에서 갱신).
    evaluationStatus: "NOT_OPENED",
    hrScore: "—",
    due: null,
    action:
      employmentStatus === "RESIGNED"
        ? "검증 입력"
        : declare === "완료"
          ? "완료"
          : "발송",
    email: raw.email,
    phone: raw.phone,
    employmentStartDate: raw.employmentStartDate,
    resignedAt: raw.resignedAt,
  };
};

const VerificationPage: React.FC = () => {
  const {
    data: employeeListData,
    isPending: isListPending,
    isError: isListError,
    refetch: refetchEmployeeList,
  } = useEmployeeControllerList({ size: 100 });

  const loadKey = isListPending ? "pending" : isListError ? "error" : "ready";
  const initialEmployees = isListPending
    ? []
    : extractEmployeeArray(employeeListData).map(mapRawEmployee);

  return (
    <VerificationPageBody
      key={loadKey}
      initialEmployees={initialEmployees}
      isLoading={isListPending}
      isError={isListError}
      onRetryList={refetchEmployeeList}
    />
  );
};

interface VerificationPageBodyProps {
  initialEmployees: Employee[];
  isLoading: boolean;
  isError: boolean;
  onRetryList: () => void;
}

const VerificationPageBody: React.FC<VerificationPageBodyProps> = ({
  initialEmployees,
  isLoading,
  isError,
  onRetryList,
}) => {
  const navigate = useNavigate();
  const { mutateAsync: createEmployeeMutation } = useEmployeeControllerCreate();

  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );

  const [employeeList, setEmployeeList] =
    useState<Employee[]>(initialEmployees);

  const selectedEmployee =
    employeeList.find((emp) => emp.id === selectedEmployeeId) ?? null;

  const handleAddEmployee = async (input: NewEmployeeInput) => {
    await createEmployeeMutation({ data: input });

    // 목록 재조회 대신, 등록 성공 후 화면에 바로 한 줄을 더해 보여준다.
    setEmployeeList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: input.name,
        department: input.department,
        position: input.position,
        status: "재직중",
        declare: "미발송",
        evaluationStatus: "NOT_OPENED",
        hrScore: "—",
        due: null,
        action: "발송",
        email: input.email,
        phone: input.phone,
        employmentStartDate: input.employmentStartDate,
      },
    ]);
  };

  const handleUpdateEmployee = (
    id: string,
    updates: { department: string; position: string; phone: string },
  ) => {
    setEmployeeList((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp)),
    );
  };

  const handleResignEmployee = (id: string, resignedAt: string) => {
    setEmployeeList((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? { ...emp, status: "퇴사", resignedAt, action: "검증 입력" }
          : emp,
      ),
    );
  };

  // 통계 카드: 별도 요약 API가 아직 없어 현재 불러온 목록에서 계산 가능한 값만 반영한다.
  const totalCount = employeeList.length;
  const employedCount = employeeList.filter(
    (emp) => emp.status === "재직중",
  ).length;
  const completedCount = employeeList.filter(
    (emp) => emp.declare === "완료",
  ).length;
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const pendingVerificationCount = employeeList.filter(
    (emp) => emp.action === "검증 입력",
  ).length;
  const resignedCount = employeeList.filter(
    (emp) => emp.status === "퇴사",
  ).length;
  const now = new Date();
  const resignedThisMonthCount = employeeList.filter((emp) => {
    if (emp.status !== "퇴사" || !emp.resignedAt) return false;
    const resignedDate = new Date(emp.resignedAt);
    return (
      resignedDate.getFullYear() === now.getFullYear() &&
      resignedDate.getMonth() === now.getMonth()
    );
  }).length;

  const statCards = [
    {
      label: "총 재직 직원",
      value: String(employedCount),
      desc: `전체 ${totalCount}명 중`,
      icon: "ti-users text-brand",
    },
    {
      label: "선언 완료",
      value: String(completedCount),
      desc: `완료율 ${completionRate}%`,
      icon: "ti-checks text-emerald-500",
    },
    {
      label: "검증 대기",
      value: String(pendingVerificationCount),
      desc: "⏳ 골든타임",
      icon: "ti-hourglass text-amber-500",
    },
    {
      label: "이번 달 퇴사",
      value: String(resignedThisMonthCount),
      desc: `총 퇴사 ${resignedCount}명`,
      icon: "ti-logout text-purple-500",
    },
  ];

  return (
    <>
      <main className="flex min-h-screen flex-1 flex-col">
        {/* 상단 헤더: 타이틀 · 서브타이틀만 노출 (액션 버튼은 하단 툴바로 이동) */}
        <header className="sticky top-0 z-40 flex h-17 items-center border-b border-gray-200 bg-white px-6">
          <div className="flex items-baseline gap-3 text-left">
            <h1 className="text-text1 text-base font-black tracking-tight">
              Verification
            </h1>
            <span className="text-xs font-semibold text-gray-400">
              직원 자기선언 & 검증 관리
            </span>
          </div>
        </header>

        {/* 내부 실시간 데이터 대시보드 그리드 */}
        <div className="mx-auto w-full max-w-300 flex-1 space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statCards.map((card, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm"
              >
                <div>
                  <span className="text-2xs block font-bold tracking-wider text-gray-400 uppercase">
                    {card.label}
                  </span>
                  <div className="text-text1 mt-1 text-2xl font-black">
                    {card.value}
                  </div>
                  <span className="text-2xs mt-0.5 block text-gray-400">
                    {card.desc}
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-xl">
                  <i className={`ti ${card.icon}`} />
                </div>
              </div>
            ))}
          </div>

          {/* 액션 툴바: 보조 버튼(좌) · 주요 버튼(우) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                to="question-template"
                className="text-text2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
              >
                질문 템플릿 생성
              </Link>
              <button className="text-text2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95">
                평가 링크 발송
              </button>
            </div>
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="bg-brand shadow-brand/10 hover:bg-brand-dark flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
            >
              직원 추가
            </button>
          </div>

          {/* 직원 목록 테이블 (전체 폭 단일 컬럼) */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <span className="text-2xs font-bold text-gray-400">
                  불러오는 중...
                </span>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <p className="text-xs font-bold text-red-500">
                  직원 목록을 불러오지 못했어요.
                </p>
                <button
                  type="button"
                  onClick={onRetryList}
                  className="text-brand text-xs font-bold hover:opacity-80"
                >
                  다시 시도
                </button>
              </div>
            ) : employeeList.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-2xl text-gray-300">
                  <i className="ti ti-users" />
                </div>
                <div>
                  <p className="text-text1 text-sm font-bold">
                    등록된 직원이 없습니다
                  </p>
                  <p className="text-2xs mt-1 text-gray-400">
                    &quot;직원 추가&quot; 버튼을 눌러 첫 번째 직원을 등록해
                    보세요.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(true)}
                  className="bg-brand shadow-brand/10 hover:bg-brand-dark mt-1 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
                >
                  직원 추가
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="text-2xs border-b border-gray-100 font-bold tracking-wider text-gray-400 uppercase">
                      <th className="pb-3 font-semibold">직원명</th>
                      <th className="pb-3 font-semibold">부서</th>
                      <th className="pb-3 font-semibold">직급</th>
                      <th className="pb-3 font-semibold">상태</th>
                      <th className="pb-3 font-semibold">자기선언</th>
                      <th className="pb-3 font-semibold">HR 점수</th>
                      <th className="pb-3 text-right font-semibold">액션</th>
                      <th className="pb-3 text-right font-semibold">상세</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    {employeeList.map((emp) => (
                      <tr
                        key={emp.id}
                        className="transition-colors hover:bg-gray-50/50"
                      >
                        <td className="text-text1 py-3.5 font-black">
                          {emp.name}
                        </td>
                        <td className="text-text2 py-3.5">{emp.department}</td>
                        <td className="text-text2 py-3.5">{emp.position}</td>
                        <td className="py-3.5">
                          <span
                            className={`text-2xs inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                              emp.status === "퇴사"
                                ? "bg-red-50 text-red-500"
                                : emp.status === "재직중"
                                  ? "bg-emerald-50 text-emerald-500"
                                  : "bg-amber-50 text-amber-500"
                            }`}
                          >
                            <span className="h-1 w-1 rounded-full bg-current" />
                            {emp.status}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`font-bold ${emp.declare === "완료" ? "text-emerald-500" : emp.declare === "미완료" ? "text-amber-500" : "text-gray-300"}`}
                          >
                            {emp.declare === "완료" && (
                              <i className="ti ti-check text-2xs mr-0.5" />
                            )}
                            {emp.declare === "미완료" && (
                              <i className="ti ti-hourglass-low text-2xs mr-0.5" />
                            )}
                            {emp.declare}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <div className="text-text1 font-sans font-bold">
                            {emp.hrScore}
                            {emp.due && (
                              <span className="text-3xs mt-0.5 block font-normal text-red-400">
                                {emp.due}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            type="button"
                            onClick={
                              emp.action === "검증 입력"
                                ? () =>
                                    navigate(`evaluation/${emp.id}`, {
                                      state: { employee: emp },
                                    })
                                : undefined
                            }
                            className={`text-2xs rounded-lg px-3 py-1.5 font-bold shadow-xs transition-all active:scale-95 ${
                              emp.action === "검증 입력"
                                ? "bg-brand/10 text-brand hover:bg-brand/20"
                                : emp.action === "발송"
                                  ? "text-text2 border border-gray-200 hover:bg-gray-50"
                                  : "cursor-default bg-gray-100 text-gray-400"
                            }`}
                          >
                            {emp.action}
                          </button>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedEmployeeId(emp.id)}
                            className="text-text2 text-2xs rounded-lg border border-gray-200 px-3 py-1.5 font-bold shadow-xs transition-all hover:bg-gray-50 active:scale-95"
                          >
                            조회
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <AddEmployeeModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddEmployee}
      />
      <EmployeeDetailModal
        open={selectedEmployee !== null}
        employee={selectedEmployee}
        onClose={() => setSelectedEmployeeId(null)}
        onSave={handleUpdateEmployee}
        onResign={handleResignEmployee}
      />
    </>
  );
};

export default VerificationPage;
