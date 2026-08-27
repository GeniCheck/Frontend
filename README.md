# GeniCheck Frontend

HR 신용 평가 플랫폼 **GeniCheck**의 웹 프론트엔드. 현재는 백엔드 연동 없이 화면·플로우 데모 단계 (인증번호 데모 코드: `123456`).

## 스택

- React 19 + TypeScript
- Vite 8 (dev / build)
- React Router 7
- Tailwind CSS v4 (PostCSS 빌드타임 파이프라인)
- ESLint + Prettier

## 실행

```bash
npm install
npm run dev          # 개발 서버
npm run build        # tsc 타입체크 + 프로덕션 빌드 (dist/)
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint
npm run format       # Prettier 일괄 포맷
```

## 폴더 구조

```
src/
  App.tsx            라우트 정의 (public / auth / main / error)
  main.tsx           엔트리
  index.css          Tailwind 진입점 + 커스텀 유틸리티
  components/        재사용 컴포넌트 (auth / common / layout)
  context/           전역 상태 (RoleProvider, roleContext)
  pages/             라우트 단위 화면 (public / auth / main / error)
```

- 이미지·폰트 같은 정적 파일이 생기면 `src/assets/`를 만들어 거기 둔다. `.ts`/`.tsx` 코드는 넣지 않는다.

- import 는 `@/` alias 사용 (`@` → `src/`). 예: `import { useRole } from "@/context/roleContext"`.

## 역할(Role) 모델

로그인 계정은 `ceo`(대표) 또는 `hr`(인사팀장). `localStorage` 키 `genicheck_role`에 저장되고 새로고침 시 복원된다.

| 경로                                                          | 접근                                  |
| ------------------------------------------------------------- | ------------------------------------- |
| `/`, `/login`, `/signup`                                      | 공개                                  |
| `/login/ceo`, `/login/hr`                                     | 역할별 로그인 폼                      |
| `/main` (Dashboard), `/main/verification`, `/main/ai-reports` | `ceo` 전용 (`RoleGuard`) — `hr`은 403 |
| `/main/referral`, `/main/support`, `/main/credits`            | `ceo` + `hr` 공통                     |

## Tailwind 설정

Tailwind는 **빌드타임 한 곳에서만** 처리한다.

- 진입점: `src/index.css` (`@import "tailwindcss"` + `@config "../tailwind.config.js"`)
- 브랜드 색상·폰트 토큰: `tailwind.config.js` (`theme.extend`)
  - 색상 토큰: `brand`, `brand-dark`, `brand2`, `brand-light`, `accent`, `accent-dark`, `accent2`, `surface`, `surface2`, `text1~3`
  - 팔레트 색은 arbitrary value(`bg-[#5B50E8]`) 대신 토큰 유틸(`bg-brand`)을 사용
- 서체: **Noto Sans KR 단일** (`index.html`의 Google Fonts `<link>`). 강조는 굵기로, 숫자 정렬은 `tabular-nums`로.
- 아이콘: `index.html`의 Tabler Icons webfont `<link>`

> `cdn.tailwindcss.com` 런타임 컴파일러는 사용하지 않는다.
