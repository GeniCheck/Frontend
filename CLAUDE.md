# CLAUDE.md

Claude Code가 이 저장소에서 작업할 때 따르는 규칙.

## 프로젝트 개요

HR 신용 평가 플랫폼 **GeniCheck**의 웹 프론트엔드. 백엔드 연동은 아직 없고 화면·플로우 데모 단계다 (인증번호 데모 코드: `123456`).

- **스택**: React 19 · TypeScript · Vite 8 · React Router 7 · Tailwind CSS v4 · ESLint/Prettier
- **명령어**: `npm run dev` / `npm run build`(tsc + vite) / `npm run lint` / `npm run format`

## 폴더 구조 규칙

```
src/
  components/   재사용 컴포넌트 (auth / common / layout)
  context/      전역 상태 (RoleProvider, roleContext)
  pages/        라우트 단위 화면 (public / auth / main / error)
```

- 이미지·폰트 등 정적 파일이 생기면 `src/assets/`에 둔다. 거기에 `.ts`/`.tsx` 코드는 두지 않는다.

- 모듈 import 는 `@/` alias 를 쓴다 (`@` → `src/`). 상대경로 `../../` 지양.
  - 예: `import { useRole } from "@/context/roleContext";`
- 주석은 한국어로 단다 (기존 코드 스타일 유지).

## 역할(Role) 모델

- 계정 역할은 `ceo`(대표) 또는 `hr`(인사팀장). `localStorage` 키 `genicheck_role`에 저장, 새로고침 시 `readStoredRole`로 복원.
- `@/context/roleContext`의 `useRole()` 훅으로 접근. `RoleProvider`는 `App` 최상단에 감싼다.
- 라우트 접근 제어는 `@/components/common/RoleGuard`(중첩 라우트 가드)로 한다.
  - `ceo` 전용: `/main`(Dashboard), `/main/verification`, `/main/ai-reports`
  - `ceo` + `hr` 공통: `/main/referral`, `/main/support`, `/main/credits`
  - 역할이 `null`(비로그인)이면 가드는 통과시킨다.

## Tailwind 규칙

Tailwind 설정은 **빌드타임 한 곳**에서만 한다.

- 진입점: `src/index.css` (`@import "tailwindcss"` + `@config "../tailwind.config.js"`)
- 브랜드 색상·폰트 토큰은 `tailwind.config.js`(`theme.extend`)에 정의돼 있다.
  - 색상: `brand` / `brand-dark` / `brand2` / `brand-light` / `accent` / `accent-dark` / `accent-light` / `accent2` / `accent2-light` / `surface` / `surface2` / `text1` / `text2` / `text3`
  - 마이크로 글자 크기: `text-2xs`(11px) / `text-3xs`(9px). `text-xs`(12px) 아래는 이 둘만 쓴다.
- 위 팔레트 색은 `bg-[#5B50E8]` 같은 arbitrary value 대신 **토큰 유틸**(`bg-brand`, `text-text1`, `hover:bg-brand-dark` …)을 쓴다. 팔레트에 없는 일회성 색만 arbitrary value 허용.
- 카드 모서리는 `rounded-3xl`(24px)로 통일. `rounded-[NNpx]` 새로 만들지 않는다. (로그인/가입 대형 카드의 `rounded-[32px]`는 예외)
- 대시보드 레이아웃 상수: 사이드바 `w-65`, 콘텐츠 offset `md:pl-65`(MainPage 아웃렛에만), 헤더 `h-17`, 콘텐츠 폭 `max-w-[1250px]`.
- **서체는 Noto Sans KR 하나로 통일한다.** `font-bebas` / `font-mono` 등 별도 서체를 추가하지 않는다. 강조는 굵기(`font-black` 등)로, 숫자 정렬은 `tabular-nums`로 처리한다.
- 폰트/아이콘은 `index.html`의 `<link>`(Google Fonts: Noto Sans KR, Tabler Icons webfont).
- `cdn.tailwindcss.com` 런타임 스크립트를 다시 추가하지 않는다.

## 응답 규칙

- 파일을 **생성하거나 수정했으면**, 응답 맨 끝에 `### 변경사항` 섹션을 붙인다.
  - 각 줄: `` `경로` — 한 줄 이유 ``
  - 실행한 검증 명령(`npm run lint`, `npm run build` 등)과 그 결과도 함께 적는다.
  - 아무 파일도 바꾸지 않았으면 이 섹션은 생략한다.

예:

```
### 변경사항
- `src/components/auth/ConsentCheckboxes.tsx` — 동의 체크박스 컴포넌트 신규
- `src/pages/main/VerificationPage.tsx` — 체크박스 컴포넌트 연결
- 검증: `npm run lint` 통과, `npm run build` 통과
```

> `.claude/hooks/log-activity.sh`가 `.claude/logs/<날짜>.log`에 "프롬프트 → 바뀐 파일"을 자동 기록한다
> (git엔 없는 정보 — 어떤 요청이 어떤 변경을 유발했는지). 위 응답 요약은 그 "이유"를 사람이 바로 보기 위한 것.
