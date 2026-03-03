import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">Fees Manager</h1>
      <p className="text-muted-foreground text-sm">
        Scaffold ready. Add pages in <code className="rounded bg-muted px-1.5 py-0.5">src/pages</code> and use ShadCN components from <code className="rounded bg-muted px-1.5 py-0.5">src/components/ui</code>.
      </p>
      <Button>Confirm setup</Button>
    </div>
  )
}

export default App
