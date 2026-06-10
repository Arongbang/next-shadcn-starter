"use client"

import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { EmptyState } from "@/components/common/empty-state"
import { formatDate, formatRelativeTime, formatCompact, formatCurrency } from "@/lib/format"
import { FileX, RefreshCw } from "lucide-react"

type Post = {
  id: number
  title: string
  body: string
  userId: number
}

function PostTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-20">작성자</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-6" /></TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function ShowcaseData() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=5").then((r) => r.json()),
  })

  const now = new Date()
  const threeMinutesAgo = new Date(now.getTime() - 180_000)

  return (
    <div className="space-y-10">
      {/* TanStack Query */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">TanStack Query</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            disabled={isFetching}
          >
            <RefreshCw className={`mr-2 h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            새로고침
          </Button>
        </div>

        {isLoading ? (
          <PostTableSkeleton />
        ) : isError ? (
          <EmptyState
            icon={<FileX className="h-10 w-10" />}
            title="데이터를 불러오지 못했습니다"
            description="네트워크 연결을 확인하고 다시 시도해 주세요"
            action={<Button variant="outline" size="sm" onClick={refetch}>재시도</Button>}
          />
        ) : data?.length === 0 ? (
          <EmptyState
            icon={<FileX className="h-10 w-10" />}
            title="데이터가 없습니다"
            description="표시할 게시물이 없습니다"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-20 text-center">작성자</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-mono text-muted-foreground">{post.id}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">User {post.userId}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      <Separator />

      {/* Format Utilities */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Format Utilities (date-fns)</h2>
        <div className="grid gap-3 sm:grid-cols-2 font-mono text-sm max-w-2xl">
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <p className="text-xs text-muted-foreground font-sans">formatDate(new Date())</p>
            <p className="font-semibold">{formatDate(now)}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <p className="text-xs text-muted-foreground font-sans">formatDate (커스텀 패턴)</p>
            <p className="font-semibold">{formatDate(now, "yyyy/MM/dd HH:mm")}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <p className="text-xs text-muted-foreground font-sans">formatRelativeTime (3분 전)</p>
            <p className="font-semibold">{formatRelativeTime(threeMinutesAgo)}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <p className="text-xs text-muted-foreground font-sans">formatCompact(1_234_567)</p>
            <p className="font-semibold">{formatCompact(1_234_567)}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <p className="text-xs text-muted-foreground font-sans">formatCurrency(59_000)</p>
            <p className="font-semibold">{formatCurrency(59_000)}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <p className="text-xs text-muted-foreground font-sans">formatCurrency (USD)</p>
            <p className="font-semibold">{formatCurrency(99.99, "USD", "en-US")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
