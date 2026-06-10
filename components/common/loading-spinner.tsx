import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg"
  className?: string
  label?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

export function LoadingSpinner({ size = "md", className, label }: LoadingSpinnerProps) {
  return (
    <div role="status" className={cn("flex items-center justify-center gap-2", className)}>
      <Loader2 aria-hidden="true" className={cn("animate-spin text-muted-foreground", sizeMap[size])} />
      {label
        ? <span className="text-sm text-muted-foreground">{label}</span>
        : <span className="sr-only">불러오는 중</span>
      }
    </div>
  )
}
