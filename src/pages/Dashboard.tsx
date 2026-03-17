import { useState } from 'react'
import {
  MessageSquare,
  Building2,
  AlertTriangle,
  CalendarDays,
  ClipboardList,
  BookOpen,
  Image,
  Rocket,
  Briefcase,
  Dog,
  Megaphone,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { AppLayout } from '@/components/AppLayout'
import { MetricsCard } from '@/components/MetricsCard'

const SHORTCUTS = [
  { icon: MessageSquare, label: 'Consultations' },
  { icon: Building2, label: 'Departments' },
  { icon: AlertTriangle, label: 'Emergency Announcements' },
  { icon: CalendarDays, label: 'Events' },
  { icon: ClipboardList, label: 'Forms & Policies' },
  { icon: BookOpen, label: 'Glossary' },
  { icon: Image, label: 'Image Gallery' },
  { icon: Rocket, label: 'Initiatives' },
  { icon: Briefcase, label: 'Jobs' },
  { icon: Dog, label: 'Lost Animals' },
  { icon: Megaphone, label: 'News' },
]

const CONTENT_TABS = [
  'Drafts and changes',
  'Approvals',
  'Pages',
  'Bookmarks',
  'Page comments',
  'Activity Stream',
]

const TABLE_DATA = [
  { page: 'Branches', site: 'Public Library', date: '08/01/2025' },
  { page: 'Defender', site: 'Community Pools', date: '05/01/2025' },
  { page: 'Midfielder', site: 'Waste & Recycling', date: '17/12/2024' },
  { page: 'Opening hours', site: 'Public Library', date: '12/12/2024' },
  { page: 'Forward', site: 'My City', date: '30/11/2024' },
]

export function Dashboard() {
  const [activeContentTab, setActiveContentTab] = useState('Drafts and changes')

  return (
    <AppLayout activeTab="Overview">
      <div className="w-full max-w-[var(--content-max-width)] flex flex-col gap-12 sm:gap-16 lg:gap-24">
        {/* Activity Summary */}
        <section className="flex flex-col gap-8">
          <h2 className="text-[length:var(--text-h4)] font-normal leading-tight tracking-[0.24px] text-[color:var(--slate-200)]" style={{ fontFamily: 'var(--font-switzer)' }}>
            Activity Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <MetricsCard
              title="Visited Pages"
              subtitle="Last 30 days"
              value="89"
              trendDirection="up"
              trendLabel="11%"
              detailText="9 visits from 4 users"
            />
            <MetricsCard
              title="Active Users"
              subtitle="Last 7 days"
              value="371"
              trendDirection="up"
              trendLabel="3%"
              detailText="12 new users"
            />
            <MetricsCard
              title="Published Posts"
              subtitle="Last 2 months"
              value="78"
              trendDirection="down"
              trendLabel="7%"
              detailText="5 drafts pending"
            />
            <MetricsCard
              title="Site Health"
              subtitle="Last check 12 hours ago"
              value="93%"
              trendDirection="up"
              trendLabel="1%"
              detailText="No critical issues"
            />
          </div>
        </section>

        {/* Favourites */}
        <section className="flex flex-col gap-8">
          <h2 className="text-[length:var(--text-h4)] font-normal leading-tight tracking-[0.24px] text-[color:var(--slate-200)]" style={{ fontFamily: 'var(--font-switzer)' }}>
            Favourites
          </h2>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--slate-800)] shadow-[var(--shadow-card-default)] pt-4 pb-8 px-4 sm:pt-6 sm:pb-12 sm:px-6 flex flex-col gap-12 sm:gap-20">
            {/* Shortcuts */}
            <div className="flex flex-col gap-8">
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-2" style={{ fontFamily: 'var(--font-dm)' }}>
                  <h3 className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]">
                    Shortcuts
                  </h3>
                  <p className="text-[length:var(--text-sm)] font-medium leading-snug text-[color:var(--slate-300)]">
                    Access tasks quickly
                  </p>
                </div>
                <button className="flex items-center gap-2 px-2 py-1 text-[length:var(--text-xs)] font-medium text-[color:var(--slate-300)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
                  View all
                  <ChevronRight className="size-3" />
                </button>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-3">
                {SHORTCUTS.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-2 min-w-[96px] px-4 py-3 rounded-md border border-[var(--border-subtle)] text-[length:var(--text-sm)] font-medium leading-normal text-[color:var(--slate-50)] hover:bg-[var(--surface-hover)] transition-colors duration-150"
                  >
                    <Icon className="size-5 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2" style={{ fontFamily: 'var(--font-dm)' }}>
                <h3 className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]">
                  Content
                </h3>
                <p className="text-[length:var(--text-sm)] font-medium leading-snug text-[color:var(--slate-300)]">
                  Latest updates and changes
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-[88px]">

                {/* Mobile tab selector — dropdown, only below lg */}
                <div className="lg:hidden">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-faint)] text-[length:var(--text-sm)] font-medium text-[color:var(--slate-50)] hover:bg-[var(--surface-hover)] transition-colors duration-150">
                        {activeContentTab}
                        <ChevronDown className="size-4 shrink-0 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={8}
                      className="w-56 rounded-xl border-[var(--border-subtle)] bg-[var(--slate-800)] p-2 shadow-[var(--shadow-dropdown)]"
                    >
                      <div className="flex flex-col gap-0.5">
                        {CONTENT_TABS.map((tab) => (
                          <DropdownMenuItem
                            key={tab}
                            onSelect={() => setActiveContentTab(tab)}
                            className={`rounded-lg px-3 py-2.5 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                              tab === activeContentTab
                                ? 'bg-[var(--brand)] text-white'
                                : 'text-[color:var(--slate-300)] focus:bg-[var(--surface-hover-row)] focus:text-[color:var(--slate-50)]'
                            }`}
                          >
                            {tab}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Desktop sidebar tabs — vertical list, only at lg+ */}
                <div className="hidden lg:flex lg:flex-col gap-6 pt-[77px] shrink-0">
                  {CONTENT_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveContentTab(tab)}
                      className={`text-left text-[length:var(--text-sm)] whitespace-nowrap transition-colors duration-150 ${
                        tab === activeContentTab
                          ? 'border-b-4 border-[var(--brand)] pb-3 text-[color:var(--slate-50)] font-medium'
                          : 'text-[color:var(--slate-100)] font-normal hover:text-[color:var(--slate-50)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Table area */}
                <div className="flex-1 min-w-0 flex flex-col gap-4 sm:gap-6">
                  {/* Filters */}
                  <div className="flex gap-2 sm:gap-4 justify-end">
                    <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[var(--border-faint)] text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
                      <Filter className="size-3.5 sm:size-4" />
                      Sort by date
                    </button>
                    <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[var(--border-faint)] text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
                      <Calendar className="size-3.5 sm:size-4" />
                      Select date range
                    </button>
                  </div>

                  {/* Data table */}
                  <div className="rounded-lg border border-[var(--border-faint)] overflow-x-auto">
                    <table className="w-full min-w-[480px]">
                      <thead>
                        <tr className="border-b border-[var(--border-faint)]">
                          <th className="text-left p-3 sm:p-4 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Page</th>
                          <th className="text-left p-3 sm:p-4 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Site</th>
                          <th className="text-right px-3 sm:px-4 py-3 sm:py-4 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Last updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TABLE_DATA.map((row) => (
                          <tr key={row.page} className="border-b border-[var(--border-faint)] hover:bg-[var(--surface-hover-row)] transition-colors duration-150">
                            <td className="p-3 sm:p-4 text-[length:var(--text-sm)] text-[color:var(--slate-50)]">{row.page}</td>
                            <td className="p-3 sm:p-4 text-[length:var(--text-sm)] text-[color:var(--slate-50)]">{row.site}</td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-[length:var(--text-sm)] text-[color:var(--slate-300)] text-right">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[length:var(--text-sm)] text-[color:var(--slate-300)]">5 of 18 pages</span>
                    <div className="flex gap-2 sm:gap-4">
                      <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[var(--border-faint)] text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
                        <ChevronLeft className="size-3.5 sm:size-4" />
                        Previous
                      </button>
                      <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[var(--border-faint)] text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
                        Next
                        <ChevronRight className="size-3.5 sm:size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
