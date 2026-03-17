import { type ReactNode, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  ExternalLink,
  Search,
  Bell,
  BookOpen,
  HelpCircle,
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
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useThemeStore } from '@/store/store'

// Tabs that fold into the More dropdown at smaller breakpoints
const OVERFLOW_SM = new Set(['Files', 'Forms'])
const OVERFLOW_LG = new Set(['Approvals', 'Analytics', 'Site Management'])

const NAV_TABS: { label: string; to?: string }[] = [
  { label: 'Overview', to: '/' },
  { label: 'Pages' },
  { label: 'Files' },
  { label: 'Forms' },
  { label: 'Approvals' },
  { label: 'Analytics' },
  { label: 'Site Management' },
  { label: 'More' },
]

// Nav tabs that overflow into More, in display order
const OVERFLOW_NAV: { label: string; showBelow: 'sm' | 'lg'; icon: typeof Folder }[] = [
  { label: 'Files',            showBelow: 'sm', icon: Folder },
  { label: 'Forms',            showBelow: 'sm', icon: FileText },
  { label: 'Approvals',        showBelow: 'lg', icon: ClipboardCheck },
  { label: 'Analytics',        showBelow: 'lg', icon: TrendingUp },
  { label: 'Site Management',  showBelow: 'lg', icon: Globe },
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

const ITEM_CLASS = 'rounded-lg px-3 py-2.5 text-[length:var(--text-sm)] font-medium text-[color:var(--slate-200)] focus:bg-[var(--slate-700)] focus:text-[color:var(--slate-50)] cursor-pointer'

function MoreDropdown({ className }: { className: string }) {
  const navigate = useNavigate()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className={`${className} cursor-pointer`}>
          More
          <ChevronDown className="size-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={12}
        className="w-60 rounded-xl border-[var(--border-subtle)] bg-[var(--slate-800)] p-4 shadow-[var(--shadow-dropdown)]"
      >
        <div className="flex flex-col gap-1">
          {/* Overflow nav tabs — only visible when the tab is hidden from the main nav */}
          {OVERFLOW_NAV.map(({ label, showBelow, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              className={`${ITEM_CLASS} ${showBelow === 'sm' ? 'sm:hidden' : 'lg:hidden'}`}
            >
              <Icon className="size-4 text-[color:var(--slate-300)]" />
              {label}
            </DropdownMenuItem>
          ))}

          {/* Separator — hidden at lg+ where no overflow nav items appear */}
          <DropdownMenuSeparator className="lg:hidden my-1 bg-[var(--border-faint)]" />

          {/* Always-present More Tools items */}
          {MORE_TOOLS_ITEMS.map(({ label, to, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              onSelect={() => to && navigate(to)}
              className={ITEM_CLASS}
            >
              <Icon className="size-4 text-[color:var(--slate-300)]" />
              {label}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AppLayout({ children, activeTab = 'Overview' }: AppLayoutProps) {
  const { theme, toggleTheme } = useThemeStore()
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [])

  // Base tab classes — no flex here, added per-tab via visClass
  const tabBase = 'shrink-0 text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)] font-medium whitespace-nowrap items-center gap-1 pb-3 transition-colors duration-150'

  return (
    <div className="min-h-screen w-full bg-[var(--slate-900)]">
      <header className="sticky top-0 z-10 w-full flex flex-col gap-6 sm:gap-8 pt-3 sm:pt-6 px-3 sm:px-6 lg:px-8 bg-[var(--slate-800)] shadow-[var(--shadow-header)]">
        {/* Top bar */}
        <div className="flex gap-3 sm:gap-6 items-center w-full">
          {/* Left: wordmark */}
          <div className="flex gap-2 items-center flex-1 min-w-0">
            <button className="flex gap-2 sm:gap-2.5 items-center py-1 pr-2 sm:pr-4 text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
              <span
                className="flex items-center justify-center w-6 h-6 rounded bg-[var(--brand)] text-white font-bold leading-none shrink-0"
                style={{ fontFamily: 'var(--font-switzer)', fontSize: '10px', letterSpacing: '0.02em' }}
              >OC</span>
              <span className="truncate">Our council</span>
            </button>
          </div>

          {/* Right: search + actions */}
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="hidden sm:flex items-center bg-[var(--slate-700)] border border-[var(--border-subtle)] rounded-lg px-4 py-1.5 w-40 sm:w-60 gap-2">
              <Search className="size-4 text-[color:var(--slate-300)]" />
              <span className="flex-1 text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)]">Find...</span>
              <span className="text-[length:var(--text-xs)] font-medium text-[color:var(--slate-300)]">⌘F</span>
            </div>
            <div className="flex gap-2 items-center">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--slate-700)] text-[length:var(--text-xs)] font-medium text-[color:var(--slate-50)] hover:bg-[var(--slate-600)] transition-colors duration-150 shrink-0">
                <span className="hidden sm:inline">View Site</span>
                <ExternalLink className="size-3.5" />
              </button>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center justify-center size-12 sm:size-9 rounded-full border border-[var(--border-subtle)] bg-[var(--slate-800)] p-3 sm:p-2 hover:bg-[var(--surface-hover-icon)] transition-colors duration-150"
              >
                {theme === 'dark'
                  ? <Moon className="size-5 text-[color:var(--slate-300)]" />
                  : <Sun className="size-5 text-[color:var(--slate-300)]" />}
              </button>
              <button className="flex items-center justify-center size-12 sm:size-9 rounded-full border border-[var(--border-subtle)] bg-[var(--slate-800)] p-3 sm:p-2 hover:bg-[var(--surface-hover-icon)] transition-colors duration-150">
                <Bell className="size-5 text-[color:var(--slate-300)]" />
              </button>
              <button className="flex items-center justify-center size-12 sm:size-9 rounded-full border border-[var(--border-subtle)] bg-[var(--slate-800)] p-3 sm:p-2 hover:bg-[var(--surface-hover-icon)] transition-colors duration-150">
                <BookOpen className="size-5 text-[color:var(--slate-300)]" />
              </button>
              <img
                src="https://randomuser.me/api/portraits/men/44.jpg"
                alt="User avatar"
                className="size-12 sm:size-9 rounded-full object-cover object-top shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="flex gap-6 lg:gap-8 items-center w-full overflow-x-auto scrollbar-hide pr-4">
          {NAV_TABS.map(({ label, to }) => {
            // Visibility: overflow tabs are hidden until their breakpoint
            const visClass =
              OVERFLOW_SM.has(label) ? 'hidden sm:flex' :
              OVERFLOW_LG.has(label) ? 'hidden lg:flex' :
              'flex'

            // Active state — More button handles overflow tab active states responsively
            let activeClasses: string
            if (label === 'More') {
              if (activeTab === 'More') {
                activeClasses = 'border-b-4 border-[var(--brand)] text-[color:var(--slate-50)]'
              } else if (OVERFLOW_LG.has(activeTab)) {
                // Active below lg (tab is hidden there), inactive at lg+ (tab is visible)
                activeClasses = 'border-b-4 border-[var(--brand)] lg:border-transparent text-[color:var(--slate-50)] lg:text-[color:var(--slate-200)] lg:hover:text-[color:var(--slate-50)]'
              } else if (OVERFLOW_SM.has(activeTab)) {
                // Active below sm, inactive at sm+
                activeClasses = 'border-b-4 border-[var(--brand)] sm:border-transparent text-[color:var(--slate-50)] sm:text-[color:var(--slate-200)] sm:hover:text-[color:var(--slate-50)]'
              } else {
                activeClasses = 'border-b-4 border-transparent text-[color:var(--slate-200)] hover:text-[color:var(--slate-50)]'
              }
            } else {
              activeClasses = label === activeTab
                ? 'border-b-4 border-[var(--brand)] text-[color:var(--slate-50)]'
                : 'border-b-4 border-transparent text-[color:var(--slate-200)] hover:text-[color:var(--slate-50)]'
            }

            const classes = `${visClass} ${tabBase} ${activeClasses}`

            if (label === 'More') {
              return <MoreDropdown key={label} className={classes} />
            }

            return to ? (
              <Link key={label} to={to} className={classes}>{label}</Link>
            ) : (
              <button key={label} className={classes}>{label}</button>
            )
          })}
        </nav>
      </header>

      <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-10 sm:pt-[72px] pb-16 sm:pb-24">
        {children}
      </main>

      {/* Fixed help button */}
      <button className="fixed bottom-6 right-6 flex gap-2 items-center h-9 px-3 rounded-lg bg-[var(--slate-600)] text-[color:var(--slate-50)] shadow-[var(--shadow-floating)] hover:brightness-110 transition-all duration-150">
        <HelpCircle className="size-5" />
        <span className="text-[length:var(--text-sm)] font-medium">Help</span>
      </button>
    </div>
  )
}
