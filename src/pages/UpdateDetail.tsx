import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function UpdateDetail() {
  const { id } = useParams<{ id: string }>()
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
        <h1 className="text-2xl font-semibold">Update {id}</h1>
        <p className="text-muted-foreground">Detail view and fee table coming in Step 4.</p>
      </div>
    </div>
  )
}
