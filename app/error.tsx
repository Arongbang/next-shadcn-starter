"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-bold text-muted-foreground/30">오류</p>
      <h2 className="mt-4 text-2xl font-semibold">문제가 발생했습니다</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {error.message || "예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}
      </p>
      <Button onClick={reset} className="mt-8">
        다시 시도
      </Button>
    </div>
  )
}
