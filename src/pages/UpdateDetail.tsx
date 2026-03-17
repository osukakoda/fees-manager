import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EditFeeDialog } from '@/components/EditFeeDialog'
import { DeleteFeeDialog } from '@/components/DeleteFeeDialog'
import { useFeesStore, type UpdateStatus } from '@/store/store'

function statusVariant(status: UpdateStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'published':
      return 'default'
    case 'review':
    case 'approved':
      return 'secondary'
    case 'error':
      return 'destructive'
    default:
      return 'outline'
  }
}

function feeStatusVariant(status: 'new' | 'updated' | 'error'): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'new':
      return 'default'
    case 'updated':
      return 'secondary'
    case 'error':
      return 'destructive'
    default:
      return 'outline'
  }
}

export function UpdateDetail() {
  const { id } = useParams<{ id: string }>()
  const updates = useFeesStore((s) => s.updates)
  const fees = useFeesStore((s) => s.fees)

  const [editFeeId, setEditFeeId] = useState<string | null>(null)
  const [deleteFeeId, setDeleteFeeId] = useState<string | null>(null)

  const update = id ? updates.find((u) => u.id === id) : null
  const updateFees = id ? fees.filter((f) => f.updateId === id) : []

  const editFee = editFeeId ? fees.find((f) => f.id === editFeeId) ?? null : null
  const deleteFee = deleteFeeId ? fees.find((f) => f.id === deleteFeeId) ?? null : null

  const newCount = updateFees.filter((f) => f.status === 'new').length
  const updatedCount = updateFees.filter((f) => f.status === 'updated').length
  const errorCount = update?.errorCount ?? 0
  const totalChange = updateFees.reduce((acc, f) => acc + f.change, 0)

  if (!id || !update) {
    return (
      <div className="min-h-screen w-full bg-background px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-4 sm:pt-8">
        <div className="mx-auto w-full max-w-[var(--content-max-width)] space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">Back to Dashboard</Link>
          </Button>
          <p className="text-muted-foreground">Update not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-4 sm:pt-8">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">Back</Link>
              </Button>
            </div>
            <h1 className="text-[length:var(--text-h4)] font-semibold leading-8 tracking-[0.24px] text-foreground">
              {update.name}
            </h1>
            {update.referenceId && (
              <p className="text-sm text-muted-foreground">Reference: {update.referenceId}</p>
            )}
            <div className="flex items-center gap-2">
              <Badge variant={statusVariant(update.status)}>{update.status}</Badge>
              <span className="text-sm text-muted-foreground">Created {update.createdAt}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" disabled>
              Submit for review
            </Button>
            <Button variant="outline" size="sm" disabled>
              Approve
            </Button>
            <Button size="sm" disabled>
              Publish
            </Button>
          </div>
        </div>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New fees
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <span className="text-[length:var(--text-h5)] font-semibold text-foreground">{newCount}</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Updated fees
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <span className="text-[length:var(--text-h5)] font-semibold text-foreground">{updatedCount}</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <span className="text-[length:var(--text-h5)] font-semibold text-destructive">{errorCount}</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total value change
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <span className="text-[length:var(--text-h5)] font-semibold text-foreground">
                {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}
              </span>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="text-lg font-medium text-foreground">
              Fees in this update
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {updateFees.length} fee(s) in this batch
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Old amount</TableHead>
                  <TableHead className="text-right">New amount</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updateFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.feeName}</TableCell>
                    <TableCell className="text-muted-foreground">{fee.category || '—'}</TableCell>
                    <TableCell className="text-right">
                      {fee.oldAmount != null ? fee.oldAmount : '—'}
                    </TableCell>
                    <TableCell className="text-right">{fee.newAmount}</TableCell>
                    <TableCell className="text-right">
                      <span className={fee.change >= 0 ? 'text-foreground' : 'text-destructive'}>
                        {fee.change >= 0 ? '+' : ''}{fee.change}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={feeStatusVariant(fee.status)}>{fee.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditFeeId(fee.id)}
                          aria-label={`Edit ${fee.feeName}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteFeeId(fee.id)}
                          aria-label={`Delete ${fee.feeName}`}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>

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
    </div>
  )
}
