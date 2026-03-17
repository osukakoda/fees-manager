import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { useFeesStore, type Fee } from '@/store/store'

const CATEGORIES = ['Waste', 'Parking', 'Licensing', 'Other']

interface EditFeeDialogProps {
  fee: Fee | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function EditFeeDialog({ fee, open, onOpenChange, onSuccess }: EditFeeDialogProps) {
  const updateFee = useFeesStore((s) => s.updateFee)
  const [feeName, setFeeName] = useState('')
  const [category, setCategory] = useState('')
  const [newAmount, setNewAmount] = useState('')

  useEffect(() => {
    if (fee) {
      setFeeName(fee.feeName)
      setCategory(fee.category || '')
      setNewAmount(String(fee.newAmount))
    }
  }, [fee])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fee) return
    const amount = parseFloat(newAmount)
    if (Number.isNaN(amount)) return
    updateFee(fee.id, {
      feeName: feeName.trim(),
      category: category.trim() || fee.category,
      newAmount: amount,
    })
    onOpenChange(false)
    onSuccess?.()
  }

  if (!fee) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit fee</DialogTitle>
          <DialogDescription>
            Update fee name, category, or amount. Changes are saved to this update batch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-fee-name">Fee name</Label>
            <Input
              id="edit-fee-name"
              value={feeName}
              onChange={(e) => setFeeName(e.target.value)}
              placeholder="e.g. Residential waste collection"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-fee-category">Category</Label>
            <Select value={category || undefined} onValueChange={setCategory}>
              <SelectTrigger id="edit-fee-category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-fee-amount">Amount</Label>
            <Input
              id="edit-fee-amount"
              type="number"
              step="0.01"
              min="0"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!feeName.trim() || newAmount === ''}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
