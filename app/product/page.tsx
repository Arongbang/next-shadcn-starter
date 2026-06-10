import type { Metadata } from "next"
import { PageHeader } from "@/components/common/page-header"
import { ProductList } from "./_components/ProductList"
import { ProductForm } from "./_components/ProductForm"

export const metadata: Metadata = {
  title: "상품 관리",
  description: "상품 목록 조회 및 신규 상품 등록",
}

/** 상품 관리 Server Component 페이지 */
export default function ProductPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10">
      <PageHeader
        title="상품 관리"
        description="등록된 상품을 확인하고 새 상품을 추가할 수 있습니다."
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* 상품 추가 폼 — 왼쪽 사이드바 영역 */}
        <aside className="lg:col-span-1">
          <ProductForm />
        </aside>

        {/* 상품 목록 — 오른쪽 메인 영역 */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">상품 목록</h2>
          <ProductList />
        </section>
      </div>
    </div>
  )
}
