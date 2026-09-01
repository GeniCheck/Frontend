import React from "react";
import { CONSENT_ITEMS, type ConsentItemId } from "@/types/declaration";

interface ConsentCheckboxesProps {
  checked: Record<ConsentItemId, boolean>;
  onChange: (id: ConsentItemId, value: boolean) => void;
}

// 법적 사전 동의 취득.
// "동의 기록 보관" 항목은 사용자가 체크하는 UI가 아니라, 아래 두 동의를
// 제출할 때 IP/User-Agent/타임스탬프를 서버가 자동으로 남기는 백엔드 처리라
// 화면엔 안내 문구로만 표시.
const ConsentCheckboxes: React.FC<ConsentCheckboxesProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
      <div>
        <h2 className="text-text1 text-sm font-black">법적 동의</h2>
        <p className="text-2xs mt-1 text-gray-400">
          자기선언 제출을 위해 아래 항목에 모두 동의해주세요.
        </p>
      </div>

      <div className="space-y-2.5">
        {CONSENT_ITEMS.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-3"
          >
            <input
              type="checkbox"
              checked={checked[item.id] ?? false}
              onChange={(e) => onChange(item.id, e.target.checked)}
              className="accent-brand mt-0.5 h-3.5 w-3.5 shrink-0"
            />
            <span className="text-2xs leading-relaxed text-gray-500">
              {item.label}
            </span>
          </label>
        ))}
      </div>

      <p className="text-3xs leading-relaxed text-gray-300">
        미동의 시 서비스 이용이 불가하며, 동의 시 IP·기기 정보·시각이 법적
        증거로 저장됩니다.
      </p>
    </div>
  );
};

export default ConsentCheckboxes;
