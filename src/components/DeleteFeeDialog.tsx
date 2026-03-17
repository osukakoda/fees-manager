import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useFeesStore, type Fee } from '@/store/store'

interface DeleteFeeDialogProps {
  fee: Fee | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function DeleteFeeDialog({ fee, open, onOpenChange, onSuccess }: DeleteFeeDialogProps) {
  const removeFee = useFeesStore((s) => s.removeFee)

  const handleConfirm = () => {
    if (!fee) return
    removeFee(fee.id)
    onOpenChange(false)
    onSuccess?.()
  }

  if (!fee) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete fee</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove &quot;{fee.feeName}&quot; from this update? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
