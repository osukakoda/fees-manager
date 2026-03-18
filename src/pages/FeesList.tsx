import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { EditFeeDialog } from '@/components/EditFeeDialog'
import { DeleteFeeDialog } from '@/components/DeleteFeeDialog'
import { useFeesStore } from '@/store/store'
import { AppLayout } from '@/components/AppLayout'
import { PageHeader } from '@/components/PageHeader'

function StatusBadge({ status }: { status: 'new' | 'updated' | 'error' }) {
  const styles = {
    new: 'bg-[rgba(0,122,54,0.15)] text-[color:var(--success)]',
    updated: 'bg-[var(--border-faint)] text-[color:var(--slate-300)]',
    error: 'bg-[rgba(179,0,27,0.15)] text-[color:var(--destructive-figma)]',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[length:var(--text-xs)] font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}

export function FeesList() {
  const fees = useFeesStore((s) => s.fees)
  const updates = useFeesStore((s) => s.updates)
  const [editFeeId, setEditFeeId] = useState<string | null>(null)
  const [deleteFeeId, setDeleteFeeId] = useState<string | null>(null)

  const editFee = editFeeId ? fees.find((f) => f.id === editFeeId) ?? null : null
  const deleteFee = deleteFeeId ? fees.find((f) => f.id === deleteFeeId) ?? null : null

  const getUpdateName = (updateId: string) =>
    updates.find((u) => u.id === updateId)?.name ?? updateId

  return (
    <AppLayout activeTab="More">
      <div className="w-full max-w-[var(--content-max-width)] flex flex-col gap-6 sm:gap-8">
        <PageHeader
          title="All Fees"
          description="View and manage all fees across updates"
          breadcrumbs={[
            { label: 'Fees Manager', to: '/fees-manager' },
            { label: 'All Fees' },
          ]}
        />

        {/* Fees table card */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--slate-800)] shadow-[var(--shadow-card-default)] flex flex-col">
          {/* Card header */}
          <div className="px-4 sm:px-6 pt-6 pb-4 flex flex-col gap-1" style={{ fontFamily: 'var(--font-dm)' }}>
            <h3 className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]">
              Fees list
            </h3>
            <p className="text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)]">
              {fees.length} fee{fees.length !== 1 ? 's' : ''} total
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-t border-[var(--border-faint)]">
                  <th className="text-left px-4 sm:px-6 py-3 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Fee name</th>
                  <th className="text-left px-4 sm:px-6 py-3 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Category</th>
                  <th className="text-right px-4 sm:px-6 py-3 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Amount</th>
                  <th className="text-right px-4 sm:px-6 py-3 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Change</th>
                  <th className="text-left px-4 sm:px-6 py-3 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Status</th>
                  <th className="text-left px-4 sm:px-6 py-3 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Update</th>
                  <th className="text-right px-4 sm:px-6 py-3 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr
                    key={fee.id}
                    className="border-t border-[var(--border-faint)] hover:bg-[var(--surface-hover-row)] transition-colors duration-150"
                  >
                    <td className="px-4 sm:px-6 py-3 text-[length:var(--text-sm)] font-medium text-[color:var(--slate-50)]">
                      {fee.feeName}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-[length:var(--text-sm)] text-[color:var(--slate-300)]">
                      {fee.category || '—'}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-[length:var(--text-sm)] text-[color:var(--slate-50)] text-right">
                      {fee.newAmount}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-[length:var(--text-sm)] text-right">
                      <span className={`inline-flex items-center justify-end gap-0.5 ${fee.change >= 0 ? 'text-[color:var(--success)]' : 'text-[color:var(--destructive-figma)]'}`}>
                        {fee.change >= 0
                          ? <ArrowUp className="size-3 shrink-0" />
                          : <ArrowDown className="size-3 shrink-0" />
                        }
                        {fee.change >= 0 ? '+' : ''}{fee.change}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <StatusBadge status={fee.status} />
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <Link
                        to={`/updates/${fee.updateId}`}
                        className="text-[length:var(--text-sm)] text-[color:var(--brand-light)] hover:text-[color:var(--brand)] transition-colors duration-150 underline underline-offset-4 decoration-[var(--underline-muted)]"
                      >
                        {getUpdateName(fee.updateId)}
                      </Link>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditFeeId(fee.id)}
                          className="px-3 py-1.5 rounded-lg border border-[var(--border-faint)] text-[length:var(--text-xs)] font-medium text-[color:var(--slate-300)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--slate-50)] transition-colors duration-150"
                          aria-label={`Edit ${fee.feeName}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteFeeId(fee.id)}
                          className="px-3 py-1.5 rounded-lg text-[length:var(--text-xs)] font-medium text-[color:var(--destructive-figma)] hover:bg-[rgba(179,0,27,0.08)] transition-colors duration-150"
                          aria-label={`Delete ${fee.feeName}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {fees.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[length:var(--text-sm)] text-[color:var(--slate-400)]">
                      No fees added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <EditFeeDialog
          fee={editFee}
          open={!!editFeeId}
          onOpenChange={(open) => !open && setEditFeeId(null)}
        />
        <DeleteFeeDialog
          fee={deleteFee}
          open={!!deleteFeeId}
          onOpenChange={(open) => !open && setDeleteFeeId(null)}
        />
      </div>
    </AppLayout>
  )
}
