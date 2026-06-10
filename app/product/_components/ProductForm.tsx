"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createProductSchema, type CreateProductInput } from "@/types/product"
import { useCreateProduct } from "@/lib/queries/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/** 상품 추가 폼 Client Component */
export function ProductForm() {
  const { mutate: createProduct, isPending } = useCreateProduct()

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  })

  function onSubmit(data: CreateProductInput) {
    createProduct(data, {
      onSuccess: (product) => {
        toast.success(`"${product.name}" 상품이 등록되었습니다.`)
        form.reset()
      },
      onError: (err) => {
        toast.error(`상품 등록에 실패했습니다: ${(err as Error).message}`)
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>상품 추가</CardTitle>
        <CardDescription>새 상품 정보를 입력하고 등록하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* 상품명 */}
          <div className="space-y-1.5">
            <Label htmlFor="name">상품명 *</Label>
            <Input
              id="name"
              placeholder="예: 무선 블루투스 헤드폰"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* 설명 */}
          <div className="space-y-1.5">
            <Label htmlFor="description">상품 설명 *</Label>
            <Textarea
              id="description"
              placeholder="상품에 대한 간략한 설명을 입력해주세요..."
              rows={3}
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 가격 */}
            <div className="space-y-1.5">
              <Label htmlFor="price">가격 (원) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                aria-invalid={!!form.formState.errors.price}
                {...form.register("price", { valueAsNumber: true })}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
              )}
            </div>

            {/* 재고 */}
            <div className="space-y-1.5">
              <Label htmlFor="stock">재고 수량 *</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                aria-invalid={!!form.formState.errors.stock}
                {...form.register("stock", { valueAsNumber: true })}
              />
              {form.formState.errors.stock && (
                <p className="text-sm text-destructive">{form.formState.errors.stock.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "등록 중..." : "상품 등록"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
