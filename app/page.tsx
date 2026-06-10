import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/common/page-header"
import { ShowcaseButtons } from "./_components/showcase-buttons"
import { ShowcaseForms } from "./_components/showcase-forms"
import { ShowcaseData } from "./_components/showcase-data"

export const metadata: Metadata = {
  title: "쇼케이스",
  description: "스타터킷 컴포넌트 쇼케이스",
}

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10">
      <PageHeader
        title="Next.js Starter Kit"
        description="Next.js 16 · React 19 · Tailwind v4 · shadcn/ui · TanStack Query · React Hook Form · Zod"
        className="mb-10"
      />

      <Tabs defaultValue="ui">
        <TabsList className="mb-8">
          <TabsTrigger value="ui">UI 컴포넌트</TabsTrigger>
          <TabsTrigger value="forms">폼 & 훅</TabsTrigger>
          <TabsTrigger value="data">데이터 & 유틸</TabsTrigger>
        </TabsList>

        <TabsContent value="ui">
          <ShowcaseButtons />
        </TabsContent>

        <TabsContent value="forms">
          <ShowcaseForms />
        </TabsContent>

        <TabsContent value="data">
          <ShowcaseData />
        </TabsContent>
      </Tabs>
    </div>
  )
}
