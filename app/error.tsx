"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

type ErrorProps = {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p aria-hidden="true" className="text-7xl font-bold text-muted-foreground/30">오류</p>
      <h1 className="mt-4 text-2xl font-semibold">문제가 발생했습니다</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {error.message || "예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}
      </p>
      {error.digest && (
        <p className="mt-1 text-xs text-muted-foreground/60">오류 코드: {error.digest}</p>
      )}
      <Button onClick={unstable_retry} className="mt-8">
        다시 시도
      </Button>
    </div>
  )
}
