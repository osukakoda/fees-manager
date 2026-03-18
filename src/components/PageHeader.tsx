import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  to?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Crumb[]
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex flex-col">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 mb-3">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3 text-[color:var(--slate-600)]" />}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className="text-[length:var(--text-xs)] font-medium text-[color:var(--brand-light)] hover:underline transition-colors duration-150"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[length:var(--text-xs)] font-medium text-[color:var(--slate-400)]">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}
      <h1
        className="text-[length:var(--text-h4)] font-normal leading-tight tracking-[0.24px] text-[color:var(--slate-200)]"
        style={{ fontFamily: 'var(--font-switzer)' }}
      >
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-[length:var(--text-sm)] font-medium text-[color:var(--slate-400)]">
          {description}
        </p>
      )}
    </div>
  )
}
