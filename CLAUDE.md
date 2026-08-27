# CLAUDE.md

Claude Code가 이 저장소에서 작업할 때 따르는 규칙.

## 응답 규칙

- 파일을 **생성하거나 수정했으면**, 응답 맨 끝에 `### 변경사항` 섹션을 붙인다.
  - 각 줄: `` `경로` — 한 줄 이유 ``
  - 실행한 검증 명령(`npm run lint`, `npm run build` 등)과 그 결과도 함께 적는다.
  - 아무 파일도 바꾸지 않았으면 이 섹션은 생략한다.

예:

```
### 변경사항
- `src/assets/components/auth/ConsentCheckboxes.tsx` — 동의 체크박스 컴포넌트 신규
- `src/assets/pages/auth/VerificationPage.tsx` — 체크박스 컴포넌트 연결
- 검증: `npm run lint` 통과, `npm run build` 통과
```

> `.claude/hooks/log-activity.sh`가 `.claude/logs/<날짜>.log`에 "프롬프트 → 바뀐 파일"을 자동 기록한다
> (git엔 없는 정보 — 어떤 요청이 어떤 변경을 유발했는지). 위 응답 요약은 그 "이유"를 사람이 바로 보기 위한 것.
