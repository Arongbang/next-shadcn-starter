"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useDebounce } from "use-debounce"
import { useState, useEffect } from "react"
import useLocalStorageState from "use-local-storage-state"
import { useMediaQuery } from "react-responsive"

const contactSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
  email: z.string().email("유효한 이메일을 입력해주세요"),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다"),
})

type ContactForm = z.infer<typeof contactSchema>

export function ShowcaseForms() {
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearch] = useDebounce(searchValue, 400)
  const [savedNote, setSavedNote] = useLocalStorageState("starter-note", { defaultValue: "" })
  const [mounted, setMounted] = useState(false)
  const isMobileRaw = useMediaQuery({ maxWidth: 767 })
  const isMobile = mounted ? isMobileRaw : false

  // SSR 하이드레이션 불일치 방지: 마운트 후에만 실제 미디어 쿼리 값을 사용
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", category: "", message: "" },
  })

  function onSubmit() {
    toast.success("폼이 성공적으로 제출되었습니다!")
    form.reset()
  }

  return (
    <div className="space-y-10">
      {/* React Hook Form + Zod */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Form (React Hook Form + Zod)</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div className="space-y-1.5">
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              placeholder="홍길동"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">이메일 *</Label>
            <Input
              id="email"
              type="email"
              placeholder="hong@example.com"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>카테고리 *</Label>
            <Controller
              control={form.control}
              name="category"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger aria-invalid={!!form.formState.errors.category}>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">일반 문의</SelectItem>
                    <SelectItem value="support">기술 지원</SelectItem>
                    <SelectItem value="billing">결제 문의</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.category && (
              <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">메시지 *</Label>
            <Textarea
              id="message"
              placeholder="문의 내용을 입력해주세요..."
              rows={4}
              aria-invalid={!!form.formState.errors.message}
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "제출 중..." : "제출"}
          </Button>
        </form>
      </section>

      <Separator />

      {/* use-debounce */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">useDebounce</h2>
        <div className="max-w-sm space-y-3">
          <div className="space-y-1.5">
            <Label>검색어 (400ms 디바운스)</Label>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="입력 후 400ms 뒤에 반영됩니다..."
            />
          </div>
          <p className="text-sm text-muted-foreground">
            디바운스 값:{" "}
            <span className="font-mono text-foreground">
              {debouncedSearch || "(비어있음)"}
            </span>
          </p>
        </div>
      </section>

      <Separator />

      {/* use-local-storage-state */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">useLocalStorageState</h2>
        <div className="max-w-sm space-y-3">
          <div className="space-y-1.5">
            <Label>메모 (localStorage에 자동 저장)</Label>
            <Textarea
              value={savedNote}
              onChange={(e) => setSavedNote(e.target.value)}
              placeholder="입력하면 자동 저장됩니다. 새로고침해도 유지됩니다..."
              rows={3}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            페이지 새로고침 후에도 내용이 유지됩니다. 탭 간 동기화도 지원합니다.
          </p>
        </div>
      </section>

      <Separator />

      {/* react-responsive */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">useMediaQuery (react-responsive)</h2>
        <div className="space-y-2">
          <p className="text-sm">
            현재 뷰포트:{" "}
            <span className="font-semibold text-primary">
              {isMobile ? "모바일 (≤767px)" : "데스크탑 (≥768px)"}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            브라우저 창 크기를 조절해 보세요.
          </p>
        </div>
      </section>
    </div>
  )
}
