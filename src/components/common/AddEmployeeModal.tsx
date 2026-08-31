import React, { useEffect, useState } from "react";

// 직원 등록 API 요청 바디에 대응하는 입력값
export interface NewEmployeeInput {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentStartDate: string;
}

const EMPTY_FORM: NewEmployeeInput = {
  name: "",
  email: "",
  phone: "",
  department: "",
  position: "",
  employmentStartDate: "",
};

interface AddEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (employee: NewEmployeeInput) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [form, setForm] = useState<NewEmployeeInput>(EMPTY_FORM);

  // Esc 키로 모달 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange =
    (field: keyof NewEmployeeInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm(EMPTY_FORM);
    onClose();
  };

  const inputClassName =
    "text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none";
  const labelClassName = "text-2xs mb-1.5 block font-bold text-gray-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-6 text-left shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-text1 text-base font-black">직원 추가</h3>
            <p className="text-2xs mt-1 text-gray-400">
              소속 기업에 새 직원을 등록합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-100 active:scale-90"
            aria-label="닫기"
          >
            <i className="ti ti-x text-sm" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className={labelClassName}>이름</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="이름을 입력해주세요"
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>이메일</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="example@company.com"
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>전화번호</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="010-0000-0000"
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClassName}>부서</label>
              <input
                required
                type="text"
                value={form.department}
                onChange={handleChange("department")}
                placeholder="예: 프론트엔드 개발팀"
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>직급</label>
              <input
                required
                type="text"
                value={form.position}
                onChange={handleChange("position")}
                placeholder="예: 과장"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label className={labelClassName}>입사일</label>
            <input
              required
              type="date"
              value={form.employmentStartDate}
              onChange={handleChange("employmentStartDate")}
              className={inputClassName}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="text-text2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-brand shadow-brand/10 hover:bg-brand-dark rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
