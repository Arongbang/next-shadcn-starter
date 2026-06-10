import type { Metadata } from "next"
import { PageHeader } from "@/components/common/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "문서",
  description: "Next.js Starter Kit 사용 가이드",
}

const techStack = [
  {
    name: "Next.js 16",
    description: "App Router, Server Components, Streaming 지원",
    badge: "프레임워크",
  },
  {
    name: "React 19",
    description: "최신 React 기능 및 훅 사용 가능",
    badge: "UI 라이브러리",
  },
  {
    name: "Tailwind CSS v4",
    description: "유틸리티 기반 CSS 프레임워크",
    badge: "스타일링",
  },
  {
    name: "shadcn/ui",
    description: "Radix UI 기반의 접근성 있는 컴포넌트",
    badge: "컴포넌트",
  },
  {
    name: "TanStack Query",
    description: "서버 상태 관리 및 데이터 페칭",
    badge: "데이터",
  },
  {
    name: "React Hook Form + Zod",
    description: "타입 안전한 폼 검증",
    badge: "폼",
  },
]

const projectStructure = [
  { path: "app/", desc: "Next.js App Router 페이지" },
  { path: "components/ui/", desc: "shadcn/ui 컴포넌트" },
  { path: "components/common/", desc: "공통 컴포넌트" },
  { path: "components/layout/", desc: "헤더, 푸터, 네비게이션" },
  { path: "components/providers/", desc: "전역 프로바이더" },
  { path: "constants/", desc: "사이트 설정 및 네비게이션 상수" },
  { path: "lib/", desc: "유틸리티 함수" },
  { path: "types/", desc: "TypeScript 타입 정의" },
]

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10">
      <PageHeader
        title="문서"
        description="Next.js Starter Kit의 구조와 사용 방법을 안내합니다."
        className="mb-10"
      />

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">기술 스택</h2>
          <p className="text-muted-foreground">
            이 스타터킷은 현대적인 Next.js 개발을 위한 검증된 기술 스택으로 구성되어 있습니다.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech) => (
              <Card key={tech.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{tech.name}</CardTitle>
                    <Badge variant="secondary">{tech.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tech.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">프로젝트 구조</h2>
          <p className="text-muted-foreground">
            주요 디렉토리와 역할을 설명합니다.
          </p>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {projectStructure.map((item) => (
                  <li key={item.path} className="flex items-start gap-4">
                    <code className="rounded bg-muted px-2 py-1 text-sm font-mono min-w-[200px]">
                      {item.path}
                    </code>
                    <span className="text-sm text-muted-foreground pt-1">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">시작하기</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. 의존성 설치</h3>
                <code className="block rounded bg-muted px-4 py-3 text-sm font-mono">
                  npm install
                </code>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">2. 개발 서버 실행</h3>
                <code className="block rounded bg-muted px-4 py-3 text-sm font-mono">
                  npm run dev
                </code>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">3. 빌드</h3>
                <code className="block rounded bg-muted px-4 py-3 text-sm font-mono">
                  npm run build
                </code>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
