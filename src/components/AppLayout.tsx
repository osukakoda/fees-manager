import { type ReactNode, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Bell,
  BookOpen,
  DollarSign,
  Shield,
  Calendar,
  Tags,
  List,
  FileCode,
  Mail,
  Code,
  BarChart3,
  Folder,
  FileText,
  ClipboardCheck,
  TrendingUp,
  Globe,
  Sun,
  Moon,
  LayoutDashboard,
  ClipboardList,
  Settings,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react'
import { useThemeStore } from '@/store/store'

const NAV_ITEMS: { label: string; icon: typeof LayoutDashboard; to?: string }[] = [
  { label: 'Overview',        icon: LayoutDashboard, to: '/' },
  { label: 'Pages',           icon: FileText },
  { label: 'Files',           icon: Folder },
  { label: 'Forms',           icon: ClipboardList },
  { label: 'Approvals',       icon: ClipboardCheck },
  { label: 'Analytics',       icon: TrendingUp },
  { label: 'Site Management', icon: Settings },
]

const MORE_TOOLS_ITEMS: { label: string; icon: typeof DollarSign; to?: string }[] = [
  { label: 'Fees Manager',    icon: DollarSign, to: '/fees-manager' },
  { label: 'Audit Log',       icon: Shield },
  { label: 'Calendars',       icon: Calendar },
  { label: 'Content Labels',  icon: Tags },
  { label: 'Content Lists',   icon: List },
  { label: 'Content Types',   icon: FileCode },
  { label: 'Email Templates', icon: Mail },
  { label: 'Embed Codes',     icon: Code },
  { label: 'Insights',        icon: BarChart3 },
]

interface AppLayoutProps {
  children: ReactNode
  activeTab?: string
}

function SidebarContents({
  activeTab,
  onNavigate,
}: {
  activeTab: string
  onNavigate?: () => void
}) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()

  function handleNav(to?: string) {
    if (to) navigate(to)
    onNavigate?.()
  }

  const itemBase =
    'flex items-center gap-3 w-full px-2 py-2 rounded-md text-[length:var(--text-sm)] font-medium transition-colors duration-150 cursor-pointer'
  const itemActive = 'bg-[var(--brand)] text-white'
  const itemInactive =
    'text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)]'

  return (
    <div className="flex flex-col h-full">
      {/* Workspace identity */}
      <div className="flex items-center gap-3 h-14 px-3 lg:px-4 shrink-0">
        <div className="size-7 rounded-md bg-[var(--brand)] flex items-center justify-center shrink-0">
          <LayoutDashboard className="size-4 text-white" />
        </div>
        <span
          className="hidden lg:block text-[length:var(--text-sm)] font-semibold text-[color:var(--slate-50)] truncate"
          style={{ fontFamily: 'var(--font-switzer)' }}
        >
          Our Council
        </span>
      </div>

      {/* Search (lg only) */}
      <div className="hidden lg:flex items-center gap-2 mx-3 mb-3 px-3 py-1.5 rounded-lg bg-[var(--slate-700)] border border-[var(--border-subtle)] cursor-text">
        <Search className="size-4 text-[color:var(--slate-400)] shrink-0" />
        <span className="flex-1 text-[length:var(--text-sm)] text-[color:var(--slate-400)]">Find...</span>
        <span className="text-[length:var(--text-xs)] text-[color:var(--slate-400)]">⌘F</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto py-1">
        {NAV_ITEMS.map(({ icon: Icon, label, to }) => {
          const isActive = label === activeTab
          return (
            <button
              key={label}
              onClick={() => handleNav(to)}
              className={`${itemBase} ${isActive ? itemActive : itemInactive}`}
            >
              <Icon className="size-4 shrink-0" />
              <span className="hidden lg:block truncate">{label}</span>
            </button>
          )
        })}

        {/* More Tools section */}
        <p className="hidden lg:block mt-4 mb-1 px-2 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">
          More Tools
        </p>

        <div className="hidden lg:flex flex-col gap-0.5">
          {MORE_TOOLS_ITEMS.map(({ icon: Icon, label, to }) => {
            const isActive = label === activeTab
            return (
              <button
                key={label}
                onClick={() => handleNav(to)}
                className={`${itemBase} ${isActive ? itemActive : itemInactive}`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bottom: View Site + user identity */}
      <div className="shrink-0 border-t border-[var(--border-faint)] p-2 flex flex-col gap-1">
        <button className="flex items-center gap-3 w-full px-2 py-2 rounded-md text-[length:var(--text-sm)] font-medium text-[color:var(--brand-light)] border border-[var(--brand)] hover:bg-[rgba(29,111,188,0.08)] transition-colors duration-150">
          <Globe className="size-4 shrink-0" />
          <span className="hidden lg:block">View Site</span>
        </button>

        <div className="flex items-center gap-2 px-2 py-2">
          <img
            src="/avatar.jpg"
            alt="Alex Morgan"
            className="size-7 rounded-full object-cover object-top shrink-0"
          />
          <span className="hidden lg:block text-[length:var(--text-sm)] font-medium text-[color:var(--slate-200)] truncate flex-1">
            Alex Morgan
          </span>
          <div className="hidden lg:flex gap-1 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center size-7 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150"
            >
              {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </button>
            <button className="flex items-center justify-center size-7 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
              <Bell className="size-4" />
            </button>
            <button className="flex items-center justify-center size-7 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
              <BookOpen className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AppLayout({ children, activeTab = 'Overview' }: AppLayoutProps) {
  const { theme } = useThemeStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Close mobile drawer on resize to lg
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="flex min-h-screen bg-[var(--slate-900)]">

      {/* Sidebar — icon rail at sm, full at lg */}
      <aside className="hidden sm:flex fixed inset-y-0 left-0 z-20 flex-col w-14 lg:w-60 bg-[var(--slate-800)] border-r border-[var(--border-faint)]">
        <SidebarContents activeTab={activeTab} />
      </aside>

      {/* Mobile top bar */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-10 h-12 flex items-center px-4 gap-3 bg-[var(--slate-800)] border-b border-[var(--border-faint)] shadow-[var(--shadow-header)]">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex items-center justify-center size-8 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150"
        >
          <Menu className="size-5" />
        </button>
        <span
          className="text-[length:var(--text-sm)] font-semibold text-[color:var(--slate-50)]"
          style={{ fontFamily: 'var(--font-switzer)' }}
        >
          Our Council
        </span>
        <div className="ml-auto flex gap-2">
          <MobileThemeButton />
          <button className="flex items-center justify-center size-8 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] transition-colors duration-150">
            <Bell className="size-4" />
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 z-30 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-60 bg-[var(--slate-800)] flex flex-col h-full shadow-[var(--shadow-dropdown)]">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-3 right-3 flex items-center justify-center size-7 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] transition-colors duration-150"
            >
              <X className="size-4" />
            </button>
            <SidebarContents activeTab={activeTab} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 ml-0 sm:ml-14 lg:ml-60 pt-12 sm:pt-0 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-w-0">
        {children}
      </main>

      {/* Fixed help button */}
      <button
        className="fixed bottom-6 right-6 flex items-center justify-center size-9 rounded-full bg-[var(--slate-600)] text-[color:var(--slate-50)] shadow-[var(--shadow-floating)] hover:brightness-110 transition-all duration-150"
        aria-label="Help"
      >
        <HelpCircle className="size-5" />
      </button>
    </div>
  )
}

function MobileThemeButton() {
  const { theme, toggleTheme } = useThemeStore()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center justify-center size-8 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] transition-colors duration-150"
    >
      {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  )
}
