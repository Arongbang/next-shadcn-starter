import type { SiteConfig, NavItem } from "@/types"
import { env } from "@/lib/env"

export const siteConfig: SiteConfig = {
  name: "Next.js Starter Kit",
  description: "A modern Next.js starter kit with shadcn/ui, Tailwind v4, and React 19",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: "/og.png",
  links: {
    github: undefined,
  },
}

export const navItems: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "컴포넌트", href: "/components" },
  { label: "문서", href: "/docs" },
]
