"use client"

import { toast } from "sonner"
import { Bell, Download, Loader2, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

export function ShowcaseButtons() {
  const [progress, setProgress] = useState(60)

  return (
    <div className="space-y-10">
      {/* Button Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm"><Plus className="mr-1 h-3 w-3" />Small</Button>
          <Button size="default"><Download className="mr-2 h-4 w-4" />Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Bell className="h-4 w-4" /></Button>
          <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading</Button>
        </div>
      </section>

      <Separator />

      {/* Badge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Badge</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      <Separator />

      {/* Avatar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Avatar</h2>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>홍길</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <Separator />

      {/* Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Card</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명이 여기에 표시됩니다</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                카드 콘텐츠 영역입니다. 다양한 정보를 담을 수 있습니다.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">확인</Button>
              <Button size="sm" variant="outline">취소</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>통계</CardTitle>
                <Badge variant="secondary">이번 달</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,284</p>
              <p className="text-sm text-muted-foreground mt-1">+12% 지난달 대비</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Toast */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Toast (Sonner)</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => toast("기본 알림 메시지입니다")}>
            기본
          </Button>
          <Button variant="outline" onClick={() => toast.success("성공적으로 처리되었습니다")}>
            성공
          </Button>
          <Button variant="outline" onClick={() => toast.error("오류가 발생했습니다")}>
            오류
          </Button>
          <Button variant="outline" onClick={() => toast.warning("주의가 필요합니다")}>
            경고
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("작업을 삭제하시겠습니까?", {
                action: { label: "삭제", onClick: () => toast.success("삭제되었습니다") },
              })
            }
          >
            액션
          </Button>
        </div>
      </section>

      <Separator />

      {/* Dialog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Dialog</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">다이얼로그 열기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
              <DialogDescription>
                이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">취소</Button>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <Separator />

      {/* Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Tabs</h2>
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="analytics">분석</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <p className="text-sm text-muted-foreground">개요 탭 콘텐츠입니다.</p>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <p className="text-sm text-muted-foreground">분석 탭 콘텐츠입니다.</p>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <p className="text-sm text-muted-foreground">설정 탭 콘텐츠입니다.</p>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Controls</h2>
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-3">
            <Switch id="notifications" />
            <Label htmlFor="notifications">알림 허용</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">이용약관에 동의합니다</Label>
          </div>
        </div>
      </section>

      <Separator />

      {/* Progress & Skeleton */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Progress & Skeleton</h2>
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center justify-between text-sm">
            <span>업로드 진행률</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>
              -10
            </Button>
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>
              +10
            </Button>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </section>

      <Separator />

      {/* Tooltip */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Tooltip</h2>
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>알림 설정</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>삭제</TooltipContent>
          </Tooltip>
        </div>
      </section>
    </div>
  )
}
