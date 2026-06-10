import { LoadingSpinner } from "@/components/common/loading-spinner"

export default function Loading() {
  return (
    <div aria-live="polite" className="flex flex-1 items-center justify-center py-24">
      <LoadingSpinner size="lg" label="불러오는 중..." />
    </div>
  )
}
