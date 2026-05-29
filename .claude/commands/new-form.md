# /new-form

React Hook Form + Zod 폼 컴포넌트를 프로젝트 패턴에 맞게 생성합니다.

## 사용법

```
/new-form <name> [field1:type field2:type ...]
```

예시:
- `/new-form login email:email password:password`
- `/new-form contact name:text email:email message:textarea`
- `/new-form signup name:text email:email role:select password:password`

지원 field 타입: `text`, `email`, `password`, `textarea`, `select`, `number`

## 동작

`$ARGUMENTS`를 파싱해 name과 필드 목록을 추출한 뒤 아래 파일을 생성하세요.

### 생성 파일

**`components/{name}-form.tsx`**

```typescript
"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// textarea 필드가 있으면: import { Textarea } from "@/components/ui/textarea"
// select 필드가 있으면: import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const {name}Schema = z.object({
  // 각 필드에 맞는 Zod 검증 규칙 생성:
  // text/email/password → z.string().min(N, "메시지")
  // email → z.string().email("유효한 이메일을 입력해주세요")
  // number → z.number()
  // select → z.string().min(1, "{field}을(를) 선택해주세요")
  // textarea → z.string().min(10, "내용은 10자 이상이어야 합니다")
})

type {PascalCase(name)}FormValues = z.infer<typeof {name}Schema>

export function {PascalCase(name)}Form() {
  const form = useForm<{PascalCase(name)}FormValues>({
    resolver: zodResolver({name}Schema),
    defaultValues: {
      // 각 필드 기본값 (string → "", number → 0)
    },
  })

  function onSubmit(values: {PascalCase(name)}FormValues) {
    console.log(values)
    toast.success("폼이 성공적으로 제출되었습니다!")
    form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* 각 필드 렌더링:
          - text/email/password → <Input> + <Label> + 에러 메시지
          - textarea → <Textarea> + <Label> + 에러 메시지
          - select → <Controller> + <Select> + <Label> + 에러 메시지
      */}
      <Button type="submit" className="w-full">제출</Button>
    </form>
  )
}
```

### 필드별 Zod 규칙

| type | Zod 규칙 |
|------|---------|
| text | `z.string().min(2, "{label}을(를) 입력해주세요")` |
| email | `z.string().email("유효한 이메일을 입력해주세요")` |
| password | `z.string().min(8, "비밀번호는 8자 이상이어야 합니다")` |
| textarea | `z.string().min(10, "내용은 10자 이상이어야 합니다")` |
| select | `z.string().min(1, "{label}을(를) 선택해주세요")` |
| number | `z.number().min(0)` |

### 참조 패턴

`app/_components/showcase-forms.tsx`의 폼 패턴을 따릅니다.
Select 필드는 반드시 `<Controller>`로 감싸세요 (Radix UI 제어 컴포넌트).
에러 메시지는 `<p className="text-sm text-destructive">` 패턴을 사용합니다.
`aria-invalid={!!form.formState.errors.{field}}`를 각 입력 필드에 추가합니다.

생성 후 `npm run build`로 타입 오류 없음을 확인하세요.
