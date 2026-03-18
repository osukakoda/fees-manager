import { Info, Download, Upload, Plus } from 'lucide-react'
import { AppLayout } from '@/components/AppLayout'
import { PageHeader } from '@/components/PageHeader'

export function FeesManager() {
  return (
    <AppLayout activeTab="More">
      <div className="w-full max-w-[var(--content-max-width)] flex flex-col gap-6 sm:gap-8">
        <PageHeader
          title="Fees Manager"
          description="Upload or manage council fees across your sites"
        />

        {/* Upload in bulk card */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--slate-800)] shadow-[var(--shadow-card-default)] pt-6 pb-8 px-4 sm:pt-9 sm:pb-12 sm:px-6 flex flex-col gap-6 sm:gap-8">
          {/* Headline */}
          <div className="flex flex-col gap-2" style={{ fontFamily: 'var(--font-dm)' }}>
            <h3 className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]">
              Upload in bulk
            </h3>
            <p className="text-[length:var(--text-sm)] font-medium leading-snug text-[color:var(--slate-300)]">
              Add all your fees at once
            </p>
          </div>

          {/* Info alert */}
          <div className="flex gap-3 items-start p-4 rounded-lg bg-[var(--surface-hover-row)] border border-[var(--border-faint)]">
            <div className="flex items-center justify-center py-0.5 shrink-0">
              <Info className="size-5 text-[color:var(--slate-100)]" />
            </div>
            <div className="flex flex-col" style={{ fontFamily: 'var(--font-dm)' }}>
              <p className="text-[length:var(--text-base)] font-medium leading-normal text-[color:var(--slate-100)]">
                No fees added yet
              </p>
              <p className="text-[length:var(--text-sm)] font-normal leading-relaxed text-[color:var(--slate-100)]">
                Just follow these steps to get started
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-8 sm:gap-12">
            {/* Step 1 */}
            <div className="flex flex-col gap-4">
              <h4
                className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]"
                style={{ fontFamily: 'var(--font-dm)' }}
              >
                Step 1. Download our template and enter your fees
              </h4>
              <button className="flex items-center gap-2 min-w-[96px] w-fit px-4 py-2 rounded-md bg-[var(--brand)] text-[length:var(--text-sm)] font-medium leading-normal text-white hover:brightness-95 transition-all duration-150">
                <Download className="size-5 shrink-0" />
                Download template
              </button>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-4">
              <h4
                className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]"
                style={{ fontFamily: 'var(--font-dm)' }}
              >
                Step 2. Upload the fees into the system
              </h4>
              <button className="flex items-center gap-2 min-w-[96px] w-fit px-4 py-2 rounded-md bg-[var(--brand)] text-[length:var(--text-sm)] font-medium leading-normal text-white hover:brightness-95 transition-all duration-150">
                <Upload className="size-5 shrink-0" />
                Upload filled-in template
              </button>
              <ul className="list-disc pl-[18px] text-[length:var(--text-xs)] font-medium leading-relaxed text-[color:var(--slate-200)] flex flex-col">
                <li>Must match column structure in the downloaded template</li>
                <li>Fee name: up to 70 characters</li>
                <li>Notes: up to 200 characters</li>
                <li>ID: letters, numbers and hyphens only (no spaces or symbols)</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-4">
              <h4
                className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]"
                style={{ fontFamily: 'var(--font-dm)' }}
              >
                Step 3. Fees validation
              </h4>
              <p className="text-[length:var(--text-xs)] font-medium leading-relaxed text-[color:var(--slate-200)]">
                You'll see a report after upload showing any errors or successful rows
              </p>
            </div>
          </div>
        </div>

        {/* Add fees one at a time card */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--slate-800)] shadow-[var(--shadow-card-default)] pt-6 pb-8 px-4 sm:pt-9 sm:pb-12 sm:px-6 flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2" style={{ fontFamily: 'var(--font-dm)' }}>
            <h3 className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]">
              Add fees one at a time
            </h3>
            <p className="text-[length:var(--text-sm)] font-medium leading-snug text-[color:var(--slate-300)]">
              Great for small changes or last-minute updates
            </p>
          </div>
          <button className="flex items-center gap-2 min-w-[96px] w-fit px-4 py-2 rounded-md bg-[var(--brand)] text-[length:var(--text-sm)] font-medium leading-normal text-white hover:brightness-95 transition-all duration-150">
            <Plus className="size-5 shrink-0" />
            Start adding fees
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
