# /new-page

새 App Router 페이지를 프로젝트 패턴에 맞게 생성합니다.

## 사용법

```
/new-page <route> [title] [description]
```

예시:
- `/new-page settings`
- `/new-page dashboard/analytics "분석 대시보드" "사용자 통계를 확인합니다"`

## 동작

`$ARGUMENTS`를 파싱해 route, title, description을 추출한 뒤 아래 파일들을 생성하세요.

### 생성 파일

**`app/{route}/page.tsx`**

```typescript
import type { Metadata } from "next"
import { PageHeader } from "@/components/common/page-header"

export const metadata: Metadata = {
  title: "{title}",
  description: "{description}",
}

export default function {PascalCase(route)}Page() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10">
      <PageHeader
        title="{title}"
        description="{description}"
        className="mb-10"
      />
    </div>
  )
}
```

**`app/{route}/_components/.gitkeep`** — route-collocated 컴포넌트 폴더 생성

### 네이밍 규칙

- route: 소문자 kebab-case (예: `user-profile`)
- title: route를 공백+첫 글자 대문자로 변환. 인자로 주어지면 그대로 사용
- description: 제공되지 않으면 빈 문자열
- 컴포넌트 함수명: PascalCase (예: `UserProfilePage`)

### 참조 패턴

`app/components/page.tsx`, `app/page.tsx`의 패턴을 따릅니다.
`components/common/page-header.tsx`의 PageHeader 컴포넌트를 사용합니다.

생성 후 `npm run build`로 타입 오류 없음을 확인하세요.
