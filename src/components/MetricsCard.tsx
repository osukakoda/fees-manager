import { TrendChip } from '@/components/TrendChip'
import { cn } from '@/lib/utils'

export interface MetricsCardProps {
  title: string
  subtitle: string
  value: React.ReactNode
  trendDirection?: 'up' | 'down'
  trendLabel?: React.ReactNode
  detailText?: string
  valueClassName?: string
  className?: string
}

export function MetricsCard({
  title,
  subtitle,
  value,
  trendDirection,
  trendLabel,
  detailText,
  valueClassName,
  className,
}: MetricsCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col min-w-0 rounded-2xl border border-[var(--border-subtle)] bg-[var(--slate-800)] px-4 py-4 sm:px-7 sm:py-7 shadow-[var(--shadow-card-metrics)] hover:brightness-[1.03] transition-all duration-150',
        className
      )}
    >
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex flex-col gap-1">
          <p className="text-[length:var(--text-base)] font-normal leading-snug text-[color:var(--slate-50)]" style={{ fontFamily: 'var(--font-dm)' }}>
            {title}
          </p>
          <p className="text-[length:var(--text-sm)] font-medium leading-snug text-[color:var(--slate-300)]" style={{ fontFamily: 'var(--font-dm)' }}>
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p
            className={cn(
              'text-[length:var(--text-h2)] sm:text-[length:var(--text-h1)] font-light leading-none text-[color:var(--slate-50)]',
              valueClassName
            )}
            style={{ fontFamily: 'var(--font-switzer)' }}
          >
            {value}
          </p>
          {(trendDirection != null || detailText) && (
            <div className="flex gap-3 items-end flex-1">
              {trendDirection != null && (
                <TrendChip direction={trendDirection}>
                  {trendLabel ?? '—'}
                </TrendChip>
              )}
              {detailText != null && (
                <span className="flex-1 min-w-0 text-[length:var(--text-xs)] font-medium leading-relaxed text-[color:var(--slate-200)]">
                  {detailText}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
