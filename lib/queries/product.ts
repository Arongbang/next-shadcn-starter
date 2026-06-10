import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Product, CreateProductInput } from "@/types/product"

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
}

// ─── Mock 데이터 (실제 API 연동 전 임시 사용) ─────────────────────────────────

let mockProducts: Product[] = [
  {
    id: "1",
    name: "무선 블루투스 헤드폰",
    description: "고음질 노이즈 캔슬링 무선 헤드폰입니다.",
    price: 89000,
    stock: 42,
    createdAt: new Date("2025-01-15").toISOString(),
  },
  {
    id: "2",
    name: "스탠딩 책상 매트",
    description: "장시간 서서 일할 때 피로를 줄여주는 쿠션 매트입니다.",
    price: 35000,
    stock: 130,
    createdAt: new Date("2025-02-20").toISOString(),
  },
  {
    id: "3",
    name: "미니 USB-C 허브",
    description: "HDMI, USB 3.0, SD카드 리더기를 지원하는 7-in-1 허브입니다.",
    price: 42000,
    stock: 0,
    createdAt: new Date("2025-03-05").toISOString(),
  },
]

// ─── API 함수 (실제 환경에서는 fetch/axios 로 교체) ──────────────────────────

async function fetchProducts(): Promise<Product[]> {
  // 실제 API: return fetch("/api/products").then((r) => r.json())
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [...mockProducts]
}

async function fetchProduct(id: string): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const product = mockProducts.find((p) => p.id === id)
  if (!product) throw new Error("상품을 찾을 수 없습니다.")
  return { ...product }
}

async function createProduct(input: CreateProductInput): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const newProduct: Product = {
    id: String(Date.now()),
    ...input,
    createdAt: new Date().toISOString(),
  }
  mockProducts = [newProduct, ...mockProducts]
  return newProduct
}

// ─── TanStack Query 훅 ────────────────────────────────────────────────────────

/** 상품 목록을 조회하는 훅 */
export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: fetchProducts,
  })
}

/** 단일 상품을 조회하는 훅 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })
}

/** 상품을 생성하는 뮤테이션 훅 */
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // 목록 캐시를 무효화해 자동 재조회
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
  })
}
