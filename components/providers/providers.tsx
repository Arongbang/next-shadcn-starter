"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
