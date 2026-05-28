# Next Shadcn Starter

Next.js App Router 기반 스타터킷.

## 스택

- **Next.js 16** — App Router
- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui** — Radix UI 기반 컴포넌트
- **TanStack Query v5** — 서버 상태 관리
- **React Hook Form + Zod** — 폼 유효성 검사
- **next-themes** — 다크모드
- **date-fns** — 날짜 포맷

## 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

## 구조

```
app/                  # App Router 페이지
  _components/        # 라우트 전용 컴포넌트
components/
  ui/                 # shadcn/ui 컴포넌트
  layout/             # Header, Footer, ThemeToggle
  common/             # PageHeader, EmptyState, LoadingSpinner
  providers/          # 전역 Provider 래퍼
lib/                  # 유틸리티 (format, utils, env, query-client)
types/                # 공용 타입
constants/            # siteConfig, navItems
```

## 환경 변수

```bash
cp .env.example .env.local
```

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_APP_URL` | 앱 기본 URL |
