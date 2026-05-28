# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

테스트 설정 없음.

## 아키텍처 개요

**Next.js 16.2.6 App Router** 기반 스타터킷. React 19 · Tailwind CSS v4 · shadcn/ui 조합.

### 디렉토리 구조

- `app/` — App Router 페이지. `_components/`는 해당 라우트 전용 컴포넌트 (route-collocated)
- `components/ui/` — shadcn/ui 컴포넌트 (직접 수정 가능한 소스 파일)
- `components/layout/` — Header, Footer, ThemeToggle, MobileNav
- `components/common/` — 공용 컴포넌트 (PageHeader, EmptyState, LoadingSpinner)
- `components/providers/` — 전역 Provider 래퍼
- `lib/` — 유틸리티: `utils.ts`(cn), `format.ts`(date-fns 기반 포맷터), `query-client.ts`, `env.ts`
- `types/index.ts` — 공용 타입 (NavItem, SiteConfig, ApiResponse, PaginationParams 등)
- `constants/index.ts` — siteConfig, navItems

### 경로 별칭

`@/*` → 프로젝트 루트 (`tsconfig.json` paths)

### Provider 스택

`app/layout.tsx` → `<Providers>` → ThemeProvider(next-themes) → QueryProvider(TanStack Query) → TooltipProvider

### 데이터 페칭

TanStack Query 사용. `getQueryClient()` (SSR에서는 매번 새 인스턴스, 브라우저에서는 싱글턴) → 기본 staleTime 60초, gcTime 5분, refetchOnWindowFocus 비활성화.

### 폼

React Hook Form + `zodResolver` + Zod v4. Radix UI 기반 컴포넌트(`Select` 등)는 `Controller`로 연결.

### 환경 변수

`lib/env.ts`에서 `@t3-oss/env-nextjs`로 타입 안전하게 관리. 새 환경 변수는 이 파일에 추가.
