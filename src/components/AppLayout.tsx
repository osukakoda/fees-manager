import { type ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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

// A nav button that shows a tooltip when the sidebar is collapsed
function NavItem({
  icon: Icon,
  label,
  isActive,
  collapsed,
  onClick,
}: {
  icon: typeof LayoutDashboard
  label: string
  isActive: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const base =
    'flex items-center gap-3 w-full px-2 py-2 rounded-md text-[length:var(--text-sm)] font-medium transition-colors duration-150 cursor-pointer'
  const active = 'bg-[var(--brand)] text-white'
  const inactive =
    'text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)]'

  const button = (
    <button onClick={onClick} className={`${base} ${isActive ? active : inactive}`}>
      <Icon className="size-4 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  )

  if (!collapsed) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" className="text-[length:var(--text-xs)]">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

function SidebarContents({
  activeTab,
  collapsed,
  onToggle,
  onNavigate,
}: {
  activeTab: string
  collapsed: boolean
  onToggle?: () => void
  onNavigate?: () => void
}) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()

  function handleNav(to?: string) {
    if (to) navigate(to)
    onNavigate?.()
  }

  const iconBtn =
    'flex items-center justify-center size-7 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150'

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col h-full">

        {/* Workspace identity + toggle */}
        <div className="flex items-center h-14 px-3 shrink-0 gap-2">
          {collapsed ? (
            // Collapsed: just the expand button centered
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggle}
                  aria-label="Expand sidebar"
                  className="mx-auto flex items-center justify-center size-7 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150"
                >
                  <PanelLeftOpen className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-[length:var(--text-xs)]">
                Expand sidebar
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <div className="size-7 rounded-md bg-[var(--brand)] flex items-center justify-center shrink-0">
                <LayoutDashboard className="size-4 text-white" />
              </div>
              <span
                className="flex-1 text-[length:var(--text-sm)] font-semibold text-[color:var(--slate-50)] truncate"
                style={{ fontFamily: 'var(--font-switzer)' }}
              >
                Our Council
              </span>
              {onToggle && (
                <button
                  onClick={onToggle}
                  aria-label="Collapse sidebar"
                  className={iconBtn}
                >
                  <PanelLeftClose className="size-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Search — only when expanded */}
        {!collapsed && (
          <div className="flex items-center gap-2 mx-3 mb-3 px-3 py-1.5 rounded-lg bg-[var(--slate-700)] border border-[var(--border-subtle)] cursor-text">
            <Search className="size-4 text-[color:var(--slate-400)] shrink-0" />
            <span className="flex-1 text-[length:var(--text-sm)] text-[color:var(--slate-400)]">Find...</span>
            <span className="text-[length:var(--text-xs)] text-[color:var(--slate-400)]">⌘F</span>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto py-1">
          {NAV_ITEMS.map(({ icon, label, to }) => (
            <NavItem
              key={label}
              icon={icon}
              label={label}
              isActive={label === activeTab}
              collapsed={collapsed}
              onClick={() => handleNav(to)}
            />
          ))}

          {/* More Tools — hidden when collapsed */}
          {!collapsed && (
            <>
              <p className="mt-4 mb-1 px-2 text-[length:var(--text-xs)] font-medium text-[color:var(--slate-400)]">
                More tools
              </p>
              {MORE_TOOLS_ITEMS.map(({ icon, label, to }) => (
                <NavItem
                  key={label}
                  icon={icon}
                  label={label}
                  isActive={label === activeTab}
                  collapsed={false}
                  onClick={() => handleNav(to)}
                />
              ))}
            </>
          )}
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 border-t border-[var(--border-faint)] p-2 flex flex-col gap-1">
          {/* View Site */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center w-full py-2 rounded-md text-[color:var(--slate-400)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
                  <Globe className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-[length:var(--text-xs)]">
                View Site
              </TooltipContent>
            </Tooltip>
          ) : (
            <button className="flex items-center gap-3 w-full px-2 py-2 rounded-md text-[length:var(--text-sm)] font-medium text-[color:var(--slate-400)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
              <Globe className="size-4 shrink-0" />
              View Site
            </button>
          )}

          {/* Row 1: Avatar + name */}
          <div className="flex items-center gap-2 px-2 py-1.5">
            <img
              src="/avatar.jpg"
              alt="Alex Morgan"
              className="size-7 rounded-full object-cover object-top shrink-0"
            />
            {!collapsed && (
              <span className="text-[length:var(--text-sm)] font-medium text-[color:var(--slate-200)] truncate">
                Alex Morgan
              </span>
            )}
          </div>

          {/* Row 2: Utility icons */}
          <div className={`flex gap-1 px-2 pb-1 ${collapsed ? 'justify-center' : ''}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={toggleTheme} aria-label="Toggle theme" className={iconBtn}>
                  {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-[length:var(--text-xs)]">
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button aria-label="Notifications" className={iconBtn}>
                  <Bell className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-[length:var(--text-xs)]">
                Notifications
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button aria-label="Documentation" className={iconBtn}>
                  <BookOpen className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-[length:var(--text-xs)]">
                Documentation
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

      </div>
    </TooltipProvider>
  )
}

export function AppLayout({ children, activeTab = 'Overview' }: AppLayoutProps) {
  const { theme } = useThemeStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed-v2')
    if (saved !== null) return saved === 'true'
    return false // default: always expanded on sm+
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleCollapsed() {
    setCollapsed(prev => {
      const next = !prev
      localStorage.setItem('sidebar-collapsed-v2', String(next))
      return next
    })
  }

  // Close mobile drawer on resize to sm+
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 640) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const sidebarWidth = collapsed ? 'w-14' : 'w-60'
  const mainMargin  = collapsed ? 'sm:ml-14' : 'sm:ml-60'

  return (
    <div className="flex min-h-screen bg-[var(--slate-900)]">

      {/* Sidebar — sm and above */}
      <aside
        className={`hidden sm:flex fixed inset-y-0 left-0 z-20 flex-col ${sidebarWidth} bg-[var(--slate-800)] border-r border-[var(--border-faint)] transition-all duration-200`}
      >
        <SidebarContents
          activeTab={activeTab}
          collapsed={collapsed}
          onToggle={toggleCollapsed}
        />
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
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-60 bg-[var(--slate-800)] flex flex-col h-full shadow-[var(--shadow-dropdown)]">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-3 right-3 flex items-center justify-center size-7 rounded-md text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] transition-colors duration-150"
            >
              <X className="size-4" />
            </button>
            {/* Mobile drawer always shows expanded layout */}
            <SidebarContents
              activeTab={activeTab}
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main
        className={`flex-1 ml-0 ${mainMargin} pt-12 sm:pt-16 pb-16 sm:pb-24 flex flex-col items-center px-4 sm:px-6 lg:px-8 min-w-0 transition-all duration-200`}
      >
        {children}
      </main>

      {/* Fixed help button */}
      <button
        className="fixed bottom-10 right-6 flex items-center justify-center size-9 rounded-full bg-[var(--slate-600)] text-[color:var(--slate-50)] shadow-[var(--shadow-floating)] hover:brightness-110 transition-all duration-150"
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
