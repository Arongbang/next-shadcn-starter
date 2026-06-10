import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p aria-hidden="true" className="text-7xl font-bold text-muted-foreground/30">404</p>
      <h1 className="mt-4 text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
