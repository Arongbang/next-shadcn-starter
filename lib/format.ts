import { format, formatDistanceToNow, parseISO, isValid } from "date-fns"
import { ko } from "date-fns/locale"

export function formatDate(
  date: Date | string | number,
  pattern = "yyyy년 MM월 dd일"
): string {
  const d = typeof date === "string" ? parseISO(date) : new Date(date)
  if (!isValid(d)) return "-"
  return format(d, pattern, { locale: ko })
}

export function formatRelativeTime(date: Date | string | number): string {
  const d = typeof date === "string" ? parseISO(date) : new Date(date)
  if (!isValid(d)) return "-"
  return formatDistanceToNow(d, { addSuffix: true, locale: ko })
}

export function formatNumber(num: number, locale = "ko-KR"): string {
  return new Intl.NumberFormat(locale).format(num)
}

export function formatCompact(num: number, locale = "ko-KR"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num)
}

export function formatCurrency(
  amount: number,
  currency = "KRW",
  locale = "ko-KR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount)
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim()
}
