# /new-query

TanStack Query `useQuery` 훅을 프로젝트 패턴에 맞게 생성합니다.

## 사용법

```
/new-query <name> [endpoint]
```

예시:
- `/new-query users`
- `/new-query products /api/products`
- `/new-query user-profile /api/users/:id`

## 동작

`$ARGUMENTS`를 파싱해 name, endpoint를 추출한 뒤 아래 파일을 생성하세요.

### 생성 파일

**`hooks/use-{name}.ts`**

```typescript
"use client"
import { useQuery } from "@tanstack/react-query"

type {PascalCase(name)} = {
  id: number
  // TODO: 필드를 추가하세요
}

async function fetch{PascalCase(name)}s(): Promise<{PascalCase(name)}[]> {
  const res = await fetch("{endpoint}")
  if (!res.ok) throw new Error("Failed to fetch {name}s")
  return res.json()
}

export function use{PascalCase(name)}s() {
  return useQuery<{PascalCase(name)}[]>({
    queryKey: ["{name}s"],
    queryFn: fetch{PascalCase(name)}s,
  })
}
```

### 네이밍 규칙

- name: 소문자 kebab-case (예: `user-profile`)
- endpoint: 제공되지 않으면 `/api/{name}s` 사용
- queryKey: name의 복수형 (예: `["user-profiles"]`)
- 함수/타입명: PascalCase 변환 (예: `UserProfile`, `useUserProfiles`)

### 참조 패턴

`app/_components/showcase-data.tsx`의 useQuery 사용 패턴을 따릅니다.
`lib/query-client.ts`의 기본 설정(staleTime 60초, refetchOnWindowFocus 비활성화)이 적용됩니다.
`types/index.ts`의 `ApiResponse<T>` 타입을 필요 시 활용하세요.

생성 후 `npm run build`로 타입 오류 없음을 확인하세요.
