import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Trend chip matching Figma node 37-1999 (CompareNumericUp).
 * Dark theme: up = green #007a36 / text #f3f4f6, down = red #b3001b / text #f1f5f9.
 * Padding pl-4px pr-8px py-4px, gap-4px, rounded-8px, 14px medium, 16px icon.
 */
export interface TrendChipProps {
  direction: 'up' | 'down'
  children: React.ReactNode
  className?: string
}

export function TrendChip({ direction, children, className }: TrendChipProps) {
  const isUp = direction === 'up'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-lg pl-1 pr-2 py-1 text-[length:var(--text-sm)] font-medium leading-snug [&_svg]:size-4 [&_svg]:shrink-0',
        isUp
          ? 'bg-[rgba(0,122,54,0.12)] text-[color:var(--success)]'
          : 'bg-[rgba(179,0,27,0.12)] text-[color:var(--destructive-figma)]',
        className
      )}
      role="status"
    >
      {isUp ? <ArrowUp /> : <ArrowDown />}
      {children}
    </span>
  )
}
