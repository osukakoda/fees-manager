import { Mail, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MenuItemVariant = 'default' | 'sectionTitle'

export interface MenuItemProps {
  /** Main label text */
  label: string
  /** Optional left icon (default: Mail) */
  icon?: React.ReactNode
  /** Optional keyboard shortcut, e.g. "⌘⇧B" */
  shortcut?: string
  /** Optional right icon (default: ChevronRight) */
  rightIcon?: React.ReactNode
  /** Visual variant: default row with icon/shortcut, or section title only */
  variant?: MenuItemVariant
  /** Disabled state (muted, reduced opacity) */
  disabled?: boolean
  className?: string
  /** Show left icon slot (default true for default variant) */
  leftIcon?: boolean
  /** Show right icon slot (default true when shortcut or rightIcon provided) */
  rightIconSlot?: boolean
  children?: React.ReactNode
}

/**
 * Menu item row matching Figma: optional left icon, label, optional shortcut, optional right icon.
 * Supports default, section title, and disabled states. Use inside DropdownMenuItem or as a nav row.
 * 8px grid: px-4 py-1.5, gap-2. Theme tokens for dark UI.
 */
export function MenuItem({
  label,
  icon,
  shortcut,
  rightIcon,
  variant = 'default',
  disabled = false,
  className,
  leftIcon = true,
  rightIconSlot = true,
  children,
}: MenuItemProps) {
  if (variant === 'sectionTitle') {
    return (
      <div
        className={cn(
          'flex flex-1 min-w-0 min-h-px items-center px-4 py-1.5',
          'text-[length:var(--text-sm)] font-semibold leading-5 text-foreground',
          disabled && 'opacity-50',
          className
        )}
        data-variant="sectionTitle"
      >
        {children ?? label}
      </div>
    )
  }

  const leftIconEl = leftIcon ? (icon ?? <Mail className="size-4 shrink-0 text-muted-foreground" />) : null
  const rightIconEl =
    rightIconSlot && (rightIcon ?? (shortcut != null ? <ChevronRight className="size-4 shrink-0 text-muted-foreground" /> : null))

  return (
    <div
      className={cn(
        'flex items-center gap-2 w-full min-w-0',
        disabled && 'opacity-50',
        className
      )}
      data-variant="default"
      data-disabled={disabled || undefined}
    >
      {leftIconEl && <span className="shrink-0 [&_svg]:size-4 [&_svg]:text-muted-foreground">{leftIconEl}</span>}
      <span className="flex-1 min-w-0 truncate text-[length:var(--text-sm)] font-medium leading-5 text-foreground">
        {children ?? label}
      </span>
      {shortcut != null && (
        <span className="shrink-0 text-[length:var(--text-xs)] font-medium leading-5 text-muted-foreground whitespace-nowrap">
          {shortcut}
        </span>
      )}
      {rightIconEl && <span className="shrink-0 [&_svg]:size-4 [&_svg]:text-muted-foreground">{rightIconEl}</span>}
    </div>
  )
}
