import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

export function Dashboard() {
  const updates = useFeesStore((s) => s.updates)

  const successCount = updates.filter((u) => u.status === 'published').length
  const totalUpdates = updates.length
  const successRate = totalUpdates > 0 ? Math.round((successCount / totalUpdates) * 100) : 0
  const totalFees = updates.reduce((acc, u) => acc + u.totalFees, 0)

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Fees Manager</h1>
          <Button asChild>
            <Link to="/new-update">Start New Update</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Success rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-semibold">{successRate}%</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-semibold">{totalUpdates}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-semibold">{totalFees}</span>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent updates</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fee updates and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Update name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total fees</TableHead>
                  <TableHead className="text-right">Errors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updates.map((update) => (
                  <TableRow key={update.id}>
                    <TableCell className="font-medium">{update.name}</TableCell>
                    <TableCell className="text-muted-foreground">{update.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(update.status)}>
                        {update.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{update.totalFees}</TableCell>
                    <TableCell className="text-right">
                      {update.errorCount > 0 ? (
                        <span className="text-destructive">{update.errorCount}</span>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
