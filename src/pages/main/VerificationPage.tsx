import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddEmployeeModal, {
  type NewEmployeeInput,
} from "@/components/common/AddEmployeeModal";
import EmployeeDetailModal, {
  type Employee,
} from "@/components/common/EmployeeDetailModal";

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();

  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );

  const [employeeList, setEmployeeList] = useState<Employee[]>([
    {
      id: "emp-1",
      name: "김민준",
      department: "개발팀",
      position: "과장",
      status: "퇴사",
      declare: "완료",
      evaluationStatus: "NOT_OPENED",
      hrScore: "—",
      due: "D-3 마감",
      action: "검증 입력",
    },
    {
      id: "emp-2",
      name: "이서연",
      department: "마케팅팀",
      position: "대리",
      status: "퇴사",
      declare: "완료",
      evaluationStatus: "NOT_OPENED",
      hrScore: "—",
      due: "D-9 마감",
      action: "검증 입력",
    },
    {
      id: "emp-3",
      name: "박지호",
      department: "영업팀",
      position: "사원",
      status: "재직중",
      declare: "완료",
      evaluationStatus: "NOT_OPENED",
      hrScore: "82",
      due: null,
      action: "완료",
    },
    {
      id: "emp-4",
      name: "최유나",
      department: "디자인팀",
      position: "대리",
      status: "재직중",
      declare: "미완료",
      evaluationStatus: "NOT_OPENED",
      hrScore: "—",
      due: null,
      action: "발송",
    },
    {
      id: "emp-5",
      name: "강태양",
      department: "개발팀",
      position: "부장",
      status: "퇴사",
      declare: "완료",
      evaluationStatus: "NOT_OPENED",
      hrScore: "76",
      due: null,
      action: "완료",
    },
    {
      id: "emp-6",
      name: "윤하은",
      department: "HR팀",
      position: "과장",
      status: "대기중",
      declare: "미발송",
      evaluationStatus: "NOT_OPENED",
      hrScore: "—",
      due: null,
      action: "발송",
    },
  ]);

  const selectedEmployee =
    employeeList.find((emp) => emp.id === selectedEmployeeId) ?? null;

  const handleAddEmployee = (input: NewEmployeeInput) => {
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
            {[
              {
                label: "총 재직 직원",
                value: "48",
                desc: "↑ 3명 이번 달 입사",
                icon: "ti-users text-brand",
              },
              {
                label: "선언 완료",
                value: "41",
                desc: "완료율 85%",
                icon: "ti-checks text-emerald-500",
              },
              {
                label: "검증 대기",
                value: "3",
                desc: "⏳ 골든타임",
                icon: "ti-hourglass text-amber-500",
              },
              {
                label: "이번 달 퇴사",
                value: "5",
                desc: "평가 완료 2건",
                icon: "ti-logout text-purple-500",
              },
            ].map((card, i) => (
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-lg">
                  <i className={card.icon} />
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
