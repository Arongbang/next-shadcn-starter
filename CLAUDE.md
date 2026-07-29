# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행 (eslint-config-next, 커스텀 규칙 없음)
```

테스트 설정 없음.

## 아키텍처 개요

**Next.js 16.2.6 App Router** 기반 스타터킷. React 19 · Tailwind CSS v4 · shadcn/ui 조합.

### 디렉토리 구조

- `app/` — App Router 페이지. 현재 라우트: `/`(홈), `/components`(shadcn/ui 쇼케이스), `/docs`, `/product`(기능 스캐폴드 참고 구현). `_components/`는 해당 라우트 전용 컴포넌트 (route-collocated)
- `components/ui/` — shadcn/ui 컴포넌트 (직접 수정 가능한 소스 파일)
- `components/layout/` — Header, Footer, ThemeToggle, MobileNav
- `components/common/` — 공용 컴포넌트 (PageHeader, EmptyState, LoadingSpinner)
- `components/providers/` — 전역 Provider 래퍼 (`"use client"`)
- `lib/` — 유틸리티: `utils.ts`(cn), `format.ts`(date-fns 기반 포맷터), `query-client.ts`, `env.ts`
- `lib/queries/[feature].ts` — 기능별 TanStack Query 훅 (queryKey + queryFn + useQuery/useMutation). 예: `product.ts`
- `types/index.ts` — 공용 타입 (NavItem, SiteConfig, ApiResponse, PaginationParams 등)
- `types/[feature].ts` — 기능별 Zod 스키마 + `z.infer` 타입. 예: `product.ts`
- `constants/index.ts` — siteConfig, navItems

새 기능은 `types/[feature].ts` → `lib/queries/[feature].ts` → `app/[feature]/_components/` → `app/[feature]/page.tsx` 순서로 구성한다. `app/product/`가 이 패턴의 참고 구현이다.

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

## 코딩 컨벤션

- 들여쓰기 2칸
- 코드 주석은 WHY가 불명확할 때만 한국어로 작성
- 파일/디렉토리명: kebab-case, 컴포넌트/타입: PascalCase, 변수/함수: camelCase
- import는 항상 `@/*` 별칭 사용 (상대 경로 금지)
- `process.env` 직접 접근 금지 — `@/lib/env`의 `env`를 사용

## Claude Code 커스텀 도구

- 서브에이전트 `feature-scaffolder` (`.claude/agents/feature-scaffolder.md`) — 기능명 하나로 위 4계층(types/lib/queries/app) 전체를 스캐폴드
- 서브에이전트 `code-reviewer` (`.claude/agents/code-reviewer.md`) — 최근 작성/수정된 코드 리뷰. `.claude/agent-memory/code-reviewer/`에 프로젝트별 학습 내용 축적
- 슬래시 명령: `/new-page`, `/new-form`, `/new-query`
