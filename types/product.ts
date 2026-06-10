import { z } from "zod"

/** 상품 엔티티 Zod 스키마 */
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().int(),
  createdAt: z.string(),
})

/** 상품 생성 폼 Zod 스키마 */
export const createProductSchema = z.object({
  name: z.string().min(1, "상품명을 입력해주세요").max(100, "상품명은 100자 이하여야 합니다"),
  description: z.string().min(1, "상품 설명을 입력해주세요").max(500, "설명은 500자 이하여야 합니다"),
  price: z
    .number()
    .positive("가격은 0보다 커야 합니다"),
  stock: z
    .number()
    .int("재고는 정수여야 합니다")
    .nonnegative("재고는 0 이상이어야 합니다"),
})

/** 상품 엔티티 TypeScript 타입 */
export type Product = z.infer<typeof productSchema>

/** 상품 생성 폼 TypeScript 타입 */
export type CreateProductInput = z.infer<typeof createProductSchema>
