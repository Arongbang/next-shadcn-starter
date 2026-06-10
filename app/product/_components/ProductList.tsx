"use client"

import { useProducts } from "@/lib/queries/product"
import { formatCurrency, formatDate } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

/** 재고 상태에 따른 뱃지 변형 반환 */
function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return <Badge variant="destructive">품절</Badge>
  }
  if (stock <= 10) {
    return <Badge variant="outline" className="text-orange-500 border-orange-400">재고 부족</Badge>
  }
  return <Badge variant="secondary">재고 있음</Badge>
}

/** 로딩 중 테이블 스켈레톤 */
function ProductListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-md" />
      ))}
    </div>
  )
}

/** 상품 목록 Client Component */
export function ProductList() {
  const { data: products, isLoading, isError, error } = useProducts()

  if (isLoading) {
    return <ProductListSkeleton />
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        상품을 불러오는 중 오류가 발생했습니다: {(error as Error).message}
      </p>
    )
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        등록된 상품이 없습니다.
      </p>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>상품명</TableHead>
            <TableHead>설명</TableHead>
            <TableHead className="text-right">가격</TableHead>
            <TableHead className="text-right">재고</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>등록일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="text-muted-foreground max-w-xs truncate">
                {product.description}
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell className="text-right font-mono">{product.stock}</TableCell>
              <TableCell>
                <StockBadge stock={product.stock} />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(product.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
