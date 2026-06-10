import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/common/page-header"
import { ShowcaseButtons } from "@/app/_components/showcase-buttons"
import { ShowcaseForms } from "@/app/_components/showcase-forms"

export const metadata: Metadata = {
  title: "컴포넌트",
  description: "shadcn/ui 기반 UI 컴포넌트 모음",
}

export default function ComponentsPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10">
      <PageHeader
        title="컴포넌트"
        description="shadcn/ui 기반으로 구성된 UI 컴포넌트와 폼 훅 예제입니다."
        className="mb-10"
      />

      <Tabs defaultValue="ui">
        <TabsList className="mb-8">
          <TabsTrigger value="ui">UI 컴포넌트</TabsTrigger>
          <TabsTrigger value="forms">폼 & 훅</TabsTrigger>
        </TabsList>

        <TabsContent value="ui">
          <ShowcaseButtons />
        </TabsContent>

        <TabsContent value="forms">
          <ShowcaseForms />
        </TabsContent>
      </Tabs>
    </div>
  )
}
