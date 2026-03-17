import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFeesStore, type UpdateStatus, type ValidationError } from '@/store/store'
import { cn } from '@/lib/utils'

const PREDEFINED_VALIDATION_ERRORS: ValidationError[] = [
  { row: 3, field: 'Fee name', message: 'Missing required field' },
  { row: 5, field: 'Amount', message: 'Invalid amount: must be positive' },
  { row: 7, field: 'Code', message: 'Duplicate fee code' },
]

const STATUS_OPTIONS: { value: UpdateStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'published', label: 'Published' },
]

export function NewUpdate() {
  const navigate = useNavigate()
  const addUpdate = useFeesStore((s) => s.addUpdate)
  const setUploadState = useFeesStore((s) => s.setUploadState)
  const clearUploadErrors = useFeesStore((s) => s.clearUploadErrors)
  const upload = useFeesStore((s) => s.upload)

  const [name, setName] = useState('')
  const [referenceId, setReferenceId] = useState('')
  const [comments, setComments] = useState('')
  const [status, setStatus] = useState<UpdateStatus>('draft')
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [simulateErrors, setSimulateErrors] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const f = e.dataTransfer.files?.[0]
    if (f && (f.name.endsWith('.xlsx') || f.name.endsWith('.csv'))) setFile(f)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setUploadState({ isUploading: true, progress: 0 })
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadState({ progress })
      if (progress >= 90) clearInterval(interval)
    }, 200)
    setTimeout(() => {
      clearInterval(interval)
      setUploadState({ progress: 100 })
      if (simulateErrors) {
        setUploadState({
          isUploading: false,
          progress: 0,
          errors: PREDEFINED_VALIDATION_ERRORS,
        })
      } else {
        const id = `new-${Date.now()}`
        const newUpdate = {
          id,
          name: name.trim(),
          referenceId: referenceId.trim() || undefined,
          status,
          createdAt: new Date().toISOString().slice(0, 10),
          totalFees: 5,
          errorCount: 0,
          feeIds: ['nf1', 'nf2', 'nf3', 'nf4', 'nf5'],
        }
        const newFees = [
          { id: 'nf1', updateId: id, feeName: 'New fee 1', category: 'Waste', oldAmount: null, newAmount: 100, change: 100, status: 'new' as const },
          { id: 'nf2', updateId: id, feeName: 'New fee 2', category: 'Parking', oldAmount: 20, newAmount: 22, change: 2, status: 'updated' as const },
          { id: 'nf3', updateId: id, feeName: 'New fee 3', category: 'Licensing', oldAmount: null, newAmount: 150, change: 150, status: 'new' as const },
          { id: 'nf4', updateId: id, feeName: 'New fee 4', category: 'Waste', oldAmount: 90, newAmount: 95, change: 5, status: 'updated' as const },
          { id: 'nf5', updateId: id, feeName: 'New fee 5', category: 'Parking', oldAmount: 5, newAmount: 5.5, change: 0.5, status: 'updated' as const },
        ]
        addUpdate(newUpdate, newFees)
        setUploadState({ isUploading: false, progress: 0 })
        navigate('/')
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen w-full bg-background px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-4 sm:pt-8">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Back</Link>
            </Button>
          </div>
          <h1 className="text-[length:var(--text-h4)] font-normal leading-8 tracking-[0.24px] text-foreground">
            New fee update
          </h1>
          <p className="text-sm font-medium leading-5 text-muted-foreground">
            Add a new batch of fees by uploading a template or filling in the details below.
          </p>
        </div>

        {upload.isUploading ? (
          <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
            <CardContent className="gap-4 px-6 py-6">
              <p className="text-base font-medium leading-6 text-foreground">
                Processing upload… {upload.progress}%
              </p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ) : upload.errors.length > 0 ? (
          <Card className="rounded-2xl border-border border-destructive/50 shadow-[var(--shadow-card-default)]">
            <CardHeader className="gap-2 px-6 pt-6">
              <CardTitle className="text-lg font-medium text-destructive">
                Validation errors
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Some fees have errors. Please review and fix them to proceed.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              <ul className="list-inside list-disc space-y-2 text-sm text-foreground">
                {upload.errors.map((err, i) => (
                  <li key={i}>
                    {err.row != null ? `Row ${err.row}: ` : ''}
                    <span className="font-medium">{err.field}</span> — {err.message}
                  </li>
                ))}
              </ul>
              <Button type="button" onClick={() => clearUploadErrors()}>
                Try again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
              <CardHeader className="gap-2 px-6 pt-6">
                <CardTitle className="text-lg font-medium leading-7 text-foreground">
                  Details
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Name, reference and status for this fee update
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Update name (required)</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Annual Fees 2024–2025"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referenceId">Reference ID (optional)</Label>
                  <Input
                    id="referenceId"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="Optional reference"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comments">Comments (optional)</Label>
                  <textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Optional notes"
                    rows={3}
                    className={cn(
                      'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                      'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as UpdateStatus)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border shadow-[var(--shadow-card-default)]">
              <CardHeader className="gap-2 px-6 pt-6">
                <CardTitle className="text-lg font-medium leading-7 text-foreground">
                  Upload template
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Supported file types: .xlsx, .csv
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="simulateErrors"
                    checked={simulateErrors}
                    onChange={(e) => setSimulateErrors(e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <Label htmlFor="simulateErrors" className="cursor-pointer text-sm font-normal">
                    Simulate validation errors (demo: show error UI)
                  </Label>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors',
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                    file && 'border-primary/50 bg-primary/5'
                  )}
                >
                  <p className="text-sm text-muted-foreground">
                    {file ? file.name : 'Drag and drop your file here or browse'}
                  </p>
                  <Button type="button" variant="link" className="h-auto p-0 text-sm" asChild>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Download blank template
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link to="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={!name.trim()}>
                Upload
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
